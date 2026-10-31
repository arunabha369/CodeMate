import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, H, W} from '../theme';
import {clamp, prog, rng} from '../anim';

/** Full-frame SVG layer for diagrams. */
export const Layer: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0, overflow: 'visible', ...style}}>
    {children}
  </svg>
);

export const Negation: React.FC<{at: number; size?: number; color?: string}> = ({at, size = 160, color = C.red}) => {
  const f = useCurrentFrame();
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const p1 = prog(f, at, 12);
  const p2 = prog(f, at + 8, 8);
  const d = r * Math.SQRT1_2;
  return (
    <svg width={size} height={size} style={{overflow: 'visible', opacity: p1 > 0 ? 1 : 0}}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={10} strokeDasharray={circ} strokeDashoffset={circ * (1 - p1)} transform={`rotate(-90 ${size / 2} ${size / 2})`} strokeLinecap="round" />
      <line
        x1={size / 2 - d}
        y1={size / 2 - d}
        x2={size / 2 - d + 2 * d * p2}
        y2={size / 2 - d + 2 * d * p2}
        stroke={color}
        strokeWidth={10}
        strokeLinecap="round"
        opacity={p2 > 0 ? 1 : 0}
      />
    </svg>
  );
};

/** Dimension arrow that draws outward from its centre (use inside an <svg>). */
export const DimArrow: React.FC<{x1: number; y1: number; x2: number; y2: number; at: number; color?: string; tick?: number}> = ({
  x1,
  y1,
  x2,
  y2,
  at,
  color = C.ink,
  tick = 14,
}) => {
  const f = useCurrentFrame();
  const p = prog(f, at, 18);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const ax = mx + (x1 - mx) * p;
  const ay = my + (y1 - my) * p;
  const bx = mx + (x2 - mx) * p;
  const by = my + (y2 - my) * p;
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const nx = -Math.sin(ang) * tick;
  const ny = Math.cos(ang) * tick;
  return (
    <g stroke={color} strokeWidth={2.5} opacity={p > 0 ? 1 : 0} strokeLinecap="round">
      <line x1={ax} y1={ay} x2={bx} y2={by} />
      <line x1={ax - nx} y1={ay - ny} x2={ax + nx} y2={ay + ny} />
      <line x1={bx - nx} y1={by - ny} x2={bx + nx} y2={by + ny} />
    </g>
  );
};

export type Pose = 'stand' | 'dig' | 'point' | 'arms-out';

/** Flat pictogram person, feet at (0,0), ~220px tall. */
export const Person: React.FC<{x: number; y: number; scale?: number; pose?: Pose; color?: string; t?: number}> = ({x, y, scale = 1, pose = 'stand', color = C.ink, t = 0}) => {
  const sw = 22;
  const arm = (a: number) => {
    const L = 78;
    return [Math.cos(a) * L, Math.sin(a) * L];
  };
  let la = [-Math.PI * 0.58, Math.PI * 0.58];
  if (pose === 'arms-out') la = [Math.PI * 1.0, 0];
  if (pose === 'point') la = [Math.PI * 0.6, -0.15];
  if (pose === 'dig') la = [0.6 + Math.sin(t / 5) * 0.25, 0.35 + Math.sin(t / 5) * 0.25];
  const sh = {x: 0, y: -150};
  const [l1x, l1y] = arm(Math.PI - la[0] + Math.PI);
  const [r1x, r1y] = arm(la[1]);
  const leftArm = pose === 'stand' ? [-30, -70] : pose === 'arms-out' ? [-110, -150] : [l1x * 0.9 - 10, sh.y - l1y * 0.9];
  const rightArm = pose === 'stand' ? [30, -70] : pose === 'arms-out' ? [110, -150] : [r1x, sh.y + r1y];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx={0} cy={4} rx={60} ry={10} fill="#000" opacity={0.08} />
      <circle cx={0} cy={-205} r={27} fill={color} />
      <path d="M -36 -165 Q 0 -178 36 -165 L 32 -78 Q 0 -70 -32 -78 Z" fill={color} />
      <line x1={-16} y1={-82} x2={-20} y2={-4} stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <line x1={16} y1={-82} x2={20} y2={-4} stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <line x1={-30} y1={-158} x2={leftArm[0]} y2={leftArm[1]} stroke={color} strokeWidth={sw - 4} strokeLinecap="round" />
      <line x1={30} y1={-158} x2={rightArm[0]} y2={rightArm[1]} stroke={color} strokeWidth={sw - 4} strokeLinecap="round" />
      {pose === 'dig' && (
        <g transform={`translate(${rightArm[0]} ${rightArm[1]}) rotate(${50 + Math.sin(t / 5) * 14})`}>
          <line x1={0} y1={0} x2={0} y2={95} stroke="#8A5A2B" strokeWidth={8} strokeLinecap="round" />
          <path d="M -16 92 L 16 92 L 12 122 Q 0 132 -12 122 Z" fill={C.steel} />
        </g>
      )}
    </g>
  );
};

/** Flat elephant silhouette, feet at (0,0), ~120px tall at scale 1. */
export const Elephant: React.FC<{x: number; y: number; scale?: number; color?: string}> = ({x, y, scale = 1, color = '#6E7285'}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-52} y={-50} width={20} height={50} rx={6} fill={color} />
    <rect x={-22} y={-50} width={20} height={50} rx={6} fill={color} />
    <rect x={14} y={-50} width={20} height={50} rx={6} fill={color} />
    <rect x={40} y={-50} width={20} height={50} rx={6} fill={color} />
    <ellipse cx={0} cy={-72} rx={72} ry={46} fill={color} />
    <circle cx={70} cy={-92} r={34} fill={color} />
    <path d="M 96 -84 Q 118 -50 104 -14 Q 100 -6 94 -12 Q 104 -46 84 -74 Z" fill={color} />
    <ellipse cx={56} cy={-90} rx={22} ry={28} fill="#5B5F72" />
    <circle cx={82} cy={-100} r={4} fill="#fff" />
    <path d="M -70 -80 Q -86 -60 -80 -44" stroke={color} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>
);

/** A flat building with lit windows. Bottom-left at (x, y). */
export const Building: React.FC<{x: number; y: number; w: number; floors: number; floorH?: number; color?: string; lit?: number; seed?: number; roof?: boolean}> = ({
  x,
  y,
  w,
  floors,
  floorH = 38,
  color = '#6E6A7E',
  lit = 0.6,
  seed = 3,
  roof = false,
}) => {
  const r = rng(seed);
  const h = floors * floorH;
  const cols = Math.max(2, Math.floor((w - 16) / 26));
  const ww = (w - 16) / cols - 8;
  return (
    <g>
      <rect x={x} y={y - h} width={w} height={h} fill={color} rx={3} />
      {roof && <path d={`M ${x - 10} ${y - h} L ${x + w / 2} ${y - h - 50} L ${x + w + 10} ${y - h} Z`} fill={color} />}
      {new Array(floors).fill(0).map((_, fl) =>
        new Array(cols).fill(0).map((__, c) => (
          <rect key={`${fl}-${c}`} x={x + 12 + c * (ww + 8)} y={y - h + fl * floorH + 9} width={ww} height={floorH - 18} rx={2} fill={r() < lit ? '#F3D9A8' : '#ffffff'} opacity={0.85} />
        )),
      )}
    </g>
  );
};

/** Metro train capsule. (x, y) = centre-left of the train. */
export const Train: React.FC<{x: number; y: number; len?: number; h?: number; streak?: boolean; cars?: number}> = ({x, y, len = 420, h = 46, streak = true, cars = 4}) => {
  const carLen = len / cars;
  return (
    <g>
      {streak && (
        <rect x={x - 520} y={y - h / 2 + 6} width={540} height={h - 12} fill="url(#train-streak)" opacity={0.85} />
      )}
      <defs>
        <linearGradient id="train-streak" x1="0" x2="1">
          <stop offset="0" stopColor={C.amber} stopOpacity={0} />
          <stop offset="1" stopColor={C.amber} stopOpacity={0.5} />
        </linearGradient>
      </defs>
      {new Array(cars).fill(0).map((_, i) => (
        <g key={i}>
          <rect x={x + i * carLen + 3} y={y - h / 2} width={carLen - 6} height={h} rx={i === cars - 1 ? h / 2 : 10} fill="#E9EAF0" />
          <rect x={x + i * carLen + 3} y={y + h / 2 - 9} width={carLen - 6} height={5} fill={C.green} opacity={0.9} />
          {new Array(Math.floor(carLen / 26) - 1).fill(0).map((__, k) => (
            <rect key={k} x={x + i * carLen + 16 + k * 26} y={y - h / 2 + 9} width={16} height={14} rx={3} fill={C.amber} />
          ))}
        </g>
      ))}
      <ellipse cx={x + len + 4} cy={y} rx={10} ry={5} fill="#FFF3C4" opacity={0.9} />
    </g>
  );
};

/** Small ferry / launch / cargo boat silhouettes, waterline at y. */
export const Boat: React.FC<{x: number; y: number; kind?: 'ferry' | 'cargo' | 'launch'; scale?: number; color?: string}> = ({x, y, kind = 'ferry', scale = 1, color = C.skyline}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {kind === 'ferry' && (
      <>
        <path d="M -110 0 L 110 0 L 90 26 L -90 26 Z" fill={color} />
        <rect x={-70} y={-34} width={130} height={34} rx={4} fill={color} />
        <rect x={-40} y={-58} width={60} height={24} rx={3} fill={color} />
        {[-56, -30, -4, 22, 44].map((wx) => (
          <rect key={wx} x={wx} y={-26} width={14} height={11} rx={2} fill={C.window} opacity={0.85} />
        ))}
      </>
    )}
    {kind === 'launch' && (
      <>
        <path d="M -60 0 L 70 0 L 50 18 L -50 18 Z" fill={color} />
        <rect x={-34} y={-24} width={60} height={24} rx={4} fill={color} />
        <rect x={-24} y={-17} width={12} height={9} fill={C.window} />
        <rect x={0} y={-17} width={12} height={9} fill={C.window} />
      </>
    )}
    {kind === 'cargo' && (
      <>
        <path d="M -150 0 L 150 0 L 125 30 L -135 30 Z" fill={color} />
        {[
          ['#C8741A', -120],
          ['#2F6FB5', -76],
          ['#E0453A', -32],
          ['#2E9E5B', 12],
          ['#F0A63A', 56],
        ].map(([c, cx]) => (
          <rect key={String(cx)} x={Number(cx)} y={-26} width={40} height={26} fill={String(c)} />
        ))}
        <rect x={100} y={-50} width={30} height={50} fill={color} />
      </>
    )}
  </g>
);

/** Generic multi-span girder bridge silhouette (deliberately not a cantilever). */
export const GirderBridge: React.FC<{x1: number; x2: number; deck: number; color?: string; spans?: number; lights?: boolean; frame?: number}> = ({
  x1,
  x2,
  deck,
  color = '#2B2A48',
  spans = 5,
  lights = true,
  frame = 0,
}) => {
  const sw = (x2 - x1) / spans;
  const th = 60;
  return (
    <g>
      {new Array(spans + 1).fill(0).map((_, i) => (
        <rect key={i} x={x1 + i * sw - 12} y={deck} width={24} height={110} fill={color} />
      ))}
      <rect x={x1} y={deck - 6} width={x2 - x1} height={12} fill={color} />
      <rect x={x1} y={deck - th} width={x2 - x1} height={5} fill={color} />
      {new Array(spans * 6).fill(0).map((_, i) => {
        const a = x1 + (i * sw) / 6;
        const b = a + sw / 6;
        return <line key={i} x1={a} y1={deck - 2} x2={b} y2={deck - th + 2} stroke={color} strokeWidth={5} transform={i % 2 ? `translate(${sw / 6} 0) scale(-1 1) translate(${-2 * a - sw / 6} 0)` : undefined} />;
      })}
      {lights &&
        new Array(Math.floor((x2 - x1) / 38)).fill(0).map((_, i) => {
          const px = (((x1 + i * 38 + frame * 3) - x1) % (x2 - x1)) + x1;
          return <rect key={i} x={px} y={deck - 18} width={16} height={9} rx={3} fill={i % 3 === 0 ? C.red : C.amber} opacity={0.9} />;
        })}
    </g>
  );
};

/** Scatter of drifting specks inside a rect. */
export const Specks: React.FC<{x: number; y: number; w: number; h: number; n?: number; color?: string; seed?: number; frame: number; opacity?: number}> = ({
  x,
  y,
  w,
  h,
  n = 60,
  color = '#000',
  seed = 9,
  frame,
  opacity = 0.12,
}) => {
  const r = rng(seed);
  const pts = new Array(n).fill(0).map(() => ({x: r() * w, y: r() * h, s: 1 + r() * 2.4, ph: r() * 6.28}));
  return (
    <g opacity={opacity}>
      {pts.map((p, i) => (
        <circle key={i} cx={x + p.x + Math.sin(frame / 50 + p.ph) * 4} cy={y + p.y + Math.cos(frame / 60 + p.ph) * 3} r={p.s} fill={color} />
      ))}
    </g>
  );
};

/** Moves a value along keyframes: [[frame, value], ...] with ease. */
export const kf = (f: number, frames: number[], values: number[]) => interpolate(f, frames, values, clamp);
