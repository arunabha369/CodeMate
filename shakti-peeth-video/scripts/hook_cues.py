"""Measure when the hook's key words are spoken, from the real audio (scenes S01 and S02).

cue() in src/lib/timing.ts spreads words evenly over a scene, which is fine for most scenes but
too loose for the fast cuts of the hook. This script finds the pauses between sentences in
public/audio/scene-XX.mp3 (ffmpeg silencedetect), then places each phrase by its position inside
its own sentence. Output: src/data/hookCues.json ({scene: {phrase: frame}}). Re-run after the
narration audio changes (scripts/render_all.sh does).
Usage: python3 -I scripts/hook_cues.py
"""
import json
import pathlib
import re
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
FPS = 30
PHRASES = {
    "S01": ["কলকাতার", "কালীঘাট", "অসমের", "কামাখ্যা", "পাকিস্তানের", "হিংলাজ", "শ্রীলঙ্কার", "নয়নাতিভু", "এমনকি", "মানস"],
    "S02": ["একান্নটা", "আর প্রত্যেকটার", "একটাই"],
}


def silences(path: pathlib.Path) -> tuple[list[tuple[float, float]], float]:
    out = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(path), "-af", "silencedetect=noise=-35dB:d=0.15", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", out)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", out)]
    dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)]).strip())
    return list(zip(starts, ends)), dur


def main() -> None:
    sb = {s["id"]: s for s in json.loads((ROOT / "storyboard.json").read_text())["scenes"]}
    lead = {s["id"]: s["leadInFrames"] for s in json.loads((ROOT / "src/data/durations.json").read_text())["scenes"]}
    result = {}
    for sid, phrases in PHRASES.items():
        text = sb[sid]["narration"]
        sentences = [m for m in re.finditer(r"[^।?]+[।?]?", text) if m.group().strip()]
        sil, dur = silences(ROOT / f"public/audio/scene-{sid[1:]}.mp3")
        inner = [s for s in sil if s[0] > 0.3 and s[1] < dur - 0.3]
        # the (n-1) longest inner pauses, in time order, are the sentence breaks
        breaks = sorted(sorted(inner, key=lambda s: s[0] - s[1])[: len(sentences) - 1])
        if len(breaks) < len(sentences) - 1:  # fall back to even spacing by characters
            spans = [(m.start() / len(text) * dur, m.end() / len(text) * dur) for m in sentences]
        else:
            edges = [0.0] + [t for b in breaks for t in b] + [dur]
            spans = [(edges[2 * i], edges[2 * i + 1]) for i in range(len(sentences))]
        cues = {}
        for p in phrases:
            idx = text.index(p)
            k = next(i for i, m in enumerate(sentences) if m.start() <= idx < m.end())
            m = sentences[k]
            lead_ws = len(m.group()) - len(m.group().lstrip())
            frac = max(0.0, (idx - m.start() - lead_ws) / max(1, len(m.group().strip())))
            t = spans[k][0] + frac * (spans[k][1] - spans[k][0])
            cues[p] = lead[sid] + round(t * FPS)
        result[sid] = cues
        print(sid, cues)
    (ROOT / "src/data/hookCues.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()
