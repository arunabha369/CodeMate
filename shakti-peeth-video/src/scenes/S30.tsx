import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { PaintingFrame } from "../components/PaintingFrame";
import { asset } from "../lib/assets";
import { sceneTiming } from "../lib/timing";
import { WithChapterCard } from "./shared";

const ID = "S30";

/** অধ্যায় ৫. The Met's Kalighat painting again, moving slowly from bottom to top. */
export const S30: React.FC = () => {
  const t = sceneTiming(ID);
  const art = asset("met-2000-313");
  return (
    <WithChapterCard number={5} title="প্রলয়নৃত্য">
      <AbsoluteFill>
        <Background variant="parchment" />
        <PaintingFrame src={art.src} label={art.label} credit={art.credit} durationInFrames={t.frames} box={{ x: 590, y: 50, w: 740, h: 920 }} move="up" />
      </AbsoluteFill>
    </WithChapterCard>
  );
};
