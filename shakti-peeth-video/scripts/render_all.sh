#!/usr/bin/env bash
# One command after you drop your ElevenLabs files into public/audio/recorded/
# (part-1.mp3 … part-3.mp3 from ELEVENLABS_PARTS.md, and/or scene-01.mp3 … scene-67.mp3):
# re-time every scene to the new audio and render all deliverables into out/.
#   bash scripts/render_all.sh            # final.mp4, final_captions.mp4, teaser, thumbnail, SRT, description
#   bash scripts/render_all.sh --quick    # half-size preview only (about 50 min faster)
set -euo pipefail
cd "$(dirname "$0")/.."
if ls public/audio/recorded/part-* >/dev/null 2>&1; then python3 -I scripts/split_recording.py; fi
python3 -I scripts/use_recordings.py
python3 -I scripts/build_durations.py
python3 -I scripts/make_docs.py
npx tsc --noEmit
if [[ "${1:-}" == "--quick" ]]; then
  npx remotion render ShaktiPeeth out/preview_halfres.mp4 --scale=0.5 --codec=h264 --crf=22 --concurrency=4
  exit 0
fi
npx remotion render ShaktiPeeth out/final.mp4 --codec=h264 --crf=18 --concurrency=4
npx remotion render ShaktiPeethCaptions out/final_captions.mp4 --codec=h264 --crf=18 --concurrency=4
npx remotion render TeaserVertical out/teaser_vertical.mp4 --codec=h264 --crf=20 --concurrency=4
npx remotion still Thumbnail out/thumbnail.png
echo "Done: out/final.mp4, out/final_captions.mp4, out/teaser_vertical.mp4, out/thumbnail.png, out/subtitles.srt, out/youtube_description.md"
