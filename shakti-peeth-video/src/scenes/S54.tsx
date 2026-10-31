import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "../components/Background";
import { LowerThird } from "../components/LowerThird";
import { PeethMap } from "../components/PeethMap";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { StatCounter } from "../components/StatCounter";
import { asset } from "../lib/assets";
import { LOCATED } from "../lib/peeths";
import { cue } from "../lib/timing";

const ID = "S54";
const BD = LOCATED.filter((p) => p.regionBn === "বাংলাদেশ").map((p) => p.id);

/** Guhyeshwari, Kathmandu; then the 7 peeths of Bangladesh (Kanyashram's alternative site dashed). */
export const S54: React.FC = () => {
  const cut = cue(ID, "আর ওপার বাংলায়", -8);
  const g = asset("photo-guhyeshwari");
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={cut + 10} layout="absolute-fill">
        <PhotoKenBurns src={g.src} label={g.label} durationInFrames={cut} credit={g.credit || undefined} />
        <LowerThird title="গুহ্যেশ্বরী · কাঠমান্ডু" subtitle="পশুপতিনাথের কাছে, নেপাল" start={8} />
      </Sequence>
      <Sequence from={cut} layout="absolute-fill">
        <Background variant="night" />
        <PeethMap camera={{ lon: 88.6, lat: 23.6, zoom: 4.2 }} highlight={[...BD, "kanyashram"]} highlightAt={BD.map((_, i) => 8 + i * 5).concat([8 + BD.length * 5])} labelHighlights={false} showNote />
        <div style={{ position: "absolute", left: 80, top: 330, width: 420 }}>
          <StatCounter value={7} label="ওপার বাংলার পীঠ" start={cue(ID, "সাতটা", -10) - cut} countFrames={24} />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
