# হাওড়া ব্রিজ কীভাবে তৈরি হলো

**Format:** Bengali animated documentary-explainer, 16:9, 1920×1080, 30 fps.
**Target length:** 9:00–10:00. The real length comes from the ElevenLabs voice-over.
**Narration:** about 1,300 Bengali words in 53 scenes. Scene X1 is an optional extra for duration control.
**Hook:** S01, 0–5 s.
**Angle:** how it was **built**, told in order: floating bridge → cantilever idea → caissons → wartime steel → creeper cranes → joining in mid-river → quiet opening.

> **Originality:** this script is written from scratch from public sources. It does not reuse any existing video's script, hook, scene order or visual gags.
> **Timecodes:** the scenes have no fixed times. The ElevenLabs audio decides each scene's length.
> **Accuracy:** every number is in the fact table at the end. Rows marked ⚠ are less certain and use "প্রায়/শোনা যায়"-style wording, so check them before publishing.

## Legend

| Field | Meaning |
|---|---|
| `bg` | `night` = dusky Kolkata skyline over the river · `paper` = cream blueprint · `paper-xs` = ground/water cross-section on paper · `archive` = sepia 1870s–1940s blueprint |
| `[[word]]` / `{{word}}` | Orange keyword / red keyword |
| `vo` | Exact narration for ElevenLabs. Numbers are written as Bengali words. English names are spelled in Bengali. |
| `<HowrahBridge …>` | The parametric hero drawing from HOWRAH_BRIDGE_PROMPT.md §7.1 |

On-screen numbers use Latin digits (`26,500`, `1943`).

---

## PART 0 — HOOK + SETUP 

### S01 · HOOK
- **bg:** `night`
- **type:** HeroBridge close-up + GapCounter
- **visual:** Frame 0 is already moving: a mid-river close-up at night. Two giant truss halves hang from the left and right cantilever tips, and a bright gap glows between them. Searchlight beams sweep slowly, and the river reflection ripples below. A small Oswald counter in the corner ticks down the gap (no real unit, just tension). The camera pushes in slowly. The headline lands at 2.5 s.
- **onscreen:** kicker `মাঝ-গঙ্গায় · 1941` · headline `দু'হাজার টনের দুটো [[টুকরো]]`
- **vo:** মাঝ-গঙ্গায়, জলের অনেক ওপরে, ঝুলছে দু'হাজার টনের দুটো লোহার টুকরো। এদের জুড়তে হবে — একদম নিখুঁত মাপে।

### S02
- **bg:** `night`
- **type:** StatCounters
- **visual:** The camera pulls back to reveal the whole bridge as a silhouette. Two dark stat cards count up: 🏗 `26,500 টন · ইস্পাত` and ⚔ `1939–45 · বিশ্বযুদ্ধ`. A third chip pops under them: `নদীর বুকে কোনো পা নেই`.
- **vo:** গোটা ব্রিজে লেগেছে ছাব্বিশ হাজার পাঁচশো টন ইস্পাত। অথচ নদীর বুকে তার একটাও পা নেই। আর পুরো কাজটা হয়েছে একটা বিশ্বযুদ্ধের মাঝখানে।

### S03
- **bg:** `night`
- **type:** TitleCard over HeroBridge build
- **visual:** Behind the title, `<HowrahBridge stage>` draws itself fast, from 0 to 1 over 4 s: piers, towers, arms, span. A shine sweep crosses the title.
- **onscreen:** title `হাওড়া ব্রিজ কীভাবে [[তৈরি]] হলো`
- **vo:** আজ দেখব, এই বিশাল লোহার কাঠামো কীভাবে একটু একটু করে গড়ে উঠেছিল গঙ্গার ওপর।

### S04
- **bg:** `night`
- **type:** OpenLoop card
- **visual:** A ceremonial ribbon is stretched across a dark card, and a pair of scissors glides toward it. Just before cutting, the scissors freeze and fade. The ribbon stays uncut and a pulsing `?` appears. The card then shrinks into the top-right corner (it returns in S45).
- **onscreen:** kicker `একটা রহস্য` · headline `ফিতে কাটল না [[কেউ]]`
- **vo:** আর আছে একটা রহস্য। এত বড় একটা কাজ শেষ হলো, অথচ উদ্বোধনের দিন কেউ ফিতে কাটল না, কোনো অনুষ্ঠানও হলো না। কেন? উত্তরটা পাবেন একেবারে শেষে।

---

## PART 1 — BEFORE THE BRIDGE 

### S05
- **bg:** `archive`
- **type:** ChapterCard
- **visual:** A sepia chapter card slides in with the label `অধ্যায় ১`. A drawn river scene shows small country boats ferrying people between two banks.
- **onscreen:** kicker `অধ্যায় ১` · headline `নৌকায় [[পারাপার]]`
- **vo:** গল্পের শুরু উনিশ শতকে। তখন হাওড়া আর কলকাতার মাঝে গঙ্গা পেরোনোর ভরসা বলতে ছিল নৌকা।

### S06
- **bg:** `archive`
- **type:** ArchiveVignette build
- **visual:** A floating bridge assembles: a row of pontoon boats slides in, then deck planks drop onto them, then railings. A tiny ship icon labelled `England → Calcutta` travels along a dotted sea route in a corner inset. A calendar stamp shows `1874`.
- **onscreen:** chip `1874 · ভাসমান সেতু` · small label `স্যার ব্র্যাডফোর্ড লেসলি`
- **vo:** তারপর, আঠারোশো চুয়াত্তর সালে, তৈরি হলো একটা ভাসমান সেতু। নিচে সারি সারি ভাসমান পন্টুন, ওপরে পাতা রাস্তা। এর যন্ত্রাংশ বানানো হয়েছিল ইংল্যান্ডে, তারপর জাহাজে করে এনে জোড়া হয়েছিল এখানে। এর কারিগর, ইঞ্জিনিয়ার স্যার ব্র্যাডফোর্ড লেসলি।

### S07
- **bg:** `archive`
- **type:** ArchiveVignette mechanism
- **visual:** The middle section of the pontoon bridge unfastens and swings aside. A steamer (with a smoke puff) passes through the opening. On both banks, queues of tiny people, carts and a clock icon wait, and the clock's hands spin. Then the section swings back.
- **onscreen:** chip `জাহাজ যাবে → সেতু খুলবে` · chip (red) `দু'পাড়ে অপেক্ষা`
- **vo:** কিন্তু গঙ্গা তো শুধু মানুষের রাস্তা নয়, জাহাজেরও রাস্তা। তাই মাঝে মাঝে সেতুর একটা অংশ খুলে সরিয়ে দিতে হতো, যাতে স্টিমার যেতে পারে। আর ততক্ষণ দু'পাড়ে দাঁড়িয়ে অপেক্ষা করত মানুষ আর গাড়ি।

### S08
- **bg:** `archive`
- **type:** Comparison (2 panels)
- **visual:** Left panel: a solid pier stands in the river while silt particles drift and pile up behind it, and the river line bends (red ✕). Right panel: the floating pontoon rides the current while the silt flows past (green ✓).
- **onscreen:** headline `খুঁটি পুঁতলে [[পলি]] জমবে`
- **vo:** নদীতে পাকা খুঁটি না পোঁতারও একটা কারণ ছিল। খুঁটির চারপাশে পলি জমে নদীর চলন বদলে যেতে পারত, তাতে সমস্যা হতো জাহাজ চলাচলে। তাই ভাসমান সেতুই ছিল সেদিনের সমাধান।

### S09
- **bg:** `archive`
- **type:** CrowdGrowth
- **visual:** A year ticker runs `1874 → 1900 → 1920`. On the pontoon deck, person, cart and car icons multiply until the deck visibly dips. A warning chip pulses.
- **onscreen:** chip (red) `ভিড় সামলানো যাচ্ছে না`
- **vo:** কিন্তু শহর বাড়ছিল দ্রুত। মানুষ বাড়ল, গাড়ি বাড়ল। বিশ শতকে পৌঁছে ওই ভাসমান সেতু আর এত ভিড়ের ভার সামলাতে পারছিল না। তবু নতুন ব্রিজ না আসা পর্যন্ত, প্রায় সত্তর বছর ধরে, এই ভাসমান সেতুই ছিল দুই শহরের প্রধান যোগসূত্র।

### S10
- **bg:** `archive`
- **type:** DocumentCard + StampSeal
- **visual:** A generic drawn legal document slides in, titled `নতুন হাওড়া ব্রিজ আইন`. A round seal stamps `1926`. Two requirement lines then type in: `✓ স্থায়ী ইস্পাতের ব্রিজ` and `✓ জাহাজের রাস্তা খোলা থাকবে`.
- **onscreen:** (document + lines) · small ledger strip `1871 → 1926 · 55 বছর`
- **vo:** ভাসমান সেতুর জন্য আইন হয়েছিল আঠারোশো একাত্তরে। তার ঠিক পঞ্চান্ন বছর পরে, উনিশশো ছাব্বিশ সালে, পাস হলো নতুন হাওড়া ব্রিজ আইন। তৈরি হবে একটা স্থায়ী ইস্পাতের ব্রিজ। কিন্তু নদীর বুকে জাহাজের রাস্তা আটকানো চলবে না।

### S11
- **bg:** `archive`
- **type:** Timeline ribbon (waiting)
- **visual:** A sepia ribbon runs from `1926` to `1936`, and a pocket-watch icon spins fast. Stacks of drawn blueprint sheets pile up beside it, get crossed out and redrawn, and are finally stamped `চূড়ান্ত`.
- **onscreen:** chip `≈ 10 বছর`
- **vo:** কিন্তু আইন পাস হলেই তো ব্রিজ তৈরি হয় না। নকশা চূড়ান্ত করা, ঠিকাদার বাছাই — সব মিলিয়ে কাজ শুরু হতে লেগে গেল আরও প্রায় দশ বছর।

---

## PART 2 — THE IDEA: CANTILEVER 

### S12
- **bg:** `paper`
- **type:** ChapterCard + question
- **visual:** A chapter card `অধ্যায় ২` appears. Below it, a wide river is drawn between two banks with a dimension arrow `~457 মিটার` across it, and a big orange `?` sits over the water.
- **onscreen:** kicker `অধ্যায় ২` · headline `মাঝে সাপোর্ট ছাড়া [[কীভাবে?]]`
- **vo:** নকশার দায়িত্ব পেল ব্রিটিশ সংস্থা রেন্ডেল, পামার অ্যান্ড ট্রিটন। প্রশ্ন একটাই — মাঝনদীতে কোনো সাপোর্ট ছাড়া এত চওড়া নদী পার হবেন কীভাবে?

### S13
- **bg:** `paper`
- **type:** RulerExperiment (push → tip)
- **visual:** A table edge sits on the left with a wooden ruler lying half over the edge. An orange "push" arrow nudges the ruler outward in steps; the overhang grows, then the ruler tips and falls with a small clatter. The overhang length is marked with a dashed line.
- **onscreen:** caption only
- **vo:** একটা ছোট্ট পরীক্ষা করে দেখুন। টেবিলের কিনারায় একটা স্কেল রাখুন, অর্ধেকটা বাইরে বের করে। এবার একটু একটু করে আরও বাইরে ঠেলুন। একসময় স্কেলটা উল্টে পড়ে যাবে।

### S14
- **bg:** `paper`
- **type:** RulerExperiment (book → holds)
- **visual:** Reset. A thick book drops onto the inner end of the ruler with a thud. The push arrow returns, and this time the ruler sticks out much further without tipping. A "pull" arrow from the book highlights the counter-weight.
- **onscreen:** chip `বইয়ের ভার = টেনে ধরা`
- **vo:** এবার টেবিলের ওপরের দিকটায় একটা মোটা বই চাপা দিন। দেখবেন, স্কেলটা অনেক বেশি বাইরে বেরিয়ে থাকলেও আর পড়ছে না। বইয়ের ভার ওকে পেছন থেকে টেনে ধরে রেখেছে।

### S15
- **bg:** `paper`
- **type:** Morph: ruler → HeroBridge half
- **visual:** The ruler setup morphs into half of `<HowrahBridge>`. The table edge becomes the **tower**, the book becomes the **anchor arm** on land, and the overhang becomes the **cantilever arm** over the water. Each label appears on its matching word, with the old object ghosting under the new one.
- **onscreen:** labels `টাওয়ার` · `অ্যাঙ্কর আর্ম` · `ক্যান্টিলিভার আর্ম`
- **vo:** হাওড়া ব্রিজ দাঁড়িয়ে আছে ঠিক এই কৌশলে। টেবিলের কিনারা হলো বিশাল টাওয়ার। বই হলো ডাঙার দিকের অ্যাঙ্কর আর্ম। আর বাইরে বেরিয়ে থাকা স্কেল হলো নদীর দিকে ঝুঁকে থাকা ক্যান্টিলিভার আর্ম।

### S16
- **bg:** `paper`
- **type:** HeroBridge mirror + highlight
- **visual:** The half-bridge mirrors to the other bank. The two cantilever tips face each other, and a highlighted orange segment drops into the gap between them: the **suspended span**. A tiny callback icon shows the two hook pieces fitting into this segment.
- **onscreen:** label `সাসপেন্ডেড স্প্যান`
- **vo:** দুই পাড়ে এমন দুটো জোড়া হাত, মুখোমুখি। আর দুই হাতের ডগার মাঝখানে ঝোলে আলাদা একটা অংশ — সাসপেন্ডেড স্প্যান। শুরুতে দেখা দু'হাজার টনের টুকরো দুটো আসলে এরই দুই অর্ধেক।

### S17
- **bg:** `paper`
- **type:** DimensionDiagram + Chip
- **visual:** A dimension arrow draws between the two towers with a pill `~457 মিটার`. A globe-icon chip then pops: `1943: বিশ্বের 3য় দীর্ঘতম ক্যান্টিলিভার ব্রিজ`.
- **onscreen:** (pills)
- **vo:** দুই টাওয়ারের মাঝে প্রায় চারশো সাতান্ন মিটার ফাঁকা। চালু হওয়ার সময় এটাই ছিল পৃথিবীর তৃতীয় দীর্ঘতম ক্যান্টিলিভার ব্রিজ।

### S18
- **bg:** `paper`
- **type:** Comparison (2 panels)
- **visual:** Left panel: a generic arch bridge being built on a forest of temporary scaffolding in the water, and a ship icon is blocked (red ✕). Right panel: the cantilever arms growing outward from the towers with clear water underneath, and the ship passes (green ✓).
- **onscreen:** headline `নদীতে [[ভারা]] লাগবে না`
- **vo:** আর এই নকশার আরেকটা বড় সুবিধা আছে। ক্যান্টিলিভারের হাত টাওয়ার থেকে নিজেই বাইরের দিকে এগিয়ে যায়। তাই বানানোর সময়েও মাঝনদীতে ভারা বাঁধার দরকার পড়ে না, জাহাজের রাস্তাও খোলা থাকে।

---

## PART 3 — FOUNDATIONS: CAISSONS 

### S19
- **bg:** `paper`
- **type:** LogoMerge (generic)
- **visual:** Three plain, generic company badges (just gear, hammer and girder icons, with **no** real logos) slide together and merge into one badge with the name text and `1935`.
- **onscreen:** chip `1935` · label `ব্রেথওয়েট, বার্ন অ্যান্ড জেসপ`
- **vo:** কাজের দায়িত্ব নিতে উনিশশো পঁয়ত্রিশে তিনটে ইঞ্জিনিয়ারিং সংস্থা হাত মিলিয়ে তৈরি করল নতুন এক কোম্পানি — ব্রেথওয়েট, বার্ন অ্যান্ড জেসপ কনস্ট্রাকশন কোম্পানি।

### S20
- **bg:** `paper`
- **type:** ChapterCard + SoftSoil
- **visual:** The chapter card `অধ্যায় ৩` appears. Below it, a tower icon presses down on soft, wavy silt layers and slowly sinks, with a red wobble.
- **onscreen:** kicker `অধ্যায় ৩` · headline `সব ভার নামবে [[কোথায়?]]`
- **vo:** তিরিশের দশকের মাঝামাঝি শুরু হলো কাজ। কিন্তু এত ভারী একটা কাঠামো দাঁড়াবে কীসের ওপর? গঙ্গার পাড়ের মাটি তো নরম পলিমাটি।

### S21
- **bg:** `paper-xs`
- **type:** CrossSection (need deep foundation)
- **visual:** A cross-section of the riverbank shows soft silt layers. A dashed outline of a deep box extends far down, and a depth arrow draws downward.
- **onscreen:** chip `ভিত নামাতে হবে অনেক গভীরে`
- **vo:** এই নরম মাটির ওপর সরাসরি টাওয়ার বসালে সে ধীরে ধীরে বসে যেতে পারে। তাই দরকার ছিল এমন একটা ভিত, যা নরম মাটি ভেদ করে নেমে যাবে অনেক গভীরে।

### S22
- **bg:** `paper`
- **type:** Caisson top view + comparison
- **visual:** A top-down plan of a rectangular concrete block with a 3 × 7 grid of square cells. The cells light up one by one with a counter `1 → 21`. Dimension arrows show `~55 মিটার` × `~25 মিটার`. Five small tennis-court icons then slide in beside it and match its area.
- **onscreen:** headline `[[কেসন]]` · chips `21টা খোপ` · `≈ 5টা টেনিস কোর্ট`
- **vo:** সমাধানের নাম কেসন। একটা বিশাল কংক্রিটের বাক্স, প্রায় পঞ্চান্ন মিটার লম্বা আর পঁচিশ মিটার চওড়া। মোটামুটি পাঁচটা টেনিস কোর্ট পাশাপাশি রাখলে যতটা জায়গা হয়। আর ভেতরটা ভাগ করা একুশটা খোপে।

### S23
- **bg:** `paper-xs`
- **type:** CaissonSinking (loop × 3)
- **visual:** Side cross-section of the caisson sitting on the ground surface, with open cells and a sharp cutting edge at the bottom. Bucket icons on cables dip into the cells and lift soil out, and the box steps down. New concrete layers then stack on top, in an orange flash. This repeats 3 times while a depth ruler on the side increases.
- **onscreen:** step chips `মাটি তোলো → বাক্স নামে → ওপরে গাঁথো`
- **vo:** বাক্সটা বানানো শুরু হয় মাটির ওপরেই। তারপর খোপগুলোর ভেতর থেকে মাটি তুলে তুলে বাইরে ফেলা হয়। নিচের মাটি সরতেই নিজের ভারে বাক্সটা একটু একটু করে নামতে থাকে। আর ওপরে গাঁথা হতে থাকে নতুন কংক্রিট। শেষে গোটা বাক্সটা হয়ে যায় একটাই অখণ্ড ভিত, ইঞ্জিনিয়ারদের ভাষায় মনোলিথ।

### S24
- **bg:** `paper-xs`
- **type:** DepthCompare
- **visual:** Two caissons sit side by side underground. The Howrah one is labelled `~26.5 মিটার` and the Kolkata one `~31.4 মিটার`, with dimension arrows from ground level. Beside them, a flat silhouette of the Shaheed Minar is drawn sunk into the ground, with its 2/3 line matching the deeper caisson.
- **onscreen:** pills `হাওড়া ~26.5 মি` · `কলকাতা ~31.4 মি` · chip `শহিদ মিনারের প্রায় ⅔`
- **vo:** এভাবে নামতে নামতে হাওড়ার দিকের কেসন পৌঁছল মাটির প্রায় সাড়ে ছাব্বিশ মিটার নিচে। আর কলকাতার দিকেরটা একত্রিশ মিটারেরও বেশি। কলকাতার শহিদ মিনারকে মাটিতে পুঁতলে তার প্রায় তিন ভাগের দুই ভাগ ঢুকে যেত এই গভীরতায়।

### S25
- **bg:** `paper-xs`
- **type:** CellView + YearCard
- **visual:** The camera pushes into one cell: tiny anonymous worker pictograms, hanging lamps, buckets going up, and a sun/moon icon cycling to show day and night work. The camera then pulls out to both finished foundations, and a calendar chip pops: `1938`.
- **onscreen:** chip `ভিত প্রস্তুত · 1938`
- **vo:** খোপের ভেতর দিনরাত চলত কাজ। শেষ পর্যন্ত, উনিশশো আটত্রিশের শেষ দিকে, তৈরি হয়ে গেল দুই পাড়ের ভিত। টাওয়ারের সব ভার একদিন নেমে যাবে এই দুটো বাক্সে। এবার ওপরে ওঠার পালা।

---

## PART 4 — STEEL AND THE WAR 

### S26
- **bg:** `night`
- **type:** ChapterCard + YearSlam
- **visual:** A chapter card `অধ্যায় ৪` appears. The big year `1939` slams in red, the skyline dims, and searchlights switch on.
- **onscreen:** kicker `অধ্যায় ৪` · headline `{{বিশ্বযুদ্ধ}} শুরু`
- **vo:** কিন্তু ঠিক তখনই, উনিশশো উনচল্লিশে, শুরু হয়ে গেল দ্বিতীয় বিশ্বযুদ্ধ।

### S27
- **bg:** `night`
- **type:** ShipRoute
- **visual:** A stylised sea map shows a cargo ship with steel beams sailing from `England` toward `Calcutta`. A red `যুদ্ধ` barrier appears mid-route and most of the cargo fades from the ship. A counter shrinks to `~3,000 টন`.
- **onscreen:** chip (red) `ইংল্যান্ড থেকে মাত্র ~3,000 টন`
- **vo:** ব্রিজের ইস্পাত আসার কথা ছিল মূলত ইংল্যান্ড থেকে। কিন্তু যুদ্ধের কাজে ইংল্যান্ডের ইস্পাত তখন অন্যদিকে চলে যাচ্ছে। ব্রিজের জন্য পাঠানো গেল মাত্র তিন হাজার টনের মতো।

### S28
- **bg:** `night`
- **type:** AppWindow `স্টিল অর্ডার` (dark)
- **visual:** A dark app window has two supplier rows with progress bars. The England row sits short and red at `~3,000 t`. The cursor clicks `+ টাটা স্টিল`, and that row fills green to `~23,000 t` with a badge `Tiscrom`. A total line counts up to `26,500 টন`.
- **onscreen:** window title `স্টিল অর্ডার`
- **vo:** বাকি প্রায় তেইশ হাজার টন ইস্পাত দিল ভারতেরই টাটা স্টিল। বিশেষ ধরনের উচ্চ ক্ষমতার ইস্পাত, নাম টিসক্রম। যুদ্ধের এমন টানাটানির সময়ে দেশি কারখানা থেকে এতটা ইস্পাত — ভারতের শিল্পের ইতিহাসেও এ এক গর্বের অধ্যায়।

### S29
- **bg:** `night`
- **type:** RailMap
- **visual:** A generic stylised map (no real tiles) shows a dashed route from `জামশেদপুর` to `কলকাতা`, with steel-beam icons travelling along it in a loop.
- **onscreen:** labels `জামশেদপুর` → `কলকাতা`
- **vo:** জামশেদপুরের কারখানা থেকে সেই ইস্পাত এসে পৌঁছতে লাগল কলকাতায়।

### S30
- **bg:** `paper`
- **type:** Workshops
- **visual:** Four small workshop icons in a row are labelled `কারখানা 1–4`. Steel bars enter, get cut (sparks), and come out as numbered truss members (`A-12`, `B-07` …) that stack in neat piles. A company chip appears.
- **onscreen:** chip `কলকাতায় 4টে কারখানা`
- **vo:** এরপর ব্রেথওয়েট, বার্ন অ্যান্ড জেসপের চারটে আলাদা কারখানায় সেই ইস্পাত কেটে, ছেঁটে তৈরি হলো অসংখ্য টুকরো। কোন টুকরো কোথায় বসবে, সবই আগে থেকে ঠিক করা।

---

## PART 5 — RAISING THE BRIDGE 

### S31
- **bg:** `paper`
- **type:** ChapterCard
- **visual:** A chapter card `অধ্যায় ৫` appears. The two finished foundations are drawn, with the steel piles beside them.
- **onscreen:** kicker `অধ্যায় ৫` · headline `এবার [[আকাশের]] দিকে`
- **vo:** ভিত তৈরি, ইস্পাত তৈরি। এবার শুরু হলো আসল কাজ — আকাশের দিকে লোহা গাঁথা।

### S32
- **bg:** `paper`
- **type:** HeroBridge (towers rise)
- **visual:** `<HowrahBridge parts={{piers, towers}}>` shows the two towers rising panel by panel from the caissons. A height arrow draws up the side with the pill `80+ মিটার`.
- **onscreen:** pill `80+ মিটার`
- **vo:** প্রথমে দুই পাড়ের ভিতের ওপর মাথা তুলল দুটো বিশাল টাওয়ার। একেকটা আশি মিটারেরও বেশি উঁচু। তার মাথা থেকে নিচে তাকালে গঙ্গা, আর সামনে গোটা শহর।

### S33
- **bg:** `paper`
- **type:** HeroBridge (anchor arms) + CreeperCrane intro
- **visual:** The anchor arms build on the land side of each tower. A small crane then appears **on top of** the upper chord, highlighted orange with a label. It does a little "crawl" motion along the top.
- **onscreen:** label `ক্রিপার ক্রেন` · headline `যে ক্রেন নিজেই [[হাঁটে]]`
- **vo:** তারপর কাজ শুরু হলো দুই পাড়ের অ্যাঙ্কর আর্ম থেকে। আর এখানেই আসে সবচেয়ে মজার যন্ত্রটা — ক্রিপার ক্রেন। এমন একটা ক্রেন, যে ব্রিজের ওপরের কাঠামো বেয়ে নিজেই হামাগুড়ি দিয়ে এগিয়ে যায়।

### S34
- **bg:** `night`
- **type:** HeroBridge erection (camera fly-along)
- **visual:** This is the centerpiece. The camera flies along the left cantilever arm. Each cycle, the creeper crane lowers its hook, lifts a numbered member from a barge below, places it, a hot rivet glows, the panel locks with a clank, and the crane steps forward onto the new panel. Both arms extend from both banks, mirrored, while a gap counter in the corner shrinks.
- **onscreen:** chip `তোলো → বসাও → রিভেট → এগোও`
- **vo:** ক্রেনটা নিচ থেকে একটা লোহার টুকরো তুলে এনে সামনে বসিয়ে দেয়। জোড়ে বসে গনগনে গরম রিভেট। টুকরোটা পাকাপাকি আটকে যেতেই ক্রেন সেই নতুন অংশের ওপর উঠে আরও এক ধাপ এগিয়ে যায়। এভাবে নিজের বানানো রাস্তার ওপর দিয়েই ক্রেন এগোতে থাকে মাঝনদীর দিকে। তোলা, বসানো, রিভেট — একের পর এক, দিনের পর দিন।

### S35
- **bg:** `paper`
- **type:** Callback: ruler + book overlay
- **visual:** A ghosted ruler-and-book from S14 overlays one half of the bridge. A pull arrow on the anchor arm and a down arrow on the cantilever tip pulse in balance, like a seesaw indicator.
- **onscreen:** chip `পেছনের ভার টেনে ধরে`
- **vo:** যত বাইরে এগোয়, ততই কাজে লাগে সেই স্কেল আর বইয়ের কৌশল। পেছনের অ্যাঙ্কর আর্ম টেনে ধরে রাখে, তাই নদীর ওপর ঝুঁকে থাকা হাত পড়ে যায় না।

### S36
- **bg:** `paper`
- **type:** Timeline ribbon
- **visual:** A horizontal ribbon runs from `শেষ 1940` to `গ্রীষ্ম 1941`. A progress bar for each arm fills to 100% and a green ✓ appears.
- **onscreen:** `1940 → 1941` · ✓ `ক্যান্টিলিভার আর্ম তৈরি`
- **vo:** উনিশশো চল্লিশের শেষে শুরু হয়ে, উনিশশো একচল্লিশের গ্রীষ্মে তৈরি হয়ে গেল দুই পাড়ের ক্যান্টিলিভার আর্ম।

### S37
- **bg:** `night`
- **type:** HeroBridge (arms complete, gap)
- **visual:** A wide night shot of both arms reaching over the water, with a large glowing gap in the middle and boats moving below as ambient motion.
- **onscreen:** headline `মাঝে এখনও [[ফাঁক]]`
- **vo:** নদীর ওপর এখন মুখোমুখি দাঁড়িয়ে দুটো লোহার হাত। কিন্তু মাঝখানে তখনও একটা বিরাট ফাঁক।

---

## PART 6 — MEETING IN THE MIDDLE 

### S38
- **bg:** `paper`
- **type:** HeroBridge (suspended span halves)
- **visual:** From each cantilever tip, half of the suspended span builds outward. Each half gets two counters: `~86 মিটার` and `~2,000 টন`.
- **onscreen:** pills `~86 মি` · `~2,000 টন` (× 2)
- **vo:** সেই ফাঁক জুড়তে দুই হাতের ডগা থেকে বাড়ানো হলো সাসপেন্ডেড স্প্যানের দুই অর্ধেক। একেকটা প্রায় ছিয়াশি মিটার লম্বা, ওজন প্রায় দু'হাজার টন।

### S39
- **bg:** `night`
- **type:** Hook bookend (same composition as S01)
- **visual:** This is exactly the S01 framing, now with context labels. The gap counter is near zero, the music drops to a low drone, and the camera holds still with tension.
- **onscreen:** kicker `সেই মুহূর্ত` · headline `মিলতেই হবে [[নিখুঁত]]`
- **vo:** এবার সেই মুহূর্ত, যেটা দিয়ে শুরু করেছিলাম। মাঝ-গঙ্গায় মুখোমুখি দু'হাজার টনের দুটো টুকরো। সামান্য এদিক-ওদিক হলেই জোড়া লাগবে না।

### S40
- **bg:** `paper`
- **type:** AppWindow `জ্যাক কন্ট্রোল`
- **visual:** A grid of 16 jack icons, each labelled `800 t`. The cursor clicks `চালু`, and the jacks pulse in sequence. A side diagram shows the two halves inching together, with a gap readout counting down to `0` and a final **clank** with a green flash.
- **onscreen:** window title `জ্যাক কন্ট্রোল` · chips `16টা হাইড্রলিক জ্যাক` · `একেকটা 800 টন`
- **vo:** এই কাজে লাগানো হলো ষোলোটা হাইড্রলিক জ্যাক, একেকটার ক্ষমতা আটশো টন। জ্যাকের সাহায্যে ধীরে ধীরে, মাপে মাপে, দুই অর্ধেককে মিলিয়ে দেওয়া হলো এক জায়গায়। সবকটা জ্যাক চালাতে হতো সমান তালে, যাতে কোনো দিকে বাড়তি চাপ না পড়ে।

### S41
- **bg:** `paper`
- **type:** CalendarCard + full bridge
- **visual:** A calendar card `ডিসেম্বর · 1941` drops in. The complete `<HowrahBridge stage=1>` glows once from end to end.
- **onscreen:** ✓ chip `দুই পাড় এক হলো`
- **vo:** উনিশশো একচল্লিশের ডিসেম্বরে, দুই পাড় অবশেষে জুড়ে গেল লোহার বাঁধনে। আর সেই একই মাসে জাপান নেমে পড়ল বিশ্বযুদ্ধে — বিপদ এগিয়ে আসতে লাগল কলকাতার দিকেও।

### S42
- **bg:** `night`
- **type:** HeroBridge finishing + slow pull-back
- **visual:** The road deck slides in along the bridge, railings tick in, and deck lamps switch on one by one. The camera then pulls back slowly to the full bridge in silhouette.
- **onscreen:** chips `রাস্তা` · `রেলিং` · `আলো`
- **vo:** দুই পাড় জুড়ে গেলেও কাজ তখনও শেষ নয়। এরপর পাতা হলো রাস্তা, বসল রেলিং আর আলো। বহু বছরের খাটুনি আর হাজারো মানুষের হাতে, গঙ্গার ওপর দাঁড়িয়ে গেল এক লোহার রামধনু।

---

## PART 7 — WAR AND THE QUIET OPENING 

### S43
- **bg:** `night`
- **type:** BlackoutCity + Searchlights
- **visual:** The city windows switch off row by row. Searchlights cross the sky and a distant plane silhouette passes high above. Muffled siren SFX.
- **onscreen:** kicker `অধ্যায় ৬` · headline `আকাশে [[শত্রুর]] ভয়`
- **vo:** কিন্তু যুদ্ধ তখন একেবারে দোরগোড়ায়। রাতে শহরের আলো নিভিয়ে রাখা হয়, আকাশে সার্চলাইট খোঁজে শত্রুর বিমান। উনিশশো বিয়াল্লিশের ডিসেম্বরে কলকাতায় জাপানি বিমান হামলাও হয়।

### S44
- **bg:** `night`
- **type:** Spotlight on bridge
- **visual:** A searchlight beam sweeps toward the bridge silhouette, and the bridge dims to stay hidden. An eye icon with a red slash appears.
- **onscreen:** chip `ধুমধাম = শত্রুর নজর`
- **vo:** এমন সময়ে এত বড় একটা ব্রিজ নিয়ে ধুমধাম করা মানেই শত্রুর নজর টেনে আনা।

### S45
- **bg:** `paper`
- **type:** Calendar + OpenLoop payoff
- **visual:** A calendar `ফেব্রুয়ারি · 3 · 1943` appears. The ribbon card from S04 flies back from the corner. The scissors are put away, the ribbon is simply lifted aside, and a gate on the bridge swings open quietly.
- **onscreen:** headline `ফিতে কাটা [[ছাড়াই]]`
- **vo:** তাই উনিশশো তেতাল্লিশের তেসরা ফেব্রুয়ারি, কোনো অনুষ্ঠান ছাড়াই, চুপচাপ ব্রিজটা খুলে দেওয়া হলো সাধারণ মানুষের জন্য। এটাই সেই রহস্যের উত্তর — যুদ্ধের জন্যই সেদিন কেউ ফিতে কাটেনি।

### S46
- **bg:** `night`
- **type:** Tram crossing
- **visual:** A simple period tram silhouette with a bell glint crosses the deck from left to right. Pedestrians and carts follow, and deck lights come on one by one.
- **onscreen:** chip `প্রথম যাত্রী: ট্রাম?` → then `তারপর মানুষের স্রোত`
- **vo:** শোনা যায়, এই ব্রিজের ওপর দিয়ে প্রথম পার হয়েছিল একটা ট্রাম। তারপর একে একে মানুষ আর গাড়ির স্রোত।

---

## PART 8 — LEGACY 

### S47
- **bg:** `paper`
- **type:** NameCard
- **visual:** A calendar `14 জুন 1965` appears, then a name plaque reveals `রবীন্দ্র সেতু`, with `হাওড়া ব্রিজ` written smaller beneath it in handwriting style.
- **onscreen:** plaque `রবীন্দ্র সেতু`
- **vo:** উনিশশো পঁয়ষট্টি সালে রবীন্দ্রনাথ ঠাকুরের নামে এর নতুন নাম হলো রবীন্দ্র সেতু। যদিও আমাদের কাছে সে আজও হাওড়া ব্রিজ।

### S48
- **bg:** `night`
- **type:** Today + YearCounter
- **visual:** Today's night skyline, with dense traffic lights streaming across the bridge. A year counter runs `1943 → আজ`, landing on the chip `80+ বছর`. A small tram icon with `1993 ✕` fades in and out.
- **onscreen:** chip `80+ বছর`
- **vo:** আশি বছরেরও বেশি পেরিয়ে গেছে। ট্রাম চলা বন্ধ হয়েছে সেই উনিশশো তিরানব্বইয়ে। কিন্তু ব্রিজটা আজও রোজ বয়ে নিয়ে যায় অসংখ্য মানুষ আর গাড়ি।

---

## PART 9 — RECAP + CTA 

### S49
- **bg:** `paper`
- **type:** Checklist
- **visual:** Three rows slide in, each getting a green ✓:
  1. ⬇ `মাটির ~30 মিটার নিচে ভিত`
  2. 🏭 `যুদ্ধের মাঝে দেশি ইস্পাত`
  3. 🤝 `দুই পাড়ের হাত মিলল মাঝনদীতে`
- **onscreen:** headline `ফিরে [[দেখা]]`
- **vo:** তাহলে ফিরে দেখা যাক। মাটির প্রায় তিরিশ মিটার নিচে নামানো বাক্সের ওপর ভিত। যুদ্ধের মাঝখানে দেশি ইস্পাত। আর দুই পাড় থেকে এগিয়ে আসা দুটো হাত, যারা মিলল ঠিক মাঝনদীতে।

### S50
- **bg:** `night`
- **type:** Bookend (S01 framing, finished)
- **visual:** The S01 composition again, now complete and joined, with traffic flowing. The camera slowly pulls back to the full bridge.
- **onscreen:** caption only
- **vo:** পরের বার হাওড়া ব্রিজ পার হওয়ার সময়, মাঝখানটায় একবার তাকাবেন। ঠিক ওখানেই একদিন জুড়েছিল দু'হাজার টনের দুটো টুকরো।

### S51
- **bg:** `paper`
- **type:** CommentBoxCTA
- **visual:** A comment box types `পরের ভিডিও কী নিয়ে?`, and the cursor clicks `পাঠান`.
- **onscreen:** headline `এরপর কোনটা কীভাবে [[তৈরি]] হলো?`
- **vo:** এরপর কোন জিনিস কীভাবে তৈরি হয়েছিল, জানতে চান? কমেন্টে লিখে জানান।

### S52
- **bg:** `night`
- **type:** SocialFollowCards
- **vo:** আর এমন আরও গল্পের জন্য চ্যানেলটা সাবস্ক্রাইব করে রাখুন।

### S53 (end card, +3 s hold)
- **bg:** `paper`
- **type:** ShareEndCard
- **visual:** The pastel full bridge sits at the bottom. The headline types in, and the cursor clicks an orange `শেয়ার করুন`.
- **onscreen:** headline `রোজ হাওড়া ব্রিজ পার হয় যে [[বন্ধু]]`
- **vo:** আর যে বন্ধু রোজ এই ব্রিজ পার হন, ভিডিওটা তাঁকে পাঠিয়ে দিন।

---

## Duration control (after the ElevenLabs audio is measured)

- **Under 9:00:** first set the ElevenLabs speed to 0.95 and regenerate, then add X1 if still short.
- **Over 10:00:** cut the ✂ lines first, or set the ElevenLabs speed to 1.05.

**Optional scene:**

- **X1 (after S25), `paper-xs`:** the cutting edge of the caisson slicing into silt (close-up).
  - **vo:** "বাক্সের একেবারে নিচের কিনারাটা ছুরির মতো সরু রাখা হয়, যাতে নিজের ভারে মাটি কেটে কেটে সহজে নামতে পারে।" *(This is generic open-caisson practice. Verify before use.)*

**Lines to cut if over (✂):**

- S06: the last sentence (the engineer's name)
- S30: the last sentence
- S43: the last sentence (the Japanese raid)

---

## Fact table (verify before publishing)

| Claim | Value in script | Status | Source |
|---|---|---|---|
| Pontoon bridge | 1874, by Sir Bradford Leslie. Parts made in England and assembled in Calcutta. Section opened to let steamers pass. | ✅ | Wikipedia (Howrah Bridge); Grace's Guide; FIBIS |
| Why floating, not piers | Avoid silting that permanent piers might cause | ✅ (stated as the reason for the floating design) | Wikipedia; Banglapedia |
| New bridge law | New Howrah Bridge Act, 1926 | ✅ | Wikipedia; Banglapedia |
| Requirement to keep shipping open | "জাহাজের রাস্তা আটকানো চলবে না" | ⚠ consistent with the history, check the wording | Wikipedia |
| Design consultants | Rendel, Palmer & Tritton | ⚠ verify | Wikipedia |
| Construction start | "তিরিশের দশকের মাঝামাঝি" (1936 or 1937) | ✅ (range covers both) | BBJ; Wikipedia |
| Main span | ~457 m (1,500 ft) | ✅ | Wikipedia; BBJ |
| 3rd-longest cantilever bridge in 1943 | ✅ | ✅ | Wikipedia |
| Caissons | ~55.31 × 24.8 m, 21 cells (each 6.25 m square) | ✅ | BBJ; Scribd study |
| Caisson depth | Howrah ~26.53 m, Kolkata ~31.41 m | ✅ | BBJ |
| Tennis-court comparison | 55.31 × 24.8 ≈ 1,372 m²; court 23.77 × 10.97 ≈ 261 m² → ≈ 5.3 | ✅ arithmetic | — |
| Shaheed Minar | ~48 m tall → 31.4 m ≈ ⅔ | ⚠ check the height | — |
| Foundations finished | Late 1938 | ⚠ (two secondary sources) | Scribd study; techno-science.net |
| WWII start | 1939 | ✅ | — |
| Steel | 26,500 t total; Britain ~3,000 t; Tata ~23,000 t "Tiscrom" | ✅ / ⚠ (some say 23,500) | Wikipedia; BBJ; The Better India |
| Tata plant | Jamshedpur | ✅ | — |
| Fabrication | 4 workshops in Calcutta, by Braithwaite, Burn & Jessop | ✅ | BBJ |
| Towers | "80+ মিটার" (280 ft above the monoliths ≈ 85 m; some sources say ~80 m) | ✅ (wording covers both) | Wikipedia |
| Erection method | Started at the anchor spans and advanced to the centre with creeper cranes on the upper chord | ✅ | Wikipedia |
| Cantilever arms | Erection from end 1940 to mid-summer 1941 | ⚠ (secondary sources) | Scribd study |
| Suspended span halves | Each ~86 m (282 ft), ~2,000 t | ✅ | Wikipedia |
| Joining | 16 hydraulic jacks, 800 t capacity each | ✅ | Wikipedia |
| Japan enters WWII | December 1941 | ✅ (Pearl Harbor, 7 Dec 1941) | — |
| Pontoon-bridge law | 1871 (Bengal Act IX of 1871) → 55 years before 1926 | ✅ | Wikipedia; Banglapedia |
| Joined | December 1941 | ⚠ (sources say the halves were "built/joined" in Dec 1941) | Wikipedia |
| Blackout, searchlights, Japanese raids on Calcutta | December 1942 | ⚠ verify the raid date | — |
| Opening | 3 Feb 1943, no ceremony, low-key because of the war | ✅ | Wikipedia; Gulf News / Gulf Times (75th) |
| First vehicle a tram | "শোনা যায়" | ⚠ (one source) | Holidify |
| Trams stopped | 1993 | ✅ | Wikipedia |
| Renamed | Rabindra Setu, 14 June 1965 | ✅ | Wikipedia |
