import type { BackdropSpec } from "../components/SceneBackdrop";
import { cue } from "../lib/timing";

/**
 * A real image under every motion-graphics scene (keys from src/data/assets.json; all
 * CC0/PD museum works, Commons CC BY/BY-SA photos or Pexels clips, each credited on screen).
 * Scenes not listed already show a photo/painting full-frame, or follow a brief rule:
 * S24 stays diya-only (respect rule); S29/S45–S48/S50/S57/S62 are full-photo scenes.
 * Slideshows never caption a temple: they show the peeths in general while the map or
 * graphics name places, so no photo is passed off as a different peeth.
 */
const ALL_PEETHS = ["photo-kamakhya", "photo-hinglaj", "photo-jwalamukhi", "photo-kalighat", "photo-nainativu", "photo-tarapith", "photo-tripura", "photo-guhyeshwari"];
const BENGAL = ["photo-kalighat", "photo-tarapith", "photo-bakreshwar", "photo-kankalitala", "photo-kiriteswari", "photo-bargabhima", "photo-fullara", "photo-nalhati"];

export const BACKDROPS: Record<string, BackdropSpec> = {
  // S02 is the hook's map burst: keep the photos faint so the dots and the count stay bright.
  S02: { keys: ALL_PEETHS.slice(0, 4), strength: 0.3 },
  S04: { keys: ["kalighat-pat"], position: "50% 30%" },
  // S06: the brief asked for a Sati/Parvati print here; Parvati is Sati reborn.
  S06: { keys: ["parvati-painting"], position: "50% 30%" },
  S08: { keys: ["art-shiva-devi"], position: "50% 35%" },
  S09: { keys: ["art-shiva-ascetic"], position: "60% 40%" },
  S10: { keys: ["art-yajna-fire"], position: "50% 45%" },
  S11: { keys: ["court-miniature"], position: "70% 50%" },
  S13: { keys: ["art-yajna-fire"], position: "50% 60%" },
  S14: { keys: ["broll-himalaya"] },
  S15: { keys: ["shiva-painting"], position: "50% 45%" },
  S16: { keys: ["art-divine-couple"], position: "50% 40%" },
  S17: { keys: ["art-durga-kalighat"], position: "50% 30%" },
  S18: { keys: ["art-bagalamukhi"], position: "50% 40%" },
  S20: { keys: ["art-kailash-folio"], position: "55% 50%" },
  S21: { keys: ["broll-havan"] },
  S22: { keys: ["court-miniature"], position: "40% 50%" },
  S23: { keys: ["art-yajna-fire"], position: "50% 50%" },
  S25: { keys: ["broll-storm"], strength: 0.85 },
  S26: { keys: ["broll-storm"], strength: 0.7 },
  S27: { keys: ["broll-havan"] },
  S28: { keys: ["broll-havan"] },
  S31: { keys: ["art-nataraja"], position: "50% 40%" },
  S33: { keys: ["art-vishnu-garuda"], position: "50% 40%" },
  S34: { keys: ["kalighat-pat"], position: "50% 15%" },
  S35: { keys: ALL_PEETHS.slice(2, 6) },
  S36: { keys: ["shiva-painting"], position: "50% 40%" },
  S37: { keys: ALL_PEETHS.slice(4, 8) },
  S38: { keys: ["art-annapurna-shiva"], position: "50% 35%" },
  S40: { keys: ["photo-kamakhya", "photo-jwalamukhi", "photo-tripura"] },
  S41: { keys: ["art-kailash-folio"], position: "35% 50%" },
  S42: { keys: ["photo-vishalakshi", "photo-guhyeshwari"] },
  S43: { keys: ["art-lakshmi-sarasvati"], position: "50% 30%" },
  S44: { keys: ALL_PEETHS.slice(0, 3) },
  S49: { keys: ["photo-hinglaj"] },
  S54: { keys: ["photo-chandranath"], strength: 0.55 },
  S56: { keys: BENGAL.slice(0, 4), strength: 0.5 },
  // S60: the Bahula temple while Bahula is narrated, then the Bengal kash field (no photo of Jogadya/Ujani).
  S60: { keys: ["photo-bahula", "broll-kash"], switchAt: [cue("S60", "ক্ষীরগ্রামের", -12)], strength: 0.5 },
  S65: { keys: [...ALL_PEETHS.slice(0, 3), ...BENGAL.slice(1, 3)] },
  S67: { keys: ["broll-diyas"] },
};
