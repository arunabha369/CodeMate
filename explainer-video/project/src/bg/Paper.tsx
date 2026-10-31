import React from 'react';
import {C, H, W} from '../theme';

export const Truss: React.FC<{y: number; h: number; color?: string; opacity?: number; step?: number}> = ({y, h, color = C.truss, opacity = 0.8, step = 64}) => {
  const n = Math.ceil(W / step) + 1;
  return (
    <g stroke={color} strokeWidth={2} opacity={opacity} fill="none">
      <line x1={0} y1={y} x2={W} y2={y} />
      <line x1={0} y1={y + h} x2={W} y2={y + h} />
      {new Array(n).fill(0).map((_, i) => (
        <g key={i}>
          <line x1={i * step} y1={y} x2={i * step} y2={y + h} />
          <line x1={i * step} y1={y + h} x2={i * step + step / 2} y2={y} />
          <line x1={i * step + step / 2} y1={y} x2={(i + 1) * step} y2={y + h} />
        </g>
      ))}
    </g>
  );
};

export const Paper: React.FC<{frame: number; truss?: boolean}> = ({frame, truss = true}) => {
  const gx = 1350 + Math.sin(frame / 160) * 220;
  const gy = 330 + Math.cos(frame / 200) * 90;
  const cross = (x: number, y: number) => (
    <g stroke={C.paperLine} strokeWidth={1.5}>
      <line x1={x - 9} y1={y} x2={x + 9} y2={y} />
      <line x1={x} y1={y - 9} x2={x} y2={y + 9} />
    </g>
  );
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
      <defs>
        <radialGradient id="pp-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={C.paperGlow} stopOpacity={0.55} />
          <stop offset="1" stopColor={C.paperGlow} stopOpacity={0} />
        </radialGradient>
        <radialGradient id="pp-glow2" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#D8E3EC" stopOpacity={0.5} />
          <stop offset="1" stopColor="#D8E3EC" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={C.paper} />
      <ellipse cx={gx} cy={gy} rx={620} ry={420} fill="url(#pp-glow)" />
      <ellipse cx={W - gx + 200} cy={720} rx={520} ry={360} fill="url(#pp-glow2)" />
      {truss && <Truss y={930} h={100} opacity={0.55} />}
      <rect x={24} y={24} width={W - 48} height={H - 48} fill="none" stroke={C.paperLine} strokeWidth={1.5} strokeDasharray="6 7" />
      {cross(24, 24)}
      {cross(W - 24, 24)}
      {cross(24, H - 24)}
      {cross(W - 24, H - 24)}
    </svg>
  );
};
