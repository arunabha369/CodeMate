import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {HeartPulse, House, MapPin, TriangleAlert, Users} from 'lucide-react';
import {SceneProps, Sfx} from '../kit';
import {C, FONT_BN} from '../theme';
import {clamp, easeInOut, enter, pop, prog, rng} from '../anim';
import {Chip, Head} from '../ui/text';
import {Calendar, StatCard} from '../ui/cards';
import {RouteMap} from '../ui/map';
import {Layer, Specks} from '../ui/svg';
import {TBM} from '../ui/tbm';
import {RouteWindow} from './p1';

export const S42: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const fly = prog(f, 4, 24);
  const flipAt = cue('বলেছিলাম', -6);
  const fp = prog(f, flipAt, 16);
  const sx = Math.abs(Math.cos(fp * Math.PI));
  const back = fp > 0.5;
  return (
    <>
      <Head kicker="মনে আছে?" text="আসল বিপদ: {{ডাঙায়}}" at={cue('বলেছিলাম', 4)} world={world} y={60} />
      <div
        style={{
          position: 'absolute',
          left: 960 - 170 + interpolate(fly, [0, 1], [-900, 0]),
          top: 330,
          width: 340,
          height: 370,
          borderRadius: 22,
          background: 'rgba(36,32,61,0.96)',
          border: `2px solid ${C.red}`,
          boxShadow: `0 0 50px ${C.red}66`,
          transform: `scaleX(${sx}) rotate(${(1 - fly) * -12}deg)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          fontFamily: FONT_BN,
          color: '#fff',
          opacity: fly,
        }}
      >
        {back ? <TriangleAlert size={150} color={C.red} strokeWidth={1.8} /> : <span style={{fontSize: 160, fontWeight: 700, color: C.red, lineHeight: 1}}>?</span>}
        <span style={{fontSize: 34, fontWeight: 700}}>{back ? 'শুকনো ডাঙায়' : 'অন্য কোথাও…'}</span>
      </div>
      <Sfx name="whoosh" at={4} volume={0.3} />
      <Sfx name="swoosh-soft" at={flipAt} volume={0.3} />
    </>
  );
};

export const S43: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const pin = cue('বউবাজার', -6);
  const e = enter(f, 10, 18, 30, 10);
  const pp = pop(f, pin);
  return (
    <>
      <Calendar month="আগস্ট" day="31" year="2019" at={2} x={560} y={540} scale={1.2} />
      <div style={{position: 'absolute', left: 900, top: 270, opacity: e.opacity, transform: e.transform, filter: e.filter, borderRadius: 16, boxShadow: '0 20px 60px rgba(30,27,46,0.12)'}}>
        <RouteMap w={840} h={540} labels={0} />
      </div>
      <div style={{position: 'absolute', left: 900 + 840 * 0.5 - 40, top: 270 + 540 * 0.52 - 86, color: C.red, transform: `scale(${pp})`, transformOrigin: '50% 100%'}}>
        <MapPin size={80} fill="#FBE3E0" strokeWidth={2.2} />
      </div>
      <Chip at={pin + 6} x={900 + 840 * 0.5} y={270 + 540 * 0.52 + 40} text="বউবাজার" tone="red" size={32} />
      <Chip at={cue('মধ্য কলকাতার', -2)} x={1320} y={230} text="মধ্য কলকাতা · নদী থেকে খানিক দূরে" size={26} />
    </>
  );
};

/** Old-town cross-section used by S44/S45. */
const OldTown: React.FC<{sag: number; crack: number; collapse: number; flood: number; reveal: number; tbmX: number; f: number}> = ({sag, crack, collapse, flood, reveal, tbmX, f}) => {
  const G = 420;
  const r = rng(77);
  const surf = (x: number) => G + sag * 70 * Math.exp(-Math.pow((x - 1420) / 260, 2));
  const pts = new Array(49).fill(0).map((_, i) => i * 40);
  const ground = `M 0 ${G} ${pts.map((x) => `L ${x} ${surf(x).toFixed(1)}`).join(' ')} L 1920 ${surf(1920)} L 1920 1080 L 0 1080 Z`;
  const blds = [
    {x: 120, w: 170, fl: 3},
    {x: 330, w: 150, fl: 4},
    {x: 520, w: 190, fl: 3},
    {x: 760, w: 160, fl: 4},
    {x: 960, w: 180, fl: 3},
    {x: 1180, w: 170, fl: 4},
    {x: 1390, w: 160, fl: 3},
    {x: 1590, w: 180, fl: 4},
  ];
  const parts = new Array(40).fill(0).map(() => ({ph: r(), y: r(), s: 4 + r() * 6, w: r() < 0.5}));
  const front = tbmX + 700;
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      <rect width={1920} height={G} fill={C.paper} />
      <path d={ground} fill={C.ground} />
      <path d={`M 0 ${G + 300} Q 960 ${G + 280} 1920 ${G + 310} L 1920 1080 L 0 1080 Z`} fill={C.groundDeep} />
      <Specks x={0} y={G} w={1920} h={660} n={160} frame={f} color={C.mudDark} opacity={0.18} />
      <ellipse cx={1460} cy={800} rx={250 - flood * 60} ry={120 - flood * 30} fill={C.sky} opacity={0.75 * reveal} />
      {reveal > 0 && reveal < 1 && <ellipse cx={1460} cy={800} rx={250 + 80 * reveal} ry={120 + 40 * reveal} fill="none" stroke={C.sky} strokeWidth={4} opacity={1 - reveal} />}
      {new Array(Math.max(0, Math.floor((tbmX + 252) / 46))).fill(0).map((_, i) => (
        <g key={i}>
          <rect x={tbmX + 252 - (i + 1) * 46} y={720} width={42} height={18} fill={C.concrete} />
          <rect x={tbmX + 252 - (i + 1) * 46} y={862} width={42} height={18} fill={C.concrete} />
        </g>
      ))}
      <TBM x={tbmX} y={800} len={700} h={160} rot={f} rings={0} muck={f / 100} />
      {flood > 0 &&
        parts.map((p, i) => {
          const t = ((f / 30 + p.ph) % 1);
          const x = 1220 - t * 260 * flood;
          return <circle key={i} cx={Math.min(x, front + 40)} cy={740 + p.y * 120} r={p.s} fill={p.w ? C.sky : '#9C8462'} opacity={flood * Math.sin(t * Math.PI)} />;
        })}
      {blds.map((b, i) => {
        const cx = b.x + b.w / 2;
        const dy = surf(cx) - G;
        const tilt = (cx - 1420) / 260 * -6 * sag * Math.exp(-Math.pow((cx - 1420) / 300, 2));
        const isFall = i === 6;
        const fall = isFall ? collapse : 0;
        const h = b.fl * 56;
        return (
          <g key={i} transform={`translate(${cx} ${G + dy + fall * 260}) rotate(${tilt + fall * 24}) translate(${-cx} ${-G})`} opacity={1 - fall}>
            <rect x={b.x} y={G - h} width={b.w} height={h} fill={i % 2 ? '#B9A39A' : '#C9B8A6'} stroke="#8F7D72" strokeWidth={2} />
            {new Array(b.fl).fill(0).map((_, k) => (
              <g key={k}>
                <rect x={b.x + 14} y={G - h + 12 + k * 56} width={b.w - 28} height={8} fill="#8F7D72" />
                {[0, 1, 2].map((wi) => (
                  <rect key={wi} x={b.x + 18 + wi * ((b.w - 36) / 3)} y={G - h + 24 + k * 56} width={(b.w - 36) / 3 - 10} height={24} rx={3} fill="#F3E3C8" />
                ))}
              </g>
            ))}
            <rect x={b.x - 6} y={G - h - 10} width={b.w + 12} height={12} fill="#8F7D72" />
            {crack > 0 && Math.abs(cx - 1420) < 420 && (
              <path d={`M ${cx - 10} ${G - h + 10} l 14 30 l -18 26 l 16 34 l -12 40`} stroke={C.red} strokeWidth={4} fill="none" strokeDasharray={160} strokeDashoffset={160 * (1 - crack)} />
            )}
          </g>
        );
      })}
    </svg>
  );
};

export const S44: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const hit = cue('ধাক্কা খেল', -4);
  const tbmX = interpolate(f, [0, hit], [260, 520], {...clamp, easing: easeInOut});
  const reveal = prog(f, cue('লুকোনো', -4), 24);
  return (
    <>
      <OldTown sag={0} crack={0} collapse={0} flood={0} reveal={reveal} tbmX={tbmX} f={f} />
      <Chip at={cue('চণ্ডী', -4)} x={tbmX + 470} y={660} text="চণ্ডী" tone="orange" size={32} />
      <Chip at={cue('অ্যাকুইফার', -4)} x={1460} y={970} text="অ্যাকুইফার · মাটির নিচের জলস্তর" tone="blue" size={28} />
      <Sfx name="thud" at={hit} volume={0.4} />
    </>
  );
};

export const S45: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const flood = prog(f, 0, 30);
  const sag = prog(f, cue('বসে যেতে', -10), 70, easeInOut);
  const crack = prog(f, cue('ফাটল', -8), 30);
  const colAt = cue('ভেঙেও পড়ল', -10);
  const collapse = prog(f, colAt, 30, easeInOut);
  const shake = f >= colAt && f < colAt + 6 ? Math.sin(f * 3) * 6 : 0;
  return (
    <>
      <div style={{position: 'absolute', inset: 0, transform: `translate(${shake}px, ${shake * 0.6}px)`}}>
        <OldTown sag={sag} crack={crack} collapse={collapse} flood={flood} reveal={1} tbmX={520} f={f} />
      </div>
      <Head text="মাটি {{বসে}} গেল" at={cue('বসে যেতে', -6)} world={world} y={60} />
      <Sfx name="rumble" at={cue('বসে যেতে', -10)} volume={0.35} />
      <Sfx name="thud" at={colAt + 10} volume={0.5} />
    </>
  );
};

export const S46: React.FC<SceneProps> = ({cue, world}) => {
  const a = cue('শুধু প্রথম', -6);
  return (
    <>
      <Chip at={cue('রাতারাতি', -2)} x={960} y={190} text="রাতারাতি ঘরছাড়া" world={world} tone="dark" size={36} />
      <StatCard at={a} x={300} y={330} scale={1.25} world={world} icon={<Users size={36} />} value={250} prefix="~" label="প্রথম দিনেই হোটেলে সরানো হলো" />
      <StatCard at={a + 14} x={1040} y={330} scale={1.25} world={world} icon={<House size={36} />} value={52} label="পরিবার পেল ক্ষতিপূরণ" dur={30} />
      <Chip at={cue('ভাগ্য ভালো', -2)} x={960} y={720} text="কারও প্রাণ যায়নি" tone="green" size={36} icon={<HeartPulse size={30} color={C.green} />} />
      <Sfx name="tick" at={a + 8} volume={0.3} />
    </>
  );
};

const SoilCol: React.FC<{x: number; title: string; ok: boolean; f: number; cues?: number[]}> = ({x, title, ok, f, cues = []}) => {
  const y = 300;
  const w = 600;
  const h = 560;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={C.ground} />
      {ok ? (
        <>
          <rect x={x} y={y + 160} width={w} height={150} fill={C.groundDeep} />
          <rect x={x} y={y + 310} width={w} height={250} rx={14} fill={C.groundDeeper} />
        </>
      ) : (
        <>
          <path d={`M ${x} ${y + 120} q 150 60 300 0 t 300 30 v 120 q -160 -40 -300 10 t -300 -20 z`} fill="#8C7556" opacity={prog(f, cues[0] ?? 0, 16)} />
          <ellipse cx={x + 180} cy={y + 360} rx={150} ry={60} fill="#E6D3A8" opacity={prog(f, cues[1] ?? 0, 16)} />
          <ellipse cx={x + 440} cy={y + 430} rx={120} ry={52} fill={C.sky} opacity={0.8 * prog(f, cues[2] ?? 0, 16)} />
          <ellipse cx={x + 380} cy={y + 270} rx={70} ry={30} fill="#E6D3A8" opacity={prog(f, cues[1] ?? 0, 16)} />
        </>
      )}
      <text x={x + w / 2} y={y - 24} textAnchor="middle" fontFamily={FONT_BN} fontWeight={700} fontSize={34} fill={C.ink}>
        {title}
      </text>
    </g>
  );
};

export const S47: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const c = [cue('শক্ত কাদা', -4), cue('আলগা বালি', -4), cue('লুকিয়ে থাকা', -4)];
  const right = cue('কিন্তু শহরের', -6);
  return (
    <>
      <Head text="শহরের নিচের মাটি [[অচেনা]]" at={2} world={world} y={50} />
      <Layer>
        <g opacity={prog(f, 6, 16)}>
          <SoilCol x={260} title="নদীর নিচে" ok f={f} />
        </g>
        <g opacity={prog(f, right, 16)}>
          <SoilCol x={1060} title="পুরনো শহরের নিচে" ok={false} f={f} cues={c} />
        </g>
      </Layer>
      <Chip at={cue('প্রস্তুতি', 4)} x={560} y={920} text="✓ প্রস্তুতি পুরোদমে" tone="green" size={28} />
      <Chip at={right + 10} x={1360} y={920} text="⚠ সব জায়গায় এক রকম নয়" tone="red" size={28} />
      <Chip at={c[0]} x={1360} y={460} text="শক্ত কাদা" size={24} />
      <Chip at={c[1]} x={1240} y={660} text="আলগা বালি" size={24} />
      <Chip at={c[2]} x={1500} y={800} text="লুকোনো জল" tone="blue" size={24} />
    </>
  );
};

export const S48: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const split = prog(f, cue('দুই টুকরোয়', -6), 12);
  return (
    <>
      <RouteWindow at={0} draw={1} split={split} title="ইস্ট-ওয়েস্ট মেট্রো · 2019–2025" />
      <Chip at={cue('দুই টুকরোয়', 4)} x={960} y={150} text="মেট্রো চলল দুই টুকরোয়" tone="red" size={34} />
      <Chip at={cue('মাঝখানের', -4)} x={991} y={770} text="বউবাজার · ফাঁক" tone="red" size={28} />
      <Chip at={cue('একদিকে', 4)} x={1400} y={560} text="সল্টলেক → শিয়ালদা" size={24} />
      <Chip at={cue('অন্যদিকে', 4)} x={560} y={560} text="এসপ্ল্যানেড → হাওড়া ময়দান" size={24} />
    </>
  );
};
