import React, {useMemo} from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';

/**
 * <HowrahBridge>: an original, parametric drawing of a balanced-cantilever K-truss bridge with the
 * Howrah silhouette. Geometry comes from the real proportions in research/facts.md:
 *   main span ~457 m (towers at ±228.5 m), anchor arms ~99 m, cantilever arms ~143 m,
 *   suspended span ~172 m (two halves of ~86 m), total ~705 m, towers ~82 m above the piers.
 * Heights are drawn with a vertical exaggeration (`vex`) for legibility.
 *
 * Every part can build itself: anchor arms grow from the anchor pier toward the tower, cantilever arms from
 * the tower toward the river, and the suspended halves from each tip toward the centre. This is the erection
 * order described in the sources ("commencing at the two anchor spans and advancing towards the centre").
 */

export type Part = 'piers' | 'towers' | 'anchor' | 'cantilever' | 'suspended' | 'deck';
export type Theme = 'night' | 'paper' | 'archive';

// ---------- geometry (metres; x from the bridge centre, h = height above the deck) ----------
export const G = {
  half: 352.5, // 705 / 2
  tower: 228.5, // 457 / 2
  anchorEnd: 327.5, // tower + 99
  tip: 85.5, // tower − 143  (= half of the 172 m suspended span)
  T: 74, // tower top above the deck
  tipH: 19,
  midH: 27,
  anchorH: 15,
  approachH: 4,
  water: 9, // water level below the deck
  ground: 7, // bank level below the deck
};

export const PANELS = {suspended: 11, cantilever: 18, anchor: 12, approach: 3};
/** Coarser panelling for small-scale (full-bridge) views, so the truss reads as K-panels and not as hatching. */
export const PANELS_LO = {suspended: 7, cantilever: 11, anchor: 8, approach: 2};

/** Top-chord height (m above deck) at |x| metres from the centre. */
export const topH = (xm: number) => {
  const x = Math.abs(xm);
  if (x <= G.tip) return G.tipH + (G.midH - G.tipH) * (1 - (x / G.tip) ** 2);
  if (x <= G.tower) {
    const u = (x - G.tip) / (G.tower - G.tip);
    return G.tipH + (G.T - G.tipH) * u ** 1.45;
  }
  if (x <= G.anchorEnd) {
    const v = (x - G.tower) / (G.anchorEnd - G.tower);
    return G.anchorH + (G.T - G.anchorH) * (1 - v) ** 1.45;
  }
  return G.approachH;
};

type Seg = {part: Part; k: number; n: number; d: string; kind: 'chord' | 'vert' | 'diag' | 'tower'; side: -1 | 1};
type Pt = {x: number; h: number};

const panelPoints = (a: number, b: number, n: number): number[] => Array.from({length: n + 1}, (_, i) => a + ((b - a) * i) / n);

/** Build member list for one side (side = +1 right, −1 left) in metres. */
const buildSegments = (PN: typeof PANELS): Seg[] => {
  const segs: Seg[] = [];
  const P = (x: number, h: number): Pt => ({x, h});
  const L = (p: Pt, q: Pt) => `M ${p.x} ${-p.h} L ${q.x} ${-q.h}`;
  for (const side of [1, -1] as const) {
    const arm = (part: Part, from: number, to: number, n: number, kOpensForward: boolean) => {
      const xs = panelPoints(from, to, n);
      for (let k = 0; k < n; k++) {
        const xa = xs[k] * side;
        const xb = xs[k + 1] * side;
        const ha = topH(xs[k]);
        const hb = topH(xs[k + 1]);
        const A0 = P(xa, 0);
        const A1 = P(xa, ha);
        const B0 = P(xb, 0);
        const B1 = P(xb, hb);
        // K-panel: from the mid-height of one vertical to the top and bottom of the other
        const mid = kOpensForward ? P(xb, hb / 2) : P(xa, ha / 2);
        const t1 = kOpensForward ? A1 : B1;
        const t0 = kOpensForward ? A0 : B0;
        if (k === 0) segs.push({part, k, n, d: L(A0, A1), kind: 'vert', side});
        segs.push({part, k, n, d: L(A1, B1), kind: 'chord', side});
        segs.push({part, k, n, d: L(A0, B0), kind: 'chord', side});
        segs.push({part, k, n, d: L(B0, B1), kind: 'vert', side});
        segs.push({part, k, n, d: L(mid, t1), kind: 'diag', side});
        segs.push({part, k, n, d: L(mid, t0), kind: 'diag', side});
      }
    };
    // build order: anchor pier → tower, tower → tip, tip → centre
    arm('anchor', G.anchorEnd, G.tower, PN.anchor, false);
    arm('cantilever', G.tower, G.tip, PN.cantilever, true);
    arm('suspended', G.tip, 0, PN.suspended, true);
    // short approach girder (part of the deck)
    const ax = panelPoints(G.half, G.anchorEnd, PN.approach);
    for (let k = 0; k < PN.approach; k++) {
      const a = ax[k] * side;
      const b = ax[k + 1] * side;
      segs.push({part: 'deck', k, n: PN.approach, d: L(P(a, G.approachH), P(b, G.approachH)), kind: 'chord', side});
      segs.push({part: 'deck', k, n: PN.approach, d: L(P(b, 0), P(b, G.approachH)), kind: 'vert', side});
      segs.push({part: 'deck', k, n: PN.approach, d: L(P(a, 0), P(b, G.approachH)), kind: 'diag', side});
    }
  }
  return segs;
};

const SEGS_HI = buildSegments(PANELS);
const SEGS_LO = buildSegments(PANELS_LO);
/** Panel points along the top chord (for lights / rivets / cranes), right side only; mirror for left. */
const topPoints = (PN: typeof PANELS) => {
  const out: {x: number; part: Part; k: number; n: number}[] = [];
  const add = (part: Part, from: number, to: number, n: number) => panelPoints(from, to, n).forEach((x, k) => out.push({x, part, k, n}));
  add('anchor', G.anchorEnd, G.tower, PN.anchor);
  add('cantilever', G.tower, G.tip, PN.cantilever);
  add('suspended', G.tip, 0, PN.suspended);
  return out;
};
const TOP_HI = topPoints(PANELS);
const TOP_LO = topPoints(PANELS_LO);

// ---------- props ----------
export type BridgeParts = {piers?: number; towers?: number; anchor?: number; cantilever?: number; suspended?: number; deck?: number; lights?: number};

export type HowrahBridgeProps = {
  /** screen x of the bridge centre */
  x: number;
  /** screen y of the deck */
  y: number;
  /** pixels per metre */
  s: number;
  /** vertical exaggeration */
  vex?: number;
  theme: Theme;
  /** 0..1 per part (default: complete) */
  parts?: BridgeParts;
  highlight?: Part | Part[] | null;
  /** fade non-highlighted parts to this opacity */
  dimOthers?: number;
  traffic?: boolean;
  cranes?: boolean;
  rivets?: boolean;
  site?: boolean;
  reflection?: boolean;
  gapGlow?: number;
  /** override base member colour */
  color?: string;
  opacity?: number;
  /** draw only one side: +1 right, −1 left */
  only?: 1 | -1;
  /** draw the faint far truss for depth (default true) */
  depth?: boolean;
  /** panel density; default picks 'lo' below 3 px/m */
  detail?: 'hi' | 'lo';
};

const FULL: Required<BridgeParts> = {piers: 1, towers: 1, anchor: 1, cantilever: 1, suspended: 1, deck: 1, lights: 0};

export const themeColors = (theme: Theme) =>
  theme === 'night'
    ? {member: '#7A7FB8', memberHi: C.amber, pier: '#3A3B62', deck: '#161731', ground: '#1A1A30', water: 'transparent', light: '#FFD38A'}
    : theme === 'archive'
      ? {member: C.archInk, memberHi: C.archAccent, pier: '#9C8A6C', deck: C.archInk, ground: '#D2BF98', water: C.archWater, light: '#FFE2A0'}
      : {member: C.steel, memberHi: C.orange, pier: C.concrete, deck: C.ink, ground: C.ground, water: C.waterLight, light: C.amber};

/** Screen-space helpers so scenes can place labels, arrows and cranes on the bridge. */
export const bridgeSpace = (p: Pick<HowrahBridgeProps, 'x' | 'y' | 's' | 'vex'>) => {
  const vex = p.vex ?? 1.35;
  return {
    X: (m: number) => p.x + m * p.s,
    Y: (hm: number) => p.y - hm * p.s * vex,
    top: (m: number) => p.y - topH(m) * p.s * vex,
    vex,
  };
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const HowrahBridge: React.FC<HowrahBridgeProps> = (props) => {
  const {x, y, s, theme, highlight = null, dimOthers = 0.3, traffic = false, cranes = false, rivets = false, site = false, reflection = false, gapGlow = 0, only} = props;
  const vex = props.vex ?? 1.35;
  const f = useCurrentFrame();
  const parts = {...FULL, ...(props.parts ?? {})};
  const col = themeColors(theme);
  const member = props.color ?? col.member;
  const his: Part[] = highlight ? (Array.isArray(highlight) ? highlight : [highlight]) : [];
  const sw = {chord: Math.max(2.8, s * 1.15), vert: Math.max(1.4, s * 0.5), diag: Math.max(1.6, s * 0.56), tower: Math.max(4, s * 2.1)};

  const progressOf = (part: Part) => (part === 'deck' ? parts.deck : part === 'anchor' ? parts.anchor : part === 'cantilever' ? parts.cantilever : part === 'suspended' ? parts.suspended : 1);

  const lo = props.detail === 'lo' || (props.detail === undefined && s < 3);
  const segEls = useMemo(() => (lo ? SEGS_LO : SEGS_HI).filter((g) => !only || g.side === only), [only, lo]);
  const TOP_POINTS = lo ? TOP_LO : TOP_HI;

  const body = (forReflection: boolean, membersOnly = false) => {
    const els: React.ReactNode[] = [];
    // piers (caisson tops) under the towers and anchor ends
    if (parts.piers > 0 && !membersOnly) {
      for (const side of [1, -1] as const) {
        if (only && side !== only) continue;
        const pw = 24;
        els.push(
          <rect key={`pier${side}`} x={side * G.tower - pw / 2} y={-2} width={pw} height={(G.water + 6) * parts.piers} fill={col.pier} opacity={0.95} />,
          <rect key={`apier${side}`} x={side * G.anchorEnd - 7} y={-1} width={14} height={(G.ground + 1) * parts.piers} fill={col.pier} opacity={0.9} />,
        );
      }
    }
    // deck slab (road) under the bottom chord, with a thin lit edge
    if (parts.deck > 0 && !membersOnly) {
      const w = G.half * 2 * parts.deck;
      els.push(<rect key="deck" x={-w / 2} y={0} width={w} height={2.6} fill={col.deck} />);
      els.push(<rect key="deckedge" x={-w / 2} y={0} width={w} height={0.5} fill={theme === 'night' ? '#8E92C8' : member} opacity={0.7} />);
    }
    // towers: grow from the pier upward
    if (parts.towers > 0 && !membersOnly) {
      for (const side of [1, -1] as const) {
        if (only && side !== only) continue;
        const h = G.T * parts.towers;
        const hi = his.includes('towers');
        els.push(
          <g key={`tw${side}`}>
            {hi && <line x1={side * G.tower} y1={G.water} x2={side * G.tower} y2={-h} stroke={col.memberHi} strokeWidth={(sw.tower * 3.2) / s} opacity={0.25} vectorEffect="none" />}
            <line
              x1={side * G.tower}
              y1={G.water}
              x2={side * G.tower}
              y2={-h}
              stroke={hi ? col.memberHi : member}
              strokeWidth={sw.tower / s}
              opacity={his.length && !hi ? dimOthers : 1}
              strokeLinecap="round"
            />
            {/* tower cap */}
            {parts.towers > 0.98 && <rect x={side * G.tower - 2.6} y={-G.T - 2.2} width={5.2} height={2.6} fill={hi ? col.memberHi : member} opacity={his.length && !hi ? dimOthers : 1} />}
          </g>,
        );
      }
    }
    // translucent envelope between the chords, revealed with the build (gives the truss visual mass)
    if (!membersOnly) {
      for (const side of [1, -1] as const) {
        if (only && side !== only) continue;
        const env = (part: Part, from: number, to: number) => {
          const p = progressOf(part);
          if (p <= 0) return null;
          const end = from + (to - from) * p;
          const n = 24;
          const pts = Array.from({length: n + 1}, (_, i) => from + ((end - from) * i) / n);
          const d = `M ${side * from} 0 ` + pts.map((xm) => `L ${side * xm} ${-topH(xm)}`).join(' ') + ` L ${side * end} 0 Z`;
          const hi = his.includes(part);
          return <path key={`env${part}${side}`} d={d} fill={hi ? col.memberHi : member} opacity={(his.length && !hi ? dimOthers : 1) * (theme === 'night' ? 0.07 : 0.06)} />;
        };
        els.push(env('anchor', G.anchorEnd, G.tower), env('cantilever', G.tower, G.tip), env('suspended', G.tip, 0));
      }
    }
    // truss members, panel by panel
    for (let i = 0; i < segEls.length; i++) {
      const g = segEls[i];
      const p = progressOf(g.part);
      if (p <= 0) continue;
      const lp = clamp01(p * g.n - g.k);
      if (lp <= 0) continue;
      const hi = his.includes(g.part);
      const op = his.length && !hi ? dimOthers : 1;
      const w = sw[g.kind] / s;
      const stroke = hi ? col.memberHi : member;
      const draw = lp < 1 ? {pathLength: 1, strokeDasharray: '1 1', strokeDashoffset: 1 - lp} : {};
      els.push(
        <g key={i}>
          {hi && !forReflection && <path d={g.d} stroke={col.memberHi} strokeWidth={w * 3.4} opacity={0.18} fill="none" strokeLinecap="round" {...draw} />}
          <path d={g.d} stroke={stroke} strokeWidth={w * (hi ? 1.35 : 1)} opacity={op} fill="none" strokeLinecap="round" {...draw} />
        </g>,
      );
    }
    return els;
  };

  // lights along the top chord (night), rivets at panel points
  const dots = (lightsK: number, rivetsOn: boolean) => {
    const out: React.ReactNode[] = [];
    TOP_POINTS.forEach((tp, i) => {
      for (const side of [1, -1] as const) {
        if (only && side !== only) continue;
        const prog = progressOf(tp.part);
        if (prog * tp.n < tp.k + 0.99 && !(tp.k === 0 && prog > 0)) continue;
        const cx = side * tp.x;
        const cy = -topH(tp.x);
        if (lightsK > 0) {
          const tw = 0.6 + 0.4 * Math.sin(f / 9 + i * 1.7 + side);
          out.push(<circle key={`l${i}${side}`} cx={cx} cy={cy} r={Math.max(0.9, 2.6 / s)} fill={col.light} opacity={lightsK * tw} />);
          out.push(<circle key={`lg${i}${side}`} cx={cx} cy={cy} r={Math.max(2.2, 7 / s)} fill={col.light} opacity={lightsK * tw * 0.18} />);
        }
        if (rivetsOn) {
          out.push(<circle key={`r${i}${side}`} cx={cx} cy={cy} r={Math.max(0.35, 1.6 / s)} fill={member} />);
          out.push(<circle key={`rb${i}${side}`} cx={cx} cy={0} r={Math.max(0.35, 1.6 / s)} fill={member} />);
        }
      }
    });
    return out;
  };

  // creeper cranes riding the front of each growing arm (drawn in screen space so their shape is not stretched)
  const craneEls: React.ReactNode[] = [];
  if (cranes) {
    const front = (part: Part, from: number, to: number) => {
      const p = progressOf(part);
      if (p <= 0 || p >= 1) return null;
      return from + (to - from) * p;
    };
    const fxm = front('suspended', G.tip, 0) ?? front('cantilever', G.tower, G.tip) ?? front('anchor', G.anchorEnd, G.tower);
    if (fxm !== null) {
      for (const side of [1, -1] as const) {
        if (only && side !== only) continue;
        const back = side * (fxm + 6); // sit about one panel behind the open edge
        const sx = x + back * s;
        const sy = y - topH(back) * s * vex;
        const ax = x + (back - 4) * s;
        const ay = y - topH(back - 4) * s * vex;
        const bx = x + (back + 4) * s;
        const by = y - topH(back + 4) * s * vex;
        const slope = (Math.atan2(by - ay, bx - ax) * 180) / Math.PI;
        craneEls.push(<CreeperCrane key={`cr${side}`} sx={sx} sy={sy} dir={side === 1 ? -1 : 1} u={Math.max(3.2, s * 1.25)} color={theme === 'night' ? '#C9CCF0' : member} lamp={col.light} frame={f} slope={slope * 0.15} />);
      }
    }
  }

  const gapEl =
    gapGlow > 0 ? <ellipse cx={0} cy={-G.tipH * 0.45} rx={G.tip * 0.75} ry={G.tipH * 0.9} fill={`url(#hb${Math.round(x)}_${Math.round(y)}_${Math.round(s * 100)}_${theme}-gg)`} opacity={gapGlow * (0.85 + 0.15 * Math.sin(f / 14))} /> : null;

  const trafficEls: React.ReactNode[] = [];
  if (traffic && parts.deck >= 1) {
    for (let i = 0; i < 26; i++) {
      const dir = i % 2 === 0 ? 1 : -1;
      const speed = 0.9 + ((i * 7) % 5) * 0.12;
      const span = G.half * 2;
      const pos = ((i * 61 + f * speed * 2.2) % span) - G.half;
      const xm = dir * pos;
      trafficEls.push(<rect key={`t${i}`} x={xm - 1.8} y={-1.6 - (dir > 0 ? 0 : 0.2)} width={3.6} height={1.4} rx={0.6} fill={dir > 0 ? '#FFE7B0' : '#FF6A5A'} opacity={0.9} />);
    }
  }

  const siteEls = site ? <Site theme={theme} col={col} frame={f} /> : null;

  const tf = `translate(${x} ${y}) scale(${s} ${s * vex})`;
  const uid = `hb${Math.round(x)}_${Math.round(y)}_${Math.round(s * 100)}_${theme}`;
  // far truss: the second (back) truss of the through-bridge, offset up and right for a hint of depth
  const farTf = `translate(${x + 5 * s} ${y - 3.2 * s * vex}) scale(${s} ${s * vex})`;
  // stroke widths are specified in metres-scaled units; the non-uniform scale is fine for thin lines
  return (
    <g opacity={props.opacity ?? 1}>
      {siteEls && <g transform={`translate(${x} ${y}) scale(${s} ${s * vex})`}>{siteEls}</g>}
      <defs>
        <linearGradient id={`${uid}-rg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={1} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <mask id={`${uid}-rm`} maskUnits="userSpaceOnUse" x={0} y={y + G.water * s * vex} width={4000} height={2000}>
          <rect x={-2000} y={y + G.water * s * vex} width={6000} height={G.T * s * vex * 0.75} fill={`url(#${uid}-rg)`} />
        </mask>
        <radialGradient id={`${uid}-gg`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={theme === 'night' ? '#FFD9A0' : C.amber} stopOpacity={0.55} />
          <stop offset="0.45" stopColor={theme === 'night' ? C.amber : C.orange} stopOpacity={0.22} />
          <stop offset="1" stopColor={theme === 'night' ? C.amber : C.orange} stopOpacity={0} />
        </radialGradient>
      </defs>
      {reflection && (
        <g mask={`url(#${uid}-rm)`}>
          <g transform={`translate(${x} ${y + G.water * s * vex * 2}) scale(${s} ${-s * vex * 0.85})`} opacity={0.22}>
            {body(true)}
          </g>
        </g>
      )}
      {props.depth !== false && (
        <g transform={farTf} opacity={theme === 'night' ? 0.32 : 0.22}>
          {body(true, true)}
        </g>
      )}
      <g transform={tf}>
        {gapEl}
        {body(false)}
        {trafficEls}
        {dots(parts.lights, rivets)}
      </g>
      {craneEls}
    </g>
  );
};

/** Ground and river under the bridge for the paper/archive worlds. */
const Site: React.FC<{theme: Theme; col: ReturnType<typeof themeColors>; frame: number}> = ({theme, col, frame}) => {
  const bank = G.tower - 6;
  const far = 1400;
  return (
    <g>
      <path
        d={`M ${-far} ${G.ground} L ${-bank - 14} ${G.ground} Q ${-bank} ${G.ground} ${-bank + 6} ${G.water + 4} L ${-bank + 10} 60 L ${-far} 60 Z`}
        fill={col.ground}
      />
      <path d={`M ${far} ${G.ground} L ${bank + 14} ${G.ground} Q ${bank} ${G.ground} ${bank - 6} ${G.water + 4} L ${bank - 10} 60 L ${far} 60 Z`} fill={col.ground} />
      <rect x={-bank + 4} y={G.water} width={(bank - 4) * 2} height={60} fill={col.water} />
      {theme !== 'night' && <line x1={-bank + 4} y1={G.water} x2={bank - 4} y2={G.water} stroke={theme === 'archive' ? C.archLine : '#AFC0CF'} strokeWidth={0.6} />}
      {theme !== 'night' &&
        [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const yy = G.water + 3 + (i % 4) * 3.2;
          const xx = -bank + 30 + ((i * 97 + frame * (0.35 + (i % 3) * 0.12)) % ((bank - 30) * 2 - 40));
          return <line key={i} x1={xx} y1={yy} x2={xx + 18 + (i % 3) * 8} y2={yy} stroke={theme === 'archive' ? C.archLine : '#9FB3C6'} strokeWidth={0.35} strokeLinecap="round" />;
        })}
    </g>
  );
};

/**
 * A creeper crane: it sits on the top chord at (sx, sy) in screen pixels and crawls forward panel by panel.
 * The jib reaches over the open edge, and a member hangs from the hook. `u` is pixels per metre.
 */
export const CreeperCrane: React.FC<{sx: number; sy: number; dir: 1 | -1; u: number; color: string; lamp: string; frame: number; load?: number; slope?: number}> = ({
  sx,
  sy,
  dir,
  u,
  color,
  lamp,
  frame,
  load = 1,
  slope = 0,
}) => {
  const blink = Math.sin(frame / 7) > 0.1 ? 1 : 0.2;
  const mastH = 11 * u;
  const jib = 17 * u;
  const cj = 6 * u;
  const lift = 0.5 + 0.5 * Math.sin(frame / 26);
  const cable = (6 + 7 * lift) * u;
  const jx = dir * jib;
  const jy = -mastH - 1.5 * u;
  const lw = Math.max(1.4, u * 0.55);
  return (
    <g transform={`translate(${sx} ${sy}) rotate(${slope})`}>
      {/* trolley on the chord */}
      <rect x={-4.5 * u} y={-2.4 * u} width={9 * u} height={2.2 * u} rx={0.6 * u} fill={color} />
      <circle cx={-2.8 * u} cy={-0.2 * u} r={1 * u} fill={color} />
      <circle cx={2.8 * u} cy={-0.2 * u} r={1 * u} fill={color} />
      {/* mast (lattice) */}
      <g stroke={color} strokeWidth={lw} fill="none" strokeLinecap="round">
        <line x1={-1.4 * u} y1={-2.4 * u} x2={-1.4 * u} y2={-mastH} />
        <line x1={1.4 * u} y1={-2.4 * u} x2={1.4 * u} y2={-mastH} />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={-1.4 * u} y1={-2.4 * u - i * 2.2 * u} x2={1.4 * u} y2={-2.4 * u - (i + 1) * 2.2 * u} />
        ))}
        {/* jib + counter-jib */}
        <line x1={0} y1={-mastH} x2={jx} y2={jy} strokeWidth={lw * 1.4} />
        <line x1={0} y1={-mastH} x2={-dir * cj} y2={-mastH + 0.5 * u} strokeWidth={lw * 1.4} />
        {/* A-frame ties */}
        <line x1={0} y1={-mastH - 4 * u} x2={jx} y2={jy} strokeWidth={lw * 0.7} />
        <line x1={0} y1={-mastH - 4 * u} x2={-dir * cj} y2={-mastH + 0.5 * u} strokeWidth={lw * 0.7} />
        <line x1={0} y1={-mastH} x2={0} y2={-mastH - 4 * u} />
        {/* hoist cable */}
        <line x1={jx} y1={jy} x2={jx} y2={jy + cable} strokeWidth={lw * 0.6} />
      </g>
      <rect x={-dir * cj - (dir > 0 ? 2.4 * u : 0)} y={-mastH + 0.2 * u} width={2.4 * u} height={2.6 * u} fill={color} />
      {/* hanging member */}
      {load > 0 && (
        <g transform={`translate(${jx} ${jy + cable}) rotate(${Math.sin(frame / 31) * 3})`} opacity={load}>
          <path d={`M ${-0.8 * u} 0 L ${0.8 * u} 0 L 0 ${1.4 * u} Z`} fill={color} />
          <rect x={-5 * u} y={1.4 * u} width={10 * u} height={1.3 * u} rx={0.3 * u} fill={color} />
        </g>
      )}
      {/* warning lamp */}
      <circle cx={jx} cy={jy} r={1.1 * u} fill={lamp} opacity={blink} />
      <circle cx={jx} cy={jy} r={3 * u} fill={lamp} opacity={blink * 0.22} />
    </g>
  );
};
