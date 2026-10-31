import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { ParticleLayer } from "../components/ParticleLayer";
import { PeethMap } from "../components/PeethMap";
import { StatCounter } from "../components/StatCounter";
import { cue } from "../lib/timing";

const ID = "S02";

/** All 51 dots twinkle in; ০ → ৫১ counter on the left. */
export const S02: React.FC = () => (
  <AbsoluteFill>
    <Background variant="night" />
    <ParticleLayer kind="embers" count={26} opacity={0.5} />
    <PeethMap camera={{ lon: 73.5, lat: 22.5, zoom: 1 }} rainIn={{ start: 4, perDot: 2, fall: 0 }} showNote showTray />
    <div style={{ position: "absolute", left: 110, top: 560, width: 460 }}>
      <StatCounter value={51} label="পবিত্র স্থান" start={cue(ID, "একান্নটা", -12)} countFrames={45} />
    </div>
  </AbsoluteFill>
);
