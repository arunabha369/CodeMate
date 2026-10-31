import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { BgVariant, colors, fonts, palettes } from "../theme";
import { Box } from "./PhotoKenBurns";
import { MediaPlaceholder } from "./MediaPlaceholder";

/** Fine animated grain for paintings (light, per the brief). */
const Grain: React.FC<{ w: number; h: number }> = ({ w, h }) => {
  const frame = useCurrentFrame();
  const id = `grain-${frame % 6}`;
  return (
    <svg width={w} height={h} style={{ position: "absolute", inset: 0, opacity: 0.12, mixBlendMode: "overlay" }}>
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} seed={frame % 6} />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
};

/**
 * Museum painting in a parchment mat with a thin deep-red border, gentle
 * Ken Burns + parallax, and a small credit line (e.g. "সৌজন্য: The Met, Public Domain").
 * Ken Burns direction: "in" zooms toward the focal point; "up" pans from bottom to top (S30).
 */
export const PaintingFrame: React.FC<{
  src?: string;
  label: string;
  credit: string;
  durationInFrames: number;
  box?: Box;
  focal?: { x: number; y: number };
  move?: "in" | "up";
  start?: number;
  /** Scene background, so the credit line stays readable. */
  bg?: BgVariant;
}> = ({
  src,
  label,
  credit,
  durationInFrames,
  box = { x: 460, y: 70, w: 1000, h: 860 },
  focal = { x: 0.5, y: 0.35 },
  move = "in",
  start = 0,
  bg = "parchment",
}) => {
  const frame = useCurrentFrame() - start;
  const p = interpolate(frame, [0, durationInFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const appear = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const mat = 30;
  const innerW = box.w - mat * 2;
  const innerH = box.h - mat * 2;
  const scale = move === "up" ? 1.12 : 1 + 0.06 * p;
  const panY = move === "up" ? interpolate(p, [0, 1], [innerH * 0.05, -innerH * 0.05]) : 0;
  // Parallax: the mat drifts a little less than the painting inside it.
  const drift = (p - 0.5) * 10;
  return (
    <div
      style={{
        position: "absolute",
        left: box.x,
        top: box.y,
        width: box.w,
        height: box.h + 44,
        opacity: appear,
        transform: `translateY(${drift * 0.5 + (1 - appear) * 20}px)`,
      }}
    >
      <div
        style={{
          width: box.w,
          height: box.h,
          padding: mat,
          boxSizing: "border-box",
          background: colors.parchment,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 0 40px rgba(122,20,32,0.18)",
          borderRadius: 4,
        }}
      >
        <div
          style={{
            position: "relative",
            width: innerW,
            height: innerH,
            overflow: "hidden",
            outline: `3px solid ${colors.parchmentBorder}`,
            outlineOffset: 6,
            background: colors.parchmentDark,
          }}
        >
          {src ? (
            <Img
              src={staticFile(src)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transform: `translate(0px, ${panY + drift}px) scale(${scale})`,
                transformOrigin: `${focal.x * 100}% ${focal.y * 100}%`,
              }}
            />
          ) : (
            <MediaPlaceholder kind="চিত্রকলা" label={label} />
          )}
          <Grain w={innerW} h={innerH} />
        </div>
      </div>
      <div style={{ fontFamily: fonts.body, fontSize: 20, color: palettes[bg].subtext, marginTop: 12, textAlign: "right" }}>
        {credit}
      </div>
    </div>
  );
};
