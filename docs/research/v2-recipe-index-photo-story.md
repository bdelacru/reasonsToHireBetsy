# v2.0 Recipe-Index Prototype: Photo Story Proposal

- **Date:** 2026-10-11
- **Status:** Proposal awaiting Betsy's approval. Nothing here is implemented or approved. Approved photography rules live in [DESIGN.md](../../DESIGN.md), section E.
- **Applies to:** the isolated prototype `explorations/v2-recipe-index/` only.
- **Builds on:** [v2-photography-inventory.md](v2-photography-inventory.md). Three of the photos below (`cooking_prep*.jpg`) and both tres leches photos were added after that inventory was written.

**Legend:** **Verified** means read from the file or measured in the prototype. **Observed** means seen in the photo or a screenshot. **Recommendation** is a judgment for review.

---

## 1. Current photo-to-page mapping (verified)

| Page | Photo used now | Original | Shape | Notes |
|---|---|---|---|---|
| Home | Empty bowls, digital scale, flour and sugar | `cooking_prep.jpg` (1740×1305) | Landscape | Carries the note "Good engineering starts with preparation.", pinned to the scale. |
| Experience | Flour, meringue and batter in three bowls | `cooking_prep_3.jpg` (1740×1305) | Landscape | |
| Projects | Baked sponge in a glass dish, bowl of milk mixture and whisk | `TresLechesSpongeMilk.jpg` (1079×1755) | Portrait | |
| AI & Learning | Separated whites and yolks, flour with a whisk, recipe card | `cooking_prep_2.jpg` (979×1305) | Portrait | The copy is cropped to 84% width to remove personal items. |
| About | Bake-sale table: flan and tres leches (default) | `Flan_tres_leches sale.jpg` (4000×3000) | Landscape | |
| About (option) | Betsy behind the sale table | `flab_tres_leches_sale.jpg` (3000×4000) | Portrait | Shown with `?about=portrait`. |

**Unused:** `TresLechsForkCake.jpg` (3000×4000, portrait, verified). It shows the baked sponge with its whole surface poked in neat rows of fork holes, in a glass dish on a dark surface.

### When the photos were taken (verified from the camera's date tags)

| Time | Photo | Step |
|---|---|---|
| 2026-02-07 22:03 | `cooking_prep.jpg` | Setup: empty bowls, scale |
| 2026-02-07 22:33 | `cooking_prep_2.jpg` | Eggs separated, flour measured |
| 2026-02-07 23:02 | `cooking_prep_3.jpg` | Flour, whipped whites and batter |
| 2026-02-08 00:05 | `TresLechsForkCake.jpg` | Sponge baked and poked all over |
| no date tag | `TresLechesSpongeMilk.jpg` | Sponge baked, milk mixture ready, a few holes started |
| (separate occasion) | bake-sale photos | Finished cakes, shared |

**Observed:** the first four photos are one evening's bake on the same dark tabletop. `TresLechesSpongeMilk.jpg` has no date tag (its 1079 px width suggests a shared or messaging copy). Its counter is wood, its dish is different and the sponge is paler, so it's **probably a different bake**. Visitors won't notice, but the story shouldn't claim one batch.

## 2. The storytelling problem with the current order

The tabs are fixed: Home → Experience → Projects → AI & Learning → About. The current mapping has two problems:

1. **Time runs backwards.** The steps by page are 1 (setup) → 3 (mixed) → 4 (baked) → **2 (eggs separated)** → 6 (shared). AI & Learning jumps back to raw eggs after Projects has already shown a finished cake. It reads as "learning happens before building", which is the opposite of what the AI page says.
2. **Experience loses its best detail on desktop (observed).** The heading is "Seven years, three very different engineering environments", and the photo has three bowls. The tall desktop column shows only two of them, and wood floor fills the top quarter. The phone layout does show all three.

**The fix doesn't need a new order.** In a real tres leches, the bake isn't the end. After it comes out of the oven, you poke holes in it and it soaks up the milk. That's the step after the result, so AI & Learning can come after Projects and mean "keep testing and keep learning after shipping", rather than "start over".

## 3. Recommended five-page sequence (recommendation)

Option A follows the tabs and the real timeline in order, with each photo tied to its page's message.

| Page | Photo | Engineering message it supports |
|---|---|---|
| Home | `cooking_prep.jpg`: empty bowls and scale (**no change**) | Preparation before implementation. The existing note stays. |
| Experience | `cooking_prep_2.jpg`: three bowls (flour, whites, yolks) stacked top to bottom, recipe card | Fundamentals done carefully and kept distinct: three separate components, as in "three very different engineering environments". It's a tall photo, so all three bowls fit the desktop column. |
| Projects | `TresLechesSpongeMilk.jpg`: baked sponge and milk mixture (**no change**) | Something built and solid, with the next part ready: work that holds up and is ready to integrate. |
| AI & Learning | `TresLechsForkCake.jpg`: sponge poked all over in even rows | Poking holes in the result, which echoes the page's own line: "AI output is a hypothesis until the real system verifies it." The holes are also how the cake absorbs the milk, the way continuous learning works. The neat rows read as systematic, not random. |
| About | `flab_tres_leches_sale.jpg`: Betsy behind the sale table (**switch the default to the portrait**) | The person behind the work, sharing what she made. It sits on the page titled "It isn't all of me", at the end of the site, which fits the approved progressive personality reveal. |

**What changes:** Experience and AI & Learning get new photos, and About defaults to the portrait (`?about=table` keeps the table photo available). `cooking_prep_3.jpg` (mixing bowls) and the table photo drop out of the default set.

**The progression a visitor feels:** set up → separate the parts → build it → test it and let it soak in → share it. That's a cooking process, not a recipe. No steps, quantities or instructions appear anywhere.

### Option B: the smallest change (fallback)

Keep Experience on `cooking_prep_3.jpg`. Only change AI & Learning to the fork-poked sponge, and drop `cooking_prep_2.jpg`.

| | Option A (recommended) | Option B |
|---|---|---|
| Timeline | 1 → 2 → baked → poked → shared | 1 → 3 → baked → poked → shared |
| Experience on desktop | All three bowls visible | Two bowls plus floor (as now) |
| Experience sharpness | `cooking_prep_2` is only 979 px wide; slightly soft on 2× screens | Sharper (1740 px) |
| Pages changed | 2, plus the About default | 1 |

Option A wins on the desktop column, which is where the photos do most of their work. Its cost is softness on high-density screens. If that bothers you in review, Option B is a one-line fallback for Experience.

## 4. Crop and positioning review (common viewports, not ultrawide)

These were checked against the prototype screenshots at 1440×900, 1920×1080, 1024×768 and 390 px wide, all in `explorations/v2-recipe-index/screenshots/`. "Column" is the right-side panel. Its width-to-height ratio is about 0.48 at 1024×768, 0.58 at 1440×900 and 0.64 at 1920×1080.

| Page and photo | Current result (observed) | Suggestion |
|---|---|---|
| Home, `cooking_prep` | Scale and note stay locked together at every size checked. A flour-bag brand and plastic bags show along the right edge. | **No change.** This is the approved composition. |
| Experience, `cooking_prep_3` (now) | Desktop: two bowls and roughly 25% floor at the top; the batter bowl is cut off. Mobile 3:2: all three bowls, good. | Replaced under Option A. Under Option B, accept it, or test a copy cropped above the table edge. That makes the photo wider, so it's an experiment, not a fix. |
| Experience, `cooking_prep_2` (proposed) | As the AI photo now: all three bowls fit at 1440 and 1920. The top shows a red hand mixer, a blue lidded tub and the recipe card. | Keep the current crop and `--pos: 45% 50%`, and mobile 4:5 at `50% 62%`. Optionally test trimming about 8% off the top of the copy to lose the blue tub. Check at 1024 that the yolk bowl isn't clipped. |
| Projects, `TresLechesSpongeMilk` | Bowl and sponge are both whole at all sizes. At 1024 the cake's right edge is cut. At 1024 and 1440 a dark sliver of floor or a leg shows along the bottom. | Keep `--pos: 50% 15%` and mobile 3:4 at `50% 25%`. Leave the bottom alone unless it bothers you in review; fixing it means a slight zoom or a cropped copy. |
| AI & Learning, `TresLechsForkCake` (proposed) | Not in the prototype yet. The photo is 3:4. The cake runs across about 17–95% of the width, and from 13% of the height down past the bottom edge. A dish handle is at the top; a strip of the dark surface and a yellow object are at the left edge. | Desktop `--pos: 75% 50%` (worked out, to be checked in screenshots). That centres the cake at 1440 and shows all of it at 1920. At 1024 it trims about 10% off the cake's left edge, and the rows still read. Mobile: frame `3 / 4` (its own shape, no crop). Copies at about 1400/1000/700 px wide; the original has 4000 px to spare. |
| About, table (current default) | Desktop: one flan stack, part of the foil pans, a wall outlet. The weakest crop in the set. | Move to the option (`?about=table`). |
| About, portrait (proposed default) | Desktop: face, dress and table all in frame at 1440. A window and a bag on the wall behind. Mobile 4:5 at `50% 30%`, good. | Keep its current crop (price signs and the second person's hand are already cut out of the copy). |

## 5. Optional handwritten notes (at most three, none added)

The Home note should stay the only one by default. If you want one more, the first idea below is the strongest. Each would reuse the Home note's existing style and be written into the photo's description, so screen-reader users get it too.

1. **AI & Learning, beside the fork holes: "Poke holes before you trust it."** It mirrors the page's pull quote, and the photo shows exactly that. *Recommended, if any.*
2. **Experience, beside the separated eggs: "Separate your concerns."** A real engineering principle that the photo shows literally. Engineers will smile at it; recruiters lose nothing if it doesn't land.
3. **About, beside the table: "Made to share."** Plain and warm, with no pun to decode.

Avoid putting a note on every page: one or two notes make them feel special, and five would turn into decoration.

## 6. Missing photos and open questions

1. **Same bake?** Is `TresLechesSpongeMilk.jpg` from the same night as the February 7 photos, or another bake? (It doesn't change the recommendation; it only matters for how the About text or alt text describe it.)
2. **Portrait as default.** Are you comfortable with your portrait being the default About photo on desktop and mobile? The inventory flagged this as needing your consent.
3. **Dropping photos.** Option A takes the mixing-bowls photo and the sale-table photo out of the default set. Is that fine?
4. **Resolution.** Are you OK with `cooking_prep_2.jpg` looking slightly soft on Retina screens? If you have a full-resolution original (the camera file, not a shared copy), that would fix it. The same applies to `TresLechesSpongeMilk.jpg` (1079 px) and the two `cooking_prep` photos (1740 px).
5. **Gap (optional):** there's no photo of the milk being poured, or of a finished, topped slice. The story works without one. A topped slice could later give About or the footer a "finished" moment, but don't take one just for this.
6. **Privacy (verified):** `TresLechsForkCake.jpg` contains GPS tags. The prototype's copies are re-encoded without metadata, as the other copies are.

## 7. Implementation plan (prototype only, after approval)

All changes stay in `explorations/v2-recipe-index/`. The production code, the approved homepage exploration and the originals stay untouched.

1. **Photo copies.** Add one `make-photos.ps1` job for `TresLechsForkCake.jpg` (full frame, about 1400/1000/700 px), run with `-Only fork-cake` so the other copies aren't rebuilt.
2. **Swap photos in `index.html`:**
   - **Experience:** desktop layer and mobile figure switch to `separating-eggs` with their existing positions.
   - **AI & Learning:** desktop layer and mobile figure switch to `fork-cake` with `--pos: 75% 50%` and a `3 / 4` frame.
   - **Alt text:** update for both.
3. **About default.** Make the portrait the default and keep the table photo behind `?about=table`.
4. **Untouched:** typography, layout, spacing, tabs, card text, transitions, the Home photo and its note, and Projects.
5. **Notes.** Add one only if you pick one from section 5.
6. **Verify:**
   - Re-run the routing and photo test pages, updating the expected file names.
   - Take screenshots at 1024×768, 1440×900, 1920×1080 and 390 px for the changed pages.
   - Confirm which file loads at each size.
   - Report the results.
7. **Stop for visual review.**
