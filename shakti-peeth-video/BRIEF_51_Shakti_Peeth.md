# BRIEF — ৫১ সতীপীঠ

PROJECT: ৫১ সতীপীঠ — সতীর কাহিনি থেকে কালীঘাট, কামাখ্যা, হিংলাজ
CHANNEL_NAME: The Bong Mindset

You are building a complete 9–10 minute Bengali documentary-style video about the legend of Sati and the 51 Shakti Peethas (সতীপীঠ), using Remotion. The full narration script is already written (see SCRIPT below). Your job: verify it, build the peeth data and map, source licensed paintings/photos/B-roll, generate the voiceover, build rich motion graphics, and render. Work through the phases in order. Keep PROGRESS.md updated after every step so the work can resume in a new session.

## GROUND RULES (apply to every phase)

* COPYRIGHT: Use only (a) my own footage/photos in public/own/, (b) museum open-access artworks marked Public Domain / CC0: Metropolitan Museum (isPublicDomain = true), Cleveland Museum of Art Open Access (CC0), Art Institute of Chicago (is_public_domain = true), (c) Wikimedia Commons, Pexels or Pixabay media with licence CC0, Public Domain, Pexels/Pixabay licence, CC BY or CC BY-SA, (d) graphics you draw yourself. Never download from YouTube, Facebook, Instagram, news sites, Google Images, temple or shop websites, or anything with an unclear licence. Skip V&A and British Museum images (their licences are non-commercial). Skip NC and ND licences. Reject watermarked images and modern "AI art" of deities.
* Log every external asset in assets/credits.json (file, source URL, author/museum, licence, licence URL) the moment you download it.
* Generic B-roll (diyas, havan fire, storm clouds, sea, crowds) is atmosphere only. Never label it as a specific peeth unless it actually is.
* RESPECT: Devotional subject. Depict the Devi, Shiva and Vishnu with dignity: use real traditional paintings (Kalighat pat, Pahari/Kangra miniatures, Raja Ravi Varma Press prints) or symbolic visuals (glow, lotus, trishul, chakra, diya, আলপনা). Never draw cartoon gods or goddesses. Present the legend as Puranic/Tantric tradition and devotees' belief ("পুরাণ বলে", "বিশ্বাস"), not as historical fact.
* SATI'S DEATH (S24): symbolic only — a single diya flame flickers and goes out. Never show a figure in or near fire. Never mention or imply the historical social practice also called "sati"; this video is only about the goddess.
* SATI'S BODY (S34–S35): show a glowing silhouette dissolving into points of light that fall on the map. Never show a body being cut. Reject any artwork showing blood or gore (e.g. Cleveland 2003.131 — don't use it).
* DAKSHA (S28): show his crown falling; never show a severed head.
* MAP: draw only the landmass/coastline (Natural Earth data, public domain) — no international or state borders, no country fills. Place names are text labels only. India's laws on depicting national borders are strict; a borderless map avoids that.
* PEETH LISTS DIFFER between texts. Show the small note "তালিকা ও স্থান নিয়ে মতভেদ আছে" whenever the full map or full list is on screen, and mark disputed entries.
* ACCURACY: Keep to the FACT SHEET. Lines marked (VERIFY) must be checked; if you can't confirm one, soften it ("প্রচলিত বিশ্বাস অনুযায়ী") or propose a cut.
* Keep the narration wording as written unless a fact is wrong or timing requires a change. Never paste text copied from books or articles.
* Keep it devotional and non-political. No news about any country's politics.

## OUTPUT

* MAIN: 1920x1080 (16:9), 30 fps, H.264 → out/final.mp4, 9–10 minutes (best format for YouTube and Facebook landscape)
* FB version with burned-in Bengali captions → out/final_captions.mp4
* Teaser 1080x1920 (9:16), 45–60 s → out/teaser_vertical.mp4 for Shorts / Reels
* out/subtitles.srt, out/thumbnail.png (1280x720)
* out/youtube_description.md: summary, chapter timestamps, full credits from credits.json, a short "sources" list, suggested tags

## TECH

* Remotion (latest stable, TypeScript), @remotion/transitions, @remotion/google-fonts, `<OffthreadVideo>` for B-roll, `<Img>` for photos and paintings.
* Map: d3-geo + topojson-client + world-atlas (land-50m.json, from Natural Earth). Projection: geoMercator fitted to lon 60–100, lat 4–38. Render land as one path.
* Fonts: "Tiro Bangla" for headings/chapter cards, "Hind Siliguri" for body, labels and captions. No system fonts.
* Voice: edge-tts, voice bn-IN-BashkarNeural, rate -8% (calm storytelling); fallback bn-IN-TanishaaNeural. If public/audio/recorded/scene-XX.mp3 exists, use my recording.
* TTS text: make a TTS-only copy of each line with numbers as spoken Bengali words (৫১ → একান্ন, ১০৮ → একশো আট, ৮ নভেম্বর → আটই নভেম্বর). On-screen text keeps numerals.
* ffmpeg/ffprobe for durations, trimming, converting clips.
* Media APIs:
  * Met: https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=… then /objects/{id}; keep only isPublicDomain = true; download primaryImage.
  * Cleveland: https://openaccess-api.clevelandart.org/api/artworks/?q=…&cc0=1&has_image=1
  * Art Institute of Chicago: https://api.artic.edu/api/v1/artworks/search?q=… &fields=id,title,image_id,is_public_domain,artist_display,date_display (image URL: https://www.artic.edu/iiif/2/{image_id}/full/1686,/0/default.jpg)
  * Wikimedia Commons API (no key; send a descriptive User-Agent).
  * Pexels (PEXELS_API_KEY in .env), Pixabay (PIXABAY_API_KEY in .env). If a key is missing, skip that source and tell me. Never print keys; add .env to .gitignore.
* First check node 18+, python3, ffmpeg. If anything is missing, give me the install command and stop.

## FACT SHEET (researched — VERIFY / CONFLICT items must be re-checked)

### The legend (versions differ by text)

* Sati (দাক্ষায়ণী) is the daughter of Prajapati Daksha, son of Brahma. She won Shiva through austerities. Shiva Purana: no open opposition at the wedding; Daksha's hostility grows afterwards, partly because of Shiva's ascetic appearance (ash, snakes, cremation grounds).
* Bhagavata Purana (VERIFY): at a great sacrifice everyone rose when Daksha entered, except Brahma and Shiva; Daksha felt insulted.
* Daksha held a great yajna, inviting all gods and sages but not Shiva or Sati. Sati wanted to go; Shiva warned her.
* Mahabhagavata Purana: when Shiva refused, Sati took a terrifying form and appeared to him in the ten directions as the ten Mahavidyas: কালী, তারা, ষোড়শী, ভুবনেশ্বরী, ভৈরবী, ছিন্নমস্তা, ধূমাবতী, বগলামুখী, মাতঙ্গী, কমলা.
* At the yajna Shiva had no share; Daksha insulted him in front of everyone.
* How Sati gave up her body differs: Kalika Purana — by yogic process; Devi Bhagavata — burned by her own power; Mahabhagavata — her shadow (ছায়া) entered the fire. The script uses the Kalika Purana wording (যোগবলে দেহত্যাগ).
* Shiva tore out a lock of his matted hair; from it arose Virabhadra (with Bhadrakali in popular versions). The yajna was destroyed; Daksha was beheaded, later restored with a goat's head.
* Kankhal (Haridwar) — Daksheswar Mahadev temple is widely believed to be the yajna site (VERIFY; a Kerala temple, Kottiyoor, also claims it — say "অনেকে মানেন").
* Shiva carried Sati's body and danced the tandava; the world trembled; Vishnu's Sudarshana chakra cut the body; parts and ornaments fell across the land, and each place became a peeth. Every peeth has a Shakti (the goddess's name there) and a Bhairava (Shiva's form there, the guardian).
* Sati was reborn as Parvati (Uma), daughter of Himavat and Mena, and married Shiva again.

### How many peeths?

* 51: Pithanirnaya / Mahapithanirupana (c. 1690–1720 per Banglapedia) and Mahabhagavata.
* 52: a Bengal tradition (D.C. Sircar). 64: Brahmanda Purana. 108: Devi Bhagavata and Matsya Purana. 18 "Ashtadasha Maha Shakti Peethas": stotram attributed to Adi Shankaracharya (attribution VERIFY — say "নামে প্রচলিত").
* 51 peeths linked to the 51 letters of the Sanskrit alphabet (মাতৃকা বর্ণ) — VERIFY; say "অনেকে বলেন".
* Mahapithanirupana: 14 peeths in West Bengal, 7 in Bangladesh (Banglapedia).

### Famous peeths (body part fell → place)

* Kamakhya, Nilachal hill, Guwahati, Assam: yoni. No idol — a yoni-shaped stone over which a natural spring flows. Ambubachi Mela, mid-June (Ashar): temple closed 3 days, belief that the goddess menstruates; lakhs of pilgrims.
* Hinglaj, Balochistan, Pakistan: cave in a gorge on the Hingol river, Hingol National Park, Lasbela district; brahmarandhra (top of the head). Local Muslims (incl. Zikris) call it "Nani Mandir"; pilgrimage "Nani ki Haj". Hinglaj Yatra in April draws ~3 lakh people (say "লক্ষাধিক").
* Jwalamukhi, Kangra, Himachal Pradesh: tongue. No idol; natural flames from rock fissures are worshipped (VERIFY wording).
* Vishalakshi, Varanasi: earring (কুণ্ডল).
* Vimala, inside the Jagannath temple complex, Puri. (Body part conflicts — don't state.)
* Tripura Sundari, Udaipur, Tripura: right foot/leg (don't state in narration).
* Kanyakumari, Tamil Nadu: back (পৃষ্ঠ).
* Indrakshi, Nainativu island, Sri Lanka: anklet (নূপুর) (VERIFY).
* Dakshayani, Manasarovar, Tibet: right hand.
* Guhyeshwari, near Pashupatinath, Kathmandu, Nepal. (Body part conflicts — don't state.)

### Bangladesh (Mahapithanirupana: 7)

* Chandranath hill, Sitakunda, Chattogram (body part conflicts — don't state).
* Sugandha, Shikarpur, Barishal: nose.
* Jeshoreshwari, Ishwaripur, Satkhira (body part conflicts — don't state).
* Shri Shail / Shrihatta, Sylhet: neck/throat (গ্রীবা) (VERIFY).
* Bhabanipur, Bogura; Jayanti; Kanyashram — on-screen only.

### West Bengal

* Kalighat, Kolkata, on the Adi Ganga: right toes. Shakti Kalika, Bhairava Nakuleshwar. (19th-c. Kalighat paintings were sold to pilgrims here — Met note.)
* Bakreshwar, Birbhum: between the eyebrows (ভ্রূমধ্য); hot springs.
* Nalhati, Birbhum: নলা (CONFLICT: "tubular bone" vs throat vs stomach — keep the Bengali word নলা).
* Kankalitala, Birbhum: কাঁকাল/কোমর (CONFLICT: waist vs skeleton — say কাঁকাল, মানে কোমর).
* Nandikeshwari, Sainthia, Birbhum: necklace (কণ্ঠহার).
* Attahas, Labhpur, Birbhum (Devi Phullara): lower lip (অধর). CONFLICT: Dakshindihi (Ketugram) also claims Attahas — show "দাবি নিয়ে মতভেদ আছে".
* Bahula, Ketugram, Purba Bardhaman: left arm.
* Jogadya, Kshirgram, Purba Bardhaman: right big toe.
* Mangal Chandika, Ujani (Kogram), Purba Bardhaman: CONFLICT right elbow vs right wrist — don't state in narration.
* Kiriteswari, Murshidabad: crown (কিরীট).
* Bargabhima (Bibhas), Tamluk, Purba Medinipur: left ankle.
* Bhramari (Trisrota), Jalpaiguri: left leg.
* Others claimed on some lists (on-screen only): Ratnavali (Khanakul, Hooghly).
* Tarapith, Birbhum: not in every 51 list (VERIFY wording); popular belief: Sati's eye/third eye fell here; called a Siddhapeeth; sadhana-ground of Bamakhyapa (1837–1911).

Kali Puja 2026: Sunday, 8 November.

Starting sources: en.wikipedia.org/wiki/Shakta_pithas, en.banglapedia.org/index.php/Sakta-pitha, en.wikipedia.org/wiki/Sati_(Hindu_goddess), D.C. Sircar "The Śākta Pīṭhas" (1948), Met object 2000.313, Wikipedia articles of each temple.

## SCRIPT (67 scenes, ~1,450 Bengali words ≈ 9.5 min)

Codes: [MG] motion graphics · [ART] public-domain museum/Commons painting · [PH] licensed photo · [BR] licensed B-roll video · [OWN] my footage if available

### অধ্যায় ০ — হুক (night)

* S01 — কলকাতার কালীঘাট থেকে অসমের কামাখ্যা। পাকিস্তানের হিংলাজ থেকে শ্রীলঙ্কার নয়নাতিভু। এমনকি তিব্বতের মানস সরোবর। [MG] PeethMap: dot lights at each named place; [PH] 1.5 s photo flash per place
* S02 — হাজার হাজার মাইল জুড়ে ছড়িয়ে আছে একান্নটা পবিত্র স্থান। আর প্রত্যেকটার পেছনে আছে একটাই গল্প। [MG] all dots twinkle; StatCounter "৫১"
* S03 — এক মেয়ের অভিমান, এক স্বামীর শোক, আর এমন এক প্রলয়নৃত্য, যাতে কেঁপে উঠেছিল গোটা সৃষ্টি। [ART] Met 2000.313 Kalighat painting "Shiva Carries the Corpse of Sati", slow Ken Burns
* S04 — আজ শুনব একান্ন সতীপীঠের পুরো কাহিনি। কে সতী, কেন তাঁর দেহ ছড়িয়ে পড়ল দেশজুড়ে, আর কোথায় কোথায় আছে সেই পীঠ। [MG] title lockup "৫১ সতীপীঠ — পুরো কাহিনি"; small line "পুরাণ, তন্ত্র ও প্রচলিত বিশ্বাস অবলম্বনে"

### অধ্যায় ১ — দক্ষের মেয়ে সতী (painting)

* S05 — অনেক অনেক কাল আগের কথা। ব্রহ্মার পুত্র প্রজাপতি দক্ষ। দেবলোকে তাঁর প্রভাব আর প্রতিপত্তি বিরাট। [MG] ChapterCard; [ART] court-scene miniature; FamilyLinks ব্রহ্মা → দক্ষ
* S06 — দক্ষের কন্যা সতী। বাবার নাম থেকেই তাঁর আরেক নাম দাক্ষায়ণী। [MG] FamilyLinks দক্ষ → সতী (দাক্ষায়ণী); [ART] Ravi Varma Press print if PD
* S07 — ছোট থেকেই সতীর মন পড়ে ছিল একজনের দিকে। কৈলাসের মহাদেব, শিব। [MG] snowy mountain silhouette with glow; [ART] Shiva painting
* S08 — কঠোর তপস্যা করে শেষ পর্যন্ত শিবকেই স্বামী হিসেবে পেলেন সতী। [MG] two glowing points drift together; DiyaRow pair
* S09 — বিয়ে হল ঠিকই। কিন্তু গায়ে ছাই, গলায় সাপ, শ্মশানে বাস, এমন জামাইকে মন থেকে কোনওদিনই মেনে নিতে পারেননি দক্ষ। [MG] three line-icon cards: ছাই · সাপ · শ্মশান
* S10 — ভাগবত পুরাণে আছে, এক মহাযজ্ঞে দক্ষ ঢুকতেই সবাই উঠে দাঁড়ালেন। শুধু ব্রহ্মা আর শিব বসে রইলেন। বাবা ব্রহ্মার বসে থাকা তো স্বাভাবিক, কিন্তু জামাই শিব? (VERIFY) [MG] row of silhouettes rising; two stay seated, one glows
* S11 — অপমানে জ্বলে উঠলেন দক্ষ। সেদিন থেকে শিবের প্রতি তাঁর রাগ আর বিদ্বেষ বেড়েই চলল। [MG] red pulse; Headline "বিদ্বেষের শুরু"

### অধ্যায় ২ — দক্ষযজ্ঞ (night)

* S12 — কিছুদিন পর দক্ষ আয়োজন করলেন এক বিশাল যজ্ঞের। [MG] ChapterCard; stylised yajna fire (drawn); [BR] havan fire close-up
* S13 — নিমন্ত্রণ গেল সব দেবতা, সব ঋষি, সব মুনির কাছে। বাদ পড়লেন শুধু দুজন। শিব আর সতী। [MG] invitation cards fly to many icons; two empty slots remain
* S14 — কৈলাস থেকে সতী দেখলেন, আকাশপথে দেবতারা দল বেঁধে চলেছেন তাঁর বাবার বাড়ি। মেয়ের মন কি আর মানে? [MG] streaks of light crossing a night sky
* S15 — সতী যেতে চাইলেন। শিব বারণ করলেন। বললেন, বিনা নিমন্ত্রণে গেলে অপমানই জুটবে। [MG] DialogueCard সতী ↔ শিব (names + symbols, no faces)
* S16 — সতী বললেন, বাবার বাড়ি যেতে মেয়ের আবার নিমন্ত্রণ লাগে নাকি? [MG] QuoteCard
* S17 — মহাভাগবত পুরাণ বলে, শিব যখন কিছুতেই রাজি হলেন না, ক্রোধে সতী ধারণ করলেন এক ভয়ংকর রূপ। শিব ফিরে যেতে চাইলেন, কিন্তু যেদিকে তাকান, সেদিকেই সতীর এক এক রূপ। [MG] dark screen; ten points of light appear around the frame
* S18 — কালী, তারা, ষোড়শী, ভুবনেশ্বরী, ভৈরবী, ছিন্নমস্তা, ধূমাবতী, বগলামুখী, মাতঙ্গী আর কমলা। এই হল দশ মহাবিদ্যা। [MG] MahavidyaRing: names appear one by one; [ART] PD Mahavidya paintings in slots if found
* S19 — আর এই দশ মহাবিদ্যার প্রথম রূপটিই আমাদের মা কালী। [MG] Kali slot grows and glows; [BR] diya
* S20 — অবশেষে অনুমতি মিলল। সতী রওনা দিলেন বাবার যজ্ঞে। [MG] path of light descending from Kailash

### অধ্যায় ৩ — দেহত্যাগ (night, minimal)

* S21 — যজ্ঞস্থলে পৌঁছে সতী দেখলেন, সব দেবতার আসন পাতা, যজ্ঞের ভাগ রাখা। শুধু শিবের নামে কিছুই নেই। [MG] rows of seats with name plates; one gap
* S22 — আর দক্ষ? মেয়েকে দেখেও মুখ ফিরিয়ে নিলেন। তারপর সবার সামনেই শুরু করলেন শিবনিন্দা। [MG] jagged red sound wave; muted crowd silhouettes
* S23 — স্বামীর অপমান সতী আর সহ্য করতে পারলেন না। বললেন, যে দেহ তোমার থেকে পেয়েছি, সেই দেহ আমি আর রাখব না। [MG] QuoteCard (hold 1 s longer)
* S24 — কালিকা পুরাণ বলে, সেখানেই যোগবলে দেহত্যাগ করলেন সতী। স্তব্ধ হয়ে গেল গোটা যজ্ঞস্থল। [MG] one diya flame flickers and goes out; ~1.5 s near-silence; music drops

### অধ্যায় ৪ — বীরভদ্র (night, deep red)

* S25 — খবর পৌঁছল কৈলাসে। শোকে আর ক্রোধে শিব নিজের এক গোছা জটা ছিঁড়ে আছড়ে ফেললেন মাটিতে। [MG] ChapterCard; ground shockwave ring
* S26 — প্রচলিত কাহিনি অনুযায়ী, সেই জটা থেকে জন্ম নিলেন প্রবল পরাক্রমী বীরভদ্র। সঙ্গে দেবী ভদ্রকালী। [MG] two towering abstract glowing forms rise; [ART] PD Virabhadra painting if found
* S27 — বীরভদ্রের বাহিনী ঝড়ের মতো নেমে এল দক্ষের যজ্ঞে। তছনছ হয়ে গেল সব আয়োজন। [MG] yajna fire bursts into scattering sparks; vessels tumble (drawn)
* S28 — দক্ষের মাথা কাটা গেল। পরে দেবতাদের কাতর অনুরোধে শিব তাঁকে প্রাণ ফিরিয়ে দিলেন। তবে জুড়ে দেওয়া হল এক ছাগলের মাথা। [MG] crown falls and rolls away (no head shown); simple goat line icon appears
* S29 — হরিদ্বারের কনখলে দক্ষেশ্বর মহাদেবের মন্দিরকে অনেকেই সেই যজ্ঞস্থল বলে মানেন। (VERIFY) [PH] Daksheswar Mahadev temple, Kankhal (Commons)

### অধ্যায় ৫ — প্রলয়নৃত্য (night)

* S30 — কিন্তু যজ্ঞ ধ্বংস হলেও শিবের শোক এতটুকু কমল না। সতীর প্রাণহীন দেহ কাঁধে তুলে নিলেন তিনি। [ART] Met 2000.313, slow Ken Burns from bottom to top
* S31 — তারপর শুরু হল তাণ্ডব। প্রলয়নৃত্য। এক একটা পদক্ষেপে কেঁপে উঠছে পৃথিবী। [MG] subtle screen shake, light cracks across the map; damaru SFX if present
* S32 — পাহাড় ভেঙে পড়ছে, সমুদ্র ফুঁসে উঠছে, দেবতারা আতঙ্কে। এভাবে চললে ধ্বংস হয়ে যাবে গোটা সৃষ্টি। [BR] storm clouds, rough sea; [MG] red vignette
* S33 — সবাই ছুটে গেলেন বিষ্ণুর কাছে। উপায় একটাই। শিবের কাঁধ থেকে সতীর দেহ সরাতে হবে। [MG] many small lights rush toward a blue glow with conch/chakra icon
* S34 — বিষ্ণু ছুড়লেন তাঁর সুদর্শন চক্র। চক্র ঘুরে ঘুরে সতীর দেহকে খণ্ড খণ্ড করে দিল। [MG] ChakraSpin (drawn golden chakra); glowing silhouette dissolves into light points
* S35 — সেই খণ্ডগুলো ছড়িয়ে পড়ল ভারতবর্ষের নানা প্রান্তে। কোথাও পড়ল অঙ্গ, কোথাও অলংকার। [MG] PeethMap: 51 light points rain down and land one by one with soft chimes
* S36 — দেহের ভার হালকা হতেই ধীরে ধীরে শান্ত হলেন মহাদেব। থামল প্রলয়। [MG] map settles; stars return; music softens
* S37 — আর যেখানে যেখানে সতীর দেহের অংশ পড়েছিল, প্রত্যেকটা জায়গা হয়ে উঠল এক একটা পবিত্র তীর্থ। সতীপীঠ, বা শক্তিপীঠ। [MG] dots morph into small temple icons; Headline "সতীপীঠ = শক্তিপীঠ"

### অধ্যায় ৬ — শক্তি, ভৈরব আর সংখ্যার রহস্য (gold)

* S38 — প্রত্যেক পীঠে মা পূজিত হন এক আলাদা নামে। তিনিই সেই পীঠের শক্তি। [MG] ChapterCard; ShaktiBhairavaCard (left half)
* S39 — আর তাঁর পাশে থাকেন শিবের এক রূপ, সেই পীঠের ভৈরব। বিশ্বাস, তিনিই রক্ষা করেন পীঠকে। [MG] ShaktiBhairavaCard (right half); example chip: কালীঘাট — শক্তি কালিকা · ভৈরব নকুলেশ্বর
* S40 — কিন্তু পীঠের সংখ্যা ঠিক কত? মজার কথা, সব শাস্ত্র এ নিয়ে একমত নয়। [MG] question mark built from dots
* S41 — পীঠনির্ণয় তন্ত্রে একান্ন। বাংলার এক প্রচলিত মতে বাহান্ন। ব্রহ্মাণ্ড পুরাণে চৌষট্টি। আর দেবীভাগবত পুরাণে একশো আট। [MG] CountCards ৫১ / ৫২ / ৬৪ / ১০৮ with source labels
* S42 — আবার আদি শঙ্করাচার্যের নামে প্রচলিত এক স্তোত্রে আছে আঠারোটা মহাশক্তিপীঠের কথা। [MG] CountCard ১৮ "অষ্টাদশ মহাশক্তিপীঠ"
* S43 — তবে বাংলায় সবচেয়ে প্রচলিত একান্ন। অনেকে বলেন, সংস্কৃত বর্ণমালার একান্নটা বর্ণের সঙ্গে মিলে আছে এই একান্ন পীঠ। (VERIFY) [MG] 51 letters orbit and land on 51 dots → PeethGrid montage (51 tiles cascade, ~6 s)

### অধ্যায় ৭ — পীঠ পরিক্রমা (map + photos)

* S44 — চলুন, এবার মানচিত্র ধরে ঘুরে আসি কয়েকটা বিখ্যাত পীঠ। [MG] ChapterCard; PeethMap full view
* S45 — প্রথমে অসমের গুয়াহাটি, নীলাচল পাহাড়ের কামাখ্যা। এখানে পড়েছিল সতীর যোনি। [MG] fly-to Assam; [PH] Kamakhya temple exterior
* S46 — কামাখ্যার গর্ভগৃহে কোনও মূর্তি নেই। পূজিত হয় একটি পাথর, যার উপর দিয়ে বয়ে চলে প্রাকৃতিক জলধারা। [MG] abstract stone + water ripple; [PH] temple domes
* S47 — প্রতি বছর আষাঢ় মাসে অম্বুবাচীর সময় তিন দিন বন্ধ থাকে মন্দির। বিশ্বাস, সেই সময় মা ঋতুমতী হন। তারপর ভিড় জমান লক্ষ লক্ষ ভক্ত। [MG] chip "আষাঢ় · ৩ দিন"; [PH] Ambubachi crowd (Commons)
* S48 — এবার পশ্চিমে, পাকিস্তানের বালুচিস্তানে। হিঙ্গোল নদীর ধারে এক পাহাড়ি গুহায় মা হিংলাজ। এখানে পড়েছিল ব্রহ্মরন্ধ্র, মাথার উপরের অংশ। [MG] fly-to Balochistan; [PH] Hinglaj gorge/cave (Commons)
* S49 — স্থানীয় মুসলিমরাও এই মন্দিরকে শ্রদ্ধা করেন। তাঁরা ডাকেন নানি মন্দির নামে। প্রতি বসন্তে হিংলাজ যাত্রায় আসেন লক্ষাধিক মানুষ। [MG] QuoteCard "নানি মন্দির"; StatCounter "লক্ষাধিক"
* S50 — হিমাচলের জ্বালামুখীতে পড়েছিল জিভ। এখানেও কোনও মূর্তি নেই। পাথরের ফাটল থেকে বেরিয়ে আসা শিখাকেই মা রূপে পুজো করা হয়। [PH] Jwalamukhi temple; [MG] small flames
* S51 — কাশীতে দেবী বিশালাক্ষী, যেখানে পড়েছিল কানের কুণ্ডল। পুরীর জগন্নাথ মন্দির চত্বরেই দেবী বিমলা। আর ত্রিপুরার উদয়পুরে ত্রিপুরাসুন্দরী। [MG] map hops Varanasi → Puri → Udaipur; [PH] each
* S52 — একেবারে দক্ষিণে কন্যাকুমারী, যেখানে মিলেছে তিন সমুদ্র। এখানে পড়েছিল সতীর পিঠ। [PH/BR] Kanyakumari sea; [MG] three-tone water merge
* S53 — সমুদ্র পেরিয়ে শ্রীলঙ্কার নয়নাতিভু দ্বীপে দেবী ইন্দ্রাক্ষী, যেখানে পড়েছিল নূপুর। আর হিমালয় পেরিয়ে তিব্বতের মানস সরোবরের তীরে দাক্ষায়ণী, যেখানে পড়েছিল ডান হাত। [MG] map arc to Sri Lanka, then north to Manasarovar; [PH] Manasarovar lake
* S54 — নেপালের কাঠমান্ডুতে পশুপতিনাথের কাছেই দেবী গুহ্যেশ্বরী। আর ওপার বাংলায়, মহাপীঠনিরূপণ অনুযায়ী, রয়েছে সাতটা পীঠ। [PH] Guhyeshwari; [MG] Bangladesh area with 7 dots, StatCounter "৭"
* S55 — চট্টগ্রামের সীতাকুণ্ডে চন্দ্রনাথ পাহাড়। বরিশালের শিকারপুরে সুগন্ধা, যেখানে পড়েছিল নাক। সাতক্ষীরার ঈশ্বরীপুরে যশোরেশ্বরী। আর সিলেটের শ্রীশৈল। [PH] Chandranath hill, Sugandha, Jeshoreshwari; [MG] name chips

### অধ্যায় ৮ — এপার বাংলার পীঠ (gold)

* S56 — আর আমাদের পশ্চিমবঙ্গ? সেই মহাপীঠনিরূপণ অনুযায়ী, এই বাংলাতেই রয়েছে চোদ্দোটা সতীপীঠ। [MG] ChapterCard; map zoom to West Bengal; StatCounter "১৪"
* S57 — শুরু করা যাক কলকাতা দিয়ে। আদিগঙ্গার তীরে কালীঘাট, যেখানে পড়েছিল মায়ের ডান পায়ের আঙুল। শক্তি কালিকা, ভৈরব নকুলেশ্বর। [PH] Kalighat exterior; LowerThird; [ART] a Kalighat pat (link to the opening painting)
* S58 — বীরভূম যেন পীঠের জেলা। বক্রেশ্বরে পড়েছিল ভ্রূমধ্য। নলহাটিতে নলা। আর কঙ্কালীতলায় কাঁকাল, মানে কোমর। [MG] Birbhum cluster; [PH] Bakreshwar, Nalhati, Kankalitala
* S59 — সাঁইথিয়ার নন্দীকেশ্বরীতে কণ্ঠহার। আর লাভপুরের অট্টহাসে দেবী ফুল্লরা, যেখানে পড়েছিল অধর, অর্থাৎ ঠোঁট। [PH] Nandikeshwari, Fullara; note chip "অট্টহাসের স্থান নিয়ে মতভেদ আছে"
* S60 — পূর্ব বর্ধমানে কেতুগ্রামের বহুলা, যেখানে পড়েছিল বাম বাহু। ক্ষীরগ্রামের যোগাদ্যা, ডান পায়ের বুড়ো আঙুল। আর উজানিতে মঙ্গলচণ্ডী। [MG] district chips; [PH] each if found
* S61 — মুর্শিদাবাদে কিরীটেশ্বরী, যেখানে পড়েছিল কিরীট, মানে মুকুট। তমলুকে বর্গভীমা, বাম গোড়ালি। আর জলপাইগুড়িতে ভ্রামরী, বাম পা। [PH] Kiriteswari, Bargabhima; [MG] dots light in order
* S62 — আর তারাপীঠ? মজার ব্যাপার, সব প্রাচীন তালিকায় তারাপীঠের নাম নেই। তবু বহু ভক্তের বিশ্বাস, এখানে পড়েছিল সতীর নয়নের তারা। বামাখ্যাপার এই সাধনক্ষেত্রকে বলা হয় সিদ্ধপীঠ। (VERIFY) [PH] Tarapith; LowerThird "সিদ্ধপীঠ"

### অধ্যায় ৯ — উমা ফিরে আসেন (night → warm)

* S63 — কিন্তু সতীর গল্প এখানেই শেষ নয়। পরজন্মে তিনি জন্ম নিলেন হিমালয় আর মেনকার মেয়ে হয়ে। নাম পার্বতী, বাংলার আদরের উমা। [MG] ChapterCard; snowy peaks glow; [ART] PD Parvati painting
* S64 — কঠোর তপস্যায় আবার তিনি পেলেন শিবকে। আর সেই উমাই প্রতি শরতে বাপের বাড়ি আসেন, দুর্গা হয়ে। [MG] drawn কাশফুল sway; [BR] kash flowers; dhak SFX if present
* S65 — একান্নটা পীঠ, হাজার মাইলের দূরত্ব, আলাদা দেশ, আলাদা ভাষা। তবু সবাই বাঁধা একটাই সুতোয়। মায়ের প্রতি ভক্তি। [MG] PeethMap: one thin golden thread connects all 51 dots
* S66 — এ বছর কালীপুজো রবিবার, ৮ নভেম্বর। কালীঘাট থেকে কঙ্কালীতলা, বাংলার পীঠে পীঠে সেদিন জ্বলবে প্রদীপ। [BR] diyas; date chip "৮ নভেম্বর"
* S67 — আপনি কোন কোন সতীপীঠে গেছেন? কমেন্টে লিখুন। আর এমন আরও গল্প শুনতে ফলো করুন CHANNEL_NAME। জয় মা। [MG] end card: comment + follow buttons, DiyaRow

## PHASE 1 — Verify the script and build the peeth data (then STOP)

1. Check every line against the FACT SHEET and reliable sources (Wikipedia and its references, Banglapedia, D.C. Sircar, each temple's Wikipedia page). Write facts.md: claim → source → VERIFIED / CONFLICT / UNVERIFIED.
2. Build src/data/peeths.json — 51 entries following the Bengal tradition (Pithanirnaya / Mahapithanirupana as reported by Banglapedia, Wikipedia and Sircar): { id, nameBn, placeBn, regionBn, bodyPartBn, shaktiBn, bhairavaBn, lat, lon, status: "standard" | "disputed", sources: [] } Coordinates from each temple's Wikipedia/Wikidata page (P625). Where the location or body part is contested, set status "disputed". Also list Tarapith separately as { status: "siddhapeeth" } — it is not one of the 51 dots.
3. Write script_changes.md listing only the lines you propose to change and why.
4. Replace CHANNEL_NAME if I've filled it in above; otherwise ask me. STOP and ask me to approve script_changes.md and peeths.json.

## PHASE 2 — Storyboard

storyboard.json from the SCRIPT, one entry per scene: { id, chapter, narration, ttsText, visualType: "motion" | "art" | "photo" | "broll" | "mixed", background: "night" | "parchment" | "gold", components, onScreenText (short Bengali keywords only), assetNeeds, animationBeats } Rules: aim for ~50% real paintings/photos/B-roll and ~50% motion graphics; every photo or painting gets an overlay (label, map inset, lower-third or counter); never repeat a layout twice in a row; every chapter opens with a ChapterCard; the PeethMap is the hero visual and returns at S01–S02, S35–S37, S44–S56 and S65.

## PHASE 3 — Asset sourcing (then STOP for my review)

1. Priority: public/own/ > museum open access > Wikimedia Commons > Pexels > Pixabay > drawn graphics.
2. Museum searches (Met, Cleveland, Art Institute of Chicago): "Sati", "Shiva Sati", "Kalighat", "Daksha", "Virabhadra", "Mahavidya", "Kali", "Tara", "Parvati", "Shiva", "Vishnu", "Devi". Keep only public-domain/CC0 items; Met 2000.313 is the key image.
3. Commons — paintings: "Kalighat painting", "Raja Ravi Varma Press", "Mahavidyas", "Daksha yajna", "Virabhadra", "Dakshayani". Temples (exteriors are fine): "Kamakhya Temple", "Ambubachi Mela", "Hinglaj Mata", "Jwalamukhi Temple", "Vishalakshi Temple", "Vimala Temple Puri", "Tripura Sundari Temple Udaipur", "Kanyakumari", "Nainativu", "Lake Manasarovar", "Guhyeshwari", "Chandranath Temple Sitakunda", "Sugandha Shaktipeeth", "Jeshoreshwari", "Kalighat Kali Temple", "Bakreshwar", "Nalhati", "Kankalitala", "Nandikeshwari Sainthia", "Fullara Labhpur", "Bahula Ketugram", "Kshirgram Jogadya", "Kiriteswari", "Bargabhima Tamluk", "Bhramari Devi Jalpaiguri", "Tarapith", "Daksheswar Mahadev Kankhal". Read extmetadata (LicenseShortName, Artist, LicenseUrl); keep allowed licences only.
4. Pexels/Pixabay (videos first, then photos): "havan fire", "diya", "aarti", "temple bell", "incense smoke", "storm clouds", "rough sea", "Himalaya snow", "lotus", "hibiscus", "kash flower", "Kolkata night", "Ganges", "conch".
5. Save to public/art/, public/photos/, public/broll/ (aim: 15–25 paintings, 35–50 photos, 15–25 clips). Trim clips to their best 4–8 s, convert to H.264 1080p 30fps, strip audio. Upscale small images with a gentle lanczos filter only — no AI "enhancement" or colourising.
6. Inspect every asset (one frame per video) and reject anything wrong, misleading, gory, or showing a different temple/deity.
7. ASSETS.md: scene → asset → licence. Mark scenes still missing a real image.
8. If you can't find licensed images for a peeth that's named in the narration, list it and tell me. I'll add my own to public/own/. Never pass off a different temple as the one named. STOP: show me ASSETS.md and a contact sheet of all assets (ffmpeg tile) for approval.

## PHASE 4 — Voiceover

1. Generate public/audio/scene-XX.mp3 from ttsText (or use my recordings).
2. ffprobe → src/data/durations.json. Scene frames = ceil((audio seconds + 0.7) × 30); chapter-opening scenes get +1.5 s for the ChapterCard; S24 gets +1.5 s of silence; S35 gets +2 s so all dots land. Account for transition overlap so no audio is cut off.
3. Report total runtime. Target 9:00–10:00. If short, lengthen holds on S18, S35, S43, S65 before proposing new lines; if long, propose trims.

## PHASE 5 — Design system and components

src/theme.ts (no hard-coded colours in scenes):

* night: gradient #0A0910 → #1B0F1C, faint star dust, soft diya-orange glow at bottom
* parchment (for paintings): #EADCC0 with fibre texture, deep-red border #7A1420
* gold: warm ivory #F7EFDD with gold #E3B04B linework
* accents: sindoor red #C1121F, jaba red #B5122B, diya orange #F08A24, Vishnu blue #2F5D9E, ash grey #8C8C8C, muted #A89F90
* an original আলপনা-style border pattern you draw in SVG

Motion: calm and cinematic; dramatic only in chapters ৪–৫. Spring damping ~200; Ken Burns on every photo and painting (scale 1.00 → 1.08 + slight pan to a focal point); hold B-roll 4–6 s; 18-frame crossfades; dip to black before each ChapterCard; embers or petals in night scenes; light grain on paintings. Layout: 80px safe margins; at most ~12 Bengali words on screen (except PeethGrid); headings 72–88px Tiro Bangla; body 34–40px Hind Siliguri; one key word per heading in gold or sindoor red; dark gradient behind text over images.

Components in src/components/:

1. Background (night | parchment | gold)
2. ChapterCard — "অধ্যায় ১" + title, আলপনা border, diya glow
3. Headline with highlighted word and kicker line
4. PhotoKenBurns — focal point, pan direction, optional caption/credit line
5. PaintingFrame — museum art inside a parchment mat with thin red border, gentle parallax, small credit line ("সৌজন্য: The Met, Public Domain")
6. BrollClip — OffthreadVideo, trim, legibility gradient, optional warm grade
7. PeethMap — HERO component. Borderless land path from world-atlas; gold coastline glow; dots from peeths.json (disputed = dashed ring); props: highlight ids, flyTo {lon, lat, zoom}, rainIn (dots fall from top and land with a ripple), thread (one golden line visiting all dots), labels in Bengali; corner note "তালিকা ও স্থান নিয়ে মতভেদ আছে"
8. PeethGrid — 51 tiles (name · place · body part) cascading in, ~6 s
9. MahavidyaRing — ten slots in a circle, names + optional paintings, Kali emphasised
10. ChakraSpin — original golden chakra (drawn), spin + motion blur + light trail
11. ShaktiBhairavaCard — split card: শক্তি (left, warm) · ভৈরব (right, ash-blue)
12. CountCards — ৫১ / ৫২ / ৬৪ / ১০৮ / ১৮ with source labels
13. FamilyLinks — ব্রহ্মা → দক্ষ → সতী; শিব (text nodes, painting thumbnails if PD)
14. DialogueCard — two speakers (names + symbols), bubbles typing out
15. LowerThird — e.g. "কালীঘাট · কলকাতা — শক্তি কালিকা · ভৈরব নকুলেশ্বর"
16. StatCounter with Bengali numerals
17. QuoteCard — large Tiro Bangla text, gold quote marks
18. ParticleLayer (embers/petals/sparks) and DiyaRow (incl. single-diya-goes-out for S24)
19. CaptionLayer — bottom-centre Bengali captions, 2 lines max, captioned render only

Build a ComponentShowcase. Render stills with `npx remotion still`, open them and check Bengali conjuncts (ক্ষ, ষ্ঠ, ন্দ্র, ঙ্গ), overflow, map legibility and dot positions. Fix before moving on.

## PHASE 6 — Scenes (checkpoint after chapters 0–2)

1. One file per scene in src/scenes/, following storyboard.json. Main composition "ShaktiPeeth" uses TransitionSeries with durations.json and one `<Audio>` per scene.
2. Music: public/music/bg.mp3 (I supply it). Loop if short; volume ~0.07 under narration, ~0.15 on ChapterCards (volume callback); dip to ~0.02 for S24; 2 s fade in/out. Optional SFX in public/sfx/ (conch, bell, dhak, damaru, rumble, chime) only where the script notes them, if present.
3. Build chapters 0–2, render a low-res preview (--scale=0.5) and STOP for my feedback. Apply it to theme/components, then build the rest in batches of ~10 scenes, inspecting a still from each scene.

## PHASE 7 — Finish

1. `npx tsc --noEmit`; fix all errors.
2. Render out/final.mp4 (h264, crf 18) and out/final_captions.mp4 (same + CaptionLayer).
3. out/subtitles.srt from narration and durations.
4. Thumbnail 1280x720: Met 2000.313 painting on the left, glowing borderless map with 51 dots on the right, bold text "সতীর দেহ কোথায় কোথায় পড়েছিল?" with "৫১" in sindoor red; high contrast, readable on a phone.
5. out/youtube_description.md: 3-line summary, chapter timestamps (অধ্যায় titles), "তালিকা নিয়ে মতভেদ" note, sources, credits for every asset from credits.json, music credit line, 10–15 tags.
6. Report runtime, file paths, and any CONFLICT/UNVERIFIED facts left in the script.

## PHASE 8 — Vertical teaser

Composition 1080x1920, 45–60 s: S01–S02 hook → S31 tandava → S34–S35 chakra and dots raining on the map → S57 Kalighat → end card "পুরো কাহিনি দেখুন CHANNEL_NAME-এ". Reuse the scene audio; reflow layouts for vertical; big captions always on; render out/teaser_vertical.mp4.

## Research sources listed with the brief

* Shakta pithas – Wikipedia: https://en.wikipedia.org/wiki/Shakta_pithas
* Sakta-pitha – Banglapedia: https://en.banglapedia.org/index.php/Sakta-pitha
* Sati (Hindu goddess) – Wikipedia: https://en.wikipedia.org/wiki/Sati_(Hindu_goddess)
* Shiva Carries the Corpse of Sati – The Met (Public Domain): https://www.metmuseum.org/art/collection/search/55034
* Shiva Bearing Aloft the Body of His Sati – Cleveland Museum of Art (contains gore — do not use): https://www.clevelandart.org/art/2003.131
* Hinglaj Mata Temple – Wikipedia: https://en.wikipedia.org/wiki/Hinglaj_Mata_Temple
* Ambubachi Mela – Wikipedia: https://en.wikipedia.org/wiki/Ambubachi_Mela
* Tarapith temple – Wikipedia: https://en.wikipedia.org/wiki/Tarapith_temple
* Kali Puja 2026 date – HappyFares: https://www.happyfares.in/blog/?p=12580
