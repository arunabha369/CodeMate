import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { PeethMap } from "../components/PeethMap";
import { cue, sceneTiming } from "../lib/timing";

const ID = "S65";

/** One golden thread through all 51 dots: "ভক্তি". */
export const S65: React.FC = () => {
  const t = sceneTiming(ID);
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <PeethMap thread={{ start: 10, duration: t.audioFrames }} showNote showTray />
      <div style={{ position: "absolute", left: 0, right: 0, top: 100, display: "flex", justifyContent: "center" }}>
        <Headline text="একটাই সুতো · ভক্তি" highlight="ভক্তি" size={88} start={cue(ID, "মায়ের প্রতি ভক্তি", -10)} />
      </div>
    </AbsoluteFill>
  );
};
