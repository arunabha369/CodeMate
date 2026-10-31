import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { PeethMap } from "../components/PeethMap";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";
import { colors, fonts } from "../theme";
import { Chip } from "./shared";

const ID = "S46";

/** No idol: a stone with a natural spring — shown as an abstract stone and ripples. */
const StoneRipple: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: o }}>
      <circle cx={1560} cy={300} r={170} fill={colors.night0} opacity={0.82} stroke={colors.gold} strokeWidth={2} />
      {[0, 1, 2, 3].map((k) => {
        const p = ((frame - at + k * 18) % 72) / 72;
        return <ellipse key={k} cx={1560} cy={330} rx={30 + 120 * p} ry={10 + 40 * p} fill="none" stroke={colors.vishnu} strokeWidth={3} opacity={(1 - p) * 0.9} />;
      })}
      <ellipse cx={1560} cy={320} rx={56} ry={30} fill={colors.silhouette} stroke={colors.ash} strokeWidth={2} />
    </svg>
  );
};

export const S46: React.FC = () => {
  const t = sceneTiming(ID);
  const a = asset("photo-kamakhya-domes");
  return (
    <AbsoluteFill>
      <PhotoKenBurns src={a.src} label={a.label} durationInFrames={t.frames} focal={{ x: 0.5, y: 0.35 }} credit={a.credit || undefined} />
      <StoneRipple at={cue(ID, "পূজিত হয়", -6)} />
      <PeethMap box={{ x: 1460, y: 660, w: 380, h: 340 }} camera={{ lon: 88, lat: 24, zoom: 1.6 }} highlight={["kamakhya"]} labelSize={24} border />
      <Chip text="মূর্তি নেই" at={cue(ID, "মূর্তি নেই", -6)} x={90} y={110} font={fonts.heading} size={52} color={colors.cream} border={colors.gold} bgColor="rgba(10,9,16,0.78)" />
      <Chip text="প্রাকৃতিক জলধারা" at={cue(ID, "প্রাকৃতিক জলধারা", -6)} x={90} y={210} font={fonts.body} color={colors.cream} border={colors.vishnu} bgColor="rgba(10,9,16,0.78)" />
    </AbsoluteFill>
  );
};
