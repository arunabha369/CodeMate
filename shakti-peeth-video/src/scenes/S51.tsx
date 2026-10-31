import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { PeethMap } from "../components/PeethMap";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { asset } from "../lib/assets";
import { byId } from "../lib/peeths";
import { cue, sceneTiming } from "../lib/timing";

const ID = "S51";
const HOPS: Array<[string, string, string, string]> = [
  ["vishalakshi", "কাশীতে", "photo-vishalakshi", "বিশালাক্ষী · কাশী"],
  ["vimala", "পুরীর", "photo-vimala", "বিমলা · পুরী"],
  ["tripura", "ত্রিপুরার", "photo-tripura", "ত্রিপুরাসুন্দরী · উদয়পুর"],
];

const Card: React.FC<{ len: number; children: React.ReactNode }> = ({ len, children }) => {
  const frame = useCurrentFrame();
  const o = Math.min(
    interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
    interpolate(frame, [len - 10, len], [1, 0], { extrapolateLeft: "clamp" }),
  );
  return <AbsoluteFill style={{ opacity: o, translate: `0px ${(1 - o) * 20}px` }}>{children}</AbsoluteFill>;
};

/** The map hops Varanasi → Puri → Udaipur; a photo card pops at each stop. */
export const S51: React.FC = () => {
  const t = sceneTiming(ID);
  const at = HOPS.map(([, phrase]) => cue(ID, phrase, -10));
  const keys = HOPS.flatMap(([id], i) => {
    const p = byId(id);
    return [{ frame: at[i], lon: (p.lon as number) - 4.5, lat: p.lat as number, zoom: 3.2 }];
  });
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <PeethMap
        camera={[{ frame: 0, lon: 80, lat: 22.5, zoom: 1 }, ...keys, { ...keys[keys.length - 1], frame: t.frames, zoom: 3.4 }]}
        highlight={HOPS.map(([id]) => id)}
        highlightAt={at.map((a) => a + 10)}
        labelText={{ vishalakshi: "কাশী", vimala: "পুরী", tripura: "উদয়পুর" }}
        labelSize={36}
      />
      {HOPS.map(([id, , key, caption], i) => {
        const a = asset(key);
        const len = (i < HOPS.length - 1 ? at[i + 1] : t.frames) - at[i];
        return (
          <Sequence key={id} from={at[i] + 8} durationInFrames={len} layout="absolute-fill">
            <Card len={len}>
              <PhotoKenBurns src={a.src} label={a.label} durationInFrames={len} box={{ x: 90, y: 150, w: 860, h: 560 }} radius={20} caption={caption} credit={a.credit || undefined} />
            </Card>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
