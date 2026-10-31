import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FONT_BN} from '../theme';
import {clamp, easeInOut, enter, prog} from '../anim';
import {BarChart3, Home, MapPin, Settings, User} from 'lucide-react';

export const AppWindow: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  at?: number;
  title?: string;
  children?: React.ReactNode;
  out?: number;
  dark?: boolean;
}> = ({x, y, w, h, at = 0, title, children, out, dark = false}) => {
  const f = useCurrentFrame();
  const e = enter(f, at, 18, 30, 10);
  const o = out !== undefined ? 1 - prog(f, out, 10) : 1;
  const bg = dark ? '#1C1A30' : '#fff';
  const line = dark ? '#34304F' : '#ECE7DC';
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 16,
        background: bg,
        boxShadow: dark ? '0 24px 70px rgba(0,0,0,0.5)' : '0 24px 70px rgba(30,27,46,0.14)',
        border: `1.5px solid ${dark ? '#34304F' : '#E3DDD0'}`,
        overflow: 'hidden',
        opacity: e.opacity * o,
        transform: e.transform,
        filter: e.filter,
        fontFamily: FONT_BN,
        color: dark ? '#fff' : C.ink,
      }}
    >
      <div style={{height: 50, borderBottom: `1.5px solid ${line}`, display: 'flex', alignItems: 'center', gap: 9, padding: '0 18px'}}>
        <div style={{width: 13, height: 13, borderRadius: 7, background: '#FF5F57'}} />
        <div style={{width: 13, height: 13, borderRadius: 7, background: '#FEBC2E'}} />
        <div style={{width: 13, height: 13, borderRadius: 7, background: '#28C840'}} />
        <div style={{marginLeft: 22, height: 24, flex: 0.55, borderRadius: 12, background: dark ? '#2A2742' : '#F2EEE6'}} />
      </div>
      <div style={{position: 'absolute', top: 50, left: 0, bottom: 0, width: 64, borderRight: `1.5px solid ${line}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, paddingTop: 22, color: dark ? '#8C86B0' : '#A59F92'}}>
        <Home size={20} />
        <BarChart3 size={20} color={C.orange} />
        <MapPin size={20} />
        <Settings size={20} />
        <User size={20} />
      </div>
      <div style={{position: 'absolute', top: 50, left: 64, right: 0, bottom: 0, padding: '26px 34px'}}>
        {title && <div style={{fontWeight: 700, fontSize: 34, marginBottom: 16}}>{title}</div>}
        {children}
      </div>
    </div>
  );
};

/** Cursor moving along keyframes [frame, x, y]; clicks at listed frames. Coordinates are absolute (frame space). */
export const Cursor: React.FC<{path: [number, number, number][]; clicks?: number[]; at?: number; out?: number}> = ({path, clicks = [], at, out}) => {
  const f = useCurrentFrame();
  const frames = path.map((p) => p[0]);
  const x = interpolate(f, frames, path.map((p) => p[1]), {...clamp, easing: easeInOut});
  const y = interpolate(f, frames, path.map((p) => p[2]), {...clamp, easing: easeInOut});
  let scale = 1;
  let ripple: {r: number; o: number} | null = null;
  for (const c of clicks) {
    const d = f - c;
    if (d >= 0 && d < 6) scale = 0.86;
    if (d >= 0 && d < 16) ripple = {r: 6 + d * 3, o: 1 - d / 16};
  }
  const o = (at !== undefined ? prog(f, at, 8) : 1) * (out !== undefined ? 1 - prog(f, out, 8) : 1);
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: o, pointerEvents: 'none'}}>
      {ripple && (
        <div style={{position: 'absolute', left: -ripple.r, top: -ripple.r, width: ripple.r * 2, height: ripple.r * 2, borderRadius: '50%', border: `3px solid ${C.orange}`, opacity: ripple.o}} />
      )}
      <svg width={34} height={42} style={{transform: `scale(${scale})`, transformOrigin: '0 0', filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.3))'}}>
        <path d="M2 2 L2 32 L10 25 L16 39 L22 36 L16 23 L27 23 Z" fill="#111" stroke="#fff" strokeWidth={2.2} strokeLinejoin="round" />
      </svg>
    </div>
  );
};

export const Toggle: React.FC<{on: number; color?: string; offColor?: string}> = ({on, color = C.green, offColor = '#D9D4CA'}) => (
  <div style={{width: 76, height: 40, borderRadius: 20, background: on > 0.5 ? color : offColor, position: 'relative', transition: 'none'}}>
    <div style={{position: 'absolute', top: 4, left: 4 + on * 36, width: 32, height: 32, borderRadius: 16, background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,.2)'}} />
  </div>
);

export const Slider: React.FC<{value: number; w?: number; color?: string}> = ({value, w = 360, color = C.orange}) => (
  <div style={{position: 'relative', width: w, height: 30}}>
    <div style={{position: 'absolute', top: 12, left: 0, width: w, height: 6, borderRadius: 3, background: '#E8E2D6'}} />
    <div style={{position: 'absolute', top: 12, left: 0, width: w * value, height: 6, borderRadius: 3, background: color}} />
    <div style={{position: 'absolute', top: 2, left: w * value - 13, width: 26, height: 26, borderRadius: 13, background: '#fff', border: `3px solid ${color}`, boxShadow: '0 2px 6px rgba(0,0,0,.15)'}} />
  </div>
);

export const ProgressBar: React.FC<{value: number; w: number; h?: number; color?: string; track?: string}> = ({value, w, h = 16, color = C.green, track = '#E8E2D6'}) => (
  <div style={{width: w, height: h, borderRadius: h / 2, background: track, overflow: 'hidden'}}>
    <div style={{width: w * Math.max(0, Math.min(1, value)), height: h, borderRadius: h / 2, background: color}} />
  </div>
);

/** Inline SVG line chart; series values in [0,1]; draw progress 0..1. */
export const LineChart: React.FC<{w: number; h: number; series: {values: number[]; color: string}[]; draw?: number}> = ({w, h, series, draw = 1}) => (
  <svg width={w} height={h} style={{overflow: 'visible'}}>
    {[0.25, 0.5, 0.75].map((g) => (
      <line key={g} x1={0} x2={w} y1={h * g} y2={h * g} stroke="#E8E2D6" strokeDasharray="5 6" />
    ))}
    {series.map((s, i) => {
      const n = s.values.length;
      const pts = s.values.map((v, k) => [(k / (n - 1)) * w, h - v * h]);
      const shown = Math.max(2, Math.ceil(n * draw));
      const d = pts
        .slice(0, shown)
        .map((p, k) => `${k ? 'L' : 'M'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
        .join(' ');
      const last = pts[shown - 1];
      return (
        <g key={i}>
          <path d={d} fill="none" stroke={s.color} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={last[0]} cy={last[1]} r={7} fill={s.color} stroke="#fff" strokeWidth={3} />
        </g>
      );
    })}
  </svg>
);
