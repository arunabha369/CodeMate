import React from "react";
import { AbsoluteFill, random, staticFile, useCurrentFrame } from "remotion";

/**
 * Whole-film finishing layer: soft warm vignette + moving film grain.
 * Cheap (one tiled PNG), so it can sit over every frame.
 */
export const FilmFinish: React.FC<{ grain?: number; vignette?: number }> = ({ grain = 0.07, vignette = 0.55 }) => {
  const frame = useCurrentFrame();
  const ox = Math.floor(random(`gx-${frame}`) * 512);
  const oy = Math.floor(random(`gy-${frame}`) * 512);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 78% 72% at 50% 48%, transparent 58%, rgba(8,4,6,${vignette}) 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `url(${staticFile("textures/grain.png")})`,
          backgroundPosition: `${ox}px ${oy}px`,
          opacity: grain,
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};
