import React from "react";
import { AbsoluteFill } from "remotion";
import { LowerThird } from "../components/LowerThird";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";
import { colors, fonts } from "../theme";
import { Chip } from "./shared";

const ID = "S62";

/** Tarapith: not in every old list; a Siddhapeeth, Bamakhyapa's sadhana ground. */
export const S62: React.FC = () => {
  const t = sceneTiming(ID);
  const a = asset("photo-tarapith");
  return (
    <AbsoluteFill>
      <PhotoKenBurns src={a.src} label={a.label} durationInFrames={t.frames} focal={{ x: 0.5, y: 0.35 }} credit={a.credit || undefined} />
      <Chip text="সব প্রাচীন তালিকায় নেই" at={cue(ID, "নাম নেই", -6)} x={90} y={110} dashed font={fonts.body} size={38} color={colors.cream} border={colors.gold} bgColor="rgba(10,9,16,0.78)" />
      <Chip text="নয়নের তারা · প্রচলিত বিশ্বাস" at={cue(ID, "নয়নের তারা", -6)} x={90} y={210} font={fonts.body} size={38} color={colors.cream} border={colors.sindoor} bgColor="rgba(10,9,16,0.78)" />
      <LowerThird title="তারাপীঠ — সিদ্ধপীঠ" subtitle="বামাখ্যাপার সাধনক্ষেত্র · বীরভূম" start={cue(ID, "সিদ্ধপীঠ", -20)} />
    </AbsoluteFill>
  );
};
