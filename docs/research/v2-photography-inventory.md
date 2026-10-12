# v2.0 Photography Inventory

- **Date:** 2026-10-09
- **Status:** Research snapshot. Nothing in this document is an approved design decision. Approved photography rules live in [DESIGN.md](../../DESIGN.md), section E.
- **Builds on:** [DESIGN.md](../../DESIGN.md) (sections D, E, F, G) and [v2-documentation-strategy.md](v2-documentation-strategy.md)
- **Source:** Local photography collection (29 files)

**Legend:** **Verified** means read from the file itself (file system or embedded metadata). **Observed** means seen in a visual inspection of the image. **Recommendation** means a subjective judgment for design exploration.

---

## 1. Purpose and scope

DESIGN.md section E lists a photo inventory as **content needed** before design exploration picks
specific images. This document provides that inventory and evaluates the collection for the
approved v2 direction: a colorful, expressive and warm engineering portfolio that uses Betsy's
own cooking photography throughout, without resembling a restaurant site, recipe blog or food
delivery app.

**In scope:** file properties, subject identification, visual qualities, privacy flags, a
curated shortlist and exploratory integration concepts.

**Out of scope:** final palette, typography, layout, motion, production image assets, mockups
and any change to the originals.

### Method and limitations

- File properties and EXIF tags were read with Windows PowerShell's built-in `System.Drawing`
  library. No software was installed.
- Each photo was inspected visually through a temporary 900 px preview, kept outside the
  repository. Previews were corrected for EXIF rotation, so the orientations below are as
  displayed. Fine detail, such as sharpness at full resolution and small background text, was
  not checked at full size.
- For GPS, only the **presence** of coordinate tags was checked. No coordinate values were
  read or recorded.
- XMP/IPTC metadata and Google Photos JSON sidecar files were not checked. No sidecar files are
  in the collection.
- Dish names come from visual inspection. Filenames were treated as hints only.
- Sizes use 1 MB = 1,048,576 bytes.

---

## 2. Collection summary

### Verified

| Property | Finding |
|---|---|
| Files | 29, all JPEG |
| Total size | About 131 MB (0.66–9.37 MB per file, typically 3.5–5.5 MB) |
| Resolution | 28 files at 12 MP (4000×3000 or 3000×4000); 1 file at 1079×839 |
| Orientation (as displayed) | 17 landscape, 12 portrait, 0 square |
| EXIF rotation | 12 portrait files are stored as landscape pixels with a rotate-90° tag; 1 file is stored upside down (rotate-180° tag). Any processing step must honor EXIF orientation. |
| Camera | 28 files from one phone model; 1 file has no camera EXIF (likely a screenshot or edited export) |
| Capture dates | 2024-10 to 2026-08 |
| GPS coordinates | **Present in 28 of 29 files** (all except `Chorizo_Tacos.jpg`) |

### Observed

- **Subjects:** mostly Mexican and Mexican-American home cooking (tamales, enchiladas, tacos, caldo, sopa, picadillo), plus weeknight plates (steak bites, salmon, chicken) and baking (muffins, cookies, brownies, a heart-shaped cake, a football-shaped pull-apart bread).
- **Process content:** four photos follow one tamale batch from prep to steaming, and two document batch meal prep. This "process" material is unusual and useful for an engineering portfolio.
- **One photo shows an identifiable person** (section 6).
- **Lighting:** mostly warm indoor evening light. A few are in daylight (bake sale, meal prep overhead, Red Enchiladas, Taco Plate). White balance varies across the set.
- **Backgrounds:** two recurring settings, a dark matte tabletop and a granite counter or stovetop. The dark tabletop shots are the cleanest. Many counter and stovetop shots include kitchen clutter, brand labels or personal items.
- **Color:** warm and earthy overall (browns, golds, oranges), with accents of green (lettuce, cilantro, asparagus, peppers), red (sauces, peppers, flowers) and coral pink (cake). Cool tones are rare: a teal mixing bowl and a blue tray.
- **Style:** casual phone snapshots rather than styled food photography. This is an advantage against "stock food imagery" but means most photos need cropping.

---

## 3. Complete photography inventory

Rows are numbered alphabetically by original filename, case-insensitive. The same numbers are
used in every table. Original filenames are preserved exactly, including spaces and spelling.
Suggested filenames are recommendations only; no files were renamed.

### 3a. File properties (verified)

| # | Original filename | Format | Dimensions (W×H, as displayed) | Orientation | Size (MB) | GPS present |
|---|---|---|---|---|---|---|
| 1 | `20260823_200550.jpg` | JPEG | 3000×4000 | Portrait | 3.73 | Yes |
| 2 | `Bannana_Bread_muffins.jpg` | JPEG | 4000×3000 | Landscape | 5.23 | Yes |
| 3 | `beans_rice_meat_stove.jpg` | JPEG | 4000×3000 | Landscape (stored rotated 180°) | 5.00 | Yes |
| 4 | `beef_rice_salad_beans.jpg` | JPEG | 4000×3000 | Landscape | 9.37 | Yes |
| 5 | `Califlour_nuggets.jpg` | JPEG | 4000×3000 | Landscape | 4.63 | Yes |
| 6 | `Carrot_muffins.jpg` | JPEG | 4000×3000 | Landscape | 4.94 | Yes |
| 7 | `Chicken_Rice.jpg` | JPEG | 4000×3000 | Landscape | 4.85 | Yes |
| 8 | `Chorizo_Tacos.jpg` | JPEG | 1079×839 | Landscape | 0.66 | No |
| 9 | `Enchiladas_2.jpg` | JPEG | 3000×4000 | Portrait | 4.10 | Yes |
| 10 | `flab_tres_leches_sale.jpg` | JPEG | 3000×4000 | Portrait | 3.49 | Yes |
| 11 | `Flan_tres_leches sale.jpg` | JPEG | 4000×3000 | Landscape | 4.74 | Yes |
| 12 | `Football_garlic_pull_out_bread.jpg` | JPEG | 4000×3000 | Landscape | 4.10 | Yes |
| 13 | `Meal_prep_bannana_bread_rice_beef_mix.jpg` | JPEG | 3000×4000 | Portrait | 5.53 | Yes |
| 14 | `Meal_prep_beef_potatoes_peppers_rice.jpg` | JPEG | 4000×3000 | Landscape | 5.07 | Yes |
| 15 | `Mexican_chicken_soup.jpg` | JPEG | 3000×4000 | Portrait | 3.96 | Yes |
| 16 | `Post_tamale_assembling.jpg` | JPEG | 3000×4000 | Portrait | 5.63 | Yes |
| 17 | `Pre_tamale_asembly.jpg` | JPEG | 3000×4000 | Portrait | 5.39 | Yes |
| 18 | `Red_Enchiladas.jpg` | JPEG | 4000×3000 | Landscape | 4.30 | Yes |
| 19 | `Salmon_mashpotatoes_veggies.jpg` | JPEG | 3000×4000 | Portrait | 4.42 | Yes |
| 20 | `Steak_bites.jpg` | JPEG | 4000×3000 | Landscape | 4.20 | Yes |
| 21 | `Steak_bites_with_red_wine.jpg` | JPEG | 3000×4000 | Portrait | 3.87 | Yes |
| 22 | `Sweet_Potatoe_Brownies.jpg` | JPEG | 4000×3000 | Landscape | 4.81 | Yes |
| 23 | `Taco_Plate_Rice_beans_avocado.jpg` | JPEG | 3000×4000 | Portrait | 4.36 | Yes |
| 24 | `taco_soup_mexican.jpg` | JPEG | 4000×3000 | Landscape | 3.23 | Yes |
| 25 | `Tamales_in_pot.jpg` | JPEG | 4000×3000 | Landscape | 3.48 | Yes |
| 26 | `Tamales_making.jpg` | JPEG | 4000×3000 | Landscape | 4.19 | Yes |
| 27 | `Tamales_making_2.jpg` | JPEG | 4000×3000 | Landscape | 4.77 | Yes |
| 28 | `Valentines_Cake.jpg` | JPEG | 3000×4000 | Portrait | 3.34 | Yes |
| 29 | `Vegab_Chocolatechip_cookies.jpg` | JPEG | 3000×4000 | Portrait | 5.55 | Yes |

### 3b. Subject and suggested filename (observed)

**Subject confidence:** **High** means the dish is clearly identifiable. **Medium** means the
food type is clear but a detail can't be confirmed visually, such as a hidden ingredient.
**Low** means uncertain. No photo was unverified; all 29 were inspected.

| # | Subject (observed) | Confidence | Filename accurate? | Suggested filename |
|---|---|---|---|---|
| 1 | Shepherd's pie (or cottage pie): browned mashed-potato top with parsley over a ground-meat layer, in a round glass dish | Medium | No description | `shepherds-pie-glass-dish.jpg` |
| 2 | Muffins in a steel tin with red paper liners, half removed; banana flavor not visually confirmable | Medium | Mostly (misspelled "Bannana") | `banana-bread-muffins-in-tin.jpg` |
| 3 | Stovetop spread: refried beans, red rice with sausage pieces, grilled steak on a griddle, foil-wrapped tortillas | High | Yes | `stovetop-rice-beans-grilled-steak.jpg` |
| 4 | Plate of ground beef with potatoes and carrots (picadillo style), white rice with mixed vegetables, refried beans, shredded lettuce | High | Yes | `picadillo-rice-beans-lettuce-plate.jpg` |
| 5 | Breaded, baked bite-size pieces around a cup of marinara; cauliflower is plausible but not confirmable | Medium | Partly (misspelled "Califlour") | `breaded-cauliflower-bites-marinara.jpg` |
| 6 | Twelve dark-crumbed muffins on a cooling rack; carrot not visually confirmable | Medium | Plausible | `carrot-muffins-cooling-rack.jpg` |
| 7 | Seared seasoned chicken in a sauce with carrots and potatoes, beside seasoned rice with peas and corn | High | Partly | `seared-chicken-stew-seasoned-rice.jpg` |
| 8 | Fried rolled tacos (taquitos or flautas) on a paper towel; filling looks like chorizo and potato | Medium | Plausible ("tacos" is loose) | `rolled-tacos-chorizo-potato.jpg` |
| 9 | Fried, folded tortillas in red sauce topped with lettuce, crema and crumbled cheese (enchilada style) | Medium | Plausible | `enchiladas-lettuce-crema-cheese.jpg` |
| 10 | Smiling adult behind a sale table of flan and tres leches with handwritten price signs | High (food and setting) | Partly (misspelled "flab") | `bake-sale-flan-tres-leches-with-person.jpg` |
| 11 | The same sale table without the person: flan in clamshell boxes, tres leches in foil pans, price signs | High | Yes | `bake-sale-flan-tres-leches-table.jpg` |
| 12 | Football-shaped pull-apart garlic bread with cheese "laces", taquitos in a pan and a container, mashed potatoes in a heart-print bowl | High | Partly (it's pull-apart, and other dishes are present) | `football-pull-apart-bread-game-day-spread.jpg` |
| 13 | Overhead meal prep: picadillo and rice in pots, a dark quick-bread loaf on a rack, seven portioned glass containers | High (meal prep); Medium (banana bread) | Yes | `meal-prep-picadillo-rice-quick-bread-overhead.jpg` |
| 14 | Meal-prep containers of ground beef with potatoes, rice with corn, and sautéed peppers and onions | High | Yes | `meal-prep-beef-potatoes-peppers-rice.jpg` |
| 15 | Caldo de pollo: chicken drumstick, corn on the cob, zucchini and carrot in broth; a second bowl behind | High | Yes | `caldo-de-pollo-corn-zucchini.jpg` |
| 16 | Overhead after assembly: tray of husk-wrapped tamales, empty masa bowl and sauce pot, measuring baking mat | High | Yes | `tamales-assembled-overhead.jpg` |
| 17 | Before assembly: soaked corn husks, masa in a teal bowl, shredded meat in red chile sauce, baking mat, empty sheet pan | High | Yes (misspelled "asembly") | `tamale-prep-masa-filling-husks.jpg` |
| 18 | Red-sauce chicken enchiladas topped with lettuce, crema, crumbled cheese and tomato; mug in background | High | Yes | `red-chicken-enchiladas.jpg` |
| 19 | Pepper-crusted salmon fillet, mashed potatoes and roasted asparagus | High | Yes | `pepper-crusted-salmon-mashed-potatoes-asparagus.jpg` |
| 20 | Close-up of seared steak bites over mashed potatoes with pan sauce, roasted carrots and asparagus, garlic bread | High | Yes | `steak-bites-mashed-potatoes-close-up.jpg` |
| 21 | Same steak-bite dinner from above, with a mixed flower bouquet and a glass of red wine | High | Yes | `steak-bites-dinner-flowers-red-wine.jpg` |
| 22 | Chocolate-chip-topped brownies in a square glass dish; sweet potato not visually confirmable | Medium | Plausible (misspelled "Potatoe") | `chocolate-chip-brownies-glass-dish.jpg` |
| 23 | Ground beef tacos on corn tortillas, red rice, a light bean mound, roasted avocado halves | High (beans Medium) | Yes | `ground-beef-tacos-rice-beans-avocado.jpg` |
| 24 | Shell-pasta soup (sopa de conchitas style) with two rolled crispy tacos, cilantro and crumbled cheese | High | **No**: "taco soup" is a different dish | `shell-pasta-soup-with-rolled-tacos.jpg` |
| 25 | Tamales standing upright in a steamer pot, red chile filling visible | High | Yes | `tamales-in-steamer-pot.jpg` |
| 26 | Wide-angle tamale assembly: filling in a cast-iron skillet, tray of tamales, husks, masa, baking mat | High | Yes | `tamale-assembly-wide.jpg` |
| 27 | Closer view of the same assembly: tray of tamales, filling, husks, masa, one loose husk | High | Yes | `tamale-assembly-close.jpg` |
| 28 | Heart-shaped layer cake (red velvet crumbs) with white frosting, coral piped borders and "XOXO" in red | High | Yes | `heart-red-velvet-cake-xoxo.jpg` |
| 29 | Twelve chocolate chip cookies on parchment on a sheet pan; vegan not visually confirmable | Medium | Plausible (misspelled "Vegab") | `chocolate-chip-cookies-sheet-pan.jpg` |

### 3c. Visual characteristics, potential use and concerns

Visual characteristics are observed. Potential use is a **recommendation**. Concerns are
detailed in section 6.

| # | Lighting / composition / background / dominant colors | Potential use (recommendation) | Privacy or quality concerns |
|---|---|---|---|
| 1 | Warm evening light; side view; cluttered shelf and tools behind; cream, gold, dark brown | Limited; possible personal-story detail if tightly cropped | Cluttered background |
| 2 | Bright daylight; low angle across the tin; steel, tan, red liners | Texture or detail accent; empty cups could play into an "in progress" idea | Red oven mitt and pot in frame |
| 3 | Warm tungsten; wide stovetop view; outlet, appliances, granite; gold rice, brown meat, tan beans | Personal storytelling ("cooking for a crowd") | Visible olive-oil brand label |
| 4 | Warm light; three-quarter angle on a white bowl; granite; green, white, brown, orange | Secondary storytelling; crops well to the plate | Paper towel at edge |
| 5 | Even light; centered on a white plate on a dark surface; strong red center ringed by gold | **Strong.** A circular, graphic composition for an Easter egg or a round crop | None noted |
| 6 | Dim warm light; wide counter view; supplements, figurine, matcha whisk, outlet; brown, beige | Low priority | Supplement bottle labels (personal health items), personal objects |
| 7 | Warm light; close plate on a dark surface; golden brown, orange, yellow and green accents | Good accent; crops flexibly | Slight sauce smears on the plate rim |
| 8 | Warm; tight framing; paper towel and appliances; golden orange | Low priority | **Low resolution** (1079×839), black bar along the bottom edge, no camera EXIF |
| 9 | Dim warm light; portrait plate with a large juice jug behind; green, cream, orange-red | Low priority | **Prominent Tropicana branding** behind the dish |
| 10 | Bright daylight; person centered behind the table; gray wall, plaid tablecloth; embroidered dress in magenta, blue and yellow | Potentially the strongest personal-story image, **only if the person consents** | **Identifiable person**; a second person's hand at the right edge; price signs suggest a food business |
| 11 | Bright daylight; table-level view; plaid, clear clamshells, blue tray, caramel | Personal story (community or fundraiser, if that's the context) | Price signs; possible partial figure at the top-right edge |
| 12 | Warm light; wide stovetop spread; golden bread, coral container, pink heart bowl | Personal storytelling ("game day"); colorful but busy | Busy background, jars, outlets |
| 13 | Even daylight; **overhead grid** of containers on a gray counter; gold, orange, green, pastel lids | **Strong** for an engineering metaphor (batching, modular units); crop to the containers | Sports-team garment at the right edge; wire rack and floor at the left |
| 14 | Warm light; low diagonal across rows of black containers; vivid red, orange and yellow peppers | **Strong** color and repetition | Black takeout-style containers can read as food delivery |
| 15 | Warm light; portrait, two bowls on a dark surface; yellow corn, orange carrot, green zucchini, golden broth | **Strong** portrait (mobile) candidate after cropping out the bag | Cilantro packaging with brand and distributor text |
| 16 | Daylight; overhead; red-ruled baking mat, teal bowl, green colander, husks | Process sequence ("after") | Sports-team garment; brand name on the baking mat |
| 17 | Daylight; high angle; baking mat, teal bowl, green bowl of husks, red chile filling | Process sequence ("before") | Sports-team garment, small toys, cluttered right side |
| 18 | Daylight; three-quarter plate on a dark surface; green lettuce, red-brown sauce, blue mug | Secondary storytelling | "Dog mom" mug (fine, but personal); partial printed text at the top right should be checked at full size |
| 19 | Warm light; portrait plate on a dark surface; deep brown crust, white, bright green | Good portrait accent | Slightly tilted framing; container in top corner |
| 20 | Warm light; **tight close-up**, fills the frame; deep browns, cream, orange, green | **Strong** full-bleed or cropped texture image; little background to remove | None noted |
| 21 | Dim warm light; portrait; bouquet in red, magenta and yellow, wine glass, shelf behind | Personal storytelling (a celebratory dinner) after a heavy crop | Alcohol; glass printed with a well-known cartoon character; religious book and toiletries on the shelf |
| 22 | Warm light; glass dish on a rack; granite; chocolate brown | Low priority (monochrome) | Branded soda cup and a small figurine in the background |
| 23 | Mixed daylight; portrait plate; window, floor and blender behind; green avocado, gold rice | Secondary; usable cropped | Background shows home interior and window |
| 24 | Even warm light; **centered bowl on a clean dark surface**; orange broth, bright green cilantro, golden taquitos | **Strong** hero or accent candidate; the cleanest background in the set | None noted |
| 25 | Even light; high angle into the steamer; stove, floral mitt, wall; silver, golden husks, red filling | Process sequence ("steaming" or "shipping") | Branded instant-noodle boxes in the corner; a different kitchen from most photos |
| 26 | Indoor light; **wide-angle distortion**; skillet, tray, husks, masa, papers in the background | Superseded by #27 | Papers or documents at the top right should be checked at full size; skillet brand visible |
| 27 | Indoor light; closer, cleaner version of #26; golden husks, red-ruled mat, dark skillet | **Strong** process image ("assembly line") | Brand name on the baking mat |
| 28 | Dim light; portrait close-up; white frosting, coral piping, red "XOXO" | **Strong** color moment; Easter-egg candidate | Shelf of toiletries and a tumbler with printed images (possibly of people) behind; crop needed |
| 29 | Daylight; overhead-ish; parchment, sheet pan, wood floor | Low-to-medium; repetition could suit a "batch" idea | Bin and floor at the edges |

---

## 4. Recommended photographs for initial exploration

**All recommendations.** These ten photos give the first exploration a varied, colorful set
that has both finished dishes and process images. They are a starting point, not a final
selection.

| # | Photo (suggested name) | Why | Candidate role |
|---|---|---|---|
| 24 | `shell-pasta-soup-with-rolled-tacos` | Cleanest background, centered subject, warm orange with a strong green accent, flexible crop | Homepage introduction, landscape |
| 15 | `caldo-de-pollo-corn-zucchini` | Bright yellow, orange and green; portrait shape suits phones | Homepage introduction on mobile (art-directed pair with #24) |
| 20 | `steak-bites-mashed-potatoes-close-up` | Fills the frame with texture and rich color; almost no background to remove | Background accent or full-bleed band between sections |
| 5 | `breaded-cauliflower-bites-marinara` | Circular, graphic layout with a red center | Easter egg (a round "reveal") or round crop |
| 28 | `heart-red-velvet-cake-xoxo` | The set's main pink/coral moment; playful but crafted | Easter egg or personal-interest moment |
| 17, 27, 25 | Tamale prep → assembly → steaming | A real start-to-finish process, rare in portfolios | Transitions between engineering sections; "how I work" storytelling |
| 13 | `meal-prep-picadillo-rice-quick-bread-overhead` | Overhead grid of repeated units; reads as "planning and batching" | Engineering-process accent (planning, repeatability) |
| 14 | `meal-prep-beef-potatoes-peppers-rice` | The most vivid color in the set; strong repetition | Section transition; accent strip |

**Conditional (needs Betsy's decision first):**

- **#10 `bake-sale-flan-tres-leches-with-person`:** the only photo with a person. It would be a strong personal-storytelling image if the person is Betsy and she wants to appear. The price signs and the second person's hand need review (section 6).
- **#21 `steak-bites-dinner-flowers-red-wine`:** the bouquet adds a lot of color, but the photo needs a heavy crop, and the alcohol and background items should be a conscious choice.

**Deliberately not shortlisted:** low resolution (#8), dominant branding (#9), mostly monochrome
(#22), cluttered or personal backgrounds (#1, #6, #26), and images that duplicate stronger ones.

### Notes on the curated set

- **Variety:** finished plates, close-ups, overheads and process, plus sweet and savory.
- **Orientation:** five landscape and five portrait in the main list, enough to art-direct desktop and mobile versions.
- **Consistency:** the set mixes warm tungsten and daylight. A shared treatment, such as a consistent color grade, crop ratio or framing, would help it read as one visual voice (DESIGN.md section E). The treatment itself is undecided.
- **Food-media risk:** #14's black containers and #11's price signs can read as food delivery or a bakery. Crop and context would need to steer them away from that.

---

## 5. Photography integration concepts

**Exploratory only.** None of these is approved. Each avoids choosing a palette, typography,
layout framework or animation style.

### Concept A: "Process, not plating"

Photos show cooking as a **process** that mirrors engineering work. The tamale sequence
(prep → assembly → steaming) and the meal-prep shots appear as image bands between engineering
sections, each paired in secondary text with a working habit (for example, preparation before
implementation, or batching repeatable work). One optional interaction could swap a case
study's photo between "in progress" and "finished".

- **Interaction with engineering content:** photos sit between sections as transitions and never inside the reading column. Each pairing points to a real engineering example on the page.
- **Treatments:** consistent wide crops in transition bands; tight crops of hands-on detail (masa, husks, containers).
- **Recruiter usability:** headings and section content are unchanged; photos only mark section boundaries. With the photos removed, the page reads exactly the same (DESIGN.md principle 1).
- **Strengths:** uses the collection's rarest material (process photos); ties personality to how Betsy works, not just what she eats.
- **Trade-offs:** the metaphor can wear thin if every section has one. Only six process photos exist, so this approach may need more process shots.
- **Accessibility and performance:** decorative bands use empty alt text; any photo that carries a story gets descriptive alt text. Bands load lazily below the first view, reserve their space, and become one smaller image on mobile. Any photo swap is a button and respects reduced motion.

### Concept B: "Color from the kitchen"

Each major section gets one **close-up anchor photo** whose dominant colors lead that section's
accent moment: the orange and green of the soup in the introduction, the coral of the cake in
personal interests, the peppers in projects. Photos appear as large, tightly cropped panels
beside the content, not behind it.

- **Interaction with engineering content:** photos sit beside text in a split arrangement that stacks on mobile. Text never sits on top of a photo.
- **Treatments:** tight, texture-filling crops (steak, peppers, frosting, corn), which the dark-background photos support well. Exploring palettes sampled from the photos is optional; picking one is not part of this concept.
- **Recruiter usability:** the reading column stays plain and high-contrast; the photo is the "loud" half of the layout and the text the "calm" half (DESIGN.md section D).
- **Strengths:** the most colorful and distinctive approach; the photos carry the warmth instead of decorative gradients.
- **Trade-offs:** a large food photo in every section risks a recipe-blog feel. Each section's accent must be checked for AA contrast independently. Needs strong crops, which rules out several photos.
- **Accessibility and performance:** large images are the biggest cost. They need responsive sizes, modern formats and lazy loading below the first view, and the first-view photo must be small enough not to slow the initial load. Color is never the only signal.

### Concept C: "Kitchen table"

Small clusters of photos, arranged like prints on a counter with slight overlaps and varied
sizes, appear at a few chosen points: the introduction, the personal section and the footer.
Easter eggs live here. For example, a photo could flip over to reveal a short note about the
dish (keyboard-operable and optional), or the round nuggets image could host a reimagined
8-Ball.

- **Interaction with engineering content:** clusters appear only at the start, middle and end, while engineering sections stay photo-light. It's the most personal approach and the least integrated with the engineering content.
- **Treatments:** mixed sizes and crops, a shared border or framing treatment, and occasional overlaps.
- **Recruiter usability:** the clusters are self-contained and skippable, and the professional content isn't interrupted.
- **Strengths:** expressive and handmade-feeling; uses more of the collection, including weaker photos at small sizes; a natural home for Easter eggs.
- **Trade-offs:** collages drift toward clutter and "scrapbook" quickly (DESIGN.md section D's avoid list). Overlaps are hard to make responsive and focusable. It does less to connect cooking to engineering.
- **Accessibility and performance:** overlapping interactive items need a clear focus order and focus visibility (WCAG 2.4.11). Flip interactions need a no-motion alternative. Many small images mean many requests, so thumbnails should be sized for display.

**Possible combination:** Concept A for transitions, B's anchor approach for the introduction
only, and C limited to the personal section. This is a hypothesis to test in exploration, not
a recommendation to adopt.

---

## 6. Privacy and quality considerations

### Privacy (flag for review before publication)

| Concern | Affected photos | Recommended action |
|---|---|---|
| **Embedded GPS coordinates** | 28 of 29 (all except #8) | Strip all location metadata from every published derivative. This is likely home-location data. Values were not read or recorded here. |
| **Originals inside the repository** | Whole collection | The `originals/` folder is inside this repo, untracked and **not** in `.gitignore`. A broad `git add` would publish about 131 MB of photos with GPS data. Decide whether to move the folder outside the repo or ignore it (needs Betsy's approval; no change was made). |
| **Identifiable person** | #10 (and a second person's hand at the right edge) | Confirm who is pictured and that they consent. Crop out the second person. |
| **Possible partial person** | #11 (top-right edge) | Check at full size; crop if needed. |
| **Home interior** | Most counter and stovetop photos; #23 shows a window and floor | Generally low risk, but avoid wide shots that show the layout or window views. |
| **Different location** | #25 (and likely #26–27) shows a different kitchen from most of the set | Confirm it's fine to publish (for example, a family member's home). |
| **Possible legible text** | #18 (printed text top right), #26 (papers top right), #28 (tumbler with printed images) | Check at full size before using; crop. |
| **Personal items** | #6 (supplement bottles), #21 (religious book, toiletries), #28 (toiletries), #18 (mug) | Crop unless Betsy chooses to show them. |
| **Food sales** | #10, #11 (price signs) | Showing food for sale may suggest a food business; decide whether that story is wanted. |

### Brand and content considerations

- **Visible brands or trademarks:** #9 (juice jug, prominent), #3 (olive oil), #15 (cilantro packaging with distributor text), #21 (cartoon-character glass), #22 (soda cup), #25 (noodle boxes), #16/#17/#26/#27 (baking-mat brand), #26/#27 (skillet brand), #13/#16/#17 (sports-team garment). Crop these out of published images where possible.
- **Alcohol:** #21 (red wine). A judgment call for a professional context.

### Quality

| Issue | Photos |
|---|---|
| Low resolution (1079×839), black bar along the bottom, no camera EXIF | #8 |
| Wide-angle distortion | #26 (use #27 instead) |
| Tilted framing | #19 |
| Cluttered backgrounds needing heavy crops | #1, #6, #12, #21, #22, #28 |
| Mixed white balance across the set | Collection-wide; a consistent treatment would help |
| Large source files (up to 9.37 MB, 12 MP) | All. Originals aren't web-ready: every published image needs resizing, compression, modern formats, multiple sizes, metadata stripping and baked-in EXIF rotation (12 portrait files and #3 rely on rotation tags). |

---

## 7. Open questions and next steps

### Open questions for Betsy

1. **#10:** Is the person you? Are you comfortable appearing on the site? Is the second person's consent needed, or should they be cropped out?
2. **Originals location:** Should `originals/` move outside the repo or be added to `.gitignore` so the photos and their GPS data are never committed?
3. **Medium-confidence dishes:** please confirm #1 (shepherd's pie?), #2 (banana?), #5 (cauliflower?), #6 (carrot?), #8 (chorizo?), #9 (dish name), #13 (banana bread loaf?), #22 (sweet potato?) and #29 (vegan?). This matters for accurate alt text.
4. **Stories:** do any photos carry a story you'd like to tell? For example, the bake sale (fundraiser or side project?), the game-day spread, the Valentine's cake, or the tamale batch (a family tradition?).
5. **Comfort level:** alcohol (#21), visible brands, the bake-sale price signs and a second kitchen (#25–27).
6. **Gaps:** would you take a few new photos for exploration? Useful gaps are hands at work (process with a human element), daylight, clean backgrounds and a few cooler tones to balance the warm set.
7. **Is this the complete collection** for v2, or will more photos be added?

### Next steps (proposed)

1. Betsy answers the questions above, especially the privacy items.
2. Decide where the originals live, so they can't be committed with GPS data.
3. Design exploration (DESIGN.md section H) uses the section 4 shortlist to prototype one or more of the concepts in section 5, outside production code.
4. After a direction is approved, record photo decisions in DESIGN.md (open decision 8, "Photography") and, if the reasoning needs space, a decision record covering the image pipeline: sizes, formats, metadata stripping, EXIF rotation and where processed assets live.
5. Write alt text for any photo that carries meaning once subjects are confirmed.
