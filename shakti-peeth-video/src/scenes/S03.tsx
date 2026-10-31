import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { PaintingFrame } from "../components/PaintingFrame";
import { calm } from "../lib/anim";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";
import { colors, fonts } from "../theme";

const ID = "S03";
const WORDS: Array<[string, string]> = [
  ["অভিমান", "অভিমান"],
  ["শোক", "শোক"],
  ["প্রলয়নৃত্য", "প্রলয়নৃত্য"],
];

/** The Met's Kalighat painting; the three story words appear beside it. */
export const S03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = sceneTiming(ID);
  const art = asset("met-2000-313");
  return (
    <AbsoluteFill>
      <Background variant="parchment" />
      <PaintingFrame src={art.src} label={art.label} credit={art.credit} durationInFrames={t.frames} box={{ x: 300, y: 60, w: 700, h: 900 }} focal={{ x: 0.5, y: 0.3 }} />
      <div style={{ position: "absolute", left: 1120, top: 250, display: "flex", flexDirection: "column", gap: 40 }}>
        {WORDS.map(([phrase, word], i) => {
          const s = calm(frame, fps, cue(ID, phrase, -4));
          return (
            <div
              key={word}
              style={{
                fontFamily: fonts.heading,
                fontSize: 96,
                lineHeight: 1.2,
                color: i === 2 ? colors.sindoor : colors.ink,
                opacity: s,
                transform: `translateX(${(1 - s) * 40}px)`,
              }}
            >
              {word}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
