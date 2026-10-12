# DESIGN.md

Design direction for ReasonsToHireBetsy v2.0. Read this before any UI work. Engineering rules,
commands and safety constraints live in [CLAUDE.md](CLAUDE.md) and are not repeated here.

**Status labels used throughout:**

- **Approved:** Betsy decided it. Changing it needs her approval.
- **Proposed:** a recommendation to explore or adopt. Not binding until approved.
- **Undecided:** an open question. Do not pick an answer in production code.

The current site's code and visuals are a reference point, not a constraint. v2 does not have
to preserve them. Known accessibility and performance gaps in the current UI are listed in
[docs/research/initial-architecture-assessment.md](docs/research/initial-architecture-assessment.md),
section 3.

---

## A. Purpose and audience

**Approved.** v2.0 is a professional software engineering portfolio that shows both Betsy's
engineering experience and her personality.

| Visitor | What they need | A good visit looks like |
|---|---|---|
| Recruiter | Role, level, experience, location, how to get in touch | Within about a minute of scanning, they can summarize who Betsy is and reach the résumé or contact details without hunting. |
| Hiring manager | Evidence of judgment, scope and how she works | They find at least one concrete example of a problem she worked through and why she made the choices she made. |
| Engineer evaluating her work | Technical depth, code, decision-making | They can reach real code, architecture write-ups or case studies, and the details hold up under scrutiny. |

**Visitors should come away knowing (approved):**

1. Her engineering experience and technical capabilities.
2. That she can solve complex problems and explain engineering decisions.
3. Her interest in AI-assisted development, agentic workflows and continuous learning.
4. Her creativity, curiosity and personality.
5. That she builds thoughtful, accessible, maintainable software.

---

## B. Design principles

Each principle comes with a check that can be applied to a design or a pull request.

| # | Principle | Check | Status |
|---|---|---|---|
| 1 | **Professional content stands on its own.** | Remove every cooking reference, photo and Easter egg: the site still fully explains who Betsy is, what she has done and how to contact her. | Approved |
| 2 | **Plain labels for anything people need.** | Navigation, headings, buttons and links use literal wording ("Experience", "Résumé", "Contact"). Playful wording only appears as secondary text, never as the only label. | Proposed |
| 3 | **Show evidence, not adjectives.** | Every claimed strength is backed by a real example, decision or outcome from Betsy's actual work. No invented metrics, projects or testimonials. | Proposed |
| 4 | **Layout follows content.** | Each section's structure is chosen for what it presents. A repeated pattern, such as a grid of equal cards, needs a content reason, not habit. | Proposed |
| 5 | **Readable first.** | The page's structure is clear from its headings alone. Body text meets AA contrast, line lengths stay comfortable, and nothing important is conveyed only through images, color or motion. | Proposed |
| 6 | **Visible personality, placed with purpose.** | Personality is clearly present, but every personal element (a photo, a color moment, a cooking reference) has a reason to be where it is. Removing any single one loses no professional information. | Proposed |
| 7 | **Every interaction has a purpose.** | Each interactive element either helps people navigate, reveals more detail, or is an opt-in moment of delight. Nothing moves or changes without a reason or a user action. | Proposed |
| 8 | **Accessible by default.** | Meets WCAG 2.2 AA (section F) before a feature counts as done. | Approved |
| 9 | **Original, not templated.** | The result shouldn't be mistakable for a portfolio template or a generic AI-generated page (see section D). | Approved |

---

## C. Content and information hierarchy

**Proposed. This is a candidate order, not an approved sitemap.** Whether this becomes one page
or several is undecided (section I).

| Order | Content area | Purpose | Source of truth |
|---|---|---|---|
| 1 | Professional introduction | Name, role, level and a one-line summary of how she works. Résumé and contact reachable right away. | Résumé PDF, existing site copy, Betsy |
| 2 | Engineering experience and strengths | Where she has worked and the scope of that work | Résumé, existing experience timeline |
| 3 | Selected projects and technical accomplishments | Concrete evidence: problem, constraints, decisions, outcome | Betsy. **Content needed.** The current site has three case-study outlines, two marked in progress. |
| 4 | Engineering approach and problem-solving | How she investigates, asks questions and makes trade-offs | Existing "how I think" content, Betsy |
| 5 | AI interests and ongoing learning | AI-assisted development, agentic workflows, what she's exploring | Betsy. This repository's own documentation process is a candidate example. |
| 6 | Personal background and interests | Personality and personal storytelling, including cooking | Betsy |
| 7 | Contact and résumé | A clear next step | Betsy (confirm the current email and links) |

Cooking photography isn't limited to area 6. It may appear across the site (approved; see
section E), but it supports these content areas and never replaces their content. Personality
builds gradually down this order: area 1 establishes engineering identity first (approved; see
section D, "Progressive personality reveal").

**Content rules (proposed):**

- Don't invent achievements, metrics, employers, dates or project details. Mark missing content as a gap instead of filling it with placeholder claims.
- Every case study answers: what was the problem, what did she consider, what did she choose and why, and what happened.
- Write for scanning: lead with the point, keep paragraphs short, and use specific nouns over adjectives.
- Clearly distinguish professional accomplishments, independently built projects, and experiments or work in progress. Never present exploratory work as production experience.

---

## D. Visual identity direction

**Approved (2026-10-12): the recipe-box portfolio is the v2.0 design.** The homepage is Betsy's
own wooden recipe box. Visitors open it, and the portfolio sections are index cards inside, with
colored divider tabs. The colors, fonts (Fraunces, Figtree, Caveat), layout and motion as built
in `frontend/index.html` and `frontend/src/portfolio/` are the v2.0 baseline. Changing them needs
approval. Plain CSS stays the styling approach. Details:
[ADR 0002](docs/decisions/0002-recipe-box-portfolio-homepage.md) and
[the interaction write-up](docs/research/v2-recipe-box-interaction.md). This replaces the earlier rule that these choices stay
undecided until exploration was done.

**Desired character**, described as qualities rather than specific choices.

**Approved (2026-10-09):** the visual experience is colorful, expressive, warm, creative and
distinctive, not excessively minimalist. Betsy's original cooking photography is part of the
visual identity. How these qualities are achieved is undecided.

**Approved (2026-10-09): progressive personality reveal.** The homepage establishes Betsy's
identity and credibility as a software engineer first. Cooking photography and personal
interests are introduced gradually as visitors scroll and explore, becoming more visible
farther into the site. Photography stays part of the overall visual identity but doesn't
dominate the initial homepage viewport. This is not a request for minimalism: the first
viewport is still colorful, expressive and distinctive, carried mainly by color, typography
and composition rather than photography.

**Proposed** refinements of that character:

- **Confident and technically credible.** The experience communicates engineering maturity through clarity, demonstrated work, and thoughtful design rather than relying on seniority labels.
- **Warm, not cute.** Personality comes through tone and small details, not mascots or novelty styling.
- **Crafted.** Spacing, alignment and states (hover, focus, empty, loading, error) look considered. Polish shows in details, not in decoration.
- **Distinctive.** At least one memorable element that belongs to this site and wouldn't make sense on anyone else's. Original photography is the most natural candidate.
- **Expressive where it helps, calm where people read.** Color and typography carry the energy in the introduction; photography and personal storytelling build up in transitions and personal sections farther down (see the progressive-reveal decision above). Case studies and professional details stay easy to read and scan.

**Avoid (approved):**

- Generic AI-generated portfolio aesthetics: stock gradient hero sections, glowing blobs, "glassmorphism" by default, interchangeable buzzword copy.
- Excessive minimalism: a restrained, colorless layout that hides the personality v2 is meant to show.
- Excessive gradients.
- Repetitive card grids where every section has the same structure.
- Decorative clutter: icons, emoji, illustrations or photos that carry no meaning or appear randomly placed.
- Stock or AI-generated food imagery. Photography is Betsy's own.
- Unnecessary animation: motion that runs without user intent or delays access to content.
- Anything that makes the site resemble a restaurant website, a recipe blog, a food delivery app or a cooking-themed résumé template.

---

## E. Cooking presence, photography and Easter eggs

### Rules

**Approved:**

- Cooking has a visible presence, through original photography, storytelling, details, interactions and optional Easter eggs (approved 2026-10-09). Engineering experience and accomplishments remain the primary subject.
- The site must not resemble a restaurant, recipe blog or food delivery app (see the avoid list in section D).
- Professional content remains understandable to someone who doesn't recognize any cooking reference.
- Easter eggs are optional and never block access to professional content.
- Cooking and personal interests are revealed progressively: lighter near the top of the homepage, more visible as visitors scroll and explore (approved 2026-10-09; see section D).

**Proposed:**

- Cooking language is always secondary in text. It never replaces a plain label, never hides information, and never needs explaining.
- Easter eggs are discoverable but not required. A visitor who never finds one misses nothing professional.
- Every Easter egg is keyboard-operable, announced properly to assistive technology, closable with Escape, respects reduced-motion settings, plays no sound by default and doesn't slow down the initial page load.
- Ship few Easter eggs, well made, rather than many shallow ones.

### Photography

**Approved (2026-10-09):**

- Betsy's original cooking photography may appear throughout the site, including the homepage, transitions between sections and personal storytelling. On the homepage it doesn't dominate the initial viewport; it becomes visible farther down the page (progressive reveal, section D).
- Photos are intentionally integrated into the design: each one has a chosen place and role. They are never inserted randomly or used as generic decoration.

**Proposed:**

- **Curate a set, not a gallery.** Choose photos for a consistent treatment (to be decided: cropping, color, framing) so they read as one visual voice.
- **Give each photo a job:** setting the mood of the introduction, marking a transition, or illustrating a personal story. If it has no job, leave it out.
- **Keep reading areas clear.** Photos frame case studies and professional details but don't compete with them. Text never sits on a photo unless contrast is guaranteed at every screen size.
- **Avoid food-media framing.** No ingredient lists, menus or "order now" patterns. (Revised 2026-10-12: the approved recipe box deliberately uses index cards as the site's structure. It reads as Betsy's own box, not a recipe blog, because the content on the cards stays professional and plainly labelled.)
- **Content needed:** an inventory of available photos (subject, orientation, resolution, any people or identifiable places) before design exploration picks specific images.

### Candidate concepts (proposed, none approved)

| Concept | Idea | Risk to watch |
|---|---|---|
| Engineering-as-cooking metaphors | Ideas such as *mise en place* (preparing before implementing), *tasting as you go* (verifying iteratively) and *technique over recipe* (understanding why, not just following steps) could inform storytelling about how she works. | Overuse turns it into a gimmick. Use one or two, only where they clarify. |
| Occasional microcopy | Small cooking-flavored phrases in secondary places, such as empty states, loading text or the footer. | Puns that need decoding, or that appear too often. |
| "How this site was made" | A hidden or optional view that presents the site's stack and process as ingredients and method, linking to real architecture docs. | Must stay accurate to the actual stack. |
| Magic 8-Ball | **Decided (2026-10-11):** kept as a standalone project app at `/apps/magic-8-ball`, with its original look, plus a case study at `/#/projects/magic-8-ball` in the portfolio (ADR 0002). See [ADR 0001](docs/decisions/0001-magic-8-ball-standalone-app.md). | It currently depends on a backend with known issues (see [CLAUDE.md](CLAUDE.md)). |
| An optional cooking interaction | A small interactive moment tied to cooking (to be explored). | Must not require dragging, timing or precision without an accessible alternative. |

---

## F. Interaction and accessibility standards

**Approved:** WCAG 2.2 AA is the target. The items below make it concrete for this site
(proposed).

- **Keyboard:** everything works with a keyboard alone, in a logical tab order, with no keyboard traps. Dialogs move focus in, keep it inside while open, and return it to the trigger on close.
- **Visible focus:** every interactive element has a clearly visible focus indicator. Focused elements aren't hidden behind sticky headers or overlays (WCAG 2.4.11).
- **Reduced motion:** respect `prefers-reduced-motion`. With reduced motion on, the site stays fully usable and no meaning is lost.
- **Mobile:** all navigation and content are available at every screen size. Nothing is hidden on small screens without an accessible alternative. Touch targets meet the 24×24 CSS pixel minimum (WCAG 2.5.8).
- **Semantic structure:** landmarks (`header`, `nav`, `main`, `footer`), one `h1`, headings in order, real buttons for actions and links for navigation, meaningful alt text, and decorative images marked as decorative.
- **Understandable navigation:** plain labels, consistent placement across pages, current location indicated, and a skip link.
- **Dynamic content:** updates such as Easter-egg results are announced through live regions that exist before the content changes.
- **Pointer interactions:** any drag or gesture has a single-tap or keyboard alternative (WCAG 2.5.7).
- **Easter eggs:** never block professional content (approved), and are never the only way to reach any information.
- **Photography:** photos that add meaning, as in personal stories, get descriptive alt text. Purely atmospheric photos are marked decorative. Any text over or beside a photo meets AA contrast. Color is never the only way information is conveyed.

---

## G. Responsive design and performance

**Proposed.** Breakpoints and implementation technologies are undecided.

- **Mobile:** treated as a primary experience, not a fallback. Content stays the same, the layout adapts, and the intro, résumé and contact are reachable without long scrolling.
- **Tablet:** a deliberate layout of its own, not a stretched phone view or a squeezed desktop view. Works in both orientations.
- **Desktop:** uses the extra width for clearer hierarchy, not for more decoration. Line lengths stay readable on wide screens.
- **Performance:**
  - The first view loads quickly on a mid-range phone over a mobile connection.
  - Images are correctly sized and compressed, which the current site doesn't do (see the assessment). With photography used throughout, images are the biggest performance risk: serve sizes appropriate to each screen, reserve their space so the layout doesn't shift, and load photos below the first view only when needed.
  - Easter-egg and interaction assets load only when needed.
  - No layout shift as content loads.
  - Specific performance targets are undecided and will be set during exploration.
- **Resilience:** the site reads correctly if JavaScript-driven extras or the backend fail. Professional content never depends on the backend being up.

---

## H. Design exploration workflow

**Approved.** Experiments are encouraged, but exploratory choices aren't production standards
until they're approved.

1. **Understand** the visitor's needs and the content being presented.
2. **Explore** more than one direction. Don't refine the first idea in isolation.
3. **Explain** the meaningful trade-offs of each direction, briefly.
4. **Mock up or prototype** when that makes a choice easier to judge. Keep prototypes out of production code.
5. **Review** the options with Betsy.
6. **Record** approved decisions in the decision log (section J). Use `docs/decisions/` when a decision needs its reasoning preserved.
7. **Implement** only after approval.
8. **Validate** accessibility (section F), responsiveness (section G) and usability, and report the results honestly.

---

## I. Open design decisions

Items 1–6, 8, 9 and 10 were resolved on 2026-10-12 by approving the recipe-box portfolio as built (section D and the decision log):
- the visual style, colors, fonts, layout and motion;
- one page with hash routes, with project details as cards in the box;
- the photos in place;
- three projects in a stack;
- plain CSS.

Still **undecided**:

1. **Contrast audit:** the colors haven't had a full WCAG AA contrast audit in every state.
2. **Cooking-inspired details:** which further concepts from section E, if any, to adopt.
3. **Future content:** screenshots for Church Festival Signup, and more projects.

(The former item 9, "Magic 8-Ball: keep, redesign or retire", was decided on 2026-10-11; see the decision log.)

---

## J. Design decision log

The log points to the sections where details live; it doesn't restate them.

**To record an approval:** add a row to the Approved table with the date, a short name for the
decision, the section it affects, and a one-line rationale. In the same change, update that
section's status label (and remove the item from section I if it was open there). Use
`docs/decisions/` only when the reasoning needs more than one line.

### Approved

| Date | Decision | Section | Source / rationale |
|---|---|---|---|
| 2026-10-09 | Purpose, audience and what visitors should learn | A | Betsy's v2 brief |
| 2026-10-09 | Professional first; professional content understandable without cooking references. (The original "cooking is subtle" wording was superseded by the visual-direction row below.) | B1, E (rules) | Betsy's v2 brief |
| 2026-10-09 | Easter eggs are optional and never block professional content | E (rules), F | Betsy's v2 brief |
| 2026-10-09 | Original, not templated; the "avoid" list, including the restaurant / recipe-blog / food-delivery / résumé-template exclusions | B9, D | Betsy's v2 brief |
| 2026-10-09 | Accessibility target: WCAG 2.2 AA | B8, F | [v2 documentation strategy](docs/research/v2-documentation-strategy.md), section 7 |
| 2026-10-09 | Visual choices stay open until design exploration is done | D, I | [v2 documentation strategy](docs/research/v2-documentation-strategy.md), section 7 |
| 2026-10-09 | Design exploration workflow | H | Betsy's v2 brief |
| 2026-10-09 | Richer visual direction: colorful, expressive, warm, not excessively minimalist. Cooking has a visible presence, and original cooking photography is used throughout, intentionally integrated. Specific visual solutions stay undecided. | D, E (rules, photography) | Betsy's design feedback: earlier exploration felt too restrained, and her own photography makes the site distinctive and personal |
| 2026-10-09 | Progressive personality reveal: the homepage leads with engineering identity and credibility; cooking photography and personal interests appear gradually as visitors scroll, and photography doesn't dominate the initial viewport. Still colorful and expressive, not minimal. Refines (doesn't replace) the row above. | C, D, E (rules, photography) | Betsy's homepage-exploration brief: recruiters should meet the engineer first, then discover the person |
| 2026-10-12 | **The recipe-box portfolio is the v2.0 design** and replaces the homepage. A fresh visit to `/` starts with the closed box, nothing is remembered between visits, and `#/` links open straight to a card. Project details are cards pulled out of the box (`#/projects/<name>`). The Magic 8-Ball's Back to Portfolio goes to `/#/projects`. | D, E (photography), I | Betsy's release brief; [ADR 0002](docs/decisions/0002-recipe-box-portfolio-homepage.md) |
| 2026-10-11 | Magic 8-Ball kept as a standalone project app at `/apps/magic-8-ball`, a second page in the existing Vite app with no router. It keeps the original April 2025 look and illustration plus the 2026 behavior (fallbacks, keyboard support). A case study at `/projects/magic-8-ball` comes later. The current homepage is unchanged until v2 is ready. | E (candidate concepts), I | [ADR 0001](docs/decisions/0001-magic-8-ball-standalone-app.md) |

### Proposed (awaiting review)

| Item | Section |
|---|---|
| Principles 2–7 | B |
| Content hierarchy and content rules | C |
| Refinements of the visual character | D |
| Easter-egg rules beyond "optional, never blocking", photography guidelines, and all candidate concepts | E |
| Specific accessibility, responsive and performance expectations, including photography | F, G |

### Undecided

Everything listed in section I.
