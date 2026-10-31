import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { BrollClip } from "../components/BrollClip";
import { LowerThird } from "../components/LowerThird";
import { PeethMap } from "../components/PeethMap";
import { asset } from "../lib/assets";
import { cue } from "../lib/timing";
import { colors, fonts } from "../theme";
import { Chip } from "./shared";

const ID = "S52";

/** Three tones of water flowing together (drawn), used until Kanyakumari footage is sourced. */
const ThreeSeas: React.FC = () => {
  const frame = useCurrentFrame();
  const tones = [colors.vishnu, "#1F7A8C", colors.night1];
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      {tones.map((c, k) =>
        Array.from({ length: 4 }).map((_, j) => {
          const base = 520 + j * 140;
          const pts = Array.from({ length: 40 }).map((__, i) => {
            const x = (i / 39) * 1920;
            const pull = Math.sin((i / 39) * Math.PI); // the three bands meet in the middle
            const y = base + (k - 1) * 120 * (1 - pull) + Math.sin(i / 2.5 + frame / 14 + k * 2 + j) * 18;
            return `${i ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`;
          });
          return <path key={`${k}-${j}`} d={`${pts.join(" ")} L 1920 1080 L 0 1080 Z`} fill={c} opacity={0.22} />;
        }),
      )}
    </svg>
  );
};

/** Kanyakumari, where three seas meet; "অনেকের বিশ্বাস" (Kanyashram is disputed). */
export const S52: React.FC = () => {
  const b = asset("broll-kanyakumari");
  return (
    <AbsoluteFill>
      {b.src ? (
        <BrollClip src={b.src} label={b.label} />
      ) : (
        <>
          <Background variant="night" />
          <ThreeSeas />
        </>
      )}
      <PeethMap box={{ x: 1460, y: 80, w: 380, h: 340 }} camera={{ lon: 79, lat: 14, zoom: 1.6 }} highlight={["kanyashram"]} labelText={{ kanyashram: "কন্যাকুমারী" }} labelSize={24} showAlt={false} border />
      <Chip text="তিন সমুদ্র" at={cue(ID, "তিন সমুদ্র", -6)} x={90} y={110} font={fonts.heading} size={56} color={colors.cream} border={colors.vishnu} bgColor="rgba(10,9,16,0.78)" />
      <Chip text="অনেকের বিশ্বাস" at={cue(ID, "অনেকের বিশ্বাস", -6)} x={90} y={220} font={fonts.body} size={38} color={colors.cream} border={colors.gold} bgColor="rgba(10,9,16,0.78)" dashed />
      <LowerThird title="কন্যাকুমারী" subtitle="তামিলনাড়ু" start={10} />
    </AbsoluteFill>
  );
};
