import React from "react";
import { random, useCurrentFrame } from "remotion";
import { colors } from "../theme";

/**
 * Original drawing of a Kailash-like snow peak: rounded pyramid with a snow
 * cap and face striations, flanked by darker ridges, under a moon glow.
 * `glow` (0–1) lights the summit softly (Sati / Shiva presence, no figure).
 */
export const Kailash: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  glow?: number;
  moon?: boolean;
}> = ({ x = 0, y = 0, scale = 1, glow = 0, moon = true }) => {
  const frame = useCurrentFrame();
  const pulse = 0.85 + 0.15 * Math.sin(frame / 20);
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="kSnow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CFC6D6" />
        </linearGradient>
        <linearGradient id="kRock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A2C40" />
          <stop offset="100%" stopColor="#150E18" />
        </linearGradient>
        <radialGradient id="kMoon">
          <stop offset="0%" stopColor="#FFF6DD" stopOpacity={0.9} />
          <stop offset="25%" stopColor="#FFF6DD" stopOpacity={0.25} />
          <stop offset="100%" stopColor="#FFF6DD" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="kGlow">
          <stop offset="0%" stopColor={colors.gold} stopOpacity={0.8} />
          <stop offset="100%" stopColor={colors.gold} stopOpacity={0} />
        </radialGradient>
      </defs>
      {moon ? <circle cx={1500} cy={210} r={240} fill="url(#kMoon)" /> : null}
      {moon ? <circle cx={1500} cy={210} r={46} fill="#FFF6DD" opacity={0.92} /> : null}
      <g transform={`translate(${x} ${y}) translate(960 1080) scale(${scale}) translate(-960 -1080)`}>
        {/* far ridges */}
        <path d="M -100 1080 L -100 780 L 180 640 L 360 720 L 520 600 L 700 760 L 1220 760 L 1400 610 L 1560 700 L 1760 590 L 2020 760 L 2020 1080 Z" fill="#1F1626" />
        <path d="M 230 640 L 180 640 L 260 680 Z M 1760 590 L 1720 620 L 1800 615 Z" fill="#D9D0E0" opacity={0.6} />
        {/* the peak */}
        <path d="M 600 900 L 800 600 Q 880 450 960 420 Q 1040 450 1120 600 L 1320 900 Z" fill="url(#kRock)" />
        <path d="M 790 615 Q 880 450 960 420 Q 1040 450 1130 615 L 1090 600 L 1060 640 L 1020 590 L 990 650 L 960 600 L 930 655 L 900 595 L 860 640 L 830 600 Z" fill="url(#kSnow)" />
        {/* face striations (the peak's horizontal bands and vertical gully) */}
        <path d="M 960 600 L 960 880" stroke="#D9D0E0" strokeWidth={6} opacity={0.5} />
        {[680, 740, 800].map((yy, i) => (
          <path key={i} d={`M ${860 - i * 30} ${yy} Q 960 ${yy - 12} ${1060 + i * 30} ${yy}`} stroke="#D9D0E0" strokeWidth={3} fill="none" opacity={0.35} />
        ))}
        {/* near ridges */}
        <path d="M -100 1080 L -100 900 L 260 820 L 480 900 L 700 860 L 960 940 L 1220 860 L 1460 910 L 1700 830 L 2020 900 L 2020 1080 Z" fill="#0E0911" />
        {glow > 0 ? <circle cx={960} cy={430} r={160} fill="url(#kGlow)" opacity={glow * pulse} /> : null}
        {/* sparse snow sparkle on the cap */}
        {Array.from({ length: 14 }).map((_, i) => (
          <circle
            key={i}
            cx={850 + random(`ks-x-${i}`) * 220}
            cy={470 + random(`ks-y-${i}`) * 120}
            r={1.6}
            fill="#FFFFFF"
            opacity={0.4 + 0.4 * Math.sin(frame / 9 + i)}
          />
        ))}
      </g>
    </svg>
  );
};
