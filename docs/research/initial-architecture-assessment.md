# Initial Architecture Assessment

- **Date:** 2026-10-09
- **Commit assessed:** `01ee832` (`main`)
- **Method:** Read-only review of the tracked source and config files. No dependencies were installed, and no builds, lint, tests, `npm outdated` or live-site checks were run.

**Legend:** **Verified** means confirmed by reading the code at this commit. **Recommendation** marks a suggestion. **Estimate** marks a judgment that hasn't been measured.

---

## 1. Technology stack and architecture (verified)

| Layer | Details |
|---|---|
| Frontend | React 19, Vite 6, TypeScript 5.7 and axios, in `frontend/`. Deployed to Vercel. |
| Backend | Spring Boot 3.4.4 on Java 21, with JPA, PostgreSQL, Flyway, springdoc/Swagger and Cloudinary, in `backend/`. Deployed to Render using the root `Dockerfile`. |
| Build | A Maven parent `pom.xml` with one module (`backend`). The frontend is built separately with npm. |

**How it works:**
- Almost the whole site is static content in a single 437-line component, `frontend/src/App.tsx`.
- The backend is used only by the Magic 8-Ball modal, which calls `GET /api/reasons/random` (`App.tsx:123`).
- If `VITE_API_URL` isn't set, or the request fails or takes over 6 seconds, the modal shows hardcoded `fallbackReasons` (`App.tsx:14-43`).
- `VITE_API_URL` is set in `frontend/.env.production`.
- The backend follows the usual controller → service → repository pattern (`ReasonController.java`, `ReasonService.java`, `ReasonRepository.java`) around one JPA entity, `Reason`.
- The database schema is managed by Flyway (`backend/src/main/resources/db/migration/V1__init_reason_table.sql` and `V2__add_reason_column.sql`).

**API endpoints** (`backend/src/main/java/com/betsy/reasonstohire/controller/ReasonController.java`):

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/reasons/random` | One random approved reason |
| GET | `/api/reasons` | All reasons, including unapproved ones |
| POST | `/api/reasons` | Create a reason |
| POST | `/api/reasons/upload` | Create a reason with an image uploaded to Cloudinary |

## 2. Documentation (verified)

- There's no `CLAUDE.md`, `AGENTS.md`, `.claude/` or `.github/` (so no CI either).
- The root `README.md` is out of date:
  - It says the site uses TailwindCSS, but Tailwind isn't loaded (see section 3).
  - It refers to `.env.template` and `.env.local.template`, which don't exist.
  - It says CORS allows localhost. `backend/.../config/CorsConfig.java:16` only allows `https://reasonstohirebetsy.com`.
  - It lists a `SOFT_SKILL` category that the backend doesn't have.
- `frontend/README.md` is the unedited Vite template README.
- The Swagger contact is a placeholder, `betsy@example.com` (`ReasonsToHireApplication.java:10`).
- `frontend/package.json` still has the template's `description` and `main` fields.

## 3. UI, styling and accessibility

### Styling (verified)
- All styles are hand-written CSS in `frontend/src/index.css`, using CSS custom properties (`--ink`, `--purple`, `--cream` and others) and two breakpoints (900px and 620px).
- Tailwind is installed but never loaded, because `index.css` has no `@import "tailwindcss"`.
- `frontend/tailwind.config.js` uses the v3 format, which v4 ignores unless a `@config` line points to it.
- So these are all unused: Tailwind, `autoprefixer`, `frontend/postcss.config.js`, the `build:css` script (which points to `bin/tailwindcss.exe`) and the config file.

### Components (verified)
- There are no separate components. The header, 7 sections, footer and modal all live inline in `App.tsx`.
- Content (experience, case studies, tech list, personality cards) is hardcoded in the JSX or in module-level arrays.

### Accessibility that already works (verified)
- A skip link
- `aria-labelledby` on sections
- `:focus-visible` outlines
- Support for `prefers-reduced-motion`
- Escape closes the modal, and focus moves to its close button when it opens
- Alt text on the images

### Accessibility gaps
- **Modal focus (verified):** the modal doesn't trap focus, and focus doesn't return to the button that opened it (`App.tsx:140-155`).
- **Screen-reader updates (verified):** the `aria-live` region only appears once a reason exists (`App.tsx:419`), so the first answer may not be announced.
- **Mobile navigation (verified):** below 900px, every nav link except Résumé is hidden (`index.css`, `.nav-links a:not(:last-child)`), and there's no menu to replace them.
- **Ignored label (verified):** `aria-label` sits on a plain `<div>` (`App.tsx:199`), where screen readers ignore it.
- **Dates (verified):** the `<time>` elements have no `dateTime` attribute (`App.tsx:330-346`).
- **Contrast (estimate):** yellow `.section-number` text (`#f5c25b`) on cream is roughly 1.6:1. `.modal-footnote` (`#8a818e` on white, small text) is roughly 3.6:1. Both likely fail WCAG AA.

### Performance and SEO (verified)
- `frontend/src/assets/magic8ball-betsy.png` is about 2.5 MB.
- The favicon, `frontend/public/faveicon.png`, is about 1.5 MB (and the filename has a typo).
- `frontend/index.html` has no meta description and no Open Graph tags.

## 4. Technical debt and risks

### Bugs (verified in code, not run)
1. **The 8-Ball title is probably blank with live data.**
   - The frontend reads `reason.title` (`App.tsx:421`).
   - The `Reason` entity has no `title` field. It maps `reason` instead (`backend/.../model/Reason.java:22`).
   - The database has both a `title` and a `reason` column (V1 and V2 migrations).
   - The fallback reasons do have `title`, which may be hiding the problem.
2. **Categories don't match.**
   - The frontend uses `SOFT_SKILL`, which isn't in `backend/.../model/ReasonType.java`.
   - `getEmoji` (`App.tsx:90-105`) has no entries for `COMMUNICATION`, `TEAM_PLAYER`, `LEADERSHIP` or `CREATIVE`.
3. **A function is named like a React hook.** `useFallbackReason` (`App.tsx:107`) is called inside an ordinary function. ESLint's `react-hooks` rule will likely flag it.

### Security (verified)
- **Anyone can write to the database.** `POST /api/reasons` and `POST /api/reasons/upload` have no authentication.
- **Callers can approve their own submissions.** The request body maps straight onto the entity, so a caller can set `approved: true`.
- **Anyone can upload images** to the Cloudinary account, of any size or type, which risks abuse and cost.
- **Unapproved reasons are public.** `GET /api/reasons` returns all of them.

### Dependencies (pins verified; how outdated they are is from knowledge, not checked against the registries)
- **Pinned below what Spring Boot 3.4.4 manages** (`backend/pom.xml`): Flyway `9.22.3` (Boot itself manages 10.x), Mockito `5.4.0` and Testcontainers `1.18.0`.
- **springdoc `2.2.0`** is old for Boot 3.4.
- **Spring Boot 3.4.x** is past its open-source support window.
- **Unneeded packages:** `@types/axios` (a deprecated stub, since axios ships its own types) and `jakarta.annotation-api`.

### Hygiene (verified)
- **No tests:** there's no `backend/src/test` and no frontend test setup, even though the test dependencies are declared.
- **Dead files and leftovers:**
  - The `frontend/src/assets/react.svg` asset is unused.
  - `System.out.println("Hello, World!")` is still in `ReasonsToHireApplication.java`.
  - Production runs with `show-sql: true` (`application.yml`).
  - `.vscode/launch.json` names the wrong main class (`ReasonToHireApplication`, missing the "s").
- **IDE files:** `backend/.classpath` and `backend/.project` are committed, and the root `.gitignore` doesn't ignore `.idea/`.
- **Docker** (`Dockerfile`): the image runs as root on a full JDK instead of a JRE, and there's no `.dockerignore`.
- **API design:**
  - The API returns the JPA entity directly instead of a separate response object.
  - It uses field injection (`@Autowired`).
  - `ReasonService.getRandomReason` loads every approved row to pick one.
  - When there are no approved reasons, it throws `IllegalStateException`, which becomes a 500 error.
- **Swagger annotations are inaccurate:** the example `id` is `"1"` for a UUID field, and the description of `submittedByOthers` is wrong (`Reason.java`).

## 5. LangGraph and multi-agent evaluation (recommendation)

The site is a recruiter-facing portfolio whose only dynamic feature is a random-row lookup. Graph orchestration doesn't solve a problem it has today.

| Idea | Verdict |
|---|---|
| **"Ask about Betsy" Q&A**, answered from the résumé and case studies with sources cited | Practical and on-brand. It's a single model call plus retrieval, so it doesn't need LangGraph. |
| **Moderation for user-submitted reasons** (classify → safety check → owner approves or rejects → publish) | The best real fit for LangGraph: it's a stateful workflow with a human approval step. It's also on the README's Next Steps list. |
| **Job-description matcher** (paste a job posting → pull out requirements → match them to evidence → cited summary) | A good learning project, but it's a linear pipeline. Plain code is enough unless it gains branching or retries. |
| **Multi-agent chat on the main site** | Unnecessary. It adds slow responses, cost and prompt-injection risk where recruiters won't wait. |

**Architecture notes:**
- Keep AI work in a separate service, or behind a `/lab` route, so the portfolio stays fast and works even if the AI part is down.
- LangGraph is Python/JS. The backend is Java, so the options are a small Python sidecar, LangGraph4j, or Spring AI.
- Any public AI endpoint needs rate limiting, a spending cap and protection against prompt injection.

## 6. Prioritized roadmap (recommendation)

### Phase 0: Fix what's broken (small, do first)
- Fix the `title`/`reason` mismatch between the frontend and the backend.
- Line up the category values on both sides.
- Lock down the write endpoints and hide unapproved reasons from `GET /api/reasons`.

### Phase 1: Documentation foundation
- Rewrite the root `README.md` to match reality, and replace `frontend/README.md`.
- Add `.env.example` files for the frontend and the backend.
- Write a curated `CLAUDE.md` with build and run commands, conventions, and areas that need care.
- Add `docs/` for decision records and case-study drafts.
- Fix `.gitignore` (add `.idea/`) and `.vscode/launch.json`.

This phase is also natural material for Case Study 02 on AI context.

### Phase 2: Hygiene and safety net
- Decide on Tailwind: adopt it or remove it. Removing it is suggested, since the custom CSS is coherent.
- Compress the images and delete the dead files.
- Upgrade Spring Boot and springdoc, and let Boot's dependency management handle the pinned versions.
- Add backend slice tests and Vitest tests for the frontend.
- Add a GitHub Actions workflow to lint, build and test.

### Phase 3: UI/UX
- Split `App.tsx` into components and move the content into data files.
- Add a mobile menu.
- Fix the modal focus handling, the live region and the contrast problems.
- Add SEO and Open Graph metadata.
- Turn the "in progress" case studies into real pages.
- Add dark mode, and run a Lighthouse pass.

### Phase 4: AI experiments
- Start with the grounded Q&A feature, plus a small evaluation set to check its answers.
- Then build the moderation workflow in LangGraph with a manual approval step, as an isolated service.
- Treat multi-agent work as a separate lab, not part of the production site.
