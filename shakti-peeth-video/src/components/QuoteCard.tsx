import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { calm, words } from "../lib/anim";
import { BgVariant, colors, fonts, palettes, textHalo } from "../theme";

/** Large Tiro Bangla quote with gold quote marks; reveals word by word. */
export const QuoteCard: React.FC<{
  text: string;
  attribution?: string;
  start?: number;
  wordStagger?: number;
  bg?: BgVariant;
  size?: number;
}> = ({ text, attribution, start = 0, wordStagger = 4, bg = "night", size = 76 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = palettes[bg];
  const ws = words(text);
  const marks = calm(frame, fps, start);
  const attrAt = start + ws.length * wordStagger + 8;
  const attr = calm(frame, fps, attrAt);
  const markColor = bg === "night" ? colors.gold : colors.goldDeep;
  return (
    <div style={{ position: "relative", maxWidth: 1440, padding: "40px 110px", textAlign: "center" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: -40,
          fontFamily: fonts.heading,
          fontSize: 220,
          color: markColor,
          opacity: 0.85 * marks,
          lineHeight: 1,
        }}
      >
        “
      </div>
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: -130,
          fontFamily: fonts.heading,
          fontSize: 220,
          color: markColor,
          opacity: 0.85 * marks,
          lineHeight: 1,
        }}
      >
        ”
      </div>
      <div
        style={{
          fontFamily: fonts.heading,
          fontSize: size,
          lineHeight: 1.4,
          color: pal.text,
          textShadow: bg === "night" ? textHalo(true) : "none",
        }}
      >
        {ws.map((w, i) => {
          const o = interpolate(frame, [start + i * wordStagger, start + i * wordStagger + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <span key={i} style={{ opacity: o, display: "inline-block", transform: `translateY(${(1 - o) * 12}px)` }}>
              {w}
              {i < ws.length - 1 ? " " : ""}
            </span>
          );
        })}
      </div>
      {attribution ? (
        <div style={{ fontFamily: fonts.body, fontSize: 38, color: markColor, marginTop: 26, opacity: attr }}>
          — {attribution}
        </div>
      ) : null}
    </div>
  );
};
