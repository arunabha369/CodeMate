import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Warm light-leak overlay. Drawn with CSS gradients (screen blend) instead of
 * @remotion/effects' WebGL lightLeak(): this container has no GPU, and the
 * WebGL2-capable renderer (swangle) made the whole film ~3x slower to render.
 * Grows to `peak` and recedes over the sequence's duration.
 */
export const LightLeak: React.FC<{ seed?: number; hueShift?: number; opacity?: number; peak?: number }> = ({
  seed = 0,
  hueShift = 0,
  opacity = 0.85,
  peak = 1,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames / 2, durationInFrames - 1], [0, peak, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const r = (k: string) => random(`leak-${seed}-${k}`);
  const fromLeft = r("side") > 0.5;
  const x1 = fromLeft ? -10 + 40 * p : 110 - 40 * p;
  const y1 = 20 + r("y") * 50;
  const x2 = fromLeft ? 10 + 30 * p : 90 - 30 * p;
  const y2 = 60 + r("y2") * 30;
  return (
    <AbsoluteFill style={{ opacity: opacity * Math.min(1, p * 2.2), mixBlendMode: "screen", filter: `hue-rotate(${hueShift}deg)`, pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse ${40 + 50 * p}% ${50 + 40 * p}% at ${x1}% ${y1}%, rgba(255,190,90,0.95) 0%, rgba(240,138,36,0.55) 35%, transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse ${25 + 30 * p}% ${30 + 30 * p}% at ${x2}% ${y2}%, rgba(255,120,60,0.8) 0%, rgba(193,18,31,0.35) 45%, transparent 75%)`,
        }}
      />
    </AbsoluteFill>
  );
};
