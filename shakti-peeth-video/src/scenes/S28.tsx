import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { CrownIcon, GoatIcon } from "../components/Icons";
import { calm } from "../lib/anim";
import { cue } from "../lib/timing";
import { colors, fonts, textHalo } from "../theme";

const ID = "S28";
const FLOOR = 760;

/** Daksha's fall shown only as his crown falling and rolling away; life returns; a goat line icon. */
export const S28: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fallAt = 6;
  const land = 32;
  const y = interpolate(frame, [fallAt, land], [240, FLOOR], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });
  const bounce = frame > land ? Math.abs(Math.sin((frame - land) / 5)) * 40 * Math.exp(-(frame - land) / 12) : 0;
  const roll = interpolate(frame, [land, land + 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const lifeAt = cue(ID, "প্রাণ ফিরিয়ে", -8);
  const goatAt = cue(ID, "ছাগলের মাথা", -10);
  const life = interpolate(frame, [lifeAt, lifeAt + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const goat = interpolate(frame, [goatAt, goatAt + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Background variant="night" red={life < 0.5} />
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 55%, rgba(227,176,75,${0.35 * life}) 0%, transparent 45%)` }} />
      <div style={{ position: "absolute", left: 860 + roll * 380, top: y - 82 - bounce, rotate: `${roll * 200}deg`, opacity: 1 - 0.5 * goat }}>
        <CrownIcon size={200} color={colors.goldDeep} fill={colors.gold} strokeWidth={2.5} />
      </div>
      <div style={{ position: "absolute", left: 960 - 130, top: 380, opacity: goat > 0 ? 1 : 0 }}>
        <GoatIcon size={260} color={colors.cream} strokeWidth={2.4} progress={goat} />
      </div>
      <div style={{ position: "absolute", left: 80, top: 80, fontFamily: fonts.heading, fontSize: 64, color: colors.gold, opacity: calm(frame, fps, 0), textShadow: textHalo(true) }}>
        দক্ষ
      </div>
    </AbsoluteFill>
  );
};
