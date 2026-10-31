# MASTER PROMPT — "হাওড়া ব্রিজ কীভাবে তৈরি হলো" (Bengali animated explainer, Claude Code + Remotion)

## How to use

1. Install Node 18+, ffmpeg and Python 3, then run `pip install edge-tts` (free Bengali voice, no key needed).
2. Optional but strongly recommended: put a royalty-free music track in the folder as `music.mp3`, for example from the YouTube Audio Library.
3. Optional: if you have the previous project (`explainer-video/project` on branch `claude/blissful-fermat-wqph5k` of this repo), put it next to the new folder. Claude Code will reuse its engine, which saves hours.
4. Open Claude Code in an empty folder and paste **everything below the line** as your first message.
5. Claude Code stops twice for your OK: after the script, and after the style board.

---

You are a senior motion designer, documentary scriptwriter and React/TypeScript engineer.

**Goal:** Make a **9:00–10:00 minute, 1920×1080, 30 fps Bengali animated documentary-explainer** titled **"হাওড়া ব্রিজ কীভাবে তৈরি হলো"**. Build it entirely from code with **Remotion v4**: SVG, CSS and React. It tells the *construction story* of Howrah Bridge (Rabindra Setu), Kolkata, from the old floating pontoon bridge to the quiet wartime opening in 1943.

**Style:** A premium flat-vector "how it works" look. It has two alternating worlds:
- **NIGHT:** a dusky Kolkata skyline over the river with reflections.
- **PAPER:** cream blueprint paper with engineering diagrams.

This film adds a third world:
- **ARCHIVE:** sepia 1930s blueprint, used for history and timeline.

It also uses Bengali kinetic headlines with one coloured keyword, fake app/UI windows driven by a moving cursor, stat counters, calendar cards, checklists, captions, and a comment/follow/share outro.

## 0. Hard rules

1. **Original work only.**
   - Write a new script. Do **not** watch, transcribe or paraphrase any existing YouTube video about Howrah Bridge.
   - Do not reuse their hooks, scene order or visual gags. Specifically avoid: a counter of daily cars/people as the hook, a stick-figure "arms-out balance" experiment, a seismograph screen, the "পান-গুটখা" enemy, a "pigeon droppings" segment, and a "biggest enemy" teaser.
   - Our angle is **how it was built**: chronological, with a construction-site feel. It is not how the bridge works today or its maintenance problems.
2. **No borrowed media.** Do not use photos, footage, logos, maps or audio from anywhere. Draw everything yourself. Archival moments are *drawn* as sepia illustrations, never real photos.
3. **Facts are verified.**
   - Every number and date in the narration must come from the research step (§3) and appear in a fact table with a source URL.
   - If sources disagree, use the safest wording ("প্রায়", "মোটামুটি", or a range) and mark the row ⚠ for me.
   - Never invent quotes, names of workers, newspaper headlines or anecdotes.
4. **Voice first.**
   - Generate the narration audio **before** building scenes, and time every animation to the real audio.
   - If TTS fails, stop and tell me the exact command to run. Do not silently build on estimated timing.
5. **Bengali text must render perfectly.**
   - Use local font files only. Copy woff2 files from the npm packages `@fontsource/hind-siliguri` and `@fontsource/oswald` into `public/fonts` and load them with the `FontFace` API plus `delayRender`. Remote Google Fonts can fail inside headless Chrome.
   - Never set `letter-spacing` on Bengali text.
   - Animate text per **word** (split on spaces), never per code point. Typewriter effects use `Intl.Segmenter('bn', {granularity: 'grapheme'})`.
6. **The hook is the first 5 seconds.** Frame 0 already shows motion. There is no logo, no title first and no fade from black. The hook line is readable by 3.5 s.
7. **No empty frames.**
   - Every scene's main subject is visible by frame 6 of that scene.
   - The main illustrated subject fills at least 45% of the frame.
   - Nothing is static for more than 2 s: use a camera drift, ambient motion or a build step.
8. **Length 9:00–10:00** measured on the real voice-over. Adjust with the script's optional beats or cuts (§4).

## 1. Workflow and checkpoints

**Shortcuts:**
- If `HOWRAH_SCRIPT_BN.md` is in the folder, it is the approved script. Copy it to `SCRIPT_BN.md`, re-check its fact table (§3), and skip Phase B.
- If narration clips already exist (`S01.mp3 …` from ElevenLabs, in the folder or in `public/vo/`), use them as the voice. Run `make_vo.py --engine files` and skip TTS in Phase C.

| Phase | What happens | Checkpoint |
|---|---|---|
| A. Research | Web-search the facts in §3, then write `research/facts.md` with a table: claim · value · source URL · confidence. | — |
| B. Script | Write `SCRIPT_BN.md` in the scene-block format of §5. Target 1,350–1,450 Bengali words, 55–65 scenes, the chapter plan in §4, and a fact table at the end. | **Stop: show me the hook options, the chapter list and the full script. Wait for my OK.** |
| C. Voice | Make one MP3 per scene with `edge-tts` (§9), trim the silences, measure the durations into `src/vo-durations.json`, and report the total. If the total is outside 9:00–10:00, adjust the script and repeat. | — |
| D. Style board | Build the engine (§6–§8) and the hero assets. Render a 3×3 board of stills from 9 representative scenes. Open the PNGs, critique them against §6–§8, fix them, and show me. | **Stop: wait for my OK.** |
| E. Build | Build all scenes, Part by Part. After each Part, render a contact sheet (3 stills per scene), look at it, and fix problems. | — |
| F. QA | Run all of §11. | — |
| G. Render | Full render, plus a thumbnail, SRT captions and a YouTube kit. | Report the results. |

## 2. Project engine

If the folder `../explainer-video/project` (or a path I give you) exists, **copy it** as the starting point:
- **Keep:** `src/theme.ts`, `src/anim.ts`, `src/timing.ts`, `src/kit.tsx`, `src/fonts.ts`, `src/bg/*`, `src/ui/*`, `src/Main.tsx`, `tools/*` and `public/fonts`.
- **Replace:** `src/scenes/*` and the script.

Otherwise create the same architecture:

```
src/
  theme.ts            tokens (§6)
  anim.ts             prog/enter/pop/countUp/rng helpers; all motion from useCurrentFrame()
  timing.ts           TIMELINE from vo-durations.json: scene start/dur, caption chunks, cue(phrase) → frame
  kit.tsx             SceneShell (enter/exit blur + slow camera push), <Sfx>, Camera
  bg/                 NightSky, Paper, Archive (world backgrounds, rendered once at Main level and
                      cross-faded on world switches so ambient motion is continuous)
  ui/                 primitives (§7)
  hero/HowrahBridge.tsx  the parametric bridge (§7.1)
  scenes/p0…p9.tsx    scenes S01…Sxx
  Main.tsx            scenes in overlapping <Sequence>s (12-frame cross-fade), captions, VO, music, SFX
tools/
  parse-script.mjs    SCRIPT_BN.md → src/script.generated.ts
  make_vo.py          edge-tts / Azure / ElevenLabs / own recordings → public/vo/Sxx.mp3 + vo-durations.json
  make-sfx.sh         ffmpeg-synthesized whoosh/pop/click/tick/thud/rumble/ding/type/clank
  contact-sheet.mjs   bundle once, renderStill many frames, tile with ffmpeg
  edge-check.mjs      render the first/last/cross-fade frames of every scene at scale 0.2 and report crashes
  extras.mjs          captions.srt + youtube.md (chapters from real scene starts)
```

- **Timing:** scene duration = 8 frames lead-in + VO frames + 10 frames lead-out, with a minimum of 3 s. The last scene gets a 3 s end-screen hold.
- **`cue(phrase)`** returns the local frame where that phrase is spoken: its proportional position inside the scene's VO. Every build step (a label, a counter, an arm growing) uses `cue()`, so the visuals land on the words. `cue()` throws if the phrase is not in the narration.
- **Cloud containers:** if you run in a cloud container, use the pre-installed Chromium headless shell via `Config.setBrowserExecutable`, and only when the path exists.

## 3. Research brief

Verify each item with at least one good source and fill `research/facts.md`. Prefer Wikipedia (and its cited sources), the Kolkata Port Trust (Syama Prasad Mookerjee Port), Braithwaite Burn & Jessop (bbjconst.com), Tata Steel, and major newspapers' anniversary pieces (75th: 2018; 80th: 2023).

The starting values below come from a quick search. Confirm or correct each one.

| Topic | Starting value | Status |
|---|---|---|
| The pontoon (floating) bridge before it | Built 1874 (Sir Bradford Leslie). It opened periodically for river traffic. | verify |
| Contractor | Braithwaite, Burn & Jessop Construction Co., a firm formed in 1935 | ✅ bbjconst.com, Wikipedia |
| Design consultants | Rendel, Palmer & Tritton | verify |
| Construction years | Started 1936 (some sources say 1937). Opened **3 Feb 1943**. | ✅ / ⚠ start year |
| Opening | No ceremony because of the war, kept low-key | ✅ Wikipedia, anniversary articles |
| Steel | **26,500 t** total. Britain could send only ~3,000 t because of the war, and **Tata** supplied ~23,000 t of high-tensile steel ("Tiscrom"). Some sources say 23,500 t. | ✅ / ⚠ exact Tata share |
| Fabrication | In Calcutta workshops of Braithwaite, Burn & Jessop (four shops) | ✅ bbjconst.com |
| Caissons (main-pier foundations) | Depth about **31.4 m** (Kolkata side) and **26.5 m** (Howrah side) below ground. Plan size about 55 m × 25 m with many cells (verify the cell count). Sunk by digging inside the cells. | ✅ depths / verify size |
| Foundations finished | About November 1938 | ⚠ one source |
| Cantilever arms erected | Started end of 1940, completed mid-1941 | ⚠ verify |
| How the arms were erected | Creeper cranes moving along the top chords? Riveting gangs? | **unverified: only use it if you find a source** |
| Dimensions | Total ~705 m, main span ~457 m, suspended span ~172 m, tower height (verify) | verify |
| Rivets, no nuts and bolts | Riveted structure | verify (mention only briefly; it's not our focus) |
| WWII | Japanese air raids on Calcutta in Dec 1942. The bridge was not hit. | verify |
| First vehicle / trams | Trams ran on the bridge (until 1993?) | verify |
| Renamed | Rabindra Setu, 1965 | verify |
| Cost | ~₹2.5 crore (25 million rupees) | ⚠ one source |

**Seed sources to start from:**
- [Wikipedia — Howrah Bridge](https://en.wikipedia.org/wiki/Howrah_Bridge)
- [Braithwaite, Burn & Jessop — Howrah Bridge](https://bbjconst.com/howrah-bridge.html)
- [The Quint — How the bridge came to be](https://www.thequint.com/amp/story/news/india/kolkata-news-howrah-bridge-turns-75-here-is-how-it-was-made)
- [The Better India — Howrah Bridge at 75](https://thebetterindia.com/130211/howrah-bridge-75-years-kolkata)
- [Gulf News — 75th anniversary](https://gulfnews.com/amp/story/world%2Fasia%2Findia%2Ficonic-howrah-bridge-celebrates-75th-anniversary-1.2170207)

## 4. Story blueprint

Timings are targets; the voice decides.

| # | Time | Chapter | Purpose and must-have set piece |
|---|---|---|---|
| 0 | 0:00–0:05 | **Hook** | One tense, true, visual moment, moving from frame 0. Pick one hook (see the options below). |
| 0 | 0:05–0:35 | Stakes + title + open loop | 2 stat counters (26,500 t steel; ~457 m with no pillar in the water). Title card **"হাওড়া ব্রিজ কীভাবে [[তৈরি]] হলো"**. Open loop: *"আর এত বড় একটা কাজ শেষ হলো — অথচ কেউ ফিতে কাটল না। কেন? সেটা শেষে বলছি।"* |
| 1 | 0:35–1:40 | **Before the bridge** | ARCHIVE world: the 1874 floating pontoon bridge, drawn on boats, with a section that opened for ships (verify how it opened) and a growing city. Why a new bridge was needed. Why the river could not get pillars (port and ship traffic, silt; verify the reasons). |
| 2 | 1:40–2:50 | **The idea: cantilever** | An everyday experiment, *not* a person balancing. Example: a ruler sticking out over a table edge, held down by a book. Push the ruler further and it tips; a heavier book holds it. Then the anatomy, built up on the hero bridge: two towers, anchor arms (the "books"), cantilever arms reaching over the water, and the suspended span hanging between their tips. Numbers come in as dimension arrows. |
| 3 | 2:50–4:20 | **Foundations: caissons** | PAPER cross-section. A giant concrete box with open cells sits on the river bank. Workers dig the soil out from inside the cells, and the box sinks under its own weight while new concrete is added on top. Layers of soft river silt are labelled; the box reaches the depth (31.4 m vs 26.5 m) with a building-height comparison. A cut-away "cell view" shows tiny workers and buckets (drawn, anonymous). Tie-in: "সব ভার শেষ পর্যন্ত নামবে এই দুটো বাক্সে।" |
| 4 | 4:20–5:20 | **Steel and the war** | NIGHT world: an app window "স্টিল অর্ডার" with a cursor. The England row is cut to ~3,000 t (a red shake, "যুদ্ধ"), and the Tata row fills to ~23,000 t (green, "Tiscrom"). A map card shows steel arriving by rail from Jamshedpur (draw a generic map, with no real map tiles). Fabrication in Calcutta workshops: steel members, numbered, stacked. |
| 5 | 5:20–6:50 | **Raising the bridge** | The centerpiece. The hero bridge builds in stages: towers rise, anchor arms complete, then **the cantilever arms creep out over the water from both banks**, panel by panel, in balance. A small counter shows the gap left in the middle shrinking. Riveting gets a short beat only (a hot rivet → hammer → cooled tight, max 15 s, with a different visual from any existing video). Use the camera system (§8) to fly along the arm. |
| 6 | 6:50–7:40 | **Meeting in the middle** | The suspended span is built or hung between the two tips (verify the method). The gap counter reaches **0** and a satisfying "clank" lands. If a verified source gives a date (e.g. 1941), show a calendar card. Precision callout: "দুই পাড় থেকে আসা দুটো হাত — মিলতেই হবে একদম ঠিকঠাক।" |
| 7 | 7:40–8:40 | **War and the quiet opening** | NIGHT world, blacked-out city, searchlights. December 1942 air raids on Calcutta (verify). Calendar: **3 ফেব্রুয়ারি 1943**. Open-loop payoff: no ribbon cutting, the bridge was quietly opened to the public. Then the first users: a tram crossing (verify), people, carts. |
| 8 | 8:40–9:10 | **Legacy** | 1965: the name Rabindra Setu (verify). Today: a night skyline with traffic lights on the bridge. Year counter: 1943 → today, "80+ বছর". |
| 9 | 9:10–9:40 | **Recap + CTA** | A 3-row checklist (✓ pillars-free cantilever · ✓ caissons deep under silt · ✓ built with Indian steel during a war). Bookend: the same composition as the hook, now finished. Then comment box "পরের ভিডিও কী নিয়ে?" → follow cards → share card "রোজ হাওড়া ব্রিজ পার হয় যে বন্ধু". Hold 3 s for the end screen. |

**Hook options** (write 2–3 of your own in this spirit and let me choose):
- *"দুই পাড় থেকে দুটো লোহার হাত এগিয়ে আসছে গঙ্গার মাঝখানের দিকে। মাঝখানে এসে একটুও না মিললে — পুরো ব্রিজটাই বৃথা।"* The arms creep toward each other from frame 0, with a gap counter.
- *"যুদ্ধ চলছে। ইংল্যান্ড থেকে লোহা আসা প্রায় বন্ধ। অথচ গঙ্গার ওপর ঝোলাতে হবে ছাব্বিশ হাজার টন ইস্পাত।"* A cargo ship turns back, and a giant "26,500 t" counter slams in.

**Retention devices:**
- The open loop opens at 0:30 and pays off in chapter 7.
- A mini-question card opens every chapter.
- A world switch or big-number moment lands at least every 60 s.
- Chapter title cards use the kicker style.

**Duration control:** mark 2–3 optional beats (~20 s each) and 3 cuttable lines (✂) in the script, for adjusting to 9:00–10:00 after the VO is measured.

## 5. Script format (`SCRIPT_BN.md`)

```
### S01 · HOOK · 0:00–0:05
- **bg:** `night` | `night-xs` | `paper` | `paper-xs` | `archive`
- **type:** <scene template from §7>
- **visual:** <precise description: what moves, when, synced to which words>
- **onscreen:** kicker `…` · headline `… [[orange keyword]] …` / `{{red keyword}}`
- **vo:** <exact Bengali narration; numbers written as Bengali words for TTS>
```

- Spoken numbers are written in words ("ছাব্বিশ হাজার পাঁচশো"). On-screen numbers use Latin digits with Indian grouping (`26,500`, `1943`).
- End the file with the fact table (claim · value in script · status · source).

## 6. Visual style bible

```ts
// NIGHT
skyTop '#130F26', skyMid '#241A3A', skyLow '#3A2A48', horizon '#7A5A5E', glow '#E59A5B',
skyline '#15162E', skylineBack '#221B39', window '#F2B866', waterTop '#1F2242', waterDeep '#0C0C1C',
cardNight '#24203D', cardNightBorder '#3A3456'
// PAPER
paper '#EDE8DD', paperGlow '#F3D9A8', paperLine '#CFC6B5', truss '#D9D2C3',
ground '#D6C4A6', groundDeep '#B9A281', groundDeeper '#97826A', waterLight '#CED8E2', ink '#1E1B2E', steel '#4B4F63'
// ARCHIVE (new): sepia blueprint for 1870s–1940s history
archBg '#E9DDC4', archInk '#5B4632', archLine '#B89F7A', archAccent '#A4502A'
// plus paper-grain dots, a faint 1930s ruled grid, rounded "photo-corner" frames for drawn vignettes
// ACCENTS
orange '#C8741A', amber '#F0A63A', red '#E0453A', blue '#2F6FB5', sky '#5AA9E6', green '#2E9E5B'
```

**Typography:**

| Element | Font and size |
|---|---|
| Bengali | Hind Siliguri 600/700 |
| Numbers | Oswald 600 |
| Title | 136 px |
| Headline | 72 px |
| Kicker | 24 px with a 28 px leading dash |
| Chips | ≥ 28 px |
| Captions | 32 px pill at the bottom (dark on night, white on paper and archive) |

- One keyword per headline is coloured: orange for positive or key ideas, red for danger or negation.

**Layout:**
- 96 px safe margins.
- Headline top-centre at y≈100.
- Diagrams in y 240–900.
- Captions bottom at 58 px.

## 7. Components

Reuse the previous project's primitives: Headline, Kicker, Head, TitleCard, Chip, Num, CaptionPill, StatCard, IconCard, CheckRow, Calendar, YearCounter, StepCard, AppWindow, Cursor, Toggle, Slider, LineChart, ProgressBar, DimArrow, Negation, Person (pictogram), Building, Boat, Specks, CrossSection, SocialCard, CommentBox, OrangeButton. Icons come from `lucide-react`. Draw brand glyphs (FB/IG/YT) yourself.

### 7.1 Hero asset: `<HowrahBridge>` (most important)

A parametric, original SVG of a balanced-cantilever K-truss bridge with the recognisable Howrah silhouette, built so it can draw itself.

**Props:**

```ts
{
  stage: 0..1,
  parts?: { piers, towers, anchorArms, cantileverArms, suspendedSpan, deck, lights },
  armProgress?: 0..1,
  span?: 0..1,
  gap?: number,
  theme: 'night' | 'paper' | 'archive',
  highlight?: 'towers' | 'anchor' | 'cantilever' | 'suspended' | 'caisson',
  traffic?: boolean,
  frame,
}
```

**Geometry:** generated from real proportions in `facts.md`. Total ~705 m, main span ~457 m, suspended span ~172 m. Choose a px/m scale so the full bridge fits 1600 px.

**Drawing:**
- Members are drawn as lines with consistent stroke widths, and the K-truss pattern is generated procedurally.
- Members appear panel by panel, driven by `armProgress`. Each new panel pops in with a 6-frame stroke draw.
- Optional rivet dots appear at zoom.

**Reuse:** this one component powers the hook, the anatomy, the erection, the meeting, the war scenes, the legacy scenes and the thumbnail. That continuity is what makes the film feel premium.

### 7.2 Other new components

- **`<Caisson depth cells sinking>`:** a cross-section box with cell walls. Soil particles are lifted out of the cells by bucket icons, and the box steps down as `sinking` grows. Strata labels and a depth ruler sit beside it.
- **`<RulerExperiment push weight>`:** a table edge, a ruler and a book. The ruler tips when `push` exceeds the balance.
- **`<SteelOrderWindow>`:** an AppWindow with two supplier rows and progress bars. The cursor edits them.
- **`<RailMap>`:** a stylised generic map with a dashed rail line from Jamshedpur to Calcutta and a moving wagon icon.
- **`<RivetBeat>`:** a glowing rivet travels, is hammered, and cools from orange to grey.
- **`<Searchlights>`, `<BlackoutCity>`:** night-world wartime ambience.
- **`<Tram>`:** a simple period tram silhouette crossing the deck.
- **`<GapCounter meters>`:** a big Oswald number counting down to 0.
- **`<ChapterCard n title>`:** a kicker-style chapter intro, 2 s, which then morphs into the scene.

## 8. Motion and camera

- **Enter:** 14 frames, with opacity, y 16 px and blur 8 → 0. Stagger 4–6 frames. Calm springs (`damping 200`), and pop springs only for chips and checks.
- **Exit:** the SceneShell blurs the scene out over the 12-frame overlap with the next scene. A world switch is a 12-frame background cross-fade plus a soft swoosh.
- **Camera:**
  - A `Camera` wrapper with keyframed `{x, y, zoom}` and ease-in-out.
  - Use real camera moves in at least 1 scene per chapter: fly along the cantilever arm, push into a caisson cell, pull back to reveal the full bridge.
  - Elsewhere, a slow 1.00 → 1.04 push.
- **Ambient motion:** twinkling windows, river ripples, drifting dust, searchlights, traffic lights on the deck.
- **Determinism:** all motion comes from `useCurrentFrame()` with a seeded `random`. There are no CSS transitions, `Date.now()` or `Math.random()`.

## 9. Voice-over and audio

**Voice-over:**

```
python3 tools/make_vo.py --engine edge --voice bn-IN-BashkarNeural --rate +5%
```

- Use `bn-IN-TanishaaNeural` for a female voice.
- Also support `--engine azure`, `--engine elevenlabs` and `--engine files` (my own recordings in `public/vo/Sxx.mp3`).
- Trim leading and trailing silence with ffmpeg `silenceremove`, then write `src/vo-durations.json`.
- Pronunciation fixes: if a word sounds wrong (English names like "Braithwaite", "Tiscrom", "Rendel"), write it phonetically in Bengali in the `vo` text.

**Captions:**
- Chunks of 2–6 words, split at `, । ? —`.
- Time them with edge-tts word boundaries if available; otherwise proportionally by grapheme count.
- Export `out/captions.srt`.

**Music:** use `public/music.mp3` if I provided it. Otherwise synthesize a soft pad with ffmpeg and tell me to replace it. Loudness-normalize the music to -16 LUFS. Mix it at about -30 LUFS under narration, with a 300 ms duck ramp.

**SFX:** synthesize with ffmpeg: whoosh, pop, click, tick, thud, rumble, ding, type, plus a metallic `clank` for panels and the meeting moment, and a muffled `siren` for the war chapter. Keep them at least 8 dB under the voice.

**Master:** about -14 LUFS integrated, -1 dBTP. Measure it with ffmpeg `ebur128` and report the numbers.

## 10. Thumbnail and YouTube kit

- **`out/thumbnail.png` (1280×720):** the hero bridge at dusk, half built, with the two arms almost touching and a glowing gap. A huge 3–4 word Bengali headline, e.g. **"যুদ্ধের মধ্যে তৈরি!"** or **"নদীতে একটাও খুঁটি নেই"**. Add one red arrow or circle, and keep the contrast high.
- **`out/youtube.md`:** 3 Bengali title options, a description with sources, chapters generated from the real scene starts (first at 0:00, each ≥ 10 s), and 15 tags.

## 11. QA (do all of these before the final render)

1. `npx tsc --noEmit` is clean.
2. Run `node tools/edge-check.mjs` (first, second, last and cross-fade frames of every scene) and get 0 failures.
3. Make contact sheets for every Part (3 stills per scene) and **look at them**. Check:
   - empty frames;
   - text overflow or clipping;
   - overlap between the caption pill and diagrams (keep diagrams above y=940);
   - Bengali conjuncts (ক্ষ, ঙ্গ, ন্ত, স্ট, র্ক, ক্য).
4. Render a full preview at half resolution (`--scale=0.5`). Extract 1 frame every 10 s into one sheet and review it.
5. Check that the duration is 9:00–10:00, the hook is readable by 3.5 s, and there are no flashes above 3 Hz.
6. Check the audio: VO present in every scene, music ducked, loudness numbers reported.
7. Final render:

```
npx remotion render Main out/final.mp4 --codec=h264 --crf=18 --audio-bitrate=320k
```

**Final report to me:**
- the output files and their sizes;
- the duration and loudness;
- the voice used;
- every ⚠ fact still needing my check;
- anything you could not verify and left out.
