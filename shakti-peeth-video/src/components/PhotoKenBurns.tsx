import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";
import { colors, fonts, motion } from "../theme";
import { SymbolCard } from "./SymbolCard";

export type Box = { x: number; y: number; w: number; h: number };

/**
 * Photo with Ken Burns (1.00 → 1.08 plus a slight pan toward a focal point).
 * `src` is a path under public/ (e.g. "photos/kalighat.jpg", or a .mp4 clip); without it a
 * symbolic diya card is shown. Optional caption and credit line.
 */
export const PhotoKenBurns: React.FC<{
  src?: string;
  label: string;
  durationInFrames: number;
  focal?: { x: number; y: number };
  box?: Box;
  radius?: number;
  caption?: string;
  credit?: string;
  start?: number;
  zoomOut?: boolean;
  /** CSS object-position for the crop, e.g. "50% 15%" to keep the top of a tall subject. */
  position?: string;
}> = ({ src, label, durationInFrames, focal = { x: 0.5, y: 0.45 }, box, radius = 0, caption, credit, start = 0, zoomOut = false, position }) => {
  const frame = useCurrentFrame() - start;
  const p = interpolate(frame, [0, durationInFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const [a, b] = zoomOut ? [motion.kenBurnsTo, motion.kenBurnsFrom] : [motion.kenBurnsFrom, motion.kenBurnsTo];
  const scale = a + (b - a) * p;
  // Pan: drift the focal point toward the frame centre as we zoom.
  const panX = (0.5 - focal.x) * 40 * p;
  const panY = (0.5 - focal.y) * 40 * p;
  const appear = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const frameStyle: React.CSSProperties = box
    ? { position: "absolute", left: box.x, top: box.y, width: box.w, height: box.h }
    : { position: "absolute", inset: 0 };
  return (
    <div style={{ ...frameStyle, overflow: "hidden", borderRadius: radius, opacity: appear, boxShadow: box ? "0 18px 50px rgba(0,0,0,0.55)" : undefined }}>
      {src && /\.(mp4|webm|mov)$/i.test(src) ? (
        // A licensed video clip in a photo slot: plays muted, with the same Ken Burns move.
        <OffthreadVideo
          src={staticFile(src)}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: position,
            transform: `translate(${panX}px, ${panY}px) scale(${scale})`,
            transformOrigin: `${focal.x * 100}% ${focal.y * 100}%`,
          }}
        />
      ) : src ? (
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: position,
            transform: `translate(${panX}px, ${panY}px) scale(${scale})`,
            transformOrigin: `${focal.x * 100}% ${focal.y * 100}%`,
          }}
        />
      ) : (
        // No free-licence photo yet: a symbolic diya card (ASSETS.md lists what is still missing).
        <SymbolCard seed={label} />
      )}
      {caption || credit ? (
        <AbsoluteFill
          style={{
            background: "linear-gradient(180deg, transparent 60%, rgba(10,9,16,0.82) 100%)",
            justifyContent: "flex-end",
            padding: box ? "0 22px 16px" : "0 80px 60px",
          }}
        >
          {caption ? (
            <div style={{ fontFamily: fonts.heading, fontSize: box ? 34 : 50, color: colors.cream }}>{caption}</div>
          ) : null}
          {credit ? (
            <div style={{ fontFamily: fonts.body, fontSize: 18, color: colors.muted, marginTop: 4 }}>{credit}</div>
          ) : null}
        </AbsoluteFill>
      ) : null}
    </div>
  );
};
