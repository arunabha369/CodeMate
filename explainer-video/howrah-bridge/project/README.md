# হাওড়া ব্রিজ কীভাবে তৈরি হলো — Remotion project

Built on the engine from `../../project` (the metro film), with a new archive world, a camera system,
real-photo cards and the parametric `<HowrahBridge>` hero (`src/hero/HowrahBridge.tsx`).

Status: **checkpoint D (style board)**. 9 representative scenes are built; the rest come after your OK.

## Commands

```bash
npm ci
```

```bash
npm run parse
```

```bash
npm run vo -- --engine edge --voice bn-IN-BashkarNeural --rate +5%
```

```bash
npm run photos
```

```bash
npm run board
```

```bash
npm run studio
```

- `parse` reads `../SCRIPT_BN.md` into `src/script.generated.ts`.
- `vo` makes one MP3 per scene in `public/vo/`, plus word timings, and writes `src/vo-durations.json`. All
  animation cues are proportional to each scene's narration, so the film re-times itself to the real voice.
  Female voice: `--voice bn-IN-TanishaaNeural`. Own recordings: put `public/vo/S01.mp3 …` and use `--engine files`.
- `photos` downloads the real-photo slots after confirming each licence from the source (see `../research/photos.md`).
  Scenes fall back to their drawings for any slot that isn't cleared.
- `board` renders the 3×3 style board to `out/stills/board.png`.

In the Claude Code cloud container, `vo` and `photos` need these hosts allowed in the environment's network settings:
`speech.platform.bing.com`, `commons.wikimedia.org`, `upload.wikimedia.org`, `unsplash.com`, `images.unsplash.com`.
