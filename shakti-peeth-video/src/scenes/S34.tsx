import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Chakra, ChakraDefs } from "../components/ChakraSpin";
import { Headline } from "../components/Headline";
import { cue } from "../lib/timing";
import { colors } from "../theme";

const ID = "S34";
const SIL = { x: 1180, y: 520 };
const POINTS = 51;

/**
 * Sudarshana chakra flies in and circles a glowing silhouette-light (no
 * figure, nothing cut); the light dissolves into 51 points.
 */
export const S34: React.FC = () => {
  const frame = useCurrentFrame();
  const throwAt = cue(ID, "ছুড়লেন", -8);
  const dissolveAt = cue(ID, "খণ্ড খণ্ড", -6);
  const arrive = throwAt + 34;
  // flight in, then orbit
  let cx: number;
  let cy: number;
  if (frame < arrive) {
    const p = interpolate(frame, [throwAt, arrive], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
    cx = -200 + (SIL.x - 330 + 200) * p;
    cy = 280 + (SIL.y - 280) * p - Math.sin(p * Math.PI) * 120;
  } else {
    const a = Math.PI + (frame - arrive) / 9;
    cx = SIL.x + Math.cos(a) * 330;
    cy = SIL.y + Math.sin(a) * 140;
  }
  const dis = interpolate(frame, [dissolveAt, dissolveAt + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const visible = frame >= throwAt;
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <ChakraDefs />
        <defs>
          <radialGradient id="s34sil" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor={colors.cream} stopOpacity={0.95} />
            <stop offset="45%" stopColor={colors.gold} stopOpacity={0.6} />
            <stop offset="100%" stopColor={colors.gold} stopOpacity={0} />
          </radialGradient>
        </defs>
        {/* the luminous silhouette — an abstract tall light, fading as it dissolves */}
        <ellipse cx={SIL.x} cy={SIL.y} rx={110} ry={300} fill="url(#s34sil)" opacity={1 - dis} />
        {/* points of light released */}
        {Array.from({ length: POINTS }).map((_, i) => {
          const a = random(`p-a-${i}`) * Math.PI * 2;
          const rr = random(`p-r-${i}`);
          const x0 = SIL.x + Math.cos(a) * 90 * rr;
          const y0 = SIL.y + Math.sin(a) * 280 * rr;
          const x = x0 + Math.cos(a) * 260 * dis * (0.5 + rr);
          const y = y0 + Math.sin(a) * 200 * dis * (0.5 + rr) - 80 * dis;
          return <circle key={i} cx={x} cy={y} r={3.5 + 2 * random(`p-s-${i}`)} fill={colors.cream} opacity={dis} />;
        })}
        {visible ? (
          <g transform={`translate(${cx} ${cy})`}>
            <Chakra r={110} rotation={frame * 26} />
          </g>
        ) : null}
      </svg>
      <div style={{ position: "absolute", left: 80, top: 120 }}>
        <Headline text="সুদর্শন চক্র" highlight="চক্র" align="left" start={throwAt} size={84} />
      </div>
    </AbsoluteFill>
  );
};
