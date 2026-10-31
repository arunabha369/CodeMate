import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { PeethMap } from "../components/PeethMap";
import { cue, sceneTiming } from "../lib/timing";

const ID = "S35";

/** 51 points of light fall onto the map and land one by one (chimes in Film). */
export const S35: React.FC = () => {
  const t = sceneTiming(ID);
  const perDot = Math.max(2, Math.min(5, Math.floor((t.frames - 70) / 51)));
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <PeethMap rainIn={{ start: 8, perDot }} showNote showTray />
      <div style={{ position: "absolute", left: 80, top: 110 }}>
        <Headline text="কোথাও অঙ্গ, কোথাও অলংকার" highlight="অলংকার" align="left" size={60} start={cue(ID, "কোথাও পড়ল", -6)} />
      </div>
    </AbsoluteFill>
  );
};
