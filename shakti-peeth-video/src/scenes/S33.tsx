import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { Chakra, ChakraDefs } from "../components/ChakraSpin";
import { ConchIcon } from "../components/Icons";
import { calm } from "../lib/anim";
import { cue } from "../lib/timing";
import { colors, fonts, textHalo } from "../theme";

const ID = "S33";
const TARGET = { x: 1450, y: 500 };

/** Everyone rushes to Vishnu: many small lights stream into a blue glow with conch and chakra. */
export const S33: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = calm(frame, fps, 0, 30);
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${TARGET.x}px ${TARGET.y}px, rgba(47,93,158,${0.75 * glow}) 0%, rgba(47,93,158,${0.25 * glow}) 18%, transparent 40%)` }} />
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <ChakraDefs />
        {Array.from({ length: 46 }).map((_, i) => {
          const start = Math.floor(random(`r-s-${i}`) * 50);
          const p = interpolate(frame, [start, start + 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
          const sx = random(`r-x-${i}`) * 900;
          const sy = 80 + random(`r-y-${i}`) * 920;
          const x = sx + (TARGET.x - sx) * p;
          const y = sy + (TARGET.y - sy) * p + Math.sin(p * Math.PI) * (random(`r-c-${i}`) - 0.5) * 300;
          if (p >= 1) return null;
          return <circle key={i} cx={x} cy={y} r={4 + 3 * (1 - p)} fill={i % 3 ? colors.gold : colors.cream} opacity={0.9 * (p > 0 ? 1 : 0.4)} />;
        })}
        <g transform={`translate(${TARGET.x + 90} ${TARGET.y}) scale(${0.32 * glow})`} opacity={glow}>
          <Chakra r={150} rotation={frame * 2} />
        </g>
      </svg>
      <div style={{ position: "absolute", left: TARGET.x - 170, top: TARGET.y - 70, opacity: glow }}>
        <ConchIcon size={140} color={colors.cream} strokeWidth={2.6} />
      </div>
      <div style={{ position: "absolute", left: TARGET.x - 200, width: 400, top: TARGET.y + 150, textAlign: "center", fontFamily: fonts.heading, fontSize: 78, color: colors.cream, opacity: calm(frame, fps, cue(ID, "বিষ্ণুর", -6)), textShadow: textHalo(true) }}>
        বিষ্ণু
      </div>
    </AbsoluteFill>
  );
};
