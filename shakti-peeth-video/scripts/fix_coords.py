"""Replace approximate peeth coordinates with Wikidata P625 coordinates.

Reads assets/wikidata_places.json (written by scripts/wikidata_places.py) and,
for each peeth, takes the coordinate of the Wikidata item behind the English
Wikipedia article in TITLES (the temple, or the town where no temple item
exists). A coordinate is accepted only if it lies within MAX_DEG of the earlier
estimate (guards against a wrong article); otherwise it is reported for review.
peeths.json is edited line by line so its hand formatting is kept.
Usage: python3 -I scripts/fix_coords.py
"""
import json
import math
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
MAX_DEG = 1.5
TITLES = {
    "hinglaj": "Hinglaj Mata Temple", "karavira": "Mahalakshmi Temple, Kolhapur", "sugandha": "Sugandha Shaktipeeth",
    "kashmir": "Amarnath Temple", "jwalamukhi": "Jawalamukhi", "jalandhar": "Devi Talab Mandir", "vaidyanath": "Baidyanath Temple",
    "guhyeshwari": "Guhyeshwari Temple", "manas": "Lake Manasarovar", "vimala": "Vimala Temple", "gandaki": "Muktinath",
    "bahula": "Ketugram", "ujani": "Kogram", "tripura": "Tripura Sundari Temple", "chattal": "Chandranath Temple",
    "trisrota": "Jalpaiguri", "kamakhya": "Kamakhya Temple", "prayag": "Alopi Devi Mandir", "jayanti": "Jaintiapur Upazila",
    "jogadya": "Kshirgram", "kalighat": "Kalighat Temple", "kiriteswari": "Kiriteswari Temple", "vishalakshi": "Vishalakshi Temple",
    "kanyashram": "Kanyakumari", "kurukshetra": "Thanesar", "manivedaka": "Pushkar", "shrishail": "Shri Shail",
    "kankalitala": "Kankalitala", "kalmadhav": "Amarkantak", "shona": "Amarkantak", "ramgiri": "Chitrakoot Dham",
    "vrindavan": "Vrindavan", "shuchi": "Thanumalayan Temple", "karatoya": "Sherpur Upazila, Bogra", "shriparvat": "Srisailam",
    "vibhash": "Bargabhima Temple", "prabhas": "Somnath Temple", "bhairavparvat": "Ujjain", "janasthan": "Nashik",
    "godavari": "Rajamahendravaram", "ratnavali": "Khanakul", "mithila": "Janakpur", "nalhati": "Nalhati", "bakreshwar": "Bakreshwar",
    "jeshore": "Jeshoreshwari Kali Temple", "attahas": "Labhpur", "nandipur": "Sainthia", "lanka": "Nainativu Nagapooshani Amman Temple",
    "virat": "Viratnagar", "tarapith": "Tarapith",
}
# Items that are a town, lake or district rather than the shrine itself: the dot sits at the item's
# coordinate, which is close to (not exactly at) the temple.
NOT_SHRINE = {
    "jwalamukhi", "manas", "gandaki", "bahula", "ujani", "trisrota", "jayanti", "jogadya", "kanyashram", "kurukshetra",
    "manivedaka", "shrishail", "kankalitala", "kalmadhav", "shona", "ramgiri", "vrindavan", "shriparvat", "bhairavparvat",
    "janasthan", "godavari", "ratnavali", "mithila", "nalhati", "bakreshwar", "attahas", "nandipur", "virat", "tarapith",
}


def main():
    places = json.loads((ROOT / "assets/wikidata_places.json").read_text())["places"]
    path = ROOT / "src/data/peeths.json"
    text = path.read_text()
    data = json.loads(text)
    updated, review, none = [], [], []
    for p in data["peeths"] + data["extra"]:
        t = TITLES.get(p["id"])
        if not t or p.get("lat") is None:
            continue
        e = places.get(t)
        if not e or not e.get("coord"):
            none.append(f"{p['id']} ({t})")
            continue
        lat, lon = e["coord"]
        dist = math.hypot(lat - p["lat"], lon - p["lon"])
        if dist > MAX_DEG:
            review.append(f"{p['id']} ({t}: {lat:.3f},{lon:.3f} is {dist:.1f}° from estimate)")
            continue
        if p["id"] == "kalmadhav":  # shares Amarkantak with Shona; keep a small offset so the dots don't overlap
            lat, lon = lat + 0.012, lon - 0.013
        kind = "near" if p["id"] in NOT_SHRINE else "shrine"
        status = f"wikidata {e['item']} {t} ({kind})"
        # Edit the one "lat/lon/coordStatus" line that follows this entry's id.
        pat = re.compile(r'("id": "' + re.escape(p["id"]) + r'".*?)"lat": [-\d.]+, "lon": [-\d.]+, "coordStatus": "[^"]*"', re.S)
        text, n = pat.subn(lambda m: f'{m.group(1)}"lat": {lat:.4f}, "lon": {lon:.4f}, "coordStatus": "{status}"', text, count=1)
        if n:
            updated.append(p["id"])
    old_field = re.search(r'"coordStatus": "(approx = [^"]*)"', text)
    if old_field:
        text = text.replace(old_field.group(1), (
            "wikidata <Q-id> <enwiki title> (shrine|near) = Wikidata P625 coordinate of that item, checked within 1.5° of the "
            "earlier estimate; 'near' = the item is the town, lake or district, so the dot is close to but not exactly at the "
            "shrine · approx = estimate, no Wikidata coordinate found · null = location unidentified (shown in the "
            "'স্থান অনির্ণীত' tray, not on the map)"))
    # Wikidata and Wikipedia are reachable now; drop the old "blocked" note.
    text = re.sub(r'\},\n    "blockedSources": \[[^\]]*\]', "}", text)
    json.loads(text)  # still valid JSON
    path.write_text(text)
    print(f"updated {len(updated)}; no coordinates: {none}; review: {review}")


if __name__ == "__main__":
    main()
