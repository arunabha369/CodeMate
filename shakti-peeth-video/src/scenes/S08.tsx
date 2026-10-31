import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { DiyaRow } from "../components/DiyaRow";
import { Headline } from "../components/Headline";
import { ParticleLayer } from "../components/ParticleLayer";
import { cue } from "../lib/timing";
import { colors } from "../theme";

const ID = "S08";

/** Two lights drift together and become a pair of diyas. */
export const S08: React.FC = () => {
  const frame = useCurrentFrame();
  const meet = cue(ID, "স্বামী হিসেবে");
  const p = interpolate(frame, [0, meet], [0, 1], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.sin) });
  const leftX = -60 + (880 - -60) * p;
  const rightX = 1980 + (1040 - 1980) * p;
  const glowsOut = interpolate(frame, [meet, meet + 14], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = 640 + Math.sin(frame / 14) * 10;
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <ParticleLayer kind="embers" count={20} opacity={0.5} />
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: glowsOut }}>
        <defs>
          <radialGradient id="s08a">
            <stop offset="0%" stopColor={colors.cream} />
            <stop offset="30%" stopColor={colors.sindoor} stopOpacity={0.8} />
            <stop offset="100%" stopColor={colors.sindoor} stopOpacity={0} />
          </radialGradient>
          <radialGradient id="s08b">
            <stop offset="0%" stopColor={colors.cream} />
            <stop offset="30%" stopColor={colors.gold} stopOpacity={0.8} />
            <stop offset="100%" stopColor={colors.gold} stopOpacity={0} />
          </radialGradient>
        </defs>
        <circle cx={leftX} cy={y} r={70} fill="url(#s08a)" />
        <circle cx={rightX} cy={y - 6} r={70} fill="url(#s08b)" />
      </svg>
      <DiyaRow count={2} y={720} size={1.15} startFrame={meet - 4} staggerFrames={6} spacing={180} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 200, display: "flex", justifyContent: "center" }}>
        <Headline text="তপস্যা" highlight="তপস্যা" start={cue(ID, "কঠোর তপস্যা", -4)} size={110} />
      </div>
    </AbsoluteFill>
  );
};
