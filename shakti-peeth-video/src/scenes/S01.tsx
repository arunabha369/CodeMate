import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { PeethMap } from "../components/PeethMap";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";

const ID = "S01";
const PLACES: Array<[string, string, string, string]> = [
  // peeth id, phrase in narration, asset key, caption
  ["kalighat", "কালীঘাট", "photo-kalighat", "কালীঘাট · কলকাতা"],
  ["kamakhya", "কামাখ্যা", "photo-kamakhya", "কামাখ্যা · অসম"],
  ["hinglaj", "হিংলাজ", "photo-hinglaj", "হিংলাজ · পাকিস্তান"],
  ["lanka", "নয়নাতিভু", "photo-nainativu", "নয়নাতিভু · শ্রীলঙ্কা"],
  ["manas", "মানস সরোবর", "photo-manasarovar", "মানস সরোবর · তিব্বত"],
];
const FLASH = 45; // 1.5 s photo flash per place

/** Hook: the map wakes; each named place lights with a short photo flash. */
export const S01: React.FC = () => {
  const frame = useCurrentFrame();
  const t = sceneTiming(ID);
  const at = PLACES.map(([, phrase]) => cue(ID, phrase, -4));
  const ids = PLACES.map(([id]) => id);
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <AbsoluteFill style={{ opacity: interpolate(frame, [0, 24], [0, 1], { extrapolateRight: "clamp" }) }}>
        <PeethMap
          camera={[
            { frame: 0, lon: 80, lat: 22.5, zoom: 0.94 },
            { frame: t.frames, lon: 80, lat: 22.5, zoom: 1.0 },
          ]}
          dots={ids}
          highlight={ids}
          highlightAt={at}
          labelSize={34}
          labelText={Object.fromEntries(PLACES.map(([id, phrase]) => [id, phrase]))}
        />
      </AbsoluteFill>
      {PLACES.map(([id, , key, caption], i) => {
        const a = asset(key);
        return (
          <Sequence key={id} from={at[i]} durationInFrames={FLASH} layout="absolute-fill">
            <FlashFade>
              <PhotoKenBurns src={a.src} label={a.label} durationInFrames={FLASH} box={{ x: 1380, y: 90, w: 460, h: 320 }} radius={18} caption={caption} credit={a.credit || undefined} />
            </FlashFade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const FlashFade: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const o = Math.min(
    interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" }),
    interpolate(frame, [FLASH - 8, FLASH], [1, 0], { extrapolateLeft: "clamp" }),
  );
  return <AbsoluteFill style={{ opacity: o, transform: `translateY(${(1 - o) * 10}px)` }}>{children}</AbsoluteFill>;
};
