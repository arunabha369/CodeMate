import React from "react";
import { AbsoluteFill } from "remotion";
import { PeethMap } from "../components/PeethMap";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";
import { colors, fonts } from "../theme";
import { Chip } from "./shared";

const ID = "S47";

/** Ambubachi: temple closed three days in Ashar; then lakhs of devotees. */
export const S47: React.FC = () => {
  const t = sceneTiming(ID);
  const a = asset("photo-ambubachi");
  return (
    <AbsoluteFill>
      <PhotoKenBurns src={a.src} label={a.label} durationInFrames={t.frames} zoomOut credit={a.credit || undefined} caption="অম্বুবাচী · কামাখ্যা" />
      <PeethMap box={{ x: 1460, y: 80, w: 380, h: 340 }} camera={{ lon: 88, lat: 24, zoom: 1.6 }} highlight={["kamakhya"]} labelSize={24} border />
      <Chip text="আষাঢ় · ৩ দিন" at={cue(ID, "আষাঢ় মাসে", -6)} x={90} y={110} font={fonts.heading} size={56} color={colors.cream} border={colors.sindoor} bgColor="rgba(10,9,16,0.78)" />
      <Chip text="লক্ষ লক্ষ ভক্ত" at={cue(ID, "লক্ষ লক্ষ", -6)} x={90} y={220} font={fonts.body} size={40} color={colors.cream} border={colors.gold} bgColor="rgba(10,9,16,0.78)" />
    </AbsoluteFill>
  );
};
