# হাওড়া ব্রিজ কীভাবে তৈরি হলো

**Format:** Bengali animated documentary-explainer, 1920×1080, 30 fps
**Target length:** 9:30–10:30 (you said length over 10 minutes is fine). The real voice-over decides the final length.
**Narration:** 65 main scenes plus 3 optional beats (X1–X3) and 4 cuttable lines (✂).
**Angle:** *how it was built*, in order: the floating bridge, the rule against river piers, the cantilever idea, the caissons, war steel, the arms reaching out, the meeting in the middle, and the silent opening.
**Worlds:** `night` (dusk Kolkata skyline), `paper` and `paper-xs` (cream blueprint, cross-sections), and `archive` (sepia 1870s–1940s).
**Real photos (new):** 7 photo slots (P01–P07) across 8 scenes marked `photo:`. Each is a real, copyright-free photo (public domain, Unsplash licence or CC BY/BY-SA with credit), framed as a drawn photo card with a slow Ken Burns move and a small credit line. They are listed in `research/photos.md`. If a photo can't be cleared, the scene falls back to its illustrated version.

> **Original script.** The story order, hook, lines, comparisons and visual gags are new. This script does **not** use the reference video's hook (daily vehicle counter), the stick-figure balance test, the seismograph, the "biggest enemy" teaser, the pan-gutkha or pigeon-droppings segments, the "10-storey building" depth comparison, or the "এক লাফে নদী পার" line.

## Legend

| Field | Meaning |
|---|---|
| `bg` | `night` · `night-xs` · `paper` · `paper-xs` · `archive` |
| `type` | Scene template (see HOWRAH_BRIDGE_PROMPT.md §7) |
| `photo` | Optional real photo slot (see `research/photos.md`) |
| `[[word]]` | Orange keyword · `{{word}}` red keyword |
| `vo` | Exact narration; numbers spelled out in Bengali for TTS |
| ✂ | Line that can be cut if the film runs long |

On-screen numbers use Latin digits with Indian grouping (`26,500`, `1943`).

---

## Hook options (S01 uses option A)

| | VO | Visual |
|---|---|---|
| **A (recommended)** | দুই পাড় থেকে দুটো লোহার হাত এগিয়ে আসছে গঙ্গার মাঝখানের দিকে। নিচে, নদীর বুকে, একটাও খুঁটি নেই। | From frame 0, two half-built steel arms creep toward each other over a dusk river, with creeper-crane lamps blinking on their tips and a glowing gap between them. The headline lands at 2.5 s. |
| B | যুদ্ধ চলছে। ইংল্যান্ড থেকে ইস্পাত আসা প্রায় বন্ধ। অথচ গঙ্গার ওপর ঝোলাতে হবে ছাব্বিশ হাজার পাঁচশো টন লোহা। | A steel cargo crate on a rope swings into frame, a red "যুদ্ধ" stamp hits it, and a huge "26,500 t" counter slams in. |
| C | উনিশশো তেতাল্লিশ। সন্ধে নামলেই কলকাতার সব আলো নিভিয়ে দেওয়া হয়। আর সেই অন্ধকারে, চুপচাপ, খুলে গেল এক লোহার দানব। | Blacked-out skyline, sweeping searchlights, and the dark bridge silhouette with no lights. (This option spoils the open loop, so it would need a new loop.) |

## Chapters

| # | Chapter | Scenes | Est. start |
|---|---|---|---|
| 0 | Hook, stakes, title, open loop | S01–S05 | 0:00 |
| 1 | ব্রিজের আগে (before the bridge) | S06–S12 | 0:42 |
| 2 | শর্ত আর ক্যান্টিলিভার (the rule and the cantilever) | S13–S23 | 1:58 |
| 3 | মাটির নিচের লড়াই (foundations) | S24–S32 | 3:25 |
| 4 | লোহা আসবে কোথা থেকে? (steel and the war) | S33–S40 | 4:55 |
| 5 | শূন্যে লোহা জোড়া (raising the arms) | S41–S48 | 6:05 |
| 6 | মাঝখানে মিলন (the meeting) | S49–S53 | 7:25 |
| 7 | অন্ধকার শহর (war and the silent opening) | S54–S58 | 8:10 |
| 8 | উত্তরাধিকার (legacy) | S59–S61 | 9:05 |
| 9 | Recap and CTA | S62–S65 | 9:35 |

---

## PART 0 — HOOK

### S01 · HOOK
- **bg:** `night`
- **type:** HeroBridge (hook): arms creeping, already moving at frame 0
- **visual:** Wide dusk river with reflections. Towers and anchor arms are complete on both banks, and the two cantilever arms are about 85 % built. They creep toward each other panel by panel, a new panel popping in with a stroke draw about every 20 frames. Creeper-crane silhouettes sit on each tip with blinking amber lamps. A soft pulsing glow fills the gap in the middle, with a bracket and a "?" over it. The camera drifts in slowly (1.00 → 1.06). The headline lands word by word from 2.3 s.
- **onscreen:** kicker `গঙ্গার ঠিক মাঝখানে` · headline `দুই পাড়ের দুটো হাত — [[মিলবে]] তো?`
- **vo:** দুই পাড় থেকে দুটো লোহার হাত এগিয়ে আসছে গঙ্গার মাঝখানের দিকে। নিচে, নদীর বুকে, একটাও খুঁটি নেই।

### S02
- **bg:** `night`
- **type:** HeroBridge (close-up on the gap)
- **visual:** The camera pushes into the gap until the two tips fill 60 % of the frame. On "একটুও না মেলে", a red ghost of the right tip slides 1 m too low with a red ✕ and a short shake, then snaps back to grey. On "সব বৃথা", the arms dim to 40 % for a beat.
- **onscreen:** headline `একচুল {{ভুল}} হলেই সব শেষ`
- **vo:** মাঝখানে এসে দুটো হাত যদি একটুও না মেলে, তাহলে বছরের পর বছর খাটুনি, হাজার হাজার টন লোহা — সব বৃথা।

### S03
- **bg:** `night`
- **type:** StatCounters
- **visual:** The camera pulls back to the full bridge silhouette, which is complete but unlit. Two stat cards rise from below, staggered, and count up: ⛓ `26,500 টন · ইস্পাত` and ↔ `~457 মিটার · নদীতে একটাও খুঁটি নেই`. A dimension arrow draws across the river under the second card.
- **onscreen:** (cards only)
- **vo:** ছাব্বিশ হাজার পাঁচশো টন ইস্পাত। নদীর ওপর প্রায় চারশো সাতান্ন মিটার — মাঝখানে কোনো ঠেকনা ছাড়াই।

### S04 · TITLE
- **bg:** `night`
- **type:** TitleCard over a real photo
- **photo:** P01, a modern dusk photo of Howrah Bridge (Unsplash), with a slow Ken Burns push and night colour grade. At 70 % of the scene it cross-dissolves into the drawn hero bridge in the same framing (photo → drawing match-cut).
- **visual:** The title assembles word by word, then a shine sweeps across "তৈরি". A thin orange underline draws.
- **onscreen:** title `হাওড়া ব্রিজ কীভাবে [[তৈরি]] হলো`
- **vo:** এটাই হাওড়া ব্রিজ। আজ দেখব, নরম কাদার ওপর, বিশ্বযুদ্ধের মাঝখানে, এই লোহার দানবকে কীভাবে দাঁড় করানো হয়েছিল।

### S05 · OPEN LOOP
- **bg:** `archive`
- **type:** ArchiveVignette (ribbon)
- **visual:** A sepia drawn vignette in a rounded photo-corner frame shows the bridge entrance with a ribbon stretched across. A pair of ceremonial scissors floats in and hovers, but does not cut. On "কেন?", a large red "?" stamp thumps onto the frame. The ribbon keeps swaying gently.
- **onscreen:** kicker `একটা রহস্য` · headline `ফিতে কাটল {{না}} কেউ`
- **vo:** আর একটা অদ্ভুত ব্যাপার। এত বড় কাজ শেষ হলো, অথচ কেউ ফিতে কাটল না, কোনো উৎসবও হলো না। কেন? সেটা শেষে বলছি।

---

## PART 1 — ব্রিজের আগে

### S06 · CHAPTER 1
- **bg:** `archive`
- **type:** ChapterCard → river vignette
- **visual:** The kicker `অধ্যায় ১` and title appear for 1.5 s, then slide up and become a small header. A sepia river fills the frame: country boats and a small ferry cross from bank to bank, with ripple lines. A question card pops in: `লোকে গঙ্গা পেরোত কীভাবে?`
- **onscreen:** kicker `অধ্যায় ১` · headline `ব্রিজের [[আগে]]`
- **vo:** শুরু করা যাক একদম গোড়া থেকে। হাওড়া ব্রিজের আগে লোকে গঙ্গা পেরোত কীভাবে?

### S07
- **bg:** `archive`
- **type:** PhotoCard + Calendar
- **photo:** P02, a 19th-century public-domain photograph of the Howrah pontoon bridge, in a photo-corner frame with sepia grade, Ken Burns pan left→right and credit "ছবি: Wikimedia Commons · Public domain".
- **visual:** The photo card fills 70 % of the frame. A calendar card flips in at the right: `17 অক্টোবর 1874`. A name chip `স্যার ব্র্যাডফোর্ড লেসলি` slides under it on "ব্র্যাডফোর্ড লেসলির".
- **onscreen:** headline `একটা [[ভাসমান]] সেতু`
- **vo:** উত্তর — একটা ভাসমান সেতু। আঠারোশো চুয়াত্তর সালে, ইঞ্জিনিয়ার ব্র্যাডফোর্ড লেসলির নকশায় গঙ্গার ওপর চালু হয় পন্টুন ব্রিজ।

### S08
- **bg:** `archive`
- **type:** CrossSection (pontoon)
- **visual:** A side cross-section draws itself from the photo's framing: a row of boat-shaped pontoons under a flat road deck. The water line slowly rises and falls, and the whole deck rides up and down with it, with small up/down arrows. Bullock carts and walkers roll across. Labels pop: `পন্টুন`, `রাস্তা`. A dimension arrow along the deck reads `~466 মি`.
- **onscreen:** (labels only)
- **vo:** নিচে সারি সারি ভাসমান পন্টুন, তার ওপর পাতা রাস্তা। নদীর জল বাড়লে-কমলে গোটা সেতুটাই জলের সঙ্গে ওঠানামা করত।

### S09
- **bg:** `archive`
- **type:** ArchiveVignette (opening for ships)
- **visual:** On "খুলে সরিয়ে", a middle section of the deck unlatches and swings aside. A steamer with a smoke trail glides through the opening. Queues grow on both banks (people, carts), and a pocket-watch icon spins fast. On "অপেক্ষা", the queue icons tap their feet.
- **onscreen:** headline `জাহাজ এলেই রাস্তা {{বন্ধ}}`
- **vo:** কিন্তু নদী তো জাহাজেরও। তাই মাঝে মাঝে সেতুর একটা অংশ খুলে সরিয়ে দেওয়া হত, স্টিমার পার হত। আর ততক্ষণ দুই পাড়ে মানুষ আর গাড়ি দাঁড়িয়ে অপেক্ষা করত।

### S10
- **bg:** `archive`
- **type:** IconGrid (1906 survey)
- **visual:** A ledger card titled `সমীক্ষা · 1906` holds a 13-cell grid. On "তেরো ভাগের আট ভাগই", 8 cells pop one by one with amber bullock-cart icons and the other 5 fill with grey vehicle icons. A big Oswald fraction `8/13` lands beside the grid with a pop.
- **onscreen:** kicker `1906-এর সমীক্ষা` · headline `ভিড়ের [[রাজা]] গরুর গাড়ি`
- **vo:** শহর বাড়ছিল হু-হু করে। উনিশশো ছয় সালের এক সমীক্ষায় দেখা গেল, সবচেয়ে ভিড়ের দিনে সেতুর ওপর যত গাড়ি, তার তেরো ভাগের আট ভাগই গরুর গাড়ি!

### S11
- **bg:** `archive`
- **type:** PhotoCard → ArchiveVignette (strain)
- **photo:** P03, a second public-domain photo of the pontoon bridge (a crowd or a side view), shown for 2 s and then folded away like a page.
- **visual:** A drawn pontoon deck sags slightly under a crowd. Storm clouds roll in with wind lines, the pontoons bob, and red strain marks flash softly (≤ 2 Hz). On "পাকা, স্থায়ী", a solid blueprint ghost of a permanent bridge draws over it.
- **onscreen:** headline `চাই একটা [[পাকা]] সেতু`
- **vo:** ভাসমান সেতু আর এত ভার সামলাতে পারছিল না, ঝড়-বাদলেও ছিল বিপদ। সবাই বুঝল, এবার চাই একটা পাকা, স্থায়ী সেতু।

### S12
- **bg:** `archive`
- **type:** Timeline (camera pans along)
- **visual:** A horizontal sepia timeline draws left→right while the camera pans with it. Year pins drop on cue: `1905 · পরিকল্পনা শুরু`, `1914–18 · প্রথম বিশ্বযুদ্ধ — কাজ থমকে` (red pin), `1921 · মুখার্জি কমিটি`, `1926 · নিউ হাওড়া ব্রিজ আইন` (orange, bigger).
- **onscreen:** (pins only)
- **vo:** উনিশশো পাঁচেই পোর্ট কমিশনাররা নতুন সেতুর কথা ভাবতে শুরু করেন। ✂মাঝে প্রথম বিশ্বযুদ্ধে সব পিছিয়ে যায়।✂ তারপর কমিটি, কমিশন পেরিয়ে উনিশশো ছাব্বিশে পাশ হয় নিউ হাওড়া ব্রিজ আইন।

---

## PART 2 — শর্ত আর ক্যান্টিলিভার

### S13 · CHAPTER 2
- **bg:** `paper`
- **type:** ChapterCard → Stamp
- **visual:** After the chapter kicker, a blueprint of a generic bridge with a pier standing in the river fills the frame. On "চলবে না", a big red rubber stamp `বাতিল` thumps onto the pier with a thud, and the pier fades out.
- **onscreen:** kicker `অধ্যায় ২` · headline `নদীতে খুঁটি {{চলবে না}}`
- **vo:** কিন্তু নতুন সেতুর সামনে ছিল এক কঠিন শর্ত। নদীর বুকে কোনো খুঁটি, কোনো ভিত বসানো চলবে না।

### S14
- **bg:** `paper-xs`
- **type:** CrossSection (silt and ships)
- **visual:** A river cross-section with a hypothetical pier drawn dashed. Flow arrows bend around it, and silt specks drift and pile into a growing bank downstream. On "জাহাজ চলাচল", a ship hull slides in from the left and a red warning ring blinks where its keel meets the new silt bank. Chips: `পলি জমবে`, `জাহাজের পথ`.
- **onscreen:** chips only
- **vo:** বন্দর কর্তৃপক্ষের ভয় ছিল, নদীর মধ্যে ভিত বসালে পলি জমার ধরন চিরকালের মতো বদলে যাবে। আর তাতে বিপদে পড়বে জাহাজ চলাচল।

### S15
- **bg:** `paper`
- **type:** DimArrow + comparison
- **visual:** Two banks with a wide river between them. A dimension arrow draws across: `~457 মিটার`. On "চারটে ফুটবল মাঠ", four football-pitch outlines slide in end to end along the arrow and stop short of the far bank, leaving a red-hatched leftover.
- **onscreen:** headline `পুরোটাই [[শূন্যে]]`
- **vo:** মানে নদীর ওপর প্রায় চারশো সাতান্ন মিটার, পুরোটাই ঝুলিয়ে রাখতে হবে শূন্যে। ✂চারটে ফুটবল মাঠ পাশাপাশি রাখলেও এতটা জায়গা ভরে না।✂

### S16
- **bg:** `paper`
- **type:** CompareCards + cursor
- **visual:** Two blueprint cards slide in: `ঝুলন্ত সেতু` (suspension sketch: cables, towers) and `ক্যান্টিলিভার` (cantilever sketch). A consultant chip `Rendel, Palmer & Tritton` sits above. On "ক্যান্টিলিভার", the cursor clicks the right card: it scales up with an orange ring and the left card dims.
- **onscreen:** headline `বেছে নেওয়া হলো [[ক্যান্টিলিভার]]`
- **vo:** পরামর্শদাতা সংস্থা রেন্ডেল, পামার অ্যান্ড ট্রিটনের সামনে ঝুলন্ত সেতুর নকশাও ছিল। কিন্তু শেষে বেছে নেওয়া হলো অন্য কৌশল — ক্যান্টিলিভার।

### S17
- **bg:** `paper`
- **type:** RulerExperiment (push 0.35)
- **visual:** A big wooden table corner fills the left 55 % of the frame, with a ruler lying on it and a third hanging out over the edge. A drawn hand nudges it outward slowly. The table-edge fulcrum is marked with a small orange triangle.
- **onscreen:** kicker `ছোট্ট পরীক্ষা` · headline `টেবিল, স্কেল আর একটা [[বই]]`
- **vo:** ক্যান্টিলিভার বোঝা খুব সহজ। টেবিলের কিনারায় একটা স্কেল রাখুন, খানিকটা বাইরে বের করে।

### S18
- **bg:** `paper`
- **type:** RulerExperiment (tip)
- **visual:** On "আরও ঠেলুন", the hand pushes the ruler further out. On "টুপ করে", it tips about the edge and falls with a red motion arc and a tick sound. A balance chip appears: `বাইরের ভার > ভেতরের ভার`.
- **onscreen:** (chip only)
- **vo:** আরও ঠেলুন — একসময় টুপ করে পড়ে যাবে। বাইরের দিকের ভার ভেতরের দিককে হারিয়ে দিল।

### S19
- **bg:** `paper`
- **type:** RulerExperiment (book)
- **visual:** Reset. On "মোটা বই", a thick book drops onto the inner end with a thud. The ruler is then pushed far out (about 60 %) and it stays. A green check pops. Labels draw: `বই = পেছনের ভার` and `কিনারা = ভরকেন্দ্র`.
- **onscreen:** headline `এটাই [[ক্যান্টিলিভার]]`
- **vo:** এবার ভেতরের দিকে একটা মোটা বই চাপা দিন। স্কেল অনেকটা বেরিয়ে থাকলেও আর পড়ছে না। এটাই ক্যান্টিলিভার।

### S20
- **bg:** `paper`
- **type:** HeroBridge (anatomy: towers)
- **visual:** The table/ruler morphs: the table edge slides to become the tower position, then the full hero bridge draws in (paper theme, grey lines). On "টাওয়ার", both towers highlight in ink-blue with a soft pulse. A small inset of the table edge sits next to the left tower with a dotted connector.
- **onscreen:** headline `দুই পাড়ে দুটো [[টাওয়ার]]`
- **vo:** হাওড়া ব্রিজ ঠিক এই বুদ্ধিতে তৈরি। দুই পাড়ে দুটো বিশাল টাওয়ার — এরাই আমাদের টেবিলের কিনারা।

### S21
- **bg:** `paper`
- **type:** HeroBridge (anatomy: anchor arms)
- **visual:** The anchor arms (landward) highlight in blue. A dimension arrow above reads `~99 মি`. A book icon drops onto each anchor arm with a soft thud and squash.
- **onscreen:** chip `অ্যাঙ্কর আর্ম`
- **vo:** টাওয়ারের ডাঙার দিকে থাকে অ্যাঙ্কর আর্ম, প্রায় নিরানব্বই মিটার লম্বা। এটাই সেই ভারী বই, পেছন থেকে চেপে ধরে রাখে।

### S22
- **bg:** `paper`
- **type:** HeroBridge (anatomy: cantilever arms)
- **visual:** The river-side cantilever arms highlight in orange, with dimension arrows `~143 মি` on each. The water below shimmers, and a dashed "nothing below" line drops from each arm tip to the water with a small ✕.
- **onscreen:** chip `ক্যান্টিলিভার আর্ম`
- **vo:** আর নদীর দিকে বেরিয়ে থাকে ক্যান্টিলিভার আর্ম, প্রায় একশো তেতাল্লিশ মিটার — নিচে কিছু নেই, পুরোটাই শূন্যে।

### S23
- **bg:** `paper`
- **type:** HeroBridge (anatomy: suspended span + totals)
- **visual:** The middle suspended span highlights in amber: `~172 মি`. Then two long arrows draw: main span `~457 মি` and total `~705 মি`. All parts glow once in sequence: tower → anchor → cantilever → suspended.
- **onscreen:** chip `সাসপেন্ডেড স্প্যান`
- **vo:** দুই হাতের ডগার মাঝে ঝোলানো থাকে আরেকটা অংশ, সাসপেন্ডেড স্প্যান — প্রায় একশো বাহাত্তর মিটার। সব মিলিয়ে সেতুটা লম্বায় প্রায় সাতশো পাঁচ মিটার।

---

## PART 3 — মাটির নিচের লড়াই

### S24 · CHAPTER 3
- **bg:** `paper-xs`
- **type:** ChapterCard → load arrows
- **visual:** The hero bridge silhouette sits on top while the ground cross-section fills the lower 55 %. Heavy orange load arrows drop from the towers into the ground and stop at a "?" where foundations should be. A calendar chip `1936 · কাজ শুরু` pops at the top-left.
- **onscreen:** kicker `অধ্যায় ৩` · headline `মাটির নিচের [[লড়াই]]`
- **vo:** উনিশশো ছত্রিশে শুরু হলো আসল কাজ। আর প্রথম প্রশ্নটাই ছিল, এত হাজার টন লোহার ভার নামবে কোথায়? গঙ্গার পাড়ের মাটি তো নরম।

### S25
- **bg:** `paper-xs`
- **type:** CrossSection (strata)
- **visual:** The soil draws layer by layer from the top: `নরম পলি` (light), `কাদা আর বালি` (mid), and deep down a firmer band `শক্ত হলদে কাদা` (ochre, highlighted). A depth ruler on the right ticks downward. Specks drift slowly in the soft layers. On "অনেক নিচে", the camera tilts down to the clay band.
- **onscreen:** chips per layer
- **vo:** পাড়ের নিচে স্তরের পর স্তর নরম নদীর পলি। ভরসা করার মতো শক্ত মাটি, হলদেটে শক্ত কাদার স্তর, মেলে অনেক নিচে গিয়ে।

### S26
- **bg:** `paper`
- **type:** Caisson (plan view)
- **visual:** A giant concrete box in plan view fills 60 % of the frame. Dimension arrows draw: `~55 মি` × `~25 মি`. On "একুশটা খোপ", 21 shafts (7 × 3) pop in a ripple from the centre. One shaft gets a callout `~6.25 মি`. It reads like a honeycomb.
- **onscreen:** headline `এক বিশাল কংক্রিটের [[বাক্স]]`
- **vo:** তাই প্রতিটা টাওয়ারের নিচে বানানো হলো এক বিশাল কংক্রিটের বাক্স, নাম কেসন। মাপ প্রায় পঞ্চান্ন বাই পঁচিশ মিটার, ভেতরে একুশটা খোপ।

### S27
- **bg:** `paper-xs`
- **type:** Caisson (sinking 0 → 0.35)
- **visual:** A side section shows the caisson on the bank. Grab buckets on cables dip into the shafts, lift clumps of soil out and dump them aside. With each cycle (synced to "খুঁড়ে", "সরে যেতেই", "একটু একটু"), the whole box steps down a notch with a soft thud. Arrows on the sides read `নিজের ভারে নামছে`.
- **onscreen:** headline `খোঁড়ো, আর [[নামাও]]`
- **vo:** এবার আসল কৌশল। খোপগুলোর ভেতর থেকে মাটি খুঁড়ে তুলে ফেলা হত। নিচের মাটি সরে যেতেই বাক্সটা নিজের ভারেই একটু একটু করে বসে যেত।

### S28
- **bg:** `paper-xs`
- **type:** Caisson (sinking 0.35 → 0.7, add lifts)
- **visual:** As the box goes down, a new concrete lift rises on top in a lighter tone. A 3-step loop chip cycles `খোঁড়ো → নামাও → জোড়ো`. On "দিনরাত", a sun/moon icon swaps three times as the sky tone above ground shifts day → night → day.
- **onscreen:** (loop chip)
- **vo:** বাক্স যত নামে, ওপরে তত নতুন দেওয়াল জোড়া হয়। খোঁড়ো, নামাও, জোড়ো — দিনরাত চলত এই চক্র।

### S29
- **bg:** `paper-xs`
- **type:** Caisson (camera push into a shaft)
- **visual:** The camera pushes into one shaft until it fills the frame. A cut-away shows the walls, muddy water, and a bucket descending on cables, with tiny anonymous worker silhouettes at the winch on top. On "হেলে যাবে", the whole box ghost-tilts 4° in red with a warning shake, then rights itself.
- **onscreen:** headline `একচুল {{বাঁকা}} হলেই বিপদ`
- **vo:** সবচেয়ে কঠিন ছিল বাক্সটাকে একদম সোজা রাখা। একদিকে বেশি খুঁড়লেই বাক্স হেলে যাবে। আর এত বড় জিনিস একবার হেলে গেলে, সামলানো প্রায় অসম্ভব।

### S30
- **bg:** `paper`
- **type:** Precision callout
- **visual:** A top-view target crosshair over the caisson outline. A dashed "নকশার জায়গা" outline sits nearly on top of the solid actual outline. A magnifier lens slides over one corner, showing the tiny offset `5–7.5 সেমি`.
- **onscreen:** headline `ভুল মাত্র [[কয়েক সেন্টিমিটার]]`
- **vo:** অথচ শেষে দেখা গেল, এই দানবীয় বাক্সগুলো বসেছে নকশার জায়গা থেকে মাত্র পাঁচ থেকে সাড়ে সাত সেন্টিমিটারের মধ্যে।

### S31
- **bg:** `paper-xs`
- **type:** DepthCompare (pull-back)
- **visual:** Both caissons stand side by side in section with depth arrows: `কলকাতার দিক · ~31.4 মি` and `হাওড়ার দিক · ~26.5 মি`. The camera pulls back to show the full towers rising above ground, with the bridge above and the buried boxes below drawn in matching ink, like an iceberg.
- **onscreen:** (depth chips)
- **vo:** কলকাতার দিকের কেসন নামল মাটির প্রায় একত্রিশ মিটার নিচে, হাওড়ার দিকেরটা প্রায় সাড়ে ছাব্বিশ মিটার। যে সেতু আমরা দেখি, তার নিচে লুকিয়ে আছে আরেকটা অদৃশ্য সেতু।

### S32
- **bg:** `paper`
- **type:** Calendar + CheckRow
- **visual:** A calendar card `নভেম্বর 1938` flips in. A check row `ভিত তৈরি ✓` pops. Load arrows from the bridge silhouette flow down into both caissons and glow.
- **onscreen:** (calendar, check)
- **vo:** উনিশশো আটত্রিশের নভেম্বরে শেষ হলো ভিতের কাজ। এবার সেতুর মূল ভার নামবে এই দুটো বাক্সে।

---

## PART 4 — লোহা আসবে কোথা থেকে?

### S33 · CHAPTER 4
- **bg:** `night`
- **type:** ChapterCard → globe pulse
- **visual:** A night skyline. A stylised generic globe (no map tiles, just simple continent blobs) turns slowly with a red pulse ring over Europe, and a chip `1939` pops.
- **onscreen:** kicker `অধ্যায় ৪` · headline `লোহা আসবে {{কোথা}} থেকে?`
- **vo:** ভিত তৈরি। এবার দরকার ইস্পাত, বিপুল পরিমাণে। আর ঠিক পরের বছরই ইউরোপে শুরু হয়ে গেল দ্বিতীয় বিশ্বযুদ্ধ।

### S34
- **bg:** `night`
- **type:** AppWindow (SteelOrder: England row)
- **visual:** An app window `স্টিল অর্ডার · নিউ হাওড়া ব্রিজ` slides up. A big counter types `মোট দরকার: 26,500 টন`. The supplier row `ইংল্যান্ড` fills its bar and stops at `~3,000`. On "যুদ্ধের কাজে", the bar turns red, shakes, and a red chip `যুদ্ধ` pops. A grey placeholder `বাকি ~23,500?` blinks below.
- **onscreen:** (window only)
- **vo:** সেতুর জন্য দরকার মোট ছাব্বিশ হাজার পাঁচশো টন ইস্পাত। কিন্তু যুদ্ধের বাজারে ইংল্যান্ড দিতে পারল মাত্র তিন হাজার টনের মতো। বাকিটা চলে গেল যুদ্ধের কাজে।

### S35
- **bg:** `night`
- **type:** AppWindow (SteelOrder: Tata row)
- **visual:** The cursor glides to the row `টাটা স্টিল · জামশেদপুর` and clicks it. A green bar fills to `~23,000+` and a chip `Tiscrom` pops. The total bar completes `26,500 ✓` with a ding.
- **onscreen:** headline `এগিয়ে এল [[টাটা]]`
- **vo:** তখন এগিয়ে এল জামশেদপুরের টাটা স্টিল। তারা জোগান দিল প্রায় তেইশ হাজার টন বিশেষ উচ্চ-টানের ইস্পাত — নাম টিসক্রম।

### S36
- **bg:** `paper`
- **type:** HeroBridge (forces)
- **visual:** A close-up of one cantilever arm. Members light up in two colours in a slow wave: red with outward arrows (`টান`) on the top chord, blue with inward arrows (`চাপ`) on the bottom chord. A gauge in the corner climbs.
- **onscreen:** chips `টান` · `চাপ`
- **vo:** উচ্চ-টানের ইস্পাত মানে, প্রচণ্ড টান সইতে পারে এমন সংকর ইস্পাত। ✂এমন সেতুর প্রতিটা অংশ সারাক্ষণ হয় টান, নয় চাপ সামলাচ্ছে।✂

### S37
- **bg:** `paper`
- **type:** BarSplit
- **visual:** A long bar labelled `26,500 টন` splits: a short grey segment `ইংল্যান্ড ~3,000` and a long orange segment `ভারত · টাটা ~23,000+`. Below, a row of 10 dots fills, 9 of them orange.
- **onscreen:** headline `ইস্পাতের প্রায় [[নয় ভাগই]] এই দেশের`
- **vo:** মানে, যে সেতুকে আমরা ব্রিটিশ আমলের সেতু বলি, তার ইস্পাতের দশ ভাগের প্রায় নয় ভাগই তৈরি হয়েছিল এই দেশে।

### S38
- **bg:** `night`
- **type:** RouteMap (generic)
- **visual:** A stylised card map (no real map data): a `জামশেদপুর` factory dot on the left and a `হাওড়া` dot by a river on the right. A dashed route draws, steel-bundle icons travel along it in a loop, and a second factory icon at Howrah lights up.
- **onscreen:** kicker `কারখানা থেকে কারখানায়`
- **vo:** জামশেদপুরের কারখানা থেকে ইস্পাত পৌঁছতে লাগল হাওড়ায়, যেখানে অপেক্ষা করছিল আরেকটা কারখানা।

### S39
- **bg:** `paper`
- **type:** Fabrication line
- **visual:** Three plain name-plates `Braithwaite`, `Burn`, `Jessop` slide together into one with a `1935` chip, then a conveyor workshop line: steel plates slide in → a saw cuts them with small sparks → a punch makes rivet holes (dots appear) → the finished pieces stack. A company chip `Braithwaite, Burn & Jessop` sits at the top.
- **onscreen:** headline `কাটা, মাপা, [[ছিদ্র]] করা`
- **vo:** উনিশশো পঁয়ত্রিশে তিনটে কোম্পানি মিলে তৈরি হাওড়ার সংস্থা ব্রেথওয়েট, বার্ন অ্যান্ড জেসপ পেল সেতুর ইস্পাত কাঠামো তৈরি আর জোড়ার দায়িত্ব। পাত কাটা, মাপা, রিভেটের ছিদ্র করা, সব চলল এখানে।

### S40
- **bg:** `paper`
- **type:** Kit-of-parts
- **visual:** An exploded view of one K-truss panel: members fly in from the edges and click into place (clank). The finished panel then duplicates into a row of panels that slides away toward the river.
- **onscreen:** headline `এক বিশাল লোহার [[ধাঁধা]]`
- **vo:** কোন টুকরো কোথায় বসবে, সব আগে থেকে হিসেব করা। যেন বিশাল এক লোহার ধাঁধা, শুধু জোড়া লাগানো বাকি।

---

## PART 5 — শূন্যে লোহা জোড়া

### S41 · CHAPTER 5
- **bg:** `night`
- **type:** ChapterCard → empty air
- **visual:** Night river. The two finished foundations glow faintly under the banks, and the air between them is empty. A question card: `নিচে ঠেকনা নেই — তাহলে?`
- **onscreen:** kicker `অধ্যায় ৫` · headline `শূন্যে [[লোহা]] জোড়া`
- **vo:** এবার সবচেয়ে বড় ধাঁধা। নদীর বুকে কোনো ঠেকনা দেওয়া যাবে না। তাহলে শূন্যে, জলের এত ওপরে, লোহা জোড়া হবে কীভাবে?

### S42
- **bg:** `paper`
- **type:** HeroBridge (stage: anchor arms + towers)
- **visual:** A build sequence on both banks: the anchor arms build panel by panel over land, then the towers rise. A tower dimension arrow reads `~82 মি`.
- **onscreen:** headline `শুরু [[ডাঙা]] থেকে`
- **vo:** কাজ শুরু হলো দুই পাড়ের ডাঙা থেকে। প্রথমে অ্যাঙ্কর আর্ম, সঙ্গে মাথা তুলল দুটো টাওয়ার — প্রায় বিরাশি মিটার উঁচু।

### S43
- **bg:** `night`
- **type:** HeroBridge (cantilever start)
- **visual:** Night world. Both cantilever arms start creeping out over the water, one panel at a time (on "আগের প্যানেলটা ধরে", a small hook icon shows each new panel hanging off the last one), each with a stroke draw and a clank. Creeper-crane silhouettes with blinking lamps ride the tips, and the reflections ripple.
- **onscreen:** headline `নদীর দিকে [[এক পা]], এক পা`
- **vo:** তারপর আসল খেলা। টাওয়ার থেকে নদীর দিকে এগোতে লাগল ক্যান্টিলিভার আর্ম, একটা একটা প্যানেল করে। আর এটাই ক্যান্টিলিভারের জাদু — প্রতিটা নতুন প্যানেল ঝুলে থাকে আগের প্যানেলটা ধরে, নিচে কোনো ঠেকনা লাগে না।

### S44
- **bg:** `paper`
- **type:** CreeperCrane (camera flies along the arm)
- **visual:** Camera move: the camera flies along the top chord from the tower toward the tip, at zoom 2.2. A drawn creeper crane hoists a new member up from below the frame, sets it, the joint pops, then the crane rolls forward one panel. Chip: `ক্রিপার ক্রেন`.
- **onscreen:** chip only
- **vo:** কাজটা করত ক্রিপার ক্রেন, যে ক্রেন সেতুর ওপরের কাঠামো বেয়ে নিজেই এগিয়ে চলে। একটা প্যানেল জোড়া হলো, ক্রেন এগিয়ে গিয়ে জুড়ল পরেরটা।

### S45
- **bg:** `paper`
- **type:** HeroBridge (half) + BalanceInset
- **visual:** One tower with its two arms fills the frame. As the cantilever arm grows, torque arrows grow at its tip, and the anchor arm glows blue with counter-arrows. In the corner, the ruler-and-book inset from S19 plays in sync.
- **onscreen:** headline `পেছন থেকে টেনে রাখে [[অ্যাঙ্কর আর্ম]]`
- **vo:** হাত যত এগোয়, শূন্যে ঝুলে থাকা ভার তত বাড়ে। আর পেছন থেকে সেটা টেনে ধরে রাখে অ্যাঙ্কর আর্ম, ঠিক আমাদের সেই বইটার মতো।

### S46
- **bg:** `paper`
- **type:** Calendar pair + mini bridge
- **visual:** Two calendar cards flip: `1940-এর শেষ · শুরু` → `1941-এর গ্রীষ্ম · শেষ`. Between them, a mini hero bridge grows its arms from 0 % to 100 % in time with the cards.
- **onscreen:** (calendars)
- **vo:** উনিশশো চল্লিশের শেষে শুরু হয়েছিল এই হাত বাড়ানোর কাজ। উনিশশো একচল্লিশের গ্রীষ্মে দুই দিকের ক্যান্টিলিভার আর্মই তৈরি।

### S47
- **bg:** `paper`
- **type:** RivetBeat (magnifier, 6–7 s)
- **visual:** A magnifier lens over one truss joint: a glowing orange rivet slides into the hole, three hammer taps form its head (3 ticks), its colour cools from orange to grey, and tiny arrows pull the plates tight.
- **onscreen:** headline `নাট-বোল্ট নয়, [[রিভেট]]`
- **vo:** আর সব জোড়া লাগল রিভেট দিয়ে। গনগনে গরম রিভেট ছিদ্রে ঢুকিয়ে পিটিয়ে মাথা গড়া হয়, ঠান্ডা হলে সে শক্ত করে কামড়ে ধরে।

### S48
- **bg:** `night`
- **type:** GapCounter
- **visual:** Wide night shot: both cantilever arms are complete. A glowing gap sits between the tips, with a gap counter `172 মি` hovering above it and the tiny crane lamps blinking.
- **onscreen:** headline `মাঝে এখনও [[ফাঁক]]`
- **vo:** দুই হাতের ডগার মাঝে তখনও প্রায় একশো বাহাত্তর মিটার ফাঁক। এই ফাঁক ভরাবে মাঝের ঝোলানো অংশ।

---

## PART 6 — মাঝখানে মিলন

### S49 · CHAPTER 6
- **bg:** `night`
- **type:** ChapterCard (callback to the hook framing)
- **visual:** The same framing as S01, exactly, and the camera hovers above the gap. The S01 hook line flashes back for a moment in ghost text.
- **onscreen:** kicker `অধ্যায় ৬` · headline `মাঝখানে [[মিলন]]`
- **vo:** এবার সেই মুহূর্ত, যেটা দিয়ে ভিডিও শুরু করেছিলাম। দুই পাড় থেকে আসা দুটো হাত, মিলতেই হবে একদম ঠিকঠাক।

### S50
- **bg:** `paper`
- **type:** HeroBridge (suspended halves)
- **visual:** Each tip extends one half of the suspended span (amber), panel by panel, toward the centre. A chip on each half reads `~86 মি · ~2,000 টন`.
- **onscreen:** (chips)
- **vo:** মাঝের অংশটাও তৈরি হলো দুই ভাগে, দুই দিক থেকে। প্রতিটা ভাগ প্রায় ছিয়াশি মিটার লম্বা, ওজন প্রায় দু'হাজার টন।

### S51
- **bg:** `paper`
- **type:** Jacks
- **visual:** A close-up of the meeting joint: 16 jack icons (8 per side) pump in a wave and arrows push. A big chip reads `16 × 800 টন`.
- **onscreen:** headline `ষোলোটা [[হাইড্রলিক জ্যাক]]`
- **vo:** দুই ভাগকে জুড়তে কাজে লাগানো হলো ষোলোটা হাইড্রলিক জ্যাক, প্রতিটার ক্ষমতা আটশো টন।

### S52 · THE MEETING
- **bg:** `night`
- **type:** GapCounter → 0
- **visual:** A camera close-up on the gap. The counter ticks down `…12 · 6 · 2 · 0`. On "মিলল", a big metallic clank lands with one soft white bloom (a single flash, no strobing) and a spray of sparks. A calendar chip reads `ডিসেম্বর 1941`. A low rumble settles.
- **onscreen:** headline `ফাঁক — [[শূন্য]]`
- **vo:** উনিশশো একচল্লিশের ডিসেম্বর নাগাদ, দুই পাড় থেকে আসা লোহা অবশেষে মিলল গঙ্গার ঠিক মাঝখানে।

### S53
- **bg:** `night`
- **type:** HeroBridge (pull-back reveal)
- **visual:** Camera move: a long pull-back from the joint (zoom 3.0 → 1.0) reveals the complete bridge spanning the river, with its reflection shimmering and the city windows twinkling.
- **onscreen:** headline `এক পাড় থেকে আরেক পাড়, [[একটানা]]`
- **vo:** এই প্রথম গঙ্গার ওপর দাঁড়িয়ে গেল পুরো কাঠামোটা। এক পাড় থেকে আরেক পাড়, একটানা, নদীতে একটাও খুঁটি ছাড়া।

---

## PART 7 — অন্ধকার শহর

### S54 · CHAPTER 7
- **bg:** `night`
- **type:** Blackout + Searchlights + Calendar
- **visual:** After the chapter kicker, the city windows go dark block by block. Searchlights rise and sweep slowly, and a calendar card reads `20 ডিসেম্বর 1942`. A generic aircraft silhouette crosses high and small. Distant soft glows pulse slowly (≤ 1 Hz) under a muffled siren. Nothing is graphic.
- **onscreen:** kicker `অধ্যায় ৭` · headline `{{অন্ধকার}} শহর`
- **vo:** কিন্তু সেতু যখন প্রায় তৈরি, কলকাতার আকাশে তখন যুদ্ধের ছায়া। উনিশশো বিয়াল্লিশের বিশে ডিসেম্বর রাতে কলকাতায় বোমা ফেলে জাপানি বিমান। পরের কয়েক রাতেও চলে হামলা।

### S55
- **bg:** `night`
- **type:** HeroBridge (dark, safe)
- **visual:** The dark bridge silhouette stands untouched while the searchlights pass over it. A shield chip reads `সেতু অক্ষত ✓`.
- **onscreen:** headline `সেতু [[অক্ষত]]`
- **vo:** শহর জুড়ে আতঙ্ক, ✂বহু মানুষ শহর ছেড়ে চলে যান।✂ কিন্তু নতুন সেতুর কোনো ক্ষতি হয়নি।

### S56
- **bg:** `archive`
- **type:** Calendar (big) + gates
- **visual:** A big calendar card `3 ফেব্রুয়ারি 1943` flips in. Behind it, a sepia drawing of the bridge entrance shows a barrier lifting.
- **onscreen:** (calendar)
- **vo:** তারপর এল উনিশশো তেতাল্লিশের তেসরা ফেব্রুয়ারি। সেতু খুলে দেওয়া হলো সাধারণ মানুষের জন্য।

### S57 · OPEN-LOOP PAYOFF
- **bg:** `archive`
- **type:** ArchiveVignette (ribbon callback)
- **visual:** Callback to S05, the same ribbon. The scissors fade away unused, and the "?" stamp from S05 flips into a word chip `যুদ্ধ`. The ribbon is quietly unhooked and drops aside, and drawn walkers start crossing.
- **onscreen:** headline `কোনো উৎসব {{নেই}}`
- **vo:** মনে আছে শুরুর প্রশ্নটা? কেন কেউ ফিতে কাটল না? কারণ যুদ্ধ। জাপানি বিমান হামলার ভয়ে কোনো উদ্বোধন অনুষ্ঠানই হয়নি। চুপচাপ খুলে গেল সেতু।

### S58
- **bg:** `night`
- **type:** PhotoCard → Deck traffic + Tram
- **photo:** P07, "Howrah Bridge, Calcutta in 1945" (Wikimedia Commons; a GI photo by Clyde Waddell, likely public domain, to be confirmed). It shows for the first 40 % of the scene in a sepia photo-corner frame with a chip `1945 · আসল ছবি`, then cross-dissolves to the drawn deck.
- **visual:** A deck-level side view. Walkers, a hand-cart and a bullock cart cross. On "ট্রামও", a period tram silhouette glides across with a little spark at its pole. A chip reads `ট্রাম · 1993 পর্যন্ত`.
- **onscreen:** (chip)
- **vo:** তারপর থেকে এই সেতু দিয়ে চলেছে মানুষ, গাড়ি, ঠেলা। একসময় ট্রামও চলত, উনিশশো তিরানব্বইয়ে সেটা বন্ধ হয়।

---

## PART 8 — উত্তরাধিকার

### S59
- **bg:** `night`
- **type:** NameCard + PhotoCard
- **photo:** P04, a modern photo of the bridge's girders, or a close-up that shows the riveted K-truss (Wikimedia Commons, CC BY-SA, with credit on screen).
- **visual:** A nameplate `নিউ হাওড়া ব্রিজ` flips over to `রবীন্দ্র সেতু` with the chip `14 জুন 1965`. The photo sits behind it with a slow push.
- **onscreen:** (nameplate)
- **vo:** উনিশশো পঁয়ষট্টিতে রবীন্দ্রনাথ ঠাকুরের নামে সেতুর নাম হলো রবীন্দ্র সেতু। যদিও আমাদের কাছে সে আজও — হাওড়া ব্রিজ।

### S60
- **bg:** `night`
- **type:** Ranking
- **visual:** A podium-style ranking card. `1943` shows a big `#3` with a drawn medal and the label `বিশ্বের দীর্ঘতম ক্যান্টিলিভার সেতু`. It then slides to `আজ · #6`.
- **onscreen:** (ranking)
- **vo:** খোলার সময় এটা ছিল পৃথিবীর তৃতীয় দীর্ঘতম ক্যান্টিলিভার সেতু। আজও এই ধরনের সেতুর মধ্যে সে বিশ্বে ষষ্ঠ।

### S61
- **bg:** `night`
- **type:** YearCounter + PhotoCard
- **photo:** P05, a modern night or dusk photo of the bridge with traffic (Unsplash or Commons).
- **visual:** A year counter rolls `1943 → 2026` and a chip pops `80+ বছর`. The photo sits behind with light streaks, and the drawn hero bridge fades in over it and lines up exactly.
- **onscreen:** (counter)
- **vo:** আর আশি বছরেরও বেশি সময় ধরে, রোজ, সেই দুটো লোহার হাত ধরে রেখেছে দুই শহরকে।

---

## PART 9 — RECAP + CTA

### S62
- **bg:** `paper`
- **type:** Checklist (3 rows)
- **visual:** Three rows check in on cue: `নদীতে খুঁটি নেই → ক্যান্টিলিভার` ✓ · `নরম কাদা → ~30 মি গভীর কেসন` ✓ · `যুদ্ধের মধ্যে → দেশের ইস্পাত` ✓.
- **onscreen:** (checklist)
- **vo:** তাহলে এক কথায়। নদীতে খুঁটি চলবে না, তাই ক্যান্টিলিভার। মাটি নরম, তাই প্রায় তিরিশ মিটার গভীর কেসন। আর যুদ্ধের মধ্যে, দেশের ইস্পাতে, শূন্যে মেলানো দুটো হাত।

### S63 · BOOKEND
- **bg:** `night`
- **type:** HeroBridge (hook composition, finished) → PhotoCard
- **photo:** P06, a real photo of the bridge's centre taken from the river or a ghat (Unsplash). The final match-cut goes from drawing to photo.
- **visual:** The exact S01 framing, but finished, with traffic lights flowing on the deck. The camera pushes to the centre joint and a soft glow ring marks it. On "দুটো হাত", the drawing dissolves into the real photo in the same framing.
- **onscreen:** headline `ঠিক [[এইখানে]] মিলেছিল`
- **vo:** পরের বার হাওড়া ব্রিজ পেরোনোর সময়, মাঝখানটায় একবার তাকাবেন। ঠিক ওইখানেই একদিন মিলেছিল দুই পাড়ের দুটো হাত।

### S64
- **bg:** `paper`
- **type:** CommentBox
- **visual:** A comment box UI. The cursor clicks in and a typewriter (grapheme-segmented) types `বিদ্যাসাগর সেতু…`, then the send button pulses.
- **onscreen:** headline `পরের ভিডিও [[কী]] নিয়ে?`
- **vo:** পরের ভিডিওতে কোন স্থাপত্যের গল্প শুনতে চান — বিদ্যাসাগর সেতু, না ভিক্টোরিয়া মেমোরিয়াল? কমেন্টে লিখে জানান।

### S65 · END
- **bg:** `night`
- **type:** FollowShare + end screen (3 s hold)
- **visual:** Follow cards (FB/IG/YT glyphs, self-drawn) pop in, then a share card `রোজ হাওড়া ব্রিজ পার হয় যে বন্ধু` with a forward arrow. The end screen holds 3 s over the lit bridge.
- **onscreen:** (cards)
- **vo:** আর ভিডিওটা পাঠিয়ে দিন সেই বন্ধুকে, যে রোজ হাওড়া ব্রিজ পেরোয়, অথচ এই গল্পটা জানে না।

---

## OPTIONAL BEATS (add if the VO runs short)

### X1 (after S08)
- **bg:** `archive`
- **type:** PhotoCard (second pontoon view)
- **visual:** P03 (or another public-domain pontoon photo) with a slow vertical pan; a sepia chip `~466 মি` slides along the deck.
- **vo:** দুই শহরের মধ্যে প্রায় সত্তর বছর ধরে এই ভাসমান সেতুই ছিল রোজকার ভরসা।

### X2 (after S53)
- **bg:** `paper`
- **type:** HeroBridge (deck detail)
- **visual:** The deck is shown hanging from the trusses on hangers, which pulse in pairs. A footpath chip reads `~4.6 মি`.
- **vo:** মজার ব্যাপার, সেতুর রাস্তাটা আসলে ঝুলে থাকে বিশাল কাঠামোর নিচে, উনচল্লিশ জোড়া হ্যাঙ্গারে। আর দুই পাশে প্রায় সাড়ে চার মিটার চওড়া ফুটপাথ।

### X3 (after S39) ⚠
- **bg:** `paper`
- **type:** Counter
- **visual:** A rupee counter rolls up to `₹2.5 কোটি` and a sepia chip reads `সেই আমলে`.
- **vo:** সব মিলিয়ে খরচ হয়েছিল প্রায় আড়াই কোটি টাকা, সেই আমলে এক বিপুল অঙ্ক।

---

## Fact table

Full table with sources: `research/facts.md`. Every number spoken in the VO:

| Scene | Value in script | Fact | Status |
|---|---|---|---|
| S03, S15, S23 | ~457 m main span | F13 | ✅ |
| S03, S34, S37 | 26,500 t steel | F30 | ✅ |
| S07 | 1874, Bradford Leslie | F01–F02 | ✅ |
| S10 | 1906 survey, 8/13 bullock carts | F06 | ✅ |
| S12 | 1905 · WWI delay · 1926 Act | F05, F08, F10 | ✅ |
| S14 | port authority fear: silt, ships | F11 | ✅ |
| S16 | Rendel, Palmer & Tritton; suspension design considered | F12 | ✅ |
| S21–S23 | 99 m · 143 m · 172 m · 705 m | F14–F17 | ✅ |
| S24 | work starts 1936 | F20 | ⚠ |
| S26 | 55 × 25 m, 21 shafts | F21 | ✅ |
| S25 | stiff yellow clay deep down | F22 | ✅ |
| S27 | sunk by digging inside the shafts | F23 | ✅ |
| S28 | round the clock | F25 | ⚠ |
| S30 | within 5–7.5 cm | F26 | ⚠ (cut S30 if not confirmed) |
| S31 | ~31 m and ~26.5 m | F27 | ✅ |
| S32 | November 1938 | F28 | ✅ |
| S33 | WWII the next year | F34 | ✅ |
| S34 | England ~3,000 t | F31 | ✅ |
| S35 | Tata ~23,000 t Tiscrom | F32 | ⚠ wording covers 23,000–23,500 |
| S37 | ≈ 9 in 10 parts Indian | F33 | ✅ |
| S39 | BBJ fabrication and erection | F36 | ✅ |
| S42 | ~82 m towers | F18 | ⚠ |
| S44 | creeper cranes on the upper chord | F40 | ✅ |
| S46 | end 1940 → summer 1941 | F41 | ✅ |
| S47 | riveted, no nuts/bolts | F38 | ✅ |
| S50 | 2 halves, ~86 m, ~2,000 t | F42, F45 | ✅ / ⚠ "from both sides" |
| S51 | 16 jacks × 800 t | F44 | ✅ |
| S52 | December 1941 | F43 | ⚠ |
| S54 | 20 Dec 1942 raid, more nights | F46 | ✅ |
| S55 | many fled ✂ · bridge undamaged | F47, F48 | ⚠ / ✅ |
| S56–S57 | 3 Feb 1943 · no ceremony (air-raid fear) | F49, F50 | ✅ |
| S58 | trams until 1993 | F52 | ✅ |
| S59 | Rabindra Setu, 1965 | F53 | ✅ |
| S60 | #3 in 1943 · #6 today | F54 | ✅ |
| S61 | 80+ years | F55 | ✅ |
| S39 | BBJ formed 1935 | F35 | ✅ |
| X1 | pontoon in use ~70 years (1874 → 1943) | F01, F49 | ✅ |
| X2 | 39 pairs of hangers, ~4.6 m footpaths | F56 | ⚠ |
| X3 | ₹2.5 crore | F39 | ⚠ |
