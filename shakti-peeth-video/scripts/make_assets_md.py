"""Regenerate ASSETS.md (asset → scenes → status) from src/data/assets.json.
Usage: python3 -I scripts/make_assets_md.py"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
reg = json.loads((ROOT / "src/data/assets.json").read_text())["assets"]
uses: dict[str, set[str]] = {}
for f in sorted((ROOT / "src/scenes").glob("*.tsx")):
    for k in reg:
        if f'"{k}"' in f.read_text():
            uses.setdefault(k, set()).add(f.stem)
done = [k for k, v in reg.items() if v.get("file")]
lines = [
    "# ASSETS.md — media per scene",
    "",
    f"**{len(done)} of {len(reg)} slots filled.** Filled clips are Pexels-licensed B-roll found through the user's vidIQ connector (credits in `assets/credits.json`).",
    "Temple photos and public-domain paintings still need Wikimedia Commons and the museum open-access hosts, which this session's network policy blocks.",
    "Once those hosts are allowed, run `python3 scripts/fetch_assets.py` to fill the rest. You can also put your own photos in `public/own/` and point a slot's `file` at them.",
    "Generic B-roll is atmosphere only. A clip is captioned as a place only when it really shows that place (Kanyakumari, Puri, Kashi).",
    "",
    "| Asset key | What | Scenes | Status |",
    "|---|---|---|---|",
]
for k, v in reg.items():
    status = f"✅ `{v['file']}` — {v.get('credit') or ''}" if v.get("file") else "⛔ missing (network)"
    lines.append(f"| `{k}` | {v['what']} | {', '.join(sorted(uses.get(k, []))) or '—'} | {status} |")
(ROOT / "ASSETS.md").write_text("\n".join(lines) + "\n")
print(f"{len(done)}/{len(reg)} filled")
