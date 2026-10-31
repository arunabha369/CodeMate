# গঙ্গার নিচে মেট্রো — নদীর তলা দিয়ে ট্রেন চলে কীভাবে?

**Format:** Bengali animated explainer, 16:9, 1920×1080, 30 fps
**Target length:** 9:00–10:00 (planned about 9:30)
**Narration:** about 1,300 Bengali words (main scenes) plus about 80 optional words (X1–X3). At 140–150 words per minute with scene pauses, that is about 9:00–9:35.
**Hook:** first 5 seconds (S01)

> This script is original. The topic, facts, story structure and lines differ from the reference video.
> Only the *visual format* (night skyline + cream blueprint scenes, kinetic Bengali headlines, UI-card mockups, cursor, stat counters) is reused.

## Legend (for Claude Code)

| Field | Meaning |
|---|---|
| `bg` | `night` = dark navy skyline + river · `paper` = cream blueprint paper · `night-xs` / `paper-xs` = cross-section (river on top, soil layers below) |
| `type` | Scene template from PROMPT.md §5 |
| `kicker` | Small label above the headline with a short leading dash (`— ...`) |
| `[[word]]` | Keyword in **orange/amber** accent |
| `{{word}}` | Keyword in **red** (danger / negation) |
| `vo` | Narration text exactly as it should be spoken. Numbers are written as Bengali words for correct TTS. |
| `cap` | Optional: how to chunk the bottom caption pill (default = auto-chunk the `vo`) |
| timecodes | Planning estimates only. **Real timing comes from the voice-over audio.** |

On-screen numbers use **Latin digits with Indian grouping** (`1,00,000`, `520`, `2017`), matching the reference style. Spoken numbers are in Bengali words.

---

## PART 0 — HOOK (0:00–0:26)

### S01 · HOOK · 0:00–0:05
- **bg:** `night-xs`
- **type:** CrossSection (animated from frame 1, no fade-in)
- **visual:** Frame 1 is already moving. The Hooghly is a dark band across the top third, with a ferry silhouette sliding left→right and soft ripples on the surface. Below it are layered mud and sand with floating specks. A twin-tunnel tube glows faintly, and a bright train (warm window lights) streaks through it. At 0:02 a stat chip pops top-left with the depth arrow drawing down: `30+ মিটার · জলের নিচে`. At 0:03.5 the headline slams in word by word.
- **onscreen:** kicker `এই মুহূর্তে` · headline `মাথার ওপর আস্ত একটা [[নদী]]`
- **vo:** এই মুহূর্তে, এই ট্রেনটার মাথার ঠিক ওপর দিয়ে বয়ে যাচ্ছে আস্ত একটা নদী।

### S02 · 0:05–0:12
- **bg:** `night`
- **type:** StatCounters
- **visual:** Wide skyline at dusk with the river and its reflection. Two stat cards count up, staggered: 🚇 `520 মিটার · নদীর নিচে সুড়ঙ্গ` and ⏱ `45 সেকেন্ড · পুরো নদী পার`.
- **onscreen:** (cards only)
- **vo:** পাঁচশো কুড়ি মিটার লম্বা সুড়ঙ্গ। আর ট্রেন পুরো নদীটা পার করে মাত্র পঁয়তাল্লিশ সেকেন্ডে।

### S03 · 0:12–0:20
- **bg:** `paper-xs`
- **type:** DiagramReveal + NegationIcon
- **visual:** Flat cross-section: water (#CED8E2), river-bed line, mud layers. A dashed tunnel ring sits inside the mud. Three labels pop around it: `কাদা`, `ভেজা বালি`, `জলের চাপ`. Then a hairline crack appears on the ring and a red pulse plays, while blue water arrows try to push in.
- **onscreen:** kicker `চারদিকে` · headline `শুধু কাদা, বালি আর [[জল]]`
- **vo:** চারদিকে শুধু নরম কাদা, ভেজা বালি, আর নদীর জলের প্রচণ্ড চাপ। একটা ছোট্ট ফাটল — ব্যস, গোটা নদীটা ঢুকে পড়তে পারে সুড়ঙ্গের ভেতরে।

### S04 · 0:20–0:26
- **bg:** `night`
- **type:** TitleCard
- **visual:** Camera pushes slowly toward a glowing tunnel ring that sits in the river reflection. The title assembles word by word, then a subtle shine sweeps across it.
- **onscreen:** headline (very large) `গঙ্গার নিচে [[মেট্রো]]`
- **vo:** অথচ ভেতরে বসে থাকা যাত্রীর গায়ে একফোঁটা জলও লাগে না। এটাই ভারতের প্রথম নদীর নিচের মেট্রো।

---

## PART 1 — THE QUESTION + TEASER (0:26–0:55)

### S05 · 0:26–0:36
- **bg:** `paper`
- **type:** KineticHeadline + Diagram
- **visual:** Cross-section again. A shovel icon tries to dig at the river bed and water floods into the hole (quick loop). The headline reveals word by word.
- **onscreen:** kicker `আসল প্রশ্ন` · headline `নদীর নিচে গর্ত খুঁড়বেন [[কীভাবে]]?`
- **vo:** কিন্তু প্রশ্নটা হলো — একটা চলমান নদীর নিচে আপনি গর্ত খুঁড়বেন কীভাবে? যাতে ওপরের পুরো নদীটা হুড়মুড় করে নিচে নেমে না আসে?

### S06 · 0:36–0:55
- **bg:** `night`
- **type:** IconCards (3 cards → teaser)
- **visual:** Three dark cards slide in: 💧 `জল`, ⬇ `চাপ`, 🌑 `অন্ধকার`. Each one blurs out and fades. A fourth card appears with a pulsing `?`, glowing red, and a label slides under it.
- **onscreen:** kicker `মজার ব্যাপার` · headline `সবচেয়ে বড় বিপদ [[নদীতে]] নয়` · card label `অন্য কোথাও…`
- **vo:** আর মজার ব্যাপার কী জানেন? এই গোটা প্রজেক্টের সবচেয়ে বড় বিপদটা কিন্তু নদীর নিচে ঘটেনি। ঘটেছিল নদী পেরিয়ে, শুকনো ডাঙায়, কলকাতার এক পুরনো পাড়ার ঠিক নিচে। সেই গল্পে আসছি একটু পরে। আগে জানা যাক, নদীর নিচে সুড়ঙ্গ বানানোর দরকারটাই বা পড়ল কেন।

---

## PART 2 — TWO CITIES, ONE RIVER (0:55–2:05)

### S07 · 0:55–1:03
- **bg:** `paper`
- **type:** MapDiagram
- **visual:** A stylised top-down map with a vertical light-blue river ribbon. The left bank label is `হাওড়া`, the right bank label is `কলকাতা`. Small building blocks rise on both banks.
- **onscreen:** kicker `শুরুর কথা` · headline `দুই শহর, মাঝখানে [[নদী]]`
- **vo:** গল্পটা শুরু করা যাক একদম গোড়া থেকে। গঙ্গার এক পাড়ে হাওড়া, অন্য পাড়ে কলকাতা।

### S08 · 1:03–1:13
- **bg:** `night`
- **type:** StatCounters + CrowdGrid
- **visual:** A station building silhouette on the left bank. A grid of tiny person icons fills in rapidly, like the reference's "people and cars" grid but with only people and train icons. A label sits in a chip.
- **onscreen:** chip `দেশের ব্যস্ততম স্টেশনগুলোর একটা`
- **vo:** হাওড়া স্টেশন দেশের সবচেয়ে ব্যস্ত রেল স্টেশনগুলোর একটা। রোজ লক্ষ লক্ষ মানুষ এখানে ট্রেন থেকে নামেন, তারপর নদী পেরিয়ে কলকাতায় যান কাজে।

### S09 · 1:13–1:23
- **bg:** `paper`
- **type:** IconCards (2 options, both "bad")
- **visual:** Two white cards. Card 1 is a bridge icon with a red traffic-jam strip. Card 2 is a ferry icon with a queue of people and a clock. Both get small red `ধীর` tags.
- **onscreen:** headline `পারাপারের রাস্তা [[হাতে গোনা]]`
- **vo:** কিন্তু নদী পেরোনোর রাস্তা হাতে গোনা। ব্রিজে গাড়ির লম্বা লাইন, ফেরিঘাটে মানুষের ভিড়। দূরত্ব সামান্য, কিন্তু সময় লেগে যায় অনেকটা।

### S10 · 1:23–1:36
- **bg:** `paper`
- **type:** YearTimeline
- **visual:** The big year `1984` counts up in the Oswald-style condensed font. Under it a timeline line draws and a dot lands. Next to it a simple north–south line (vertical) draws on a mini map. It stays on the Kolkata side and does not touch the river.
- **onscreen:** `1984` · label `ভারতের প্রথম মেট্রো` · map tag `শুধু শহরের ভেতরে`
- **vo:** অথচ ভারতের প্রথম মেট্রো কিন্তু চালু হয়েছিল এই কলকাতাতেই, উনিশশো চুরাশি সালে। তবে সেই মেট্রো চলত শহরের ভেতরে, উত্তর থেকে দক্ষিণে। নদীর ওপারে হাওড়ায় সে কোনোদিন যায়নি।

### S11 · 1:36–1:48
- **bg:** `paper`
- **type:** AppWindow (route planner)
- **visual:** A macOS-style app window titled `নতুন লাইন`. Inside is a mini map. The cursor moves in and clicks a `+ রুট` button. A green line then draws from `সল্টলেক সেক্টর ফাইভ` (right) toward `হাওড়া ময়দান` (left), and the route hits the river ribbon.
- **onscreen:** window header `ইস্ট-ওয়েস্ট মেট্রো`
- **vo:** তাই পরিকল্পনা হলো একটা নতুন লাইনের — ইস্ট-ওয়েস্ট মেট্রো। পুব দিকে সল্টলেকের সেক্টর ফাইভ, আর পশ্চিমে নদী পেরিয়ে একেবারে হাওড়া ময়দান।

### S12 · 1:48–2:05
- **bg:** `paper` (same window, continues)
- **type:** AppWindow (toggle decision)
- **visual:** A panel slides in with the title `নদী পার হবে কীভাবে?` and two toggle rows. The cursor hovers `নদীর ওপর দিয়ে`, the toggle flicks ON, then a red shake and it turns OFF with the tag `মাটির নিচ থেকে আবার উঠতে হবে`. The cursor clicks `নদীর নিচ দিয়ে` and the toggle turns green ✓.
- **onscreen:** kicker `সিদ্ধান্ত` · headline `শর্তটা [[কঠিন]]`
- **vo:** কিন্তু মাঝখানে তো গঙ্গা। এদিকে শহরের ভেতরের লাইনটা আসছে পুরোটাই মাটির নিচ দিয়ে। নদীর কাছে এসে হঠাৎ মাটি ফুঁড়ে ওপরে উঠে আবার ব্রিজ বানানো — সেটা ঝামেলার। তাই ইঞ্জিনিয়াররা নিলেন সবচেয়ে সাহসী সিদ্ধান্তটা। ট্রেন যেমন মাটির নিচে আছে, তেমনই থাকবে — শুধু নদীর তলা দিয়ে চলে যাবে ওপারে।

---

## PART 3 — THE SAND-HOLE EXPERIMENT (2:05–3:15)

### S13 · 2:05–2:13
- **bg:** `paper`
- **type:** PersonExperiment
- **visual:** A pictogram person (flat, dark, round head) stands on a sandy beach strip with a little toy shovel. A thought bubble shows the sea.
- **onscreen:** caption pill `একটা পরীক্ষা ভাবুন।`
- **vo:** একটা ছোট্ট পরীক্ষা ভাবুন। সমুদ্রের ধারে, ভেজা বালিতে বসে আপনি একটা গর্ত খুঁড়ছেন।

### S14 · 2:13–2:23
- **bg:** `paper-xs`
- **type:** DiagramAnimation
- **visual:** Cross-section of a small hole in wet sand. Blue droplets seep in from the sides and the water level rises inside the hole. The hole's walls slump in a soft-body slide. Sound: a little crumble.
- **onscreen:** labels `জল চুঁইয়ে ঢুকছে` (blue), `দেয়াল ধসে পড়ছে` (red)
- **vo:** কয়েক ইঞ্চি খুঁড়তেই কী হয়? চারপাশ থেকে জল চুঁইয়ে ঢুকতে থাকে। আর গর্তের দেয়ালগুলো ঝুরঝুর করে ভেঙে পড়ে ভেতরে।

### S15 · 2:23–2:33
- **bg:** `night`
- **type:** TwoChips
- **visual:** Headline first, then two big chips pop with a spring: a blue chip `১ · জল ঢুকবে` and a red chip `২ · মাটি ধসবে`.
- **onscreen:** kicker `গঙ্গার নিচে` · headline `দুটো [[শত্রু]]`
- **vo:** ঠিক এই দুটো সমস্যাই, হাজার গুণ বড় হয়ে, অপেক্ষা করছিল গঙ্গার নিচে। এক — জল ঢুকে আসবে। দুই — মাটি ধসে পড়বে।

### S16 · 2:33–2:46
- **bg:** `paper-xs`
- **type:** DepthGauge
- **visual:** A vertical depth ruler on the right with ticks `0 · 10 · 20 · 30 মিটার`. A diver/pressure-gauge icon descends. At each 10 m tick a `+1` badge pops and the gauge needle jumps.
- **onscreen:** chip `প্রতি 10 মিটারে চাপ বাড়ে ≈ 1 বায়ুমণ্ডল`
- **vo:** কারণ জলের নিচে যত নামবেন, চাপ তত বাড়বে। মোটামুটি প্রতি দশ মিটার গভীরে চাপ বাড়ে আমাদের মাথার ওপরের গোটা বায়ুমণ্ডলের সমান।

### S17 · 2:46–3:00
- **bg:** `paper`
- **type:** ComparisonStack
- **visual:** A 1 m × 1 m square tile drawn with dimension arrows (`1 মিটার`). Six flat elephant icons drop onto it one by one with a soft thud, and a counter rises `5 → 10 → … → 30 টন`.
- **onscreen:** headline `প্রতি বর্গমিটারে ~30 [[টন]]` · tag `≈ 6টা হাতি`
- **vo:** আর এই সুড়ঙ্গ যাবে জলের উপরিতল থেকে প্রায় তিরিশ মিটার নিচে। মানে সুড়ঙ্গের গায়ে প্রতিটা বর্গমিটারে চেপে বসবে প্রায় তিরিশ টন জলের চাপ। মোটামুটি ছটা হাতির ওজন — একটা টেবিলের মতো ছোট্ট জায়গায়।

### S18 · 3:00–3:15
- **bg:** `night`
- **type:** NegationIcon
- **visual:** A shovel and a simple excavator icon appear. The red circle-slash draws over each in turn. Then a glowing blueprint outline of something huge and cylindrical starts to fade in from the right edge, as a tease for the machine.
- **onscreen:** headline `সাধারণ খোঁড়াখুঁড়ি {{চলবে না}}`
- **vo:** এই চাপে কোদাল-বেলচা তো দূরের কথা, সাধারণ কোনো খোঁড়ার যন্ত্রও টিকবে না। দরকার ছিল এমন এক যন্ত্রের, যে একসঙ্গে তিনটে কাজ করবে — খুঁড়বে, চাপ ঠেকাবে, আর সঙ্গে সঙ্গে দেয়াল গেঁথে দেবে।

---

## PART 4 — THE MACHINE (3:15–4:50)

### S19 · 3:15–3:24
- **bg:** `night`
- **type:** HeroReveal
- **visual:** The TBM silhouette (a long cylinder with a big round cutter face) glides in from the right, under the skyline line. Its cutter face rotates slowly and the light rim catches the glow.
- **onscreen:** kicker `জার্মানি থেকে এল` · headline `টানেল বোরিং [[মেশিন]]`
- **vo:** উত্তর এল জার্মানি থেকে। টানেল বোরিং মেশিন — সংক্ষেপে টি-বি-এম।

### S20 · 3:24–3:32
- **bg:** `night`
- **type:** NameChips
- **visual:** Two machines side by side, each getting a big name pill that pops in: `প্রেরণা` (orange) and `রচনা` (blue).
- **onscreen:** pills `প্রেরণা` · `রচনা`
- **vo:** নদীর নিচের দুটো সুড়ঙ্গের জন্য এল দুটো যন্ত্র। নাম রাখা হলো — প্রেরণা আর রচনা।

### S21 · 3:32–3:40
- **bg:** `paper`
- **type:** SizeCompare
- **visual:** The cutter-face circle stands next to a flat two-storey house. A dimension arrow draws up the side.
- **onscreen:** tag `দোতলা বাড়ির সমান উঁচু`
- **vo:** একেকটা যন্ত্রের সামনের মুখটা প্রায় একটা দোতলা বাড়ির সমান উঁচু।

### S22 · 3:40–3:55
- **bg:** `paper`
- **type:** CutawayCallouts
- **visual:** A long side-cutaway of the TBM. Callouts draw in with leader lines, one by one, synced to the VO: ① `ঘুরন্ত কাটার-হেড` ② `মাটির চেম্বার` ③ `প্যাঁচানো স্ক্রু` ④ `রিং বসানোর হাত` ⑤ `পেছনের কারখানা`. The cutter head rotates, and its teeth glint.
- **onscreen:** kicker `ভেতর থেকে` · headline `একটা চলমান [[কারখানা]]`
- **vo:** ভেতর থেকে দেখলে এটা আসলে একটা চলমান কারখানা। সামনে একটা বিশাল ঘুরন্ত চাকা, তার গায়ে লাগানো অসংখ্য ধারালো দাঁত। চাকাটা ধীরে ধীরে ঘোরে, আর সামনের মাটি কুরে কুরে কাটে।

### S23 · 3:55–4:07
- **bg:** `paper` (same cutaway, zoom to chamber)
- **type:** FlowAnimation
- **visual:** Brown soil particles fall into the chamber, then get carried by the spiral screw backwards and dropped onto a conveyor and into small wagons. The wagons roll out to the left.
- **onscreen:** chip `কাটা মাটি → স্ক্রু → গাড়ি → বাইরে`
- **vo:** কাটা মাটি জমা হয় চাকার ঠিক পেছনের একটা চেম্বারে। সেখান থেকে একটা লম্বা প্যাঁচানো স্ক্রু মাটিটাকে টেনে নেয় পেছনে, আর ছোট ছোট গাড়িতে চাপিয়ে বের করে দেওয়া হয় সুড়ঙ্গের বাইরে।

### S24 · 4:07–4:15
- **bg:** `night`
- **type:** KineticHeadline + PushArrows
- **visual:** Centre stage: blue arrows `বাইরের চাপ` push from the left and orange arrows `ভেতরের চাপ` push from the right. They meet in the middle and stall, quivering.
- **onscreen:** kicker `আসল ম্যাজিক` · headline `চাপের সঙ্গে [[চাপের]] লড়াই`
- **vo:** কিন্তু আসল ম্যাজিকটা লুকিয়ে আছে ওই চেম্বারেই। এই যন্ত্রগুলোর নাম আর্থ প্রেশার ব্যালান্স মেশিন। নামেই রহস্যটা বলা আছে।

### S25 · 4:15–4:32
- **bg:** `paper`
- **type:** AppWindow (control panel)
- **visual:** An operator dashboard window with a line chart showing two lines, `বাইরের চাপ` (blue) and `চেম্বারের চাপ` (orange), almost overlapping. The cursor drags a slider `স্ক্রুর গতি`. When the slider goes down, the orange line rises. When it goes up, the orange line falls.
- **onscreen:** window title `চাপ নিয়ন্ত্রণ`
- **vo:** বাইরে থেকে মাটি আর জল যতটা চাপ দিচ্ছে, চেম্বারে ঠাসা কাটা মাটি দিয়ে ভেতর থেকে ঠিক ততটাই পাল্টা চাপ দেওয়া হয়। স্ক্রু একটু আস্তে ঘোরালে চেম্বারে মাটি জমে, চাপ বাড়ে। জোরে ঘোরালে মাটি বেরিয়ে যায়, চাপ কমে।

### S26 · 4:32–4:42
- **bg:** `paper` (same window)
- **type:** AppWindow (states)
- **visual:** Three state rows light up in sequence: `চাপ কম → জল-কাদা ঢুকে পড়বে` (red), `চাপ বেশি → ওপরের মাটি ফুলে উঠবে` (red), `চাপ সমান → নিরাপদ` (green ✓, glows).
- **onscreen:** (rows)
- **vo:** চাপ কম হলে জল আর কাদা হুড়মুড়িয়ে ঢুকে পড়বে। বেশি হলে ওপরের মাটি ফুলে উঠবে। তাই অপারেটররা দিনরাত স্ক্রিনে চোখ রেখে চাপটাকে রাখেন একদম সমান-সমান।

### S27 · 4:42–4:50
- **bg:** `paper-xs`
- **type:** MechanismAnimation
- **visual:** Rear view of the machine: hydraulic jack pistons extend, pressing against the last concrete ring, and the machine inches forward. This happens in 3 short pulses, with a counter `+1.5 মিটার`. (Optional: leave the number out and show the motion only.)
- **onscreen:** headline `এগোয় [[কেঁচোর]] মতো`
- **vo:** আর এগোয় কীভাবে? পেছনে লাগানো শক্তিশালী হাইড্রলিক জ্যাক আগের বসানো দেয়ালে পা ঠেকিয়ে গোটা মেশিনটাকে সামনে ঠেলে দেয়। একটু একটু করে, ঠিক কেঁচোর মতো।

---

## PART 5 — BUILDING THE WALL WHILE DIGGING (4:50–6:00)

### S28 · 4:50–4:58
- **bg:** `paper`
- **type:** KineticHeadline
- **visual:** The headline splits into two halves that slide together: `খোঁড়া` + `দেয়াল`, then `একসঙ্গে` stamps below.
- **onscreen:** headline `খোঁড়া আর দেয়াল — [[একসঙ্গে]]`
- **vo:** এবার দ্বিতীয় শত্রু — মাটি ধসে পড়া। এর সমাধানটা দারুণ সহজ। খোঁড়ার ঠিক পরেই, মেশিনের লেজের ভেতরেই দেয়াল তৈরি হয়ে যায়।

### S29 · 4:58–5:12
- **bg:** `paper`
- **type:** RingAssembly
- **visual:** Front view. Six curved concrete segments fly in one by one on the arm, each clicking into place with a counter `1/6 … 6/6`. At 6/6 the ring flashes a soft highlight and gets a `✓ একটা রিং` chip.
- **onscreen:** chip `সেগমেন্ট` · counter `6/6`
- **vo:** কারখানায় আগে থেকে বানানো বাঁকা কংক্রিটের টুকরো — একে বলে সেগমেন্ট — নিয়ে আসা হয় মেশিনের ভেতরে। একটা যান্ত্রিক হাত একটা একটা করে টুকরো তুলে গোল করে বসায়। ছটা টুকরো জুড়লে তৈরি হয় একটা পুরো রিং।

### S30 · 5:12–5:25
- **bg:** `paper`
- **type:** DimensionDiagram
- **visual:** A ring cross-section with dimension arrows: inner `5.55 মিটার`, outer `6.1 মিটার`, and a thickness callout `~27.5 সেমি`. Number pills pop in orange.
- **onscreen:** pills `5.55 মি` · `6.1 মি` · `~27.5 সেমি`
- **vo:** প্রতিটা টুকরো প্রায় সাড়ে সাতাশ সেন্টিমিটার পুরু, খুব উঁচু মানের মজবুত কংক্রিটে তৈরি। রিংয়ের ভেতরের মাপ সাড়ে পাঁচ মিটারের একটু বেশি, আর বাইরের মাপ ছয় মিটারের একটু বেশি।

### S31 · 5:25–5:40
- **bg:** `paper`
- **type:** CloseupJoint
- **visual:** A macro zoom onto the joint between two segments. A dark rubber strip along the edge highlights in orange. The two segments press together, the strips squash, and a blue water droplet trying to enter bounces off.
- **onscreen:** kicker `তাহলে ফাঁক?` · headline `জোড়ের মুখে [[রাবারের সিল]]`
- **vo:** কিন্তু টুকরো জোড়া দিলে ফাঁক তো থাকবেই। সেই ফাঁক দিয়েই তো জল ঢুকবে? এখানেই কাজ করে প্রতিটা টুকরোর কিনারায় বসানো বিশেষ রাবারের সিল। দুটো টুকরো চেপে বসলে সিলগুলোও চেপে যায় একে অপরের গায়ে — জলের ঢোকার রাস্তাই থাকে না।

### S32 · 5:40–5:50
- **bg:** `paper-xs`
- **type:** FillAnimation
- **visual:** A thin gap between the ring and the soil is highlighted. An orange-grey grout fill flows around the ring from the bottom up, and the gap disappears.
- **onscreen:** chip `গ্রাউট = সিমেন্টের ঘন মশলা`
- **vo:** রিং আর চারপাশের মাটির মাঝে যে সরু ফাঁকটুকু থাকে, সেখানে সঙ্গে সঙ্গে পাম্প করে ভরে দেওয়া হয় সিমেন্টের ঘন মশলা — গ্রাউট। তাতে দেয়াল আর মাটি এক হয়ে যায়।

### S33 · 5:50–6:00
- **bg:** `paper`
- **type:** ProcessCards (loop)
- **visual:** Four white cards in a row with icons: ⚙ `খোঁড়ো` → ➜ `ঠেলো` → ◯ `রিং বসাও` → ▦ `ভরাট করো`, plus a curved arrow looping back. Each highlights in turn, twice, getting faster.
- **onscreen:** headline `কাজটা চলত [[এভাবে]]`
- **vo:** তারপর আবার খোঁড়া, আবার ঠেলা, আবার রিং। দিনের পর দিন, রিংয়ের পর রিং — নদীর তলায় তৈরি হতে থাকে একটা লম্বা কংক্রিটের পাইপ।

---

## PART 6 — CROSSING UNDER THE HOOGHLY, 2017 (6:00–7:05)

### S34 · 6:00–6:06
- **bg:** `paper`
- **type:** CalendarCard
- **visual:** A tear-off calendar card drops in and flips: top band `এপ্রিল`, big `2017`.
- **onscreen:** `এপ্রিল · 2017`
- **vo:** দুই হাজার সতেরো সালের এপ্রিল। রচনা প্রথম ঢুকল গঙ্গার তলায়।

### S35 · 6:06–6:22
- **bg:** `night-xs`
- **type:** CrossSection (progress)
- **visual:** A wide cross-section of the river. On top, a ferry, a launch and a cargo boat move across. Below, the TBM moves right to left from the `হাওড়া` side, nudging toward `কলকাতা`, with a progress bar under it. Depth markers sit on the side: `নদীর তলা` line and `জলের উপরিতল থেকে ~30 মি` (see fact table).
- **onscreen:** tags `হাওড়া → কলকাতা`
- **vo:** হাওড়ার দিক থেকে কলকাতার দিকে। মাথার ওপর তখন দিব্যি চলছে লঞ্চ, ফেরি, মালবোঝাই নৌকা। তারা কেউ টেরও পায়নি যে ঠিক নিচে, নদীর তলারও অনেক নিচে, একটা দৈত্যাকার যন্ত্র ধীরে ধীরে এগিয়ে চলেছে।

### S36 · 6:22–6:37
- **bg:** `paper`
- **type:** AppWindow (navigation)
- **visual:** A navigation screen with a crosshair target, a red laser beam line from the back, and a deviation readout `± 2 সেমি` that wobbles. When it drifts to `± 6 সেমি`, a yellow warning banner slides down, the cursor clicks `ঠিক করো`, and it returns to centre.
- **onscreen:** window title `দিক ঠিক রাখা` · headline `অন্ধকারে [[দিশা]]`
- **vo:** মাটির নিচের ঘুটঘুটে অন্ধকারে দিক ঠিক রাখবেন কীভাবে? জিপিএস তো সেখানে কাজই করে না। তাই পেছন থেকে লেজার রশ্মি ফেলে প্রতি মুহূর্তে মাপা হয়, মেশিনের মুখটা ঠিক কোথায় আছে। একটু এদিক-ওদিক হলেই স্ক্রিনে সতর্কবার্তা।

### S37 · 6:37–6:47
- **bg:** `night-xs`
- **type:** TwinTunnels
- **visual:** A front cross-section of two circles side by side. The left one is labeled `রচনা` and already lit. The right one is labeled `প্রেরণা` and fills in. Arrow tags: `যাওয়া` / `আসা`.
- **onscreen:** headline `দুটো আলাদা [[সুড়ঙ্গ]]`
- **vo:** রচনার পেছন পেছন, পাশের সুড়ঙ্গে নামল প্রেরণা। দুটো আলাদা সুড়ঙ্গ — একটা যাওয়ার, একটা আসার।

### S38 · 6:47–6:58
- **bg:** `paper`
- **type:** ProgressBar + Calendar
- **visual:** A horizontal progress bar fills `0 → 520 মিটার`. A small calendar `জুন 2017` pops at the end, and the green check chip `দুটো সুড়ঙ্গই পার` appears.
- **onscreen:** `520 মিটার` · `জুন 2017` · ✓
- **vo:** মাস কয়েকের মধ্যেই, সেই বছরের জুনে, দুটো যন্ত্রই নদী পেরিয়ে পৌঁছে গেল কলকাতার পাড়ে। নদীর নিচে তৈরি হয়ে গেল প্রায় পাঁচশো কুড়ি মিটার লম্বা জোড়া সুড়ঙ্গ।

### S39 · 6:58–7:05
- **bg:** `night`
- **type:** LayeredContrast
- **visual:** A split-depth view of the river at night. On the surface, a traffic-lit bridge silhouette spans the river (a generic truss, drawn so it is *not* a copy of the reference's bridge art). Below the water, the glowing twin tunnel runs.
- **onscreen:** top tag `ওপরে: ব্রিজ, ফেরি, নৌকা` · bottom tag `নিচে: [[মেট্রো]]`
- **vo:** ওপরে ব্রিজ, ফেরি আর নৌকার পুরনো শহর। আর ঠিক তার নিচে, জলের তলায়, একেবারে নতুন একটা রাস্তা।

---

## PART 7 — INDIA'S DEEPEST STATION (7:05–7:35)

### S40 · 7:05–7:20
- **bg:** `paper-xs`
- **type:** DepthCompare
- **visual:** A station box sunk deep in the ground. A dimension arrow draws from street level down `~33 মিটার`. Beside it a flat building with lit windows grows downward, flipped, labeled `~11 তলা বাড়ি`.
- **onscreen:** headline `দেশের সবচেয়ে [[গভীর]] স্টেশন` · tag `~33 মিটার`
- **vo:** আর এই সুড়ঙ্গের মুখে, হাওড়ায়, তৈরি হলো ভারতের সবচেয়ে গভীর মেট্রো স্টেশন। মাটির প্রায় তেত্রিশ মিটার নিচে। মোটামুটি একটা এগারো তলা বাড়িকে উল্টো করে মাটিতে পুঁতে দিলে যতটা নিচে যায়।

### S41 · 7:20–7:35
- **bg:** `night`
- **type:** EscalatorChain
- **visual:** A diagonal chain of escalators descends, with tiny person icons riding down and a soft glow at the bottom where a platform sign reads `হাওড়া`.
- **onscreen:** caption pill only
- **vo:** প্ল্যাটফর্মে পৌঁছতে নামতে হয় একের পর এক লম্বা চলমান সিঁড়ি বেয়ে। যত নামবেন, ততই মনে হবে পাতালপুরীর দিকে চলেছেন।

---

## PART 8 — THE REAL ENEMY: BOWBAZAR (7:35–8:45)

### S42 · 7:35–7:43
- **bg:** `night`
- **type:** KineticHeadline (callback)
- **visual:** The teaser `?` card from S06 flies back in and flips to reveal a red warning icon.
- **onscreen:** kicker `মনে আছে?` · headline `আসল বিপদ: {{ডাঙায়}}`
- **vo:** এবার সেই গল্পে আসি। মনে আছে, বলেছিলাম সবচেয়ে বড় বিপদটা নদীর নিচে ঘটেনি?

### S43 · 7:43–7:50
- **bg:** `paper`
- **type:** CalendarCard
- **visual:** Calendar card `আগস্ট` / `31` / `2019`.
- **onscreen:** `31 আগস্ট 2019`
- **vo:** দুই হাজার উনিশ সালের একত্রিশে আগস্ট। নদী থেকে খানিকটা দূরে, মধ্য কলকাতার বউবাজার।

### S44 · 7:50–8:02
- **bg:** `paper-xs`
- **type:** CrossSection (hidden aquifer)
- **visual:** Old 3–4 storey buildings with balconies sit on top. In the soil below, a TBM labeled `চণ্ডী` advances. Hidden ahead of it is a blue lens-shaped pocket labeled `অ্যাকুইফার · মাটির নিচের জলস্তর`. It is invisible at first, then revealed with a ripple.
- **onscreen:** chip `চণ্ডী` · label `অ্যাকুইফার`
- **vo:** আরেকটা টানেল বোরিং মেশিন — নাম চণ্ডী — মাটির নিচে খুঁড়তে খুঁড়তে হঠাৎ ধাক্কা খেল একটা লুকোনো জলের ভাণ্ডারে। ইঞ্জিনিয়ারদের ভাষায় যার নাম অ্যাকুইফার।

### S45 · 8:02–8:16
- **bg:** `paper-xs` (same)
- **type:** CollapseAnimation
- **visual:** Water and sand particles rush into the tunnel face. The soil above loses particles and sinks in a gentle dip. Red crack lines spread up through the building walls, and one small building tilts and drops out of frame. Soft camera shake, three frames only.
- **onscreen:** headline `মাটি {{বসে}} গেল`
- **vo:** চাপ সামলানোর আগেই জলের সঙ্গে হুড়হুড় করে বালি ঢুকে এল সুড়ঙ্গে। আর মাটির নিচ থেকে বালি সরে যেতেই বসে যেতে লাগল ওপরের জমি। পুরনো বাড়িগুলোর দেয়ালে দেখা দিল বড় বড় ফাটল। কয়েকটা বাড়ি ভেঙেও পড়ল।

### S46 · 8:16–8:28
- **bg:** `night`
- **type:** StatCounters
- **visual:** Two dark stat cards count up: 👥 `~250 · প্রথম দিনেই ঘরছাড়া` and 🏠 `52 · পরিবার পেল ক্ষতিপূরণ`. A green chip `কারও প্রাণ যায়নি` then fades in under them.
- **onscreen:** cards + chip
- **vo:** রাতারাতি বাড়ি ছাড়তে হলো শয়ে শয়ে মানুষকে। শুধু প্রথম দিনেই প্রায় আড়াইশো জনকে সরিয়ে নিয়ে যাওয়া হলো হোটেলে। ভাগ্য ভালো, কারও প্রাণ যায়নি।

### S47 · 8:28–8:38
- **bg:** `paper-xs`
- **type:** SoilLayers
- **visual:** A side-by-side soil column comparison. Left, under the river: even, uniform layers with a ✓. Right, under old Kolkata: a patchwork of clay, sand pockets and water lenses with a ⚠.
- **onscreen:** headline `শহরের নিচের মাটি [[অচেনা]]`
- **vo:** নদীর নিচের মাটির জন্য প্রস্তুতি ছিল পুরোদমে। কিন্তু শহরের নিচে, শতাব্দী-পুরনো ঘিঞ্জি বাড়ির তলায়, মাটি সব জায়গায় এক রকম নয়। কোথাও শক্ত কাদা, কোথাও আলগা বালি, কোথাও লুকিয়ে থাকা জল।

### S48 · 8:38–8:45
- **bg:** `paper`
- **type:** AppWindow (route map, split)
- **visual:** The route map from S11 comes back. The line is split into two coloured segments: `সল্টলেক → শিয়ালদা` and `এসপ্ল্যানেড → হাওড়া ময়দান`. The gap between them blinks red with the tag `বউবাজার`.
- **onscreen:** tag `মেট্রো চলল দুই টুকরোয়`
- **vo:** এরপর থেকে এই অংশের কাজ বারবার থমকেছে। মেট্রো চলেছে দুই টুকরোয় — একদিকে সল্টলেক থেকে শিয়ালদা, অন্যদিকে এসপ্ল্যানেড থেকে হাওড়া ময়দান। মাঝখানের ছোট্ট ফাঁকটুকু জুড়তেই লেগে গেল আরও কয়েক বছর।

---

## PART 9 — THE PAYOFF (8:45–9:15)

### S49 · 8:45–8:53
- **bg:** `paper`
- **type:** CalendarCard
- **visual:** Calendar `মার্চ` / `6` / `2024`. A ribbon-cut sparkle plays.
- **onscreen:** `6 মার্চ 2024`
- **vo:** অবশেষে দুই হাজার চব্বিশের ছয়ই মার্চ, খুলে গেল নদীর নিচের অংশ। ভারতের প্রথম মেট্রো, যা চলে নদীর তলা দিয়ে।

### S50 · 8:53–9:02
- **bg:** `night-xs`
- **type:** CrossSection + Timer
- **visual:** This bookends the hook with the same composition as S01. The train streaks through while a big timer in the corner counts `00 → 45 সেকেন্ড`.
- **onscreen:** timer `45 সেকেন্ড`
- **vo:** আর যে নদী পেরোতে একসময় লেগে যেত অনেকটা সময়, ট্রেন এখন সেই নদীর নিচ দিয়ে পার হয় মাত্র পঁয়তাল্লিশ সেকেন্ডে।

### S51 · 9:02–9:12
- **bg:** `paper`
- **type:** AppWindow (route complete)
- **visual:** The split route map from S48. The red gap fills green and the line glows end to end. A calendar chip shows `22 আগস্ট 2025`.
- **onscreen:** tag `হাওড়া ময়দান ⟷ সেক্টর ফাইভ · একটানা`
- **vo:** আর দুই হাজার পঁচিশের বাইশে আগস্ট, জুড়ে গেল বউবাজারের সেই ফাঁকও। হাওড়া ময়দান থেকে সল্টলেক সেক্টর ফাইভ — এখন একটানা, এক ট্রেনে।

---

## PART 10 — RECAP + CTA (9:12–9:35)

### S52 · 9:12–9:22
- **bg:** `paper`
- **type:** Checklist
- **visual:** Three white rows slide in one by one, each with an icon and a green ✓ that pops:
  1. 💧 `মাথার ওপর নদী, ` + `তবু শুকনো` (green)
  2. ◎ `প্রতি বর্গমিটারে 30 টন, ` + `তবু অটুট` (green)
  3. ⚠ `শহরের মাটির ধাক্কা, ` + `তবু শেষ হলো` (green)
- **vo:** তাহলে এক কথায়? মাথার ওপর গোটা একটা নদী, তবু ভেতরে একফোঁটা জল নেই। প্রতি বর্গমিটারে তিরিশ টনের চাপ, তবু দেয়াল অটুট। আর শহরের নিচের মাটি যত ধাক্কাই দিক, কাজ শেষ হয়েছে।

### S53 · 9:22–9:28
- **bg:** `night-xs`
- **type:** CrossSection (calm)
- **visual:** A slow push-in on the train in the tunnel. The river surface ripples gently above.
- **onscreen:** caption pill only
- **vo:** পরের বার এই ট্রেনে চেপে গঙ্গা পার হওয়ার সময়, ওই পঁয়তাল্লিশটা সেকেন্ড একটু খেয়াল করবেন। আপনার ঠিক মাথার ওপর তখন বয়ে চলেছে একটা নদী।

### S54 · 9:28–9:32
- **bg:** `paper`
- **type:** CommentBoxCTA
- **visual:** An app window with a `কমেন্ট` header. The text `পরের ভিডিও কী নিয়ে?` types in character-group by character-group (use grapheme clusters, see PROMPT §6). The cursor clicks the orange `পাঠান` button, which turns into `পাঠানো হয়েছে ✓`.
- **onscreen:** headline `এরপর কোন জিনিসের [[রহস্য]] জানতে চান?`
- **vo:** এরপর কোন জিনিসের ভেতরের রহস্য জানতে চান? কমেন্টে লিখে জানান।

### S55 · 9:32–9:35
- **bg:** `night`
- **type:** SocialFollowCards
- **visual:** Three dark cards (Facebook, Instagram, YouTube icons drawn as simple glyphs). The cursor clicks each `ফলো করুন` / `সাবস্ক্রাইব`, and the buttons flip to the outlined "done" state.
- **vo:** আর এমন আরও গল্পের জন্য চ্যানেলটা সাবস্ক্রাইব করে রাখুন।

### S56 · 9:35–9:40 (end card)
- **bg:** `paper`
- **type:** ShareEndCard
- **visual:** The train-under-river cross-section in soft pastel. The headline types in, and the cursor clicks an orange `শেয়ার করুন` pill. Hold for 2–3 s of music for the YouTube end-screen.
- **onscreen:** headline `রোজ মেট্রোয় গঙ্গা পার হয় যে [[বন্ধু]]`
- **vo:** আর যে বন্ধু রোজ এই মেট্রোয় নদী পার হন, ভিডিওটা তাঁকে পাঠিয়ে দিন।

---

## Duration control

After the TTS/voice-over is generated, Claude Code must measure the total:

- **Under 9:00:** add the optional beats below, in order, until the total is ≥ 9:00.
- **Over 10:00:** first shorten the pauses between scenes (minimum 6 frames). Then cut the lines marked ✂ below.

**Optional beats (insert where noted):**

- **X1 (after S27):** `bg paper` · AppWindow progress. **vo:** "শুনতে সহজ লাগছে, কিন্তু এই পুরো কাজটা হয় দিনরাত, চব্বিশ ঘণ্টা। কারণ মেশিন একবার থেমে গেলে চারপাশের মাটি আর জল চেপে বসতে চায়। তাই শিফট বদলায়, মানুষ বদলায়, কিন্তু মেশিন সহজে থামে না।"
- **X2 (after S38):** `bg night-xs` · TwinTunnels + walkway. **vo:** "আর বিপদের কথা ভেবে সুড়ঙ্গের ভেতরে রাখা হয়েছে হেঁটে বেরোনোর জরুরি পথ, আর দুই সুড়ঙ্গের মাঝে মাঝে আছে সংযোগপথ — যাতে দরকারে যাত্রীরা এক সুড়ঙ্গ থেকে অন্য সুড়ঙ্গে সরে যেতে পারেন।" *(verify against an official source before use, see the fact table)*
- **X3 (after S41):** `bg paper` · Comparison cards `1984 উত্তর–দক্ষিণ` vs `2024 পুব–পশ্চিম`. **vo:** "উনিশশো চুরাশিতে যে শহর দেশকে প্রথম মেট্রো দেখিয়েছিল, চল্লিশ বছর পর সেই শহরই দেখাল প্রথম নদীর নিচের মেট্রো।"

**Lines to cut if over (✂):**

- S06: the last sentence ("আগে জানা যাক…")
- S41: the second sentence
- S47: the last clause ("কোথাও লুকিয়ে থাকা জল")

---

## Fact table (verify before publishing)

| Claim used | Value in script | Status | Source |
|---|---|---|---|
| Length under the river | ~520 m | ✅ widely reported (one source says 502 m) | railway-technology.com, Wikipedia |
| River crossing time | 45 s | ✅ | The Week, Apr 2023 |
| Depth | "about 30 m below the water surface" | ⚠ sources conflict: 13 m below river bed / ~30 m below water level / 33 m below ground | millenniumpost, Wikipedia. **Keep the wording "প্রায়" (about).** |
| TBM names | Prerna and Rachna, German-made | ✅ | railway-technology.com |
| TBM size | "as tall as a two-storey building" | ✅ as reported | railway-technology.com |
| Under-river start | Rachna, mid-April 2017, Howrah → Kolkata side | ✅ | railway-technology.com, themetrorailguy.com |
| Both tunnels done | June 2017 | ✅ (2nd TBM completed 23 June 2017) | themetrorailguy.com |
| Ring | 6 segments, 275 mm thick, ID 5.55 m, OD 6.1 m | ✅ | railway-technology.com |
| Rubber seals at joints | generic | ⚠ standard practice for segmental linings, not confirmed for this project in my search | — |
| Laser guidance | generic | ⚠ standard on TBMs, not project-specific | — |
| Pressure: +1 atm per 10 m; ~30 t/m² at 30 m | physics | ✅ (water only; soil adds more) | — |
| Howrah station depth | ~33 m, India's deepest | ✅ (sources say 30–34 m) | Wikipedia "Howrah metro station" |
| India's first metro | Kolkata, 1984 | ✅ (24 Oct 1984) | — |
| Bowbazar | 31 Aug 2019, TBM "Chandi" hit an aquifer | ✅ | themetrorailguy.com, The Quint |
| Bowbazar people | ~250 moved to hotels on day 1; 52 families compensated; no deaths | ✅ (figures vary by source) | The Statesman, The Quint |
| Underwater section opened | 6 March 2024 | ✅ | Wikipedia (Green Line) |
| Full corridor opened | 22 Aug 2025 (Esplanade–Sealdah) | ✅ | JICA press release, Embassy of Japan |
