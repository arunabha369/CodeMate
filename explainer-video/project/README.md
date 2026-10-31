# গঙ্গার নিচে মেট্রো — Remotion project

A 9:38 Bengali animated explainer (1920×1080, 30 fps) built entirely from code: SVG, React and [Remotion](https://www.remotion.dev/). There is no stock footage and nothing from any other video.

## Quick start (on your computer)

You need Node 18+, ffmpeg, and Python 3 (Python is only for the voice-over).

```bash
npm install
```

```bash
npm run studio
```

`npm run studio` opens a live preview in your browser, where you can scrub through all 56 scenes.

## Add the Bengali voice-over

The cloud build container could not reach any text-to-speech service, so the included render has captions, music and sound effects but **no narration yet**. On your machine, run one of these:

```bash
pip install edge-tts
python3 tools/make_vo.py --engine edge
```

```bash
python3 tools/make_vo.py --engine edge --voice bn-IN-TanishaaNeural
```

```bash
AZURE_SPEECH_KEY=... AZURE_SPEECH_REGION=... python3 tools/make_vo.py --engine azure
```

```bash
ELEVENLABS_API_KEY=... python3 tools/make_vo.py --engine elevenlabs --voice <VOICE_ID>
```

- **edge:** free, no key needed.
- **edge with `--voice bn-IN-TanishaaNeural`:** female voice.
- **azure:** official Azure Speech.
- **elevenlabs:** use a voice and model that supports Bengali.

To use your own recordings instead, save them as `public/vo/S01.mp3` … `public/vo/S56.mp3` (one file per scene, text in `../SCRIPT_BN.md`). Then measure them:

```bash
python3 tools/make_vo.py --engine files
```

The tool writes `src/vo-durations.json`. Every scene then re-times itself to the real narration: scene lengths, captions and animation cues all follow the voice. Re-render afterwards:

```bash
npm run render
```

The output is `out/final.mp4`.

If the voiced total ends up outside 9:00–10:00, follow "Duration control" in `../SCRIPT_BN.md`.

## Useful commands

| Command | What it does |
|---|---|
| `npm run studio` | Live preview / scrubbing |
| `npm run render` | Full-quality render → `out/final.mp4` |
| `npm run preview` | Fast half-resolution render → `out/preview.mp4` |
| `npm run parse` | Re-parse `../SCRIPT_BN.md` after editing the narration |
| `npm run sfx` | Re-synthesize the sound effects and music pad with ffmpeg |
| `node tools/contact-sheet.mjs name scenes:S01,S02 3` | Render 3 stills per scene into a contact sheet |
| `node tools/edge-check.mjs` | Quickly render the first/last frames of every scene to catch crashes before a long render |
| `node tools/extras.mjs` | Write `out/captions.srt` and `out/youtube.md` (title, description, chapters, tags) |
| `npx remotion still Thumbnail out/thumbnail.png` | 1280×720 thumbnail |

## Project layout

```
src/
  theme.ts            colours, fonts (style bible from ../PROMPT.md)
  timing.ts           scene timeline, captions, cue() helper (syncs animation to words)
  script.generated.ts parsed from ../SCRIPT_BN.md (npm run parse)
  vo-durations.json   real narration lengths (written by tools/make_vo.py)
  bg/                 NightSky, Paper backgrounds
  ui/                 primitives: text, cards, app window + cursor, cross-section, TBM, ring, map, outro
  scenes/p0…p8.tsx    S01–S56
  Main.tsx            assembles everything + captions + audio
public/
  fonts/              Hind Siliguri + Oswald (SIL OFL, bundled for offline renders)
  sfx/, music.mp3     synthesized with ffmpeg (tools/make-sfx.sh); replace music.mp3 with any royalty-free track
```

## Notes

- **Music:** `public/music.mp3` is a simple synthesized ambient pad, so there are no licensing worries. For a more polished feel, drop in a royalty-free track (for example, from the YouTube Audio Library) with the same filename.
- **Captions:** they are burned in. To turn them off, set `SHOW_CAPTIONS = false` in `src/Main.tsx`. `out/captions.srt` can also be uploaded to YouTube as subtitles.
- **Fact-check:** facts marked ⚠ in the fact table at the end of `../SCRIPT_BN.md` should be checked before you publish.
