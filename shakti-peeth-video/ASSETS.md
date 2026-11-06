# ASSETS.md — media per scene

**34 of 45 slots filled.** Filled clips are Pexels-licensed B-roll found through the user's vidIQ connector (credits in `assets/credits.json`).
Temple photos and public-domain paintings still need Wikimedia Commons and the museum open-access hosts, which this session's network policy blocks.
Once those hosts are allowed, run `python3 scripts/fetch_assets.py` to fill the rest. You can also put your own photos in `public/own/` and point a slot's `file` at them.
Generic B-roll is atmosphere only. A clip is captioned as a place only when it really shows that place (Kanyakumari, Puri, Kashi).

| Asset key | What | Scenes | Status |
|---|---|---|---|
| `met-2000-313` | Met 2000.313 'Shiva Carries the Corpse of Sati' (Kalighat, c.1865–75) | S03, S30 | ✅ `art/met-2000-313.jpg` — Unknown artist, Shiva Carries the Corpse of Sati (ca. 1865–75), The Metropolitan Museum of Art |
| `court-miniature` | Court-scene miniature (royal assembly), PD | S05 | ✅ `art/court-miniature.jpg` — Shishupala arguing with Rukmini’s father, Bhishmaka, from a Rukmini Haran (c. 1800, Northern India, Pahari kingdoms), The Cleveland Museum of Art |
| `ravi-varma-sati` | Raja Ravi Varma Press print of Sati/Parvati, PD (optional) | S06 | ⛔ missing (network) |
| `shiva-painting` | Shiva painting (Kalighat pat or Pahari), PD | S07 | ✅ `art/shiva-painting.jpg` — Shiva Seated on a Throne in a Landscape (c. 1755, Northern India, Pahari kingdoms), The Cleveland Museum of Art |
| `mahavidya-paintings` | PD Mahavidya paintings, one per slot (optional) | — | ⛔ missing (network) |
| `photo-kalighat` | Kalighat Kali temple exterior (street side) | S01, S57 | ✅ `photos/photo-kalighat.jpg` — ছবি: Hiroki Ogawa · CC BY 3.0 · Wikimedia Commons |
| `photo-kalighat-dome` | Kalighat temple dome (close-up) | S39 | ✅ `photos/photo-kalighat-dome.jpg` — ছবি: Bernard Gagnon · CC BY-SA 3.0 · Wikimedia Commons |
| `photo-kamakhya` | Kamakhya temple exterior | S01, S45 | ✅ `photos/photo-kamakhya.jpg` — ছবি: JyotiPN · CC BY-SA 4.0 · Wikimedia Commons |
| `photo-hinglaj` | Hinglaj gorge / cave | S01, S48 | ✅ `photos/photo-hinglaj.jpg` — ছবি: Bilal Mirza · CC BY-SA 3.0 · Wikimedia Commons |
| `photo-nainativu` | Nainativu Nagapooshani temple | S01, S53 | ✅ `photos/photo-nainativu.jpg` — ছবি: Wikinamaste · CC BY-SA 3.0 · Wikimedia Commons |
| `photo-manasarovar` | Lake Manasarovar | S01, S53 | ✅ `photos/photo-manasarovar.jpg` — ছবি: Prateek (Greatestprateek) · CC BY-SA 2.5 in · Wikimedia Commons |
| `broll-havan` | havan fire (atmosphere) | S12 | ✅ `broll/broll-havan.mp4` — ভিডিও: Pabitra Sarkar · Pexels |
| `broll-diya` | single diya flame | S19 | ✅ `broll/broll-diya.mp4` — ভিডিও: Jyoti Pur · Pexels |
| `virabhadra-painting` | Public-domain Virabhadra painting (optional) | S26 | ⛔ missing (network) |
| `photo-daksheswar` | Daksheswar Mahadev temple, Kankhal (Commons) | S29 | ✅ `photos/photo-daksheswar.jpg` — ছবি: World8115 · CC BY-SA 3.0 · Wikimedia Commons |
| `broll-storm` | storm clouds, lightning | S32 | ✅ `broll/broll-storm.mp4` — ভিডিও: Stefano Barbieri · Pexels |
| `broll-sea` | rough sea | S32 | ✅ `broll/broll-sea.mp4` — ভিডিও: Peggy Johnson Philip Waikoloa · Pexels |
| `photo-kamakhya-domes` | Kamakhya temple domes / shikhara | S46 | ✅ `photos/photo-kamakhya-domes.jpg` — ছবি: JyotiPN · CC BY-SA 4.0 · Wikimedia Commons |
| `photo-ambubachi` | Ambubachi Mela crowd (Commons) | S47 | ✅ `photos/photo-ambubachi.jpg` — ছবি: Kunal Dalui · CC BY-SA 3.0 · Wikimedia Commons |
| `photo-jwalamukhi` | Jwalamukhi temple, Kangra (exterior) | S50 | ✅ `photos/photo-jwalamukhi.jpg` — ছবি: Pdogra2011 · CC BY-SA 3.0 · Wikimedia Commons |
| `photo-vishalakshi` | Vishalakshi temple, Varanasi | S51 | ✅ `photos/photo-vishalakshi.jpg` — ছবি: Kailash PL · CC BY-SA 4.0 · Wikimedia Commons |
| `photo-vimala` | Vimala temple, Puri (or Jagannath complex exterior) | — | ⛔ missing (network) |
| `photo-tripura` | Tripura Sundari temple, Udaipur | S51 | ✅ `photos/photo-tripura.jpg` — ছবি: ARKA SENGUPTA · CC BY-SA 4.0 · Wikimedia Commons |
| `broll-kanyakumari` | Kanyakumari: Vivekananda Rock Memorial and Thiruvalluvar statue | S52 | ✅ `broll/broll-kanyakumari.mp4` — ভিডিও: Antony · Pexels |
| `photo-guhyeshwari` | Guhyeshwari temple, Kathmandu | S54 | ✅ `photos/photo-guhyeshwari.jpg` — ছবি: Gerd Eichmann · CC BY-SA 4.0 · Wikimedia Commons |
| `photo-chandranath` | Chandranath temple, Sitakunda | S55 | ✅ `photos/photo-chandranath.jpg` — ছবি: Shahidul Hasan Roman · CC BY-SA 4.0 · Wikimedia Commons |
| `photo-sugandha` | Sugandha Shaktipeeth, Shikarpur | S55 | ⛔ missing (network) |
| `photo-jeshoreshwari` | Jeshoreshwari temple, Ishwaripur | S55 | ⛔ missing (network) |
| `photo-shrishail` | Shri Shail, Sylhet (optional) | S55 | ⛔ missing (network) |
| `kalighat-pat` | A Kalighat pat painting, PD (optional) | S57 | ✅ `art/kalighat-pat.jpg` — Shiva Bearing Aloft the Body of His Sati (c. 1890, Eastern India, Bengal, Kolkata, Kalighat), The Cleveland Museum of Art |
| `photo-bakreshwar` | Bakreshwar temple | S58 | ✅ `photos/photo-bakreshwar.jpg` — ছবি: Pinakpani · CC BY-SA 4.0 · Wikimedia Commons |
| `photo-nalhati` | Nalhati (Nalateshwari) temple | S58 | ✅ `photos/photo-nalhati.jpg` — ছবি: Pinakpani · CC BY 4.0 · Wikimedia Commons |
| `photo-kankalitala` | Kankalitala temple | S58 | ✅ `photos/photo-kankalitala.jpg` — ছবি: Pinakpani · CC BY-SA 4.0 · Wikimedia Commons |
| `photo-nandikeshwari` | Nandikeshwari temple, Sainthia | S59 | ⛔ missing (network) |
| `photo-fullara` | Fullara (Attahas) temple, Labhpur | S59 | ⛔ missing (network) |
| `photo-kiriteswari` | Kiriteswari temple, Murshidabad | S61 | ✅ `photos/photo-kiriteswari.jpg` — ছবি: Pinakpani · CC BY-SA 4.0 · Wikimedia Commons |
| `photo-bargabhima` | Bargabhima temple, Tamluk | S61 | ✅ `photos/photo-bargabhima.jpg` — ছবি: Amitabha Gupta · CC BY 4.0 · Wikimedia Commons |
| `photo-bhramari` | Bhramari Devi, Jalpaiguri (optional) | S61 | ⛔ missing (network) |
| `photo-tarapith` | Tarapith temple | S62 | ⛔ missing (network) |
| `parvati-painting` | Public-domain Parvati painting | S63 | ✅ `art/parvati-painting.jpg` — Parvati Placing a Wedding Garland on Shiva (recto), from a Kalighat album (c. 1890, Eastern India, Bengal, Kolkata, Kalighat), The Cleveland Museum of Art |
| `broll-kash` | tall white-plumed grass in wind (kash-like) | S64 | ✅ `broll/broll-kash.mp4` — ভিডিও: Nitesh Kamboj · Pexels |
| `broll-diyas` | rows of diyas lit for Diwali | S66 | ✅ `broll/broll-diyas.mp4` — ভিডিও: Mohit Jain · Pexels |
| `broll-himalaya` | Himalaya (Machhapuchhre) — generic Himalaya, not Kailash | S63 | ✅ `broll/broll-himalaya.mp4` — ভিডিও: Nishess Shakya · Pexels |
| `clip-puri` | Puri: Jagannath temple entrance, Aruna Stambha | S51 | ✅ `broll/clip-puri.mp4` — ভিডিও: Dhiren Behera · Pexels |
| `clip-kashi` | Kashi: evening Ganga aarti at the Varanasi ghats | — | ✅ `broll/clip-kashi.mp4` — ভিডিও: Sahil Singh Raahee · Pexels |
