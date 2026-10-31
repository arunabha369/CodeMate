import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { BgVariant, colors } from "../theme";
import { LotusMotif } from "./Alpana";

const Stars: React.FC<{ count?: number; seed?: string }> = ({ count = 160, seed = "stars" }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      {Array.from({ length: count }).map((_, i) => {
        const x = random(`${seed}-x-${i}`) * 1920;
        const y = random(`${seed}-y-${i}`) * 1080 * 0.85;
        const r = 0.6 + random(`${seed}-r-${i}`) * 1.6;
        const phase = random(`${seed}-p-${i}`) * Math.PI * 2;
        const tw = 0.35 + 0.35 * Math.sin(frame / (18 + (i % 7) * 4) + phase);
        return <circle key={i} cx={x} cy={y} r={r} fill={colors.cream} opacity={Math.max(0.08, tw)} />;
      })}
    </svg>
  );
};

/** Paper-fibre texture from SVG turbulence (no external image needed). */
const Fibre: React.FC<{ opacity?: number }> = ({ opacity = 0.35 }) => (
  <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity, mixBlendMode: "multiply" }}>
    <filter id="fibre">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.18" numOctaves={3} seed={7} />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0.45  0 0 0 0 0.34  0 0 0 0 0.2  0 0 0 0.55 0"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#fibre)" />
  </svg>
);

export const Background: React.FC<{
  variant: BgVariant;
  /** Deep-red night variant for chapters ৪–৫. */
  red?: boolean;
  stars?: boolean;
  diyaGlow?: boolean;
}> = ({ variant, red = false, stars = true, diyaGlow = true }) => {
  if (variant === "night") {
    const top = colors.night0;
    const bottom = red ? colors.nightRed : colors.night1;
    return (
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)` }}>
        {stars ? <Stars /> : null}
        {diyaGlow ? (
          <AbsoluteFill
            style={{
              background: `radial-gradient(ellipse 60% 38% at 50% 108%, ${red ? "rgba(193,18,31,0.32)" : "rgba(240,138,36,0.22)"} 0%, transparent 70%)`,
            }}
          />
        ) : null}
      </AbsoluteFill>
    );
  }
  if (variant === "parchment") {
    return (
      <AbsoluteFill style={{ backgroundColor: colors.parchment }}>
        <Fibre />
        <AbsoluteFill
          style={{
            background: "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 55%, rgba(122,20,32,0.22) 100%)",
          }}
        />
      </AbsoluteFill>
    );
  }
  // gold
  return (
    <AbsoluteFill style={{ backgroundColor: colors.ivory }}>
      <Fibre opacity={0.16} />
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(255,255,255,0.55) 0%, transparent 70%)",
        }}
      />
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: 0.32 }}>
        <LotusMotif x={0} y={0} scale={3.2} color={colors.gold} fillCenter={colors.gold} />
        <LotusMotif x={1920} y={1080} scale={3.2} color={colors.gold} fillCenter={colors.gold} />
      </svg>
    </AbsoluteFill>
  );
};
