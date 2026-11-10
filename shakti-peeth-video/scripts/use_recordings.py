"""Use your own voice files (e.g. from ElevenLabs) for the narration.

Put one file per scene in public/audio/recorded/, named scene-01.mp3 … scene-67.mp3
(.wav or .m4a also work). For each scene that has one, this script trims edge silence,
normalises loudness to the same level as the offline voice (-16 LUFS, true peak -1.5 dB)
and writes public/audio/scene-XX.mp3, which the film plays. Scenes without a recording keep
their current audio. Afterwards run scripts/build_durations.py so every scene re-times
itself to the new audio (scripts/render_all.sh does both, then renders).
Usage: python3 -I scripts/use_recordings.py
"""
import json
import pathlib
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
REC = ROOT / "public/audio/recorded"
OUT = ROOT / "public/audio"
FILTER = ("silenceremove=start_periods=1:start_threshold=-45dB,areverse,"
          "silenceremove=start_periods=1:start_threshold=-45dB,areverse,loudnorm=I=-16:TP=-1.5:LRA=11")


def main() -> None:
    scenes = json.loads((ROOT / "storyboard.json").read_text())["scenes"]
    used, missing = [], []
    for s in scenes:
        num = s["id"][1:]
        src = next((REC / f"scene-{num}{ext}" for ext in (".mp3", ".wav", ".m4a", ".flac") if (REC / f"scene-{num}{ext}").exists()), None)
        if not src:
            missing.append(s["id"])
            continue
        subprocess.check_call(["ffmpeg", "-loglevel", "error", "-y", "-i", str(src), "-af", FILTER,
                               "-ar", "44100", "-ac", "2", "-c:a", "libmp3lame", "-q:a", "2", str(OUT / f"scene-{num}.mp3")])
        used.append(s["id"])
    print(f"{len(used)} scenes now use your recordings.")
    if missing:
        print(f"{len(missing)} scenes keep their current audio: {' '.join(missing)}")


if __name__ == "__main__":
    main()
