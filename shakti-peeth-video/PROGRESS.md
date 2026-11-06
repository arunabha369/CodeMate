# PROGRESS — ৫১ সতীপীঠ video (The Bong Mindset)

The brief is BRIEF_51_Shakti_Peeth.md. The project lives in `shakti-peeth-video/` inside the `arunabha369/CodeMate` repo, on branch `claude/upbeat-cerf-urudsl`.

## Status (2026-11-06)

| Phase | State |
|---|---|
| 1 Verify + peeth data | ✅ Approved: 3 script fixes, channel **The Bong Mindset**. 47 of 50 mapped peeths now use Wikidata P625 coordinates (`scripts/wikidata_places.py` → `assets/wikidata_places.json` → `scripts/fix_coords.py`); Sugandha, Prayag and Bhabanipur have no Wikidata coordinate and stay as estimates |
| 2 Storyboard | ✅ `storyboard.json` (67 scenes, rule checks pass) |
| 3 Assets | 🟢 **Real media in place.** 10 Pexels clips (via the user's vidIQ connector), the Met 2000.313 painting, 4 Cleveland Museum CC0 paintings (S05 court scene, S07 Shiva, S57 Kalighat pat, S63 Parvati) and 18 Wikimedia Commons temple photos (CC BY / CC BY-SA, subjects checked by eye). Every photo shows its credit on screen; all are logged in `assets/credits.json` and ASSETS.md. Peeths with no free photo yet show a symbolic diya card (`SymbolCard`), not a placeholder. Media files are in `public/` (not in git); `scripts/fetch_assets.py` re-downloads every pinned pick |
| 4 Voiceover | ✅ **Offline Bengali voice** for all 67 scenes. Durations come from the real audio: **9.3 min** |
| 5 Design system | ✅ + Remotion-skill polish |
| 6 Scenes | ✅ All 67 scenes built. `out/preview_full_halfres.mp4` (9:20, 960×540, AAC, -17.7 LUFS) rendered in 20 min |
| 7 Finish | 🟡 Done: `out/subtitles.srt`, `out/youtube_description.md` (`scripts/make_docs.py`), `out/thumbnail.png` (Still "Thumbnail"; it shows the drawn chakra until Met 2000.313 is sourced). Still to do after assets: 1080p `final.mp4` and `final_captions.mp4` (composition ShaktiPeethCaptions) |
| 8 Teaser | ✅ `TeaserVertical` 1080×1920, 51.5 s → `out/teaser_vertical.mp4` |

## Audio

* **Voice:** `scripts/tts_offline.py` produces `public/audio/scene-XX.mp3`.
  * Engine: sherpa-onnx (Apache-2.0).
  * Voice: `vits-coqui-bn-custom_female`, from github.com/mobassir94/comprehensive-bangla-tts (**MIT**). It's a Bangladeshi-Bangla female voice.
  * It runs at length_scale 1.08 (the brief's -8%) and is loudness-normalised.
  * Why: the brief's edge-tts (bn-IN-BashkarNeural) needs `speech.platform.bing.com`, which is blocked here. If that host is allowed later, edge-tts can replace this voice. Re-run `python3 -I scripts/build_durations.py` afterwards.
  * Your own recordings in `public/audio/recorded/scene-XX.mp3` take priority.
  * Model: `python3 scripts/tts_offline.py --fetch` downloads it to `tools/` (gitignored).
* **Music and SFX:** `scripts/make_audio.py` synthesises original audio with numpy, so there are no rights issues.
  * Music: a tanpura-style drone in C#, as a seamless 114 s loop (`public/music/bg.mp3`).
  * SFX: damaru (S31), chimes (S35), dhak (S64), in `public/sfx/`. Cues are set in `src/data/sfx.ts`.
  * Mixed in `src/Film.tsx` with `@remotion/media`: music at 0.07 under voice, 0.15 on chapter cards, 0.02 in S24, with 2 s fades.
* Media in `public/` (audio, music, sfx) is generated and **not committed**. Regenerate it with the scripts above. Only `public/fonts/` and `public/textures/` are in git.

## Visual polish (Remotion skill: github.com/remotion-dev/skills)

* `@remotion/media` `<Audio>`.
* `FilmFinish`: vignette plus a moving grain texture over the whole film.
* `CameraDrift`: a slow push or pull and drift on every scene.
* Blur-in, word-by-word reveals in Headline and QuoteCard.
* A bokeh depth layer in night backgrounds.
* A light-leak flare on chapter cards. It's CSS-based: `@remotion/effects` lightLeak needs WebGL2, which only works with `--gl=swangle` here, and that made renders about 3× slower (83 s vs 26 s per 150 frames). Renders use `swiftshader`, set in remotion.config.ts.
* Drawn fallbacks until B-roll exists: storm and sea (S32), three seas (S52), kash field (S64), diya row (S66). Optional paintings (Virabhadra, Parvati, Kalighat pat) are simply omitted when missing.

## Render commands

```
npm install
python3 -I scripts/tts_offline.py --fetch && python3 -I scripts/tts_offline.py   # voice
python3 -I scripts/make_audio.py                                                # music + sfx
python3 -I scripts/build_durations.py                                           # timings from audio
npx tsc --noEmit
node scripts/scene_stills.mjs 1 67 0.6                                          # one still per scene
npx remotion render ShaktiPeeth out/preview_full_halfres.mp4 --scale=0.5 --codec=h264 --crf=22
npx remotion render ShaktiPeeth out/final.mp4 --codec=h264 --crf=18             # final, 1080p
```

Render speed here is about 0.17 s per frame at half scale (≈50 min for the whole film). Expect roughly 2–3× that at 1080p.

## Waiting on the user

1. ~~Network allowlist~~ Done (2026-11-05). Note: Wikimedia rate-limits this shared IP heavily (HTTP 429), so Commons fetches go one request every ~45 s. The hosts that were allowed:
   * `commons.wikimedia.org`, `upload.wikimedia.org`
   * `collectionapi.metmuseum.org`, `images.metmuseum.org`
   * `api.artic.edu`, `www.artic.edu`
   * `openaccess-api.clevelandart.org`, `openaccess-cdn.clevelandart.org`
   * `api.pexels.com`, `videos.pexels.com`, `images.pexels.com`
   * `pixabay.com`, `cdn.pixabay.com`
   * `en.wikipedia.org`, `www.wikidata.org`, `query.wikidata.org`, `en.banglapedia.org` (fact and coordinate checks)
   * `speech.platform.bing.com` (optional: the brief's male bn-IN voice)
2. PEXELS_API_KEY and PIXABAY_API_KEY, for B-roll.
3. Or: your own photos in `public/own/`, wired in through `src/data/assets.json`.

## Next steps once the network opens

1. `python3 scripts/fetch_assets.py`, then review `out/assets_contact_sheet.jpg` and reject wrong picks.
2. Run a Wikidata P625 query and replace every `approx` coordinate in peeths.json. Confirm the Banglapedia 14 West Bengal + 7 Bangladesh lists.
3. Render the 1080p final, the captioned FB version, SRT, thumbnail, youtube_description.md and the vertical teaser.

## Known gaps

* peeths.json has 13 West Bengal dots against the narration's "চোদ্দোটা". The 14th needs the Banglapedia table.
* I can't listen to audio in this environment. The offline voice was checked by waveform and spectrogram (natural speech structure, about -17 LUFS), not by ear, so listen for mispronunciations.
