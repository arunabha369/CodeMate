import React from 'react';
import {C} from '../theme';
import {rng} from '../anim';

export type TBMProps = {
  x: number; // rear x
  y: number; // centre line
  len?: number;
  h?: number; // shield diameter
  rot?: number; // cutter rotation phase (frames)
  jack?: number; // 0..1 jack extension
  screw?: number; // screw stripe phase
  muck?: number; // 0..1 muck flow intensity
  silhouette?: boolean; // night hero silhouette
  highlight?: string | null; // 'cutter' | 'chamber' | 'screw' | 'erector' | 'gantry'
  dim?: number;
  rings?: number; // number of lining rings drawn behind the shield
};

const hl = (on: boolean) => (on ? {filter: 'drop-shadow(0 0 10px rgba(240,166,58,0.9))'} : {});

export const TBM: React.FC<TBMProps> = ({x, y, len = 1000, h = 240, rot = 0, jack = 0, screw = 0, muck = 0, silhouette = false, highlight = null, rings = 6}) => {
  const shieldX = x + len * 0.36;
  const front = x + len;
  const top = y - h / 2;
  const bot = y + h / 2;
  const steel = silhouette ? '#2B2846' : C.steel;
  const steelL = silhouette ? '#3A3658' : C.steelLight;
  const inner = silhouette ? '#1D1B33' : '#E9E4DA';
  const teeth = 9;
  const r = rng(4);
  const muckPts = new Array(26).fill(0).map(() => ({a: r(), b: r(), s: 3 + r() * 4}));
  // screw path from chamber bottom to rear-top
  const sx1 = front - 110;
  const sy1 = bot - 34;
  const sx2 = shieldX + 120;
  const sy2 = y - 30;
  return (
    <g>
      {/* lining rings behind shield */}
      {new Array(rings).fill(0).map((_, i) => {
        const rx = shieldX - (i + 1) * 46;
        if (rx < x - 40) return null;
        return (
          <g key={i}>
            <rect x={rx} y={top - 4} width={42} height={22} fill={silhouette ? '#3A3658' : C.concrete} />
            <rect x={rx} y={bot - 18} width={42} height={22} fill={silhouette ? '#3A3658' : C.concrete} />
          </g>
        );
      })}
      {/* gantry */}
      <g style={hl(highlight === 'gantry')}>
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <rect x={x + 10 + k * 115} y={y - 40} width={100} height={78} rx={6} fill={silhouette ? '#26233F' : '#8C8FA3'} />
            <rect x={x + 22 + k * 115} y={y - 28} width={36} height={22} rx={3} fill={silhouette ? C.amber : '#DADCE4'} opacity={silhouette ? 0.5 : 1} />
            <circle cx={x + 30 + k * 115} cy={y + 46} r={9} fill={steel} />
            <circle cx={x + 90 + k * 115} cy={y + 46} r={9} fill={steel} />
          </g>
        ))}
      </g>
      {/* shield body */}
      <rect x={shieldX} y={top} width={front - shieldX - 20} height={h} rx={18} fill={steel} />
      <rect x={shieldX + 10} y={top + 16} width={front - shieldX - 46} height={h - 32} rx={10} fill={inner} />
      {/* jacks */}
      {[top + 40, bot - 40].map((jy, i) => (
        <g key={i}>
          <rect x={shieldX + 10} y={jy - 9} width={70} height={18} rx={4} fill={steelL} />
          <rect x={shieldX + 10 - 40 * jack} y={jy - 5} width={60 + 40 * jack} height={10} rx={3} fill={silhouette ? '#555' : '#C9CCD6'} />
          <rect x={shieldX + 4 - 40 * jack} y={jy - 14} width={8} height={28} rx={2} fill={steel} />
        </g>
      ))}
      {/* erector */}
      <g style={hl(highlight === 'erector')}>
        <circle cx={shieldX + 150} cy={y} r={26} fill={steelL} />
        <rect x={shieldX + 142} y={top + 20} width={16} height={y - top - 20} fill={steelL} />
        <rect x={shieldX + 118} y={top + 18} width={64} height={18} rx={4} fill={C.concrete} />
      </g>
      {/* screw conveyor */}
      <g style={hl(highlight === 'screw')}>
        <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} stroke={steelL} strokeWidth={34} strokeLinecap="round" />
        <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} stroke={silhouette ? '#1D1B33' : '#5D6176'} strokeWidth={26} strokeLinecap="round" strokeDasharray="10 12" strokeDashoffset={-screw} />
      </g>
      {/* bulkhead + chamber */}
      <g style={hl(highlight === 'chamber')}>
        <rect x={front - 150} y={top + 16} width={14} height={h - 32} fill={steelL} />
        <rect x={front - 136} y={top + 16} width={96} height={h - 32} fill={silhouette ? '#3B2F3E' : '#B79A72'} />
        {muckPts.map((p, i) => {
          const px = front - 132 + p.a * 86;
          const py = top + 22 + ((p.b * (h - 44) + muck * 400 * (0.5 + p.a)) % (h - 44));
          return <circle key={i} cx={px} cy={py} r={p.s} fill={silhouette ? '#5A4636' : C.mudDark} opacity={0.75} />;
        })}
      </g>
      {/* cutter head */}
      <g style={hl(highlight === 'cutter')}>
        <rect x={front - 40} y={top - 8} width={30} height={h + 16} rx={10} fill={silhouette ? '#3A3658' : '#5D6176'} />
        {new Array(teeth).fill(0).map((_, i) => {
          const ph = ((i / teeth + rot / 60) % 1 + 1) % 1;
          const ty = top - 4 + ph * (h + 8);
          const vis = Math.sin(ph * Math.PI);
          return <path key={i} d={`M ${front - 12} ${ty - 9} L ${front + 6 + 12 * vis} ${ty} L ${front - 12} ${ty + 9} Z`} fill={silhouette ? C.amber : '#D9DCE6'} opacity={0.4 + 0.6 * vis} />;
        })}
        <circle cx={front - 25} cy={y} r={14} fill={silhouette ? C.amber : C.orange} opacity={0.9} />
      </g>
      {silhouette && <rect x={shieldX} y={top} width={front - shieldX - 20} height={4} fill={C.glow} opacity={0.6} rx={2} />}
    </g>
  );
};

/** Front-view lining ring built from `n` segments. built: 0..n (fractional = segment flying in). */
export const Ring: React.FC<{cx: number; cy: number; R?: number; r?: number; n?: number; built: number; highlightJoint?: number}> = ({
  cx,
  cy,
  R = 250,
  r = 205,
  n = 6,
  built,
  highlightJoint,
}) => {
  const segs = [];
  const gap = 1.6;
  for (let i = 0; i < n; i++) {
    const p = Math.max(0, Math.min(1, built - i));
    if (p <= 0) continue;
    const a0 = ((i * 360) / n - 90 + gap / 2) * (Math.PI / 180);
    const a1 = (((i + 1) * 360) / n - 90 - gap / 2) * (Math.PI / 180);
    const pt = (a: number, rr: number) => [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
    const [ox0, oy0] = pt(a0, R);
    const [ox1, oy1] = pt(a1, R);
    const [ix1, iy1] = pt(a1, r);
    const [ix0, iy0] = pt(a0, r);
    const d = `M ${ox0} ${oy0} A ${R} ${R} 0 0 1 ${ox1} ${oy1} L ${ix1} ${iy1} A ${r} ${r} 0 0 0 ${ix0} ${iy0} Z`;
    const mid = (a0 + a1) / 2;
    const fly = (1 - p) * 260;
    const dx = Math.cos(mid) * fly;
    const dy = Math.sin(mid) * fly + (1 - p) * 120;
    segs.push(
      <g key={i} transform={`translate(${dx} ${dy})`} opacity={Math.min(1, p * 2)}>
        <path d={d} fill={i % 2 ? C.concreteLight : C.concrete} stroke="#8E909A" strokeWidth={2} />
      </g>,
    );
  }
  return (
    <g>
      <circle cx={cx} cy={cy} r={(R + r) / 2} fill="none" stroke={C.paperLine} strokeWidth={R - r} strokeDasharray="8 10" opacity={0.6} />
      {segs}
      {highlightJoint !== undefined && (
        <circle cx={cx + Math.cos(-Math.PI / 2 + (Math.PI * 2 * 1) / 6) * ((R + r) / 2)} cy={cy + Math.sin(-Math.PI / 2 + (Math.PI * 2 * 1) / 6) * ((R + r) / 2)} r={40} fill="none" stroke={C.orange} strokeWidth={5} opacity={highlightJoint} />
      )}
    </g>
  );
};
