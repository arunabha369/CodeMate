import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { BrollClip } from "../components/BrollClip";
import { DiyaRow } from "../components/DiyaRow";
import { Headline } from "../components/Headline";
import { asset } from "../lib/assets";
import { cue } from "../lib/timing";
import { colors, fonts } from "../theme";
import { Chip } from "./shared";

const ID = "S66";

/** Kali Puja, Sunday 8 November: diyas light across Bengal's peeths. */
export const S66: React.FC = () => {
  const b = asset("broll-diyas");
  return (
    <AbsoluteFill>
      {b.src ? <BrollClip src={b.src} label={b.label} warm /> : <Background variant="night" />}
      {b.src ? null : <DiyaRow count={7} y={820} size={1.05} startFrame={cue(ID, "জ্বলবে প্রদীপ", -30)} staggerFrames={7} spacing={240} />}
      <div style={{ position: "absolute", left: 0, right: 0, top: 160, display: "flex", justifyContent: "center" }}>
        <Headline text="কালীপুজো" highlight="কালীপুজো" highlightColor="sindoor" size={120} start={0} />
      </div>
      <Chip text="রবিবার, ৮ নভেম্বর" at={cue(ID, "রবিবার", -6)} x={760} y={400} font={fonts.heading} size={56} color={colors.cream} border={colors.gold} bgColor="rgba(10,9,16,0.75)" />
    </AbsoluteFill>
  );
};
