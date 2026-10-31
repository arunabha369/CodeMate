import React from 'react';
import {C, FONT_NUM} from '../theme';
import {rng} from '../anim';

export const STRATA = [
  {name: 'নরম পলি', top: 0, bottom: 0.3, color: '#D9C8A6'},
  {name: 'কাদা আর বালি', top: 0.3, bottom: 0.62, color: '#C4AD86'},
  {name: 'শক্ত হলদে কাদা', top: 0.62, bottom: 1, color: '#C99A45'},
];

/**
 * Ground cross-section with strata from `groundY` to `bottomY`, plus a monolith caisson that sinks.
 * `sink` is in px. Grab buckets dip into the shafts with `frame`. `lifts` = number of extra wall lifts added on top.
 */
export const CaissonSection: React.FC<{
  frame: number;
  groundY?: number;
  bottomY?: number;
  cx?: number;
  w?: number;
  h?: number;
  sink: number;
  cells?: number;
  lifts?: number;
  liftP?: number;
  buckets?: boolean;
  digPhase?: number;
  showStrata?: number;
  tilt?: number;
}> = ({frame, groundY = 360, bottomY = 1080, cx = 900, w = 640, h = 250, sink, cells = 7, lifts = 0, liftP = 1, buckets = true, digPhase = 0, showStrata = 1, tilt = 0}) => {
  const depth = bottomY - groundY;
  const x0 = cx - w / 2;
  const topY = groundY - 70 + sink; // caisson top
  const liftH = 60;
  const bot = topY + h;
  const wall = 14;
  const cellW = (w - wall) / cells;
  const r = rng(7);
  const specks = Array.from({length: 90}, () => ({x: r() * 1920, y: groundY + r() * depth, s: 1.5 + r() * 2.5}));
  return (
    <g>
      {/* strata */}
      {STRATA.map((st, i) => (
        <rect key={i} x={0} y={groundY + st.top * depth} width={1920} height={(st.bottom - st.top) * depth + 1} fill={st.color} opacity={showStrata} />
      ))}
      {specks.map((p, i) => (
        <circle key={i} cx={p.x + Math.sin(frame / 50 + i) * 3} cy={p.y} r={p.s} fill="#6B5636" opacity={0.18 * showStrata} />
      ))}
      <line x1={0} y1={groundY} x2={1920} y2={groundY} stroke={C.mudDark} strokeWidth={3} />
      {/* caisson */}
      <g transform={`rotate(${tilt} ${cx} ${bot})`}>
        {/* body walls */}
        <rect x={x0} y={topY - lifts * liftH} width={w} height={h + lifts * liftH} fill={C.concreteLight} />
        {Array.from({length: lifts}, (_, i) => (
          <line key={i} x1={x0} y1={topY - i * liftH} x2={x0 + w} y2={topY - i * liftH} stroke="#9EA0A8" strokeWidth={2} strokeDasharray="10 6" />
        ))}
        {/* new lift being cast */}
        {liftP < 1 && <rect x={x0} y={topY - (lifts + 1) * liftH + liftH * (1 - liftP)} width={w} height={liftH * liftP} fill="#DADBE0" stroke={C.orange} strokeWidth={2} strokeDasharray="8 6" />}
        {/* open cells (shafts) */}
        {Array.from({length: cells}, (_, i) => (
          <g key={i}>
            <rect x={x0 + wall + i * cellW} y={topY - lifts * liftH - (liftP < 1 ? liftH * liftP : 0)} width={cellW - wall} height={h + lifts * liftH + (liftP < 1 ? liftH * liftP : 0) - 4} fill="#6E6B66" opacity={0.85} />
            {/* muddy water at the bottom of each shaft */}
            <rect x={x0 + wall + i * cellW} y={bot - 60} width={cellW - wall} height={56} fill="#5C4B3A" opacity={0.9} />
          </g>
        ))}
        {/* cutting edge */}
        <path d={`M ${x0} ${bot - 6} L ${x0 + 26} ${bot + 18} L ${x0 + w - 26} ${bot + 18} L ${x0 + w} ${bot - 6} Z`} fill="#8D8F98" />
        {Array.from({length: cells - 1}, (_, i) => (
          <path key={i} d={`M ${x0 + (i + 1) * cellW} ${bot - 8} l ${wall / 2} 20 l ${wall / 2} -20 Z`} fill="#8D8F98" />
        ))}
        {/* grab buckets on cables */}
        {buckets &&
          [1, 3, 5].map((ci, k) => {
            const phase = ((frame + digPhase + k * 27) % 80) / 80; // down, grab, up, dump
            const down = phase < 0.5 ? phase / 0.5 : 1 - (phase - 0.5) / 0.5;
            const shaftX = x0 + wall + ci * cellW + (cellW - wall) / 2;
            const topCable = topY - lifts * liftH - 120;
            const by = topCable + 40 + down * (bot - 70 - (topCable + 40));
            const full = phase > 0.5;
            return (
              <g key={ci}>
                <line x1={shaftX} y1={topCable} x2={shaftX} y2={by} stroke={C.ink} strokeWidth={2} />
                <path d={`M ${shaftX - 18} ${by} L ${shaftX + 18} ${by} L ${shaftX + 12} ${by + 22} L ${shaftX - 12} ${by + 22} Z`} fill={C.steel} />
                {full && <ellipse cx={shaftX} cy={by + 2} rx={14} ry={6} fill="#5C4B3A" />}
                {/* gantry */}
                <line x1={shaftX - 30} y1={topCable} x2={shaftX + 30} y2={topCable} stroke={C.ink} strokeWidth={5} />
                <line x1={shaftX - 26} y1={topCable} x2={shaftX - 36} y2={topY - lifts * liftH} stroke={C.ink} strokeWidth={3} />
                <line x1={shaftX + 26} y1={topCable} x2={shaftX + 36} y2={topY - lifts * liftH} stroke={C.ink} strokeWidth={3} />
              </g>
            );
          })}
      </g>
    </g>
  );
};

/** Vertical depth ruler (metres) at x, from groundY at pxPerM. */
export const DepthRuler: React.FC<{x: number; groundY: number; pxPerM: number; maxM: number; color?: string; reach?: number}> = ({x, groundY, pxPerM, maxM, color = C.ink, reach = 1}) => (
  <g>
    <line x1={x} y1={groundY} x2={x} y2={groundY + maxM * pxPerM * reach} stroke={color} strokeWidth={3} />
    {Array.from({length: Math.floor(maxM / 5) + 1}, (_, i) => i * 5)
      .filter((m) => m <= maxM * reach + 0.01)
      .map((m) => (
        <g key={m}>
          <line x1={x - 12} y1={groundY + m * pxPerM} x2={x + 12} y2={groundY + m * pxPerM} stroke={color} strokeWidth={3} />
          <text x={x + 22} y={groundY + m * pxPerM + 10} fontFamily={FONT_NUM} fontWeight={600} fontSize={28} fill={color}>
            {m} মি
          </text>
        </g>
      ))}
  </g>
);
