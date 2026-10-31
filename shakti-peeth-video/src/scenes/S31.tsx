import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { ParticleLayer } from "../components/ParticleLayer";
import { PeethMap } from "../components/PeethMap";
import { cue } from "../lib/timing";

const ID = "S31";

/** Tandava: the land shakes and light cracks run across it (damaru SFX in Film). */
export const S31: React.FC = () => {
  const at = cue(ID, "তাণ্ডব", -6);
  return (
    <AbsoluteFill>
      <Background variant="night" red />
      <PeethMap dots="none" cracksAt={cue(ID, "পদক্ষেপে", -10)} shake={{ start: at, amplitude: 9 }} />
      <ParticleLayer kind="embers" count={50} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 120, display: "flex", justifyContent: "center" }}>
        <Headline text="তাণ্ডব" highlight="তাণ্ডব" highlightColor="sindoor" start={at} size={130} />
      </div>
    </AbsoluteFill>
  );
};
