import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { FamilyLinks } from "../components/FamilyLinks";
import { PaintingFrame } from "../components/PaintingFrame";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";

const ID = "S06";

/** দক্ষ → সতী; "দাক্ষায়ণী" appears under her name. */
export const S06: React.FC = () => {
  const t = sceneTiming(ID);
  const art = asset("ravi-varma-sati");
  return (
    <AbsoluteFill>
      <Background variant="parchment" />
      <FamilyLinks
        nodes={[
          { label: "ব্রহ্মা", at: 0 },
          { label: "দক্ষ", sub: "প্রজাপতি", at: 0 },
          { label: "সতী", sub: "দাক্ষায়ণী", at: cue(ID, "কন্যা সতী", -4), subAt: cue(ID, "দাক্ষায়ণী", -4) },
        ]}
        x={560}
        top={210}
        step={290}
      />
      <PaintingFrame src={art.src} label={art.label} credit={art.credit} durationInFrames={t.frames} box={{ x: 1000, y: 110, w: 800, h: 800 }} />
    </AbsoluteFill>
  );
};
