import { useRef, useState } from 'react'
import illustration800 from './assets/magic8ball-betsy-800.jpg'
import illustration1200 from './assets/magic8ball-betsy-1200.jpg'
import { fetchJson } from './api'
import { getReason, pickAnswer, type DisplayReason } from './reasons'

// The standalone Magic 8-Ball at /apps/magic-8-ball: the original April 2025 page (illustration, purple
// question, Shake button, answer and reason card) with the 2026 behavior (fallback reasons, a live region
// for results, keyboard and reduced-motion support). Its own page and stylesheet; it shares nothing with
// the recipe-box portfolio on the homepage.

// "Back to Portfolio" goes to the portfolio's Projects card. A #/ route opens the recipe box straight there,
// with no opening animation, and Magic 8-Ball is the first project (ADR 0002).
const portfolioUrl = '/#/projects'

export default function MagicEightBallApp() {
  const [answer, setAnswer] = useState<string | null>(null)
  const [reason, setReason] = useState<DisplayReason | null>(null)
  const [loading, setLoading] = useState(false)
  const [shakes, setShakes] = useState(0)
  const busy = useRef(false)

  const shake = async () => {
    // aria-disabled (not disabled) keeps keyboard focus on the button while it works; this guard ignores repeat presses.
    if (busy.current) return
    busy.current = true
    setLoading(true)
    setShakes((count) => count + 1)
    try {
      const next = await getReason({ apiBase: import.meta.env.VITE_API_URL, fetchJson })
      setAnswer(pickAnswer())
      setReason(next)
    } finally {
      busy.current = false
      setLoading(false)
    }
  }

  return (
    <div className="m8-page">
      <header className="m8-top">
        <a className="m8-back" href={portfolioUrl}>
          <span aria-hidden="true">←</span> Back to Portfolio
        </a>
      </header>

      <main className="m8-card">
        <img
          className="m8-illustration"
          src={illustration800}
          srcSet={`${illustration800} 800w, ${illustration1200} 1200w`}
          sizes="(min-width: 720px) 560px, calc(100vw - 4rem)"
          width={800}
          height={533}
          alt="Illustration of Betsy holding a Magic 8-Ball between her two dogs"
        />
        {/* The key restarts the shake animation on every press. */}
        <div key={shakes} className={shakes > 0 ? 'm8-ball is-shaking' : 'm8-ball'} aria-hidden="true">
          8
        </div>
        <h1 className="m8-question">Is Betsy your next great hire?</h1>
        <button type="button" className="m8-shake" onClick={shake} aria-disabled={loading}>
          {loading ? 'Shaking…' : 'Shake the Magic 8-Ball'}
        </button>

        <div className="m8-result" aria-live="polite" aria-busy={loading}>
          {answer && <p className="m8-answer">“{answer}”</p>}
          {reason && (
            <div className="m8-reason">
              {reason.heading && <h2>{reason.heading}</h2>}
              {reason.explanation && <p>{reason.explanation}</p>}
              {reason.typeLabel && (
                <p className="m8-type">
                  {reason.emoji && <span aria-hidden="true">{reason.emoji} </span>}
                  {reason.typeLabel}
                </p>
              )}
              {reason.source === 'fallback' && (
                <p className="m8-note">The live reasons didn’t load, so this one comes from a saved set.</p>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="m8-footer">
        <p>
          A small full-stack project by <a href={portfolioUrl}>Betsy De La Cruz</a>: React and TypeScript on Vercel, a Spring
          Boot API and PostgreSQL on Render.
        </p>
      </footer>
    </div>
  )
}
