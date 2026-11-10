"""Write ELEVENLABS_SCRIPT.md: the narration, one block per scene, with the file name to save.
Usage: python3 -I scripts/make_elevenlabs_script.py
"""
import json
import pathlib

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
