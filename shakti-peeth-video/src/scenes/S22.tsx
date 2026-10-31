import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { cue } from "../lib/timing";
import { colors } from "../theme";

const ID = "S22";

const Wave: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const amp = interpolate(frame, [at - 20, at + 20], [8, 150], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pts = Array.from({ length: 64 }).map((_, i) => {
    const x = 120 + (i / 63) * 1680;
    const env = Math.sin((i / 63) * Math.PI);
    const y = 520 + (random(`w-${i}-${Math.floor(frame / 2)}`) - 0.5) * 2 * amp * env;
    return `${i ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <filter id="s22glow">
          <feGaussianBlur stdDeviation={6} />
        </filter>
      </defs>
      <path d={pts.join(" ")} fill="none" stroke={colors.sindoor} strokeWidth={10} opacity={0.45} filter="url(#s22glow)" />
      <path d={pts.join(" ")} fill="none" stroke={colors.jaba} strokeWidth={3.5} strokeLinejoin="miter" />
    </svg>
  );
};

/** Daksha's insult as a jagged red sound wave over a muted crowd. */
export const S22: React.FC = () => {
  const at = cue(ID, "শিবনিন্দা", -8);
  return (
    <AbsoluteFill>
      <Background variant="night" red />
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: 0.85 }}>
        {Array.from({ length: 22 }).map((_, i) => {
          const x = 40 + i * 88 + (i % 2) * 20;
          const h = 70 + (i % 3) * 18;
          return (
            <g key={i} fill={colors.silhouette}>
              <circle cx={x} cy={1080 - h - 24} r={22} />
              <rect x={x - 32} y={1080 - h} width={64} height={h} rx={26} />
            </g>
          );
        })}
      </svg>
      <Wave at={at} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", justifyContent: "center" }}>
        <Headline text="শিবনিন্দা" highlight="শিবনিন্দা" highlightColor="sindoor" start={at} size={100} />
      </div>
    </AbsoluteFill>
  );
};
