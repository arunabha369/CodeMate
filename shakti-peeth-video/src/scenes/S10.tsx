import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { calm } from "../lib/anim";
import { cue } from "../lib/timing";
import { colors, fonts, textHalo } from "../theme";
import { SourceKicker } from "./shared";

const ID = "S10";
const COUNT = 11;
const BRAHMA = 3;
const SHIVA = 8;
const BASE = 820;

/** A simple seated/standing figure — no face, no detail. `rise` 0 = seated, 1 = standing. */
const Figure: React.FC<{ x: number; rise: number; glow?: number; tone?: string }> = ({ x, rise, glow = 0, tone = colors.silhouette }) => {
  const h = 110 + 85 * rise;
  const headY = BASE - h - 34;
  return (
    <g>
      {glow > 0 ? <circle cx={x} cy={BASE - h / 2 - 20} r={130} fill="url(#s10glow)" opacity={glow} /> : null}
      <circle cx={x} cy={headY} r={28} fill={tone} />
      <path d={`M ${x - 40} ${BASE} L ${x - 40} ${BASE - h + 26} Q ${x - 40} ${BASE - h} ${x - 14} ${BASE - h} L ${x + 14} ${BASE - h} Q ${x + 40} ${BASE - h} ${x + 40} ${BASE - h + 26} L ${x + 40} ${BASE} Z`} fill={tone} />
      <path d={`M ${x - 40} ${BASE - h + 26} Q ${x - 40} ${BASE - h} ${x - 14} ${BASE - h} L ${x + 14} ${BASE - h} Q ${x + 40} ${BASE - h} ${x + 40} ${BASE - h + 26}`} fill="none" stroke={colors.gold} strokeWidth={1.5} opacity={0.5} />
    </g>
  );
};

/** Bhagavata: everyone rises for Daksha except Brahma and Shiva. */
export const S10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = cue(ID, "দক্ষ ঢুকতেই", -6);
  const riseAt = cue(ID, "উঠে দাঁড়ালেন", -8);
  const namesAt = cue(ID, "শুধু ব্রহ্মা", -4);
  const shivaAt = cue(ID, "কিন্তু জামাই শিব", -4);
  const dx = interpolate(calm(frame, fps, enter), [0, 1], [-120, 190]);
  const xs = Array.from({ length: COUNT }).map((_, i) => 420 + i * 120);
  const shivaGlow = interpolate(frame, [shivaAt, shivaAt + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const names = calm(frame, fps, namesAt);
  const q = calm(frame, fps, shivaAt + 10);
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <SourceKicker text="ভাগবত পুরাণ" color={colors.gold} font={fonts.body} />
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="s10glow">
            <stop offset="0%" stopColor={colors.gold} stopOpacity={0.55} />
            <stop offset="100%" stopColor={colors.gold} stopOpacity={0} />
          </radialGradient>
        </defs>
        <line x1={300} y1={BASE + 2} x2={1820} y2={BASE + 2} stroke={colors.gold} strokeWidth={2} opacity={0.4} />
        {xs.map((x, i) => {
          const seated = i === BRAHMA || i === SHIVA;
          const rise = seated ? 0 : calm(frame, fps, riseAt + i * 2);
          return <Figure key={i} x={x} rise={rise} glow={i === SHIVA ? shivaGlow : 0} />;
        })}
        {/* Daksha enters from the left, standing, in gold */}
        <Figure x={dx} rise={1} tone={colors.goldDeep} />
      </svg>
      <div style={{ position: "absolute", left: dx - 100, width: 200, top: BASE + 20, textAlign: "center", fontFamily: fonts.heading, fontSize: 44, color: colors.gold, textShadow: textHalo(true) }}>
        দক্ষ
      </div>
      {[BRAHMA, SHIVA].map((i) => (
        <div key={i} style={{ position: "absolute", left: xs[i] - 110, width: 220, top: BASE + 20, textAlign: "center", fontFamily: fonts.heading, fontSize: 44, color: i === SHIVA ? colors.gold : colors.cream, opacity: names, textShadow: textHalo(true) }}>
          {i === SHIVA ? "শিব" : "ব্রহ্মা"}
        </div>
      ))}
      <div style={{ position: "absolute", left: xs[SHIVA] - 60, width: 120, top: 470, textAlign: "center", fontFamily: fonts.heading, fontSize: 120, color: colors.sindoor, opacity: q, transform: `scale(${0.7 + 0.3 * q})` }}>
        ?
      </div>
    </AbsoluteFill>
  );
};
