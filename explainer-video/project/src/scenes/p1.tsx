import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Car, Check, Clock, Plus, Ship, User, Users} from 'lucide-react';
import {SceneProps, Sfx} from '../kit';
import {C, FONT_BN} from '../theme';
import {clamp, enter, pop, prog} from '../anim';
import {Chip, Head} from '../ui/text';
import {IconCard, YearCounter} from '../ui/cards';
import {AppWindow, Cursor, Toggle} from '../ui/app';
import {RouteMap} from '../ui/map';
import {Layer, Negation} from '../ui/svg';
import {HORIZON} from '../bg/NightSky';

export const S07: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const e = enter(f, 6, 20, 30, 10);
  return (
    <>
      <Head kicker="শুরুর কথা" text="দুই শহর, মাঝখানে [[নদী]]" at={2} world={world} y={56} />
      <div style={{position: 'absolute', left: 310, top: 290, opacity: e.opacity, transform: e.transform, filter: e.filter, borderRadius: 16, boxShadow: '0 20px 60px rgba(30,27,46,0.12)'}}>
        <RouteMap w={1300} h={600} labels={0} />
      </div>
      <Chip at={cue('হাওড়া')} x={560} y={600} text="হাওড়া" tone="orange" size={34} />
      <Chip at={cue('কলকাতা')} x={1220} y={600} text="কলকাতা" tone="orange" size={34} />
      <Sfx name="pop" at={cue('হাওড়া')} volume={0.3} />
      <Sfx name="pop" at={cue('কলকাতা')} volume={0.3} />
    </>
  );
};

const Station: React.FC<{frame: number}> = ({frame}) => (
  <g>
    <rect x={180} y={HORIZON - 190} width={520} height={190} fill="#1B1A33" />
    <rect x={150} y={HORIZON - 210} width={580} height={24} fill="#1B1A33" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <path key={i} d={`M ${215 + i * 80} ${HORIZON - 20} v -100 a 26 26 0 0 1 52 0 v 100 z`} fill={C.window} opacity={0.35 + 0.15 * Math.sin(frame / 20 + i)} />
    ))}
    <rect x={160} y={HORIZON - 300} width={70} height={110} fill="#1B1A33" />
    <rect x={650} y={HORIZON - 300} width={70} height={110} fill="#1B1A33" />
    <circle cx={195} cy={HORIZON - 255} r={20} fill="#F5E6C8" opacity={0.85} />
    <circle cx={685} cy={HORIZON - 255} r={20} fill="#F5E6C8" opacity={0.85} />
  </g>
);

export const S08: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const fillAt = cue('রোজ লক্ষ', -6);
  const cols = 14;
  const rows = 6;
  const shown = Math.floor(interpolate(f, [fillAt, fillAt + 70], [0, cols * rows], clamp));
  const e = enter(f, fillAt - 10, 16, 30, 10);
  return (
    <>
      <Layer>
        <g opacity={prog(f, 0, 14)}>
          <Station frame={f} />
        </g>
      </Layer>
      <Chip at={cue('দেশের', -4)} x={960} y={150} text="দেশের ব্যস্ততম স্টেশনগুলোর একটা" world={world} size={34} />
      <div
        style={{
          position: 'absolute',
          left: 830,
          top: 230,
          width: 920,
          padding: 30,
          borderRadius: 20,
          background: 'rgba(36,32,61,0.94)',
          border: `1.5px solid ${C.cardNightBorder}`,
          boxShadow: '0 18px 50px rgba(0,0,0,0.45)',
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 10,
          opacity: e.opacity,
          transform: e.transform,
          filter: e.filter,
        }}
      >
        {new Array(cols * rows).fill(0).map((_, i) => {
          const on = i < shown;
          const p = on ? pop(f, fillAt + (i / (cols * rows)) * 70) : 0;
          return (
            <div key={i} style={{height: 50, borderRadius: 10, background: on ? (i % 5 === 0 ? '#3A2E2A' : '#2E2A4A') : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${0.4 + 0.6 * p})`, opacity: on ? 1 : 0}}>
              {i % 5 === 0 ? <Users size={26} color={C.amber} /> : <User size={26} color="#B9B4D8" />}
            </div>
          );
        })}
      </div>
      <Chip at={cue('নদী পেরিয়ে')} x={1290} y={720} text="→ নদী পেরিয়ে কলকাতা" world={world} tone="dark" size={30} />
    </>
  );
};

const MiniBridge: React.FC<{f: number}> = ({f}) => (
  <svg width={190} height={110}>
    <rect x={0} y={70} width={190} height={8} fill={C.steel} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line key={i} x1={i * 32} y1={70} x2={i * 32 + 16} y2={40} stroke={C.steel} strokeWidth={4} />
    ))}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line key={'b' + i} x1={i * 32 + 16} y1={40} x2={i * 32 + 32} y2={70} stroke={C.steel} strokeWidth={4} />
    ))}
    <rect x={0} y={38} width={190} height={5} fill={C.steel} />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <rect key={'c' + i} x={6 + i * 26 + Math.sin(f / 12 + i) * 1.5} y={58} width={20} height={10} rx={3} fill={i % 2 ? C.red : C.amber} />
    ))}
    <rect x={20} y={78} width={10} height={32} fill={C.steel} />
    <rect x={160} y={78} width={10} height={32} fill={C.steel} />
  </svg>
);

export const S09: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const a = cue('ব্রিজে', -6);
  const b = cue('ফেরিঘাটে', -6);
  const d = cue('দূরত্ব', -4);
  return (
    <>
      <Head text="পারাপারের রাস্তা [[হাতে গোনা]]" at={2} world={world} y={70} />
      <IconCard at={a} x={420} y={280} w={460} h={360} world={world} icon={<MiniBridge f={f} />} label="ব্রিজ">
        <div style={{display: 'flex', gap: 8, color: C.red}}>
          <Car size={28} />
          <Car size={28} />
          <Car size={28} />
          <Car size={28} />
        </div>
      </IconCard>
      <IconCard at={b} x={1040} y={280} w={460} h={360} world={world} icon={<Ship size={96} strokeWidth={1.6} />} label="ফেরি">
        <div style={{display: 'flex', gap: 4, color: C.inkSoft, alignItems: 'center'}}>
          <Users size={28} />
          <Users size={28} />
          <Users size={28} />
          <Clock size={28} color={C.red} style={{marginLeft: 10}} />
        </div>
      </IconCard>
      <Chip at={a + 20} x={830} y={300} text="ধীর" tone="red" size={26} />
      <Chip at={b + 20} x={1450} y={300} text="ভিড়" tone="red" size={26} />
      <Chip at={d} x={760} y={760} text="দূরত্ব: সামান্য" tone="green" size={32} />
      <Chip at={cue('সময় লেগে', -2)} x={1160} y={760} text="সময়: অনেকটা" tone="red" size={32} />
    </>
  );
};

export const S10: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const y0 = cue('উনিশশো', -20);
  const ns = prog(f, cue('উত্তর থেকে'), 40);
  const e = enter(f, cue('তবে', -10), 18, 30, 10);
  return (
    <>
      <YearCounter from={1950} to={1984} at={y0} x={220} y={330} label="ভারতের প্রথম মেট্রো" world={world} />
      <div style={{position: 'absolute', left: 980, top: 230, opacity: e.opacity, transform: e.transform, filter: e.filter, borderRadius: 16, boxShadow: '0 20px 60px rgba(30,27,46,0.12)'}}>
        <RouteMap w={740} h={560} northSouth={ns} />
      </div>
      <Chip at={cue('শহরের ভেতরে')} x={1490} y={860} text="শুধু শহরের ভেতরে" tone="blue" size={30} />
      <div style={{position: 'absolute', left: 1080, top: 420}}>
        <Negation at={cue('নদীর ওপারে')} size={170} />
      </div>
      <Sfx name="tick" at={y0 + 10} volume={0.25} />
    </>
  );
};

/** Shared route-planner window used by S11, S12, S48, S51. */
export const RouteWindow: React.FC<{at: number; title?: string; draw: number; split?: number; gapFill?: number; children?: React.ReactNode; top?: number}> = ({
  at,
  title = 'ইস্ট-ওয়েস্ট মেট্রো',
  draw,
  split = 0,
  gapFill = 0,
  children,
  top = 200,
}) => {
  const f = useCurrentFrame();
  return (
    <AppWindow x={260} y={top} w={1400} h={720} at={at} title={title}>
      <div style={{position: 'absolute', left: 34, top: 90}}>
        <RouteMap w={1266} h={540} draw={draw} split={split} gapFill={gapFill} pulse={0.5 + 0.5 * Math.sin(f / 5)} />
      </div>
      {children}
    </AppWindow>
  );
};

export const S11: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const click = cue('নতুন লাইনের', -4);
  const draw = interpolate(f, [click + 10, cue('হাওড়া ময়দান', 10)], [0, 1], clamp);
  const btn = pop(f, 14);
  return (
    <>
      <RouteWindow at={0} draw={draw}>
        <div
          style={{
            position: 'absolute',
            right: 40,
            top: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 22px',
            borderRadius: 999,
            background: f >= click + 3 ? C.green : C.orange,
            color: '#fff',
            fontFamily: FONT_BN,
            fontWeight: 700,
            fontSize: 26,
            transform: `scale(${(0.6 + 0.4 * btn) * (f >= click && f < click + 5 ? 0.92 : 1)})`,
          }}
        >
          {f >= click + 3 ? <Check size={24} /> : <Plus size={24} />} রুট
        </div>
      </RouteWindow>
      <Cursor path={[[0, 1500, 980], [click - 18, 1555, 300], [click + 30, 1555, 300], [click + 70, 1420, 860]]} clicks={[click]} />
      <Sfx name="click" at={click} volume={0.5} />
      <Sfx name="swoosh-soft" at={click + 10} volume={0.3} />
    </>
  );
};

const ToggleRow: React.FC<{label: string; on: number; shake?: number; tag?: React.ReactNode; ok?: boolean}> = ({label, on, shake = 0, tag, ok}) => (
  <div style={{marginBottom: 26}}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 22px',
        borderRadius: 14,
        background: '#FAF8F3',
        border: `1.5px solid ${ok ? C.green : '#ECE7DC'}`,
        transform: `translateX(${Math.sin(shake * 40) * 10 * (shake > 0 && shake < 1 ? 1 : 0)}px)`,
        fontFamily: FONT_BN,
        fontWeight: 600,
        fontSize: 28,
      }}
    >
      <span>{label}</span>
      <Toggle on={on} color={ok ? C.green : C.red} />
    </div>
    {tag}
  </div>
);

export const S12: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const panel = prog(f, cue('মাঝখানে', -4), 20);
  const t1on = cue('ব্রিজ বানানো', -12);
  const t1off = cue('ঝামেলার', -4);
  const t2on = cue('ট্রেন যেমন', -6);
  const on1 = f < t1on ? 0 : f < t1off ? prog(f, t1on, 6) : 1 - prog(f, t1off + 6, 6);
  const shake = f >= t1off && f < t1off + 14 ? (f - t1off) / 14 : 0;
  const on2 = prog(f, t2on, 6);
  return (
    <>
      <Head kicker="সিদ্ধান্ত" text="শর্তটা [[কঠিন]]" at={cue('মাঝখানে', -4)} world={world} y={40} />
      <RouteWindow at={-40} draw={1} top={220}>
        <div style={{position: 'absolute', inset: 0, background: `rgba(255,255,255,${0.45 * panel})`}} />
        <div
          style={{
            position: 'absolute',
            right: 30,
            top: 20,
            width: 600,
            padding: 30,
            borderRadius: 18,
            background: '#fff',
            border: `1.5px solid #E3DDD0`,
            boxShadow: '0 20px 50px rgba(30,27,46,0.15)',
            transform: `translateX(${(1 - panel) * 700}px)`,
            fontFamily: FONT_BN,
          }}
        >
          <div style={{fontWeight: 700, fontSize: 34, marginBottom: 26}}>নদী পার হবে কীভাবে?</div>
          <ToggleRow
            label="নদীর ওপর দিয়ে · ব্রিজ"
            on={on1}
            shake={shake}
            tag={
              <div style={{marginTop: 10, color: C.red, fontWeight: 600, fontSize: 22, opacity: prog(f, t1off + 4, 10)}}>✕ মাটির নিচ থেকে আবার উঠতে হবে</div>
            }
          />
          <ToggleRow
            label="নদীর নিচ দিয়ে · সুড়ঙ্গ"
            on={on2}
            ok
            tag={<div style={{marginTop: 10, color: C.green, fontWeight: 700, fontSize: 22, opacity: prog(f, t2on + 6, 10)}}>✓ মাটির নিচেই থাকবে ট্রেন</div>}
          />
        </div>
      </RouteWindow>
      <Cursor path={[[0, 900, 980], [t1on - 14, 1560, 455], [t1off + 20, 1560, 455], [t2on - 14, 1560, 568], [t2on + 60, 1300, 860]]} clicks={[t1on, t2on]} at={cue('মাঝখানে')} />
      <Sfx name="click" at={t1on} volume={0.5} />
      <Sfx name="thud" at={t1off} volume={0.35} />
      <Sfx name="click" at={t2on} volume={0.5} />
      <Sfx name="ding" at={t2on + 6} volume={0.25} />
    </>
  );
};
