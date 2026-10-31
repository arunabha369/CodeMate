import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { calm } from "../lib/anim";
import { BgVariant, colors, fonts, palettes } from "../theme";

export type FamilyNode = { label: string; sub?: string; at: number; /** frame the sub-label appears (default: with the node) */ subAt?: number };

/**
 * Text-node family tree drawn as a vertical chain (ব্রহ্মা → দক্ষ → সতী),
 * with an optional partner node joined to the last node (সতী — শিব).
 */
export const FamilyLinks: React.FC<{
  nodes: FamilyNode[];
  partner?: FamilyNode;
  x?: number;
  top?: number;
  step?: number;
  bg?: BgVariant;
}> = ({ nodes, partner, x = 1420, top = 200, step = 250, bg = "parchment" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = palettes[bg];
  const nodeW = 360;
  const nodeH = 130;
  const box = (n: FamilyNode, cx: number, cy: number, accent: string, key: string) => {
    const s = calm(frame, fps, n.at);
    return (
      <div
        key={key}
        style={{
          position: "absolute",
          left: cx - nodeW / 2,
          top: cy - nodeH / 2,
          width: nodeW,
          height: nodeH,
          borderRadius: 18,
          background: pal.panel,
          border: `3px solid ${accent}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: s,
          transform: `scale(${0.85 + 0.15 * s})`,
          boxShadow: "0 10px 26px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ fontFamily: fonts.heading, fontSize: 58, lineHeight: 1.2, color: pal.text }}>{n.label}</div>
        {n.sub ? (
          <div style={{ fontFamily: fonts.body, fontSize: 30, color: pal.highlight, opacity: n.subAt !== undefined ? calm(frame, fps, n.subAt) : 1 }}>
            {n.sub}
          </div>
        ) : null}
      </div>
    );
  };
  const last = nodes.length - 1;
  const lastY = top + last * step;
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {nodes.slice(1).map((n, i) => {
          const y0 = top + i * step + nodeH / 2;
          const y1 = top + (i + 1) * step - nodeH / 2;
          const p = interpolate(frame, [n.at - 12, n.at], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <g key={i} stroke={pal.accent} strokeWidth={3} fill="none">
              <line x1={x} y1={y0} x2={x} y2={y0 + (y1 - y0 - 8) * p} />
              {p >= 1 ? <path d={`M ${x - 10} ${y1 - 16} L ${x} ${y1 - 4} L ${x + 10} ${y1 - 16}`} /> : null}
            </g>
          );
        })}
        {partner
          ? (() => {
              const p = interpolate(frame, [partner.at - 12, partner.at], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const x0 = x - nodeW / 2;
              const x1 = x - nodeW / 2 - 140;
              return (
                <g stroke={colors.gold} strokeWidth={3}>
                  <line x1={x0} y1={lastY - 6} x2={x0 + (x1 - x0) * p} y2={lastY - 6} />
                  <line x1={x0} y1={lastY + 6} x2={x0 + (x1 - x0) * p} y2={lastY + 6} />
                </g>
              );
            })()
          : null}
      </svg>
      {nodes.map((n, i) => box(n, x, top + i * step, i === last ? colors.sindoor : pal.panelBorder, `n${i}`))}
      {partner ? box(partner, x - nodeW - 140, lastY, colors.gold, "partner") : null}
    </div>
  );
};
