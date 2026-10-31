import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { PeethMap } from "../components/PeethMap";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";

const ID = "S53";

const Pop: React.FC<{ len: number; children: React.ReactNode }> = ({ len, children }) => {
  const frame = useCurrentFrame();
  const o = Math.min(interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" }), interpolate(frame, [len - 10, len], [1, 0], { extrapolateLeft: "clamp" }));
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

/** Across the sea to Nainativu, then over the Himalaya to Manasarovar. */
export const S53: React.FC = () => {
  const t = sceneTiming(ID);
  const lankaAt = cue(ID, "শ্রীলঙ্কার", -10);
  const northAt = cue(ID, "হিমালয় পেরিয়ে", -10);
  const nain = asset("photo-nainativu");
  const manas = asset("photo-manasarovar");
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <PeethMap
        camera={[
          { frame: 0, lon: 79, lat: 14, zoom: 2.2 },
          { frame: lankaAt + 20, lon: 76.5, lat: 9.8, zoom: 3.6 },
          { frame: northAt, lon: 76.5, lat: 9.8, zoom: 3.6 },
          { frame: northAt + 50, lon: 77.5, lat: 30.5, zoom: 3.2 },
          { frame: t.frames, lon: 77.5, lat: 30.5, zoom: 3.4 },
        ]}
        highlight={["lanka", "manas"]}
        highlightAt={[lankaAt + 14, northAt + 44]}
        labelText={{ lanka: "নয়নাতিভু", manas: "মানস সরোবর" }}
        labelSize={36}
      />
      <Sequence from={lankaAt + 18} durationInFrames={northAt - lankaAt} layout="absolute-fill">
        <Pop len={northAt - lankaAt}>
          <PhotoKenBurns src={nain.src} label={nain.label} durationInFrames={northAt - lankaAt} box={{ x: 90, y: 150, w: 820, h: 540 }} radius={20} caption="ইন্দ্রাক্ষী · নয়নাতিভু, শ্রীলঙ্কা" credit={nain.credit || undefined} />
        </Pop>
      </Sequence>
      <Sequence from={northAt + 48} layout="absolute-fill">
        <Pop len={t.frames - northAt - 48}>
          <PhotoKenBurns src={manas.src} label={manas.label} durationInFrames={t.frames - northAt} box={{ x: 90, y: 150, w: 820, h: 540 }} radius={20} caption="দাক্ষায়ণী · মানস সরোবর, তিব্বত" credit={manas.credit || undefined} />
        </Pop>
      </Sequence>
    </AbsoluteFill>
  );
};
