"""Phase 7 text outputs: out/subtitles.srt and out/youtube_description.md.

Timings come from src/data/durations.json (real audio), using the same
scene starts and caption chunking as the Film / CaptionLayer.
Usage: python3 -I scripts/make_docs.py
"""
import json
import urllib.parse
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
FPS = 30
MAX_LINE = 38

sb = json.loads((ROOT / "storyboard.json").read_text(encoding="utf-8"))
du = json.loads((ROOT / "src/data/durations.json").read_text())
assets = json.loads((ROOT / "src/data/assets.json").read_text())["assets"]
T = du["transitionFrames"]
scenes = {s["id"]: s for s in sb["scenes"]}


def chunks(text: str) -> list[str]:
    """Same rule as CaptionLayer.toCaptionChunks: sentences, long ones split to ≤ 2 lines."""
    out = []
    for s in [x.strip() for x in re.split(r"(?<=[।?!])\s+", text) if x.strip()]:
        if len(s) <= MAX_LINE * 2:
            out.append(s)
            continue
        cur = ""
        for w in s.split():
            nxt = f"{cur} {w}" if cur else w
            if len(nxt) > MAX_LINE * 2 - 4 and cur:
                out.append(cur)
                cur = w
            else:
                cur = nxt
        if cur:
            out.append(cur)
    return out


def ts(frames: float) -> str:
    ms = int(round(frames / FPS * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def yt(frames: float) -> str:
    s = int(frames // FPS)
    return f"{s // 60}:{s % 60:02d}"


starts = {}
t = 0
for d in du["scenes"]:
    starts[d["id"]] = t
    t += d["frames"] - T
total = t + T

# --- SRT ---
srt = []
n = 1
for d in du["scenes"]:
    sid = d["id"]
    a0 = starts[sid] + d["leadInFrames"]
    parts = chunks(scenes[sid]["narration"])
    tot = sum(len(p) for p in parts)
    acc = 0.0
    for p in parts:
        span = len(p) / tot * d["audioFrames"]
        srt.append(f"{n}\n{ts(a0 + acc)} --> {ts(a0 + acc + span)}\n{p}\n")
        n += 1
        acc += span
out = ROOT / "out"
out.mkdir(exist_ok=True)
(out / "subtitles.srt").write_text("\n".join(srt), encoding="utf-8")

# --- YouTube description ---
chapters = []
for c in sb["chapters"]:
    f = starts[c["firstScene"]]
    bn = str(c["chapter"]).translate(str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯"))
    title = "শুরু" if c["chapter"] == 0 else f"অধ্যায় {bn} — {c['title']}"
    chapters.append(f"{yt(f)} {title}")
# Credits from assets/credits.json. Wikimedia Commons photos (CC BY / BY-SA) get one line each with
# creator, licence and source link, as those licences ask. CC0/PD museum works and Pexels clips need no
# attribution, so they are grouped to keep the description under YouTube's 5000-character limit.
credit_log = {c["key"]: c for c in json.loads((ROOT / "assets/credits.json").read_text())}
used = [credit_log[k] for k, v in assets.items() if v.get("file") and k in credit_log]
seen, museums, pexels, commons = set(), {}, [], []
for c in used:
    src = c.get("source") or ""
    if src in seen:
        continue
    seen.add(src)
    if "metmuseum.org" in src:
        museums.setdefault("The Metropolitan Museum of Art", []).append("2000.313" if c["key"] == "met-2000-313" else src.rsplit("/", 1)[-1])
    elif "clevelandart.org" in src:
        museums.setdefault("The Cleveland Museum of Art", []).append(src.rsplit("/", 1)[-1])
    elif "pexels.com" in src:
        pexels.append(c["author"].removeprefix("ভিডিও: ").split(" · ")[0].removesuffix(" (Pexels)"))
    else:
        who = c["author"].removeprefix("ছবি: ").split(" · ")[0]
        commons.append(f"- {who} ({c['licence']}): {urllib.parse.unquote(src)}")
media_credits = [f"- চিত্রকলা: {m} (Open Access, CC0) — {', '.join(ids)}" for m, ids in museums.items()]
if pexels:
    media_credits.append(f"- ভিডিও (Pexels License): {', '.join(dict.fromkeys(pexels))}")
if commons:
    media_credits.append("- মন্দিরের ছবি, Wikimedia Commons:")
    media_credits += ["  " + line for line in commons]
desc = f"""# ৫১ সতীপীঠ — সতীর কাহিনি থেকে কালীঘাট, কামাখ্যা, হিংলাজ

দক্ষযজ্ঞ, সতীর দেহত্যাগ, শিবের প্রলয়নৃত্য আর বিষ্ণুর সুদর্শন চক্র — পুরাণ, তন্ত্র ও প্রচলিত বিশ্বাস অবলম্বনে ৫১ সতীপীঠের পুরো কাহিনি।
মানচিত্র ধরে কামাখ্যা, হিংলাজ, জ্বালামুখী, কন্যাকুমারী থেকে ওপার বাংলা আর এপার বাংলার পীঠ — কালীঘাট, বীরভূমের পীঠ, তারাপীঠ।
এ বছর কালীপুজো রবিবার, ৮ নভেম্বর। জয় মা।

## অধ্যায়
{chr(10).join(chapters)}

## তালিকা নিয়ে মতভেদ
পীঠের সংখ্যা ও স্থান নিয়ে শাস্ত্র ও প্রচলিত তালিকায় মতভেদ আছে (৫১ / ৫২ / ৬৪ / ১০৮)। এই ভিডিও পীঠনির্ণয় তন্ত্র ও মহাপীঠনিরূপণের বাংলার ধারা অনুসরণ করেছে; বিতর্কিত স্থানগুলি মানচিত্রে ভাঙা রেখায় দেখানো হয়েছে।

## সূত্র
- Shakta pithas — Wikipedia: https://en.wikipedia.org/wiki/Shakta_pithas
- Sakta-pitha — Banglapedia: https://en.banglapedia.org/index.php/Sakta-pitha
- Sati (Hindu goddess) — Wikipedia: https://en.wikipedia.org/wiki/Sati_(Hindu_goddess)
- Srimad Bhagavatam 4.2.6, 4.4.24–27 — https://www.vedabase.com/en/sb/4/2/6
- D. C. Sircar, *The Śākta Pīṭhas* (1948)
- Hinglaj Mata Temple, Ambubachi Mela, Tarapith temple — Wikipedia

## কৃতজ্ঞতা
- মানচিত্র: Natural Earth (public domain), via world-atlas
- ফন্ট: Tiro Bangla, Hind Siliguri (SIL Open Font License, Google Fonts)
- কণ্ঠ: offline Bengali voice — comprehensive-bangla-tts (MIT) via sherpa-onnx (Apache-2.0)
- সংগীত ও শব্দ: original, created for this video
{chr(10).join(media_credits) if media_credits else "- (ছবি ও ভিডিওর ক্রেডিট assets/credits.json থেকে যোগ হবে)"}
- Made with Remotion

## Tags
সতীপীঠ, ৫১ সতীপীঠ, শক্তিপীঠ, Shakti Peeth, 51 Shakti Peeth, Sati, Daksha Yajna, কালীঘাট, কামাখ্যা, হিংলাজ, তারাপীঠ, কালীপুজো, Kali Puja 2026, বাংলা পুরাণ, The Bong Mindset
"""
(out / "youtube_description.md").write_text(desc, encoding="utf-8")
print(f"srt: {n - 1} cues · film {yt(total)} · chapters:")
print("\n".join(chapters))
