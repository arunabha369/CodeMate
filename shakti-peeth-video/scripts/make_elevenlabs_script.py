"""Write ELEVENLABS_SCRIPT.md: the narration, one block per scene, with the file name to save.
Usage: python3 -I scripts/make_elevenlabs_script.py
"""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sb = json.loads((ROOT / "storyboard.json").read_text())
chapters = {c["firstScene"]: c for c in sb["chapters"]}
lines = [
    "# ElevenLabs script — ৫১ সতীপীঠ (The Bong Mindset)",
    "",
    "One block per scene. Generate each block as its own clip and save it as the file name shown,",
    "in `public/audio/recorded/` (mp3, wav or m4a). Then run `bash scripts/render_all.sh`: it",
    "loudness-matches the clips, re-times every scene to your audio and renders the film.",
    "",
    "Delivery: calm, warm documentary narration, slightly slow; a short natural pause at each `।`.",
    "Numbers are already written out in words. Use one voice and the same settings for all 67 clips.",
    "Keep each clip clean: no music, no long silence at the start or end (edges are trimmed anyway).",
    "",
]
for s in sb["scenes"]:
    num = s["id"][1:]
    if s["id"] in chapters:
        c = chapters[s["id"]]
        bn = str(c["chapter"]).translate(str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯"))
        lines += [f"## অধ্যায় {bn} — {c['title']}" if c["chapter"] else "## শুরু", ""]
    lines += [f"### scene-{num}.mp3", "", "```", s.get("ttsText") or s["narration"], "```", ""]
(ROOT / "ELEVENLABS_SCRIPT.md").write_text("\n".join(lines))
print(f"{len(sb['scenes'])} scenes → ELEVENLABS_SCRIPT.md")

# Whole parts: paste each part in one go; scripts/split_recording.py cuts the recording into scenes.
sys.path.insert(0, str(ROOT / "scripts"))
from split_recording import PARTS  # noqa: E402

ids = [s["id"] for s in sb["scenes"]]
text = {s["id"]: s.get("ttsText") or s["narration"] for s in sb["scenes"]}
out = [
    "# ElevenLabs script in 3 parts — ৫১ সতীপীঠ (The Bong Mindset)",
    "",
    "Paste each part as one generation, exactly as written: one scene per paragraph, in this order.",
    "Download each result and save it as the file name shown, in `public/audio/recorded/`.",
    "Then run `bash scripts/render_all.sh`: it cuts the parts back into the 67 scenes",
    "(`scripts/split_recording.py`), re-times the film to your voice and renders it.",
    "Use one voice and the same settings for all three parts. If a single scene comes out wrong,",
    "regenerate just that scene from ELEVENLABS_SCRIPT.md and save it as `scene-XX.mp3`: it replaces the cut.",
    "",
]
for n, (a, b) in enumerate(PARTS, start=1):
    chunk = [text[i] for i in ids[ids.index(a): ids.index(b) + 1]]
    out += [f"## part-{n}.mp3 — scenes {a[1:]}–{b[1:]} ({sum(len(c) for c in chunk) + 2 * (len(chunk) - 1)} characters)", "", "```", "\n\n".join(chunk), "```", ""]
(ROOT / "ELEVENLABS_PARTS.md").write_text("\n".join(out))
print(f"{len(PARTS)} parts → ELEVENLABS_PARTS.md")
