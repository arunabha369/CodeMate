import React, { createContext, useContext } from "react";
import { AbsoluteFill, Img, OffthreadVideo, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { asset } from "../lib/assets";
import { BgVariant, colors, fonts } from "../theme";

/**
 * A real photo, painting or clip under a scene's motion graphics (src/data/backdrops.ts).
 * Film.tsx provides the spec per scene; Background renders it between its base colour and its
 * stars/bokeh, toned to the variant so every overlay stays readable:
 *   night  → the image dimmed under a dark gradient and vignette
 *   parchment / gold → a faded, sepia "print" multiplied into the paper
 * Several keys make a slow crossfading slideshow. Each image carries its credit, bottom right.
 */
export type BackdropSpec = {
  keys: string[];
  /** CSS object-position, e.g. "50% 20%". */
  position?: string;
  /** 0–1, how strongly the image shows (default by variant). */
  strength?: number;
  /** Set where an overlay already fills the bottom-right corner. */
  creditLeft?: boolean;
};

export const BackdropContext = createContext<BackdropSpec | null>(null);
export const useBackdrop = () => useContext(BackdropContext);

const XFADE = 18;

const Layer: React.FC<{ k: string; i: number; from: number; len: number; total: number; position?: string; light: boolean; creditLeft?: boolean; part: "image" | "credit" }> = ({
  k,
  i,
  from,
  len,
  total,
  position,
  light,
  creditLeft,
  part,
}) => {
  const frame = useCurrentFrame();
  const a = asset(k);
  if (!a.src) return null;
  const local = frame - from;
  const fadeIn = i === 0 ? 1 : interpolate(local, [0, XFADE], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = i === total - 1 ? 1 : interpolate(local, [len, len + XFADE], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const o = Math.min(fadeIn, fadeOut);
  if (o <= 0) return null;
  // Slow Ken Burns: alternate push-in / pull-out and drift direction per image.
  const p = interpolate(local, [0, len + XFADE], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoomIn = i % 2 === 0;
  const scale = zoomIn ? 1.04 + 0.08 * p : 1.12 - 0.08 * p;
  const dx = (i % 3 === 1 ? -1 : 1) * 18 * (p - 0.5);
  const style: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: position,
    transform: `translateX(${dx}px) scale(${scale})`,
    filter: light ? "sepia(0.55) saturate(0.8) contrast(0.95)" : "saturate(0.9) brightness(0.85)",
  };
  return (
    <AbsoluteFill style={{ opacity: o }}>
      {part === "image" ? (/\.(mp4|webm|mov)$/i.test(a.src) ? <OffthreadVideo src={staticFile(a.src)} muted style={style} /> : <Img src={staticFile(a.src)} style={style} />) : null}
      {part === "credit" && a.credit ? (
        <div
          style={{
            position: "absolute",
            [creditLeft ? "left" : "right"]: 30,
            bottom: 16,
            fontFamily: fonts.body,
            fontSize: 16,
            color: light ? "#5E4E3A" : colors.muted,
            opacity: 0.9,
            textShadow: light ? "none" : "0 1px 3px rgba(0,0,0,0.9)",
          }}
        >
          {a.credit}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

export const SceneBackdrop: React.FC<{ variant: BgVariant; red?: boolean }> = ({ variant, red }) => {
  const spec = useBackdrop();
  const { durationInFrames } = useVideoConfig();
  if (!spec || spec.keys.length === 0) return null;
  const light = variant !== "night";
  const n = spec.keys.length;
  const len = Math.max(30, Math.floor(durationInFrames / n));
  const strength = spec.strength ?? (light ? 0.3 : 0.62);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: strength, mixBlendMode: light ? "multiply" : "normal" }}>
        {spec.keys.map((k, i) => (
          <Layer key={k + i} k={k} i={i} from={i * len} len={len} total={n} position={spec.position} light={light} part="image" />
        ))}
      </AbsoluteFill>
      {light ? (
        // Keep the centre of the paper bright so cards and text read cleanly.
        <AbsoluteFill style={{ background: "radial-gradient(ellipse 62% 58% at 50% 48%, rgba(255,250,238,0.55) 0%, rgba(255,250,238,0.18) 60%, transparent 100%)" }} />
      ) : (
        <AbsoluteFill
          style={{
            background: `linear-gradient(180deg, rgba(10,9,16,0.5) 0%, rgba(10,9,16,0.22) 42%, ${red ? "rgba(60,8,14,0.7)" : "rgba(10,9,16,0.72)"} 100%), radial-gradient(ellipse 80% 75% at 50% 50%, transparent 55%, rgba(5,4,8,0.7) 100%)`,
          }}
        />
      )}
      {spec.keys.map((k, i) => (
        <Layer key={"c" + k + i} k={k} i={i} from={i * len} len={len} total={n} light={light} creditLeft={spec.creditLeft} part="credit" />
      ))}
    </AbsoluteFill>
  );
};
