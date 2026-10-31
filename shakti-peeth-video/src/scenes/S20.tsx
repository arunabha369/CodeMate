import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { Kailash } from "../components/Kailash";
import { cue, sceneTiming } from "../lib/timing";
import { colors } from "../theme";

const ID = "S20";
const PAN = 300;

/** Path of light from Kailash's summit down toward the yajna; camera follows. */
const point = (t: number): [number, number] => [960 + 760 * t + 110 * Math.sin(t * 7), 430 + (680 + PAN) * t];

export const S20: React.FC = () => {
  const frame = useCurrentFrame();
  const t = sceneTiming(ID);
  const go = cue(ID, "রওনা দিলেন", -10);
  const p = interpolate(frame, [cue(ID, "অনুমতি", -6), t.frames - 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const pan = interpolate(frame, [go, t.frames], [0, PAN], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const pts = Array.from({ length: 80 }).map((_, i) => point((i / 79) * p));
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const [hx, hy] = point(p);
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <AbsoluteFill style={{ transform: `translateY(${-pan}px)` }}>
        <Kailash glow={1} />
        <svg width={1920} height={1080 + PAN} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <defs>
            <filter id="s20blur">
              <feGaussianBlur stdDeviation={8} />
            </filter>
            <radialGradient id="s20head">
              <stop offset="0%" stopColor={colors.cream} />
              <stop offset="40%" stopColor={colors.gold} stopOpacity={0.8} />
              <stop offset="100%" stopColor={colors.gold} stopOpacity={0} />
            </radialGradient>
          </defs>
          <path d={d} fill="none" stroke={colors.gold} strokeWidth={14} opacity={0.35} filter="url(#s20blur)" />
          <path d={d} fill="none" stroke={colors.cream} strokeWidth={3} strokeLinecap="round" />
          {p > 0 ? <circle cx={hx} cy={hy} r={46} fill="url(#s20head)" /> : null}
        </svg>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 80, top: 120 }}>
        <Headline text="অবশেষে অনুমতি" highlight="অনুমতি" align="left" size={76} start={cue(ID, "অনুমতি", -6)} />
      </div>
    </AbsoluteFill>
  );
};
