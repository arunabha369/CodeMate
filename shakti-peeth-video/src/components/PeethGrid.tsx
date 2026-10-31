import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { calm } from "../lib/anim";
import { shortName } from "../lib/bn";
import { PEETHS } from "../lib/peeths";
import { BgVariant, colors, fonts, layout, palettes } from "../theme";

const COLS = 9;
const GAP = 12;

/** Rough fit: shrink a font so a Bengali string stays inside `width`. */
const fit = (s: string, width: number, max: number, perChar = 0.62) =>
  Math.min(max, Math.floor(width / Math.max(1, s.length * perChar)));

/**
 * All 51 peeths as tiles (name · region · body part) cascading in (~6 s).
 * Disputed tiles get a dashed border; disputed body parts an asterisk.
 */
export const PeethGrid: React.FC<{ start?: number; stagger?: number; bg?: BgVariant; top?: number }> = ({
  start = 0,
  stagger = 3,
  bg = "gold",
  top = 150,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = palettes[bg];
  const width = 1920 - layout.safe * 2;
  const tileW = (width - GAP * (COLS - 1)) / COLS;
  const rows = Math.ceil(PEETHS.length / COLS);
  const tileH = (1080 - top - layout.safe - 40 - GAP * (rows - 1)) / rows;
  return (
    <div style={{ position: "absolute", left: layout.safe, top, width }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: GAP }}>
        {PEETHS.map((p, i) => {
          const s = calm(frame, fps, start + i * stagger);
          const name = shortName(p.nameBn);
          const body = p.bodyPartBn + (p.bodyPartDisputed ? "*" : "");
          return (
            <div
              key={p.id}
              style={{
                width: tileW,
                height: tileH,
                boxSizing: "border-box",
                padding: "8px 10px",
                borderRadius: 10,
                background: pal.panel,
                border: `2px ${p.status === "disputed" ? "dashed" : "solid"} ${pal.panelBorder}`,
                opacity: s,
                transform: `translateY(${(1 - s) * 30}px) scale(${0.9 + 0.1 * s})`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <div style={{ fontFamily: fonts.heading, fontSize: fit(name, tileW - 20, 30, 0.5), lineHeight: 1.25, color: pal.text, whiteSpace: "nowrap" }}>
                {name}
              </div>
              <div style={{ fontFamily: fonts.body, fontSize: fit(p.regionBn, tileW - 20, 18, 0.5), color: pal.subtext, whiteSpace: "nowrap" }}>
                {p.regionBn}
              </div>
              <div style={{ fontFamily: fonts.body, fontWeight: 600, fontSize: fit(body, tileW - 20, 20, 0.52), color: bg === "night" ? colors.gold : colors.sindoor, whiteSpace: "nowrap" }}>
                {body}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 14,
          textAlign: "right",
          fontFamily: fonts.body,
          fontSize: 22,
          color: pal.subtext,
          opacity: interpolate(frame, [start + 20, start + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        তালিকা ও স্থান নিয়ে মতভেদ আছে · ভাঙা রেখার ঘর = মতভেদ · * = অঙ্গ নিয়ে মতভেদ
      </div>
    </div>
  );
};
