import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, H, W} from '../theme';
import {Specks} from './svg';

/**
 * Cross-section of the river: sky band, water band, river bed, soil layers.
 * Geometry (default): sky 0..skyH, water skyH..bedY, soil bedY..H.
 */
export type XSProps = {
  variant: 'night' | 'paper';
  skyH?: number;
  bedY?: number;
  bankL?: number; // x where the river starts (left bank edge)
  bankR?: number; // x where the river ends
  children?: React.ReactNode; // drawn above soil, below water-surface overlays
  overlay?: React.ReactNode; // drawn on top of everything
  showCity?: boolean;
};

export const CrossSection: React.FC<XSProps> = ({variant, skyH = 300, bedY = 520, bankL = 160, bankR = 1760, children, overlay, showCity = true}) => {
  const f = useCurrentFrame();
  const night = variant === 'night';
  const soil = night ? [C.soilN1, C.soilN2, C.soilN3] : [C.ground, C.groundDeep, C.groundDeeper];
  const water = night ? ['#25305A', '#141A33'] : ['#D7E1EA', C.waterLight];
  const bank = night ? '#2A2131' : '#CDB993';
  const id = night ? 'n' : 'p';
  // river bed curve
  const bed = `M ${bankL - 60} ${skyH} C ${bankL + 120} ${skyH + 40}, ${bankL + 160} ${bedY}, ${bankL + 360} ${bedY} L ${bankR - 360} ${bedY} C ${bankR - 160} ${bedY}, ${bankR - 120} ${skyH + 40}, ${bankR + 60} ${skyH} Z`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id={`xs-sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          {night ? (
            <>
              <stop offset="0" stopColor={C.skyTop} />
              <stop offset="0.7" stopColor={C.skyLow} />
              <stop offset="1" stopColor={C.horizon} />
            </>
          ) : (
            <>
              <stop offset="0" stopColor={C.paper} />
              <stop offset="1" stopColor={C.paper2} />
            </>
          )}
        </linearGradient>
        <linearGradient id={`xs-water-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={water[0]} />
          <stop offset="1" stopColor={water[1]} />
        </linearGradient>
      </defs>
      <rect width={W} height={skyH} fill={`url(#xs-sky-${id})`} />
      {night && showCity && (
        <g fill={C.skyline}>
          {[60, 140, 210, 300, 1500, 1580, 1660, 1750, 1830].map((bx, i) => (
            <rect key={bx} x={bx} y={skyH - 40 - ((i * 37) % 70)} width={56} height={40 + ((i * 37) % 70)} />
          ))}
        </g>
      )}
      {/* soil layers */}
      <rect y={skyH} width={W} height={H - skyH} fill={soil[0]} />
      <path d={`M 0 ${bedY + 150} Q ${W / 2} ${bedY + 120} ${W} ${bedY + 160} L ${W} ${H} L 0 ${H} Z`} fill={soil[1]} />
      <path d={`M 0 ${bedY + 330} Q ${W / 2} ${bedY + 300} ${W} ${bedY + 340} L ${W} ${H} L 0 ${H} Z`} fill={soil[2]} />
      <Specks x={0} y={skyH} w={W} h={H - skyH} n={140} frame={f} color={night ? '#fff' : '#5A4636'} opacity={night ? 0.12 : 0.18} />
      {/* banks */}
      <rect x={0} y={skyH - 4} width={W} height={8} fill={bank} />
      {/* water */}
      <path d={bed} fill={`url(#xs-water-${id})`} />
      {new Array(9).fill(0).map((_, i) => {
        const yy = skyH + 30 + i * ((bedY - skyH - 60) / 9);
        const off = ((f * (0.8 + (i % 3) * 0.3) + i * 140) % 300) - 150;
        return (
          <g key={i} opacity={night ? 0.22 : 0.45}>
            {[0, 1, 2, 3, 4].map((k) => (
              <path key={k} d={`M ${bankL + 300 + k * 260 + off} ${yy} q 12 -6 24 0 t 24 0`} stroke={night ? '#9AA6D8' : '#98AFC4'} strokeWidth={2} fill="none" />
            ))}
          </g>
        );
      })}
      <line x1={bankL + 300} x2={bankR - 300} y1={bedY} y2={bedY} stroke={night ? '#59466A' : '#A68E6A'} strokeWidth={3} strokeDasharray="10 8" opacity={0.7} />
      {children}
      <rect x={0} y={skyH - 2} width={W} height={3} fill={night ? C.glow : '#9FB3C6'} opacity={night ? 0.45 : 0.6} />
      {overlay}
    </svg>
  );
};

/** Horizontal tunnel tube. */
export const Tube: React.FC<{x1: number; x2: number; y: number; h?: number; night?: boolean; glow?: number}> = ({x1, x2, y, h = 76, night = true, glow = 1}) =>
  x2 - x1 < 70 ? null : (
  <g>
    <rect x={x1} y={y - h / 2 - 8} width={x2 - x1} height={h + 16} rx={h / 2} fill={night ? '#6B6F84' : C.concrete} />
    <rect x={x1 + 6} y={y - h / 2} width={x2 - x1 - 12} height={h} rx={h / 2 - 4} fill={night ? '#16152A' : '#3B3950'} />
    <rect x={x1 + 30} y={y - h / 2 + 6} width={x2 - x1 - 60} height={3} fill={C.amber} opacity={0.45 * glow} />
    {new Array(Math.floor((x2 - x1) / 70)).fill(0).map((_, i) => (
      <line key={i} x1={x1 + 35 + i * 70} x2={x1 + 35 + i * 70} y1={y - h / 2 - 8} y2={y + h / 2 + 8} stroke={night ? '#55596E' : '#9496A0'} strokeWidth={2} />
    ))}
  </g>
);
