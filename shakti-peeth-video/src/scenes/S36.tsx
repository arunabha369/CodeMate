import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { PeethMap } from "../components/PeethMap";
import { cue, sceneTiming } from "../lib/timing";

const ID = "S36";

/** Calm returns: the camera tilts up, the map settles below the stars. */
export const S36: React.FC = () => {
  const t = sceneTiming(ID);
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <PeethMap
        camera={[
          { frame: 0, lon: 80, lat: 22.5, zoom: 1 },
          { frame: t.frames, lon: 80, lat: 31, zoom: 0.92 },
        ]}
        dotOpacity={0.9}
        showNote
      />
      <div style={{ position: "absolute", left: 0, right: 0, top: 120, display: "flex", justifyContent: "center" }}>
        <Headline text="থামল প্রলয়" highlight="থামল" start={cue(ID, "থামল প্রলয়", -8)} size={96} />
      </div>
    </AbsoluteFill>
  );
};
