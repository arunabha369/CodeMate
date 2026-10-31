import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { calm, words } from "../lib/anim";
import { colors, fonts } from "../theme";
import { LotusIcon, TrishulIcon } from "./Icons";

export type Speaker = { name: string; icon: "lotus" | "trishul" };
export type DialogueLine = { side: "left" | "right"; text: string; at: number };

const icon = (k: Speaker["icon"], color: string) =>
  k === "lotus" ? <LotusIcon size={130} color={color} /> : <TrishulIcon size={130} color={color} />;

/**
 * Two speakers shown as names + symbols (no faces), speech bubbles typing out
 * word by word so Bengali conjuncts are never split mid-glyph.
 */
export const DialogueCard: React.FC<{
  left: Speaker;
  right: Speaker;
  lines: DialogueLine[];
  start?: number;
  wordStagger?: number;
}> = ({ left, right, lines, start = 0, wordStagger = 5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = calm(frame, fps, start);
  const badge = (s: Speaker, side: "left" | "right") => {
    const c = side === "left" ? colors.sindoor : colors.gold;
    return (
      <div
        style={{
          position: "absolute",
          top: 150,
          [side]: 220,
          width: 280,
          textAlign: "center",
          opacity: sp,
          transform: `translateY(${(1 - sp) * 20}px)`,
        }}
      >
        <div
          style={{
            width: 190,
            height: 190,
            margin: "0 auto",
            borderRadius: "50%",
            border: `3px solid ${c}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(10,9,16,0.6)",
            boxShadow: `0 0 40px ${c}44`,
          }}
        >
          {icon(s.icon, c)}
        </div>
        <div style={{ fontFamily: fonts.heading, fontSize: 60, color: colors.cream, marginTop: 14 }}>{s.name}</div>
      </div>
    );
  };
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {badge(left, "left")}
      {badge(right, "right")}
      {lines.map((ln, i) => {
        const ws = words(ln.text);
        const appear = calm(frame, fps, ln.at);
        const isLeft = ln.side === "left";
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 560 + i * 150,
              [isLeft ? "left" : "right"]: 200,
              maxWidth: 900,
              padding: "22px 36px 26px",
              borderRadius: isLeft ? "8px 34px 34px 34px" : "34px 8px 34px 34px",
              background: isLeft ? "rgba(193,18,31,0.18)" : "rgba(227,176,75,0.16)",
              border: `2px solid ${isLeft ? colors.sindoor : colors.gold}`,
              opacity: appear,
              transform: `scale(${0.9 + 0.1 * appear})`,
              transformOrigin: isLeft ? "top left" : "top right",
              fontFamily: fonts.body,
              fontSize: 44,
              lineHeight: 1.45,
              color: colors.cream,
            }}
          >
            {ws.map((w, k) => (
              <span
                key={k}
                style={{
                  opacity: interpolate(frame, [ln.at + 4 + k * wordStagger, ln.at + 8 + k * wordStagger], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                {w}
                {k < ws.length - 1 ? " " : ""}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};
