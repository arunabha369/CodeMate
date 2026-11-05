"""Look up Wikidata items for peeth places (and their temples): P625 coordinate and P18 image.

Matches each English Wikipedia article title to its Wikidata item through the
Wikidata Query Service and merges the results into assets/wikidata_places.json,
which scripts/fix_coords.py then applies to src/data/peeths.json.
WDQS currently allows this client about one request per minute, so the script
waits 65 s before each attempt.
Usage: python3 -I scripts/wikidata_places.py ["Extra title" ...]
"""
import json
import pathlib
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets/wikidata_places.json"
UA = "ShaktiPeethDoc/1.0 (https://github.com/arunabha369/CodeMate; educational documentary) python-urllib"
sys.path.insert(0, str(ROOT / "scripts"))
from fix_coords import TITLES  # noqa: E402


def query(titles):
    values = " ".join(json.dumps(t, ensure_ascii=False) + "@en" for t in sorted(set(titles)))
    q = f"""SELECT ?title ?item ?img ?coord WHERE {{
  VALUES ?title {{ {values} }}
  ?article schema:about ?item; schema:isPartOf <https://en.wikipedia.org/>; schema:name ?title.
  OPTIONAL {{ ?item wdt:P18 ?img. }}
  OPTIONAL {{ ?item wdt:P625 ?coord. }}
}}"""
    url = "https://query.wikidata.org/sparql?" + urllib.parse.urlencode({"query": q, "format": "json"})
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/sparql-results+json"})
    for _ in range(6):
        time.sleep(65)
        try:
            return json.loads(urllib.request.urlopen(req, timeout=120).read())["results"]["bindings"]
        except urllib.error.HTTPError as e:
            print("wdqs", e.code, file=sys.stderr)
    raise SystemExit("WDQS unavailable, try again later")


def main():
    data = json.loads(OUT.read_text()) if OUT.exists() else {"_meta": {}, "places": {}}
    places = data["places"]
    for b in query(list(TITLES.values()) + sys.argv[1:]):
        t = b["title"]["value"]
        e = places.setdefault(t, {"item": b["item"]["value"].rsplit("/", 1)[-1], "img": None, "coord": None})
        if "img" in b and not e["img"]:
            e["img"] = urllib.parse.unquote(b["img"]["value"].rsplit("/", 1)[-1])
        if "coord" in b and not e["coord"]:
            lon, lat = b["coord"]["value"].removeprefix("Point(").rstrip(")").split()
            e["coord"] = [float(lat), float(lon)]
    data["_meta"].update({
        "source": "Wikidata Query Service (query.wikidata.org), English Wikipedia sitelink -> item, P18 image, P625 coordinate",
        "queried": time.strftime("%Y-%m-%d"),
        "script": "scripts/wikidata_places.py",
    })
    data["places"] = dict(sorted(places.items()))
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n")
    print(f"{len(places)} places in {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
