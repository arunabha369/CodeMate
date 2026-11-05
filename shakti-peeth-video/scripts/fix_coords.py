"""Replace approximate peeth coordinates with Wikipedia/Wikidata coordinates.

Looks up each peeth's English Wikipedia article (temple, or the town where no
temple article exists) and takes its coordinates. A result is accepted only
if it is within MAX_DEG of the existing estimate (guards against a wrong
article); otherwise it is reported for manual review.
Usage: python3 -I scripts/fix_coords.py
"""
import json
import math
import pathlib
import time
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
UA = "ShaktiPeethDoc/1.0 (https://github.com/arunabha369/CodeMate; educational documentary) python-urllib"
MAX_DEG = 1.5
TITLES = {
    "hinglaj": "Hinglaj Mata Temple", "karavira": "Mahalakshmi Temple, Kolhapur", "sugandha": "Sugandha Shaktipeeth",
    "kashmir": "Amarnath Temple", "jwalamukhi": "Jawalamukhi", "jalandhar": "Devi Talab Mandir", "vaidyanath": "Baidyanath Temple",
    "guhyeshwari": "Guhyeshwari Temple", "manas": "Lake Manasarovar", "vimala": "Vimala Temple", "gandaki": "Muktinath Temple",
    "bahula": "Ketugram", "ujani": "Kogram", "tripura": "Tripura Sundari Temple", "chattal": "Chandranath Temple",
    "trisrota": "Jalpaiguri", "kamakhya": "Kamakhya Temple", "prayag": "Alopi Devi Mandir", "jayanti": "Jaintiapur Upazila",
    "jogadya": "Kshirgram", "kalighat": "Kalighat Kali Temple", "kiriteswari": "Kiriteswari Temple", "vishalakshi": "Vishalakshi Temple",
    "kanyashram": "Bhagavathy Amman Temple", "kurukshetra": "Thanesar", "manivedaka": "Pushkar", "shrishail": "Shri Shail",
    "kankalitala": "Kankalitala", "kalmadhav": "Amarkantak", "shona": "Amarkantak", "ramgiri": "Chitrakoot Dham",
    "vrindavan": "Vrindavan", "shuchi": "Thanumalayan Temple", "karatoya": "Sherpur Upazila, Bogra", "shriparvat": "Srisailam",
    "vibhash": "Bargabhima Temple", "prabhas": "Somnath temple", "bhairavparvat": "Ujjain", "janasthan": "Nashik",
    "godavari": "Rajahmundry", "ratnavali": "Khanakul", "mithila": "Janakpur", "nalhati": "Nalhati", "bakreshwar": "Bakreshwar",
    "jeshore": "Jeshoreshwari Kali Temple", "attahas": "Labhpur", "nandipur": "Sainthia", "lanka": "Nainativu Nagapooshani Amman Temple",
    "virat": "Viratnagar", "tarapith": "Tarapith temple",
}

titles = sorted(set(TITLES.values()))
coords = {}
for i in range(0, len(titles), 45):
    q = urllib.parse.urlencode({"action": "query", "format": "json", "prop": "coordinates", "redirects": 1, "titles": "|".join(titles[i:i + 45])})
    req = urllib.request.Request("https://en.wikipedia.org/w/api.php?" + q, headers={"User-Agent": UA})
    d = json.loads(urllib.request.urlopen(req, timeout=60).read())
    redir = {r["from"]: r["to"] for r in d["query"].get("redirects", []) + d["query"].get("normalized", [])}
    for page in d["query"]["pages"].values():
        c = (page.get("coordinates") or [None])[0]
        if c:
            coords[page["title"]] = (c["lat"], c["lon"])
    for frm, to in redir.items():
        if to in coords:
            coords[frm] = coords[to]
    time.sleep(1)

path = ROOT / "src/data/peeths.json"
data = json.loads(path.read_text())
updated, review, none = [], [], []
for p in data["peeths"] + data["extra"]:
    t = TITLES.get(p["id"])
    if not t or p.get("lat") is None:
        continue
    c = coords.get(t)
    if not c:
        none.append(p["id"])
        continue
    dist = math.hypot(c[0] - p["lat"], c[1] - p["lon"])
    if dist > MAX_DEG:
        review.append(f"{p['id']} ({t}: {c[0]:.3f},{c[1]:.3f} is {dist:.1f}° from estimate)")
        continue
    if p["id"] == "kalmadhav":  # shares Amarkantak with Shona; keep a small offset so the dots don't overlap
        c = (c[0] + 0.012, c[1] - 0.013)
    p["lat"], p["lon"] = round(c[0], 4), round(c[1], 4)
    p["coordStatus"] = f"wikipedia: {t}"
    updated.append(p["id"])
data["_meta"]["fields"]["coordStatus"] = "wikipedia: <article> = coordinates from that English Wikipedia article (Wikidata P625), checked within 1.5° of the earlier estimate · approx = estimate, still to verify · null = location unidentified"
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
print(f"updated {len(updated)}; no coordinates: {none}; review: {review}")
