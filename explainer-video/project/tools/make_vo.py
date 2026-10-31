#!/usr/bin/env python3
"""
Generate the Bengali voice-over, one file per scene, then write src/vo-durations.json
so the video re-times itself to the real narration.

Run this on YOUR computer (the cloud build container cannot reach TTS services).

Engines
  edge        Free Microsoft Edge neural voices (pip install edge-tts). No key needed.
              Voices: bn-IN-BashkarNeural (male, default), bn-IN-TanishaaNeural (female),
                      bn-BD-PradeepNeural (male, Bangladesh), bn-BD-NabanitaNeural (female, Bangladesh)
  azure       Azure Speech (official). Needs AZURE_SPEECH_KEY and AZURE_SPEECH_REGION.
  elevenlabs  ElevenLabs. Needs ELEVENLABS_API_KEY and --voice <voice_id>. Use a model that supports Bengali.
  files       Use your own recordings already saved as public/vo/S01.mp3 … S56.mp3 (just measures them).

Examples
  python3 tools/make_vo.py --engine edge
  python3 tools/make_vo.py --engine edge --voice bn-IN-TanishaaNeural --rate +8%
  python3 tools/make_vo.py --engine azure --voice bn-IN-BashkarNeural
  python3 tools/make_vo.py --engine elevenlabs --voice <VOICE_ID> --model eleven_v3
  python3 tools/make_vo.py --engine files
Then render:  npm run render
"""
import argparse
import asyncio
import json
import os
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VO_DIR = ROOT / "public" / "vo"
DUR_FILE = ROOT / "src" / "vo-durations.json"


def load_scenes():
    src = (ROOT / "src" / "script.generated.ts").read_text(encoding="utf-8")
    start = src.index("= [") + 2
    end = src.rindex("]") + 1
    return json.loads(src[start:end])


def duration(path: Path) -> float:
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)]
    )
    return round(float(out.decode().strip()), 3)


def trim_silence(path: Path):
    """Remove leading/trailing silence so scene timing is tight."""
    tmp = path.with_suffix(".tmp.mp3")
    f = "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse"
    subprocess.check_call(["ffmpeg", "-y", "-loglevel", "error", "-i", str(path), "-af", f, "-b:a", "192k", str(tmp)])
    tmp.replace(path)


async def edge_tts_one(text, out, voice, rate):
    import edge_tts  # pip install edge-tts

    await edge_tts.Communicate(text, voice, rate=rate).save(str(out))


def azure_one(text, out, voice, rate):
    key = os.environ["AZURE_SPEECH_KEY"]
    region = os.environ["AZURE_SPEECH_REGION"]
    lang = "-".join(voice.split("-")[:2])
    ssml_text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    ssml_text = re.sub(r"।\s*", '।<break time="250ms"/> ', ssml_text)
    ssml = (
        f'<speak version="1.0" xml:lang="{lang}"><voice name="{voice}">'
        f'<prosody rate="{rate}">{ssml_text}</prosody></voice></speak>'
    )
    req = urllib.request.Request(
        f"https://{region}.tts.speech.microsoft.com/cognitiveservices/v1",
        data=ssml.encode("utf-8"),
        headers={
            "Ocp-Apim-Subscription-Key": key,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-48khz-192kbitrate-mono-mp3",
            "User-Agent": "ganga-metro-explainer",
        },
    )
    out.write_bytes(urllib.request.urlopen(req).read())


def elevenlabs_one(text, out, voice, model):
    key = os.environ["ELEVENLABS_API_KEY"]
    body = json.dumps(
        {"text": text, "model_id": model, "voice_settings": {"stability": 0.45, "similarity_boost": 0.8, "style": 0.3}}
    ).encode("utf-8")
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format=mp3_44100_192",
        data=body,
        headers={"xi-api-key": key, "Content-Type": "application/json"},
    )
    out.write_bytes(urllib.request.urlopen(req).read())


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--engine", choices=["edge", "azure", "elevenlabs", "files"], default="edge")
    ap.add_argument("--voice", default="bn-IN-BashkarNeural")
    ap.add_argument("--rate", default="+5%", help="speaking rate for edge/azure, e.g. +5%%")
    ap.add_argument("--model", default="eleven_v3", help="ElevenLabs model id")
    ap.add_argument("--only", help="comma-separated scene ids to (re)generate, e.g. S01,S02")
    ap.add_argument("--no-trim", action="store_true", help="keep leading/trailing silence")
    args = ap.parse_args()

    VO_DIR.mkdir(parents=True, exist_ok=True)
    scenes = load_scenes()
    only = set(args.only.split(",")) if args.only else None
    durations = json.loads(DUR_FILE.read_text()) if DUR_FILE.exists() else {}

    for s in scenes:
        sid, text = s["id"], s["vo"]
        out = VO_DIR / f"{sid}.mp3"
        if only and sid not in only:
            continue
        if args.engine == "files":
            if not out.exists():
                print(f"  skip {sid}: {out} not found")
                continue
        else:
            print(f"  {sid}: generating…", flush=True)
            if args.engine == "edge":
                asyncio.run(edge_tts_one(text, out, args.voice, args.rate))
            elif args.engine == "azure":
                azure_one(text, out, args.voice, args.rate)
            else:
                elevenlabs_one(text, out, args.voice, args.model)
            if not args.no_trim:
                trim_silence(out)
        durations[sid] = duration(out)

    DUR_FILE.write_text(json.dumps(durations, indent=2, ensure_ascii=False) + "\n")
    total = sum(durations.values())
    print(f"\nWrote {DUR_FILE.relative_to(ROOT)} — {len(durations)} scenes, {total/60:.1f} min of speech.")
    missing = [s["id"] for s in scenes if s["id"] not in durations]
    if missing:
        print("Scenes still using estimated timing:", ", ".join(missing))
    print("Next: npm run render")


if __name__ == "__main__":
    sys.exit(main())
