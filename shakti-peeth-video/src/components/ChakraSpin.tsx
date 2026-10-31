import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";

/** Original drawn Sudarshana chakra: toothed rim, rings, twelve spokes, hub.
 * Needs the `chakraGold` gradient in the same SVG (see ChakraDefs). */
export const Chakra: React.FC<{ r: number; rotation: number; opacity?: number }> = ({ r, rotation, opacity = 1 }) => {
  const teeth = 24;
  const rimOuter = r;
  const rimInner = r * 0.78;
  const toothPath = Array.from({ length: teeth })
    .map((_, i) => {
      const a0 = (i / teeth) * Math.PI * 2;
      const a1 = a0 + (Math.PI * 2) / teeth / 2;
      const a2 = a0 + (Math.PI * 2) / teeth;
      const p = (ang: number, rad: number) => `${(Math.cos(ang) * rad).toFixed(2)} ${(Math.sin(ang) * rad).toFixed(2)}`;
      return `${i === 0 ? "M" : "L"} ${p(a0, rimInner + r * 0.08)} L ${p(a1 - 0.04, rimOuter)} L ${p(a2, rimInner + r * 0.08)}`;
    })
    .join(" ");
  return (
    <g transform={`rotate(${rotation})`} opacity={opacity}>
      <path d={`${toothPath} Z`} fill="url(#chakraGold)" stroke={colors.goldDeep} strokeWidth={2} />
      <circle r={rimInner} fill="none" stroke={colors.goldDeep} strokeWidth={r * 0.06} />
      <circle r={rimInner * 0.92} fill="none" stroke="#FFE7A3" strokeWidth={2} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={Math.cos(a) * r * 0.2}
            y1={Math.sin(a) * r * 0.2}
            x2={Math.cos(a) * rimInner * 0.9}
            y2={Math.sin(a) * rimInner * 0.9}
            stroke="url(#chakraGold)"
            strokeWidth={r * 0.05}
            strokeLinecap="round"
          />
        );
      })}
      <circle r={r * 0.22} fill="url(#chakraGold)" stroke={colors.goldDeep} strokeWidth={2} />
      <circle r={r * 0.09} fill={colors.sindoor} />
    </g>
  );
};

export const ChakraDefs: React.FC = () => (
  <defs>
    <radialGradient id="chakraGold">
      <stop offset="0%" stopColor="#FFF1B8" />
      <stop offset="60%" stopColor={colors.gold} />
      <stop offset="100%" stopColor={colors.goldDeep} />
    </radialGradient>
  </defs>
);

/**
 * The chakra flies in spinning with a motion-blur trail and a light streak,
 * then hovers spinning at `to`.
 */
export const ChakraSpin: React.FC<{
  from?: { x: number; y: number };
  to?: { x: number; y: number };
  start?: number;
  flyFrames?: number;
  radius?: number;
}> = ({ from = { x: -200, y: 260 }, to = { x: 960, y: 520 }, start = 0, flyFrames = 36, radius = 150 }) => {
  const frame = useCurrentFrame() - start;
  if (frame < 0) return null;
  const pos = (f: number) => {
    const t = interpolate(f, [0, flyFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
    // Gentle arc
    const x = from.x + (to.x - from.x) * t;
    const y = from.y + (to.y - from.y) * t - Math.sin(t * Math.PI) * 120;
    return { x, y, t };
  };
  const rotAt = (f: number) => f * 26;
  const now = pos(frame);
  const trail = [1, 2, 3, 4, 5].map((k) => ({ ...pos(frame - k * 1.5), rot: rotAt(frame - k * 1.5), o: 0.28 - k * 0.045 }));
  const streakPts = Array.from({ length: 16 }).map((_, k) => pos(frame - k * 2.5));
  const streak = streakPts.map((p, i) => `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const settled = now.t >= 1;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="chakraGold">
          <stop offset="0%" stopColor="#FFF1B8" />
          <stop offset="60%" stopColor={colors.gold} />
          <stop offset="100%" stopColor={colors.goldDeep} />
        </radialGradient>
        <radialGradient id="chakraHalo">
          <stop offset="0%" stopColor={colors.gold} stopOpacity={0.5} />
          <stop offset="100%" stopColor={colors.gold} stopOpacity={0} />
        </radialGradient>
        <filter id="streakBlur">
          <feGaussianBlur stdDeviation={6} />
        </filter>
      </defs>
      {!settled ? <path d={streak} fill="none" stroke={colors.gold} strokeWidth={radius * 0.5} strokeLinecap="round" opacity={0.25} filter="url(#streakBlur)" /> : null}
      <circle cx={now.x} cy={now.y} r={radius * 1.9} fill="url(#chakraHalo)" />
      {trail.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <Chakra r={radius} rotation={p.rot} opacity={Math.max(0, p.o)} />
        </g>
      ))}
      <g transform={`translate(${now.x} ${now.y})`}>
        <Chakra r={radius} rotation={rotAt(frame)} />
      </g>
    </svg>
  );
};
