import { interpolate, spring } from "remotion";
import { motion } from "../theme";

/** Calm spring used everywhere (damping ~200, per the brief). */
export const calm = (frame: number, fps: number, start = 0, durationInFrames?: number) =>
  spring({ frame: frame - start, fps, config: { damping: motion.springDamping }, durationInFrames });

export const fadeIn = (frame: number, start: number, len = 12) =>
  interpolate(frame, [start, start + len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

export const fadeOut = (frame: number, end: number, len = 12) =>
  interpolate(frame, [end - len, end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

/** Split Bengali text into words for word-by-word reveals (never splits a conjunct). */
export const words = (s: string) => s.split(/\s+/).filter(Boolean);
