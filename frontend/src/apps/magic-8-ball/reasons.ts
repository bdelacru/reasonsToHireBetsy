// Reason handling for the standalone Magic 8-Ball (/apps/magic-8-ball).
//
// The API (GET /api/reasons/random) returns the whole Reason entity: id, reason, reasonType, explanation,
// imageUrl, submittedBy, submittedByLink, relationship, submittedByOthers and approved. It never sends `title`.
// Live data currently has an empty `reason` (the text is probably in the old, unmapped `title` column), so the
// heading is optional: a missing heading is left out, never invented. Submitter fields are dropped here so
// they can't reach the page.

export type ReasonSource = 'api' | 'fallback'

export interface DisplayReason {
  heading: string | null
  explanation: string | null
  typeLabel: string | null
  emoji: string | null
  source: ReasonSource
}

export type FetchJson = (url: string, timeoutMs: number) => Promise<unknown>

export const API_TIMEOUT_MS = 6000

// The original April 2025 answers.
export const ANSWERS = [
  'Without a doubt.',
  'Absolutely yes.',
  'Most definitely.',
  'You’d be crazy not to.',
  'Signs point to yes.',
  'As certain as the sun rising.',
  'The universe agrees.',
  '1000% yes.',
  'Heck yeah.',
  'Yes, yes, YES!',
]

// Emoji for the backend's ReasonType values (backend/.../model/ReasonType.java).
const TYPE_EMOJI: Record<string, string> = {
  TECHNICAL: '💻',
  PROFESSIONAL: '📈',
  COMMUNICATION: '🗣️',
  TEAM_PLAYER: '🤝',
  LEADERSHIP: '🧭',
  CREATIVE: '🎨',
  PERSONALITY: '💁‍♀️',
  BETSY_ENERGY: '✨',
}

// Used when the API isn't configured, fails, times out or returns nothing usable. Same reasons as the
// current homepage, with types that exist in the backend (the homepage's SOFT_SKILL doesn't).
export const FALLBACK_REASONS: ReadonlyArray<{ reason: string; reasonType: string; explanation: string }> = [
  {
    reason: 'I zoom out before I zoom in.',
    reasonType: 'PROFESSIONAL',
    explanation:
      'Before I start changing code, I want to understand the user, the system around the change, and how we will know the solution is actually working.',
  },
  {
    reason: 'I follow the problem across layers.',
    reasonType: 'TECHNICAL',
    explanation:
      'Sometimes the answer is in the UI. Sometimes it is an API, a database query, deployment configuration, or the logs. I care more about finding the real cause than protecting a favorite layer.',
  },
  {
    reason: 'I ask one more question.',
    reasonType: 'COMMUNICATION',
    explanation:
      'A ticket can say “add search,” but the useful questions are what people need to find, how they expect it to behave, and what happens when the happy path is not enough.',
  },
  {
    reason: 'I bring Betsy energy.',
    reasonType: 'BETSY_ENERGY',
    explanation:
      'I care deeply about the work, but I do not believe being serious about engineering requires taking yourself seriously all the time.',
  },
]

const text = (value: unknown): string | null =>
  typeof value === 'string' && value.trim() !== '' ? value.trim() : null

// "TEAM_PLAYER" → "Team player". Anything that isn't an upper-case enum name is ignored.
export function formatType(value: unknown): string | null {
  if (typeof value !== 'string' || !/^[A-Z][A-Z_]*$/.test(value)) return null
  const words = value.toLowerCase().split('_').filter(Boolean).join(' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}

// Turns an API response into what the page shows, or null when there's nothing meaningful to show.
export function normalizeReason(data: unknown, source: ReasonSource = 'api'): DisplayReason | null {
  if (data === null || typeof data !== 'object' || Array.isArray(data)) return null
  const record = data as Record<string, unknown>
  // `title` is only a safety net in case the API ever sends it; today it doesn't.
  const heading = text(record.reason) ?? text(record.title)
  const explanation = text(record.explanation)
  if (!heading && !explanation) return null
  const type = typeof record.reasonType === 'string' ? record.reasonType : ''
  return { heading, explanation, typeLabel: formatType(record.reasonType), emoji: TYPE_EMOJI[type] ?? null, source }
}

const pick = <T,>(items: ReadonlyArray<T>, random: () => number): T =>
  items[Math.min(items.length - 1, Math.floor(random() * items.length))]

export function pickAnswer(random: () => number = Math.random): string {
  return pick(ANSWERS, random)
}

export function pickFallback(random: () => number = Math.random): DisplayReason {
  return normalizeReason(pick(FALLBACK_REASONS, random), 'fallback') as DisplayReason
}

// Asks the API for a reason; falls back to a local one if the API isn't configured, fails, times out,
// or returns an empty or malformed response.
export async function getReason(options: {
  apiBase: string | undefined
  fetchJson: FetchJson
  random?: () => number
}): Promise<DisplayReason> {
  const { apiBase, fetchJson, random = Math.random } = options
  const base = text(apiBase)
  if (base) {
    try {
      const reason = normalizeReason(await fetchJson(`${base.replace(/\/+$/, '')}/api/reasons/random`, API_TIMEOUT_MS))
      if (reason) return reason
    } catch {
      // Network error, timeout or error status: use a local reason instead.
    }
  }
  return pickFallback(random)
}
