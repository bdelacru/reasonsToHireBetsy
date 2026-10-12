# ADR 0002: The recipe-box portfolio replaces the homepage, as a static page in the Vite build

- **Status:** Accepted (Betsy, 2026-10-12). Implemented on the `v2-recipe-box` branch; not yet committed or deployed.
- **Builds on:** [ADR 0001](0001-magic-8-ball-standalone-app.md) (the standalone Magic 8-Ball and the multi-page build).
- **Design and evidence:** [docs/research/v2-recipe-box-interaction.md](../research/v2-recipe-box-interaction.md) (the prototype, dated 2026-10-11) and [docs/research/v2-projects-page-direction.md](../research/v2-projects-page-direction.md) (project content).

## Context

Betsy approved the recipe-box prototype (`explorations/v2-recipe-box/`) as the v2.0 design. The prototype was one static HTML file with inline CSS and JavaScript, served only by the dev server. Its cooking photos came from another prototype's git-ignored folder, and its "View project details" buttons opened that other prototype. The homepage at `/` was still the 2025 React app (`src/App.tsx`).

## Decision

1. **The recipe box is the homepage**, as plain HTML, CSS and JavaScript in the existing Vite multi-page build:
   - markup in `frontend/index.html`;
   - styles in `frontend/src/portfolio/portfolio.css`;
   - behavior in `frontend/src/portfolio/portfolio.js`;
   - photos in `frontend/src/portfolio/photos/`.

   It isn't rewritten in React, and it adds no dependencies. Vite fingerprints the CSS, the JavaScript and every photo, and the homepage no longer loads React.
2. **Hash routes stay:** `#/`, `#/experience`, `#/projects`, `#/ai`, `#/about`, plus the project details at `#/projects/magic-8-ball`, `#/projects/church-festival` and `#/projects/reasons-to-hire-betsy`. Static hosting serves `/` for all of them, so direct links, refreshes and Back/Forward work without rewrites or a `vercel.json`.
3. **Opening behavior:**
   - A visit to `/` with no route always starts with the closed box.
   - Nothing is stored, so there's no "already opened" memory.
   - A `#/` route, including a refresh after opening, opens straight to that card with no animation.
4. **Project details** (option A in the research doc):
   - The three detail cards from the recipe-index prototype are cards in the box, with their content carried over.
   - Opening one pulls its card up out of the box.
   - "All projects" puts it back, and the stack shows that project in front.
5. **Magic 8-Ball:** "Back to Portfolio" is always `/#/projects`, which opens Projects directly with Magic 8-Ball in front. `VITE_PORTFOLIO_URL` is removed.
6. **Photos:** 18 web-sized, metadata-free JPEGs (about 2 MB in total, served at sizes chosen by `srcset`) are committed:
   - copies of the prototype photos;
   - four straightened box textures;
   - a screenshot of the new site.

   The originals stay git-ignored.

## Consequences

- **Benefits:**
  - The approved experience ships as built and tested.
  - The homepage is lighter: about 8 KB of JavaScript instead of about 225 KB.
  - The site doesn't depend on `/explorations/`, localhost or ignored files.
- **Not type-checked or linted:** `portfolio.js` is plain JavaScript. The ESLint config covers only `.ts` and `.tsx` files, and `tsconfig` has `allowJs: false`. It's covered by browser tests instead.
- **Old homepage removed** (approved by Betsy on 2026-10-12):
  - `src/App.tsx`, `src/main.tsx`, `src/index.css`;
  - its illustration, `src/assets/magic8ball-betsy.png`. The game uses its own resized copies;
  - the unused template file `src/assets/react.svg`;
  - `frontend/.env.development`.

  This also removed the two known lint errors, which were in `App.tsx`.
- **Kept:** `src/assets/websiteSample.png`. The old homepage never used it, but the archived recipe-index prototype's `make-photos.ps1` reads it.
- **Link removed:** the v2.0 project card's "Read the design notes" link stays out until `DESIGN.md` is published at a verified public address.
- **Archived prototypes:** the dev server still serves the archived prototypes at `/explorations/`. Nothing in production links to them.
- **Vercel:** the dashboard settings (root directory, build command, output directory) and `/apps/magic-8-ball` without a trailing slash must be checked on a preview deployment.
- **Backend:** CORS allows only `https://reasonstohirebetsy.com`, so `www` and Vercel preview URLs show the 8-Ball's local fallback reasons. The backend security issues listed in ADR 0001 are unchanged.
