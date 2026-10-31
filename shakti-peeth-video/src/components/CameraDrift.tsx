import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";

/**
 * Slow, continuous camera move over a whole scene (push-in + gentle drift),
 * so no frame is ever static. Direction varies per scene via `seed`.
 */
export const CameraDrift: React.FC<{ durationInFrames: number; seed: string; amount?: number; children: React.ReactNode }> = ({
  durationInFrames,
  seed,
  amount = 1,
  children,
}) => {
  const frame = useCurrentFrame();
  const dx = (random(`cam-x-${seed}`) - 0.5) * 36 * amount;
  const dy = (random(`cam-y-${seed}`) - 0.5) * 20 * amount;
  const push = random(`cam-p-${seed}`) > 0.25; // most scenes push in, some pull out
  const p = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.33, 0, 0.67, 1),
  });
  const s0 = push ? 1.0 : 1.035 * amount + (1 - amount);
  const s1 = push ? 1 + 0.035 * amount : 1.0;
  return (
    <AbsoluteFill
      style={{
        scale: s0 + (s1 - s0) * p,
        translate: `${dx * p}px ${dy * p}px`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
