# MASTER PROMPT — Bengali animated explainer video (Claude Code + Remotion)

> **How to use:** Make an empty folder and put `SCRIPT_BN.md` in it (optionally also `music.mp3`, and your recorded voice files). Open Claude Code there, then paste **everything below the line** as your first message.
> To make a video on a different topic, replace `SCRIPT_BN.md` with your own script in the same format, or use the short template at the bottom of this file.

---

You are a senior motion designer and React/TypeScript engineer. Build a **9:00–10:00 minute, 1920×1080, 30 fps Bengali animated explainer video** with **Remotion**, entirely from code: SVG, CSS and React. Follow the script in `./SCRIPT_BN.md` scene by scene, and reproduce the visual style described in §3–§6 as precisely as possible.

## 0. Hard rules (do not break these)

1. **No borrowed media.** Every visual is drawn by you in SVG/React. Do not import, trace, screenshot or sample frames, audio or clips from any existing video. If a `reference/` folder exists, you may *look* at it to match style (palette, spacing, motion feel) only. Nothing from it goes into `src/`, `public/` or the render.
2. **The script is the source of truth.** Speak exactly the `vo:` lines. Show the `onscreen:` text exactly, with `[[word]]` in orange and `{{word}}` in red.
3. **Bengali text must render correctly.**
   - Never apply `letter-spacing` to Bengali text.
   - Never split Bengali text into individual code points for animation, because that breaks conjuncts (যুক্তাক্ষর) and vowel signs (কার). Animate **per word** (split on spaces).
   - For typewriter effects use grapheme clusters: `new Intl.Segmenter('bn', {granularity: 'grapheme'})`.
   - Render-check every headline: inspect a still and confirm that conjuncts like `ক্ষ`, `ন্ত`, `ঙ্গ`, `স্ট`, রেফ (`র্ক`) and য-ফলা (`ক্য`) look right.
4. **The first 5 seconds are the hook.** Frame 0 must already show motion (no fade from black, no logo, no title first). The headline must be fully readable by 4.0 s.
5. **Final length is 9:00–10:00.** If the total is outside that range, apply the "Duration control" rules at the end of SCRIPT_BN.md.
6. **Never leave the screen static for more than 2 s.** Every scene has ambient micro-motion: twinkles, ripples, a slow camera push, or floating dust.

## 1. Tech stack

- Scaffold with `npx create-video@latest` (blank template, TypeScript). Use Remotion v4 with `@remotion/transitions`, `@remotion/google-fonts`, `@remotion/media-utils`, `@remotion/paths` and `@remotion/shapes`.
- Fonts (via `@remotion/google-fonts`):
  - **Bengali headlines and body:** `Hind Siliguri` (600/700). Fallback: `Noto Sans Bengali` 700/800.
  - **Big numbers / years / counters:** `Oswald` 600 (condensed, tall). Use Latin digits with Indian grouping: `n.toLocaleString('en-IN')` → `1,00,000`.
  - **Small UI labels:** `Hind Siliguri` 500.
- Project layout:

```
src/
  theme.ts              // colors, fonts, sizes, easings (§3)
  script.ts             // parsed scenes from SCRIPT_BN.md (id, bg, type, onscreen, vo, visual)
  timing.ts             // per-scene durations from audio (§7)
  primitives/           // reusable components (§5)
  backgrounds/          // NightSky, Paper, CrossSection
  scenes/S01.tsx …      // one file per scene, built from primitives
  Main.tsx              // <TransitionSeries> of all scenes + audio layers
  StyleBoard.tsx        // a 3×3 grid of sample scenes for style approval
public/
  vo/S01.mp3 …          // narration per scene
  music.mp3             // optional bed
  sfx/*.mp3             // whoosh, pop, click, tick, thud (royalty-free or synthesized)
out/
```

## 2. The format, beat by beat (what makes this style work)

- **Two worlds that alternate every 1–3 scenes:**
  - **NIGHT:** a dusky city skyline over a dark river, with a mirrored reflection, used for drama, stats and title cards.
  - **PAPER:** cream blueprint paper with flat engineering diagrams, used for explanation.
- **Every scene uses one idea, one headline, one moving diagram.** The headline sits top-centre. A small kicker sits above it with a dash. One keyword is coloured.
- **The background persists, the content changes.** Within the same world, keep the background mounted and animate the foreground in and out. The world switches (night↔paper) with a 12-frame blur-dissolve.
- **"Product UI" moments:** some explanations happen inside a fake macOS app window. A cursor moves, clicks a toggle, drags a slider, and a chart updates. This gives the "interactive" feel.
- **Stat cards** count numbers up. **Negation** is a red circle-slash that draws over an icon. **Checklists** pop green ✓.
- **Bottom caption pill** shows the narration in short 2–6-word chunks, synced to the voice.
- **Bookends:** the last content scene mirrors the hook's composition. The outro is a comment box that types a question, then social follow cards, then a share card.
- **Pacing:** a new visual beat every 3–6 s. A cut or transition rarely lands mid-sentence. Diagrams build *in sync* with the words that name them.

## 3. Design tokens (`theme.ts`)

```ts
export const C = {
  // NIGHT world
  skyTop: '#130F26', skyMid: '#241A3A', skyLow: '#3A2A48', horizon: '#7A5A5E', glow: '#E59A5B',
  skyline: '#15162E', skylineEdge: '#1F2242', window: '#F2B866',
  waterTop: '#1F2242', waterDeep: '#0C0C1C',
  cardNight: '#24203D', cardNightBorder: '#3A3456',
  // PAPER world
  paper: '#EDE8DD', paper2: '#EBE6DA', paperGlow: '#F3D9A8', paperLine: '#CFC6B5', truss: '#D9D2C3',
  ground: '#D6C4A6', groundDeep: '#97826A', mudDark: '#5A4636', waterLight: '#CED8E2',
  ink: '#1E1B2E', inkSoft: '#4A4658', steel: '#4B4F63',
  // Accents
  orange: '#C8741A', amber: '#F0A63A', red: '#E0453A', blue: '#2F6FB5', sky: '#5AA9E6', green: '#2E9E5B',
  white: '#FFFFFF',
};
export const EASE = { out: [0.16, 1, 0.3, 1], inOut: [0.65, 0, 0.35, 1] }; // cubic-bezier
export const SPRING = { damping: 200, stiffness: 120, mass: 1 };             // calm springs, no wobble
export const SPRING_POP = { damping: 14, stiffness: 180, mass: 0.8 };        // chips, checks, pills
```

**Typography scale (1080p):**

| Element | Size | Weight | Colour |
|---|---|---|---|
| Title card | 128 px | 700 | `white` + keyword `amber` |
| Headline | 68 px | 700 | `ink` on paper / `white` on night |
| Kicker | 22 px | 500 | `blue` on paper / `glow` on night, preceded by a 28 px × 2 px line |
| Counter number | 64 px | Oswald 600 | `white` (night) / `orange` (paper) |
| Counter label | 20 px | 500 | 70% opacity |
| Caption pill | 28 px | 600 | Night: white on `rgba(14,12,28,.82)`. Paper: ink on `#FFFFFF` with a 1px `paperLine` border. Radius 10, padding 10×18, bottom 64 px. |
| Diagram labels | 22 px | 600 | `ink`, inside white pills with an orange number |

**Layout:** a 96 px safe margin. Headlines sit centred at y≈110 px. Diagrams sit in the band y=260–900. Keep text inside the YouTube-safe area.

## 4. Backgrounds

- **`NightSky`:** a vertical gradient `skyTop → skyMid → skyLow → horizon`, with a thin `glow` band at the horizon (blurred 40 px, 60% opacity).
  - **Skyline:** 2 parallax layers of random rectangular building silhouettes (seeded random, deterministic). The back layer is lighter, and the front layer is `skyline`. About 8% of the windows twinkle (`window` colour, 2–4 px squares).
  - **River:** fills the lower 38%, gradient `waterTop → waterDeep`.
  - **Reflection:** the skyline and any bridge/train, flipped vertically, at 35% opacity, blurred 3 px, with a sine-based horizontal ripple displacement (SVG `feTurbulence` + `feDisplacementMap`, animated `baseFrequency` seed) and thin horizontal light streaks.
  - **Optional:** slow-moving searchlight beams (2 thin rotated gradients, 10% opacity) and tiny floating dust specks.
- **`Paper`:** a flat `paper` fill with a soft radial `paperGlow` blob (25% opacity) drifting slowly. Add:
  - an inset dashed border 24 px from the edges, 1 px `paperLine`, with small "+" crosshair marks at the corners;
  - a faint truss/lattice pattern along the bottom 16% (line art, `truss`, 50% opacity);
  - very subtle paper noise (SVG `feTurbulence`, 3% opacity).
- **`CrossSection` (night or paper variant):** horizontal strata. On top, the sky strip or paper. Then the water band (night: navy with lighter ripple lines; paper: `waterLight` with small `~` wave glyphs). Then the river-bed line, then the soil layers (`ground`, then darker `groundDeep`, then `mudDark`) with scattered specks drifting slowly. Tunnels are rounded tubes with a soft inner glow. The train is a rounded capsule with a row of warm window lights and a motion streak.

## 5. Primitive component library (build these first)

| Component | Behaviour |
|---|---|
| `<Kicker text tone>` | The line draws (0→28 px) then the text fades and slides in from x-8. |
| `<Headline text size>` | Parses `[[ ]]` / `{{ }}`. Words reveal one by one: opacity 0→1, y 18→0, blur 8→0, 4-frame stagger, 14 frames each. The keyword lands last with scale 1.08→1. |
| `<TitleCard>` | A huge headline with a light shine sweep (a linear-gradient mask moving left→right once). |
| `<CaptionPill chunks>` | Shows chunked narration synced to timing (§7). Each chunk cross-fades over 4 frames. |
| `<StatCard icon value label>` | A rounded card (16 px radius) with a square icon tile. The value counts up over 40 frames (easeOutExpo, `en-IN` grouping). Supports a `~` prefix and `+` suffix. |
| `<IconCard>` | A dark (night) or white (paper) card with an icon and a label. States: active, dimmed (blur 4 px + 40% opacity), struck. |
| `<Negation>` | A red circle (10 px stroke) that draws by `strokeDashoffset`, then the diagonal slash draws. 18 frames. |
| `<Chip text tone icon>` | A pill. It pops with `SPRING_POP`. Tones: neutral, orange, red, green (with ✓), blue. |
| `<CheckRow text okText>` | A white row with the green ✓ popping at the right. |
| `<Calendar month day year>` | A tear-off card with a coloured top band (`orange`). It drops in with a spring and a slight rotation of -4°→0°. |
| `<YearCounter from to>` | A big Oswald year with a timeline line and a moving dot below it, and a little bar chart in the background. |
| `<DimensionArrow from to label>` | 2 px ink lines with end ticks that draw outward from the centre. The label pill pops in the middle. |
| `<AppWindow title sidebar>` | A macOS-style window: radius 14, white, shadow `0 20px 60px rgba(0,0,0,.12)`, 3 traffic-light dots, a URL-bar pill, a 56 px left icon sidebar. The content slot slides up 20 px on enter. |
| `<Cursor path clicks>` | A macOS arrow cursor moving along an eased bezier path between keyframes. On click: scale 0.88 for 4 frames, plus a ripple ring (0→40 px, fade). Plays the `click` SFX. |
| `<Toggle on>` / `<Slider value>` / `<LineChart series>` / `<ProgressBar>` | UI bits inside AppWindow, animated by props over time. |
| `<Person pose>` | A flat pictogram (round head, rounded body, `ink`), with poses: stand, dig, point, arms-out. |
| `<TBM>` | A side cutaway: cutter head (rotating disc with teeth), chamber, spiral screw (animated stripe offset), segment erector arm, jacks, and trailing gantry. Props: `progress`, `rotation`, `highlight`. |
| `<Ring segments={6} built>` | A front-view ring that assembles segment by segment. |
| `<Train>` | A rounded capsule with lit windows and a motion streak. |
| `<Particles>` | Deterministic soil/water particles (seeded `random()` from `remotion`), used for muck flow, seepage and collapse. |
| `<SocialCard platform>` / `<CommentBox text>` / `<ShareButton>` | The outro widgets. Draw the platform icons as simple glyphs. |

**Motion defaults:**

- **Enter:** 14 frames, opacity + y 16 px + blur 8 px → 0, `EASE.out`.
- **Exit:** 10 frames, reversed, with blur.
- **Stagger:** 4–6 frames.
- **Camera:** every scene gets a slow `scale 1.00→1.04` across its duration (on a wrapper div).
- **Transitions:**
  - Same world: content cross-fade with blur (8 frames).
  - World switch: 12-frame blur-dissolve (outgoing blur 0→14 px + fade, incoming 14→0 px).
  - Callbacks (S42, S50): a quick 10-frame zoom-through.

All animation must be driven by `useCurrentFrame()`, with no CSS transitions or `Date.now()`, so renders are deterministic.

## 6. Scene building

- Parse `SCRIPT_BN.md` into `src/script.ts` (an array of `{id, part, bg, type, kicker, headline, onscreen, visual, vo}`). Keep the Bengali exactly as written.
- Implement each scene in `src/scenes/Sxx.tsx` from the `visual:` notes, using primitives. Sync builds to the narration. For example, a diagram label appears when its word is spoken: use the caption-chunk timings from §7 to find the frame.
- **Re-use layouts across scenes** for continuity. S11 → S12 → S48 → S51 is the *same* route-map window evolving. S01 ↔ S50 ↔ S53 are the *same* cross-section composition.
- **Bridges, trains, machines and buildings must be your own generic designs.** Do not reproduce any specific artist's illustration.

## 7. Voice-over, timing and captions

1. **VO source** (pick the first that is available and tell me which you used):
   - a. **My own recordings:** if `public/vo/Sxx.wav|mp3` already exist, use them.
   - b. **Azure Speech TTS:** if `AZURE_SPEECH_KEY` and `AZURE_SPEECH_REGION` are set, use voice `bn-IN-BashkarNeural` (male) or `bn-IN-TanishaaNeural` (female). Use SSML at rate `+5%` with a 250 ms break after `।`.
   - c. **ElevenLabs:** if `ELEVENLABS_API_KEY` is set, use a model that supports Bengali, a warm, confident narrator voice, stability about 0.45, and style about 0.3.
   - d. **No key available:** generate **silent placeholder durations** from the word count (`words / 2.45` seconds + 0.35 s per `।`) so the whole timeline can be built and previewed. Print a clear warning, then re-time automatically once the real VO files are added. **Do not stop the build because VO is missing.**
2. Generate **one audio file per scene**. Measure each one with `getAudioDurationInSeconds` inside `calculateMetadata`. Scene duration = VO length + 0.35 s lead-out, with a minimum of 3 s. The composition's total `durationInFrames` is computed, never hard-coded.
3. **Captions:**
   - Split each `vo` into chunks of 2–6 words, breaking at `,` `।` `?` `—`.
   - Time the chunks proportionally to their grapheme count across the scene's VO duration. If word timestamps are available from the TTS (Azure word-boundary events / ElevenLabs alignment), use them instead.
   - Export `out/captions.srt` too.
4. **Audio mix:**
   - VO normalized to about -16 LUFS.
   - Music bed (if `public/music.mp3` exists) at about -30 LUFS under VO and -22 LUFS when VO is silent, with a 300 ms duck ramp.
   - SFX: soft whoosh on world switches, pop on chips/cards, click on cursor clicks, tick on counters (throttled), thud on the elephant drops, low rumble on the S45 collapse. All SFX at least 8 dB under VO.
   - Final master at -14 LUFS integrated, -1 dBTP.
   - If no SFX files exist, synthesize simple ones with ffmpeg (`anoisesrc` / `sine` + envelopes) into `public/sfx/`.

## 8. Workflow with checkpoints

1. **Scaffold** the project, then add the theme, fonts, backgrounds and primitives.
2. **Style board:** build `StyleBoard` showing S01, S03, S06, S12, S17, S22, S25, S29 and S52. Render stills (`npx remotion still`) for 3 time points each. **Open and look at the PNGs yourself.** Critique them against §2–§5: spacing, colour, Bengali shaping, hierarchy. Fix the problems, then show me the board and wait for my OK before building all the scenes.
3. **VO and timing:** follow §7.
4. **All scenes:** build Part by Part. After each Part, render a contact sheet (one still every 2 s) and review it.
5. **QA pass:**
   - Render a 50%-scale preview (`--scale=0.5`).
   - Extract 1 frame every 10 s into a contact sheet and inspect it.
   - Check: hook readable by 4 s; no static stretch over 2 s; no text overflow or clipping; Bengali conjuncts correct; captions in sync (±150 ms); total 9:00–10:00; no flashes over 3 Hz.
   - Fix everything you find.
6. **Final render:** `npx remotion render Main out/final.mp4 --codec=h264 --crf=18 --audio-bitrate=320k`.
7. **Extras:**
   - `out/thumbnail.png` (1280×720): a night cross-section with a glowing train under a river, a huge headline `গঙ্গার নিচে [[মেট্রো]]` (max 4 words), high contrast, and a red arrow to the train.
   - `out/youtube.md`: 3 Bengali title options, a description, chapter timestamps generated from the real Part start times, and 15 tags.
   - `out/captions.srt`.

**Report at the end:** VO source used, final duration, the list of files, and any facts in the script marked ⚠ that I still need to verify.

---

## Short template — any topic, same format

Use this when you want a new video on another topic. Claude Code will write the script first, then build it with the same pipeline.

```
Read PROMPT.md in this folder and follow §0–§8 exactly, but first write a new
script file SCRIPT_BN.md in the same format as the example (scene blocks with
bg/type/visual/onscreen/vo, [[orange]] and {{red}} keywords, fact table).

Topic: <TOPIC, e.g. "কীভাবে কাজ করে লিফট?">
Audience: Bengali-speaking general viewers, curious, not engineers.
Length: 9:00–10:00 (about 1,300–1,400 narration words, 50–60 scenes).
Structure:
  1. 0–5 s hook: one impossible-sounding true fact, shown in motion from frame 0.
  2. 5–25 s: stakes + 2 stat counters + title card.
  3. The big "কীভাবে?" question + a teaser of a surprising twist revealed later.
  4. 5–7 chapters: context/history → the core problem shown by a simple everyday
     experiment with a pictogram person → the clever solution step by step
     (at least two app-window/cursor scenes) → numbers with real-world comparisons
     (buildings, football fields, elephants) → the twist/enemy payoff → happy ending.
  5. Recap checklist (3 ✓ rows) → bookend shot that mirrors the hook →
     comment-box CTA → follow cards → share card.
Rules: original writing; every number must come from a source you cite in
the fact table (use web search); mark anything uncertain with ⚠ and use
"প্রায়/মোটামুটি" wording for it; numbers spoken as Bengali words in vo.
Show me the script and wait for my OK before building the video.
```
