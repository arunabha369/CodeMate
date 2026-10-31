import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { PeethGrid } from "../components/PeethGrid";
import { cue } from "../lib/timing";
import { colors, fonts } from "../theme";

const ID = "S43";
// The 51 matrika letters (16 vowels + 35 consonants incl. ক্ষ), in Bengali script.
// (Sanskrit's Vedic ळ has no Bengali letter; it is written ল here.)
const LETTERS = "অ আ ই ঈ উ ঊ ঋ ৠ ঌ ৡ এ ঐ ও ঔ অং অঃ ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল ব শ ষ স হ ল ক্ষ".split(" ");

/** 51 letters orbit, then give way to the grid of 51 peeths. */
export const S43: React.FC = () => {
  const frame = useCurrentFrame();
  const gridAt = cue(ID, "সংস্কৃত বর্ণমালার", 10);
  const out = interpolate(frame, [gridAt - 10, gridAt + 10], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Background variant="gold" />
      <div style={{ position: "absolute", inset: 0, opacity: out }}>
        {LETTERS.map((l, i) => {
          const ring = i < 16 ? 0 : 1;
          const n = ring ? LETTERS.length - 16 : 16;
          const k = ring ? i - 16 : i;
          const r = ring ? 400 : 220;
          const a = (k / n) * Math.PI * 2 + frame / (ring ? 140 : -110);
          const appear = interpolate(frame, [i * 1.2, i * 1.2 + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 960 + Math.cos(a) * r * appear - 40,
                top: 520 + Math.sin(a) * r * 0.8 * appear - 40,
                width: 80,
                textAlign: "center",
                fontFamily: fonts.heading,
                fontSize: ring ? 48 : 58,
                color: ring ? colors.ink : colors.sindoor,
                opacity: appear,
              }}
            >
              {l}
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, textAlign: "center", fontFamily: fonts.heading, fontSize: 110, color: colors.sindoor }}>৫১</div>
      </div>
      {frame >= gridAt - 10 ? <PeethGrid start={gridAt} stagger={2} /> : null}
    </AbsoluteFill>
  );
};
