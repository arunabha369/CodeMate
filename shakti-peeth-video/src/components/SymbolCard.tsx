import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LotusMotif } from "./Alpana";
import { Diya } from "./DiyaRow";
import { colors } from "../theme";

/**
 * Stand-in for a peeth whose photo has no free-licence source yet: a lit diya inside a slowly
 * turning আলপনা lotus ring on a warm night ground (symbolic visuals, as the brief allows).
 * No text: the slot's own caption names the place. Scales to any box via the SVG viewBox.
 */
export const SymbolCard: React.FC<{ seed?: string }> = ({ seed = "sym" }) => {
  const frame = useCurrentFrame();
  const breathe = 0.85 + 0.15 * Math.sin(frame / 18);
  // The diya's gradient ids are built from the seed, so keep it to id-safe characters.
  const id = "sym-" + seed.replace(/[^A-Za-z0-9_-]/g, "");
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 55% 60% at 50% 58%, rgba(240,138,36,${0.32 * breathe}) 0%, rgba(122,20,32,0.28) 38%, ${colors.night0} 78%)`,
      }}
    >
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <g transform={`rotate(${frame * 0.12} 200 160)`}>
          <LotusMotif x={200} y={160} scale={2.6} color={colors.gold} fillCenter="transparent" />
        </g>
        <g opacity={0.35} transform={`rotate(${-frame * 0.08} 200 160)`}>
          <LotusMotif x={200} y={160} scale={3.6} color={colors.diya} fillCenter="transparent" />
        </g>
        <Diya x={200} y={178} size={1.25} seed={id} />
      </svg>
    </AbsoluteFill>
  );
};
