import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { PeethMap } from "../components/PeethMap";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";

const ID = "S55";
const STOPS: Array<[string, string, string, string]> = [
  ["chattal", "চন্দ্রনাথ", "photo-chandranath", "চন্দ্রনাথ · সীতাকুণ্ড"],
  ["sugandha", "সুগন্ধা", "photo-sugandha", "সুগন্ধা · শিকারপুর · নাক"],
  ["jeshore", "যশোরেশ্বরী", "photo-jeshoreshwari", "যশোরেশ্বরী · ঈশ্বরীপুর"],
  ["shrishail", "শ্রীশৈল", "photo-shrishail", "শ্রীশৈল · সিলেট"],
];

const Slide: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ position: "absolute", inset: 0, opacity: o, translate: `${(1 - o) * -40}px 0px` }}>{children}</div>;
};

/** Bangladesh: name chips by each dot and a small photo card per stop. */
export const S55: React.FC = () => {
  const t = sceneTiming(ID);
  const at = STOPS.map(([, phrase]) => cue(ID, phrase, -8));
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <PeethMap
        camera={{ lon: 86.4, lat: 23.6, zoom: 4.2 }}
        highlight={STOPS.map(([id]) => id)}
        highlightAt={at}
        labelText={{ chattal: "চন্দ্রনাথ", sugandha: "সুগন্ধা", jeshore: "যশোরেশ্বরী", shrishail: "শ্রীশৈল" }}
        labelSize={32}
      />
      {STOPS.map(([id, , key, caption], i) => {
        const a = asset(key);
        return (
          <Slide key={id} at={at[i]}>
            <PhotoKenBurns src={a.src} label={a.label} durationInFrames={t.frames - at[i]} start={at[i]} box={{ x: 80, y: 90 + i * 225, w: 520, h: 205 }} radius={16} caption={caption} credit={a.credit || undefined} />
          </Slide>
        );
      })}
    </AbsoluteFill>
  );
};
