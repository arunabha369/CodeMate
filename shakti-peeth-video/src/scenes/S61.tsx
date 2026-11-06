import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "../components/Background";
import { PeethMap } from "../components/PeethMap";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";

const ID = "S61";
const STOPS: Array<[string, string, string, string, string]> = [
  ["kiriteswari", "মুর্শিদাবাদে", "photo-kiriteswari", "কিরীটেশ্বরী · মুর্শিদাবাদ · কিরীট (মুকুট)", "কিরীটেশ্বরী"],
  ["vibhash", "তমলুকে", "photo-bargabhima", "বর্গভীমা · তমলুক · বাম গোড়ালি", "তমলুক"],
  ["trisrota", "জলপাইগুড়িতে", "photo-bhramari", "ভ্রামরী · জলপাইগুড়ি · বাম পা", "জলপাইগুড়ি"],
];

/** Photo on the left changes at each name; West Bengal mini-map on the right lights the dots in order. */
export const S61: React.FC = () => {
  const t = sceneTiming(ID);
  const at = STOPS.map(([, phrase]) => cue(ID, phrase, -8));
  return (
    <AbsoluteFill>
      <Background variant="gold" />
      <PeethMap
        variant="gold"
        box={{ x: 1080, y: 0, w: 840, h: 1080 }}
        camera={{ lon: 88.3, lat: 24.4, zoom: 4.4 }}
        highlight={STOPS.map(([id]) => id)}
        highlightAt={at}
        labelText={Object.fromEntries(STOPS.map(([id, , , , l]) => [id, l]))}
        labelSize={30}
      />
      {STOPS.map(([id, , key, caption], i) => {
        const a = asset(key);
        const end = i < STOPS.length - 1 ? at[i + 1] + 10 : t.frames;
        return (
          <Sequence key={id} from={at[i]} durationInFrames={end - at[i]} layout="absolute-fill">
            <PhotoKenBurns src={a.src} label={a.label} durationInFrames={end - at[i]} box={{ x: 80, y: 150, w: 960, h: 680 }} radius={20} caption={caption} credit={a.credit || undefined} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
