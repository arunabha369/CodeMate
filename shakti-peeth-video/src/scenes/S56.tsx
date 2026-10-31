import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { PeethMap } from "../components/PeethMap";
import { StatCounter } from "../components/StatCounter";
import { LOCATED } from "../lib/peeths";
import { cue, sceneTiming } from "../lib/timing";
import { CONTENT_FROM, WithChapterCard } from "./shared";

const ID = "S56";
const WB = LOCATED.filter((p) => p.regionBn === "পশ্চিমবঙ্গ").map((p) => p.id);

/** অধ্যায় ৮. Zoom into West Bengal; ১৪. */
export const S56: React.FC = () => {
  const t = sceneTiming(ID);
  return (
    <WithChapterCard number={8} title="এপার বাংলার পীঠ" variant="gold">
      <AbsoluteFill>
        <Background variant="gold" />
        <PeethMap
          variant="gold"
          camera={[
            { frame: 0, lon: 82, lat: 23, zoom: 1.2 },
            { frame: 60, lon: 86.6, lat: 24.4, zoom: 4.6 },
            { frame: t.frames, lon: 86.6, lat: 24.4, zoom: 4.9 },
          ]}
          highlight={WB}
          highlightAt={WB.map((_, i) => 50 + i * 3)}
          labelHighlights={false}
          showNote
        />
        <div style={{ position: "absolute", left: 90, top: 330, width: 460 }}>
          <StatCounter value={14} label="সতীপীঠ" start={cue(ID, "চোদ্দোটা", -10) - CONTENT_FROM} bg="gold" countFrames={30} />
        </div>
      </AbsoluteFill>
    </WithChapterCard>
  );
};
