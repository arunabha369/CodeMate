# ASSETS.md — media per scene

**10 of 44 slots filled.** Filled clips are Pexels-licensed B-roll found through the user's vidIQ connector (credits in `assets/credits.json`).
Temple photos and public-domain paintings still need Wikimedia Commons and the museum open-access hosts, which this session's network policy blocks.
Once those hosts are allowed, run `python3 scripts/fetch_assets.py` to fill the rest. You can also put your own photos in `public/own/` and point a slot's `file` at them.
Generic B-roll is atmosphere only. A clip is captioned as a place only when it really shows that place (Kanyakumari, Puri, Kashi).

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
| `broll-havan` | havan fire (atmosphere) | S12 | ✅ `broll/broll-havan.mp4` — ভিডিও: Pabitra Sarkar · Pexels |
| `broll-diya` | single diya flame | S19 | ✅ `broll/broll-diya.mp4` — ভিডিও: Jyoti Pur · Pexels |
| `virabhadra-painting` | Public-domain Virabhadra painting (optional) | S26 | ⛔ missing (network) |
| `photo-daksheswar` | Daksheswar Mahadev temple, Kankhal (Commons) | S29 | ⛔ missing (network) |
| `broll-storm` | storm clouds, lightning | S32 | ✅ `broll/broll-storm.mp4` — ভিডিও: Stefano Barbieri · Pexels |
| `broll-sea` | rough sea | S32 | ✅ `broll/broll-sea.mp4` — ভিডিও: Peggy Johnson Philip Waikoloa · Pexels |
| `photo-kamakhya-domes` | Kamakhya temple domes / shikhara | S46 | ⛔ missing (network) |
| `photo-ambubachi` | Ambubachi Mela crowd (Commons) | S47 | ⛔ missing (network) |
| `photo-jwalamukhi` | Jwalamukhi temple, Kangra (exterior) | S50 | ⛔ missing (network) |
| `photo-vishalakshi` | Vishalakshi temple, Varanasi | — | ⛔ missing (network) |
| `photo-vimala` | Vimala temple, Puri (or Jagannath complex exterior) | — | ⛔ missing (network) |
| `photo-tripura` | Tripura Sundari temple, Udaipur | S51 | ⛔ missing (network) |
| `broll-kanyakumari` | Kanyakumari: Vivekananda Rock Memorial and Thiruvalluvar statue | S52 | ✅ `broll/broll-kanyakumari.mp4` — ভিডিও: Antony · Pexels |
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
| `broll-kash` | tall white-plumed grass in wind (kash-like) | S64 | ✅ `broll/broll-kash.mp4` — ভিডিও: Nitesh Kamboj · Pexels |
| `broll-diyas` | rows of diyas lit for Diwali | S66 | ✅ `broll/broll-diyas.mp4` — ভিডিও: Mohit Jain · Pexels |
| `broll-himalaya` | Himalaya (Machhapuchhre) — generic Himalaya, not Kailash | S63 | ✅ `broll/broll-himalaya.mp4` — ভিডিও: Nishess Shakya · Pexels |
| `clip-puri` | Puri: Jagannath temple entrance, Aruna Stambha | S51 | ✅ `broll/clip-puri.mp4` — ভিডিও: Dhiren Behera · Pexels |
| `clip-kashi` | Kashi: evening Ganga aarti at the Varanasi ghats | S51 | ✅ `broll/clip-kashi.mp4` — ভিডিও: Sahil Singh Raahee · Pexels |
