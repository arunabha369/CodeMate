import React from "react";
import { AbsoluteFill } from "remotion";
import { LowerThird } from "../components/LowerThird";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { asset } from "../lib/assets";
import { sceneTiming } from "../lib/timing";

const ID = "S29";

/** Daksheswar Mahadev, Kankhal — believed by many to be the yajna site. */
export const S29: React.FC = () => {
  const t = sceneTiming(ID);
  const a = asset("photo-daksheswar");
  return (
    <AbsoluteFill>
      <PhotoKenBurns src={a.src} label={a.label} durationInFrames={t.frames} focal={{ x: 0.5, y: 0.3 }} credit={a.credit || undefined} />
      <LowerThird title="দক্ষেশ্বর মহাদেব · কনখল, হরিদ্বার" chip="অনেকের বিশ্বাস" start={10} />
    </AbsoluteFill>
  );
};
