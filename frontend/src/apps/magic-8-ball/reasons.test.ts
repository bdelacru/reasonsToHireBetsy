import { describe, expect, it, vi } from 'vitest'
import {
  ANSWERS,
  API_TIMEOUT_MS,
  FALLBACK_REASONS,
  formatType,
  getReason,
  normalizeReason,
  pickAnswer,
  pickFallback,
} from './reasons'

// Shape of a real GET /api/reasons/random response as of 2026-10-11 (verified against the live API and its
// OpenAPI schema); personal values replaced with placeholders. Note the empty `reason` and no `title`.
const liveShape = {
  id: '00000000-0000-0000-0000-000000000000',
  reason: '',
  reasonType: 'PERSONALITY',
  explanation: 'Placeholder explanation text.',
  imageUrl: null,
  submittedBy: 'Placeholder Name',
  submittedByLink: 'https://example.com/profile',
  relationship: 'Friend',
  submittedByOthers: false,
  approved: true,
}

const BACKEND_TYPES = ['TECHNICAL', 'PROFESSIONAL', 'COMMUNICATION', 'TEAM_PLAYER', 'LEADERSHIP', 'CREATIVE', 'PERSONALITY', 'BETSY_ENERGY']

describe('normalizeReason', () => {
  it('uses the reason text as the heading when the API provides it', () => {
    const result = normalizeReason({ ...liveShape, reason: 'I ship carefully.', reasonType: 'TECHNICAL' })
    expect(result).toEqual({
      heading: 'I ship carefully.',
      explanation: 'Placeholder explanation text.',
      typeLabel: 'Technical',
      emoji: '💻',
      source: 'api',
    })
  })

  it('leaves the heading out (never invents one) for today’s live data with an empty reason', () => {
    const result = normalizeReason(liveShape)
    expect(result?.heading).toBeNull()
    expect(result?.explanation).toBe('Placeholder explanation text.')
  })

  it('accepts a legacy title if the API ever sends one, but prefers reason', () => {
    expect(normalizeReason({ title: 'Old title', explanation: 'x' })?.heading).toBe('Old title')
    expect(normalizeReason({ reason: 'New', title: 'Old', explanation: 'x' })?.heading).toBe('New')
  })

  it('never passes submitter information through to the page', () => {
    const result = normalizeReason(liveShape)
    expect(Object.keys(result ?? {}).sort()).toEqual(['emoji', 'explanation', 'heading', 'source', 'typeLabel'])
    expect(JSON.stringify(result)).not.toMatch(/Placeholder Name|example\.com|Friend/)
  })

  it('treats whitespace-only text as missing', () => {
    expect(normalizeReason({ reason: '   ', explanation: '\n' })).toBeNull()
    expect(normalizeReason({ reason: '  Trim me  ', explanation: '' })).toMatchObject({ heading: 'Trim me', explanation: null })
  })

  it('returns null when there is nothing meaningful to show', () => {
    expect(normalizeReason({})).toBeNull()
    expect(normalizeReason({ ...liveShape, explanation: '' })).toBeNull()
  })

  it.each([null, undefined, 'oops', 42, true, [], [liveShape], { reason: 5, explanation: { text: 'x' } }])(
    'returns null for a malformed response: %j',
    (bad) => {
      expect(normalizeReason(bad)).toBeNull()
    },
  )

  it('labels a type without inventing one', () => {
    expect(normalizeReason({ ...liveShape, reasonType: undefined })).toMatchObject({ typeLabel: null, emoji: null })
    expect(normalizeReason({ ...liveShape, reasonType: 'SOMETHING_NEW' })).toMatchObject({ typeLabel: 'Something new', emoji: null })
  })
})

describe('formatType', () => {
  it('turns every underscore into a space', () => {
    expect(formatType('TEAM_PLAYER')).toBe('Team player')
    expect(formatType('BETSY_ENERGY')).toBe('Betsy energy')
  })

  it('ignores values that are not upper-case enum names', () => {
    for (const value of ['', 'technical', '<b>HTML</b>', 'DROP TABLE', 7, null, {}]) expect(formatType(value)).toBeNull()
  })
})

describe('fallback reasons and answers', () => {
  it('only uses reason types that exist in the backend', () => {
    for (const reason of FALLBACK_REASONS) expect(BACKEND_TYPES).toContain(reason.reasonType)
  })

  it('always has a heading and an explanation, and is marked as a fallback', () => {
    FALLBACK_REASONS.forEach((_, i) => {
      const result = pickFallback(() => i / FALLBACK_REASONS.length)
      expect(result.heading).toBeTruthy()
      expect(result.explanation).toBeTruthy()
      expect(result.source).toBe('fallback')
    })
  })

  it('picks within range, including the edge values of the random source', () => {
    expect(pickAnswer(() => 0)).toBe(ANSWERS[0])
    expect(pickAnswer(() => 0.9999)).toBe(ANSWERS[ANSWERS.length - 1])
    expect(pickFallback(() => 1).heading).toBe(FALLBACK_REASONS[FALLBACK_REASONS.length - 1].reason)
  })
})

describe('getReason', () => {
  const apiBase = 'https://api.example.test'

  it('calls GET /api/reasons/random with the timeout and returns the API reason', async () => {
    const fetchJson = vi.fn().mockResolvedValue({ ...liveShape, reason: 'From the API' })
    const result = await getReason({ apiBase, fetchJson })
    expect(fetchJson).toHaveBeenCalledWith('https://api.example.test/api/reasons/random', API_TIMEOUT_MS)
    expect(result).toMatchObject({ heading: 'From the API', source: 'api' })
  })

  it('handles a trailing slash in the API address', async () => {
    const fetchJson = vi.fn().mockResolvedValue(liveShape)
    await getReason({ apiBase: `${apiBase}/`, fetchJson })
    expect(fetchJson).toHaveBeenCalledWith('https://api.example.test/api/reasons/random', API_TIMEOUT_MS)
  })

  it('shows the live explanation without a heading for today’s data, rather than falling back', async () => {
    const result = await getReason({ apiBase, fetchJson: vi.fn().mockResolvedValue(liveShape) })
    expect(result).toMatchObject({ heading: null, explanation: 'Placeholder explanation text.', source: 'api' })
  })

  it.each([
    ['no API address configured', undefined],
    ['an empty API address', '  '],
  ])('falls back without a network call when there is %s', async (_, base) => {
    const fetchJson = vi.fn()
    const result = await getReason({ apiBase: base, fetchJson, random: () => 0 })
    expect(fetchJson).not.toHaveBeenCalled()
    expect(result).toMatchObject({ heading: FALLBACK_REASONS[0].reason, source: 'fallback' })
  })

  it.each([
    ['a network error', () => Promise.reject(new Error('Network Error'))],
    ['a timeout', () => Promise.reject(Object.assign(new Error('timeout of 6000ms exceeded'), { code: 'ECONNABORTED' }))],
    ['a server error (500)', () => Promise.reject(Object.assign(new Error('Request failed with status code 500'), { response: { status: 500 } }))],
    ['an empty body', () => Promise.resolve('')],
    ['an HTML error page', () => Promise.resolve('<html>Application error</html>')],
    ['a reason with no text at all', () => Promise.resolve({ ...liveShape, explanation: '' })],
  ])('falls back on %s', async (_, response) => {
    const result = await getReason({ apiBase, fetchJson: vi.fn(response), random: () => 0 })
    expect(result).toMatchObject({ source: 'fallback', heading: FALLBACK_REASONS[0].reason })
  })
})
