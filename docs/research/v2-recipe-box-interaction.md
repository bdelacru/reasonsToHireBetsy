# v2 recipe-box interaction (exploration)

- **Status: Exploratory — Not Approved.** Nothing here is a design decision. DESIGN.md is unchanged.
- **Update 2026-10-11:** Betsy prefers this prototype as the design direction to keep exploring (still not
  production-approved). It's now the main development destination: the Magic 8-Ball's "Back to Portfolio" returns
  here (section 3a).
- **Date:** 2026-10-11
- **Prototype:** `explorations/v2-recipe-box/index.html`, served by the dev server only:
  `cd frontend && npm run dev`, then http://localhost:5173/explorations/v2-recipe-box/
- **Builds on:** the recipe-index prototype (`explorations/v2-recipe-index/`, unchanged) and
  [v2-projects-page-direction.md](v2-projects-page-direction.md).

## 1. Concept

The whole portfolio is Betsy's real wooden recipe box.

1. **Closed box (landing):** the name and role, the closed box with a handwritten "Betsy's Recipes" label, an
   "Open the recipe box" button, plus "Go straight to the portfolio" and "Résumé (PDF)" links.
2. **Opening (about 2.5 s):** the metal hasp swings up, the lid hinges open on its back edge, the five
   index dividers (Home, Experience, Projects, AI & Learning, About) rise a little, and the view moves into the box.
3. **Open box (portfolio):** the open lid stands at the top, the dividers' tabs are the navigation, the
   selected card is in front, and the box's front edge with its label stays at the bottom of the screen while
   the card scrolls behind it.
4. **Changing cards:** the old card sinks back into the box; the new one is lifted out of the stack, rises
   above it and settles in front.
5. **Projects:** the three project cards are a small fanned stack "held in the hand", browsed one at a time
   (Previous/Next, arrow keys, swipe, or clicking a fanned card).

## 2. How the real photographs were used

Source: Betsy's three photos (open, lid from above/side, closed), as pasted into the chat at 1152×1536.
Copies are in `originals/recipe-box/` (git-ignored, like all originals). The originals are never modified.

`explorations/v2-recipe-box/make-photos.ps1` straightens four faces of the real box with a perspective warp
(four corners in the photo → a flat rectangle) and saves them as new JPEGs, so no metadata is copied.
`photos/` is git-ignored.

| Texture | From | Shows |
|---|---|---|
| `lid-front.jpg` (19 KB) | closed photo | lid front: corner brackets, wear, the hasp's hinge plate |
| `lid-top.jpg` (41 KB) | closed photo | the grooved lid top (4 slats) |
| `lid-inside.jpg` (30 KB) | open photo | inside of the lid, seen when it's open |
| `base-front.jpg` (21 KB) | open photo | base front: latch plate, lower corner brackets |

The lid/side photo (top view) was too steeply angled to give a clean texture. It was used only as a
reference for the slat count and lid proportions. No stock or AI imagery is used. Card photos (cooking)
are the recipe-index prototype's existing copies, loaded from `../v2-recipe-index/photos/`.

## 3. Implementation

- **One static HTML file** with inline CSS and JS, like the other explorations. No new dependencies.
- **The box is real CSS 3D:** each face is an element with `transform-style: preserve-3d`, sized in units of
  the box width, with real proportions (about 100 wide, 60 deep, lid 24 and base 36 tall). The lid is a 3D group
  hinged at its back bottom edge (`transform-origin` at the back) and rotates `rotateX(112deg)`. Its underside
  carries the lid-inside photo, so the inside appears as it swings past vertical.
- **Stages** (`data-stage`): unlatch (0 ms) → lid (300 ms) → cards rise (1150 ms) → zoom into the box
  (1750 ms) → portfolio (2700 ms). CSS transitions drive them, and timers set them.
- **Routing:** the recipe-index hash routes (`#/`, `#/experience`, `#/projects`, `#/ai`, `#/about`). No
  route means a closed box. An inline script in `<head>` picks the first view before paint, so a direct
  link never flashes the closed box.
- **Dev server:** `frontend/vite.config.ts`'s dev-only plugin now serves both prototype folders (a list
  instead of one path). It is `apply: 'serve'`, so the production build is unaffected.

## 3a. Navigation with the standalone Magic 8-Ball (development)

- **Play Magic 8-Ball** (Projects, first card) is a link to `/apps/magic-8-ball/`, the real standalone game.
- **Back to Portfolio** in the game reads `VITE_PORTFOLIO_URL`. `frontend/.env.development` sets it to
  `/explorations/v2-recipe-box/#/projects`. Production builds fall back to `/` (ADR 0001) until a v2 portfolio is deployed.
- Arriving with a `#/` route opens the box straight away with **no opening animation**. Magic 8-Ball is the first
  project, so it's in front. No state is passed between pages, so returning always shows project 1, even if the visitor
  had moved through the stack before launching. Only the 8-Ball card has a Play link, so that's the card they left from.
- The link adds a history entry, as before, so Back from the recipe box returns to the game and Back again reaches the
  earlier recipe-box cards.
- **Still pointing at the older recipe-index prototype:** the three "View project details" buttons (each labelled "In the
  recipe-index prototype"), and the cooking photos, which are loaded from `../v2-recipe-index/photos/`. The
  recipe-index prototype itself is unchanged. Its own Play link still works, but the game now returns to the recipe box.

## 4. What is simulated vs. genuinely animated

| Genuinely animated (3D transforms of real-photo faces) | Simulated or drawn |
|---|---|
| Lid rotating on its hinge, in perspective | The hasp loop is an SVG drawing (neither photo shows it usable), hung slightly crooked like the real one |
| Lid inside appearing as it passes vertical | Box sides, back and interior are flat wood-colored gradients, not photos |
| Dividers rising out of the box | The dividers and their tabs are drawn in CSS; the real box holds handwritten recipe cards |
| Camera "moving in" (scale and fade) | The move into the box is a crossfade into a separate 2D layout, not a continuous camera move |
| | In the open view, the lid and box front are flat bands using the same textures, not 3D |

**Limitations, stated plainly:**
- This is not a photographic 3D model. The textures come from two photos with different lighting and are
  slightly soft (the lid top especially).
- The lid front and base front don't line up perfectly at the hardware, because they come from different photos.
- The front edge is stretched wider than the real box on desktop.

## 5. Accessibility

- The skip link ("Skip the recipe box and go to the portfolio") is the first Tab stop. The box is one `<button>`
  whose accessible name is "Open the recipe box" (the 3D box is `aria-hidden`).
- Résumé and the direct portfolio link are available on the closed screen, so the animation never stands between a
  recruiter and the qualifications.
- During opening, the landing is `inert`, and a visible **Skip animation** button gets focus; **Escape** also
  skips. After opening, focus goes to the card's `h1`. Back to the closed box returns focus to the button.
- `prefers-reduced-motion`: opening, card changes and project changes are instant, and the hover peek is off.
- Tabs are real links with `aria-current="page"`. The project stack keeps the recipe-index semantics
  (carousel/slide roles, inert back cards, polite live region, arrow keys, single-tap alternatives to swipe).
- The sticky box front could hide focused elements, so `scroll-padding-bottom` is set. A check tabbing
  through the Experience card at 390 px found nothing covered (WCAG 2.4.11).
- Without JavaScript, the landing is skipped and every card shows in order.
- **Not done:** screen-reader testing with NVDA, JAWS or VoiceOver, and a contrast audit of the new elements
  (the label and the wood bands are decorative and carry no text that matters).

## 6. Mobile

- The box scales to the screen (`min(32rem, 80vw, 46svh)`). Opening is the same tap. The name and links
  fade while the lid rises into the space above.
- The open view uses thin walls, a short lid band and a 3.25 rem box front. Tabs scroll sideways with edge
  fades, as in recipe-index. Card photos move below the text.
- Swiping the project stack works with touch, and vertical scrolling is never captured. Nothing relies on hover.
- On landscape phones (height ≤ 520 px), the box front scrolls with the page instead of staying fixed.

## 7. Performance

- The landing loads four small textures (about 110 KB total) and no other images. Card photos are lazy-loaded.
- Animations only change `transform` and `opacity`, and 3D is limited to the landing scene, which is removed
  (`display: none`) after opening.
- Risks: `preserve-3d` with many faces is costlier on low-end phones (not measured), and the Google Fonts
  request is still render-blocking, as in the other prototypes.

## 8. Validation (2026-10-11)

A headless Edge script (DevTools protocol, run from a scratchpad, not committed) ran 45 checks, and all passed, with no
console errors. It covered:
- keyboard opening;
- focus moves;
- Back closing the box and Forward reopening it;
- refreshes;
- direct links to every card;
- Escape and Skip during the opening;
- the Projects order, Next/Previous/arrow keys and swipe;
- "Play Magic 8-Ball" opening the real game, and Back returning to the open box;
- no horizontal scrolling at 390 px, touch targets ≥ 24 px, and reduced motion.

Screenshots, including frame sequences of the opening, a card change and a project change, are in
`explorations/v2-recipe-box/screenshots/` (git-ignored). Sizes: 1920×1080, 1440×900, 1024×768, 768×1024 and 390×844.

## 9. What production integration would need

- A decision on the concept itself, and whether the landing is the homepage or an optional entry.
- Moving the content into `frontend/` (probably React components). The 3D box should be one isolated component,
  loaded only on the landing.
- Real project detail pages. This prototype links to the recipe-index prototype's detail cards (see question 8).
- Pointing the Magic 8-Ball's "Back to Portfolio" (`VITE_PORTFOLIO_URL`) at the deployed v2 page. In development it
  returns to this prototype; production still uses `/`.
- Better textures: full-resolution originals, and ideally a straight-on photo of each face in even light.
- Remembering that a visitor has already opened the box (for example `sessionStorage`), so returning visitors aren't
  made to open it again.
- Screen-reader testing on real devices, and performance testing on a mid-range phone.

## 10. Open design questions (Betsy's decision)

1. Is the opening the homepage, or should Home load already open, with the box as an optional moment?
2. DESIGN.md's proposed photography guidance says "no recipe-card layouts … as the site's structure", and this
   concept makes recipe cards the structure. Keep the guidance, or revise it if this direction wins?
3. Opening length: is about 2.5 s right, or should it be shorter (for example 1.5 s)?
4. Should the open view keep the lid band at the top and the sticky box front at the bottom, or drop one to give
   reading space, especially on phones?
5. Divider colors and labels: the recipe-index colors are reused. Is the yellow Home divider right?
6. Label wording and style: "Betsy's Recipes" as a handwritten paper label, or something else?
7. Projects: is a fanned "held" stack the right feel, or should taking the cards out of the box be a bigger
   moment?
8. **Project details** (the 8-Ball's Back link is settled: it returns here). Options:
   - **A. Port the three detail cards into the box** as `#/projects/<name>` cards (Projects tab stays current, "All
     projects" returns to the stack). Content is copied unchanged. The work is moderate: about 150 lines of content,
     about 25 of CSS, and nested routes. It also needs a design choice: a full card in the box, or a card "pulled out" of
     the held stack.
   - **B. Remove the "View project details" buttons** until details are designed. The Play and live-site links stay.
   - **C. Keep the labelled links** to the recipe-index detail cards (the current state).
