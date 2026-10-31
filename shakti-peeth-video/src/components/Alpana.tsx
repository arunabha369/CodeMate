import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";

/**
 * Original আলপনা-style border, drawn in SVG: a double rule with dotted inner
 * line and an eight-petal lotus motif at each corner and at the edge centres.
 * `drawFrom`/`drawFrames` animate the strokes drawing on.
 */
export const Alpana: React.FC<{
  width?: number;
  height?: number;
  inset?: number;
  color?: string;
  opacity?: number;
  drawFrom?: number;
  drawFrames?: number;
  strokeWidth?: number;
}> = ({
  width = 1920,
  height = 1080,
  inset = 46,
  color = colors.gold,
  opacity = 0.9,
  drawFrom = 0,
  drawFrames = 40,
  strokeWidth = 2.2,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [drawFrom, drawFrom + drawFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const w = width - inset * 2;
  const h = height - inset * 2;
  const perimeter = 2 * (w + h);
  const dash = (len: number) => ({
    strokeDasharray: len,
    strokeDashoffset: len * (1 - p),
  });

  const motifs: Array<[number, number, number]> = [
    [inset, inset, 1],
    [width - inset, inset, 1],
    [inset, height - inset, 1],
    [width - inset, height - inset, 1],
    [width / 2, inset, 0.7],
    [width / 2, height - inset, 0.7],
  ];

  return (
    <svg width={width} height={height} style={{ position: "absolute", inset: 0, opacity }}>
      <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <rect x={inset} y={inset} width={w} height={h} rx={18} style={dash(perimeter)} />
        <rect
          x={inset + 14}
          y={inset + 14}
          width={w - 28}
          height={h - 28}
          rx={12}
          strokeWidth={strokeWidth * 0.6}
          style={dash(perimeter)}
        />
        <rect
          x={inset + 26}
          y={inset + 26}
          width={w - 52}
          height={h - 52}
          rx={8}
          strokeWidth={strokeWidth * 1.4}
          strokeDasharray={`0.1 14`}
          opacity={p}
        />
      </g>
      {motifs.map(([x, y, s], i) => (
        <LotusMotif key={i} x={x} y={y} scale={s} color={color} progress={p} />
      ))}
    </svg>
  );
};

/** Eight petals around a dotted ring — the corner/edge motif of the border. */
export const LotusMotif: React.FC<{
  x: number;
  y: number;
  scale?: number;
  color: string;
  progress?: number;
  fillCenter?: string;
}> = ({ x, y, scale = 1, color, progress = 1, fillCenter = colors.sindoor }) => {
  const petals = 8;
  const r0 = 10;
  const r1 = 34;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale * progress})`} opacity={progress}>
      {Array.from({ length: petals }).map((_, i) => {
        const a = (i / petals) * Math.PI * 2;
        const a1 = a - 0.32;
        const a2 = a + 0.32;
        const px = (r: number, ang: number) => (Math.cos(ang) * r).toFixed(2);
        const py = (r: number, ang: number) => (Math.sin(ang) * r).toFixed(2);
        const d = `M ${px(r0, a)} ${py(r0, a)} Q ${px(r1 * 0.75, a1)} ${py(r1 * 0.75, a1)} ${px(r1, a)} ${py(r1, a)} Q ${px(r1 * 0.75, a2)} ${py(r1 * 0.75, a2)} ${px(r0, a)} ${py(r0, a)} Z`;
        return <path key={i} d={d} fill="none" stroke={color} strokeWidth={2} />;
      })}
      <circle r={7} fill={fillCenter} />
      <circle r={r1 + 9} fill="none" stroke={color} strokeWidth={2.4} strokeDasharray="0.1 9" strokeLinecap="round" />
    </g>
  );
};
