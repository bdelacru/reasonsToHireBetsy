# v2.0 Documentation Strategy

- **Date:** 2026-10-09
- **Status:** Strategy approved, with six documentation decisions recorded in section 7. File contents in section 5 are still proposals, and each file waits for approval before it's created.
- **Builds on:** [initial-architecture-assessment.md](initial-architecture-assessment.md)

**Legend:** **Fact** means confirmed in the repo at commit `01ee832`. **Approved** means Betsy decided it (see section 7). **Proposed** means a recommendation that hasn't been approved. **Undecided** means an open question that needs Betsy's decision.

---

## 1. v2.0 vision (summary)

ReasonsToHireBetsy v2.0 is a **professional software engineering portfolio** with **subtle cooking-inspired accents** and **interactive Easter eggs**. The existing Magic 8-Ball is a candidate Easter egg.

- Recruiters come first. The site must be clear, accessible and quick to scan.
- Cooking is a light layer of personality, not the organizing concept.
- The visual direction is exploratory. No colors, fonts, frameworks, layouts or AI architecture are final.

## 2. Existing documentation (fact)

| File | State |
|---|---|
| `README.md` | Out of date: claims Tailwind is used, refers to `.env` template files that don't exist, describes CORS incorrectly, lists a `SOFT_SKILL` category the backend doesn't have |
| `frontend/README.md` | Unedited Vite template, with no project content |
| `docs/research/initial-architecture-assessment.md` | Dated audit of the current codebase |
| `CLAUDE.md`, `AGENTS.md`, `DESIGN.md`, `.claude/`, `.github/` | Don't exist |

## 3. Proposed structure

```
CLAUDE.md                     NEW      Instructions for Claude: commands, rules, conventions
DESIGN.md                     NEW      Vision, UI/UX principles, open design decisions
README.md                     REWRITE  Primary project documentation and setup
frontend/README.md            DELETE   Approved: removed during documentation cleanup
backend/.env.example          NEW      Approved: placeholder values only
frontend/.env.example         NEW      Approved: placeholder values only
docs/
  architecture.md             NEW      Current system (fact); v2 section filled only after approval
  decisions/                  LATER    One decision record per approved decision (NNNN-title.md)
  features/                   LATER    Specs, created when a v2 feature starts
  issues/                     LATER    Approved: detailed technical investigations only
  research/                   EXISTS   Dated snapshots and proposals (this file)
```

**Deliberately left out until there's a need:**
- `docs/design/`: `DESIGN.md` is enough until design explorations outgrow it.
- Empty placeholder folders: each folder appears with its first real file.

**Approved:** work is tracked in GitHub Issues. `docs/issues/` is only for investigations that need more room than an issue gives them, and each one links to its GitHub issue.

**Approved:** `.env.example` files contain placeholder values only, never real credentials or secrets.

This mirrors Case Study 02 on the current site (README / Agent guide / Issue docs / Feature docs), so the portfolio's own documentation can become evidence for that case study.

## 4. Ownership: one home for each kind of information

Each topic lives in exactly one file. Other files link to it rather than repeating it.

| Information | Owner | Referenced from |
|---|---|---|
| Install, run and deploy steps | `README.md` | `CLAUDE.md` (exact commands only, plus a link) |
| Rules for AI and contributors, verification steps, what not to touch | `CLAUDE.md` | `README.md` ("Contributing / AI usage" link) |
| Vision, principles, visual system, open design questions | `DESIGN.md` | `CLAUDE.md` ("read before any UI work") |
| How the system works now | `docs/architecture.md` | `CLAUDE.md`, `README.md` |
| Why a choice was made | `docs/decisions/NNNN-*.md` | `DESIGN.md`, `docs/architecture.md` |
| Scope and acceptance criteria for a feature | `docs/features/*.md` | Issues and PRs |
| Work tracking | GitHub Issues | PRs, feature specs |
| Detailed technical investigations | `docs/issues/*.md` | The GitHub issue it belongs to |
| Names of required environment variables | `.env.example` files | `README.md` |
| Point-in-time findings and proposals | `docs/research/*.md` | Decision records that cite them |

**Rules:**
- Research docs are dated snapshots. They are never edited to describe the current state, and they're never treated as current instructions.
- Once a decision record is accepted, the relevant section of `DESIGN.md` or `docs/architecture.md` is updated to match, and links to the record.
- `CLAUDE.md` holds instructions only. It never contains architecture explanations or design rationale.

## 5. File contents (proposed)

### `CLAUDE.md` (target: under ~80 lines)
- **What the project is:** two sentences, plus links to `README.md`, `DESIGN.md` and `docs/architecture.md`.
- **Commands:** frontend `dev`, `build` and `lint`; backend `mvn` run and package. Note that there are no tests yet (fact).
- **Working rules:**
  - Ask before changing dependencies, deployment files (`Dockerfile`, Vercel/Render settings) or Flyway migrations.
  - Never edit a migration that has already been applied.
- **UI work:** read `DESIGN.md` first. Don't introduce new colors, fonts, frameworks or layouts unless `DESIGN.md` or an accepted decision record approves them.
- **Current conventions (fact):**
  - Plain CSS with custom properties in `frontend/src/index.css`.
  - Tailwind is installed but not loaded, so don't add Tailwind classes.
  - Keep the existing accessibility baseline: skip link, visible focus, reduced motion.
- **Known pitfalls (fact):**
  - The frontend reads `title`, but the backend returns `reason`.
  - The write endpoints have no authentication.
  - The frontend falls back to hardcoded reasons when the API is slow, so a working modal doesn't prove the backend works.
- **Verification before saying work is done:** run lint and build, and check the page at mobile width.
- **Where documentation goes:** link to section 4 of this strategy, or a copy of that table.

### `DESIGN.md`
- **Audience and goals (proposed):** recruiters and hiring managers should grasp Betsy's role, level and strengths within about a minute. Personality comes second.
- **Principles (proposed):**
  - Professional first.
  - Cooking is an accent, not a costume.
  - Content stays readable with the theme removed.
  - Labels are plain, with no puns that need decoding.
  - Accessibility target: WCAG 2.2 AA (approved).
- **Cooking accents, exploratory:** candidates include recipe-style case studies, skills as ingredients, "kitchen notes" asides, and small illustrations or textures. Each comes with its risk (cliché, clutter, slower scanning).
- **Easter eggs, exploratory:**
  - The Magic 8-Ball, kept as an Easter egg rather than a main feature.
  - Possible cooking-themed interactions.
  - Rules: optional to find, operable by keyboard, respect reduced-motion settings, never block the main content.
- **Current visual baseline (fact):** the existing tokens and breakpoints from `index.css`, recorded as a starting point rather than a commitment.
- **Open decisions (all undecided, approved to stay open until design exploration is done):** color palette, typography, layout and information architecture, styling approach (plain CSS vs Tailwind), routing for case-study pages, motion, the Easter-egg list.
- **Accessibility checklist:** includes the known gaps from the assessment (modal focus, live region, mobile navigation, contrast).

### `README.md` (rewrite)
- Summary, live site and Swagger links, the current stack (fact).
- Local setup with the real environment variables (fact):
  - Backend: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
  - Frontend: `VITE_API_URL`
- A short deployment overview: Vercel for the frontend, Render with Docker for the backend.
- A corrected troubleshooting section.
- A "v2.0 in planning" link to `DESIGN.md`.

### `docs/architecture.md`
- **Current state (fact):** components, request flow, API endpoints, data model and deployment. Written as an up-to-date reference rather than an audit.
- **v2 (proposed):** stays empty until decisions are accepted. Then it summarizes them and links to the decision records.
- AI architecture (LangGraph and the like) is added only through an accepted decision record. Until then, the options stay in the research docs.

## 6. Order of work

Each phase waits for approval.

| Phase | Deliverable | Notes |
|---|---|---|
| 1. Instructions and setup | `CLAUDE.md`, rewritten `README.md`, `frontend/README.md` deleted, `.env.example` files | Approved: don't run builds, tests or installs yet. Document the commands as unverified. |
| 2. Design foundation | `DESIGN.md` | Betsy reviews the direction before any visual decision. |
| 3. Architecture reference | `docs/architecture.md` (current state only) | Taken from the assessment. |
| 4. Ongoing | Decision records and feature specs | Likely first decision records: styling approach, Easter-egg scope and the 8-Ball's role, palette and type, AI scope. |

**Keeping the docs up to date:**
- A PR that changes commands, environment variables or deployment also updates `README.md` and, if needed, `CLAUDE.md`.
- A PR that changes a convention or rule updates `CLAUDE.md`.
- An accepted decision updates its owning document in the same PR.
- `CLAUDE.md` is reviewed at each phase boundary to remove stale instructions and keep it short.

## 7. Decisions

### Approved (2026-10-09)

| # | Topic | Decision |
|---|---|---|
| 1 | Frontend README | Delete the Vite template `frontend/README.md` when documentation cleanup begins. The root `README.md` is the primary project documentation. |
| 2 | Build verification | Don't run builds, tests or dependency installs yet. Document the existing commands as unverified. |
| 3 | Environment examples | Create `.env.example` files with placeholder values only. Never include real credentials or secrets. |
| 4 | Issue tracking | Track work in GitHub Issues. Use `docs/issues/` for detailed technical investigations when necessary. |
| 5 | Accessibility | WCAG 2.2 AA is the accessibility target. |
| 6 | Visual design | Colors, typography, layout, motion and the styling framework stay open until design exploration is done. |

### Still open

- Everything listed under DESIGN.md's open decisions: palette, typography, layout and information architecture, styling approach, routing, motion, Easter eggs.
- AI architecture (LangGraph or otherwise): needs an approved use case and a decision record.
- The exact contents of each proposed file in section 5. Each one is reviewed before it's created.
