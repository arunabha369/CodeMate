import React from "react";
import { interpolate, random, useCurrentFrame } from "remotion";
import { colors } from "../theme";

/** One drawn clay diya with a living flame. `outAt` makes the flame flicker and go out (S24). */
export const Diya: React.FC<{
  x: number;
  y: number;
  size?: number;
  litAt?: number;
  outAt?: number;
  seed?: string;
}> = ({ x, y, size = 1, litAt = 0, outAt, seed = "d" }) => {
  const frame = useCurrentFrame();
  const lit = interpolate(frame, [litAt, litAt + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Going out: 24 frames of uneven flicker, then gone.
  let alive = 1;
  if (outAt !== undefined && frame >= outAt) {
    const t = frame - outAt;
    const shake = 0.55 + 0.45 * Math.sin(t * 1.9) * Math.sin(t * 0.7 + 1);
    alive = Math.max(0, interpolate(t, [0, 24], [1, 0], { extrapolateRight: "clamp" }) * shake);
  }
  const s = lit * alive;
  const wobble = 1 + 0.06 * Math.sin(frame / 3.1 + random(seed) * 9) + 0.04 * Math.sin(frame / 1.7);
  const sway = 3 * Math.sin(frame / 7 + random(seed + "s") * 5);
  const smoke =
    outAt !== undefined && frame >= outAt + 8
      ? interpolate(frame - outAt - 8, [0, 60], [0, 1], { extrapolateRight: "clamp" })
      : 0;

  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <defs>
        <radialGradient id={`glow-${seed}`}>
          <stop offset="0%" stopColor={colors.diya} stopOpacity={0.55} />
          <stop offset="100%" stopColor={colors.diya} stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`flame-${seed}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={colors.diya} />
          <stop offset="55%" stopColor="#FFC24A" />
          <stop offset="100%" stopColor="#FFF4C9" />
        </linearGradient>
        <linearGradient id={`clay-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8612B" />
          <stop offset="100%" stopColor="#6B2E12" />
        </linearGradient>
      </defs>
      <circle cx={0} cy={-46} r={120} fill={`url(#glow-${seed})`} opacity={s} />
      {/* flame */}
      <g opacity={s} transform={`translate(${sway * 0.3} 0) scale(1 ${wobble})`} style={{ transformOrigin: "0px -8px" }}>
        <path
          d={`M 0 -8 C -16 -24 -13 -52 ${sway} -78 C 13 -52 16 -24 0 -8 Z`}
          fill={`url(#flame-${seed})`}
        />
        <path d={`M 0 -10 C -6 -20 -5 -34 ${sway * 0.5} -44 C 5 -34 6 -20 0 -10 Z`} fill="#FFFBEA" opacity={0.85} />
      </g>
      {/* smoke wisp after going out */}
      {smoke > 0 ? (
        <path
          d={`M 0 -10 C 14 -40 -14 -70 6 -${100 + smoke * 80} C 18 -${140 + smoke * 80} -6 -${170 + smoke * 80} 8 -${200 + smoke * 100}`}
          fill="none"
          stroke={colors.ash}
          strokeWidth={4}
          strokeLinecap="round"
          opacity={0.5 * (1 - smoke)}
        />
      ) : null}
      {/* wick */}
      <line x1={0} y1={-2} x2={0} y2={-12} stroke="#3B1D0E" strokeWidth={3} strokeLinecap="round" />
      {/* clay lamp */}
      <path d="M -62 0 Q -58 34 0 38 Q 58 34 62 0 Q 30 10 0 6 Q -30 10 -62 0 Z" fill={`url(#clay-${seed})`} />
      <path d="M 52 2 Q 74 -6 82 -16 Q 72 6 56 10 Z" fill="#8E4219" />
      <path d="M -62 0 Q -30 10 0 6 Q 30 10 62 0" fill="none" stroke="#E3A15E" strokeWidth={2.5} opacity={0.8} />
    </g>
  );
};

/**
 * A row of diyas lighting left to right. With `count=1` and `outAt`, it is
 * the single diya that goes out (S24).
 */
export const DiyaRow: React.FC<{
  count?: number;
  y?: number;
  size?: number;
  startFrame?: number;
  staggerFrames?: number;
  outAt?: number;
  centerX?: number;
  spacing?: number;
}> = ({ count = 5, y = 900, size = 1, startFrame = 0, staggerFrames = 8, outAt, centerX = 960, spacing = 220 }) => {
  const total = (count - 1) * spacing * size;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Diya
          key={i}
          x={centerX - total / 2 + i * spacing * size}
          y={y}
          size={size}
          litAt={startFrame + i * staggerFrames}
          outAt={outAt}
          seed={`diya-${i}`}
        />
      ))}
    </svg>
  );
};
