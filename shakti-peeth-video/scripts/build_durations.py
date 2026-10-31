"""Build src/data/durations.json from storyboard.json.

For each scene: if public/audio/scene-XX.mp3 exists, its length comes from
ffprobe; otherwise the length is ESTIMATED from the narration (Phase 4
replaces estimates with real audio — just re-run this script).

Timing rules (brief, Phase 4):
  frames = leadIn + ceil((audio + 0.7 + tailHold) × 30) + transition overlap
  - chapter-opening scenes: +1.5 s ChapterCard (+ the 18-frame crossfade held in black,
    so the previous scene dips to black); the audio starts after the card
  - other extraHoldSec from storyboard.json is held after the audio (S24 +1.5 s silence, S35 +2 s, …)
  - every scene gets +18 frames so the next crossfade never cuts its audio

Usage: python3 -I scripts/build_durations.py
"""
import json
import math
import pathlib
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
FPS = 30
TRANSITION = 18
PAD = 0.7
WORDS_PER_SEC = 2.1  # calm Bengali narration at rate -8% (estimate only)
SENTENCE_PAUSE = 0.25

sb = json.loads((ROOT / "storyboard.json").read_text(encoding="utf-8"))
out = []
for s in sb["scenes"]:
    sid = s["id"]
    num = sid[1:]
    audio = ROOT / "public" / "audio" / f"scene-{num}.mp3"
    if audio.exists():
        sec = float(
            subprocess.check_output(
                ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(audio)],
                text=True,
            ).strip()
        )
        estimated = False
    else:
        words = len(s["ttsText"].split())
        sentences = sum(s["ttsText"].count(m) for m in "।?!")
        sec = words / WORDS_PER_SEC + SENTENCE_PAUSE * max(0, sentences - 1)
        estimated = True
    chapter_open = "ChapterCard" in s["components"]
    # ChapterCard: 1.5 s visible, plus the crossfade it spends in black (dip to black).
    lead_in = 1.5 + TRANSITION / FPS if chapter_open else 0.0
    tail = max(0.0, s.get("extraHoldSec", 0) - (1.5 if chapter_open else 0.0))
    lead_frames = round(lead_in * FPS)
    audio_frames = math.ceil(sec * FPS)
    frames = lead_frames + math.ceil((sec + PAD + tail) * FPS) + TRANSITION
    out.append({
        "id": sid,
        "audioSec": round(sec, 2),
        "estimated": estimated,
        "leadInFrames": lead_frames,
        "audioFrames": audio_frames,
        "frames": frames,
    })

total = sum(x["frames"] for x in out) - TRANSITION * (len(out) - 1)
data = {"fps": FPS, "transitionFrames": TRANSITION, "totalFrames": total, "scenes": out}
(ROOT / "src" / "data" / "durations.json").write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
est = sum(1 for x in out if x["estimated"])
print(f"scenes: {len(out)} ({est} estimated) · total {total / FPS / 60:.1f} min ({total} frames)")
