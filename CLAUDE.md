# CLAUDE.md

Instructions for Claude Code in this repository. Keep this file short and actionable;
explanations belong in the docs linked below. Files marked "(planned)" do not exist yet;
if one is missing, say so rather than guessing its contents.

## Project context

- ReasonsToHireBetsy is Betsy De La Cruz's software engineering portfolio, aimed at recruiters
  and hiring managers. Live: https://reasonstohirebetsy.com
- v2.0 is a redesign: a professional portfolio first, with subtle cooking-inspired personality
  and optional interactive Easter eggs (the existing Magic 8-Ball is one candidate).
- The current architecture is not necessarily the target architecture. Check
  `docs/architecture.md` (planned) for what is current and what is approved before building
  on either.
- Current stack: a Vite multi-page build in `frontend/`: the recipe-box portfolio at `/` (plain
  HTML, CSS and JavaScript in `index.html` and `src/portfolio/`) and the Magic 8-Ball at
  `/apps/magic-8-ball/` (React 19 + TypeScript); Spring Boot 3.4 (Java 21),
  PostgreSQL, Flyway and Cloudinary in `backend/`. Frontend deploys to Vercel; backend deploys
  to Render via the root `Dockerfile`.

## Commands (frontend commands verified 2026-10-12; backend commands not yet run)

    cd frontend && npm install          # install
    cd frontend && npm run dev          # dev server (set VITE_API_URL to reach the backend)
    cd frontend && npm run lint
    cd frontend && npm test             # Vitest (the Magic 8-Ball's reason handling)
    cd frontend && npm run build        # tsc -b && vite build
    mvn -f backend/pom.xml spring-boot:run   # needs DB_* and CLOUDINARY_* env vars, see README
    mvn -f backend/pom.xml package

Automated tests cover only the Magic 8-Ball's reason handling; the portfolio's behavior is checked
in a real browser. There are no backend tests. When you run a command, report what actually happened.

## How to work

1. Investigate before implementing. Read the relevant docs (below) before repeating research.
2. Propose a plan before significant changes; get approval before major architectural changes,
   new dependencies, or destructive operations (deletes, history rewrites, data changes).
3. For significant implementation decisions, briefly explain the reasoning, alternatives, and
   trade-offs so I can understand the engineering approach, in the response or a decision
   record. Avoid lengthy explanations for routine changes.
4. Prefer simple, maintainable solutions. No abstractions without a current need.
5. Be token-efficient: read what you need, reuse findings, but never trade correctness for brevity.

## Where things live (one home per topic; link, don't duplicate)

| Topic | File |
|---|---|
| Project overview, setup, environment variables, deployment | `README.md` |
| Visual direction, UX principles, design decisions | `DESIGN.md` (planned) |
| Current and approved target architecture | `docs/architecture.md` (planned) |
| Feature specifications | `docs/features/` (planned) |
| Detailed technical investigations (linked to a GitHub issue) | `docs/issues/` (planned) |
| Architecture decision records | `docs/decisions/` (planned) |
| Research and historical assessments (snapshots, not instructions) | `docs/research/` |

Work is tracked in GitHub Issues.

## UI/UX rules

- Read `DESIGN.md` (planned) before any UI change.
- Target WCAG 2.2 AA. Preserve the existing skip link, visible focus styles and
  `prefers-reduced-motion` handling.
- Prioritize, in order: clear recruiter-facing content, accessibility, responsive layout
  (check mobile width), performance.
- The recipe-box portfolio is the approved v2.0 design (2026-10-12): its colors, fonts, layout
  and motion are the baseline, and changing them needs approval. Exploration is still welcome,
  but don't apply exploratory choices to production UI without approval. Record approved design
  decisions in `DESIGN.md` or `docs/decisions/`.
- Current convention: plain CSS with custom properties, in `frontend/src/portfolio/portfolio.css`
  (portfolio) and `frontend/src/apps/magic-8-ball/magic-8-ball.css` (game). Tailwind is
  installed but not loaded, so do not add Tailwind classes.
- Avoid generic AI-generated visual patterns (stock gradient heroes, interchangeable card
  grids, decorative emoji as icons, filler copy). Easter eggs must be optional,
  keyboard-operable, respect reduced motion, and never block content.

## Engineering and safety rules

- Never expose secrets or commit real credentials. `.env.example` files hold placeholders only.
- Do not change production configuration, deployment settings (`Dockerfile`, Vercel/Render),
  or database migrations without approval. Never edit an already-applied Flyway migration;
  add a new one.
- Known security risk: `POST /api/reasons` and `POST /api/reasons/upload` are unauthenticated
  and accept the `approved` field from the request body. Do not build on them as if they are safe.
- The frontend falls back to hardcoded reasons when the API fails or is slow, so a working
  8-Ball modal does not prove the backend works. Also known: the frontend reads `title`
  but the API returns `reason`.
- Do not introduce LangGraph or other AI frameworks without an approved use case and an
  architecture decision record.
- Report verification honestly: never say a build, lint or test passed unless it ran and passed.

## Keeping docs current

- When behavior, architecture, setup or conventions change, update the owning doc in the same change.
- Keep this file concise; move explanations to the linked docs.
- Create feature specifications, issue investigations, and decision records only when they
  provide reusable context. Avoid unnecessary documentation and duplicate findings.
- Keep `docs/research/` as dated history. Don't edit it to describe the present, and don't
  treat it as current instructions.
