import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { ChapterCard } from "../components/ChapterCard";
import { motion } from "../theme";

export const CARD_FRAMES = Math.round(motion.chapterCardSec * motion.fps); // 45
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
      <ChapterCard number={number} title={title} variant={variant} durationInFrames={CARD_FRAMES} />
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
