"""Phase 3: fetch licensed media for every empty slot in src/data/assets.json.

Run once the network allows the hosts listed in PROGRESS.md:
  python3 scripts/fetch_assets.py            # fill every empty slot
  python3 scripts/fetch_assets.py photo-kamakhya met-2000-313   # only these keys

Rules from the brief, enforced here:
  * Sources: The Met (isPublicDomain), Art Institute of Chicago
    (is_public_domain), Cleveland Museum of Art (CC0), Wikimedia Commons
    (CC0 / Public domain / CC BY / CC BY-SA only — never NC or ND), Pexels and
    Pixabay (their own licences; keys from PEXELS_API_KEY / PIXABAY_API_KEY).
  * Every download is logged in assets/credits.json (file, source URL,
    author/museum, licence, licence URL) and written into src/data/assets.json.
  * Clips: best 6 s, H.264 1080p 30 fps, audio stripped. Small images: gentle
    lanczos upscale only.
  * Picks are candidates: open out/assets_contact_sheet.jpg and reject anything
    wrong, misleading, gory or showing a different temple (set its "file" back
    to null and re-run with a different query).
"""
import json
import os
import pathlib
import re
import subprocess
import sys
import urllib.parse
import time
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
REG = ROOT / "src" / "data" / "assets.json"
CREDITS = ROOT / "assets" / "credits.json"
# Wikimedia and AIC ask for a descriptive client name with a contact URL (no personal email).
UA = "ShaktiPeethDoc/1.0 (https://github.com/arunabha369/CodeMate; educational documentary)"
ALLOWED_COMMONS = re.compile(r"^(cc0|public domain|pd.*|cc[- ]by(-sa)?[- ]?[0-9.]*( [a-z]+)?)$", re.I)
BLOCKED = re.compile(r"\b(nc|nd)\b", re.I)

# key -> ordered list of (source, query). First acceptable hit wins.
# ("commons-file", name) pins a Commons file whose subject was checked by eye (2026-11-05/06): the
# Wikidata P18 image of the temple's item where it showed the temple, otherwise a named file.
PLAN: dict[str, list[tuple[str, str]]] = {
    "met-2000-313": [("met-id", "55034")],
    # Paintings below were picked by eye from Cleveland's CC0 collection (2026-11-06); the id pins the exact object.
    "court-miniature": [("cleveland-id", "1984.66"), ("met", "court assembly Pahari painting"), ("aic", "Pahari court scene"), ("commons", "Pahari painting royal court")],
    "ravi-varma-sati": [("commons", "Raja Ravi Varma Press Sati"), ("commons", "Ravi Varma Parvati lithograph")],
    "shiva-painting": [("cleveland-id", "2018.113"), ("met", "Shiva Kalighat"), ("aic", "Shiva painting India"), ("commons", "Kalighat painting Shiva")],
    "virabhadra-painting": [("met", "Virabhadra"), ("cleveland", "Virabhadra"), ("commons", "Virabhadra painting")],
    "parvati-painting": [("cleveland-id", "2003.108.a"), ("met", "Parvati painting"), ("aic", "Parvati"), ("commons", "Raja Ravi Varma Parvati")],
    # Not the Kalighat-album Kali leaf (2003.110.a): it shows a severed head, and the brief says no gore.
    "kalighat-pat": [("cleveland-id", "2003.131"), ("met", "Kalighat painting"), ("commons", "Kalighat painting")],
    # Scene backdrops (SceneBackdrop), Cleveland CC0, checked by eye 2026-11-10.
    "art-nataraja": [("cleveland-id", "1930.331")],
    "art-bagalamukhi": [("cleveland-id", "2018.200")],
    "art-vishnu-garuda": [("cleveland-id", "1990.38")],
    "art-shiva-devi": [("cleveland-id", "1952.587")],
    "art-annapurna-shiva": [("cleveland-id", "2003.162")],
    "art-yajna-fire": [("cleveland-id", "1990.40")],
    "art-kailash-folio": [("cleveland-id", "2018.175.b")],
    "art-lakshmi-sarasvati": [("cleveland-id", "2003.150.b")],
    "art-durga-kalighat": [("cleveland-id", "2003.157.b")],
    "art-divine-couple": [("cleveland-id", "1997.118")],
    "art-shiva-ascetic": [("cleveland-id", "1960.48")],
    "photo-kalighat": [("commons-file", "Kalighat Temple Kolkata India - panoramio.jpg"), ("commons", "Kalighat Kali Temple")],
    "photo-kalighat-dome": [("commons-file", "Kalighat Kali Temple.jpg")],
    "photo-kamakhya": [("commons-file", "The Kamakhya Temple, 2025.jpg"), ("commons", "Kamakhya Temple")],
    "photo-kamakhya-domes": [("commons-file", "The Kamakhya Temple, 2025.jpg"), ("commons", "Kamakhya Temple dome")],
    "photo-ambubachi": [("commons-file", "Kamakhya Temple, Guwahati.jpg"), ("commons", "Ambubachi Mela")],
    "photo-hinglaj": [("commons-file", "Nani ki Mandir2.jpg"), ("commons", "Hinglaj Mata")],
    "photo-nainativu": [("commons-file", "MAIN NAGAPOOSHANI TEMPLE.jpg"), ("commons", "Nainativu Nagapooshani Amman")],
    "photo-manasarovar": [("commons-file", "Mansarovar.jpg"), ("commons", "Lake Manasarovar")],
    "photo-daksheswar": [("commons-file", "Daksheshwar Mahadev temple, Kankhal3.JPG"), ("commons", "Daksheswar Mahadev Kankhal")],
    "photo-jwalamukhi": [("commons-file", "Jawala Ji Temple.jpg"), ("commons", "Jwalamukhi Temple")],
    "photo-vishalakshi": [("commons-file", "காசி விசாலாட்சி கோயில்.jpg"), ("commons", "Vishalakshi Temple")],
    "photo-vimala": [("commons", "Vimala Temple Puri")],
    "photo-tripura": [("commons-file", "TRIPURESHWARI TEMPLE.jpg"), ("commons", "Tripura Sundari Temple Udaipur")],
    "photo-guhyeshwari": [("commons-file", "Pashupatinath-oberer Zugang-10-Guhyeshvari-2013-gje.jpg"), ("commons", "Guhyeshwari")],
    "photo-chandranath": [("commons-file", "Chandranath Temple 2019-01-16 (27).jpg"), ("commons", "Chandranath Temple Sitakunda")],
    "photo-sugandha": [("commons", "Sugandha Shaktipeeth")],
    "photo-jeshoreshwari": [("commons", "Jeshoreshwari")],
    "photo-shrishail": [("commons", "Shri Shail Sylhet")],
    "photo-bakreshwar": [("commons-file", "Bakreswar Temples and Hot spring 12.jpg"), ("commons", "Bakreshwar")],
    "photo-nalhati": [("commons-file", "Nalateswari Temple at Nalhati, Birbhum 01.jpg"), ("commons", "Nalhati Nalateshwari")],
    "photo-kankalitala": [("commons-file", "Kankalitala Temple complex, Birbhum, West Bengal 05.jpg"), ("commons", "Kankalitala")],
    "photo-nandikeshwari": [("commons-file", "Slider-134.jpg"), ("commons", "Nandikeshwari Sainthia")],
    "photo-fullara": [("commons-file", "Fullara (28 May 2023).jpg"), ("commons", "Fullara Labhpur")],
    "photo-kiriteswari": [("commons-file", "Kiriteswari Temple.jpg"), ("commons", "Kiriteswari")],
    "photo-bargabhima": [("commons-file", "Bargabhima temple at Tamluk town under Purba Medinipur district in West Bengal 01.jpg"), ("commons", "Bargabhima Tamluk")],
    "photo-bahula": [("commons-file", "Shri Bahula Shaktipeeth Temple, Ketugram.jpg")],
    "photo-bhramari": [("commons-file", "Jora Banyan tree in Bhramari Devi Temple.jpg"), ("commons", "Bhramari Devi Jalpaiguri")],
    "photo-tarapith": [("commons-file", "Tarapith Kali temple at Tarapith 02.jpg"), ("commons", "Tarapith")],
    "broll-havan": [("pexels-video", "havan fire"), ("pixabay-video", "fire ritual")],
    "broll-diya": [("pexels-video", "diya"), ("pixabay-video", "diya lamp")],
    "broll-diyas": [("pexels-video", "diwali diyas"), ("pixabay-video", "diwali lamps")],
    "broll-storm": [("pexels-video", "storm clouds"), ("pixabay-video", "storm clouds")],
    "broll-sea": [("pexels-video", "rough sea"), ("pixabay-video", "stormy sea")],
    "broll-kash": [("pexels-video", "kash flower"), ("pixabay-video", "grass flowers wind")],
    "broll-kanyakumari": [("commons", "Kanyakumari sea"), ("pexels-video", "ocean waves sunrise")],
}


def get_json(url: str, headers: dict | None = None) -> dict:
    """GET JSON politely: a pause between calls, backoff on 429 (rate limit)."""
    for wait in (0, 5, 15, 40):
        time.sleep(1 + wait)
        req = urllib.request.Request(url, headers={"User-Agent": UA, "AIC-User-Agent": UA, **(headers or {})})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.loads(r.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            if e.code != 429:
                raise
    raise RuntimeError(f"rate-limited: {url[:80]}")


def download(url: str, dest: pathlib.Path, headers: dict | None = None) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": UA, **(headers or {})})
    with urllib.request.urlopen(req, timeout=180) as r, open(dest, "wb") as f:
        f.write(r.read())


def met(query: str | None = None, object_id: str | None = None):
    base = "https://collectionapi.metmuseum.org/public/collection/v1"
    if object_id:
        ids = [object_id]
    else:
        try:
            ids = (get_json(f"{base}/search?hasImages=true&q={urllib.parse.quote(query)}").get("objectIDs") or [])[:25]
        except urllib.error.HTTPError:
            return None  # search endpoint retired (410); use AIC / Commons instead
    for oid in ids:
        try:
            o = get_json(f"{base}/objects/{oid}")
        except urllib.error.HTTPError:
            continue
        if o.get("isPublicDomain") and o.get("primaryImage"):
            return {"url": o["primaryImage"], "source": o.get("objectURL"), "author": f"{o.get('artistDisplayName') or 'Unknown artist'}, {o.get('title')} ({o.get('objectDate')}), The Metropolitan Museum of Art", "licence": "Public Domain (CC0)", "licence_url": "https://www.metmuseum.org/about-the-met/policies-and-documents/open-access", "ext": ".jpg"}
    return None


def aic(query: str):
    d = get_json(f"https://api.artic.edu/api/v1/artworks/search?q={urllib.parse.quote(query)}&fields=id,title,image_id,is_public_domain,artist_display,date_display&limit=20")
    for a in d.get("data", []):
        if a.get("is_public_domain") and a.get("image_id"):
            return {"url": f"https://www.artic.edu/iiif/2/{a['image_id']}/full/1686,/0/default.jpg", "source": f"https://www.artic.edu/artworks/{a['id']}", "author": f"{a.get('artist_display')}, {a.get('title')} ({a.get('date_display')}), Art Institute of Chicago", "licence": "Public Domain (CC0)", "licence_url": "https://www.artic.edu/open-access/open-access-images", "ext": ".jpg"}
    return None


def _cleveland_hit(a: dict):
    img = (a.get("images") or {}).get("print") or (a.get("images") or {}).get("web") or {}
    if a.get("share_license_status") != "CC0" or not img.get("url"):
        return None
    culture = ", ".join(a.get("culture") or [])
    return {"url": img["url"], "source": a.get("url"), "author": f"{a.get('title')} ({a.get('creation_date')}, {culture}), The Cleveland Museum of Art", "licence": "CC0", "licence_url": "https://creativecommons.org/publicdomain/zero/1.0/", "ext": ".jpg"}


def cleveland(query: str):
    d = get_json(f"https://openaccess-api.clevelandart.org/api/artworks/?q={urllib.parse.quote(query)}&cc0=1&has_image=1&limit=20")
    for a in d.get("data", []):
        hit = _cleveland_hit(a)
        if hit:
            return hit
    return None


def cleveland_id(accession: str):
    return _cleveland_hit(get_json(f"https://openaccess-api.clevelandart.org/api/artworks/{urllib.parse.quote(accession)}")["data"])


def commons(query: str):
    params = {
        "action": "query", "format": "json", "generator": "search", "gsrnamespace": "6",
        "gsrsearch": f"{query} filetype:bitmap", "gsrlimit": "20", "prop": "imageinfo",
        "iiprop": "url|extmetadata|size", "iiurlwidth": "2400",
    }
    d = get_json("https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params))
    pages = sorted((d.get("query") or {}).get("pages", {}).values(), key=lambda p: p.get("index", 99))
    for p in pages:
        ii = (p.get("imageinfo") or [{}])[0]
        meta = ii.get("extmetadata") or {}
        lic = (meta.get("LicenseShortName") or {}).get("value", "")
        if not lic or BLOCKED.search(lic) or not ALLOWED_COMMONS.match(lic.strip()):
            continue
        if ii.get("width", 0) < 1200:
            continue
        artist = re.sub(r"<[^>]+>", "", (meta.get("Artist") or {}).get("value", "Unknown")).strip()
        return {"url": ii.get("thumburl") or ii["url"], "source": ii.get("descriptionurl"), "author": f"ছবি: {artist} · {lic} · Wikimedia Commons", "licence": lic, "licence_url": (meta.get("LicenseUrl") or {}).get("value", ""), "ext": ".jpg"}
    return None


def commons_file(name: str):
    """One named Commons file (picked by eye; see the PLAN comment), as a 1920 px thumbnail.
    Wikimedia asks bulk clients to fetch standard thumbnail sizes rather than originals."""
    params = {"action": "query", "format": "json", "titles": f"File:{name}", "prop": "imageinfo",
              "iiprop": "url|extmetadata|size", "iiurlwidth": "1920"}
    d = get_json("https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params))
    for p in (d.get("query") or {}).get("pages", {}).values():
        ii = (p.get("imageinfo") or [{}])[0]
        meta = ii.get("extmetadata") or {}
        lic = (meta.get("LicenseShortName") or {}).get("value", "")
        if not lic or BLOCKED.search(lic) or not ALLOWED_COMMONS.match(lic.strip()):
            return None
        artist = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", (meta.get("Artist") or {}).get("value", "Unknown"))).strip()
        return {"url": ii.get("thumburl") or ii["url"], "source": ii.get("descriptionurl"), "author": f"ছবি: {artist} · {lic} · Wikimedia Commons", "licence": lic, "licence_url": (meta.get("LicenseUrl") or {}).get("value", ""), "ext": ".jpg"}
    return None


def pexels_video(query: str):
    key = os.environ.get("PEXELS_API_KEY")
    if not key:
        return None
    d = get_json(f"https://api.pexels.com/videos/search?query={urllib.parse.quote(query)}&per_page=10&orientation=landscape", {"Authorization": key})
    for v in d.get("videos", []):
        files = sorted([f for f in v.get("video_files", []) if f.get("width", 0) >= 1920], key=lambda f: f["width"])
        if files:
            return {"url": files[0]["link"], "source": v.get("url"), "author": f"{v.get('user', {}).get('name')} (Pexels)", "licence": "Pexels License", "licence_url": "https://www.pexels.com/license/", "ext": ".mp4", "video": True}
    return None


def pixabay_video(query: str):
    key = os.environ.get("PIXABAY_API_KEY")
    if not key:
        return None
    d = get_json(f"https://pixabay.com/api/videos/?key={key}&q={urllib.parse.quote(query)}&per_page=10")
    for h in d.get("hits", []):
        v = (h.get("videos") or {}).get("large") or {}
        if v.get("url") and v.get("width", 0) >= 1920:
            return {"url": v["url"], "source": h.get("pageURL"), "author": f"{h.get('user')} (Pixabay)", "licence": "Pixabay Content License", "licence_url": "https://pixabay.com/service/license-summary/", "ext": ".mp4", "video": True}
    return None


SOURCES = {"met": met, "aic": aic, "cleveland": cleveland, "cleveland-id": cleveland_id, "commons": commons, "commons-file": commons_file, "pexels-video": pexels_video, "pixabay-video": pixabay_video}


def finish(path: pathlib.Path, video: bool) -> pathlib.Path:
    if video:
        out = path.with_name(path.stem + "-1080p.mp4")
        subprocess.check_call(["ffmpeg", "-loglevel", "error", "-y", "-ss", "1", "-t", "6", "-i", str(path), "-an",
                               "-vf", "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30",
                               "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p", str(out)])
        path.unlink()
        return out
    # Museum prints can be 3400 px or more: cap the long side at 2400 px (plenty for a 1080p frame).
    small = path.with_name(path.stem + "-s.jpg")
    subprocess.check_call(["ffmpeg", "-loglevel", "error", "-y", "-i", str(path), "-vf", "scale='min(2400,iw)':'min(2400,ih)':force_original_aspect_ratio=decrease", "-q:v", "2", str(small)])
    small.replace(path)
    # Gentle lanczos upscale only if small; never AI enhancement.
    w = int(subprocess.check_output(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width", "-of", "csv=p=0", str(path)]).strip() or 0)
    if 0 < w < 1600:
        tmp = path.with_name(path.stem + "-up.jpg")
        subprocess.check_call(["ffmpeg", "-loglevel", "error", "-y", "-i", str(path), "-vf", "scale=1600:-2:flags=lanczos", "-q:v", "2", str(tmp)])
        tmp.replace(path)
    return path


def main(only: list[str]) -> None:
    reg = json.loads(REG.read_text())
    credits = json.loads(CREDITS.read_text()) if CREDITS.exists() else []
    missing = []
    for key, entry in reg["assets"].items():
        if (only and key not in only) or entry.get("file"):
            continue
        hit = None
        for src, q in PLAN.get(key, []):
            try:
                hit = met(object_id=q) if src == "met-id" else SOURCES[src](q)
            except Exception as e:  # network or API error: try the next source
                print(f"  {key}: {src} failed: {e}")
            if hit:
                break
        if not hit:
            missing.append(key)
            print(f"MISSING {key}")
            continue
        folder = "broll" if hit.get("video") else ("art" if not key.startswith("photo") else "photos")
        dest = ROOT / "public" / folder / f"{key}{hit['ext']}"
        try:
            download(hit["url"], dest)
            dest = finish(dest, bool(hit.get("video")))
        except Exception as e:
            missing.append(key)
            print(f"MISSING {key}: download failed: {e}")
            continue
        rel = dest.relative_to(ROOT / "public").as_posix()
        entry.update({"file": rel, "credit": hit["author"], "licence": hit["licence"]})
        credits = [c for c in credits if c.get("key") != key]
        credits.append({"key": key, "file": rel, "source": hit["source"], "author": hit["author"], "licence": hit["licence"], "licence_url": hit["licence_url"]})
        print(f"OK {key} <- {hit['source']} [{hit['licence']}]")
    REG.write_text(json.dumps(reg, ensure_ascii=False, indent=2) + "\n")
    CREDITS.parent.mkdir(exist_ok=True)
    CREDITS.write_text(json.dumps(credits, ensure_ascii=False, indent=2) + "\n")
    # Contact sheet of everything sourced so far (one frame per video).
    files = [ROOT / "public" / e["file"] for e in reg["assets"].values() if e.get("file")]
    if files:
        (ROOT / "out").mkdir(exist_ok=True)
        inputs = sum([["-i", str(f)] for f in files], [])
        n = len(files)
        cols = 6
        layout = "|".join(f"{(i % cols) * 320}_{(i // cols) * 180}" for i in range(n))
        filt = "".join(f"[{i}:v]scale=320:180:force_original_aspect_ratio=increase,crop=320:180,trim=end_frame=1[v{i}];" for i in range(n))
        filt += "".join(f"[v{i}]" for i in range(n)) + (f"xstack=inputs={n}:layout={layout}" if n > 1 else "null")
        subprocess.call(["ffmpeg", "-loglevel", "error", "-y", *inputs, "-filter_complex", filt, "-frames:v", "1", str(ROOT / "out" / "assets_contact_sheet.jpg")])
    print(f"\n{len(missing)} still missing: {missing}")


if __name__ == "__main__":
    main(sys.argv[1:])
