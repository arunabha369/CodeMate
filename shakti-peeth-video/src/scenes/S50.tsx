import React from "react";
import { AbsoluteFill } from "remotion";
import { LowerThird } from "../components/LowerThird";
import { PeethMap } from "../components/PeethMap";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { YajnaFire } from "../components/YajnaFire";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";
import { colors, fonts } from "../theme";
import { Chip } from "./shared";

const ID = "S50";

/** Jwalamukhi: the tongue; no idol — the flames from the rock are worshipped. */
export const S50: React.FC = () => {
  const t = sceneTiming(ID);
  const a = asset("photo-jwalamukhi");
  return (
    <AbsoluteFill>
      <PhotoKenBurns src={a.src} label={a.label} durationInFrames={t.frames} focal={{ x: 0.5, y: 0.4 }} credit={a.credit || undefined} />
      <YajnaFire x={1640} y={540} scale={0.38} outline={false} />
      <PeethMap box={{ x: 1460, y: 620, w: 380, h: 340 }} camera={{ lon: 79, lat: 26, zoom: 1.6 }} highlight={["jwalamukhi"]} labelSize={24} border />
      <Chip text="জিভ" at={cue(ID, "জিভ", -6)} x={90} y={110} font={fonts.heading} size={56} color={colors.cream} border={colors.sindoor} bgColor="rgba(10,9,16,0.78)" />
      <Chip text="মূর্তি নেই · শিখাই মা" at={cue(ID, "শিখাকেই", -6)} x={90} y={220} font={fonts.body} size={40} color={colors.cream} border={colors.gold} bgColor="rgba(10,9,16,0.78)" />
      <LowerThird title="জ্বালামুখী · কাংড়া" subtitle="হিমাচল প্রদেশ" start={12} />
    </AbsoluteFill>
  );
};
