# PROGRESS — ৫১ সতীপীঠ video (The Bong Mindset)

The brief is BRIEF_51_Shakti_Peeth.md. Follow it phase by phase. This file records where the work stopped.

The project lives in `shakti-peeth-video/` inside the `arunabha369/CodeMate` repo, on branch `claude/upbeat-cerf-urudsl`.

## Status

| Phase | State |
|---|---|
| Env check | ✅ node 22.23, python 3.13, ffmpeg/ffprobe 6.1.1. Install edge-tts with `pip install edge-tts` in Phase 4 |
| 1 Verify + peeth data | ✅ Approved by the user 2026-10-31 (3 script changes, peeths.json dispute handling). Channel = **The Bong Mindset**. peeths.json coordinates/pending entries still need Wikidata/Banglapedia (network) |
| 2 Storyboard | ✅ `storyboard.json`, all rule checks pass (`npm run check:storyboard`) |
| 3 Assets | ⛔ blocked by the network |
| 4 Voiceover | ⛔ blocked by the network (edge-tts endpoint) |
| 5 Design system + components | ✅ theme, 19 components + helpers, showcase stills checked |
| 6 Scenes | 🟡 Chapters 0–2 (S01–S20) built; preview rendered → STOPPED for user feedback (brief checkpoint). S21–S67 show as labelled pending cards |
| 7 Finish | ⏳ |
| 8 Teaser | ⏳ |

At the user's OK, Phases 2 and 5 ran before 3–4 because the network blocked those, and Kali Puja (8 Nov) is close.

## Phase 1 outputs

* `facts.md`: 63 claims checked, with 3 CONFLICTs fixed by approved changes (S24 → ভাগবত পুরাণ, S41 → "কোনও মতে চৌষট্টি", S52 → "অনেকের বিশ্বাস, …").
* `script_changes.md`: the approved changes, plus S67 channel name (TTS: দ্য বং মাইন্ডসেট).
* `src/data/peeths.json`: draft with 51 entries plus Tarapith.
  * 26 checked by web search, 25 `pending`.
  * **All lat/lon are approximate placeholders.**
  * 13 West Bengal entries against Banglapedia's 14.
  * Panchasagar and Karnat are unlocated and shown in the "স্থান অনির্ণীত" tray.

## Phase 2 output

* `storyboard.json`: 67 scenes, generated from the brief's narration verbatim plus the approved edits.
  * Fields: chapter, narration, ttsText, visualType, background, layout, components, onScreenText, assetNeeds, animationBeats, extraHoldSec.
  * Checks (`scripts/check_storyboard.py`): ChapterCard opens chapters 1–9; no layout twice in a row; PeethMap at S01–02, S35–37, S44–56, S65; 32/67 real-media scenes (48%); no digits or Latin letters in ttsText.
  * Chapter 0 is a cold open. Its title lockup is S04.
  * S21 and S30 got a ChapterCard, which the script hadn't listed, to satisfy "every chapter opens with a ChapterCard".
* **Narration is 1,016 words**, not the ~1,450 the brief estimated. Runtime will be measured in Phase 4. If it's short, lengthen holds on S18, S35, S43 and S65 first, as the brief says.

## Phase 5 output (src/)

* `theme.ts`: every colour from the brief, palettes per background, type scale, motion constants.
* `fonts.ts`: Tiro Bangla and Hind Siliguri are **self-hosted from public/fonts**. These are the Google Fonts WOFF2 files (OFL), downloaded by `node scripts/fetch_fonts.cjs`.
  * Why: the headless Chromium in this session doesn't trust the proxy CA, so `@remotion/google-fonts` can't fetch at render time. Self-hosting also makes renders work offline.
* Components (`src/components/`):
  * The brief's 19: Background, ChapterCard, Headline, PhotoKenBurns, PaintingFrame, BrollClip, PeethMap, PeethGrid, MahavidyaRing, ChakraSpin, ShaktiBhairavaCard, CountCards, FamilyLinks, DialogueCard, LowerThird, StatCounter, QuoteCard, ParticleLayer + DiyaRow, CaptionLayer.
  * Helpers: Alpana (original border), Icons (lotus, trishul, conch, temple), MediaPlaceholder.
* PeethMap:
  * Borderless world-atlas land-50m, fitted to lon 60–100 / lat 4–38.
  * Camera keyframes (fly-to), rain-in with ripples, golden thread, temple icons, light cracks and shake (S31).
  * Disputed peeths get a dashed ring and a dashed alternative-site link.
  * Labels are placed with collision avoidance. `labelHighlights={false}` is for dense views such as S56.
  * Dispute note and unlocated tray.
* Media components show an obvious "[ছবি আসবে]" placeholder until licensed media exists, so they can never ship by accident.
* Showcase: composition `Showcase` with a `demo` prop.
  * `node scripts/render_showcase.mjs [demo…]` renders all 26 stills to out/stills/.
  * Checked: conjuncts (ক্ষ, ষ্ঠ, ন্দ্র, ঙ্গ, ব্রহ্মরন্ধ্র, ত্র্যম্বক, জঙ্ঘা, কুণ্ডল), overflow, map legibility, dot positions and label collisions.
  * A test MP4 render (h264, 30 fps) works.
* `showcase_preview.png`: a 3×3 overview of key stills.

## Phase 6 so far

* `scripts/build_durations.py` → `src/data/durations.json`.
  * Uses ffprobe on `public/audio/scene-XX.mp3` when the file exists. Otherwise it **estimates** at 2.1 words/s.
  * Applies the brief's timing rules: +0.7 s; +1.5 s ChapterCard lead-in, during which the audio waits; S24/S35 holds; +18 frames per crossfade.
  * Current estimate: **9.6 min** total, 2:42 for S01–S20.
* `src/lib/timing.ts`: `cue(id, phrase)` returns the frame where a phrase is spoken, estimated from its position in the line. Visual beats use it, so they follow the real audio once it exists.
* `src/data/assets.json` is the asset registry. Phase 3 fills `file`/`credit`, and scenes switch from placeholders to real media automatically.
* `src/Film.tsx`:
  * TransitionSeries with 18-frame fades; chapter openers fade into a ChapterCard that starts from black (the dip to black).
  * One `<Audio>` per scene when the file exists.
  * Music bed when `public/music/bg.mp3` exists: 0.07, 0.15 on chapter cards, 0.02 in S24, 2 s fades.
  * Optional captions.
* Compositions:
  * `ShaktiPeeth` (main, no captions)
  * `ShaktiPeethCaptions` (FB version)
  * `PreviewCh0to2` (S01–S20, captions on because there's no voice yet)
  * `Showcase`
* `src/scenes/S01.tsx … S20.tsx`, plus `shared.tsx` (WithChapterCard, FadeAt, SourceKicker) and `PendingScene.tsx`.
* New drawn components: Kailash, YajnaFire; icons AshIcon, SnakeIcon, PyreIcon, InviteIcon.
* `node scripts/scene_stills.mjs <from> <to> [fractions…]` renders stills from the film timeline to out/stills/scenes/.
* Preview: `npx remotion render PreviewCh0to2 out/preview_ch0-2.mp4 --scale=0.5 --codec=h264 --crf=23`.

## Commands

```
npm install
node scripts/fetch_fonts.cjs        # only if public/fonts is missing
npm run check:storyboard
npx tsc --noEmit
node scripts/render_showcase.mjs    # stills → out/stills/
npm run studio                      # Remotion Studio
```

## Waiting on the user

1. **Network allowlist.** Allow these in the cloud environment settings: Network access → Allowed domains.
   * Data: `en.wikipedia.org`, `www.wikidata.org`, `query.wikidata.org`, `en.banglapedia.org`
   * Media: `commons.wikimedia.org`, `upload.wikimedia.org`, `collectionapi.metmuseum.org`, `images.metmuseum.org`, `openaccess-api.clevelandart.org`, `openaccess-cdn.clevelandart.org`, `api.artic.edu`, `www.artic.edu`, `api.pexels.com`, `images.pexels.com`, `videos.pexels.com`, `pixabay.com`, `cdn.pixabay.com`
   * Voice: `speech.platform.bing.com` (edge-tts)
2. PEXELS_API_KEY and PIXABAY_API_KEY, as environment secrets or in `.env` (gitignored).
3. public/music/bg.mp3, and optional SFX in public/sfx/.
4. Feedback on the chapters 0–2 preview (out/preview_ch0-2.mp4) before building S21–S67.

## Next steps

1. When the network opens:
   * Run a Wikidata SPARQL query for P625 coordinates and replace every `approx` value.
   * Confirm the Banglapedia 14 + 7 lists and re-check the `pending` entries.
   * Then Phase 3 (assets), then Phase 4 (TTS, durations.json).
2. After the user's feedback on chapters 0–2: apply it to the theme and components, then build S21–S67 in batches of about 10 scenes, checking a still from each scene.

## Notes

* The root CodeMate `.gitignore` ignores every `public/` folder. The nested `.gitignore` re-includes only `public/fonts/`, so media stays out of git.
* Today is 2026-10-31 and Kali Puja is on 8 Nov 2026. S66 only makes sense if the video goes out before then.
