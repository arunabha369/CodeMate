# Bengali animated explainer — Claude Code kit

| File | What it is |
|---|---|
| `PROMPT.md` | The master prompt to paste into Claude Code. It contains the full style guide (colours, fonts, motion, components), the Remotion build pipeline, voice-over/caption setup, QA checklist, and a short template for any future topic. |
| `SCRIPT_BN.md` | An original 9–10 minute Bengali script: "গঙ্গার নিচে মেট্রো" (how Kolkata's under-river metro works). It has 56 scenes with visuals, on-screen text, narration, a 5-second hook, duration controls and a sourced fact table. |
| `HOWRAH_BRIDGE_PROMPT.md` | Master prompt for the next video, **"হাওড়া ব্রিজ কীভাবে তৈরি হলো"**. It covers the research brief with checked facts, a chapter-by-chapter story blueprint, the parametric bridge hero asset, a new archive/sepia look, camera moves, and the voice-first workflow and QA checklist. Paste it into Claude Code. |
| `HOWRAH_SCRIPT_BN.md` | Ready-to-use script for the Howrah Bridge video: 53 scenes, ~1,300 words (~9–10 min), with visuals, on-screen text, narration and a sourced fact table. |
| `HOWRAH_VO_ELEVENLABS.md` | The same narration as 53 copy-paste clips for ElevenLabs, with recommended settings, pronunciation fixes and file naming (`S01.mp3`…). |
| `project/` | **The built video project** (Remotion). It contains all 56 scenes, captions, sound effects and music, plus a voice-over tool. See `project/README.md` to preview, add the Bengali narration, and render. |

## Quick start

```bash
mkdir my-video && cd my-video
cp /path/to/explainer-video/SCRIPT_BN.md .
# optional: put music.mp3 here, and your own recordings as public/vo/S01.mp3 … S56.mp3
claude
```

Then paste everything below the line in `PROMPT.md` as your first message.

For Bengali TTS, set one of these before starting:

```bash
export AZURE_SPEECH_KEY=... AZURE_SPEECH_REGION=...
```

```bash
export ELEVENLABS_API_KEY=...
```

Without a key, Claude Code still builds and previews the full video with placeholder timing. It re-times automatically when you add the voice files.

## Why the reference clips are not reused

Having no watermark does not mean a video is free to use. The original creator still owns the copyright. Re-uploading even parts of it can trigger YouTube copyright claims or strikes, and "reused content" demonetisation. This style is 100% flat vector motion graphics, so every shot can be rebuilt from code. That is what `PROMPT.md` does: same look and feel, all-original assets and script.
