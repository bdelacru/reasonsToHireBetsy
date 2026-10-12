# v2.0 Projects Page: Direction Proposal

- **Date:** 2026-10-11
- **Status:** Exploratory. Nothing here is an approved design. The prototype exists only so the direction can be reviewed.
- **Revision (2026-10-11, fourth pass):**
  - Betsy's architecture decisions are recorded (9.3).
  - The two URLs are checked against Vite and Vercel (9.4).
  - The live API contract is verified (9.5).
  - Phased plan, phase 1 in detail (9.6); security remediation plan (9.7).
  - Only this document changed; no code.
- **Revision (2026-10-11, third pass):**
  - The Magic 8-Ball becomes a standalone project page. The architecture recommendation is in section 9 and awaits Betsy's approval.
  - The prototype no longer links to the site root.
  - The Church Festival Signup links to its live app.
- **Revision (2026-10-11, second pass):**
  - The long vertical list is replaced by a **recipe box**: one project card in front, two behind (section 3).
  - Project detail cards are now prototyped (section 5).
  - The Church Festival Signup story uses Betsy's confirmed details (section 4.2).
- **Prototype:** `explorations/v2-recipe-index/index.html`:
  - routes `#/projects`, `#/projects/magic-8-ball`, `#/projects/church-festival-signup` and `#/projects/reasonstohirebetsy-v2`
  - production code, the backend, the API and the database are unchanged.
- **Builds on:** [DESIGN.md](../../DESIGN.md) (sections B, C, E), [initial-architecture-assessment.md](initial-architecture-assessment.md), [v2-recipe-index-photo-story.md](v2-recipe-index-photo-story.md)

**Legend:** **Verified** means read from the code or git history in this repository. **Betsy** means taken from Betsy's brief and not verifiable here. **Needs Betsy** means unknown; nothing has been invented to fill it. **Recommendation** means a judgment for review.

---

## 1. What changed and why

The Projects card used to list professional accomplishments, which made it read like a second résumé. It now shows three **personal projects**, in Betsy's order:

1. **Magic 8-Ball** (featured)
2. **Church Festival Signup** (first Lovable experiment)
3. **ReasonsToHireBetsy v2.0** (this redesign)

**Removed from the Projects card only:**
- the Authoriti API migration
- the 10+ Java REST APIs accomplishment
- automated shared-library releases
- accessible customer-facing UIs

They're still in the résumé PDF and the production site, and nothing was deleted from the repository. The Experience card doesn't name the Authoriti migration either. Following Betsy's preference, it isn't presented as a case study anywhere.

## 2. Magic 8-Ball investigation (verified)

### How it works

```
Browser (React 19 + TypeScript, Vite, on Vercel)
  └─ "Shake" → random affirmation picked in the browser
  └─ axios GET {VITE_API_URL}/api/reasons/random   (6 s timeout)
        └─ Spring Boot 3.4 on Java 21 (Render, Docker)
              └─ ReasonService loads every approved row from PostgreSQL and picks one at random
  └─ API failure or no VITE_API_URL → one of four reasons hard-coded in App.tsx
```

- **Frontend:** `frontend/src/App.tsx`. The 8-Ball is a modal dialog: focus moves to its close button, Escape closes it, and results appear in an `aria-live` region. The fallback reasons were added in the 2026 update; the April 2025 version had no fallback.
- **Backend:** `ReasonController` exposes `GET /api/reasons/random`, `GET /api/reasons`, `POST /api/reasons` and `POST /api/reasons/upload`. The upload endpoint sends the image to Cloudinary.
- **Data:** a single `reason` table, managed with Flyway (`V1`, `V2`).
- **CORS:** only `https://reasonstohirebetsy.com` is allowed (`CorsConfig.java`).

### Timeline (from git history)

| When | Change |
|---|---|
| 2025-04-05 to 04-13 | Initial commits; Cloudinary added. |
| 2025-04-14 | React, Vite and Tailwind frontend; backend with Swagger; Dockerfile; environment-based API URL; README screenshot (`websiteSample.png`). |
| 2025-04-14 to 04-15 | Flyway repair enabled, then removed "after manual fix". CORS fixed for Vercel and the custom domain, then restricted to the main domain. |
| 2026-09-03 | The current redesign (v1.2), including the fallback reasons and the accessible modal. |

The README's "Common Errors + Workarounds" section records the same integration problems: Tailwind/PostCSS setup, Flyway errors, a Vercel build failure, CORS, and Maven on Render. That gives the "what I learned about integrating frontend and backend" story real evidence.

### Things the repository doesn't support

- **Kotlin:** there is no Kotlin anywhere in the repository's history. The backend is Java 21. (Kotlin does appear in the Sinch stack on the Experience card.) **Needs Betsy:** was there an earlier Kotlin version outside this repo, or should the story say Java?
- **AI-generated code:** this can't be verified from the repository. **Needs Betsy:** which tool, and what it generated.
- **Inspiration:** the README says the app was built "to showcase Betsy's experience, personality, and technical strengths ... through the fun of a Magic 8-Ball interaction". Anything beyond that needs Betsy.
- **The illustration** (`magic8ball-betsy.png`) appears in the screenshot. **Needs Betsy:** where it came from (drawn, commissioned or AI-generated) and whether she's comfortable featuring it.

### Known issues that matter for showcasing it

All of these are verified and already in the architecture assessment:

- The API returns the reason text in a field called `reason`, but the frontend reads `title`, so live reasons probably show without a title.
- `POST /api/reasons` and `/upload` are unauthenticated and accept `approved`. Anyone can add an approved reason or upload images to the Cloudinary account.
- `GET /api/reasons` returns unapproved reasons.
- When no reasons are approved, `/random` returns a 500 error. It also loads every approved row to pick one.

## 3. Projects page: the recipe box (as prototyped)

The first pass stacked all three projects in one long scroll. This pass makes browsing feel like flipping through a recipe box, and moves the reading to detail cards (section 5).

### What visitors see

- **The box:** the Projects card holds a recessed box with three project cards standing in it. One card is in front. The other two stand behind it, slightly higher and narrower, so their top edges show.
- **Divider tabs:** each project card has a tab on its top edge, at a different position, the way divider tabs are staggered so you can read them all at once: **Magic 8-Ball** (dark, like the ball), **Festival Signup** (green) and **This site** (butter).
- **Below the box:** Previous and Next buttons, a "1 of 3" counter and a one-line hint ("Swipe the card, or use the arrow keys while you're in the box.").
- **Order:** the cards cycle. Next files the front card at the back, and Previous brings the back card to the front.
- **Each front card is concise:**
  - label, project name and a 2–3 sentence introduction
  - one image (the 8-Ball screenshot, the overlap diagram, or a screenshot of this prototype)
  - two or three highlights and an **Explore project** button
  - the 8-Ball card also keeps **Try the live version**

  The three cards differ in content: the screenshot for the 8-Ball, the **300+** figure and the overlap diagram for the festival signup, and Live/Now/Next for this site. That way they don't read as three identical SaaS tiles.
- **Motion:**
  - **Next:** the front card is lifted out to the left with a slight tilt and fades (0.32 s), while the cards behind slide forward one place (0.34 s).
  - **Previous:** the reverse; the back card comes out from the left and lands in front.
  - **Reduced motion:** the change is instant, with no animation or transition (verified with forced reduced motion).
- **Photo:** the tres leches photo on the right is unchanged and stays on every project detail card. On mobile it follows the card, as on every page.

### How navigation works

| Input | Behavior |
|---|---|
| **Buttons** | Previous and Next are real `<button>`s with visible text, at least 44 px tall, and work with mouse, touch and keyboard. |
| **Keyboard** | ← and → flip cards while focus is anywhere in the box (buttons or the front card's links). Modifier combinations are ignored, so browser shortcuts still work. If focus was inside the front card when it moved away, focus moves to the new front card's heading. Tab only reaches the front card: the cards behind are `inert`. |
| **Touch** | A horizontal swipe on the front card flips it. The card follows the finger, and more than 50 px commits the swipe. `touch-action: pan-y` leaves vertical scrolling to the browser, so a vertical swipe always scrolls the page. A tap right after a swipe doesn't also follow a link. |
| **Mouse** | Buttons, or click the visible tab or top edge of a card behind to bring it forward. Dragging with a mouse does nothing, so text stays selectable. |
| **Trackpad / wheel** | Only a mostly horizontal two-finger swipe flips cards, once per gesture. A vertical wheel or trackpad movement is never intercepted, so page scrolling can't be hijacked. **A vertical swipe or vertical wheel to flip cards was deliberately not implemented,** because it can't be done without fighting page scrolling. |
| **Screen readers** | The box is labeled as a carousel ("Projects"), and each card as a slide ("1 of 3"). Changes are announced through a live region, for example "Church Festival Signup, 2 of 3". |
| **Without JavaScript** | All three cards are listed in sequence and the controls are hidden. |

The stack position isn't stored in the URL, so flipping cards doesn't fill the browser history. Opening a project and returning with "All projects" brings back the same card in front.

### Accessibility notes and risks

- **Inert support:** hiding the cards behind relies on `inert`, which current browsers support. Very old browsers would let Tab reach hidden links.
- **Not checked yet:**
  - **Screen readers:** the roles and announcements follow the WAI-ARIA carousel pattern, but haven't been tried with NVDA or VoiceOver.
  - **Contrast:** the grey label text (`#574d43`) on the darker back-card paper hasn't been measured, though only the tabs show there.
- **Discoverability:** the swipe and arrow-key shortcuts appear only in the hint line. The buttons are the primary method.
- **Peek clicks:** clicking the tab of a card behind is a mouse/touch shortcut only. Keyboard users get the same result from the buttons and arrow keys.

**Cooking language:** none was added to the project copy. The box, the tabs and the photo carry the theme (DESIGN.md principle 1).

## 4. Proposed content

The prototype uses these drafts. The "Today I'd" section and the Lovable reflection are written in Betsy's voice, so she must approve them.

### 4.1 Magic 8-Ball

- **Title:** Magic 8-Ball
- **Subtitle:** Ask it whether Betsy is your next great hire, give it a shake, and a real API answers with a reason.
- **Introduction:** I wanted a portfolio that showed my personality as well as my experience, so I built it around a Magic 8-Ball. The ball was the fun part. The real work was everything behind it.
- **Technologies (verified):**
  - React and TypeScript (Vite) on Vercel
  - Spring Boot 3.4 on Java 21, on Render via Docker
  - PostgreSQL with Flyway
  - Cloudinary (image uploads)
  - Swagger / springdoc
- **What I built:** a React frontend that asks a Spring Boot API for a random approved reason and shows it with a playful answer. The reasons are stored in PostgreSQL.
- **Challenges and lessons (verified in history and README):**
  - CORS between the Vercel and custom-domain frontend and the Render API
  - a different API address per environment
  - a Flyway migration that needed a manual repair
  - deployment on Render
  - Lesson: integration and deployment took longer than writing either side.
- **How I'd do it today (draft, needs Betsy's approval):**
  - Agree on the API contract first; the `title`/`reason` mismatch shows why.
  - Lock down write endpoints before deploying.
  - Design for the API being slow or down. The 2026 version already falls back to local reasons.
  - Add tests.
- **Front card (prototyped):** "It started as an experiment: a Magic 8-Ball that answers 'Is Betsy your next great hire?' It became my crash course in connecting a frontend, a backend, a database and a deployed app." Below that:
  - two highlights and the screenshot
  - **View project details**, which opens the detail card
  - **Launch the Magic 8-Ball**, labeled "Prototype placeholder"

  Nothing links to the root of reasonstohirebetsy.com any more (section 9).
- **Detail card (prototyped):** why I built it, how it works, what it taught me (dated to the first ten days of commits), and what I'd do differently today. The playable 8-Ball is still only proposed (section 6).
- **Needs Betsy:** the Kotlin and AI-generated-code story, the original inspiration, and the illustration's origin.

### 4.2 Church Festival Signup

**This project isn't in this repository.** Everything below is **confirmed by Betsy** (second brief). No other statistics, features, tech stack, database, sign-in method or hosting have been added.

**Confirmed facts:**
- **What it was:** Betsy's first Lovable project, built to see how quickly she could build a useful app with AI-generated UI and code.
- **How it was used:** volunteers registered for shifts at different stations for her church's festival. The church actively promoted it.
- **Adoption:** **more than 300 people used it**, including visitors from other locations such as Egypt. This counts people who *used* the app, not registrations, and the page says "300+ people used it".
- **Features:**
  - shift registration across stations and schedules
  - volunteers can review their own shifts, and families can review their registrations
  - shirt-size collection, with shirt inventory tracking added later
  - a password-protected admin page *intended* to restrict access to registrant information (described as such, not as a security guarantee)
- **The central problem:** the app blocked volunteers from signing up for shifts whose times overlapped. Some overlaps were intentional because of shift transitions. Betsy investigated and fixed the signup logic, so volunteers can register for overlapping shifts at **different stations**.
- **Lesson:** AI tools produced the first version quickly. Real users exposed requirements and edge cases it didn't handle. Betsy now evaluates AI-generated UI and functionality by how people actually use it.
- **Planned, not built:** automated text-message reminders before each shift.
- **Live application (Betsy, third brief):** https://egypt-fest-shift-sign-up.lovable.app/
  - **Card:** **View project details** and **Visit live application ↗**.
  - **Detail card:** a **Visit live application ↗** button.
  - **Link behavior:** both links open in a new tab with `rel="noopener noreferrer"`. A screen reader hears "an external website that opens in a new tab". Sighted visitors see ↗ and the note "External site on lovable.app".
  - **Not visited or tested:** the app wasn't opened, modified or redeployed.
  - **Naming:** the address itself contains the festival's name ("egypt-fest"), which bears on whether to name the church.

**Prototype content:**
- **Front card:**
  - the **300+ / people used it** figure, set large
  - a two-sentence introduction
  - two highlights: shifts, shirt sizes and the admin page; the overlap fix
  - the overlap diagram and **Explore project**
- **Detail card sections:**
  - the adoption figure
  - Why I built it
  - What it does
  - **The problem that mattered** (with the diagram)
  - What I learned
  - What's next (marked "planned, not built")
- **Image:** there's no screenshot, so the card uses a small **diagram of the overlap rule** instead: two shift bars for Station A and Station B, overlapping at a dashed "handover" band. It's captioned "Diagram, not a screenshot", carries no invented times or data, and illustrates the central story. No stock imagery is used.
- **Wording inferred from the brief:** "The first generated version followed a sensible-sounding rule. The real requirement only became clear once people tried to use it." This follows from Betsy's point about not accepting the first AI-generated implementation; she should confirm it.

**Still needs Betsy:**
- screenshots
- when it was built and how long it ran
- whether to name the church
- whether to say anything about what Lovable generated underneath
- whether to use the phrase "AI-generated UI slop" on the page (currently not used)

### 4.3 ReasonsToHireBetsy v2.0

- **Title:** ReasonsToHireBetsy v2.0
- **Subtitle:** Redesigning my portfolio as a documented engineering project, with Claude Code as a development partner.
- **Introduction:** Before changing any code, I had Claude Code assess the existing architecture and write down what it found. The decisions stay mine, and they're written down: an agent guide (`CLAUDE.md`), a design document (`DESIGN.md`) and dated research notes live in the repository, so people and coding agents work from the same context.
- **Live now (verified):**
  - React 19 and TypeScript frontend on Vercel
  - Spring Boot API and PostgreSQL on Render
  - an 8-Ball dialog that takes keyboard focus and closes with Escape
  - a skip link
- **In progress (verified, in the repository):**
  - the documentation-first workflow: `CLAUDE.md`, `DESIGN.md` and `docs/research/`
  - design prototypes in `explorations/`, built around Betsy's photography
  - the WCAG 2.2 AA target and responsive design
- **Ideas, not built:**
  - agentic workflows
  - multi-agent systems, only once there's a real use case for one

  (`CLAUDE.md` forbids introducing LangGraph or other AI frameworks without an approved use case and an ADR, so the page doesn't imply either exists.)
- **Challenges and lessons (draft):** keeping one source of truth per topic so people and agents trust the same documents, and treating AI output as a hypothesis until the real system verifies it (already the AI & Learning pull quote).
- **Call to action:** "Read the design notes". The GitHub repository could be linked if it's public (**needs Betsy**).
- **Detail page:** **Yes, later.** It could link to the approved decisions (DESIGN.md decision log) and a short "how this site was made" write-up.

## 5. Project detail pages within the recipe index (prototyped)

**A project is a card behind the Projects tab.** All three detail cards are working, not placeholders. They hold real content, and each lists its open questions in a "Needs Betsy" note. They follow the design below.

- **Routes:** `#/projects/magic-8-ball`, `#/projects/church-festival-signup` and `#/projects/reasonstohirebetsy-v2`. They extend the existing hash routing, so Back, Forward and direct links keep working, including over `file://`.
- **Tabs:** the **Projects** tab stays the current page (`aria-current="page"`) on its detail pages. The five main tabs don't change; there is no sixth tab or nested tab bar.
- **Transition:** the same card swap as the main tabs, with focus moving to the new card's `h1` and `document.title` updating, for example "Magic 8-Ball · Projects · Betsy De La Cruz".
- **Back link:** a plain text link at the top of the detail card, "All projects", back to `#/projects`. The browser Back button works too.
- **Unknown project slug:** falls back to the Projects card, not Home.
- **Photo:** keep the tres leches photo. A detail page stays inside Projects, so the story photo doesn't change, and project screenshots go inside the card. (Another option for later: let a detail page swap the photo panel for a large screenshot on desktop. That would break the photo story, so it isn't recommended now.)
- **Structure of a detail card:**
  1. Problem / why I built it
  2. How it works (diagram or screenshot)
  3. Decisions and trade-offs
  4. What went wrong and what I learned
  5. What I'd do today
  6. Try it / source

  Each section is a heading, so the page can be scanned (DESIGN.md principle 5).
- **Without JavaScript:** detail cards would render in sequence like the other cards. That's acceptable for a prototype; production would need real URLs.
- **Production note:** hash routes are a prototype convenience. Real paths, such as `/projects/magic-8-ball`, would need router and hosting decisions. That's an architecture decision for later, not part of this proposal.

**Alternatives considered:**
- **Expanding each project in place** (an accordion): rejected. It turns the card into one long page, which the brief rules out.
- **A modal per project:** rejected. Long content in a dialog is awkward on mobile, and it doesn't give each project a shareable link.

## 6. Showcasing the Magic 8-Ball interactively (options, nothing implemented)

| Option | How | Pros | Cons and risks |
|---|---|---|---|
| **A. Local demo** | A button on the detail page shakes a ball and shows an answer from a fixed list of approved reasons in the page itself. No network. | Instant and always works. No backend, security or cost exposure. Easy to make accessible. | Doesn't show the full stack working live. The page must say honestly that the demo uses a local copy. |
| **B. Live API call** | The demo calls `GET /api/reasons/random` on Render. | Shows the real system. | **CORS** only allows `https://reasonstohirebetsy.com`, so it won't work from the prototype or preview deployments without a backend change. The API may be slow to wake (plan unconfirmed). Live reasons hit the **`title`/`reason` mismatch**. The **write endpoints are open**, and visitors who look at the Swagger docs would see that. A 500 error is possible. |
| **C. Hybrid** | Show a local answer instantly, then try the live API with a short timeout. Label which source answered ("live from the API" or "local copy"). | Shows integration thinking and resilience, and degrades gracefully. | Needs everything in B fixed first (backend and CORS changes need approval), plus more UI states to design and test. |
| **D. Link out** | Link to the live site's 8-Ball (what the prototype does now). | No work and no new risk. | No interaction on the Projects page. The live site has the issues above. |
| *Embed the live site in an iframe* | | | Not recommended. It brings the whole old site, a nested modal, focus problems and the same backend issues. |

**Recommendation (updated in the third pass):** Betsy now wants the real 8-Ball preserved on its own page, so option D (linking to the site root) is withdrawn. Section 9 covers the standalone page.
- **Standalone page:** its demo is the **existing** 8-Ball component, which already behaves like option C: it calls the live API with a 6-second timeout and falls back to local reasons.
- **Before featuring the live API prominently:** fix the backend separately, with its own approval. The fix covers the write endpoints, unapproved reasons, the empty-table error, and the CORS origins if the domain setup changes.

Option C is the strongest engineering story, because it shows the integration lessons the project taught. Don't feature a live API call before those fixes.

**Any demo must:**
- be a real `<button>`, never require a shake gesture or drag, and announce the answer in a live region that already exists on the page
- respect `prefers-reduced-motion` (no shake animation)
- stay optional (DESIGN.md section E: Easter-egg rules)

## 7. What was verified

All checks ran in headless Edge against the prototype file. They're simple test pages, with no dependencies, kept outside the repository.

- **Existing checks, all passing:**
  - **Routing:** 21 of 21, including Back/Forward, focus on `h1`, a single exposed `h1`, rapid tab clicks and no sideways overflow at 360 px.
  - **Photos:** 13 of 13.
  - **Per-page photo files:** 12 of 12.
- **New recipe-box checks, 38 of 38 passing:**
  - **Stack state:** the initial order and positions; only the front card is reachable; equal card heights.
  - **Buttons:** Next and Previous, including wrapping around; animation classes clear afterwards.
  - **Announcements:** the live-region text.
  - **Keyboard:** arrow keys, with focus kept on the button, or moved to the new front card's heading when it was inside the old front card; modifier keys ignored.
  - **Touch swipes:** left and right flip cards; a vertical swipe doesn't.
  - **Mouse and wheel:** a mouse drag does nothing; a vertical wheel isn't intercepted; a horizontal trackpad swipe flips once.
  - **Peek clicks:** clicking a tab behind brings that card forward.
  - **Detail cards:**
    - Explore opens the detail card, with the Projects tab still active, the title updated, focus on `h1`, one `h1` and the Projects photo kept.
    - "All projects" returns with the same card in front.
    - Back and Forward work, and direct links work.
    - An unknown project goes to the Projects card.
  - **390 px:** no sideways scroll on Projects or any detail card; the tabs stay inside the box; the buttons are at least 44 px tall.
- **Reduced motion, 3 of 3 passing:** with forced reduced motion, Next swaps instantly with no animation class and a `0s` transition.
- **Third-pass navigation checks, 19 of 19 passing:**
  - **No root links:** nothing links to the root of reasonstohirebetsy.com.
  - **8-Ball card:** has the details and launch links, and the launch link is labeled as a placeholder.
  - **Festival links:** the live link appears on both the card and the detail card, opens in a new tab with `noopener noreferrer`, and is announced and marked as external.
  - **Full journey:** Projects → 8-Ball details → Launch (the placeholder page loads, says it isn't built or deployed, and has no fake Shake button) → **browser Back** to the details card (Projects tab still active) → **Forward** to the placeholder → "Back to Betsy's portfolio" → the details card.
  - **Placeholder page:** opens directly; its footer link goes to All projects; at 390 px there's no sideways scroll and the back link is at least 44 px tall.
- **Re-run of all earlier checks after the third pass:** routing 21/21, photos 13/13, per-page photos 12/12, recipe box 38/38, reduced motion 3/3. That makes **106 of 106** passing.
- **Third-pass screenshots:**
  - `desktop-8ball-placeholder-1440x900` and `-1440-full`, and `mobile-8ball-placeholder-390`
  - `desktop-project-8ball-1440-full` and `desktop-project-festival-1440-full`
  - updated `desktop-projects-*` and `mobile-projects-*`
- **Screenshots** in `explorations/v2-recipe-index/screenshots/`. The stack shots were captured with reduced motion, so they show the settled state.
  - **Projects page:** `desktop-projects-1440x900`, `-card2-`, `-card3-` (each project in front); `-1440-full` (the whole card, each card in front); `-1024x768`; `-1920x1080`; `tablet-projects-768x1024`; `mobile-projects{,-card2,-card3}-390`.
  - **Detail cards:** `desktop-project-{8ball,festival,site}-1440x900`, `desktop-project-festival-1440-full` and `mobile-project-{8ball,festival,site}-390`.
- **Not verified:**
  - real touch devices (swipes were simulated with pointer events)
  - the actual animations (headless Edge doesn't play them)
  - screen readers, Firefox and Safari, and measured contrast
  - whether `https://reasonstohirebetsy.com` currently serves the 8-Ball shown in the screenshot

## 8. Open questions for Betsy

1. **Kotlin:** where does it fit in the 8-Ball story? This repository is Java only.
2. **AI-assisted development** on the 8-Ball: which tool, and what did it produce?
3. **Inspiration:** what made you build it, beyond what the README says?
4. **The illustration:** where did it come from, and should it appear in screenshots?
5. **Church Festival Signup:** see "Still needs Betsy" in 4.2.
6. **GitHub:** is `bdelacru/reasonsToHireBetsy` public, and should Projects link to it?
7. **Approval of draft wording:**
   - the "What I'd do differently today" points (8-Ball detail)
   - the "first generated version" sentence (festival detail)
   - "Lessons carried over" (v2.0 detail)
8. **The Projects title:** keep "Things I built to learn", or use something plainer such as "Personal projects"?
9. **The interaction:** do the tab colors, the motion and the "cards cycle" behavior feel right on a real phone and laptop?

## 9. Separating the Magic 8-Ball: architecture (approved 2026-10-11) and implementation plan (awaiting approval)

**Goal (Betsy, third brief):** reasonstohirebetsy.com becomes the portfolio. The Magic 8-Ball becomes one project with its own real page at **`/projects/magic-8-ball`**. That page must:
- keep the 8-Ball's functionality and personality
- link back to the portfolio
- work when opened directly or refreshed, and with Back and Forward
- work on desktop and mobile

**Nothing in production has changed:** routes, backend, database, deployment configuration and the live 8-Ball are all as they were.

### 9.1 Investigation (verified in the repository)

| Question | Finding |
|---|---|
| Where the 8-Ball code lives | Entirely in `frontend/src/App.tsx`, mixed into the current homepage: <br>• **state:** `reason`, `loading`, `affirmation`, `isEightBallOpen` <br>• **data:** `fallbackReasons` and `magic8BallAnswers` <br>• **logic:** `getRandomReason` <br>• **markup:** the modal at the end of the file <br>• **openers:** the hero "Ask the 8-Ball" button and the footer 🎱 button |
| Styles and assets | **Styles:** the global `frontend/src/index.css` (`.eight-ball-*`, `.modal-*`, `.reason-card`, `.affirmation`, `body.modal-open`, plus shared variables like `--purple` and `--line`). <br>**Image:** `frontend/src/assets/magic8ball-betsy.png` (about 2.5 MB). <br>**Library:** `axios`. <br>**No router library** is installed. |
| Endpoints used | Only `GET /api/reasons/random`, through `VITE_API_URL` (set in the committed `frontend/.env.production`). It doesn't use `GET /api/reasons`, either `POST`, or the upload endpoint. |
| PostgreSQL | Needed for **live** answers: approved rows in the `reason` table. Without the API, the page still works using the four hard-coded fallback reasons. |
| Cloudinary or other services | The 8-Ball doesn't use Cloudinary; only `POST /api/reasons/upload` does. Its only external service is the Render API. |
| How Vercel talks to Render | The browser calls the Render API directly, cross-origin. `CorsConfig` allows exactly one origin, `https://reasonstohirebetsy.com`. Vercel preview URLs, and `www.` if it's ever served, are refused, so they quietly show fallback reasons. |
| Routes today | There's a single `index.html` entry with no client-side routing and no `vercel.json` in the repo. **A direct visit to `/projects/magic-8-ball` would probably 404 today.** Vercel project settings made in the dashboard can't be seen from the repository; check them. |
| Can it coexist with the portfolio? | **Yes.** A page served from the same domain shares the origin, so CORS, the API URL and the backend are unaffected. The current homepage can stay as it is until the v2 homepage replaces it. |

**Known issues (from the assessment), and how they affect this change:**
- **Field mismatch:** the API sends `reason`, but the UI reads `title`. *(Updated after checking the live API in 9.5: the sampled live reasons also have an **empty `reason`**. The text is probably in the unmapped `title` column, so a frontend change alone can't restore the headings.)*
- **Open write endpoints:** `POST /api/reasons` and `/upload` accept anyone's data, including `approved: true`. `GET /api/reasons` lists unapproved reasons. Swagger is public and documents all of them. **The new page doesn't add exposure,** because it only calls `GET /random`, and **no admin functionality will be added.** These are existing risks; fix them in a separate, approved backend change before the 8-Ball is promoted as a featured project.
- **Empty table:** a 500 error when no reasons are approved. The UI already falls back, so it's not a blocker.

### 9.2 Options compared

| | **A. Same React app, separate route** | **B. Separate frontend app in the monorepo** | **C. Independent app and deployment** |
|---|---|---|---|
| What it means | The 8-Ball page is built from `frontend/`, beside the portfolio. Two ways to do it (below): **A1** client-side routing, or **A2** a second HTML page in the same Vite build. | A second package, e.g. `apps/magic-8-ball/`, with its own `package.json` and Vite config, sharing only the repository. | Its own repository or project, deployment and domain (e.g. a subdomain). |
| Complexity | Low. A2 needs a second entry file and a few lines of build config. | Medium: two toolchains and duplicated dependencies. | High. |
| Hosting and deployment | Same Vercel project and domain. A2 serves a real file at the path; A1 needs an SPA rewrite in `vercel.json`. | Serving it under the **same path** needs a second Vercel project plus a rewrite/proxy, or a combined build step. | A separate deployment; serving it at `/projects/...` needs a proxy, otherwise it lives on another domain. |
| Backend and CORS | Same origin, **no backend change**. | Same origin only if proxied; otherwise CORS changes. | **CORS change needed** for the new origin (a backend change). |
| Maintenance | One codebase; shared components and tooling. | Two sets of dependencies to keep updated. | Two projects, pipelines and sets of environment variables. |
| Future extensibility | Good; other project pages can follow the same pattern. | Good isolation, but more setup per project. | Maximum isolation; more overhead per project. |
| Navigation from the portfolio | Ordinary same-site links. | Same-site only if proxied. | Cross-site links. |
| Risk to the current live site | **Lowest with A2:** the current homepage keeps working; one new page is added. A1 touches the current entry and adds a rewrite. | Medium: deployment wiring changes. | Medium to high: CORS and DNS changes. |

**Two ways to do A:**
- **A1, client-side routing:** add React Router (a new dependency) or a small hand-written router, plus an SPA rewrite in `vercel.json` (a deployment-config change) so a refreshed `/projects/magic-8-ball` still loads the app. This fits best if the v2 portfolio becomes a single-page app with real paths. That's still undecided (DESIGN.md section I.4).
- **A2, a second page in the same Vite project:** add `frontend/projects/magic-8-ball/index.html` with its own small entry script, and list both pages in `vite.config.ts` (`build.rollupOptions.input`). Vercel then serves a real file at that path, so direct visits, refreshes and Back/Forward work like any page. No router, no new dependency, and probably no rewrite. **To confirm on a Vercel preview:** whether `/projects/magic-8-ball` without a trailing slash is served, or whether `vercel.json` needs `trailingSlash`/`cleanUrls` (which would need approval).

### 9.3 Decisions recorded (Betsy, 2026-10-11)

| # | Decision |
|---|---|
| 1 | **Architecture: Option A2.** A second page inside the existing Vite app, with **no routing dependency**. |
| 2 | **Design:** keep the **original April 2025 personality and artwork**, with the **2026 behavior**: fallback answers and keyboard accessibility. |
| 3 | **Fix the `reason`/`title` mismatch**, after checking the real API contract, **with tests**. |
| 4 | **Backend security** (open write endpoints, unapproved reasons exposed): document it and recommend a plan, but **don't change it in this work**. |
| 5 | **No `vercel.json`** unless testing shows it's needed. |
| 6 | **Production homepage unchanged** until the v2 portfolio is ready. |
| 7 | **Two URLs:** `/projects/magic-8-ball` is the **case study** in the portfolio, and `/apps/magic-8-ball` is the **playable app**. Both should eventually open directly and work with Back and Forward. The case study gets a **Play Magic 8-Ball** action, and the app gets a **Back to Portfolio** link. |

These are architecture decisions. When implementation is approved, record them in `docs/decisions/` (an ADR) and point to it from the DESIGN.md decision log, as `CLAUDE.md` asks. That hasn't been done yet.

### 9.4 Does the URL structure work with Vite multi-page and Vercel?

**Verdict: yes in principle, with two points to confirm on a Vercel preview deployment.** Nothing could be run here: this environment has no Node.js, no installed `frontend/node_modules` and no Vercel CLI, and installing them is out of scope. Everything below comes from how Vite and Vercel are documented to behave, plus the repository's configuration.

| Concern | Assessment | Status |
|---|---|---|
| **Vite build** | A multi-page build takes one HTML file per page (`build.rollupOptions.input`) and keeps the folder structure in `dist/`. `frontend/apps/magic-8-ball/index.html` builds to `dist/apps/magic-8-ball/index.html`, and later `frontend/projects/magic-8-ball/index.html` builds to `dist/projects/magic-8-ball/index.html`. The default `base: '/'` gives absolute `/assets/...` paths, so pages work at any depth. | Standard Vite behavior; **verify with `npm run build`**. |
| **Config file** | `vite.config.ts` is an ES module (`"type": "module"`), so page paths are resolved with `fileURLToPath(new URL('./apps/magic-8-ball/index.html', import.meta.url))`. That uses built-in Node APIs only, with no new dependency. | Planned. |
| **Vercel: trailing slash** | Vercel serves the built files as static files, and its file-system routing serves a folder's `index.html`. `/apps/magic-8-ball/` should work. **`/apps/magic-8-ball` without the slash** is expected to serve the same file by default, but that isn't verified for this project. If it fails, the fix would be `trailingSlash` in `vercel.json`, which needs your approval (decision 5). | **Verify on a preview deployment.** |
| **Vercel dashboard settings** | The repository has no `vercel.json`. A rewrite configured in the Vercel dashboard (for example, everything → `/index.html`) could override the new page, and it can't be seen from the repository. | **Check the dashboard**, or simply check the preview deployment. |
| **Refresh, direct visits, Back/Forward** | Each URL is a real HTML file, so these behave like any ordinary website page. No routing code is needed. | Expected; verify on the preview. |
| **Both URLs together** | `/apps/...` and `/projects/...` are separate folders, so they can't collide, and neither affects `/`. If the v2 portfolio later becomes a single-page app with a catch-all rewrite, files on disk still take priority on Vercel, but the rewrite should exclude `/apps/` explicitly. | Compatible. |
| **CORS** | Both pages run on `https://reasonstohirebetsy.com`, the one allowed origin. Verified today: the API replies `Access-Control-Allow-Origin: https://reasonstohirebetsy.com`. Previews, `localhost` and any `www.` address are refused and will show fallback answers. | No backend change needed. |
| **Vite dev server** | Multi-page apps work in `npm run dev`. Use `http://localhost:5173/apps/magic-8-ball/` **with the trailing slash**; without it, Vite's single-page fallback may serve the homepage instead. That only affects development. | Note for testing. |
| **Homepage build output** | The homepage's source doesn't change, but a multi-page build may move React into a **shared chunk**. That changes the homepage's built file names and chunking, though not its behavior. | **Smoke-test `/`** on the preview. |

**Before the case study exists:** in phase 1 only `/apps/magic-8-ball` exists, and **Back to Portfolio links to `/`** (the current homepage, unchanged). When the v2 case study ships, the link can point to `/projects/magic-8-ball` or the new homepage (decision B in 9.8).

### 9.5 The real API contract (verified 2026-10-11)

**Sources:**
- `Reason.java` (Lombok `@Data`, so every field is serialized)
- the live OpenAPI document at `https://reasonstohirebetsy.onrender.com/v3/api-docs`
- **five read-only requests** to `GET /api/reasons/random`. The endpoint listing every reason wasn't called, since it exposes unapproved reasons.

- **Response fields (live schema and live response):**
  - `id`, `reason`, `reasonType`, `explanation`, `imageUrl`
  - `submittedBy`, `submittedByLink`, `relationship`, `submittedByOthers`, `approved`

  **There is no `title` field.** The frontend's `title` has never been part of the API.
- **Live data:** **all 4 distinct approved reasons sampled had an empty `reason` and a filled-in `explanation`.** The likely cause, which only a database query can confirm, is that the reason text sits in the **`title` column** created by `V1__init_reason_table.sql`. `V2` added a separate `reason` column, and the entity maps only `reason`, so the API never returns the text.
- **What that means:** a frontend fix alone (reading `reason` instead of `title`) **would still show no heading** with today's data. The real fix is a data migration or a backend mapping change, which needs separate approval (9.7). The frontend can and should handle every case without showing a blank heading.
- **Read-only query to confirm the cause** (Betsy runs it; no changes): `SELECT approved, count(*), count(title), count(reason) FROM reason GROUP BY approved;`
- **Other drift found:**
  - The frontend's fallback type `SOFT_SKILL` isn't in the backend's `ReasonType` (`TECHNICAL, PROFESSIONAL, COMMUNICATION, TEAM_PLAYER, LEADERSHIP, CREATIVE, PERSONALITY, BETSY_ENERGY`).
  - The emoji map lacks four of the backend's types.
  - `reasonType.replace('_', ' ')` only replaces the first underscore.
- **Privacy:** the public `/random` response includes **`submittedBy`, `submittedByLink` and `relationship`**. These were filled in on the reasons sampled. The UI doesn't show them, but anyone calling the API can read them. Values weren't recorded here.

### 9.6 Phases

| Phase | What | Touches production code? | Approval |
|---|---|---|---|
| **1. Standalone app** (smallest safe step) | `/apps/magic-8-ball`, live but not linked from the current homepage. | Adds new frontend files and changes `vite.config.ts` only. | **Needed (this plan).** |
| 2. Case study | `/projects/magic-8-ball` as part of the v2 portfolio, with **Play Magic 8-Ball** → `/apps/magic-8-ball`. | Yes, with the v2 portfolio build. | Later. |
| 3. Backend and data | Security fixes, a public response object (DTO), and moving `title` text into `reason` (9.7). | Backend and a new Flyway migration. | Separate. |
| 4. Homepage switch | The v2 portfolio replaces the current homepage; the old 8-Ball dialog retires with it. | Yes. | Later (decision 6). |

#### Phase 1 in detail: the smallest safe step

**Goal:** the playable app exists at `/apps/magic-8-ball`, with the original look, 2026 behavior and a Back to Portfolio link, and **the current homepage is byte-for-byte unchanged in source**.

**New files** (all under `frontend/`):
- `apps/magic-8-ball/index.html`: the page's HTML (title, description, favicon, `<div id="root">`, script tag).
- `src/apps/magic-8-ball/main.tsx`: renders the app into the page.
- `src/apps/magic-8-ball/MagicEightBallApp.tsx`:
  - **Original layout:** the illustration, the "8" ball, the purple question "Is Betsy your next great hire?", **Shake the Magic 8-Ball**, the affirmation and the reason card.
  - **2026 behavior:** API call with a 6-second timeout, fallback reasons, results in an `aria-live` region, visible focus styles, and no motion when reduced motion is on.
  - **Navigation:** a **Back to Portfolio** link to `/`.
- `src/apps/magic-8-ball/reasons.ts`: pure, testable logic:
  - `normalizeReason(json)`: heading from `reason`, else `title`, else **no heading** (explanation only); all type underscores turned to spaces.
  - the fallback list, using only the backend's real types, so `SOFT_SKILL` is replaced.
  - `getReason(apiBase, fetcher)`: falls back on a missing URL, an error or a timeout.
- `src/apps/magic-8-ball/magic-8-ball.css`: the page's own styles in the original palette. It doesn't import or change `index.css`.
- `src/apps/magic-8-ball/reasons.test.ts`: tests, using a sample response that matches today's live shape (personal fields removed). They cover:
  - `reason` filled, `title` only, both empty, and an unknown type
  - fallback when the address is missing, the request fails or it times out

**Changed files:** `frontend/vite.config.ts` only, adding the two pages (homepage and app) to the build.

**Not touched:**
- the homepage's code: `App.tsx`, `index.css`, `main.tsx` and `index.html`
- the backend, migrations, `Dockerfile`, CORS, environment variables and Vercel settings

The homepage's existing `title` bug stays as it is (decision 6). It gets fixed at the source in phase 3.

**Duplication, on purpose:** the app copies about 40 lines of 8-Ball logic instead of extracting them from `App.tsx`. Extracting would mean editing the homepage, and the old homepage is due to be retired, so the copy is temporary.

**Illustration:** `magic8ball-betsy.png` is about 2.5 MB. Phase 1 should add a resized copy, about 1000 px wide, for the app page, created from the existing file, which stays unchanged.

**Tests, which needs a decision (C in 9.8).** The frontend has no test runner.
- **Option 1, recommended: Vitest** as a **dev-only dependency**. It fits Vite and runs TypeScript tests directly, but it's a new dependency, so it needs approval.
- **Option 2: Node's built-in test runner** (`node --test`). No new dependency, but it needs Node 22.18+ (or 23.6+) to run `.ts` files without extra tooling.
- **Option 3, alongside either, also needs approval:** a backend `@JsonTest` contract test using the existing `spring-boot-starter-test`, which pins the JSON field names.

**Verification steps:**
1. `npm run lint`, `npm run build` and the tests.
2. Confirm `dist/apps/magic-8-ball/index.html` exists.
3. `npm run preview`: `/`, `/apps/magic-8-ball/`, `/apps/magic-8-ball`, refresh, Back/Forward, keyboard only, 390 px and reduced motion. On localhost the API is refused by CORS, so this checks the **fallback** path.
4. **Vercel preview deployment** from a branch (Betsy pushes): check both trailing-slash forms, check that `/` is unchanged, and check the dashboard rewrite settings.
5. **After merging to production:** check `/apps/magic-8-ball` gets a **live** answer, with no blank heading even while the data issue remains, and that `/` still works.

**Rollback:** revert the one commit; the homepage is unaffected.

**Risks:**
- The trailing-slash or dashboard-rewrite behavior may need a `vercel.json` (decision 5).
- Shared-chunk changes to the homepage's built output.
- The live API path is only exercised in production; tests with live-shaped sample data reduce that risk.
- Today's data shows reasons **without headings** until phase 3.

### 9.7 Backend security and data: recommended plan (documentation only, not implemented)

| Priority | Issue (verified) | Recommended fix |
|---|---|---|
| 1 | `POST /api/reasons` and `POST /api/reasons/upload` have **no authentication** and accept **`approved`** from the request body, so anyone can publish a reason or upload images to Cloudinary. | Disable both until an admin workflow exists: remove the mappings, or enable them only under an admin profile. If submissions return later: require authentication (for example Spring Security with an admin credential from environment variables), **always set `approved=false` on the server**, validate input, check upload type and size, and rate-limit. |
| 1 | `GET /api/reasons` returns **unapproved** reasons. | Return approved reasons only, or remove the endpoint (the UI doesn't use it). |
| 2 | The public responses include **`submittedBy`, `submittedByLink`, `relationship`, `approved`, `submittedByOthers`**. | Return a **public response object (DTO)** with only `id`, `reason`, `reasonType`, `explanation` (and `imageUrl` if it's ever used). Optionally include a **deprecated `title` alias** with the same text, which would also fix the old homepage without touching its code. |
| 2 | Swagger UI and `/v3/api-docs` publicly document the write endpoints. | Turn Swagger off in production (`springdoc.swagger-ui.enabled=false`, `springdoc.api-docs.enabled=false` under a production profile), or protect it. |
| 3 | The reason text is probably in the `title` column; `reason` is empty (9.5). | After the read-only query confirms it, add a **new** migration (for example `V3__copy_title_to_reason.sql`: `UPDATE reason SET reason = title WHERE (reason IS NULL OR reason = '') AND title IS NOT NULL;`). Never edit `V1`/`V2`. Drop `title` in a later migration once nothing reads it. |
| 3 | `/random` loads every approved row, and returns **500** when there are none. | Pick the random row in the database, and return `204` or `404` when empty. |
| 3 | CORS allows all methods with `allowCredentials(true)`. | Once writes are gone, allow `GET` only and set `allowCredentials(false)`. Confirm whether `www.reasonstohirebetsy.com` needs adding. |
| 4 | No backend tests. | MockMvc tests: the write endpoints are rejected, the public response has the expected shape, unapproved reasons are hidden, and an empty table doesn't error. |

**Suggested order:** close the write endpoints and hide unapproved reasons first, then the public response object and Swagger, then the data migration, then the rest. Each needs its own approval: these are backend behavior and data changes.

### 9.8 Decisions needed before phase 1 code

- **A. Approve the phase 1 scope:**
  - new files under `frontend/apps/` and `frontend/src/apps/magic-8-ball/`
  - a `vite.config.ts` change
  - a resized copy of the illustration
  - the homepage left untouched
- **B. Back to Portfolio target** while the v2 portfolio doesn't exist: `/`, the current homepage (recommended). Later it could go to `/projects/magic-8-ball` or the v2 homepage.
- **C. Test runner:**
  - **Vitest**, a new dev dependency (recommended)
  - **Node's built-in runner**, which needs Node 22.18+
  - plus, optionally, the backend `@JsonTest`
- **D. Headings with today's data:** accept reasons showing **without headings** on `/apps/magic-8-ball` until phase 3, or prioritize the phase 3 data migration first.
- **E. Who runs the Vercel preview:** a branch push and preview deployment is your step (I don't push or deploy).

### 9.9 What the prototype shows (prototype only)

- **Projects card:** the 8-Ball card offers **View project details**, which opens the detail card at `#/projects/magic-8-ball` and corresponds to the future **case study**. It also offers **Launch the Magic 8-Ball**, labeled "Prototype placeholder".
- **Detail card:** a **Launch the Magic 8-Ball** button, with a note that the standalone page isn't built or deployed.
- **The placeholder page:** `explorations/v2-recipe-index/projects/magic-8-ball/index.html` stands in for the future **app**. It's a real separate page, borrows the original look, says plainly that it's a placeholder, has **no working or fake Shake button**, and links back to the portfolio.
- **Not yet aligned with decision 7:**
  - The placeholder's folder should become `apps/magic-8-ball/`.
  - Its link text should become **Back to Portfolio**.
  - The detail card's button should become **Play Magic 8-Ball**.

  These are small prototype-only renames, not done in this pass.
