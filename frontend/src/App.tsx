import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import BetsyMagicBall from './assets/magic8ball-betsy.png'
import './index.css'

interface Reason {
  id: string
  title: string
  reasonType: string
  explanation: string
  imageUrl?: string
}

const fallbackReasons: Reason[] = [
  {
    id: 'fallback-1',
    title: 'I zoom out before I zoom in.',
    reasonType: 'PROFESSIONAL',
    explanation:
      'Before I start changing code, I want to understand the user, the system around the change, and how we will know the solution is actually working.',
  },
  {
    id: 'fallback-2',
    title: 'I follow the problem across layers.',
    reasonType: 'TECHNICAL',
    explanation:
      'Sometimes the answer is in the UI. Sometimes it is an API, a database query, deployment configuration, or the logs. I care more about finding the real cause than protecting a favorite layer.',
  },
  {
    id: 'fallback-3',
    title: 'I ask one more question.',
    reasonType: 'SOFT_SKILL',
    explanation:
      'A ticket can say “add search,” but the useful questions are what people need to find, how they expect it to behave, and what happens when the happy path is not enough.',
  },
  {
    id: 'fallback-4',
    title: 'I bring Betsy energy.',
    reasonType: 'BETSY_ENERGY',
    explanation:
      'I care deeply about the work, but I do not believe being serious about engineering requires taking yourself seriously all the time.',
  },
]

const magic8BallAnswers = [
  'Without a doubt.',
  'Absolutely yes.',
  'Most definitely.',
  'Signs point to yes.',
  'The universe agrees.',
  'Heck yeah.',
  'Yes, yes, YES!',
]

const systemLayers = [
  'User',
  'Experience',
  'Frontend',
  'API',
  'Services',
  'Data',
  'Infrastructure',
  'Observability',
]

const technologies = [
  'Java',
  'Kotlin',
  'Spring Boot',
  'React',
  'TypeScript',
  'REST APIs',
  'PostgreSQL',
  'MongoDB',
  'AWS',
  'Kubernetes',
  'OpenShift',
  'Datadog',
]

function App() {
  const [reason, setReason] = useState<Reason | null>(null)
  const [loading, setLoading] = useState(false)
  const [affirmation, setAffirmation] = useState('Signs point to yes.')
  const [isEightBallOpen, setIsEightBallOpen] = useState(false)
  const modalCloseRef = useRef<HTMLButtonElement>(null)

  const API_BASE = import.meta.env.VITE_API_URL

  const getEmoji = (type: string) => {
    switch (type) {
      case 'TECHNICAL':
        return '💻'
      case 'PROFESSIONAL':
        return '📈'
      case 'SOFT_SKILL':
        return '🧠'
      case 'PERSONALITY':
        return '💁‍♀️'
      case 'BETSY_ENERGY':
        return '✨'
      default:
        return '🎯'
    }
  }

  const useFallbackReason = () => {
    const fallback = fallbackReasons[Math.floor(Math.random() * fallbackReasons.length)]
    setReason(fallback)
  }

  const getRandomReason = async () => {
    setLoading(true)
    setAffirmation(magic8BallAnswers[Math.floor(Math.random() * magic8BallAnswers.length)])

    if (!API_BASE) {
      useFallbackReason()
      setLoading(false)
      return
    }

    try {
      const response = await axios.get<Reason>(`${API_BASE}/api/reasons/random`, {
        timeout: 6000,
      })
      setReason(response.data)
    } catch (error) {
      console.error('Error fetching reason. Using a local fallback instead.', error)
      useFallbackReason()
    } finally {
      setLoading(false)
    }
  }

  const openEightBall = () => {
    setIsEightBallOpen(true)
    if (!reason) getRandomReason()
  }

  useEffect(() => {
    if (!isEightBallOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsEightBallOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    document.body.classList.add('modal-open')
    requestAnimationFrame(() => modalCloseRef.current?.focus())

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.classList.remove('modal-open')
    }
  }, [isEightBallOpen])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Reasons to Hire Betsy home">
          <span className="brand-mark">B.</span>
          <span>Reasons to Hire Betsy</span>
        </a>
        <nav className="nav-links" aria-label="Portfolio sections">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
          <a href="/Betsy_De_La_Cruz_Resume.pdf" target="_blank" rel="noreferrer">
            Résumé
          </a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero section" id="top">
          <div className="hero-copy">
            <p className="eyebrow">BETSY DE LA CRUZ · SOFTWARE ENGINEER</p>
            <h1>I think beyond the code in front of me.</h1>
            <p className="hero-lede">
              I’m a full-stack software engineer with 7+ years of experience. I like understanding the entire
              problem — from the user experience to the backend, infrastructure, and production behavior —
              before deciding what the right solution should be.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                See how I work <span aria-hidden="true">↓</span>
              </a>
              <a className="button button-secondary" href="/Betsy_De_La_Cruz_Resume.pdf" target="_blank" rel="noreferrer">
                View résumé
              </a>
            </div>
            <p className="hero-note">Currently exploring Software Engineer II through Senior full-stack opportunities.</p>
          </div>

          <div className="hero-art" aria-label="Illustration of Betsy with her dogs and a Magic 8-Ball">
            <div className="image-frame">
              <img src={BetsyMagicBall} alt="Illustration of Betsy holding a Magic 8-Ball with two dogs" />
            </div>
            <button className="eight-ball-teaser" type="button" onClick={openEightBall} aria-label="Open the Magic 8-Ball">
              <span className="mini-ball" aria-hidden="true">8</span>
              <span>
                Still need a reason?
                <strong> Ask the 8-Ball.</strong>
              </span>
            </button>
          </div>
        </section>

        <section className="question-section section" aria-labelledby="question-heading">
          <div className="section-number">01</div>
          <div className="section-intro">
            <p className="eyebrow">HOW I THINK</p>
            <h2 id="question-heading">I tend to ask one more question.</h2>
            <p>
              A feature request is usually the beginning of the conversation, not the end of it. Before I build,
              I want to understand what someone is actually trying to accomplish.
            </p>
          </div>

          <div className="search-story" role="group" aria-label="Questions I ask before implementing search">
            <div className="ticket-card">
              <span className="ticket-label">THE TICKET SAYS</span>
              <p>“Add search.”</p>
            </div>
            <div className="question-grid">
              <article><span>01</span><p>What are users actually trying to find?</p></article>
              <article><span>02</span><p>Which fields should be searchable?</p></article>
              <article><span>03</span><p>Exact, partial, or case-insensitive matching?</p></article>
              <article><span>04</span><p>Would filters communicate intent more clearly?</p></article>
              <article><span>05</span><p>Can someone use it fully with a keyboard?</p></article>
              <article><span>06</span><p>What happens when nothing matches?</p></article>
            </div>
          </div>
          <p className="principle-callout">Good engineering starts before implementation.</p>
        </section>

        <section className="system-section section" aria-labelledby="system-heading">
          <div className="section-number">02</div>
          <div className="system-copy">
            <p className="eyebrow">FULL-STACK, FOR REAL</p>
            <h2 id="system-heading">I follow the problem wherever it goes.</h2>
            <p>
              Sometimes the problem is React. Sometimes it is Spring. Sometimes it is a database query,
              deployment configuration, or something you only understand after looking at the logs. I care less
              about which layer owns the problem and more about how the pieces affect one another.
            </p>
          </div>

          <div className="system-map" aria-label="End-to-end system layers">
            {systemLayers.map((layer, index) => (
              <div className="system-layer" key={layer}>
                <span>{layer}</span>
                {index < systemLayers.length - 1 && <span className="system-arrow" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>

          <div className="tech-list" aria-label="Technologies I work with">
            {technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </section>

        <section className="work-section section" id="work" aria-labelledby="work-heading">
          <div className="section-number">03</div>
          <div className="section-intro wide">
            <p className="eyebrow">SELECTED THINKING</p>
            <h2 id="work-heading">Some problems I’ve spent time thinking about.</h2>
            <p>Not every useful engineering artifact is a public GitHub repo. These are examples of how I approach ambiguous work.</p>
          </div>

          <div className="case-grid">
            <article className="case-card featured-case">
              <div className="case-meta"><span>CASE STUDY 01</span><span>UX · FRONTEND · ACCESSIBILITY</span></div>
              <h3>Search isn’t always just a search bar.</h3>
              <p>
                A research-driven look at global search, field-specific search, filters, matching behavior, empty
                states, and accessibility — before committing to the implementation.
              </p>
              <div className="case-visual search-visual" aria-hidden="true">
                <div className="fake-search">⌕ Search scenarios...</div>
                <div className="fake-filters"><span>Status</span><span>Type</span><span>Owner</span></div>
              </div>
              <span className="case-status">Detailed write-up in progress</span>
            </article>

            <article className="case-card">
              <div className="case-meta"><span>CASE STUDY 02</span><span>AI · DEV EXPERIENCE · DOCUMENTATION</span></div>
              <h3>Giving AI the right context without creating documentation chaos.</h3>
              <p>
                As coding agents became part of day-to-day development, I worked through a harder question than
                “which model should we use?”: what information belongs where so humans and AI can both trust it?
              </p>
              <div className="doc-map" aria-label="Documentation responsibilities">
                <span><strong>README</strong><small>How do I run it?</small></span>
                <span><strong>Agent guide</strong><small>What must AI know?</small></span>
                <span><strong>Issue docs</strong><small>Why this change?</small></span>
                <span><strong>Feature docs</strong><small>What stays true?</small></span>
              </div>
              <p className="case-lesson"><strong>Principle:</strong> AI output is a hypothesis until the real system verifies it.</p>
            </article>

            <article className="case-card coming-soon">
              <div className="case-meta"><span>CASE STUDY 03</span><span>SYSTEMS · DEBUGGING · OBSERVABILITY</span></div>
              <h3>When the answer isn’t in one layer.</h3>
              <p>
                An anonymized engineering investigation following production behavior across application code,
                infrastructure, configuration, and observability signals.
              </p>
              <div className="debug-path" aria-hidden="true">
                <span>symptom</span><b>→</b><span>logs</span><b>→</b><span>service</span><b>→</b><span>infra</span><b>→</b><span>cause</span>
              </div>
              <span className="case-status">Coming next</span>
            </article>
          </div>
        </section>

        <section className="experience-section section" id="experience" aria-labelledby="experience-heading">
          <div className="section-number">04</div>
          <div className="section-intro">
            <p className="eyebrow">EXPERIENCE</p>
            <h2 id="experience-heading">7+ years. Three very different engineering environments.</h2>
          </div>

          <div className="timeline">
            <article>
              <time>2019—2023</time>
              <div>
                <h3>Vanguard</h3>
                <p className="timeline-theme">Where I learned to build for real users.</p>
                <p>Built APIs and customer-facing systems while learning accessibility, production support, and observability.</p>
              </div>
            </article>
            <article>
              <time>2023—2025</time>
              <div>
                <h3>JPMorgan Chase</h3>
                <p className="timeline-theme">Where I learned to think at enterprise scale.</p>
                <p>Worked across backend systems and cloud infrastructure, including APIs supporting a 30M+ document migration.</p>
              </div>
            </article>
            <article>
              <time>2025—Now</time>
              <div>
                <h3>Sinch</h3>
                <p className="timeline-theme">Where my engineering scope expanded.</p>
                <p>Work end-to-end across full-stack delivery, product refinement, UX research, production troubleshooting, and AI-assisted engineering.</p>
              </div>
            </article>
          </div>
          <p className="timeline-footer">Still asking too many questions before writing the code.</p>
        </section>

        <section className="about-section section" id="about" aria-labelledby="about-heading">
          <div className="section-number">05</div>
          <div className="about-copy">
            <p className="eyebrow">THE PERSON BEHIND THE PULL REQUESTS</p>
            <h2 id="about-heading">Engineering is a big part of me. It isn’t all of me.</h2>
            <p>
              I like teams where curiosity, clarity, humor, and care for the people using what we build are treated
              as engineering strengths — not extras.
            </p>
          </div>
          <div className="personality-grid">
            <article><span aria-hidden="true">🎻</span><h3>Music</h3><p>Violin, piano, and guitar.</p></article>
            <article><span aria-hidden="true">🍳</span><h3>Cooking</h3><p>I will absolutely tell you what I made this week.</p></article>
            <article><span aria-hidden="true">🐶</span><h3>Mickey</h3><p>Unofficial engineering manager. Very demanding.</p></article>
            <article><span aria-hidden="true">🤝</span><h3>Mentoring</h3><p>I care about helping other people find their footing.</p></article>
          </div>
        </section>

        <section className="contact-section section" aria-labelledby="contact-heading">
          <p className="eyebrow">LET’S TALK</p>
          <h2 id="contact-heading">Have a problem worth understanding?</h2>
          <p>I’m currently exploring my next software engineering opportunity.</p>
          <div className="contact-actions">
            <a className="button button-primary" href="mailto:betsydelacru@gmail.com">Email me</a>
            <a className="text-link" href="https://github.com/bdelacru" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a className="text-link" href="/Betsy_De_La_Cruz_Resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Designed & built by Betsy De La Cruz.</span>
        <button type="button" className="footer-eight-ball" onClick={openEightBall} aria-label="Ask the Magic 8-Ball">
          🎱
        </button>
        <span>Chicago · 2026</span>
      </footer>

      {isEightBallOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setIsEightBallOpen(false)}>
          <section
            className="eight-ball-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="eight-ball-heading"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              ref={modalCloseRef}
              className="modal-close"
              type="button"
              onClick={() => setIsEightBallOpen(false)}
              aria-label="Close Magic 8-Ball"
            >
              ×
            </button>
            <div className="modal-ball" aria-hidden="true"><span>8</span></div>
            <p className="eyebrow">THE ORIGINAL REASONS TO HIRE BETSY</p>
            <h2 id="eight-ball-heading">Is Betsy your next great hire?</h2>
            <p className="affirmation">“{affirmation}”</p>

            {reason && (
              <div className="reason-card" aria-live="polite">
                <span className="reason-type">{getEmoji(reason.reasonType)} {reason.reasonType.replace('_', ' ')}</span>
                <h3>{reason.title}</h3>
                <p>{reason.explanation}</p>
              </div>
            )}

            <button className="button button-primary modal-shake" type="button" onClick={getRandomReason} disabled={loading}>
              {loading ? 'Consulting the universe…' : 'Shake again'}
            </button>
            <p className="modal-footnote">Yes, this tiny Easter egg still has a Spring Boot backend.</p>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
