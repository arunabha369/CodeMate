import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Check} from 'lucide-react';
import {C, FONT_BN, FONT_NUM} from '../theme';
import {calm, clamp, countUp, enter, fmtIN, pop, prog} from '../anim';
import {World} from './text';
import {Negation} from './svg';

const cardBg = (world: World): React.CSSProperties =>
  world === 'night'
    ? {background: 'rgba(36,32,61,0.94)', border: `1.5px solid ${C.cardNightBorder}`, boxShadow: '0 14px 40px rgba(0,0,0,0.45)', color: '#fff'}
    : {background: '#fff', border: `1.5px solid ${C.paperLine}`, boxShadow: '0 14px 40px rgba(30,27,46,0.10)', color: C.ink};

export const StatCard: React.FC<{
  icon: React.ReactNode;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  unit?: string;
  label: string;
  at?: number;
  x: number;
  y: number;
  world: World;
  dur?: number;
  out?: number;
  scale?: number;
}> = ({icon, value, decimals = 0, prefix = '', suffix = '', unit, label, at = 0, x, y, world, dur = 40, out, scale = 1}) => {
  const f = useCurrentFrame();
  const e = enter(f, at, 16, 24, 10);
  const v = countUp(f, at + 6, value, dur);
  const o = out !== undefined ? 1 - prog(f, out, 10) : 1;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        padding: '22px 34px 22px 22px',
        borderRadius: 18,
        ...cardBg(world),
        opacity: e.opacity * o,
        transform: `${e.transform} scale(${scale})`,
        transformOrigin: '0 0',
        filter: e.filter,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 14,
          background: world === 'night' ? '#3A2E2A' : '#F6E7D2',
          color: C.amber,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 10}}>
          <span style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: 62, lineHeight: 1, color: world === 'night' ? '#fff' : C.orange}}>
            {prefix}
            {fmtIN(v, decimals)}
            {suffix}
          </span>
          {unit && <span style={{fontFamily: FONT_BN, fontWeight: 700, fontSize: 30}}>{unit}</span>}
        </div>
        <span style={{fontFamily: FONT_BN, fontWeight: 500, fontSize: 22, opacity: 0.72}}>{label}</span>
      </div>
    </div>
  );
};

export const IconCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  at?: number;
  x: number;
  y: number;
  w?: number;
  h?: number;
  world: World;
  dimAt?: number;
  strikeAt?: number;
  glowAt?: number;
  glowColor?: string;
  out?: number;
  children?: React.ReactNode;
}> = ({icon, label, at = 0, x, y, w = 230, h = 250, world, dimAt, strikeAt, glowAt, glowColor = C.red, out, children}) => {
  const f = useCurrentFrame();
  const e = enter(f, at, 16, 30, 10);
  const dim = dimAt !== undefined ? prog(f, dimAt, 14) : 0;
  const glow = glowAt !== undefined ? prog(f, glowAt, 16) : 0;
  const o = out !== undefined ? 1 - prog(f, out, 10) : 1;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 22,
        ...cardBg(world),
        ...(glow > 0 ? {boxShadow: `0 0 ${50 * glow}px ${glowColor}88, 0 14px 40px rgba(0,0,0,0.4)`, borderColor: glowColor} : {}),
        opacity: e.opacity * (1 - dim * 0.6) * o,
        transform: e.transform,
        filter: dim > 0 ? `blur(${dim * 5}px)` : e.filter,
      }}
    >
      <div style={{color: world === 'night' ? C.amber : C.orange, display: 'flex'}}>{icon}</div>
      <div style={{fontFamily: FONT_BN, fontWeight: 700, fontSize: 32}}>{label}</div>
      {children}
      {strikeAt !== undefined && (
        <div style={{position: 'absolute', left: w / 2 - 75, top: h / 2 - 95}}>
          <Negation at={strikeAt} size={150} />
        </div>
      )}
    </div>
  );
};

export const CheckRow: React.FC<{
  icon: React.ReactNode;
  text: string;
  ok: string;
  at: number;
  checkAt: number;
  x: number;
  y: number;
  w?: number;
}> = ({icon, text, ok, at, checkAt, x, y, w = 1000}) => {
  const f = useCurrentFrame();
  const e = enter(f, at, 16, 0, 8);
  const slide = interpolate(prog(f, at, 18), [0, 1], [-60, 0]);
  const c = pop(f, checkAt);
  const okO = prog(f, checkAt - 4, 10);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: 96,
        borderRadius: 16,
        background: '#fff',
        border: `1.5px solid ${C.paperLine}`,
        boxShadow: '0 10px 28px rgba(30,27,46,0.08)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 26px',
        gap: 20,
        opacity: e.opacity,
        transform: `translateX(${slide}px)`,
        filter: e.filter,
        fontFamily: FONT_BN,
        fontSize: 34,
        fontWeight: 600,
        color: C.ink,
      }}
    >
      <div style={{width: 52, height: 52, borderRadius: 12, background: '#F6E7D2', color: C.orange, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{icon}</div>
      <div style={{flex: 1}}>
        {text}
        <span style={{color: C.green, fontWeight: 700, opacity: okO}}>{ok}</span>
      </div>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 26,
          background: C.green,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${c})`,
        }}
      >
        <Check size={32} strokeWidth={3.2} />
      </div>
    </div>
  );
};

export const Calendar: React.FC<{month: string; day?: string; year: string; at?: number; x: number; y: number; scale?: number; out?: number}> = ({
  month,
  day,
  year,
  at = 0,
  x,
  y,
  scale = 1,
  out,
}) => {
  const f = useCurrentFrame();
  const s = calm(f, at);
  const p = pop(f, at);
  const o = Math.min(1, prog(f, at, 8)) * (out !== undefined ? 1 - prog(f, out, 10) : 1);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 300,
        borderRadius: 22,
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 22px 50px rgba(30,27,46,0.18)',
        transform: `translate(-50%, -50%) translateY(${(1 - p) * -80}px) rotate(${(1 - s) * -6}deg) scale(${scale})`,
        opacity: o,
        textAlign: 'center',
      }}
    >
      <div style={{background: C.orange, color: '#fff', fontFamily: FONT_BN, fontWeight: 700, fontSize: 34, padding: '12px 0'}}>{month}</div>
      <div style={{padding: '18px 0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
        {day && <span style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: 120, lineHeight: 1, color: C.ink}}>{day}</span>}
        <span style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: day ? 50 : 110, lineHeight: 1.05, color: day ? C.orange : C.ink}}>{year}</span>
      </div>
    </div>
  );
};

export const YearCounter: React.FC<{from: number; to: number; at?: number; x: number; y: number; label: string; world: World}> = ({
  from,
  to,
  at = 0,
  x,
  y,
  label,
  world,
}) => {
  const f = useCurrentFrame();
  const v = Math.round(countUp(f, at, to, 45, from));
  const line = prog(f, at + 6, 40);
  const e = enter(f, at, 14);
  const col = world === 'night' ? '#fff' : C.orange;
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: e.opacity, filter: e.filter}}>
      <div style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: 150, lineHeight: 1, color: col}}>{v}</div>
      <div style={{position: 'relative', width: 520, height: 30, marginTop: 18}}>
        <div style={{position: 'absolute', top: 13, left: 0, width: 520 * line, height: 4, background: col, borderRadius: 2}} />
        <div style={{position: 'absolute', top: 5, left: 520 * line - 10, width: 20, height: 20, borderRadius: 10, background: col, border: '4px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,.2)'}} />
      </div>
      <div style={{fontFamily: FONT_BN, fontWeight: 700, fontSize: 40, marginTop: 14, color: world === 'night' ? '#fff' : C.ink, opacity: prog(f, at + 20, 14)}}>{label}</div>
    </div>
  );
};

/** Small step card used in process loops. */
export const StepCard: React.FC<{icon: React.ReactNode; label: string; at: number; active: number; x: number; y: number; n: number}> = ({
  icon,
  label,
  at,
  active,
  x,
  y,
  n,
}) => {
  const f = useCurrentFrame();
  const e = enter(f, at, 16, 30, 8);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 300,
        height: 300,
        borderRadius: 22,
        background: '#fff',
        border: `2px solid ${active > 0.5 ? C.orange : C.paperLine}`,
        boxShadow: active > 0.5 ? `0 0 0 6px ${C.orange}22, 0 18px 40px rgba(200,116,26,0.18)` : '0 14px 34px rgba(30,27,46,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        opacity: e.opacity,
        transform: `${e.transform} scale(${1 + 0.05 * active})`,
        filter: e.filter,
      }}
    >
      <div style={{position: 'absolute', top: 16, left: 18, width: 38, height: 38, borderRadius: 10, background: C.orange, color: '#fff', fontFamily: FONT_NUM, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {n}
      </div>
      <div style={{color: active > 0.5 ? C.orange : C.inkSoft}}>{icon}</div>
      <div style={{fontFamily: FONT_BN, fontWeight: 700, fontSize: 36, color: C.ink}}>{label}</div>
    </div>
  );
};

export const fadeWindow = (f: number, a: number, b: number) => interpolate(f, [a, a + 10, b - 10, b], [0, 1, 1, 0], clamp);
