import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT_BN, FONT_NUM, W} from '../theme';
import {clamp, enter, pop, prog} from '../anim';
import {interpolate} from 'remotion';

export type World = 'night' | 'paper';

type Tok = {text: string; tone: 'plain' | 'orange' | 'red'};

/** Parse "[[orange]]" and "{{red}}" markers into word-level tokens. */
export const parseMarked = (s: string): Tok[] => {
  const toks: Tok[] = [];
  for (const part of s.split(/(\[\[.*?\]\]|\{\{.*?\}\})/)) {
    if (!part) continue;
    if (part.startsWith('[[')) toks.push({text: part.slice(2, -2), tone: 'orange'});
    else if (part.startsWith('{{')) toks.push({text: part.slice(2, -2), tone: 'red'});
    else for (const w of part.split(/\s+/)) if (w) toks.push({text: w, tone: 'plain'});
  }
  return toks;
};

const toneColor = (tone: Tok['tone'], world: World) =>
  tone === 'orange' ? (world === 'night' ? C.amber : C.orange) : tone === 'red' ? C.red : world === 'night' ? C.white : C.ink;

export const Headline: React.FC<{
  text: string;
  at?: number;
  world: World;
  size?: number;
  y?: number;
  x?: number;
  width?: number;
  align?: 'center' | 'left';
  stagger?: number;
  out?: number; // frame to fade out
}> = ({text, at = 0, world, size = 68, y = 110, x, width, align = 'center', stagger = 4, out}) => {
  const f = useCurrentFrame();
  const toks = parseMarked(text);
  const o = out !== undefined ? 1 - prog(f, out, 10) : 1;
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x ?? (align === 'center' ? (W - (width ?? 1600)) / 2 : 120),
        width: width ?? 1600,
        textAlign: align,
        fontFamily: FONT_BN,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.3,
        opacity: o,
      }}
    >
      {toks.map((t, i) => {
        const st = at + i * stagger;
        const e = enter(f, st, 14, 18, 8);
        const s = t.tone !== 'plain' ? 1 + 0.08 * (1 - pop(f, st + 4)) : 1;
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              marginRight: '0.24em',
              color: toneColor(t.tone, world),
              opacity: e.opacity,
              transform: `${e.transform} scale(${t.tone !== 'plain' ? Math.max(1, s) : 1})`,
              filter: e.filter,
            }}
          >
            {t.text}
          </span>
        );
      })}
    </div>
  );
};

export const Kicker: React.FC<{text: string; at?: number; world: World; y?: number; x?: number; align?: 'center' | 'left'; out?: number}> = ({
  text,
  at = 0,
  world,
  y = 72,
  x,
  align = 'center',
  out,
}) => {
  const f = useCurrentFrame();
  const lineW = 28 * prog(f, at, 10);
  const e = enter(f, at + 5, 12, 0, 4);
  const o = out !== undefined ? 1 - prog(f, out, 10) : 1;
  const col = world === 'night' ? C.glow : C.blue;
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: align === 'center' ? 0 : x ?? 120,
        width: align === 'center' ? W : undefined,
        display: 'flex',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        alignItems: 'center',
        gap: 12,
        fontFamily: FONT_BN,
        fontWeight: 600,
        fontSize: 24,
        color: col,
        opacity: o,
      }}
    >
      <div style={{width: 28, display: 'flex'}}>
        <div style={{width: lineW, height: 2.5, background: col, borderRadius: 2}} />
      </div>
      <span style={{opacity: e.opacity, transform: `translateX(${(1 - e.opacity) * -8}px)`, filter: e.filter}}>{text}</span>
    </div>
  );
};

/** Kicker + headline block at the top of the frame. */
export const Head: React.FC<{kicker?: string; text: string; at?: number; world: World; y?: number; size?: number; out?: number}> = ({
  kicker,
  text,
  at = 0,
  world,
  y = 60,
  size = 68,
  out,
}) => (
  <>
    {kicker && <Kicker text={kicker} at={at} world={world} y={y} out={out} />}
    <Headline text={text} at={at + (kicker ? 8 : 0)} world={world} y={y + (kicker ? 40 : 30)} size={size} out={out} />
  </>
);

export const TitleCard: React.FC<{text: string; at?: number; world: World; y?: number}> = ({text, at = 0, world, y = 380}) => {
  const f = useCurrentFrame();
  const shine = interpolate(f, [at + 30, at + 70], [-30, 130], clamp);
  return (
    <div style={{position: 'absolute', top: y, left: 0, width: W}}>
      <Headline text={text} at={at} world={world} size={136} y={0} width={1800} stagger={6} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          height: 200,
          background: `linear-gradient(100deg, transparent ${shine - 12}%, rgba(255,255,255,0.22) ${shine}%, transparent ${shine + 12}%)`,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export type Tone = 'neutral' | 'orange' | 'red' | 'green' | 'blue' | 'dark';

const chipStyle = (tone: Tone, world: World): React.CSSProperties => {
  switch (tone) {
    case 'orange':
      return {background: '#C8741A', color: '#fff'};
    case 'red':
      return {background: '#FBE3E0', color: C.red, border: `1.5px solid ${C.red}55`};
    case 'green':
      return {background: '#fff', color: C.ink, border: `1.5px solid ${C.green}55`};
    case 'blue':
      return {background: '#E3EEF9', color: C.blue, border: `1.5px solid ${C.blue}44`};
    case 'dark':
      return {background: C.cardNight, color: '#fff', border: `1.5px solid ${C.cardNightBorder}`};
    default:
      return world === 'night'
        ? {background: 'rgba(36,32,61,0.92)', color: '#fff', border: `1.5px solid ${C.cardNightBorder}`}
        : {background: '#fff', color: C.ink, border: `1.5px solid ${C.paperLine}`};
  }
};

export const Chip: React.FC<{
  text: React.ReactNode;
  at?: number;
  tone?: Tone;
  world?: World;
  icon?: React.ReactNode;
  x: number;
  y: number;
  size?: number;
  anchor?: 'center' | 'left';
  out?: number;
}> = ({text, at = 0, tone = 'neutral', world = 'paper', icon, x, y, size = 26, anchor = 'center', out}) => {
  const f = useCurrentFrame();
  const s = pop(f, at);
  const o = Math.min(1, prog(f, at, 8)) * (out !== undefined ? 1 - prog(f, out, 10) : 1);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(${anchor === 'center' ? '-50%' : '0'}, -50%) scale(${0.6 + 0.4 * s})`,
        opacity: o,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: `${size * 0.36}px ${size * 0.8}px`,
        borderRadius: 999,
        fontFamily: FONT_BN,
        fontWeight: 600,
        fontSize: size,
        whiteSpace: 'nowrap',
        boxShadow: world === 'paper' ? '0 6px 18px rgba(30,27,46,0.08)' : '0 8px 24px rgba(0,0,0,0.35)',
        ...chipStyle(tone, world),
      }}
    >
      {icon}
      {text}
    </div>
  );
};

export const Num: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 64, color, style}) => (
  <span style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: size, color, lineHeight: 1, letterSpacing: 0.5, ...style}}>{children}</span>
);

export const CaptionPill: React.FC<{text: string; world: World; opacity: number}> = ({text, world, opacity}) => (
  <div style={{position: 'absolute', bottom: 58, left: 0, width: W, display: 'flex', justifyContent: 'center', opacity}}>
    <div
      style={{
        maxWidth: 1400,
        padding: '10px 22px',
        borderRadius: 10,
        fontFamily: FONT_BN,
        fontWeight: 600,
        fontSize: 30,
        lineHeight: 1.35,
        textAlign: 'center',
        ...(world === 'night'
          ? {background: 'rgba(14,12,28,0.82)', color: '#fff'}
          : {background: '#fff', color: C.ink, border: `1.5px solid ${C.paperLine}`, boxShadow: '0 6px 18px rgba(30,27,46,0.08)'}),
      }}
    >
      {text}
    </div>
  </div>
);
