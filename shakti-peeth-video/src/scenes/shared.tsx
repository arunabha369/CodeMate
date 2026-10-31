import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { ChapterCard } from "../components/ChapterCard";
import { LightLeak } from "../components/LightLeak";
import { motion } from "../theme";

/** Frames the card spends in black while the previous scene crossfades out (dip to black). */
export const CARD_BLACK = motion.crossfadeFrames; // 18
export const CARD_FRAMES = Math.round(motion.chapterCardSec * motion.fps) + CARD_BLACK; // 63
/** Content starts under the card so the card can fade straight into it. */
export const CONTENT_FROM = CARD_FRAMES - 12;

/** Chapter-opening scene: ChapterCard for 1.5 s, content underneath from CONTENT_FROM. */
export const WithChapterCard: React.FC<{
  number: number;
  title: string;
  variant?: "night" | "red" | "gold";
  children: React.ReactNode;
}> = ({ number, title, variant = "night", children }) => (
  <AbsoluteFill>
    <Sequence from={CONTENT_FROM} layout="absolute-fill">
      {children}
    </Sequence>
    <Sequence durationInFrames={CARD_FRAMES} layout="absolute-fill">
      <ChapterCard number={number} title={title} variant={variant} durationInFrames={CARD_FRAMES} blackFrames={CARD_BLACK} />
    </Sequence>
    <Sequence from={CARD_BLACK - 2} durationInFrames={44} layout="absolute-fill">
      <LightLeak seed={number} hueShift={variant === "red" ? 340 : 0} opacity={0.4} peak={0.3} />
    </Sequence>
  </AbsoluteFill>
);

/** Fades its children in at `at` (and optionally out at `until`). */
export const FadeAt: React.FC<{ at: number; until?: number; len?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  at,
  until,
  len = 12,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const i = interpolate(frame, [at, at + len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const o = until === undefined ? 1 : interpolate(frame, [until - len, until], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ position: "absolute", inset: 0, opacity: Math.min(i, o), ...style }}>{children}</div>;
};

/** Small source kicker, top-left (e.g. "ভাগবত পুরাণ"). */
export const SourceKicker: React.FC<{ text: string; color: string; font: string; at?: number }> = ({ text, color, font, at = 0 }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 80, top: 70, fontFamily: font, fontSize: 34, letterSpacing: 2, color, opacity: o }}>
      {text}
    </div>
  );
};

/** Small rounded text chip (e.g. "আষাঢ় · ৩ দিন", "অনেকের বিশ্বাস"). */
export const Chip: React.FC<{
  text: string;
  at: number;
  x: number;
  y: number;
  dark?: boolean;
  dashed?: boolean;
  size?: number;
  font: string;
  color: string;
  border: string;
  bgColor: string;
}> = ({ text, at, x, y, dashed = false, size = 34, font, color, border, bgColor }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        padding: "10px 26px 12px",
        borderRadius: 999,
        border: `2px ${dashed ? "dashed" : "solid"} ${border}`,
        background: bgColor,
        fontFamily: font,
        fontSize: size,
        color,
        opacity: o,
        scale: 0.85 + 0.15 * o,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};
