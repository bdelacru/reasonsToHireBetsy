# ADR 0001: The Magic 8-Ball becomes a standalone app inside the existing Vite frontend

- **Status:** Accepted (Betsy, 2026-10-11). Phase 1 is being implemented. Phases 2–4 aren't started.
- **Details and evidence:** [docs/research/v2-projects-page-direction.md](../research/v2-projects-page-direction.md), section 9.

## Context

reasonstohirebetsy.com started as a Magic 8-Ball app. The v2 redesign turns the site into a professional portfolio with several projects, and the 8-Ball becomes one of them. The 8-Ball should keep its own playable page, its original personality and its working behavior, without the current homepage changing until the v2 portfolio is ready.

Facts that shaped the decision (verified 2026-10-11):
- The 8-Ball lives entirely inside `frontend/src/App.tsx` and the global `index.css`.
- The frontend is one Vite + React app with a single HTML entry, no router library and no `vercel.json`.
- The 8-Ball only calls `GET /api/reasons/random` on the Render API. CORS allows only `https://reasonstohirebetsy.com`.
- The API never returns `title`, and live reasons currently have an empty `reason`. The text is probably in the old, unmapped `title` column.

## Decision

1. **Option A2:** a second HTML page in the existing Vite app (a multi-page build), with **no routing dependency**. Considered and rejected:
   - A1: client-side routing, which needs a router and a Vercel rewrite
   - B: a separate frontend package
   - C: a separate deployment, which needs CORS and hosting changes
2. **Two URLs:**
   - `/apps/magic-8-ball` is the playable app, with a **Back to Portfolio** link. Its target is `/` until the v2 portfolio exists.
   - `/projects/magic-8-ball` is the portfolio case study, with a **Play Magic 8-Ball** action (phase 2).
3. **Design:** the original April 2025 personality and illustration, with the 2026 behavior: fallback reasons, keyboard and screen-reader support, and reduced motion.
4. **Reason handling:** show `reason` as the heading (or `title`, if it's ever sent). Never invent a heading. Fall back to local reasons on a missing, empty, malformed or failed response. Never display submitter fields. The backend API contract doesn't change.
5. **No `vercel.json`** unless a preview deployment shows it's needed.
6. **The current homepage stays unchanged** (`App.tsx`, `main.tsx`, `index.css`, `index.html`) until the v2 portfolio replaces it.
7. **Vitest** (a dev-only dependency) tests the reason handling.

## Consequences

- **Benefits:**
  - The app is a real file at its path, so direct visits, refreshes and Back/Forward work without routing code.
  - Same origin, so no CORS or backend change.
  - The homepage's source is untouched.
- **Duplication:** about 40 lines of 8-Ball logic exist in both `App.tsx` and `src/apps/magic-8-ball/`. That's accepted because the old homepage will be retired.
- **Homepage build output:** the multi-page build can move shared code (React) into a shared chunk, which changes the homepage's built file names but not its behavior.
- **Live data:** reasons show without headings until a separate data-repair task (phase 3) moves the `title` text into `reason`.
- **Local servers:** Vite's dev and preview servers serve a folder's `index.html` only with a trailing slash, so without one they show the homepage. A small plugin in `vite.config.ts` redirects `/apps/magic-8-ball` to `/apps/magic-8-ball/` on those servers only. It changes nothing in the production build.
- **Back to Portfolio:** since 2026-10-12 it always links to `/#/projects`, the recipe-box portfolio's Projects card ([ADR 0002](0002-recipe-box-portfolio-homepage.md)). The `VITE_PORTFOLIO_URL` setting is gone.
- **Homepage (update 2026-10-12):** point 6 above is superseded. The recipe-box portfolio replaces the homepage ([ADR 0002](0002-recipe-box-portfolio-homepage.md)). The case study planned for `/projects/magic-8-ball` is the portfolio's `#/projects/magic-8-ball` card.
- **Vercel:** behavior without a trailing slash (`/apps/magic-8-ball`) and any rewrites in the Vercel dashboard must be checked on a preview deployment.
- **Security:** the backend security issues (open write endpoints, exposed unapproved reasons and submitter fields, public Swagger) remain until separate approved work.
