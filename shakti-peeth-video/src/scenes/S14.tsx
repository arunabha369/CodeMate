import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Kailash } from "../components/Kailash";
import { cue } from "../lib/timing";
import { colors, fonts, textHalo } from "../theme";

const ID = "S14";
const STREAKS = 10;

/** From Kailash, Sati watches lights crossing the sky toward her father's house. */
export const S14: React.FC = () => {
  const frame = useCurrentFrame();
  const start = cue(ID, "আকাশপথে", -10);
  const far = interpolate(frame, [start, start + 90], [0.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Background variant="night" diyaGlow={false} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 22% 18% at 92% 76%, rgba(240,138,36,${0.55 * far}) 0%, transparent 70%)` }} />
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="s14streak" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={colors.gold} stopOpacity={0} />
            <stop offset="100%" stopColor={colors.cream} stopOpacity={1} />
          </linearGradient>
        </defs>
        {Array.from({ length: STREAKS }).map((_, i) => {
          const t0 = start + i * 9;
          const t = frame - t0;
          const life = 70;
          if (t < 0 || t > life) return null;
          const p = t / life;
          const sx = 260 + random(`s14x-${i}`) * 500;
          const sy = 160 + random(`s14y-${i}`) * 260;
          const ex = 1760;
          const ey = 780;
          const hx = sx + (ex - sx) * p;
          const hy = sy + (ey - sy) * p * p;
          const len = 180;
          const ang = Math.atan2(ey - sy, ex - sx);
          const a = Math.sin(p * Math.PI);
          return (
            <line key={i} x1={hx - Math.cos(ang) * len} y1={hy - Math.sin(ang) * len * 0.4} x2={hx} y2={hy} stroke="url(#s14streak)" strokeWidth={3} strokeLinecap="round" opacity={a} />
          );
        })}
      </svg>
      <Kailash x={-560} y={0} scale={0.65} glow={0.8} />
      <div style={{ position: "absolute", left: 400 - 150, width: 300, top: 520, textAlign: "center", fontFamily: fonts.heading, fontSize: 54, color: colors.cream, textShadow: textHalo(true) }}>
        কৈলাস
      </div>
    </AbsoluteFill>
  );
};
