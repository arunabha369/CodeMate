import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT_BN, FONT_NUM} from '../theme';
import {enter, pop, prog} from '../anim';
import {World} from './text';
import {PHOTOS} from '../photos';

/** A dimension bracket with end ticks and a label bubble, drawn inside an <svg>. */
export const Bracket: React.FC<{x1: number; x2: number; y: number; at: number; color: string; label?: string; labelColor?: string; dashed?: boolean; size?: number}> = ({
  x1,
  x2,
  y,
  at,
  color,
  label,
  labelColor = '#fff',
  dashed = true,
  size = 34,
}) => {
  const f = useCurrentFrame();
  const p = prog(f, at, 16);
  const mx = (x1 + x2) / 2;
  const a = mx + (x1 - mx) * p;
  const b = mx + (x2 - mx) * p;
  const s = pop(f, at + 8);
  return (
    <g opacity={p > 0 ? 1 : 0}>
      <line x1={a} y1={y} x2={b} y2={y} stroke={color} strokeWidth={3} strokeDasharray={dashed ? '10 8' : undefined} strokeLinecap="round" />
      <line x1={a} y1={y - 14} x2={a} y2={y + 14} stroke={color} strokeWidth={3} strokeLinecap="round" />
      <line x1={b} y1={y - 14} x2={b} y2={y + 14} stroke={color} strokeWidth={3} strokeLinecap="round" />
      {label && (
        <g transform={`translate(${mx} ${y - 46}) scale(${s})`}>
          <circle r={size} fill={color} />
          <text y={size * 0.36} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={600} fontSize={size * 1.15} fill={labelColor}>
            {label}
          </text>
        </g>
      )}
    </g>
  );
};

/** Big Oswald number with a Bengali unit, e.g. a gap counter. */
export const BigNum: React.FC<{value: string; unit?: string; x: number; y: number; at: number; world: World; size?: number; color?: string}> = ({value, unit, x, y, at, world, size = 96, color}) => {
  const f = useCurrentFrame();
  const e = enter(f, at, 14, 16, 8);
  const col = color ?? (world === 'night' ? '#fff' : world === 'archive' ? C.archInk : C.ink);
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) ${e.transform}`, opacity: e.opacity, filter: e.filter, display: 'flex', alignItems: 'baseline', gap: 12}}>
      <span style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: size, lineHeight: 1, color: col}}>{value}</span>
      {unit && <span style={{fontFamily: FONT_BN, fontWeight: 700, fontSize: size * 0.36, color: col, opacity: 0.85}}>{unit}</span>}
    </div>
  );
};

/**
 * A real photograph in a drawn photo-corner card with a slow Ken Burns move, a world colour grade and
 * a credit line. If the photo slot has not been downloaded/cleared yet (see src/photos.ts), the
 * `fallback` illustration is shown instead, so the film always renders.
 */
export const PhotoCard: React.FC<{
  slot: string;
  x: number;
  y: number;
  w: number;
  h: number;
  at?: number;
  grade?: 'sepia' | 'night' | 'none';
  kb?: {from: [number, number, number]; to: [number, number, number]};
  dur?: number;
  rot?: number;
  fallback?: React.ReactNode;
  children?: React.ReactNode;
}> = ({slot, x, y, w, h, at = 0, grade = 'none', kb = {from: [1, 0, 0], to: [1.08, -20, -10]}, dur = 180, rot = 0, fallback, children}) => {
  const f = useCurrentFrame();
  const e = enter(f, at, 18, 26, 10);
  const photo = PHOTOS[slot];
  const t = Math.max(0, Math.min(1, (f - at) / dur));
  const z = kb.from[0] + (kb.to[0] - kb.from[0]) * t;
  const px = kb.from[1] + (kb.to[1] - kb.from[1]) * t;
  const py = kb.from[2] + (kb.to[2] - kb.from[2]) * t;
  const filter = grade === 'sepia' ? 'sepia(0.85) contrast(1.05) brightness(0.98)' : grade === 'night' ? 'saturate(0.8) brightness(0.78) contrast(1.08)' : undefined;
  if (!photo) return <>{fallback}</>;
  const corner = (cx: number, cy: number, r: number) => (
    <div style={{position: 'absolute', left: cx, top: cy, width: 44, height: 44, transform: `rotate(${r}deg)`, background: 'linear-gradient(135deg, #3A2E22 50%, transparent 50%)', opacity: 0.75}} />
  );
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, opacity: e.opacity, transform: `${e.transform} rotate(${rot}deg)`, filter: e.filter}}>
      <div style={{position: 'absolute', inset: 0, background: '#FBF6EA', borderRadius: 6, boxShadow: '0 24px 60px rgba(0,0,0,0.35)', padding: 14}}>
        <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 2}}>
          <Img src={staticFile(`photos/${photo.file}`)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${z}) translate(${px}px, ${py}px)`, filter}} />
          {children}
          <div style={{position: 'absolute', left: 10, bottom: 8, fontFamily: FONT_BN, fontSize: 18, fontWeight: 500, color: '#fff', opacity: 0.75, textShadow: '0 1px 3px rgba(0,0,0,0.8)'}}>
            ছবি: {photo.credit}
          </div>
        </div>
      </div>
      {corner(-6, -6, 0)}
      {corner(w - 38, -6, 90)}
      {corner(w - 38, h - 38, 180)}
      {corner(-6, h - 38, 270)}
    </div>
  );
};
