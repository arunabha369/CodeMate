import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { PeethMap } from "../components/PeethMap";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";

const ID = "S58";
const STOPS: Array<[string, string, string, string, string]> = [
  ["bakreshwar", "বক্রেশ্বরে", "photo-bakreshwar", "বক্রেশ্বর · ভ্রূমধ্য", "বক্রেশ্বর"],
  ["nalhati", "নলহাটিতে", "photo-nalhati", "নলহাটি · নলা", "নলহাটি"],
  ["kankalitala", "কঙ্কালীতলায়", "photo-kankalitala", "কঙ্কালীতলা · কাঁকাল (কোমর)", "কঙ্কালীতলা"],
];

const Slide: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ position: "absolute", inset: 0, opacity: o, translate: `${(1 - o) * 40}px 0px` }}>{children}</div>;
};

/** Birbhum, "the district of peeths": close-up map on the left, photo cards stacking on the right. */
export const S58: React.FC = () => {
  const t = sceneTiming(ID);
  const at = STOPS.map(([, phrase]) => cue(ID, phrase, -8));
  return (
    <AbsoluteFill>
      <Background variant="gold" />
      <PeethMap
        variant="gold"
        box={{ x: 0, y: 0, w: 1060, h: 1080 }}
        camera={{ lon: 87.65, lat: 23.95, zoom: 14 }}
        dots={["bakreshwar", "nalhati", "kankalitala", "nandipur", "attahas"]}
        highlight={STOPS.map(([id]) => id)}
        highlightAt={at}
        labelText={Object.fromEntries(STOPS.map(([id, , , , l]) => [id, l]))}
        labelSize={34}
        showAlt={false}
      />
      <div style={{ position: "absolute", left: 80, top: 80 }}>
        <Headline text="বীরভূম" highlight="বীরভূম" highlightColor="sindoor" bg="gold" align="left" size={80} start={0} kicker="পীঠের জেলা" kickerPosition="below" />
      </div>
      {STOPS.map(([id, , key, caption], i) => {
        const a = asset(key);
        return (
          <Slide key={id} at={at[i]}>
            <PhotoKenBurns src={a.src} label={a.label} durationInFrames={t.frames - at[i]} start={at[i]} box={{ x: 1100, y: 70 + i * 315, w: 740, h: 290 }} radius={18} caption={caption} />
          </Slide>
        );
      })}
    </AbsoluteFill>
  );
};
