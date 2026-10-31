# script_changes.md — proposed narration changes

This lists only the lines I want to change. Every other line stays word for word (see facts.md). Each change is no more than a few words, so the timing barely moves.

---

## 1. S24 — wrong text cited (CONFLICT)

**Now:**
> কালিকা পুরাণ বলে, সেখানেই যোগবলে দেহত্যাগ করলেন সতী। স্তব্ধ হয়ে গেল গোটা যজ্ঞস্থল।

**Proposed:**
> ভাগবত পুরাণ বলে, সেখানেই যোগবলে দেহত্যাগ করলেন সতী। স্তব্ধ হয়ে গেল গোটা যজ্ঞস্থল।

**Why:** The Wikipedia article on Sati says the Kalika Purana doesn't have Sati go to the yajna at all. The version where she gives up her body by yoga at the yajna (sitting facing north, through the fire of meditation) is in the Bhagavata Purana, 4.4.24–27. That also fits S10, which already cites the Bhagavata. Only the source name changes. The visual (one diya going out) stays the same.

---

## 2. S41 — 64 attributed to the Brahmanda Purana (CONFLICT)

**Now:**
> পীঠনির্ণয় তন্ত্রে একান্ন। বাংলার এক প্রচলিত মতে বাহান্ন। ব্রহ্মাণ্ড পুরাণে চৌষট্টি। আর দেবীভাগবত পুরাণে একশো আট।

**Proposed:**
> পীঠনির্ণয় তন্ত্রে একান্ন। বাংলার এক প্রচলিত মতে বাহান্ন। কোনও মতে চৌষট্টি। আর দেবীভাগবত পুরাণে একশো আট।

**Why:** The 64 is popularly linked to the Brahmanda Purana, but at least one edition of that Purana doesn't mention 64 and gives 51 instead. Leaving the text unnamed keeps the number without making a claim we can't support. The CountCard label for ৬৪ becomes "অন্য মত".

---

## 3. S52 — Kanyakumari and the back (CONFLICT)

**Now:**
> একেবারে দক্ষিণে কন্যাকুমারী, যেখানে মিলেছে তিন সমুদ্র। এখানে পড়েছিল সতীর পিঠ।

**Proposed:**
> একেবারে দক্ষিণে কন্যাকুমারী, যেখানে মিলেছে তিন সমুদ্র। অনেকের বিশ্বাস, এখানে পড়েছিল সতীর পিঠ।

**Why:** The back belongs to the Kanyashram peeth (Shakti Sarvani, Bhairava Nimisha). Most sources place Kanyashram at Kanyakumari. D.C. Sircar, though, places it at Kumarikunda, Sitakunda, in Bangladesh, and the fact sheet counts Kanyashram among Banglapedia's 7 Bangladesh peeths, which S54 then mentions. Stated flatly, the two lines contradict each other. "অনেকের বিশ্বাস" keeps the story and removes the contradiction. In peeths.json, Kanyashram is marked "disputed": its dot is at Kanyakumari, with Kumarikunda listed as the alternative location.

---

## 4. S67 — channel name (filled in)

**Now:** `…ফলো করুন CHANNEL_NAME। জয় মা।`

**New narration (on screen and captions):**
> আপনি কোন কোন সতীপীঠে গেছেন? কমেন্টে লিখুন। আর এমন আরও গল্প শুনতে ফলো করুন The Bong Mindset। জয় মা।

**ttsText:** `…ফলো করুন দ্য বং মাইন্ডসেট। জয় মা।`

**Why:** You gave the channel name. On screen it stays in English, as you wrote it. The TTS copy spells it in Bengali letters, because the Bengali voice can stumble over English words mid-sentence. If you record S67 yourself, the TTS copy doesn't matter.

**Phase 8 teaser end card:** "পুরো কাহিনি দেখুন The Bong Mindset-এ"

---

## Not changing, but noted for you

* **S56 "চোদ্দোটা":** Banglapedia gives 14 West Bengal peeths, and the narration stays as it is. The draft peeths.json only has 13 West Bengal entries so far, though. Before the S56 "১৪" counter goes on screen, the 14th has to be identified from the Banglapedia table, which this session can't open yet.
* **S18 order:** The Mahavidya names are in the common order, which is slightly different from the Mahabhagavata's own order. Kali is first in both, and the line doesn't claim an order.
