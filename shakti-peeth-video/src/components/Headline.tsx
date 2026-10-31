import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
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
  const k = calm(frame, fps, start + 14);
  const hl = highlightColor === "gold" ? (bg === "night" ? colors.gold : colors.goldDeep) : colors.sindoor;

  const ws = text.split(/\s+/).filter(Boolean);
  const stagger = 4;
  const word = (w: string, i: number) => {
    const o = interpolate(frame, [start + i * stagger, start + i * stagger + 16], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    const inner =
      highlight && w.includes(highlight) ? (
        <>
          {w.split(highlight)[0]}
          <span style={{ color: hl }}>{highlight}</span>
          {w.split(highlight).slice(1).join(highlight)}
        </>
      ) : (
        w
      );
    return (
      <span
        key={i}
        style={{
          display: "inline-block",
          opacity: o,
          filter: `blur(${(1 - o) * 10}px)`,
          translate: `0px ${(1 - o) * 22}px`,
        }}
      >
        {inner}
        {i < ws.length - 1 ? "\u00A0" : ""}
      </span>
    );
  };
  const kickerEl = kicker ? (
    <div
      style={{
        fontFamily: fonts.body,
        fontSize: type.body,
        color: pal.subtext,
        opacity: k,
        translate: `0px ${(1 - k) * 10}px`,
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
          textShadow: bg === "night" ? textHalo(true) : "none",
        }}
      >
        {ws.map(word)}
      </div>
      {kickerPosition === "below" ? kickerEl : null}
    </div>
  );
};
