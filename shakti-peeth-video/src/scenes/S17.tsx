import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { cue } from "../lib/timing";
import { colors, fonts } from "../theme";
import { SourceKicker } from "./shared";

const ID = "S17";
export const RING = { x: 960, y: 520, r: 320 };

/** Mahabhagavata: Sati's fierce form; ten lights appear in every direction. */
export const S17: React.FC = () => {
  const frame = useCurrentFrame();
  const flashAt = cue(ID, "ভয়ংকর রূপ", -4);
  const lightsAt = cue(ID, "যেদিকে তাকান", -6);
  const dark = interpolate(frame, [0, 30], [0, 0.55], { extrapolateRight: "clamp" });
  const flash = interpolate(frame, [flashAt, flashAt + 6, flashAt + 40], [0, 0.85, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Background variant="night" diyaGlow={false} />
      <AbsoluteFill style={{ backgroundColor: colors.black, opacity: dark }} />
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 48%, ${colors.sindoor} 0%, transparent 60%)`, opacity: flash }} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 48%, ${colors.jaba} 0%, transparent 32%)`,
          // Faint from the start, building into the flash, then a steady breathing aura.
          opacity: interpolate(frame, [0, flashAt, flashAt + 40], [0.06, 0.2, 0.45], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * (0.75 + 0.25 * Math.sin(frame / 12)),
        }}
      />
      <SourceKicker text="মহাভাগবত পুরাণ" color={colors.gold} font={fonts.body} />
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="s17gold">
            <stop offset="0%" stopColor={colors.cream} />
            <stop offset="35%" stopColor={colors.gold} stopOpacity={0.85} />
            <stop offset="100%" stopColor={colors.gold} stopOpacity={0} />
          </radialGradient>
          <radialGradient id="s17red">
            <stop offset="0%" stopColor={colors.cream} />
            <stop offset="35%" stopColor={colors.sindoor} stopOpacity={0.9} />
            <stop offset="100%" stopColor={colors.sindoor} stopOpacity={0} />
          </radialGradient>
        </defs>
        {Array.from({ length: 10 }).map((_, i) => {
          const ang = -Math.PI / 2 + (i / 10) * Math.PI * 2;
          const at = lightsAt + i * 5;
          const s = interpolate(frame, [at, at + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const tw = 0.85 + 0.15 * Math.sin(frame / 6 + i);
          return (
            <circle key={i} cx={RING.x + Math.cos(ang) * RING.r} cy={RING.y + Math.sin(ang) * RING.r} r={60 * s * tw} fill={i === 0 ? "url(#s17red)" : "url(#s17gold)"} />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
