import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FONT_BN, FONT_NUM, W} from '../theme';
import {clamp, easeInOut, enter, pop, prog} from '../anim';
import {Headline, Kicker, World} from './text';

/**
 * Chapter intro: a large centred chapter badge and title for ~1.2 s, which then glides up into the usual
 * kicker + headline position so the scene continues without a cut. Use `chapterReveal(f)` to fade the
 * scene's own content in underneath.
 */
export const ChapterIntro: React.FC<{n: string; title: string; world: World; hold?: number}> = ({n, title, world, hold = 34}) => {
  const f = useCurrentFrame();
  const m = prog(f, hold, 22, easeInOut);
  const badgeO = 1 - prog(f, hold - 2, 12);
  const y = interpolate(m, [0, 1], [420, 100]);
  const sc = interpolate(m, [0, 1], [1.55, 1]);
  const col = world === 'night' ? C.amber : world === 'archive' ? C.archAccent : C.orange;
  const bp = pop(f, 0);
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 0,
          width: W,
          top: 300,
          display: 'flex',
          justifyContent: 'center',
          opacity: badgeO,
          transform: `scale(${0.7 + 0.3 * bp})`,
        }}
      >
        <div style={{padding: '10px 30px', borderRadius: 999, border: `2.5px solid ${col}`, color: col, fontFamily: FONT_BN, fontWeight: 700, fontSize: 40, background: world === 'night' ? 'rgba(20,16,40,0.6)' : 'rgba(255,255,255,0.55)'}}>
          অধ্যায় {n}
        </div>
      </div>
      {m > 0.6 && <Kicker text={`অধ্যায় ${n}`} at={hold + 14} world={world} y={62} />}
      <div style={{position: 'absolute', left: 0, top: 0, width: W, height: 1, transform: `translateY(${y - 100}px) scale(${sc})`, transformOrigin: `${W / 2}px 130px`}}>
        <Headline text={title} at={4} world={world} y={100} size={72} />
      </div>
    </>
  );
};
export const chapterReveal = (f: number, hold = 34) => interpolate(f, [0, hold, hold + 22], [0.35, 0.35, 1], clamp);

/** Question card used at chapter openings. */
export const QuestionCard: React.FC<{text: string; at: number; x: number; y: number; world: World}> = ({text, at, x, y, world}) => {
  const f = useCurrentFrame();
  const e = enter(f, at, 16, 20, 8);
  const dark = world === 'night';
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) ${e.transform}`,
        opacity: e.opacity,
        filter: e.filter,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '18px 30px',
        borderRadius: 20,
        background: dark ? 'rgba(36,32,61,0.94)' : world === 'archive' ? C.archCard : '#fff',
        border: `2px solid ${dark ? C.cardNightBorder : world === 'archive' ? C.archLine : C.paperLine}`,
        boxShadow: dark ? '0 18px 40px rgba(0,0,0,0.4)' : '0 18px 40px rgba(30,27,46,0.12)',
        fontFamily: FONT_BN,
        fontWeight: 700,
        fontSize: 40,
        color: dark ? '#fff' : world === 'archive' ? C.archInk : C.ink,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{width: 54, height: 54, borderRadius: 27, background: dark ? C.amber : world === 'archive' ? C.archAccent : C.orange, color: dark ? C.ink : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_NUM, fontSize: 36}}>?</span>
      {text}
    </div>
  );
};

/** A drawn "old photograph": sepia card with photo corners; children are SVG in a w×h viewBox. */
export const Vignette: React.FC<{x: number; y: number; w: number; h: number; at?: number; rot?: number; zoom?: number; children: React.ReactNode; tone?: string}> = ({
  x,
  y,
  w,
  h,
  at = 0,
  rot = -1.2,
  zoom = 1,
  children,
  tone = '#E4D5B5',
}) => {
  const f = useCurrentFrame();
  const e = enter(f, at, 18, 26, 10);
  const corner = (cx: number, cy: number, r: number) => (
    <div key={`${cx}${cy}`} style={{position: 'absolute', left: cx, top: cy, width: 46, height: 46, transform: `rotate(${r}deg)`, background: 'linear-gradient(135deg, #4A3A2A 50%, transparent 50%)', opacity: 0.8}} />
  );
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w + 28, height: h + 28, opacity: e.opacity, transform: `${e.transform} rotate(${rot}deg)`, filter: e.filter}}>
      <div style={{position: 'absolute', inset: 0, background: '#FBF6EA', borderRadius: 6, boxShadow: '0 26px 60px rgba(60,40,20,0.3)'}} />
      <div style={{position: 'absolute', left: 14, top: 14, width: w, height: h, overflow: 'hidden', background: tone}}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: '50% 50%'}}>
          {children}
        </svg>
        <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 80px rgba(70,45,20,0.45)'}} />
      </div>
      {corner(-6, -6, 0)}
      {corner(w - 12, -6, 90)}
      {corner(w - 12, h - 12, 180)}
      {corner(-6, h - 12, 270)}
    </div>
  );
};

/** Country boat (nouka), waterline at (0,0). */
export const Nouka: React.FC<{x: number; y: number; scale?: number; color?: string; flip?: boolean; t?: number}> = ({x, y, scale = 1, color = C.archInk, flip, t = 0}) => (
  <g transform={`translate(${x} ${y + Math.sin(t / 14) * 2}) scale(${flip ? -scale : scale} ${scale})`}>
    <path d="M -70 -10 Q 0 22 70 -10 L 60 -4 Q 0 14 -60 -4 Z" fill={color} />
    <path d="M -30 -10 Q -10 -34 22 -12 Z" fill={color} opacity={0.75} />
    <line x1={40} y1={-8} x2={30} y2={-52} stroke={color} strokeWidth={3} />
    <circle cx={30} cy={-56} r={5} fill={color} />
    <line x1={-58} y1={-10} x2={-86} y2={22} stroke={color} strokeWidth={3} />
  </g>
);

/** Top-down ship/steamer, bow pointing right, centre at (0,0). */
export const TopShip: React.FC<{x: number; y: number; scale?: number; color?: string; t?: number}> = ({x, y, scale = 1, color = C.archInk, t = 0}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M -120 -26 L 80 -26 Q 130 0 80 26 L -120 26 Q -132 0 -120 -26 Z" fill={color} />
    <rect x={-70} y={-16} width={90} height={32} rx={6} fill="#fff" opacity={0.2} />
    <circle cx={-10} cy={0} r={11} fill={color} stroke="#fff" strokeOpacity={0.35} strokeWidth={3} />
    {[0, 1, 2].map((i) => {
      const k = ((t / 30 + i / 3) % 1 + 1) % 1;
      return <circle key={i} cx={-10 - k * 120} cy={-k * 26} r={8 + k * 18} fill={color} opacity={0.18 * (1 - k)} />;
    })}
    {/* wake */}
    <path d="M -128 -14 L -260 -40 M -128 14 L -260 40" stroke={color} strokeWidth={2} opacity={0.3} />
  </g>
);

/** Football pitch outline (top view), w×h with origin top-left. */
export const Pitch: React.FC<{x: number; y: number; w: number; h: number; color: string; opacity?: number}> = ({x, y, w, h, color, opacity = 1}) => (
  <g transform={`translate(${x} ${y})`} stroke={color} strokeWidth={3} fill="none" opacity={opacity}>
    <rect x={0} y={0} width={w} height={h} fill="#7FB37A" fillOpacity={0.35} />
    <line x1={w / 2} y1={0} x2={w / 2} y2={h} />
    <circle cx={w / 2} cy={h / 2} r={h * 0.16} />
    <rect x={0} y={h * 0.22} width={w * 0.15} height={h * 0.56} />
    <rect x={w * 0.85} y={h * 0.22} width={w * 0.15} height={h * 0.56} />
  </g>
);

/** Rubber stamp, centred at (x, y); `at` = frame it hits the paper. */
export const Stamp: React.FC<{text: string; x: number; y: number; at: number; color?: string; rot?: number; size?: number}> = ({text, x, y, at, color = C.red, rot = -12, size = 64}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at - 8, at], [0, 1], {...clamp, easing: (t) => t * t});
  if (f < at - 8) return null;
  const sc = 1.8 - 0.8 * p;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${sc})`,
        opacity: Math.min(1, p * 1.4) * 0.92,
        padding: `${size * 0.18}px ${size * 0.5}px`,
        border: `${size * 0.09}px double ${color}`,
        borderRadius: size * 0.18,
        color,
        fontFamily: FONT_BN,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: 0,
        mixBlendMode: 'multiply',
      }}
    >
      {text}
    </div>
  );
};

/** Period tram, side view, rails at (0,0), facing right; `wire` = y offset of the overhead wire. */
export const Tram: React.FC<{x: number; y: number; scale?: number; color?: string; lit?: boolean; wire?: number}> = ({x, y, scale = 1, color = '#2A2A48', lit = true, wire = -150}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <line x1={-40} y1={-92} x2={30} y2={wire} stroke={color} strokeWidth={3} />
    <circle cx={30} cy={wire} r={4} fill={lit ? '#FFE7A8' : color} />
    <rect x={-120} y={-92} width={240} height={10} rx={4} fill={color} />
    <rect x={-116} y={-84} width={232} height={70} rx={8} fill={color} />
    {[-96, -60, -24, 12, 48].map((wx) => (
      <rect key={wx} x={wx} y={-74} width={28} height={26} rx={3} fill={lit ? '#F2C77A' : '#4B4A6E'} opacity={lit ? 0.9 : 1} />
    ))}
    <rect x={86} y={-74} width={20} height={56} rx={3} fill={lit ? '#E9B866' : '#4B4A6E'} opacity={0.8} />
    <rect x={-116} y={-36} width={232} height={6} fill="#000" opacity={0.2} />
    <circle cx={-70} cy={-8} r={11} fill={color} />
    <circle cx={70} cy={-8} r={11} fill={color} />
  </g>
);

/** Simple stylised globe with drifting continent blobs and a pulse at (px, py) relative to the centre. */
export const Globe: React.FC<{x: number; y: number; r: number; frame: number; pulseAt?: number; px?: number; py?: number}> = ({x, y, r, frame, pulseAt = 0, px = -0.15, py = -0.35}) => {
  const shift = ((frame * 0.6) % (r * 4)) - r * 2;
  const blobs = [
    {cx: -0.4, cy: -0.35, rx: 0.32, ry: 0.2},
    {cx: -0.1, cy: 0.15, rx: 0.18, ry: 0.32},
    {cx: 0.45, cy: -0.2, rx: 0.36, ry: 0.22},
    {cx: 0.5, cy: 0.3, rx: 0.16, ry: 0.14},
    {cx: -0.75, cy: 0.35, rx: 0.2, ry: 0.28},
  ];
  const pk = ((frame - pulseAt) % 45) / 45;
  return (
    <g>
      <defs>
        <clipPath id="globe-clip">
          <circle cx={x} cy={y} r={r} />
        </clipPath>
        <radialGradient id="globe-shade" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff" stopOpacity={0.18} />
          <stop offset="1" stopColor="#000" stopOpacity={0.35} />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r + 10} fill={C.amber} opacity={0.08} />
      <circle cx={x} cy={y} r={r} fill="#24305A" />
      <g clipPath="url(#globe-clip)">
        {[-1, 0, 1].map((k) =>
          blobs.map((b, i) => <ellipse key={`${k}${i}`} cx={x + (b.cx * r + shift * 0 + k * r * 2) * 1} cy={y + b.cy * r} rx={b.rx * r} ry={b.ry * r} fill="#4F6B5A" opacity={0.9} transform={`translate(${(frame * 0.25) % (r * 2)} 0)`} />),
        )}
        {[-0.5, 0, 0.5].map((k) => (
          <ellipse key={k} cx={x} cy={y} rx={r * Math.abs(Math.cos(k * 1.4))} ry={r} fill="none" stroke="#fff" strokeOpacity={0.08} strokeWidth={2} />
        ))}
        <line x1={x - r} y1={y} x2={x + r} y2={y} stroke="#fff" strokeOpacity={0.08} strokeWidth={2} />
      </g>
      <circle cx={x} cy={y} r={r} fill="url(#globe-shade)" />
      {frame >= pulseAt && (
        <g>
          <circle cx={x + px * r} cy={y + py * r} r={10} fill={C.red} />
          <circle cx={x + px * r} cy={y + py * r} r={10 + pk * 60} fill="none" stroke={C.red} strokeWidth={4} opacity={1 - pk} />
        </g>
      )}
    </g>
  );
};

/** Magnifier lens at (x, y) with radius r; children are drawn in lens space (centre 0,0) and clipped. */
export const Lens: React.FC<{x: number; y: number; r: number; at: number; id: string; children: React.ReactNode; color?: string}> = ({x, y, r, at, id, children, color = C.ink}) => {
  const f = useCurrentFrame();
  const p = pop(f, at);
  const o = prog(f, at, 8);
  return (
    <g transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`} opacity={o}>
      <defs>
        <clipPath id={`lens-${id}`}>
          <circle cx={0} cy={0} r={r} />
        </clipPath>
      </defs>
      <circle cx={0} cy={0} r={r + 8} fill="#000" opacity={0.12} transform="translate(8 10)" />
      <circle cx={0} cy={0} r={r} fill="#FBF8F1" />
      <g clipPath={`url(#lens-${id})`}>{children}</g>
      <circle cx={0} cy={0} r={r} fill="none" stroke={color} strokeWidth={12} />
      <line x1={r * 0.72} y1={r * 0.72} x2={r * 1.25} y2={r * 1.25} stroke={color} strokeWidth={22} strokeLinecap="round" />
    </g>
  );
};

/** Hydraulic jack icon; `ext` 0..1 extends the piston. Base at (0,0), pushing up. */
export const Jack: React.FC<{x: number; y: number; ext: number; scale?: number; color?: string; rot?: number}> = ({x, y, ext, scale = 1, color = C.steel, rot = 0}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <rect x={-18} y={-40} width={36} height={40} rx={4} fill={color} />
    <rect x={-10} y={-40 - 22 * ext - 6} width={20} height={22 * ext + 6} fill={C.steelLight} />
    <rect x={-16} y={-46 - 22 * ext - 6} width={32} height={8} rx={2} fill={color} />
    <rect x={-22} y={-4} width={44} height={6} rx={2} fill={color} />
  </g>
);

/** A drawn pointing hand pushing to the right (fingertip at 0,0): sleeve, fist and an extended index finger. */
export const PushHand: React.FC<{x: number; y: number; scale?: number}> = ({x, y, scale = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-190} y={-26} width={86} height={52} rx={10} fill="#2F6FB5" />
    <rect x={-112} y={-30} width={16} height={60} rx={6} fill="#245A96" />
    <rect x={-98} y={-30} width={62} height={56} rx={22} fill="#E7B48A" />
    <rect x={-52} y={-24} width={52} height={18} rx={9} fill="#E7B48A" stroke="#C99570" strokeWidth={2} />
    <path d="M -70 -30 Q -60 -46 -44 -34" stroke="#C99570" strokeWidth={3} fill="#E7B48A" />
    {[0, 1, 2].map((i) => (
      <line key={i} x1={-46} y1={-2 + i * 9} x2={-38} y2={-2 + i * 9} stroke="#C99570" strokeWidth={2.5} strokeLinecap="round" />
    ))}
  </g>
);

/** Semicircle gauge at (x, y), value 0..1. */
export const Gauge: React.FC<{x: number; y: number; r: number; value: number; label: string; color?: string}> = ({x, y, r, value, label, color = C.red}) => {
  const a = Math.PI * (1 - value);
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`} fill="none" stroke="#E6DED0" strokeWidth={18} strokeLinecap="round" />
      <path d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r * Math.cos(a)} ${-r * Math.sin(a)}`} fill="none" stroke={color} strokeWidth={18} strokeLinecap="round" />
      <line x1={0} y1={0} x2={(r - 26) * Math.cos(a)} y2={-(r - 26) * Math.sin(a)} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <circle cx={0} cy={0} r={10} fill={C.ink} />
      <text x={0} y={46} textAnchor="middle" fontFamily={FONT_BN} fontWeight={700} fontSize={30} fill={C.ink}>
        {label}
      </text>
    </g>
  );
};

/**
 * End-on view of the bridge entrance (portal) in the archive style: lattice posts, the top K-bracing,
 * the road in perspective. Ribbon / scissors / barrier / walkers are optional overlays.
 */
export const Portal: React.FC<{
  frame: number;
  ribbon?: number; // 0 none, 1 stretched
  ribbonDrop?: number; // 0..1 unhooked and fallen
  scissors?: number; // opacity
  barrier?: number; // 0 closed, 1 lifted
  walkers?: number; // 0..1 how many people crossing
  color?: string;
}> = ({frame, ribbon = 0, ribbonDrop = 0, scissors = 0, barrier, walkers = 0, color = C.archInk}) => {
  const L = 520;
  const R = 1400;
  const top = 150;
  const road = 860;
  const lattice = (x: number) => (
    <g>
      <rect x={x - 34} y={top - 40} width={68} height={road - top + 40} fill={color} opacity={0.12} />
      <line x1={x - 30} y1={top - 40} x2={x - 30} y2={road} stroke={color} strokeWidth={10} />
      <line x1={x + 30} y1={top - 40} x2={x + 30} y2={road} stroke={color} strokeWidth={10} />
      {Array.from({length: 12}, (_, i) => {
        const y0 = top - 40 + i * 62;
        return <line key={i} x1={x - 30} y1={y0} x2={x + 30} y2={y0 + 62} stroke={color} strokeWidth={5} />;
      })}
      {Array.from({length: 12}, (_, i) => {
        const y0 = top - 40 + i * 62;
        return <line key={`b${i}`} x1={x + 30} y1={y0} x2={x - 30} y2={y0 + 62} stroke={color} strokeWidth={3} opacity={0.6} />;
      })}
    </g>
  );
  const ry = 600 + ribbonDrop * 250;
  const sag = 40 + ribbonDrop * 120;
  const rx1 = L + 30;
  const rx2 = R - 30 - ribbonDrop * 380;
  const sw = Math.sin(frame / 18) * 6;
  return (
    <g>
      {/* road in perspective, vanishing toward the far end of the bridge */}
      <path d={`M ${L - 200} 1080 L ${R + 200} 1080 L ${R - 120} ${road} L ${L + 120} ${road} Z`} fill={color} opacity={0.18} />
      <path d={`M 960 1080 L 960 ${road}`} stroke={color} strokeWidth={4} strokeDasharray="30 22" opacity={0.4} />
      {/* far truss seen through the portal */}
      <g opacity={0.35} stroke={color} strokeWidth={3}>
        {Array.from({length: 8}, (_, i) => {
          const x = L + 120 + i * ((R - L - 240) / 7);
          return <line key={i} x1={x} y1={road} x2={x + (i % 2 ? 30 : -30)} y2={road - 260} />;
        })}
        <line x1={L + 120} y1={road - 260} x2={R - 120} y2={road - 260} />
      </g>
      {lattice(L)}
      {lattice(R)}
      {/* top portal bracing */}
      <rect x={L} y={top - 40} width={R - L} height={14} fill={color} />
      <rect x={L} y={top + 70} width={R - L} height={12} fill={color} />
      {Array.from({length: 10}, (_, i) => {
        const x0 = L + i * ((R - L) / 10);
        const x1 = x0 + (R - L) / 10;
        return (
          <g key={i} stroke={color} strokeWidth={5}>
            <line x1={x0} y1={top - 26} x2={(x0 + x1) / 2} y2={top + 70} />
            <line x1={(x0 + x1) / 2} y1={top + 70} x2={x1} y2={top - 26} />
          </g>
        );
      })}
      {/* barrier (boom gate) */}
      {barrier !== undefined && barrier < 1 && (
        <g transform={`rotate(${-80 * barrier} ${L + 60} 700)`}>
          <rect x={L + 40} y={690} width={R - L - 140} height={22} rx={8} fill="#fff" stroke={color} strokeWidth={3} />
          {Array.from({length: 9}, (_, i) => (
            <rect key={i} x={L + 70 + i * 82} y={690} width={36} height={22} fill={C.archAccent} />
          ))}
        </g>
      )}
      {/* ribbon */}
      {ribbon > 0 && (
        <g opacity={ribbon}>
          <path d={`M ${rx1} ${ry} Q ${(rx1 + rx2) / 2} ${ry + sag + sw} ${rx2} ${ry}`} stroke={C.red} strokeWidth={16} fill="none" strokeLinecap="round" />
          <g transform={`translate(${(rx1 + rx2) / 2} ${ry + sag / 2 + 18 + sw * 0.5})`}>
            <path d="M 0 0 L -60 -32 L -60 32 Z M 0 0 L 60 -32 L 60 32 Z" fill={C.red} />
            <circle cx={0} cy={0} r={14} fill="#B8322A" />
            <path d="M -6 8 L -30 90 M 6 8 L 30 90" stroke={C.red} strokeWidth={12} strokeLinecap="round" />
          </g>
        </g>
      )}
      {/* scissors */}
      {scissors > 0 && (
        <g opacity={scissors} transform={`translate(1180 ${470 + Math.sin(frame / 10) * 10}) rotate(-20)`}>
          <circle cx={-52} cy={-26} r={22} fill="none" stroke="#7A7F92" strokeWidth={10} />
          <circle cx={-52} cy={26} r={22} fill="none" stroke="#7A7F92" strokeWidth={10} />
          <path d={`M -32 -16 L 80 ${6 + Math.sin(frame / 7) * 6} M -32 16 L 80 ${-6 - Math.sin(frame / 7) * 6}`} stroke="#9AA0B4" strokeWidth={12} strokeLinecap="round" />
          <circle cx={6} cy={0} r={6} fill="#5A5F72" />
        </g>
      )}
      {/* walkers, walking away from the viewer onto the bridge */}
      {walkers > 0 &&
        Array.from({length: 9}, (_, i) => {
          const k = ((frame / 160 + i / 9) % 1) * walkers;
          const d = 1 - k;
          const x = 960 + (i % 2 ? 1 : -1) * (40 + (i * 37) % 180) * d;
          const y = road + (1080 - road) * d * 0.9;
          const s = 0.35 + d * 0.9;
          return (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`} opacity={walkers}>
              <circle cx={0} cy={-150} r={18} fill={color} />
              <rect x={-20} y={-128} width={40} height={74} rx={14} fill={color} />
              <rect x={-16} y={-60} width={12} height={60} rx={5} fill={color} />
              <rect x={4} y={-60} width={12} height={60} rx={5} fill={color} />
            </g>
          );
        })}
    </g>
  );
};

/** Small mono label in Oswald (numbers) + Bengali unit used inside SVG. */
export const SvgNum: React.FC<{x: number; y: number; n: string; unit?: string; color: string; size?: number; anchor?: 'start' | 'middle' | 'end'}> = ({x, y, n, unit, color, size = 36, anchor = 'middle'}) => (
  <text x={x} y={y} textAnchor={anchor} fill={color}>
    <tspan fontFamily={FONT_NUM} fontWeight={600} fontSize={size}>
      {n}
    </tspan>
    {unit && (
      <tspan fontFamily={FONT_BN} fontWeight={700} fontSize={size * 0.6} dx={8}>
        {unit}
      </tspan>
    )}
  </text>
);
