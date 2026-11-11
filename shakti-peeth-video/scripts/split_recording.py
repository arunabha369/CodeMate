"""Split long ElevenLabs recordings (the parts in ELEVENLABS_PARTS.md) into scene files.

Put the parts in public/audio/recorded/ as part-1.mp3, part-2.mp3, part-3.mp3 (wav/m4a also work).

How the cuts are found (the same idea as TTS-based aligners such as aeneas):
1. The offline voice in public/audio/offline/ reads the same scenes, so for it every scene boundary
   is known. Those clips are joined into a reference for each part.
2. The recording is aligned to that reference with dynamic time warping on speaker-normalised
   MFCC features, which maps each known boundary onto the recording.
3. Each mapped boundary is snapped to the nearest real pause in the recording, so cuts never land
   inside a word.
The script then writes public/audio/recorded/split/scene-XX.mp3 and prints every cut, flagging any it is
unsure of: listen to those, and if one is off, regenerate just that scene and save it as scene-XX.mp3.
Usage: python3 -I scripts/split_recording.py [folder]      (then: bash scripts/render_all.sh)
"""
import json
import pathlib
import subprocess
import sys

import numpy as np

ROOT = pathlib.Path(__file__).resolve().parent.parent
REC = pathlib.Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / "public/audio/recorded"
OUT = REC / "split"  # hand-made REC/scene-XX files always win over these (use_recordings.py)
REF = ROOT / "public/audio/offline"
SR = 16000
HOP = 0.02  # 50 feature frames per second
WIN = 0.025
REF_GAP = 0.3  # silence placed between reference scenes
SNAP = 1.4  # seconds either side of a mapped boundary to look for a pause
MIN_PAUSE = 0.12

# Each part starts at a chapter: chapters 0–3, 4–6 and 7–9. make_elevenlabs_script.py imports this.
PARTS = [("S01", "S24"), ("S25", "S43"), ("S44", "S67")]


def load(path: pathlib.Path) -> np.ndarray:
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", str(path), "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"],
                         check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0


def frames(x: np.ndarray) -> np.ndarray:
    hop, win = int(SR * HOP), int(SR * WIN)
    n = max(1, 1 + (len(x) - win) // hop)
    idx = np.arange(win)[None, :] + hop * np.arange(n)[:, None]
    return x[np.minimum(idx, len(x) - 1)] * np.hamming(win)[None, :]


def mel_fb(nfft: int, n_mels: int = 26, fmin: float = 80, fmax: float = 7600) -> np.ndarray:
    mel = lambda f: 2595 * np.log10(1 + f / 700)
    inv = lambda m: 700 * (10 ** (m / 2595) - 1)
    pts = inv(np.linspace(mel(fmin), mel(fmax), n_mels + 2))
    bins = np.floor((nfft + 1) * pts / SR).astype(int)
    fb = np.zeros((n_mels, nfft // 2 + 1))
    for m in range(1, n_mels + 1):
        a, b, c = bins[m - 1], bins[m], bins[m + 1]
        fb[m - 1, a:b] = (np.arange(a, b) - a) / max(1, b - a)
        fb[m - 1, b:c] = (c - np.arange(b, c)) / max(1, c - b)
    return fb


def features(x: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """Per-frame MFCC 1–12 + normalised log energy (speaker-normalised), and frame energy in dB."""
    f = frames(x)
    nfft = 512
    power = np.abs(np.fft.rfft(f, nfft)) ** 2
    logmel = np.log(power @ mel_fb(nfft).T + 1e-10)
    n = logmel.shape[1]
    dct = np.cos(np.pi / n * (np.arange(n)[None, :] + 0.5) * np.arange(13)[:, None])
    mfcc = logmel @ dct.T
    energy_db = 10 * np.log10(power.sum(axis=1) / nfft + 1e-12)
    feats = np.column_stack([mfcc[:, 1:13], (energy_db - energy_db.mean()) / (energy_db.std() + 1e-6) * 2.0])
    feats = (feats - feats.mean(axis=0)) / (feats.std(axis=0) + 1e-6)  # cepstral mean/variance norm per file
    feats /= np.linalg.norm(feats, axis=1, keepdims=True) + 1e-9
    return feats, energy_db


def dtw_map(rec: np.ndarray, ref: np.ndarray) -> np.ndarray:
    """For each reference frame, the recording frame aligned to it (monotonic DTW).
    Steps per recording frame: reference advances 0, 1 or 2 frames (recording up to 2× faster)."""
    n, m = len(rec), len(ref)
    big = np.float32(1e9)
    prev = np.full(m, big, dtype=np.float32)
    back = np.zeros((n, m), dtype=np.int8)
    for i in range(n):
        cost = (1.0 - ref @ rec[i]).astype(np.float32)
        if i == 0:
            cur = np.full(m, big, dtype=np.float32)
            cur[0] = cost[0]
        else:
            stay = prev
            one = np.concatenate([[big], prev[:-1]])
            two = np.concatenate([[big, big], prev[:-2]])
            best = np.minimum(np.minimum(stay, one), two)
            back[i] = np.where(best == stay, 0, np.where(best == one, 1, 2))
            cur = cost + best
        prev = cur
    # Backtrack from the last frame of both: the reference frame used at each recording frame.
    path_j = np.empty(n, dtype=np.int64)
    j = m - 1
    for i in range(n - 1, -1, -1):
        path_j[i] = j
        if i > 0:
            j = max(0, j - int(back[i, j]))
    # Invert (path is non-decreasing): for each reference frame, the first recording frame reaching it.
    return np.minimum(np.searchsorted(path_j, np.arange(m), side="left"), n - 1)


def pauses(energy_db: np.ndarray) -> list[tuple[float, float]]:
    speech = np.percentile(energy_db, 90)
    silent = energy_db < max(speech - 30, energy_db.min() + 6)
    runs, start = [], None
    for i, s in enumerate(np.append(silent, False)):
        if s and start is None:
            start = i
        elif not s and start is not None:
            if (i - start) * HOP >= MIN_PAUSE:
                runs.append((start * HOP, i * HOP))
            start = None
    return runs


def main() -> None:
    sb = json.loads((ROOT / "storyboard.json").read_text())
    ids = [s["id"] for s in sb["scenes"]]
    if not REF.exists():
        raise SystemExit(f"{REF.relative_to(ROOT)} is missing: run python3 -I scripts/tts_offline.py, then copy public/audio/scene-*.mp3 there")
    written, unsure = 0, []
    OUT.mkdir(parents=True, exist_ok=True)
    for n, (a, b) in enumerate(PARTS, start=1):
        src = next((REC / f"part-{n}{ext}" for ext in (".mp3", ".wav", ".m4a", ".flac") if (REC / f"part-{n}{ext}").exists()), None)
        if not src:
            print(f"part-{n} not found in {REC} (scenes {a}–{b}): skipped")
            continue
        scenes = ids[ids.index(a): ids.index(b) + 1]
        # Reference: offline clips joined with short gaps; remember where each scene ends.
        gap = np.zeros(int(REF_GAP * SR), dtype=np.float32)
        chunks, ends, t = [gap], [], REF_GAP
        for s in scenes:
            x = load(REF / f"scene-{s[1:]}.mp3")
            chunks += [x, gap]
            t += len(x) / SR
            ends.append(t + REF_GAP / 2)
            t += REF_GAP
        ref_feats, _ = features(np.concatenate(chunks))
        y = load(src)
        rec_feats, rec_energy = features(y)
        mapping = dtw_map(rec_feats, ref_feats)
        ps = pauses(rec_energy)
        speech_frames = np.where(rec_energy > np.percentile(rec_energy, 90) - 30)[0]
        first, last = speech_frames[0] * HOP, (speech_frames[-1] + 1) * HOP
        cuts = []
        for e in ends[:-1]:
            guess = mapping[min(int(e / HOP), len(mapping) - 1)] * HOP
            near = [(abs((p0 + p1) / 2 - guess) - 0.25 * min(p1 - p0, 1.0), (p0 + p1) / 2, p1 - p0) for p0, p1 in ps if abs((p0 + p1) / 2 - guess) <= SNAP]
            if near:
                _, mid, length = min(near)
                cuts.append((mid, abs(mid - guess), length))
            else:
                cuts.append((guess, None, 0.0))
        edges = [first] + [c[0] for c in cuts] + [last]
        print(f"part-{n}: {len(scenes)} scenes, {last - first:.1f} s of speech, {len(ps)} pauses")
        for k, s in enumerate(scenes):
            t0, t1 = edges[k], edges[k + 1]
            note = ""
            if k < len(cuts):
                _, dist, length = cuts[k]
                if dist is None:
                    note = "   <-- no pause near this cut: listen to the end of this scene"
                elif dist > 0.9 or length < 0.2:
                    note = "   <-- unsure: listen to the end of this scene"
            if t1 <= t0 + 0.3:
                note = "   <-- empty: cut failed"
            if note:
                unsure.append(s)
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", f"{max(0.0, t0 - 0.04):.3f}", "-to", f"{t1 + 0.06:.3f}", "-i", str(src),
                            "-c:a", "libmp3lame", "-q:a", "2", str(OUT / f"scene-{s[1:]}.mp3")], check=True)
            print(f"  {s}  {t0:7.2f}–{t1:7.2f} s  ({t1 - t0:4.1f} s){note}")
            written += 1
    print(f"\n{written} scene files written to {OUT}.")
    if unsure:
        print("Listen to the end of these scenes first:", " ".join(unsure))
        print("If one is wrong, regenerate just that scene in ElevenLabs and save it as public/audio/recorded/scene-XX.mp3.")


if __name__ == "__main__":
    main()
