import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { FamilyLinks } from "../components/FamilyLinks";
import { PaintingFrame } from "../components/PaintingFrame";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";
import { CONTENT_FROM, WithChapterCard } from "./shared";

const ID = "S05";
const c = (phrase: string, o = 0) => cue(ID, phrase, o) - CONTENT_FROM;

/** অধ্যায় ১. Court miniature + ব্রহ্মা → দক্ষ. */
export const S05: React.FC = () => {
  const t = sceneTiming(ID);
  const art = asset("court-miniature");
  return (
    <WithChapterCard number={1} title="দক্ষের মেয়ে সতী">
      <AbsoluteFill>
        <Background variant="parchment" />
        <PaintingFrame src={art.src} label={art.label} credit={art.credit} durationInFrames={t.frames} box={{ x: 120, y: 100, w: 1000, h: 800 }} />
        <FamilyLinks
          nodes={[
            { label: "ব্রহ্মা", at: c("ব্রহ্মার", -6) },
            { label: "দক্ষ", sub: "প্রজাপতি", at: c("প্রজাপতি দক্ষ", -4) },
          ]}
          x={1500}
          top={330}
          step={290}
        />
      </AbsoluteFill>
    </WithChapterCard>
  );
};
