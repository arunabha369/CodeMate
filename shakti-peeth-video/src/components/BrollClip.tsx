import React from "react";
import { AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";
import { MediaPlaceholder } from "./MediaPlaceholder";

/**
 * Atmosphere B-roll (muted). Never labelled as a specific peeth unless it is one.
 * `trimStart` is in frames into the source clip.
 */
export const BrollClip: React.FC<{
  src?: string;
  label: string;
  trimStart?: number;
  warm?: boolean;
  legibility?: "bottom" | "full" | "none";
  vignette?: "red" | "dark" | "none";
  vignetteStrength?: number;
}> = ({ src, label, trimStart = 0, warm = false, legibility = "bottom", vignette = "none", vignetteStrength = 1 }) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: appear }}>
      {src ? (
        <OffthreadVideo
          src={staticFile(src)}
          trimBefore={trimStart}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: warm ? "sepia(0.25) saturate(1.15) brightness(0.92)" : undefined,
          }}
        />
      ) : (
        <MediaPlaceholder kind="ভিডিও" label={label} />
      )}
      {legibility !== "none" ? (
        <AbsoluteFill
          style={{
            background:
              legibility === "full"
                ? "rgba(10,9,16,0.45)"
                : "linear-gradient(180deg, rgba(10,9,16,0.25) 0%, transparent 35%, rgba(10,9,16,0.75) 100%)",
          }}
        />
      ) : null}
      {vignette !== "none" ? (
        <AbsoluteFill
          style={{
            opacity: vignetteStrength,
            background: `radial-gradient(ellipse 70% 65% at 50% 50%, transparent 45%, ${vignette === "red" ? "rgba(193,18,31,0.55)" : "rgba(0,0,0,0.65)"} 100%)`,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
