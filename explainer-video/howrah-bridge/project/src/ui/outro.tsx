import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT_BN} from '../theme';
import {enter, pop, prog} from '../anim';

const seg = new Intl.Segmenter('bn', {granularity: 'grapheme'});
export const typeText = (s: string, p: number) => {
  const g = Array.from(seg.segment(s), (x) => x.segment);
  return g.slice(0, Math.round(g.length * Math.max(0, Math.min(1, p)))).join('');
};

export const Glyph: React.FC<{kind: 'fb' | 'ig' | 'yt'; size?: number}> = ({kind, size = 64}) => {
  const bg = kind === 'fb' ? '#1877F2' : kind === 'ig' ? '#E1306C' : '#FF0000';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect width={64} height={64} rx={16} fill={bg} />
      {kind === 'fb' && <path d="M36 54V36h6l1-7h-7v-4c0-2 1-3 3-3h4v-6c-1 0-3-1-6-1-6 0-9 3-9 9v5h-6v7h6v18z" fill="#fff" />}
      {kind === 'ig' && (
        <g fill="none" stroke="#fff" strokeWidth={4.5}>
          <rect x={15} y={15} width={34} height={34} rx={10} />
          <circle cx={32} cy={32} r={8} />
          <circle cx={42} cy={22} r={1.5} fill="#fff" />
        </g>
      )}
      {kind === 'yt' && <path d="M26 21 L44 32 L26 43 Z" fill="#fff" />}
    </svg>
  );
};

export const SocialCard: React.FC<{kind: 'fb' | 'ig' | 'yt'; name: string; cta: string; done: string; at: number; clickAt: number; x: number; y: number}> = ({
  kind,
  name,
  cta,
  done,
  at,
  clickAt,
  x,
  y,
}) => {
  const f = useCurrentFrame();
  const e = enter(f, at, 16, 30, 10);
  const isDone = f >= clickAt + 3;
  const col = kind === 'fb' ? '#1877F2' : kind === 'ig' ? '#E1306C' : '#FF0000';
  const s = isDone ? 0.94 + 0.06 * pop(f, clickAt + 3) : 1;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 280,
        height: 320,
        borderRadius: 22,
        background: 'rgba(36,32,61,0.94)',
        border: `1.5px solid ${C.cardNightBorder}`,
        boxShadow: '0 18px 50px rgba(0,0,0,0.45)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 22,
        opacity: e.opacity,
        transform: e.transform,
        filter: e.filter,
        fontFamily: FONT_BN,
      }}
    >
      <Glyph kind={kind} size={84} />
      <div style={{fontWeight: 700, fontSize: 34, color: '#fff'}}>{name}</div>
      <div
        style={{
          padding: '10px 26px',
          borderRadius: 999,
          fontWeight: 700,
          fontSize: 24,
          transform: `scale(${s})`,
          ...(isDone ? {border: `2px solid ${col}`, color: col, background: 'transparent'} : {background: col, color: '#fff'}),
        }}
      >
        {isDone ? done : cta}
      </div>
    </div>
  );
};

export const OrangeButton: React.FC<{text: React.ReactNode; at: number; clickAt?: number; doneText?: React.ReactNode; x: number; y: number; size?: number}> = ({
  text,
  at,
  clickAt,
  doneText,
  x,
  y,
  size = 30,
}) => {
  const f = useCurrentFrame();
  const p = pop(f, at);
  const done = clickAt !== undefined && f >= clickAt + 3;
  const press = clickAt !== undefined && f >= clickAt && f < clickAt + 5 ? 0.92 : 1;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%,-50%) scale(${(0.6 + 0.4 * p) * press})`,
        opacity: prog(f, at, 8),
        padding: `${size * 0.4}px ${size * 1.0}px`,
        borderRadius: 999,
        fontFamily: FONT_BN,
        fontWeight: 700,
        fontSize: size,
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        ...(done ? {background: '#fff', color: C.orange, border: `2px solid ${C.orange}`} : {background: C.orange, color: '#fff', boxShadow: '0 10px 24px rgba(200,116,26,0.35)'}),
      }}
    >
      {done && doneText ? doneText : text}
    </div>
  );
};
