# PROGRESS — ৫১ সতীপীঠ video

The brief is BRIEF_51_Shakti_Peeth.md. Follow it phase by phase. This file records where the work stopped.

The project lives in `shakti-peeth-video/` inside the `arunabha369/CodeMate` repo, on branch `claude/upbeat-cerf-urudsl`.

## Status: Phase 1 done as far as possible — STOPPED, waiting for the user

| Phase | State |
|---|---|
| Env check | ✅ node 22.23, python 3.13, ffmpeg/ffprobe 6.1.1. Install edge-tts with `pip install edge-tts` in Phase 4 |
| 1 Verify + peeth data | 🟡 Done except where blocked by the network (see below). Waiting for approval |
| 2 Storyboard | ⏳ |
| 3 Assets | ⛔ blocked by the network |
| 4 Voiceover | ⛔ blocked by the network (edge-tts endpoint) |
| 5 Components | ⏳ (only npm and Google Fonts are needed, and both are reachable) |
| 6 Scenes | ⏳ |
| 7 Finish | ⏳ |
| 8 Teaser | ⏳ |

## Phase 1 outputs

* `facts.md`: 63 claims checked. 3 are CONFLICT: S24 (Kalika → Bhagavata), S41 (the 64 attributed to the Brahmanda Purana) and S52 (Kanyashram location). CHANNEL_NAME = The Bong Mindset.
* `script_changes.md`: 3 one-phrase fixes plus the channel name (S67; TTS copy দ্য বং মাইন্ডসেট).
* `src/data/peeths.json`: a **draft** with 51 entries plus Tarapith (siddhapeeth).
  * 26 entries were checked by web search and 25 are `pending`, taken from the standard Pithanirnaya list.
  * **Every lat/lon is an approximate placeholder** (`coordStatus: "approx"`). Replace them with Wikidata P625.
  * 13 West Bengal entries against Banglapedia's 14, and 6 Bangladesh entries (plus Kanyashram's alternative site) against Banglapedia's 7.
  * Panchasagar and Karnat have no identified location (lat/lon null). Show them in a "স্থান অনির্ণীত" tray.

## Waiting on the user

1. Approval of script_changes.md and peeths.json (the structure and the dispute handling).
2. ~~CHANNEL_NAME~~ ✅ **The Bong Mindset** (received 2026-10-31).
3. **Network allowlist.** The environment's network policy blocks these hosts. The user can allow them in the cloud environment settings: Network access → Allowed domains.
   * Phase 1 completion: `en.wikipedia.org`, `www.wikidata.org`, `query.wikidata.org`, `en.banglapedia.org`
   * Phase 3: `commons.wikimedia.org`, `upload.wikimedia.org`, `collectionapi.metmuseum.org`, `images.metmuseum.org`, `openaccess-api.clevelandart.org`, `openaccess-cdn.clevelandart.org`, `api.artic.edu`, `www.artic.edu`, `api.pexels.com`, `images.pexels.com`, `videos.pexels.com`, `pixabay.com`, `cdn.pixabay.com`
   * Phase 4: `speech.platform.bing.com` (edge-tts)
   * These already work: npm registry, PyPI, fonts.googleapis.com, github.com
4. PEXELS_API_KEY and PIXABAY_API_KEY, supplied as environment secrets or in `.env`. `.env` is already gitignored.
5. public/music/bg.mp3, and optional SFX in public/sfx/.

## Next steps once the hosts are allowed

1. Run one Wikidata SPARQL query for the P625 coordinates of all 51 temples. Replace every `approx` value and set `coordStatus: "wikidata"` with the QID.
2. Open the Banglapedia Sakta-pitha table. Confirm the 14 West Bengal and 7 Bangladesh peeths, identify the 14th West Bengal one, and re-check the 25 `pending` entries.
3. Re-open the Wikipedia pages behind every search-only check in facts.md, and update the "How this was checked" note.
4. Phase 2: build storyboard.json, using the approved script changes.

## Notes and decisions

* The root `.gitignore` of the CodeMate repo ignores every `public/` folder. Before committing any media in Phase 3, add `!public/` to `shakti-peeth-video/.gitignore`, or keep large media out of git.
* Timing: today is 2026-10-31 and Kali Puja is on 8 Nov 2026. S66 only makes sense if the video goes out before then.
