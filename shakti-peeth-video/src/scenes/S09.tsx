import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { AshIcon, PyreIcon, SnakeIcon } from "../components/Icons";
import { calm } from "../lib/anim";
import { cue } from "../lib/timing";
import { colors, fonts, palettes } from "../theme";

const ID = "S09";
const CARDS: Array<{ phrase: string; word: string; Icon: typeof AshIcon; tilt: number }> = [
  { phrase: "ছাই", word: "ছাই", Icon: AshIcon, tilt: -3 },
  { phrase: "সাপ", word: "সাপ", Icon: SnakeIcon, tilt: 2 },
  { phrase: "শ্মশানে", word: "শ্মশান", Icon: PyreIcon, tilt: -2 },
];

/** Ash · snake · cremation ground — Shiva's ways that Daksha could not accept. */
export const S09: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = palettes.parchment;
  const reject = cue(ID, "মেনে নিতে", -6);
  const r = calm(frame, fps, reject);
  const line = interpolate(frame, [reject + 10, reject + 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Background variant="parchment" />
      {CARDS.map(({ phrase, word, Icon, tilt }, i) => {
        const s = calm(frame, fps, cue(ID, phrase, -6));
        return (
          <div
            key={word}
            style={{
              position: "absolute",
              left: 360 + i * 600 - 190,
              top: 180,
              width: 380,
              height: 460,
              borderRadius: 24,
              background: pal.panel,
              border: `3px solid ${pal.panelBorder}`,
              boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              opacity: s * (1 - 0.25 * r),
              transform: `translateY(${(1 - s) * 60}px) rotate(${tilt * r}deg)`,
            }}
          >
            <Icon size={220} color={colors.ink} strokeWidth={2.6} />
            <div style={{ fontFamily: fonts.heading, fontSize: 72, color: colors.ink }}>{word}</div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 760, textAlign: "center", opacity: r }}>
        <div style={{ display: "inline-block", fontFamily: fonts.heading, fontSize: 64, color: colors.ink }}>
          মেনে নিতে পারেননি <span style={{ color: colors.sindoor }}>দক্ষ</span>
          <div style={{ height: 5, marginTop: 6, background: colors.sindoor, transform: `scaleX(${line})`, transformOrigin: "left" }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
