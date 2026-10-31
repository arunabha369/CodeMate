import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { PaintingFrame } from "../components/PaintingFrame";
import { ParticleLayer } from "../components/ParticleLayer";
import { calm } from "../lib/anim";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";
import { colors, fonts, textHalo } from "../theme";
import { SourceKicker } from "./shared";

const ID = "S26";

/** A towering abstract flame-form (no figure), rising from the ground. */
const Form: React.FC<{ x: number; rise: number; hue: "gold" | "red"; seed: number }> = ({ x, rise, hue, seed }) => {
  const frame = useCurrentFrame();
  const h = 680 * rise;
  const w = 150;
  const base = 860;
  const wob = (k: number) => 14 * Math.sin(frame / 7 + k + seed);
  const d = `M ${x - w} ${base} C ${x - w - 30} ${base - h * 0.4} ${x - w * 0.4 + wob(1)} ${base - h * 0.75} ${x + wob(2)} ${base - h} C ${x + w * 0.4 + wob(3)} ${base - h * 0.75} ${x + w + 30} ${base - h * 0.4} ${x + w} ${base} Z`;
  const id = `s26-${hue}`;
  const ch = h * (0.62 + 0.04 * Math.sin(frame / 4 + seed));
  const core = `M ${x - w * 0.45} ${base} C ${x - w * 0.5} ${base - ch * 0.5} ${x + wob(7) * 0.5} ${base - ch * 0.8} ${x + wob(8)} ${base - ch} C ${x + wob(9) * 0.5} ${base - ch * 0.8} ${x + w * 0.5} ${base - ch * 0.5} ${x + w * 0.45} ${base} Z`;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={hue === "gold" ? colors.diya : colors.nightRed} />
          <stop offset="55%" stopColor={hue === "gold" ? colors.gold : colors.sindoor} />
          <stop offset="100%" stopColor={hue === "gold" ? colors.cream : colors.jaba} stopOpacity={0.9} />
        </linearGradient>
        <filter id={`${id}-blur`}>
          <feGaussianBlur stdDeviation={18} />
        </filter>
        <filter id={`${id}-soft`}>
          <feGaussianBlur stdDeviation={10} />
        </filter>
      </defs>
      <path d={d} fill={`url(#${id})`} opacity={0.55} filter={`url(#${id}-blur)`} />
      <path d={d} fill={`url(#${id})`} opacity={0.85} />
      {/* inner flickering core and tongues, so the form reads as living fire, not a cone */}
      <path d={core} fill={hue === "gold" ? colors.cream : colors.diya} opacity={0.55} filter={`url(#${id}-soft)`} />
      {[-0.55, 0.5].map((k, j) => (
        <path
          key={j}
          d={`M ${x + k * w * 0.6} ${base - h * 0.35} C ${x + k * w * 0.9} ${base - h * 0.55} ${x + k * w * 0.3 + wob(5 + j)} ${base - h * 0.7} ${x + k * w * 0.5 + wob(6 + j)} ${base - h * (0.82 + 0.05 * Math.sin(frame / 5 + j))}`}
          fill="none"
          stroke={hue === "gold" ? colors.cream : colors.diya}
          strokeWidth={6}
          strokeLinecap="round"
          opacity={0.5}
        />
      ))}
    </svg>
  );
};

/** Popular tradition: Virabhadra and Bhadrakali arise — as two towering glowing forms. */
export const S26: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = sceneTiming(ID);
  const vAt = cue(ID, "বীরভদ্র", -14);
  const bAt = cue(ID, "ভদ্রকালী", -14);
  const art = asset("virabhadra-painting");
  // Ground glow from the first frame (continuing S25's impact), swelling as the forms rise.
  const glowIn = interpolate(frame, [0, vAt, vAt + 30], [0.35, 0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * (0.85 + 0.15 * Math.sin(frame / 7));
  return (
    <AbsoluteFill>
      <Background variant="night" red />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 50% 40% at 50% 80%, rgba(240,138,36,${0.35 * glowIn}) 0%, transparent 70%)` }} />
      <Form x={art.src ? 760 : 700} rise={calm(frame, fps, vAt, 40)} hue="gold" seed={1} />
      <Form x={art.src ? 1120 : 1220} rise={calm(frame, fps, bAt, 40)} hue="red" seed={4} />
      <ParticleLayer kind="embers" count={60} />
      {[
        ["বীরভদ্র", art.src ? 760 : 700, vAt],
        ["ভদ্রকালী", art.src ? 1120 : 1220, bAt],
      ].map(([name, x, at]) => (
        <div key={name as string} style={{ position: "absolute", left: (x as number) - 200, width: 400, top: 880, textAlign: "center", fontFamily: fonts.heading, fontSize: 64, color: name === "ভদ্রকালী" ? colors.jaba : colors.gold, opacity: calm(frame, fps, (at as number) + 16), textShadow: textHalo(true) }}>
          {name as string}
        </div>
      ))}
      {art.src ? (
        <PaintingFrame src={art.src} label={art.label} credit={art.credit} bg="night" durationInFrames={t.frames} box={{ x: 1440, y: 160, w: 400, h: 520 }} start={vAt + 20} />
      ) : null}
      <SourceKicker text="প্রচলিত কাহিনি অনুযায়ী" color={colors.gold} font={fonts.body} />
    </AbsoluteFill>
  );
};
