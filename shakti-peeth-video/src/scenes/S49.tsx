import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { PeethMap } from "../components/PeethMap";
import { QuoteCard } from "../components/QuoteCard";
import { StatCounter } from "../components/StatCounter";
import { cue } from "../lib/timing";

const ID = "S49";

/** "নানি মন্দির" — revered by local Muslims too; the spring yatra draws lakhs. */
export const S49: React.FC = () => (
  <AbsoluteFill>
    <Background variant="night" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 130, display: "flex", justifyContent: "center" }}>
      <QuoteCard text="নানি মন্দির" start={cue(ID, "নানি মন্দির", -8)} size={110} />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center" }}>
      <StatCounter text="লক্ষাধিক" label="বসন্তের হিংলাজ যাত্রা" start={cue(ID, "লক্ষাধিক", -8)} size={130} color="gold" />
    </div>
    <PeethMap box={{ x: 1460, y: 660, w: 380, h: 340 }} camera={{ lon: 72, lat: 25, zoom: 1.5 }} highlight={["hinglaj"]} labelSize={24} border />
  </AbsoluteFill>
);
