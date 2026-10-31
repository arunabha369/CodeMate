import React from "react";
import { cue, sceneTiming } from "../lib/timing";
import { MapStop } from "./MapStop";

const ID = "S48";

/** Hinglaj, a cave by the Hingol river, Balochistan. */
export const S48: React.FC = () => (
  <MapStop
    peeth="hinglaj"
    label="হিংলাজ"
    zoom={4}
    flyEnd={cue(ID, "বালুচিস্তানে", 4)}
    photoKey="photo-hinglaj"
    photoAt={cue(ID, "হিঙ্গোল নদীর", -4)}
    durationInFrames={sceneTiming(ID).frames}
    title="হিংলাজ · হিঙ্গোল নদী, বালুচিস্তান"
    subtitle="পাকিস্তান"
    chip={{ text: "ব্রহ্মরন্ধ্র", at: cue(ID, "ব্রহ্মরন্ধ্র", -6) }}
  />
);
