"""Synthesise original, copyright-free music and SFX (no samples, no downloads).

  public/music/bg.mp3          tanpura-style drone bed in C# (Sa), seamless loop (~115 s)
  public/sfx/damaru.mp3        damaru rattle for S31 (tandava)
  public/sfx/chimes.mp3        soft pentatonic chime cascade for S35 (dots landing)
  public/sfx/dhak.mp3          dhak rhythm for S64 (Durga / autumn)

Everything is generated from sine partials and filtered noise with numpy, so
the audio is original work with no third-party rights. Re-run any time:
  python3 scripts/make_audio.py
"""
import pathlib
import subprocess
import tempfile

import numpy as np
import soundfile as sf

ROOT = pathlib.Path(__file__).resolve().parent.parent
SR = 44100
rng = np.random.default_rng(51)

SA = 138.59  # C#3


def t_axis(sec: float) -> np.ndarray:
    return np.arange(int(sec * SR)) / SR


def lowpass(x: np.ndarray, cutoff: float) -> np.ndarray:
    # One-pole low-pass (vectorised via cumulative filter on chunks is overkill; use FFT).
    n = len(x)
    f = np.fft.rfftfreq(n, 1 / SR)
    X = np.fft.rfft(x)
    X *= 1 / np.sqrt(1 + (f / cutoff) ** 4)
    return np.fft.irfft(X, n)


def bandpass(x: np.ndarray, lo: float, hi: float) -> np.ndarray:
    n = len(x)
    f = np.fft.rfftfreq(n, 1 / SR)
    X = np.fft.rfft(x)
    X *= ((f > lo) & (f < hi)).astype(float)
    return np.fft.irfft(X, n)


def mix(out: np.ndarray, x: np.ndarray, at: int) -> None:
    """Add x into out starting at sample `at`, clipped to out's bounds."""
    at = max(0, at)
    if at >= len(out):
        return
    n = min(len(x), len(out) - at)
    out[at : at + n] += x[:n]


def tanpura_pluck(f0: float, sec: float = 6.0) -> np.ndarray:
    """Additive string with a 'jawari' bloom: upper partials swell after the attack."""
    t = t_axis(sec)
    y = np.zeros_like(t)
    for k in range(1, 36):
        fk = f0 * k * (1 + 0.0004 * k)  # slight stiffness
        if fk > 9000:
            break
        amp = 1 / k**0.85
        decay = np.exp(-t / (5.5 / (1 + 0.08 * k)))
        bloom = 1.0 if k <= 4 else (0.35 + 0.65 * (1 - np.exp(-t / (0.25 + 0.02 * k))))
        shimmer = 1 + 0.15 * np.sin(2 * np.pi * (0.7 + 0.05 * k) * t + k)
        y += amp * decay * bloom * shimmer * np.sin(2 * np.pi * fk * t + rng.uniform(0, 6.28))
    attack = 1 - np.exp(-t / 0.004)
    return y * attack


def music_bed() -> np.ndarray:
    cycle = 4.4
    n_cycles = 26
    total = cycle * n_cycles
    out = np.zeros(int((total + 7) * SR))
    # Pa (low) · Sa · Sa · Sa (low): the classic tanpura cycle
    pattern = [(0.0, SA * 0.749, 0.9), (1.15, SA, 0.7), (1.85, SA, 0.65), (2.7, SA / 2, 1.0)]
    plucks = {}
    for c in range(n_cycles):
        for off, f, a in pattern:
            key = round(f, 2)
            if key not in plucks:
                plucks[key] = tanpura_pluck(f)
            p = plucks[key] * a * (0.92 + 0.08 * rng.random())
            i = max(0, int((c * cycle + off + rng.normal(0, 0.008)) * SR))
            mix(out, p, i)
    # Soft harmonium-like pad on Sa / Pa with slow breathing
    t = t_axis(total + 7)
    pad = np.zeros_like(t)
    for f, a in [(SA / 2, 0.5), (SA, 0.35), (SA * 1.498, 0.22), (SA * 2, 0.12)]:
        for det in (-0.6, 0.6):
            pad += a * np.sin(2 * np.pi * (f + det) * t)
    pad *= 0.55 + 0.45 * np.sin(2 * np.pi * t / 17.6) ** 2
    out += 0.18 * pad / np.max(np.abs(pad))
    # Air: very soft filtered noise
    out += 0.02 * lowpass(rng.normal(0, 1, len(out)), 900)
    # Seamless loop: fold the tail past `total` back onto the start.
    n = int(total * SR)
    tail = out[n:]
    out = out[:n].copy()
    out[: len(tail)] += tail
    return out


def chime(f0: float, sec: float = 2.5) -> np.ndarray:
    t = t_axis(sec)
    y = np.zeros_like(t)
    for ratio, amp, tau in [(1, 1, 1.4), (2.76, 0.45, 0.6), (5.40, 0.25, 0.3), (8.93, 0.12, 0.15)]:
        y += amp * np.exp(-t / tau) * np.sin(2 * np.pi * f0 * ratio * t)
    return y * (1 - np.exp(-t / 0.002))


def chimes_cascade() -> np.ndarray:
    sec = 8.0
    out = np.zeros(int(sec * SR))
    scale = [SA * 8 * r for r in (1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2)]  # pentatonic, high register
    times = np.sort(rng.uniform(0, 5.5, 26) ** 1.3)
    for i, tm in enumerate(times):
        c = chime(scale[rng.integers(0, len(scale))]) * (0.55 + 0.45 * rng.random()) * (1 - 0.4 * tm / 6)
        j = int(tm * SR)
        mix(out, c, j)
    return out


def drum_hit(f_start: float, f_end: float, sec: float, noise_amt: float, tau: float) -> np.ndarray:
    t = t_axis(sec)
    f = f_end + (f_start - f_end) * np.exp(-t / 0.03)
    phase = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(phase) * np.exp(-t / tau)
    click = bandpass(rng.normal(0, 1, len(t)), 1500, 7000) * np.exp(-t / 0.008)
    return body + noise_amt * click


def damaru() -> np.ndarray:
    sec = 3.2
    out = np.zeros(int(sec * SR))
    # Rattle bursts: the bead strikes both heads alternately, accelerating then easing.
    t = 0.05
    k = 0
    while t < 2.9:
        hi = k % 2 == 0
        h = drum_hit(620 if hi else 520, 430 if hi else 360, 0.18, 0.5, 0.05) * (0.8 if hi else 0.7)
        j = int(t * SR)
        mix(out, h, j)
        gap = 0.075 if (k // 6) % 2 == 0 else 0.11
        t += gap
        k += 1
    return out


def dhak() -> np.ndarray:
    # A simple festive dhak phrase: dhin (low, open) / tak (slap), 2 bars at ~132 bpm.
    beat = 60 / 132
    phrase = ["D", "-", "T", "T", "D", "T", "D", "-", "D", "-", "T", "T", "D", "T", "D", "D"]
    sec = beat / 2 * len(phrase) * 2 + 1.5
    out = np.zeros(int(sec * SR))
    for rep in range(2):
        for i, s in enumerate(phrase):
            if s == "-":
                continue
            h = drum_hit(150, 82, 0.9, 0.25, 0.28) if s == "D" else drum_hit(320, 210, 0.25, 0.9, 0.06) * 0.7
            j = int(((rep * len(phrase) + i) * beat / 2) * SR)
            mix(out, h, j)
    return out


def write(path: pathlib.Path, y: np.ndarray, lufs: float, stereo_width: float = 0.0) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    y = y / (np.max(np.abs(y)) + 1e-9) * 0.9
    if stereo_width > 0:
        d = int(0.012 * SR)
        left, right = y, np.concatenate([np.zeros(d), y[:-d]])
        st = np.stack([left, (1 - stereo_width) * left + stereo_width * right], axis=1)
    else:
        st = np.stack([y, y], axis=1)
    with tempfile.TemporaryDirectory() as tmp:
        wav = pathlib.Path(tmp) / "a.wav"
        sf.write(str(wav), st, SR)
        subprocess.check_call([
            "ffmpeg", "-loglevel", "error", "-y", "-i", str(wav),
            "-af", f"loudnorm=I={lufs}:TP=-2:LRA=11", "-ar", "44100", "-b:a", "192k", str(path),
        ])
    print(path.relative_to(ROOT))


if __name__ == "__main__":
    write(ROOT / "public/music/bg.mp3", music_bed(), -18, stereo_width=0.6)
    write(ROOT / "public/sfx/chimes.mp3", chimes_cascade(), -20, stereo_width=0.8)
    write(ROOT / "public/sfx/damaru.mp3", damaru(), -18)
    write(ROOT / "public/sfx/dhak.mp3", dhak(), -18)
