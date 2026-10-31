import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { calm } from "../lib/anim";
import { BgVariant, colors, fonts, palettes, textHalo, type } from "../theme";

/**
 * Heading with one highlighted word (gold or sindoor) and an optional kicker line.
 * Positioned by the parent; renders as a block.
 */
export const Headline: React.FC<{
  text: string;
  highlight?: string;
  highlightColor?: "gold" | "sindoor";
  kicker?: string;
  kickerPosition?: "above" | "below";
  bg?: BgVariant;
  size?: number;
  align?: "left" | "center";
  start?: number;
  maxWidth?: number;
}> = ({
  text,
  highlight,
  highlightColor = "gold",
  kicker,
  kickerPosition = "below",
  bg = "night",
  size = type.heading,
  align = "center",
  start = 0,
  maxWidth = 1600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = palettes[bg];
  const s = calm(frame, fps, start);
  const k = calm(frame, fps, start + 10);
  const hl = highlightColor === "gold" ? (bg === "night" ? colors.gold : colors.goldDeep) : colors.sindoor;

  const parts = highlight && text.includes(highlight) ? text.split(highlight) : [text];
  const kickerEl = kicker ? (
    <div
      style={{
        fontFamily: fonts.body,
        fontSize: type.body,
        color: pal.subtext,
        opacity: k,
        transform: `translateY(${(1 - k) * 10}px)`,
        margin: kickerPosition === "above" ? "0 0 14px" : "18px 0 0",
      }}
    >
      {kicker}
    </div>
  ) : null;

  return (
    <div style={{ textAlign: align, maxWidth }}>
      {kickerPosition === "above" ? kickerEl : null}
      <div
        style={{
          fontFamily: fonts.heading,
          fontSize: size,
          lineHeight: 1.28,
          color: pal.text,
          opacity: s,
          transform: `translateY(${(1 - s) * 24}px)`,
          textShadow: bg === "night" ? textHalo(true) : "none",
        }}
      >
        {parts.length === 1
          ? text
          : parts.map((p, i) => (
              <React.Fragment key={i}>
                {p}
                {i < parts.length - 1 ? <span style={{ color: hl }}>{highlight}</span> : null}
              </React.Fragment>
            ))}
      </div>
      {kickerPosition === "below" ? kickerEl : null}
    </div>
  );
};
