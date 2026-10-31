import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { PeethMap } from "../components/PeethMap";
import { cue } from "../lib/timing";
import { layout } from "../theme";

const ID = "S37";

/** Every dot becomes a tirtha: dots morph into small temple icons; "সতীপীঠ = শক্তিপীঠ". */
export const S37: React.FC = () => (
  <AbsoluteFill>
    <Background variant="night" />
    <PeethMap box={{ x: 700, y: 0, w: 1220, h: 1080 }} templesAt={cue(ID, "পবিত্র তীর্থ", -6)} showNote />
    <AbsoluteFill style={{ justifyContent: "center", paddingLeft: layout.safe }}>
      <Headline text="সতীপীঠ = শক্তিপীঠ" highlight="শক্তিপীঠ" align="left" maxWidth={640} size={84} start={cue(ID, "সতীপীঠ, বা", -8)} />
    </AbsoluteFill>
  </AbsoluteFill>
);
