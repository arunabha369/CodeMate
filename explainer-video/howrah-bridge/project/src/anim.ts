import {Easing, interpolate, spring} from 'remotion';
import {FPS} from './theme';

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** 0→1 progress between start and start+dur (eased). */
export const prog = (f: number, start: number, dur = 14, ease = easeOut) =>
  interpolate(f, [start, start + dur], [0, 1], {...clamp, easing: ease});

/** Standard enter style: opacity, y offset, blur. */
export const enter = (f: number, start: number, dur = 14, dy = 16, blur = 8) => {
  const p = prog(f, start, dur);
  return {opacity: p, transform: `translateY(${(1 - p) * dy}px)`, filter: p < 1 ? `blur(${(1 - p) * blur}px)` : undefined};
};

export const pop = (f: number, start: number) =>
  spring({frame: f - start, fps: FPS, config: {damping: 14, stiffness: 180, mass: 0.8}});

export const calm = (f: number, start: number, durationInFrames?: number) =>
  spring({frame: f - start, fps: FPS, config: {damping: 200, stiffness: 120, mass: 1}, durationInFrames});

/** Count-up with ease-out-expo. */
export const countUp = (f: number, start: number, to: number, dur = 40, from = 0) => {
  const p = interpolate(f, [start, start + dur], [0, 1], clamp);
  const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
  return from + (to - from) * e;
};

export const fmtIN = (n: number, decimals = 0) =>
  n.toLocaleString('en-IN', {minimumFractionDigits: decimals, maximumFractionDigits: decimals});

/** Deterministic PRNG. */
export const rng = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Construction beat: a counter that advances in steps (e.g. truss panels). Every `every` frames one more
 * unit is drawn over `draw` frames, then it holds, so each panel "lands" with its own beat.
 * Returns a float in [from, to].
 */
export const stepped = (f: number, start: number, every: number, draw: number, from: number, to: number) => {
  const t = f - start;
  if (t <= 0) return from;
  const k = Math.floor(t / every);
  const local = interpolate(t - k * every, [0, draw], [0, 1], {...clamp, easing: easeOut});
  return Math.min(to, from + k + local);
};

/** Frames (local) at which a stepped counter lands each new unit, for syncing SFX. */
export const stepFrames = (start: number, every: number, count: number) => Array.from({length: count}, (_, k) => start + k * every);
