import React from "react";
import { AbsoluteFill } from "remotion";
import { LowerThird } from "../components/LowerThird";
import { PaintingFrame } from "../components/PaintingFrame";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";

const ID = "S57";

/** Kalighat on the Adi Ganga; Shakti Kalika, Bhairava Nakuleshwar; a Kalighat pat inset if sourced. */
export const S57: React.FC = () => {
  const t = sceneTiming(ID);
  const photo = asset("photo-kalighat");
  const pat = asset("kalighat-pat");
  return (
    <AbsoluteFill>
      <PhotoKenBurns src={photo.src} label={photo.label} durationInFrames={t.frames} focal={{ x: 0.5, y: 0.35 }} credit={photo.credit || undefined} />
      {pat.src ? (
        <PaintingFrame src={pat.src} label={pat.label} credit={pat.credit} bg="night" durationInFrames={t.frames} box={{ x: 1440, y: 90, w: 400, h: 520 }} start={cue(ID, "আদিগঙ্গার", 0)} />
      ) : null}
      <LowerThird title="কালীঘাট · কলকাতা" subtitle="শক্তি কালিকা · ভৈরব নকুলেশ্বর" chip="আদিগঙ্গার তীর" start={cue(ID, "কালীঘাট", -10)} />
    </AbsoluteFill>
  );
};
