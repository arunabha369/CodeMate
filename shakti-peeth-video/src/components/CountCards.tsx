import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { calm } from "../lib/anim";
import { BgVariant, colors, fonts, palettes } from "../theme";

export type CountCard = { value: string; label: string; note?: string };

/** Number cards flipping in (৫১ / ৫২ / ৬৪ / ১০৮, or a single ১৮) with source labels. */
export const CountCards: React.FC<{
  cards: CountCard[];
  revealAt?: number[];
  start?: number;
  gap?: number;
  bg?: BgVariant;
  big?: boolean;
}> = ({ cards, revealAt, start = 0, gap = 20, bg = "gold", big = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = palettes[bg];
  const w = big ? 620 : 360;
  const h = big ? 560 : 420;
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 40, perspective: 1600 }}>
      {cards.map((c, i) => {
        const s = calm(frame, fps, revealAt?.[i] ?? start + i * gap);
        return (
          <div
            key={c.value}
            style={{
              width: w,
              height: h,
              borderRadius: 26,
              background: pal.panel,
              border: `3px solid ${pal.panelBorder}`,
              boxShadow: "0 18px 40px rgba(0,0,0,0.14)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotateY(${(1 - s) * 90}deg)`,
              opacity: s > 0.02 ? 1 : 0,
              padding: 20,
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: fonts.heading, fontSize: big ? 230 : 160, lineHeight: 1.1, color: colors.sindoor }}>{c.value}</div>
            <div style={{ fontFamily: fonts.body, fontWeight: 600, fontSize: big ? 46 : 34, lineHeight: 1.3, color: pal.text, marginTop: 10 }}>{c.label}</div>
            {c.note ? <div style={{ fontFamily: fonts.body, fontSize: big ? 30 : 24, color: pal.subtext, marginTop: 10 }}>{c.note}</div> : null}
          </div>
        );
      })}
    </div>
  );
};
