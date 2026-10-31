import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { toBn } from "../lib/bn";
import { calm } from "../lib/anim";
import { colors, fonts, palettes, textHalo } from "../theme";
import { Alpana } from "./Alpana";
import { Background } from "./Background";
import { Diya } from "./DiyaRow";

/**
 * "অধ্যায় N" + title, আলপনা border drawing on, diya glow.
 * Starts from black (the dip-to-black before each chapter) and fades out at the end.
 */
export const ChapterCard: React.FC<{
  number: number;
  title: string;
  variant?: "night" | "red" | "gold";
  durationInFrames?: number;
  /** Frames held in black first (covers the incoming crossfade = dip to black). */
  blackFrames?: number;
}> = ({ number, title, variant = "night", durationInFrames = 45, blackFrames = 0 }) => {
  const frame = useCurrentFrame() - blackFrames;
  const { fps } = useVideoConfig();
  const bg = variant === "gold" ? "gold" : "night";
  const pal = palettes[bg];
  const fromBlack = interpolate(frame, [0, 8], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const out = interpolate(frame, [durationInFrames - blackFrames - 10, durationInFrames - blackFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s = calm(frame, fps, 4);
  const kicker = calm(frame, fps, 0);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Background variant={bg} red={variant === "red"} />
      <Alpana drawFrom={blackFrames} drawFrames={30} color={variant === "red" ? colors.sindoor : colors.gold} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: 40,
            letterSpacing: 6,
            color: variant === "red" ? colors.sindoor : pal.accent,
            opacity: kicker,
            transform: `translateY(${(1 - kicker) * 14}px)`,
            marginBottom: 18,
          }}
        >
          অধ্যায় {toBn(number)}
        </div>
        <div
          style={{
            fontFamily: fonts.heading,
            fontSize: 88,
            lineHeight: 1.25,
            color: pal.text,
            textAlign: "center",
            maxWidth: 1500,
            opacity: s,
            transform: `translateY(${(1 - s) * 26}px)`,
            textShadow: bg === "night" ? textHalo(true) : "none",
          }}
        >
          {title}
        </div>
        <svg width={260} height={30} style={{ marginTop: 26, opacity: s }}>
          <line x1={10} y1={15} x2={250} y2={15} stroke={pal.accent} strokeWidth={2} />
          <circle cx={130} cy={15} r={6} fill={colors.sindoor} />
        </svg>
      </AbsoluteFill>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <Diya x={960} y={930} size={0.8} litAt={blackFrames + 10} seed="chapter" />
      </svg>
      <AbsoluteFill style={{ backgroundColor: colors.black, opacity: fromBlack }} />
    </AbsoluteFill>
  );
};
