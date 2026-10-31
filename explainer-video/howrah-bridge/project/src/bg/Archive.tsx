import React, {useMemo} from 'react';
import {C, H, W} from '../theme';
import {rng} from '../anim';

/**
 * ARCHIVE world: aged sepia drafting paper from the 1870s–1940s. It has a faint ruled grid, paper grain,
 * foxing spots, a slow-moving light leak and drifting dust, so it is never fully static.
 */
export const Archive: React.FC<{frame: number}> = ({frame}) => {
  const grain = useMemo(() => {
    const r = rng(91);
    return new Array(900).fill(0).map(() => ({x: r() * W, y: r() * H, r: 0.6 + r() * 1.4, o: 0.05 + r() * 0.12, d: r() < 0.5}));
  }, []);
  const fox = useMemo(() => {
    const r = rng(17);
    return new Array(14).fill(0).map(() => ({x: r() * W, y: r() * H, r: 18 + r() * 70, o: 0.04 + r() * 0.06}));
  }, []);
  const dust = useMemo(() => {
    const r = rng(303);
    return new Array(22).fill(0).map(() => ({x: r() * W, y: r() * H, s: 1 + r() * 1.8, v: 0.1 + r() * 0.3, o: 0.12 + r() * 0.2}));
  }, []);
  const lx = 600 + Math.sin(frame / 170) * 380;
  const ly = 380 + Math.cos(frame / 230) * 120;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
      <defs>
        <radialGradient id="ar-vig" cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity={0} />
          <stop offset="1" stopColor="#3B2A16" stopOpacity={0.32} />
        </radialGradient>
        <radialGradient id="ar-leak" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF3D6" stopOpacity={0.55} />
          <stop offset="1" stopColor="#FFF3D6" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="ar-fox" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#9C7A48" stopOpacity={1} />
          <stop offset="1" stopColor="#9C7A48" stopOpacity={0} />
        </radialGradient>
        <pattern id="ar-grid" width={48} height={48} patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke={C.archLine} strokeWidth={0.8} opacity={0.35} />
        </pattern>
        <pattern id="ar-grid5" width={240} height={240} patternUnits="userSpaceOnUse">
          <path d="M 240 0 L 0 0 0 240" fill="none" stroke={C.archLine} strokeWidth={1.4} opacity={0.35} />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={C.archBg} />
      <rect width={W} height={H} fill="url(#ar-grid)" />
      <rect width={W} height={H} fill="url(#ar-grid5)" />
      {fox.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="url(#ar-fox)" opacity={d.o} />
      ))}
      <ellipse cx={lx} cy={ly} rx={760} ry={460} fill="url(#ar-leak)" />
      {grain.map((g, i) => (
        <circle key={i} cx={g.x} cy={g.y} r={g.r} fill={g.d ? '#6B5236' : '#FFF8E8'} opacity={g.o} />
      ))}
      {dust.map((d, i) => {
        const y = (((d.y - frame * d.v) % H) + H) % H;
        return <circle key={i} cx={d.x + Math.sin(frame / 70 + i) * 12} cy={y} r={d.s} fill="#5B4632" opacity={d.o} />;
      })}
      <rect x={30} y={30} width={W - 60} height={H - 60} fill="none" stroke={C.archLine} strokeWidth={2} opacity={0.7} />
      <rect x={40} y={40} width={W - 80} height={H - 80} fill="none" stroke={C.archLine} strokeWidth={1} opacity={0.5} />
      <rect width={W} height={H} fill="url(#ar-vig)" />
    </svg>
  );
};
