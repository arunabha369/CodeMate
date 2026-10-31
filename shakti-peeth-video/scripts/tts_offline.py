"""Offline Bengali voiceover for every scene (Phase 4 fallback).

The brief's voice (edge-tts, bn-IN-BashkarNeural) needs speech.platform.bing.com,
which this session's network policy blocks. This script uses an offline
Bengali VITS voice instead:

  model : vits-coqui-bn-custom_female (sherpa-onnx export of the Coqui
          "bn/custom/vits-female" model from github.com/mobassir94/comprehensive-bangla-tts,
          MIT licence)
  engine: sherpa-onnx (Apache-2.0)

For each scene: public/audio/recorded/scene-XX.mp3 (your own recording) wins;
otherwise ttsText is synthesised at a slightly slower pace (the brief's -8%),
loudness-normalised and saved as public/audio/scene-XX.mp3.

Usage:
  python3 scripts/tts_offline.py --fetch     # download the model into tools/
  python3 scripts/tts_offline.py [S01 S02 …] # synthesise (all scenes by default)
"""
import json
import pathlib
import shutil
import subprocess
import sys
import tempfile
import unicodedata

ROOT = pathlib.Path(__file__).resolve().parent.parent
MODEL_DIR = ROOT / "tools" / "tts-bn-female"
MODEL_URL = "https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-coqui-bn-custom_female.tar.bz2"
LENGTH_SCALE = 1.08  # ≈ rate -8%


def fetch() -> None:
    (ROOT / "tools").mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        tar = pathlib.Path(tmp) / "m.tar.bz2"
        subprocess.check_call(["curl", "-sS", "-L", "--fail", "-o", str(tar), MODEL_URL])
        subprocess.check_call(["tar", "-xjf", str(tar), "-C", tmp])
        shutil.move(str(pathlib.Path(tmp) / "vits-coqui-bn-custom_female"), str(MODEL_DIR))
    print("model ->", MODEL_DIR)


def clean(text: str) -> str:
    # Precomposed ড় ঢ় য় are in the vocabulary; NFC keeps them that way.
    text = unicodedata.normalize("NFC", text)
    return text.replace("—", ", ")


def main(ids: list[str]) -> None:
    import sherpa_onnx
    import soundfile as sf

    cfg = sherpa_onnx.OfflineTtsConfig(
        model=sherpa_onnx.OfflineTtsModelConfig(
            vits=sherpa_onnx.OfflineTtsVitsModelConfig(
                model=str(MODEL_DIR / "model.onnx"),
                tokens=str(MODEL_DIR / "tokens.txt"),
                length_scale=LENGTH_SCALE,
            ),
            num_threads=4,
        ),
        max_num_sentences=1,
    )
    tts = sherpa_onnx.OfflineTts(cfg)
    sb = json.loads((ROOT / "storyboard.json").read_text(encoding="utf-8"))
    out_dir = ROOT / "public" / "audio"
    out_dir.mkdir(parents=True, exist_ok=True)
    for s in sb["scenes"]:
        if ids and s["id"] not in ids:
            continue
        num = s["id"][1:]
        dest = out_dir / f"scene-{num}.mp3"
        recorded = out_dir / "recorded" / f"scene-{num}.mp3"
        if recorded.exists():
            shutil.copy(recorded, dest)
            print(s["id"], "recorded")
            continue
        audio = tts.generate(clean(s["ttsText"]), sid=0, speed=1.0)
        with tempfile.TemporaryDirectory() as tmp:
            wav = pathlib.Path(tmp) / "a.wav"
            sf.write(str(wav), audio.samples, audio.sample_rate)
            # Trim edge silence, normalise loudness (≈ -16 LUFS), 44.1 kHz stereo MP3.
            subprocess.check_call([
                "ffmpeg", "-loglevel", "error", "-y", "-i", str(wav),
                "-af", "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,loudnorm=I=-16:TP=-1.5:LRA=11",
                "-ar", "44100", "-ac", "2", "-b:a", "192k", str(dest),
            ])
        print(s["id"], f"{len(audio.samples) / audio.sample_rate:.1f}s")


if __name__ == "__main__":
    if "--fetch" in sys.argv:
        fetch()
    else:
        main([a for a in sys.argv[1:] if a.startswith("S")])
