import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";
import { colors, fonts } from "../theme";
import { Chip } from "./shared";

const ID = "S59";

const In: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ position: "absolute", inset: 0, opacity: o, translate: `0px ${(1 - o) * 30}px` }}>{children}</div>;
};

/** Nandikeshwari (necklace) and Phullara at Attahas (lip) side by side; the Attahas site is disputed. */
export const S59: React.FC = () => {
  const t = sceneTiming(ID);
  const n = asset("photo-nandikeshwari");
  const f = asset("photo-fullara");
  const nAt = cue(ID, "নন্দীকেশ্বরীতে", -8);
  const fAt = cue(ID, "অট্টহাসে", -8);
  return (
    <AbsoluteFill>
      <Background variant="gold" />
      <In at={nAt}>
        <PhotoKenBurns src={n.src} label={n.label} durationInFrames={t.frames} start={nAt} box={{ x: 80, y: 130, w: 860, h: 640 }} radius={20} caption="নন্দীকেশ্বরী · সাঁইথিয়া · কণ্ঠহার" credit={n.credit || undefined} />
      </In>
      <In at={fAt}>
        <PhotoKenBurns src={f.src} label={f.label} durationInFrames={t.frames} start={fAt} box={{ x: 980, y: 130, w: 860, h: 640 }} radius={20} caption="ফুল্লরা · অট্টহাস, লাভপুর · অধর" credit={f.credit || undefined} />
      </In>
      <Chip text="অট্টহাসের স্থান নিয়ে মতভেদ আছে" at={cue(ID, "অধর", 0)} x={980} y={820} dashed font={fonts.body} size={32} color={colors.ink} border={colors.goldDeep} bgColor="rgba(247,239,221,0.95)" />
    </AbsoluteFill>
  );
};
