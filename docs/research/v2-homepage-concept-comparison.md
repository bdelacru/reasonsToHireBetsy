# v2.0 Homepage Concept Comparison

- **Date:** 2026-10-09
- **Status:** Exploratory. No concept is selected. Every color, font, layout and interaction in the prototypes is experimental, not a production standard.
- **Builds on:** [DESIGN.md](../../DESIGN.md) (including the approved progressive personality reveal, section D) and [v2-photography-inventory.md](v2-photography-inventory.md)
- **Prototypes:** `explorations/v2-homepage/` (open `index.html`)

---

## 1. What was built

Three static HTML/CSS/JS homepages, each a single self-contained file, plus a comparison index.
No build step, no new dependencies and no changes to `frontend/`.

| File | Purpose |
|---|---|
| `explorations/v2-homepage/index.html` | Links to the three concepts and a short comparison table |
| `explorations/v2-homepage/concept-a-editorial.html` | Concept A: Colorful Editorial |
| `explorations/v2-homepage/concept-b-scrapbook.html` | Concept B: Creative Scrapbook |
| `explorations/v2-homepage/concept-c-studio.html` | Concept C: Interactive Engineering Studio |
| `explorations/v2-homepage/make-photos.ps1` | Regenerates the prototype photo copies from the local originals |
| `explorations/v2-homepage/.gitignore` | Keeps `photos/` and `screenshots/` out of Git |

**Photos:** seven resized copies (1400 px on the long edge, about 160–370 KB each) are written
to `explorations/v2-homepage/photos/`, which is git-ignored. They are cropped to remove
brands and clutter flagged in the inventory, and they contain no GPS or camera metadata. The
originals were only read. Inventory numbers used: #5, #14, #20, #24, #25, #27, #28.

**Fonts** load from Google Fonts, so the prototypes need an internet connection to look as
intended. Offline, they fall back to system fonts.

### Shared across all three (by design, so the comparison is fair)

- The same content, taken from the current site (`frontend/src/App.tsx`) and the résumé PDF. No new accomplishments, metrics or employers.
- Engineering identity first: name, role, headline, résumé and email are in the first viewport, and **no photograph appears in the first viewport** of any concept (progressive personality reveal).
- Section order follows DESIGN.md section C: introduction, how I work, experience, selected work, AI-assisted development, personal, contact.
- Skip link, plain navigation labels, visible focus styles, a prototype banner linking back to the index.
- Scroll reveal: sections fade in as they enter the viewport. It's switched off for `prefers-reduced-motion`, without JavaScript, and with `?static` in the URL. Content is never hidden from people who don't scroll-trigger it.
- Placeholders, clearly labeled: LinkedIn URL (not in the repo), case-study outcomes, and photo notes where a dish isn't confirmed.

**New draft copy to review:** section headings and photo captions that don't exist on the
current site were written for the prototypes, for example "Useful context beats a clever
prompt" (A), "What must AI know, and where should it live?" (B), "I follow the problem
wherever it goes" as a headline (C, adapted from the current site) and all photo captions.
Treat them as placeholders for Betsy's voice.

---

## 2. The concepts

### Concept A: Colorful Editorial

Magazine-like. A huge serif headline ("I think *beyond* the code in front of me.") with a
saffron highlight, a teal "At a glance" panel, and a tomato-red contents strip that doubles as
in-page navigation. Sections are numbered 01–05 with large italic numerals, drop caps and heavy
rules. Personality builds in steps: a full-bleed photo interlude after Experience, then a
plum AI spread, then an "Off the clock" section with three photos and an interests list.

- **Palette (experimental):** warm paper, near-black ink, tomato, saffron, teal, plum.
- **Type (experimental):** Fraunces (display serif), Instrument Sans (body).
- **Interaction:** none beyond navigation and scroll reveal. The color and type do the work.
- **Photos:** 3 (#20 interlude; #24, #25, #28 in the personal section).

| Strengths | Weaknesses and risks |
|---|---|
| The fastest scan for recruiters: strong hierarchy, clear numbered sections, the contents strip shows the whole page at once | Least interactive; personality relies on art direction rather than discovery |
| Most "confident" and polished; typography alone makes the first viewport colorful without photos | Large serif display type plus food photos edges toward a lifestyle-magazine feel if photos grow |
| Photography is easy to control: one interlude, one personal section | The giant headline costs vertical space on mobile; the first viewport on a phone shows mostly headline |
| Fewest moving parts to build and maintain | Drop caps and heavy rules are a strong style commitment |

### Concept B: Creative Scrapbook

Personal and tactile. A dot-grid paper background, a main "sheet" with a hard offset shadow
for the introduction, and taped index cards for quick facts and current role. Strengths are
colored notes, experience is a notebook page with date stamps, case studies are folders with
tabs, and the AI section uses sticky notes. Photos arrive as slightly rotated prints that can
be flipped (a real button) to show a short note. A Magic 8-Ball Easter egg in the footer opens
a native `<dialog>` using the current site's fallback reasons, with no backend call.

- **Palette (experimental):** off-white paper, deep ink, cobalt (actions), coral, mustard, mint, pink, sky.
- **Type (experimental):** Bricolage Grotesque (display), Atkinson Hyperlegible (body), Caveat (handwritten captions only).
- **Interaction:** flip-a-print toggles (`aria-expanded`), 8-Ball dialog.
- **Photos:** 5 (#27, #25, #28, #5, #14).

| Strengths | Weaknesses and risks |
|---|---|
| The most personal and memorable; feels made by a person, not a template | Highest risk of feeling cluttered or "cute" if more stickers, tapes or rotations creep in |
| Professional content stays on straight, unrotated surfaces, so reading isn't affected | Rotation, tape and shadows all need careful restraint at every breakpoint |
| The 8-Ball fits naturally here as an optional, keyboard-operable Easter egg | Handwritten font is decorative and must never carry essential information (it doesn't here) |
| Body font chosen for legibility | Scrapbook aesthetics are common in creative portfolios; the details have to stay specific to Betsy to avoid looking generic |

### Concept C: Interactive Engineering Studio

Technical but not terminal-like. A deep indigo hero with the name, the headline "I follow the
problem wherever it goes" and an **interactive system-layer explorer**: eight layers (User
through Observability, from the current site's system map) as an ARIA tab list with
arrow-key support. Each layer shows real résumé-backed examples. Below, light sections hang
off a vertical "signal rail" with numbered nodes; experience is drawn to scale by date;
case studies use native `<details>` disclosure. Photography arrives as a three-stage
"pipeline" (assemble → steam → serve) in an "Off-call" section.

- **Palette (experimental):** deep indigo, warm paper, lime, coral, sky, lilac.
- **Type (experimental):** Familjen Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (labels only).
- **Interaction:** layer explorer (tabs), case-study disclosure, staged photo reveal.
- **Photos:** 4 (#27, #25, #24, #14).

| Strengths | Weaknesses and risks |
|---|---|
| The interaction has a job: it lets a hiring manager explore skills by layer, with evidence, which directly supports DESIGN.md's "show evidence, not adjectives" | Most complex to build, test and keep accurate; every layer entry must stay in sync with the résumé |
| Most clearly "engineer"; strong technical storytelling (trace, rail, to-scale timeline) | A dark hero plus monospace labels can drift toward a generic developer-portfolio look if pushed further |
| The pipeline frames cooking as process, which connects personality to how Betsy works | Stage 3 uses a different dish (no finished-tamales photo exists); flagged in the prototype |
| The explorer works as a compact skills summary on mobile too | Content inside tabs is hidden until selected; essential facts must also appear elsewhere (they do, in Experience) |

---

## 3. Side by side

| | A · Editorial | B · Scrapbook | C · Studio |
|---|---|---|---|
| First viewport | Typography and color blocks | Paper sheet and taped cards | Dark hero and layer explorer |
| Where photos start | Interlude after Experience | Personal section | Personal section |
| Photo treatment | Full-bleed band, then an editorial grid | Rotated prints with flippable notes | Uniform cards in a 3-step pipeline |
| Main interaction | Navigation only | Flip a print; 8-Ball | Layer explorer (tabs) |
| Recruiter scan speed (judgment) | Fastest | Medium | Medium–fast |
| Personality (judgment) | Medium | Highest | Medium |
| Build and maintenance effort (judgment) | Lowest | Medium | Highest |
| Restaurant/food-blog risk (judgment) | Medium if photos grow | Low–medium (photos read as personal prints) | Lowest (photos framed as process) |

Rows marked "judgment" are subjective assessments, not measurements.

---

## 4. Accessibility and performance notes

**Checked:**

- Contrast for the main text/background pairs in each palette was calculated with the WCAG formula. All checked pairs meet AA for their use. The lowest is white on tomato in Concept A (4.51:1, used for the contents strip and contact section). Large display text in tomato on paper (4.16:1) is only used at large sizes, where 3:1 applies.
- Desktop (1440 px) and phone (390 px) layouts were rendered with headless Microsoft Edge and inspected visually. No horizontal overflow at 390 px. Two layout bugs were found and fixed: Concept B's experience bullets collapsed into a narrow column, and Concept C's content sat outside the `<main>` landmark.

**Built in but not verified with assistive technology:**

- Skip link, landmarks, one `h1`, ordered headings, visible `:focus-visible` styles, 44–48 px primary targets.
- Concept C's tabs follow the WAI-ARIA tabs pattern (roving `tabindex`, arrow keys, Home/End).
- Concept B's flip buttons use `aria-expanded`/`aria-controls`; the 8-Ball uses native `<dialog>` (Escape closes it, focus moves in and returns).
- Photos that carry meaning have descriptive alt text.
- Images have `width`/`height` to reserve space and lazy-load below the first view.

**Not production-ready:** images are single-size JPEGs (no responsive `srcset` or modern
formats), fonts come from a third-party CDN, and the CSS isn't shared or tokenized.

---

## 5. Open questions for review

1. Which concept, or which combination of elements, best fits? (For example: A's typography and hierarchy, C's layer explorer, B's personal section.)
2. How much interaction feels right for a recruiter's first visit?
3. Is the photo placement gradual enough, or too late? Concept A introduces a photo earliest.
4. Does the draft copy (section 1) sound like Betsy?
5. Should the Magic 8-Ball survive, and in which concept's style?
6. Confirm the LinkedIn URL and the dish in photo #5 (inventory question 3).

After a direction is chosen, record it in DESIGN.md (sections D and I and the decision log)
before any production work.
