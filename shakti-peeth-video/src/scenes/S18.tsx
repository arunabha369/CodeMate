import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { MAHAVIDYAS, MahavidyaRing } from "../components/MahavidyaRing";
import { cue } from "../lib/timing";

const ID = "S18";

/** The ten Mahavidyas, each name appearing as it is spoken. */
export const S18: React.FC = () => (
  <AbsoluteFill>
    <Background variant="night" />
    <MahavidyaRing revealAt={MAHAVIDYAS.map((n) => cue(ID, n, -4))} titleAt={cue(ID, "এই হল দশ মহাবিদ্যা", -4)} />
  </AbsoluteFill>
);
