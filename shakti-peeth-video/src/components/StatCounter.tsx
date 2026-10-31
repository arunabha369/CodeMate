import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { calm } from "../lib/anim";
import { toBn } from "../lib/bn";
import { BgVariant, colors, fonts, palettes } from "../theme";

/**
 * Big number counting up in Bengali numerals (০ → ৫১), or a word that springs
 * in (e.g. "লক্ষাধিক") when `text` is given instead of `value`.
 */
export const StatCounter: React.FC<{
  value?: number;
  text?: string;
  label?: string;
  start?: number;
  countFrames?: number;
  size?: number;
  color?: "sindoor" | "gold";
  bg?: BgVariant;
}> = ({ value, text, label, start = 0, countFrames = 40, size = 220, color = "sindoor", bg = "night" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = palettes[bg];
  const s = calm(frame, fps, start);
  const n =
    value === undefined
      ? 0
      : Math.round(
          interpolate(frame, [start, start + countFrames], [0, value], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }),
        );
  const c = color === "sindoor" ? colors.sindoor : bg === "night" ? colors.gold : colors.goldDeep;
  return (
    <div style={{ textAlign: "center", opacity: s, transform: `scale(${0.85 + 0.15 * s})` }}>
      <div
        style={{
          fontFamily: fonts.heading,
          fontSize: size,
          lineHeight: 1.1,
          color: c,
          textShadow: bg === "night" ? `0 0 40px ${colors.diya}55` : "none",
        }}
      >
        {text ?? toBn(n)}
      </div>
      {label ? (
        <div style={{ fontFamily: fonts.body, fontSize: 40, color: pal.text, marginTop: 6 }}>{label}</div>
      ) : null}
    </div>
  );
};
