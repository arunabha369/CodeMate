import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { BrollClip } from "../components/BrollClip";
import { DiyaRow } from "../components/DiyaRow";
import { MahavidyaRing } from "../components/MahavidyaRing";
import { asset } from "../lib/assets";
import { cue } from "../lib/timing";

const ID = "S19";

/** Kali, the first Mahavidya, comes to the centre; a diya glows behind. */
export const S19: React.FC = () => {
  const b = asset("broll-diya");
  return (
    <AbsoluteFill>
      {b.src ? <BrollClip src={b.src} label={b.label} legibility="full" warm /> : <Background variant="night" />}
      {b.src ? null : <DiyaRow count={1} y={1000} size={0.9} />}
      <MahavidyaRing gap={0} focusKaliAt={cue(ID, "প্রথম রূপটিই", -6)} />
    </AbsoluteFill>
  );
};
