# হাওড়া ব্রিজ কীভাবে তৈরি হলো — working folder

| File | What it is |
|---|---|
| `SCRIPT_BN.md` | The original Bengali script: 65 scenes, 3 hook options, chapter list, optional beats (X1–X3), cuttable lines (✂) and a fact table. |
| `research/facts.md` | Every number and date with its source and a confidence mark (✅ / ⚠ / ✖). |
| `research/photos.md` | Real-photo slots (P01–P07), the best copyright-free candidates, and the licence rules. |
| `project/` | The Remotion project, built on the engine in `../project`. It has the new archive world, camera, photo cards and the parametric bridge drawing. See `project/README.md`. |
| `style-board.png` | The 3×3 style board: 9 representative scenes. |

Status: **the full film is rendered with the ElevenLabs narration** (voice: Ashwat), Bengali captions, music and sound effects. 10:29, mastered to -14 LUFS.

- The video, thumbnail, subtitles and YouTube kit are in `deliverables/`. The MP4 itself is too big for git, so it's sent separately.
- To add a voice later, put `S01.mp3 … S65.mp3` in `project/public/vo/` (lines: `VOICE_LINES.md`), then run the commands below. The whole film re-times to the voice.

```bash
cd project && python3 tools/make_vo.py --engine files && npx remotion render Main out/final.mp4 --codec=h264 --crf=18 --audio-bitrate=320k
```

## Blocked in the cloud session

The cloud environment's network policy currently blocks these hosts:

| Needed for | Host(s) to allow |
|---|---|
| Bengali voice (edge-tts) | `speech.platform.bing.com` |
| Real photos | `commons.wikimedia.org`, `upload.wikimedia.org`, `unsplash.com`, `images.unsplash.com` |
| Fact checking (optional) | `en.wikipedia.org` |
