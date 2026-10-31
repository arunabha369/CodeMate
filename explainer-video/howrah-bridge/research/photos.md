# Real photos: candidates and licence status

You asked for some real, copyright-free photos. This file lists the slots in the script and the best candidates found by web search.

**Download status:** none downloaded yet. This cloud session's network blocks `commons.wikimedia.org`, `upload.wikimedia.org`, `unsplash.com`, `images.unsplash.com`, `pexels.com` and the other image hosts.
Once those domains are allowed, the build step will:
1. open each file page;
2. **confirm the licence on the page itself** (search snippets are not enough);
3. download the original;
4. record the author, licence and URL in `project/public/photos/CREDITS.md`, the on-screen credit line, and the YouTube description.

A photo whose licence can't be confirmed is dropped, and its scene uses the illustrated version.

## Rules used

- **OK:** public domain (pre-1900 photos; US government work; PD-India for old Indian photos), the Unsplash licence (free for commercial use, no permission needed; we credit anyway), Pexels licence, CC0, CC BY and CC BY-SA. The CC licences need an on-screen credit plus a credit in the description.
- **Not OK:** Getty, Alamy, Adobe Stock, Mary Evans, Heritage Images, museum images marked "no commercial use" (e.g. Canmore), Imperial War Museum non-commercial licence, any frame from the reference video, and any logo.
- **YouTube:** CC BY-SA is fine to use in a video when credited. Attribution goes on screen (small credit line in the photo card) **and** in the description.

## Slots

| Slot | Scene | Wanted | Best candidate | Licence (to confirm) |
|---|---|---|---|---|
| P01 | S04 title | Modern Howrah Bridge at dusk, wide | Unsplash: Paras Verma, "Howrah Bridge at dusk" ([page](https://unsplash.com/ko/%EC%82%AC%EC%A7%84/%ED%95%98%EC%9A%B0%EB%9D%BC-%EB%8B%A4%EB%A6%AC%EB%8A%94-%ED%99%A9%ED%98%BC-%EC%86%8D%EC%97%90-%EC%95%84%EB%A6%84%EB%8B%B5%EA%B2%8C-%EC%84%9C-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4-KucspYX1Ft0), id `KucspYX1Ft0`) | Unsplash licence |
| P02 | S07 | 19th-century photo of the pontoon bridge | Wikimedia Commons [Category:Howrah Pontoon Bridge](https://commons.wikimedia.org/wiki/Category:Howrah_Pontoon_Bridge): pick a pre-1900 photograph | PD (age), check each file |
| P03 | S11, X1 | Second pontoon-bridge view (crowd/side) | Same Commons category (e.g. "Howrah 1940.jpg", 709×508, which shows the old crossing just before the new bridge) | check file page |
| P04 | S59 | Close-up of girders/rivets | Commons: [Howrah Bridge from Babu ghat.JPG](https://commons.wikimedia.org/wiki/File:Howrah_Bridge_from_Babu_ghat.JPG), [Howrah Bridge-Rabindra Setu.jpg](https://commons.wikimedia.org/wiki/File:Howrah_Bridge-Rabindra_Setu.jpg), [Howrah Bridge view 01.jpg](https://commons.wikimedia.org/wiki/File:Howrah_Bridge_view_01.jpg) | usually CC BY-SA → credit |
| P05 | S61 | Night/dusk with traffic | Commons: [The Howrah Bridge, Kolkata, India.jpg](https://commons.wikimedia.org/wiki/File:The_Howrah_Bridge,_Kolkata,_India.jpg), [Howrah Bridge shot from Howrah Railway station.jpg](https://commons.wikimedia.org/wiki/File:Howrah_Bridge_shot_from_Howrah_Railway_station.jpg) | CC BY-SA → credit |
| P06 | S63 bookend | Centre of the bridge from the river | Unsplash: Avishkar Darjee (boat beside the bridge, [page](https://unsplash.com/ko/%EC%82%AC%EC%A7%84/%EB%8B%A4%EB%A6%AC-%EC%98%86-%EA%B0%95-%EC%9C%84%EC%97%90-%EB%96%A0-%EC%9E%88%EB%8A%94-%EB%B0%B0-D8ADmv1IuKY), id `D8ADmv1IuKY`) or Abhishek Chakraborty ([page](https://unsplash.com/photos/people-riding-boat-on-body-of-water-during-daytime-d2eVURGcqjc), id `d2eVURGcqjc`) | Unsplash licence |
| P07 | S58 | The bridge soon after opening | Commons: [Howrah Bridge, Calcutta in 1945.jpg](https://commons.wikimedia.org/wiki/File:Howrah_Bridge,_Calcutta_in_1945.jpg), a GI photo by Clyde Waddell. Same set: "HooglyKolkata1945.jpg", "Horse-drawn vehicles in Calcutta in 1945.jpg" | likely PD; **must confirm the tag** |

## Not found (stays illustrated)

- No free photo of the bridge **under construction (1937–1942)** turned up. The known construction photos sit with Getty, Mary Evans or museum collections that aren't free. The caissons, the arms creeping out and the meeting in the middle stay fully animated. That is also where the drawings work better than photos.

## How photos appear (style rules for the build)

- A photo-corner card (4 px cream border, soft shadow) with a slow Ken Burns move (scale 1.00 → 1.08, a 30–60 px pan). It is never shown full-bleed and static.
- It gets a colour grade per world: sepia duotone in `archive`, and a cool, slightly darkened grade in `night` so the drawn overlays stay readable.
- A credit line sits bottom-left inside the card, at 18 px, 70 % opacity: `ছবি: <author> · <licence>`.
- At most about 5 s per photo, always with drawn overlays (chips, arrows, calendar) on top, so it stays an explainer and not a slideshow.
- Match-cuts (S04, S61, S63): the drawn hero bridge is aligned to the photo's silhouette so one dissolves into the other.
