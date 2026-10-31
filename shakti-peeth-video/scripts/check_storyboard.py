"""Check storyboard.json against the brief's Phase 2 rules.

Usage: python3 -I scripts/check_storyboard.py
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sb = json.loads((ROOT / "storyboard.json").read_text(encoding="utf-8"))
scenes = sb["scenes"]
errors, warnings = [], []

ids = [s["id"] for s in scenes]
if ids != [f"S{i:02d}" for i in range(1, 68)]:
    errors.append("scene ids must be S01..S67 in order")

FIELDS = ["id", "chapter", "narration", "ttsText", "visualType", "background",
          "components", "onScreenText", "assetNeeds", "animationBeats"]
for s in scenes:
    for f in FIELDS:
        if f not in s:
            errors.append(f"{s['id']}: missing {f}")
    if s["visualType"] not in {"motion", "art", "photo", "broll", "mixed"}:
        errors.append(f"{s['id']}: bad visualType {s['visualType']}")
    if s["background"] not in {"night", "parchment", "gold"}:
        errors.append(f"{s['id']}: bad background {s['background']}")
    # TTS text: numbers must be spelled out, no Latin letters (voice is Bengali)
    if re.search(r"[0-9০-৯]", s["ttsText"]):
        errors.append(f"{s['id']}: ttsText still has digits")
    if re.search(r"[A-Za-z]", s["ttsText"]):
        errors.append(f"{s['id']}: ttsText has Latin letters")
    if "CHANNEL_NAME" in s["narration"]:
        errors.append(f"{s['id']}: CHANNEL_NAME placeholder left")

# Every chapter (1..9) opens with a ChapterCard
first = {}
for s in scenes:
    first.setdefault(s["chapter"], s)
for ch, s in first.items():
    if ch == 0:
        continue
    if "ChapterCard" not in s["components"]:
        errors.append(f"chapter {ch} first scene {s['id']} has no ChapterCard")

# Never repeat a layout twice in a row
for a, b in zip(scenes, scenes[1:]):
    if a["layout"] == b["layout"]:
        errors.append(f"{a['id']}→{b['id']}: same layout '{a['layout']}' twice in a row")

# PeethMap returns at S01–S02, S35–S37, S44–S56, S65
need_map = [1, 2, 35, 36, 37, *range(44, 57), 65]
for n in need_map:
    s = scenes[n - 1]
    if "PeethMap" not in s["components"]:
        errors.append(f"{s['id']}: PeethMap required here")

# Every photo/painting gets an overlay (label, map inset, lower-third or counter)
OVERLAYS = {"LowerThird", "PeethMap", "StatCounter", "Headline", "FamilyLinks",
            "ShaktiBhairavaCard", "ChapterCard", "MahavidyaRing"}
for s in scenes:
    if s["visualType"] in {"art", "photo", "mixed"}:
        if not (OVERLAYS & set(s["components"])) and not s["onScreenText"]:
            errors.append(f"{s['id']}: photo/painting without an overlay")

# Short on-screen text (≤ ~12 words per item), except grids/rings
for s in scenes:
    if {"PeethGrid", "MahavidyaRing"} & set(s["components"]):
        continue
    for t in s["onScreenText"]:
        if len(t.split()) > 12:
            warnings.append(f"{s['id']}: on-screen text over 12 words: {t}")

real = [s for s in scenes if s["visualType"] != "motion"]
ratio = len(real) / len(scenes)
if not 0.4 <= ratio <= 0.6:
    warnings.append(f"real-media share {ratio:.0%} is outside ~50%")

words = sum(len(s["narration"].split()) for s in scenes)
hold = sum(s.get("extraHoldSec", 0) for s in scenes)
print(f"scenes: {len(scenes)} · narration words: {words} · real-media scenes: {len(real)} ({ratio:.0%}) · extra holds: {hold:.1f} s")
for w in warnings:
    print("WARN ", w)
for e in errors:
    print("ERROR", e)
sys.exit(1 if errors else 0)
