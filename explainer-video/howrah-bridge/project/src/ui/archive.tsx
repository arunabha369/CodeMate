import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT_BN} from '../theme';
import {enter, prog} from '../anim';

/** Flat bullock cart icon facing right, wheel centre at (0,0) bottom; ~110 px wide at scale 1. */
export const BullockCart: React.FC<{x: number; y: number; scale?: number; color?: string; t?: number; flip?: boolean}> = ({x, y, scale = 1, color = C.archInk, t = 0, flip = false}) => {
  const step = Math.sin(t / 5);
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      {/* cart body + canopy */}
      <rect x={-58} y={-46} width={50} height={18} rx={3} fill={color} />
      <path d="M -60 -46 Q -33 -78 -6 -46 Z" fill={color} opacity={0.75} />
      <circle cx={-34} cy={-16} r={16} fill="none" stroke={color} strokeWidth={4} />
      <line x1={-34} y1={-30} x2={-34} y2={-2} stroke={color} strokeWidth={2.5} transform={`rotate(${t * 6} -34 -16)`} />
      <line x1={-48} y1={-16} x2={-20} y2={-16} stroke={color} strokeWidth={2.5} transform={`rotate(${t * 6} -34 -16)`} />
      {/* yoke pole */}
      <line x1={-8} y1={-36} x2={22} y2={-40} stroke={color} strokeWidth={4} strokeLinecap="round" />
      {/* bullock */}
      <ellipse cx={34} cy={-38} rx={20} ry={12} fill={color} />
      <circle cx={56} cy={-44} r={8} fill={color} />
      <path d="M 54 -52 L 50 -60 M 60 -52 L 64 -60" stroke={color} strokeWidth={3} strokeLinecap="round" />
      <rect x={18 + step * 2} y={-30} width={5} height={28} rx={2} fill={color} />
      <rect x={44 - step * 2} y={-30} width={5} height={28} rx={2} fill={color} />
    </g>
  );
};

/** Walking person silhouette (small), feet at (0,0). */
export const Walker: React.FC<{x: number; y: number; scale?: number; color?: string; t?: number}> = ({x, y, scale = 1, color = C.archInk, t = 0}) => {
  const sw = Math.sin(t / 4) * 9;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx={0} cy={-48} r={7} fill={color} />
      <rect x={-5} y={-40} width={10} height={22} rx={4} fill={color} />
      <line x1={-2} y1={-19} x2={-2 - sw * 0.6} y2={0} stroke={color} strokeWidth={4.5} strokeLinecap="round" />
      <line x1={2} y1={-19} x2={2 + sw * 0.6} y2={0} stroke={color} strokeWidth={4.5} strokeLinecap="round" />
    </g>
  );
};

/** Hand-pulled cart / generic vehicle icon for "other" traffic. */
export const HandCart: React.FC<{x: number; y: number; scale?: number; color?: string}> = ({x, y, scale = 1, color = C.archInkSoft}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-40} y={-44} width={52} height={22} rx={3} fill={color} />
    <circle cx={-14} cy={-14} r={14} fill="none" stroke={color} strokeWidth={4} />
    <line x1={12} y1={-36} x2={44} y2={-28} stroke={color} strokeWidth={4} strokeLinecap="round" />
  </g>
);

/** Small steamer with funnel smoke, waterline at (0,0). */
export const Steamer: React.FC<{x: number; y: number; scale?: number; color?: string; t?: number}> = ({x, y, scale = 1, color = C.archInk, t = 0}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M -120 -8 L 120 -8 L 100 18 L -104 18 Z" fill={color} />
    <rect x={-70} y={-36} width={110} height={28} rx={3} fill={color} opacity={0.85} />
    <rect x={-10} y={-74} width={18} height={40} fill={color} />
    {[0, 1, 2, 3].map((i) => {
      const k = ((t / 40 + i / 4) % 1 + 1) % 1;
      return <circle key={i} cx={-2 - k * 90} cy={-84 - k * 50} r={10 + k * 22} fill={color} opacity={0.22 * (1 - k)} />;
    })}
  </g>
);

/**
 * Side cross-section of the 1874 floating (pontoon) bridge. The road deck rides on a row of pontoons and
 * rises and falls with the water level (`level` in px, positive = higher water).
 */
export const PontoonSection: React.FC<{y: number; level: number; x1?: number; x2?: number; n?: number; frame: number; traffic?: boolean; openGap?: number}> = ({
  y,
  level,
  x1 = 120,
  x2 = 1800,
  n = 13,
  frame,
  traffic = true,
  openGap = 0,
}) => {
  const ink = C.archInk;
  const wl = y - level; // waterline
  const span = (x2 - x1) / n;
  const deckY = wl - 64;
  const gapC = n / 2;
  return (
    <g>
      {/* banks */}
      <path d={`M 0 ${y - 60} L ${x1 - 10} ${y - 60} L ${x1 + 40} ${y + 220} L 0 ${y + 220} Z`} fill="#D6C29C" />
      <path d={`M 1920 ${y - 60} L ${x2 + 10} ${y - 60} L ${x2 - 40} ${y + 220} L 1920 ${y + 220} Z`} fill="#D6C29C" />
      {/* water */}
      <rect x={x1 - 20} y={wl} width={x2 - x1 + 40} height={400} fill={C.archWater} />
      <path
        d={Array.from({length: 49}, (_, i) => {
          const xx = x1 - 20 + ((x2 - x1 + 40) * i) / 48;
          return `${i ? 'L' : 'M'} ${xx} ${wl + Math.sin(i * 0.9 + frame / 10) * 3}`;
        }).join(' ')}
        stroke={C.archLine}
        strokeWidth={2}
        fill="none"
      />
      {[40, 90, 150].map((d, i) => (
        <line key={i} x1={x1 + 80 + ((frame * (0.6 + i * 0.2)) % 300)} y1={wl + d} x2={x1 + 180 + ((frame * (0.6 + i * 0.2)) % 300)} y2={wl + d} stroke={C.archLine} strokeWidth={2} opacity={0.6} />
      ))}
      {/* pontoons */}
      {Array.from({length: n}, (_, i) => {
        const cx = x1 + span * (i + 0.5);
        const bob = Math.sin(frame / 18 + i * 0.8) * 2.5;
        const off = Math.abs(i + 0.5 - gapC) < 1 ? openGap * 260 * Math.sign(i + 0.5 - gapC) : 0;
        return (
          <g key={i} transform={`translate(${cx + off} ${wl + bob})`}>
            <path d={`M ${-span * 0.42} -14 L ${span * 0.42} -14 Q ${span * 0.46} 16 ${span * 0.3} 26 L ${-span * 0.3} 26 Q ${-span * 0.46} 16 ${-span * 0.42} -14 Z`} fill={ink} />
            <rect x={-span * 0.36} y={-12} width={span * 0.72} height={5} fill={C.archBg} opacity={0.25} />
            {/* trestle up to the deck */}
            <line x1={-span * 0.25} y1={-14} x2={-span * 0.18} y2={-50} stroke={ink} strokeWidth={4} />
            <line x1={span * 0.25} y1={-14} x2={span * 0.18} y2={-50} stroke={ink} strokeWidth={4} />
            <line x1={-span * 0.25} y1={-14} x2={span * 0.18} y2={-50} stroke={ink} strokeWidth={2} opacity={0.7} />
          </g>
        );
      })}
      {/* deck + railings (split in the middle when the opening section swings away) */}
      {[0, 1].map((half) => {
        const a = half === 0 ? x1 - 30 : x1 + span * (gapC + 1);
        const b = half === 0 ? x1 + span * (gapC - 1) : x2 + 30;
        return (
          <g key={half}>
            <rect x={a} y={deckY} width={b - a} height={14} fill={ink} />
            <line x1={a} y1={deckY - 26} x2={b} y2={deckY - 26} stroke={ink} strokeWidth={3} />
            {Array.from({length: Math.floor((b - a) / 40)}, (_, k) => (
              <line key={k} x1={a + k * 40} y1={deckY - 26} x2={a + k * 40} y2={deckY} stroke={ink} strokeWidth={2} />
            ))}
          </g>
        );
      })}
      {/* opening section (2 pontoon spans) */}
      <g transform={`translate(${openGap * 0} ${openGap * 0})`}>
        {[-1, 1].map((sd) => (
          <g key={sd} transform={`translate(${openGap * 260 * sd} 0)`}>
            <rect x={sd < 0 ? x1 + span * (gapC - 1) : x1 + span * gapC} y={deckY} width={span} height={14} fill={ink} />
            <line x1={sd < 0 ? x1 + span * (gapC - 1) : x1 + span * gapC} y1={deckY - 26} x2={sd < 0 ? x1 + span * gapC : x1 + span * (gapC + 1)} y2={deckY - 26} stroke={ink} strokeWidth={3} />
          </g>
        ))}
      </g>
      {/* ramps to the banks */}
      <line x1={x1 - 30} y1={deckY + 7} x2={0} y2={y - 60} stroke={ink} strokeWidth={10} />
      <line x1={x2 + 30} y1={deckY + 7} x2={1920} y2={y - 60} stroke={ink} strokeWidth={10} />
      {traffic &&
        openGap < 0.05 &&
        [0, 1, 2, 3].map((i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          const xx = dir > 0 ? x1 + ((frame * 1.6 + i * 430) % (x2 - x1)) : x2 - ((frame * 1.3 + i * 390) % (x2 - x1));
          return i < 2 ? (
            <BullockCart key={i} x={xx} y={deckY} scale={0.7} color={ink} t={frame} flip={dir < 0} />
          ) : (
            <Walker key={i} x={xx} y={deckY} scale={0.9} color={ink} t={frame} />
          );
        })}
    </g>
  );
};

/** Archive ledger card with ruled lines and a red margin, used for surveys and records. */
export const Ledger: React.FC<{x: number; y: number; w: number; h: number; at: number; title: string; children?: React.ReactNode}> = ({x, y, w, h, at, title, children}) => {
  const f = useCurrentFrame();
  const e = enter(f, at, 18, 30, 10);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        background: '#F7F0DF',
        border: `1.5px solid ${C.archLine}`,
        borderRadius: 10,
        boxShadow: '0 24px 60px rgba(91,70,50,0.22)',
        backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 47px, ${C.archLine}55 47px 48px)`,
        opacity: e.opacity,
        transform: `${e.transform} rotate(-0.6deg)`,
        filter: e.filter,
        overflow: 'hidden',
      }}
    >
      <div style={{position: 'absolute', left: 70, top: 0, bottom: 0, width: 2, background: '#C8746688'}} />
      <div style={{position: 'absolute', left: 96, top: 20, fontFamily: FONT_BN, fontWeight: 700, fontSize: 34, color: C.archInk, opacity: prog(f, at + 8, 12)}}>{title}</div>
      {children}
    </div>
  );
};

/** Far-bank sepia skyline for archive scenes: low buildings, a dome, a few ship masts. */
export const ArchiveSkyline: React.FC<{y: number; frame: number; opacity?: number}> = ({y, frame, opacity = 1}) => {
  const blds: {x: number; w: number; h: number; dome?: boolean}[] = [];
  let x = -20;
  let k = 3;
  while (x < 1940) {
    k = (k * 1103515245 + 12345) % 2147483648;
    const w = 40 + (k % 70);
    const h = 26 + ((k >> 8) % 70);
    blds.push({x, w, h, dome: (k >> 4) % 13 === 0});
    x += w + ((k >> 12) % 3 === 0 ? 14 : 0);
  }
  return (
    <g opacity={opacity}>
      {blds.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={y - b.h} width={b.w} height={b.h} fill={C.archLine} opacity={0.55} />
          {b.dome && <path d={`M ${b.x + 6} ${y - b.h} Q ${b.x + b.w / 2} ${y - b.h - 46} ${b.x + b.w - 6} ${y - b.h} Z`} fill={C.archLine} opacity={0.55} />}
          {Array.from({length: Math.floor(b.h / 16)}, (_, r) => (
            <rect key={r} x={b.x + 8} y={y - b.h + 8 + r * 16} width={b.w - 16} height={3} fill={C.archBg} opacity={0.35} />
          ))}
        </g>
      ))}
      {[260, 1180, 1610].map((mx, i) => (
        <g key={i} opacity={0.5}>
          <line x1={mx} y1={y} x2={mx} y2={y - 120 - i * 12} stroke={C.archInkSoft} strokeWidth={3} />
          <line x1={mx - 30} y1={y - 90} x2={mx + 30} y2={y - 90} stroke={C.archInkSoft} strokeWidth={2} />
        </g>
      ))}
      {/* a few birds */}
      {[0, 1, 2, 3].map((i) => {
        const bx = ((frame * (0.9 + i * 0.15) + i * 380) % 2200) - 140;
        const by = y - 220 - i * 26 + Math.sin(frame / 12 + i) * 6;
        const wf = Math.sin(frame / 4 + i) * 5;
        return <path key={i} d={`M ${bx - 12} ${by - wf} Q ${bx - 5} ${by - 6} ${bx} ${by} Q ${bx + 5} ${by - 6} ${bx + 12} ${by - wf}`} stroke={C.archInk} strokeWidth={2.4} fill="none" opacity={0.6} />;
      })}
    </g>
  );
};
