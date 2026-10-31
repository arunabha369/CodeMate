import React from "react";
import { random, useCurrentFrame } from "remotion";
import { colors } from "../theme";

/**
 * Drawn yajna-kunda (stepped square fire altar) with living flames.
 * `intensity` scales the flames; `burst` (0–1) throws them outward (S27).
 */
export const YajnaFire: React.FC<{ x?: number; y?: number; scale?: number; intensity?: number; outline?: boolean }> = ({
  x = 960,
  y = 820,
  scale = 1,
  intensity = 1,
  outline = true,
}) => {
  const frame = useCurrentFrame();
  const flames = 9;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="yfFlame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={colors.sindoor} />
          <stop offset="40%" stopColor={colors.diya} />
          <stop offset="80%" stopColor="#FFC94D" />
          <stop offset="100%" stopColor="#FFF3C4" />
        </linearGradient>
        <radialGradient id="yfGlow">
          <stop offset="0%" stopColor={colors.diya} stopOpacity={0.55} />
          <stop offset="100%" stopColor={colors.diya} stopOpacity={0} />
        </radialGradient>
      </defs>
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <ellipse cx={0} cy={-120} rx={420} ry={300} fill="url(#yfGlow)" opacity={0.8 * intensity} />
        {Array.from({ length: flames }).map((_, i) => {
          const fx = (i - (flames - 1) / 2) * 34;
          const h = (150 + random(`yf-h-${i}`) * 120) * intensity * (1 - Math.abs(fx) / 260);
          const sway = 10 * Math.sin(frame / (5 + (i % 3)) + i);
          const flick = 1 + 0.12 * Math.sin(frame / 2.3 + i * 1.7);
          const top = -h * flick;
          return (
            <path
              key={i}
              d={`M ${fx - 28} 0 C ${fx - 30} ${top * 0.45} ${fx + sway - 6} ${top * 0.7} ${fx + sway} ${top} C ${fx + sway + 6} ${top * 0.7} ${fx + 30} ${top * 0.45} ${fx + 28} 0 Z`}
              fill="url(#yfFlame)"
              opacity={0.9}
            />
          );
        })}
        {outline ? (
          <g fill="none" stroke={colors.gold} strokeWidth={4} strokeLinejoin="round">
            <path d="M -230 0 L 230 0 L 200 40 L -200 40 Z" fill="#2A160E" />
            <path d="M -200 40 L 200 40 L 170 80 L -170 80 Z" fill="#20110B" />
            <path d="M -170 80 L 170 80 L 140 120 L -140 120 Z" fill="#170C08" />
          </g>
        ) : null}
      </g>
    </svg>
  );
};
