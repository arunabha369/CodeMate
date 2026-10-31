# ASSETS.md — media per scene

Every slot below is empty: the session's network policy blocks all the brief's media sources (Wikimedia Commons, the Met, AIC, Cleveland, Pexels, Pixabay).
Scenes currently show a striped “[ছবি আসবে]” placeholder, or a drawn fallback for B-roll (storm, three seas, kash field, diyas).
Once the hosts are allowed, run `python3 scripts/fetch_assets.py`. It fills these slots with licence-checked media, logs `assets/credits.json` and writes `out/assets_contact_sheet.jpg` for review.
You can also drop your own photos into `public/own/` and point the `file` field in `src/data/assets.json` at them (e.g. `own/kalighat.jpg`).

| Asset key | What | Scenes | Status |
|---|---|---|---|
| `met-2000-313` | Met 2000.313 'Shiva Carries the Corpse of Sati' (Kalighat, c.1865–75) | S03, S30 | ⛔ missing (network) |
| `court-miniature` | Court-scene miniature (royal assembly), PD | S05 | ⛔ missing (network) |
| `ravi-varma-sati` | Raja Ravi Varma Press print of Sati/Parvati, PD (optional) | S06 | ⛔ missing (network) |
| `shiva-painting` | Shiva painting (Kalighat pat or Pahari), PD | S07 | ⛔ missing (network) |
| `mahavidya-paintings` | PD Mahavidya paintings, one per slot (optional) | — | ⛔ missing (network) |
| `photo-kalighat` | Kalighat Kali temple exterior | S01, S39, S57 | ⛔ missing (network) |
| `photo-kamakhya` | Kamakhya temple exterior | S01, S45 | ⛔ missing (network) |
| `photo-hinglaj` | Hinglaj gorge / cave | S01, S48 | ⛔ missing (network) |
| `photo-nainativu` | Nainativu Nagapooshani temple | S01, S53 | ⛔ missing (network) |
| `photo-manasarovar` | Lake Manasarovar | S01, S53 | ⛔ missing (network) |
| `broll-havan` | havan / yajna fire close-up | S12 | ⛔ missing (network) |
| `broll-diya` | single diya flame, dark background | S19 | ⛔ missing (network) |
| `virabhadra-painting` | Public-domain Virabhadra painting (optional) | S26 | ⛔ missing (network) |
| `photo-daksheswar` | Daksheswar Mahadev temple, Kankhal (Commons) | S29 | ⛔ missing (network) |
| `broll-storm` | storm clouds (B-roll) | S32 | ⛔ missing (network) |
| `broll-sea` | rough sea (B-roll) | S32 | ⛔ missing (network) |
| `photo-kamakhya-domes` | Kamakhya temple domes / shikhara | S46 | ⛔ missing (network) |
| `photo-ambubachi` | Ambubachi Mela crowd (Commons) | S47 | ⛔ missing (network) |
| `photo-jwalamukhi` | Jwalamukhi temple, Kangra (exterior) | S50 | ⛔ missing (network) |
| `photo-vishalakshi` | Vishalakshi temple, Varanasi | S51 | ⛔ missing (network) |
| `photo-vimala` | Vimala temple, Puri (or Jagannath complex exterior) | S51 | ⛔ missing (network) |
| `photo-tripura` | Tripura Sundari temple, Udaipur | S51 | ⛔ missing (network) |
| `broll-kanyakumari` | Kanyakumari sea / land's end (B-roll or photo) | S52 | ⛔ missing (network) |
| `photo-guhyeshwari` | Guhyeshwari temple, Kathmandu | S54 | ⛔ missing (network) |
| `photo-chandranath` | Chandranath temple, Sitakunda | S55 | ⛔ missing (network) |
| `photo-sugandha` | Sugandha Shaktipeeth, Shikarpur | S55 | ⛔ missing (network) |
| `photo-jeshoreshwari` | Jeshoreshwari temple, Ishwaripur | S55 | ⛔ missing (network) |
| `photo-shrishail` | Shri Shail, Sylhet (optional) | S55 | ⛔ missing (network) |
| `kalighat-pat` | A Kalighat pat painting, PD (optional) | S57 | ⛔ missing (network) |
| `photo-bakreshwar` | Bakreshwar temple | S58 | ⛔ missing (network) |
| `photo-nalhati` | Nalhati (Nalateshwari) temple | S58 | ⛔ missing (network) |
| `photo-kankalitala` | Kankalitala temple | S58 | ⛔ missing (network) |
| `photo-nandikeshwari` | Nandikeshwari temple, Sainthia | S59 | ⛔ missing (network) |
| `photo-fullara` | Fullara (Attahas) temple, Labhpur | S59 | ⛔ missing (network) |
| `photo-kiriteswari` | Kiriteswari temple, Murshidabad | S61 | ⛔ missing (network) |
| `photo-bargabhima` | Bargabhima temple, Tamluk | S61 | ⛔ missing (network) |
| `photo-bhramari` | Bhramari Devi, Jalpaiguri (optional) | S61 | ⛔ missing (network) |
| `photo-tarapith` | Tarapith temple | S62 | ⛔ missing (network) |
| `parvati-painting` | Public-domain Parvati painting | S63 | ⛔ missing (network) |
| `broll-kash` | kash flowers (kashphool) in wind | S64 | ⛔ missing (network) |
| `broll-diyas` | rows of diyas being lit | S66 | ⛔ missing (network) |

Missing in narration-named peeths if Commons has no free image: Kiriteswari, Bahula, Jogadya, Nandikeshwari, Bargabhima and the Bangladesh peeths are the likeliest gaps. Add your own to `public/own/`.
