import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ArrowDown, ArrowUp, Check} from 'lucide-react';
import {SceneProps, Sfx} from '../kit';
import {C, FONT_BN} from '../theme';
import {clamp, easeInOut, enter, pop, prog, rng} from '../anim';
import {Chip, Head, Num} from '../ui/text';
import {AppWindow, Cursor, LineChart, Slider} from '../ui/app';
import {Building, DimArrow, Layer} from '../ui/svg';
import {TBM} from '../ui/tbm';
import {CrossSection} from '../ui/xs';

export const S19: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 70], [1900, 330], {...clamp, easing: easeInOut});
  return (
    <>
      <Layer>
        <ellipse cx={x + 650} cy={800} rx={800} ry={60} fill="#000" opacity={0.25} />
        <TBM x={x} y={760} len={1300} h={260} rot={f} silhouette rings={8} />
      </Layer>
      <Head kicker="জার্মানি থেকে এল" text="টানেল বোরিং [[মেশিন]]" at={cue('টানেল', -8)} world={world} y={70} />
      <Chip at={cue('টি-বি-এম', -2)} x={960} y={300} text={<Num size={44}>TBM</Num>} tone="orange" world={world} size={30} />
      <Sfx name="rumble" at={2} volume={0.25} />
    </>
  );
};

export const S20: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const a = cue('দুটো যন্ত্র', -10);
  const x1 = interpolate(f, [a, a + 40], [1950, 480], {...clamp, easing: easeInOut});
  const x2 = interpolate(f, [a + 10, a + 50], [1950, 560], {...clamp, easing: easeInOut});
  return (
    <>
      <Layer>
        <TBM x={x1} y={380} len={900} h={170} rot={f} silhouette rings={6} />
        <TBM x={x2} y={770} len={900} h={170} rot={f + 20} silhouette rings={6} />
      </Layer>
      <Chip at={cue('প্রেরণা')} x={930} y={240} text="প্রেরণা" tone="orange" world={world} size={52} />
      <Chip at={cue('রচনা')} x={1010} y={630} text="রচনা" tone="blue" world={world} size={52} />
      <Sfx name="pop" at={cue('প্রেরণা')} volume={0.35} />
      <Sfx name="pop" at={cue('রচনা')} volume={0.35} />
    </>
  );
};

const CutterFace: React.FC<{cx: number; cy: number; r: number; rot: number}> = ({cx, cy, r, rot}) => (
  <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
    <circle r={r + 14} fill={C.steel} />
    <circle r={r} fill="#5D6176" />
    {new Array(6).fill(0).map((_, i) => (
      <g key={i} transform={`rotate(${i * 60})`}>
        <rect x={-14} y={-r} width={28} height={r} fill={C.steelLight} />
        {new Array(5).fill(0).map((__, k) => (
          <rect key={k} x={-22} y={-r + 20 + k * (r / 5.5)} width={12} height={16} rx={2} fill="#D9DCE6" />
        ))}
      </g>
    ))}
    <circle r={46} fill={C.orange} />
    <circle r={18} fill="#fff" opacity={0.6} />
  </g>
);

export const S21: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const a = prog(f, 0, 18);
  return (
    <>
      <Layer>
        <g opacity={a}>
          <line x1={300} x2={1620} y1={800} y2={800} stroke={C.groundDeeper} strokeWidth={4} />
          <CutterFace cx={720} cy={570} r={210} rot={f * 0.8} />
          <g transform={`translate(0 ${(1 - prog(f, 10, 20)) * 60})`} opacity={prog(f, 10, 16)}>
            <g>
              <path d="M 1100 460 L 1320 330 L 1540 460 Z" fill="#7A6F80" />
              <rect x={1130} y={460} width={380} height={340} fill="#C9B8A6" stroke="#8F7D72" strokeWidth={3} />
              <rect x={1130} y={625} width={380} height={10} fill="#8F7D72" />
              {[0, 1, 2].map((i) => (
                <rect key={'u' + i} x={1160 + i * 120} y={500} width={80} height={90} rx={6} fill="#F3E3C8" stroke="#8F7D72" strokeWidth={3} />
              ))}
              {[0, 2].map((i) => (
                <rect key={'d' + i} x={1160 + i * 120} y={665} width={80} height={90} rx={6} fill="#F3E3C8" stroke="#8F7D72" strokeWidth={3} />
              ))}
              <rect x={1285} y={680} width={70} height={120} rx={6} fill="#8A5A2B" />
            </g>
          </g>
          <DimArrow x1={1010} y1={340} x2={1010} y2={800} at={cue('দোতলা', -14)} />
        </g>
      </Layer>
      <Chip at={cue('দোতলা')} x={1010} y={250} text="দোতলা বাড়ির সমান উঁচু" tone="orange" size={34} />
    </>
  );
};

const Callout: React.FC<{at: number; px: number; py: number; lx: number; ly: number; n: number; text: string; active?: number}> = ({at, px, py, lx, ly, n, text, active = 0}) => {
  const f = useCurrentFrame();
  const p = prog(f, at, 14);
  return (
    <>
      <Layer>
        <g opacity={p}>
          <circle cx={px} cy={py} r={7} fill={C.orange} />
          <line x1={px} y1={py} x2={px + (lx - px) * p} y2={py + (ly - py) * p} stroke={C.ink} strokeWidth={2} strokeDasharray="5 5" />
        </g>
      </Layer>
      <Chip
        at={at + 8}
        x={lx}
        y={ly}
        tone={active > 0.5 ? 'orange' : 'neutral'}
        size={26}
        text={
          <span style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <span style={{width: 30, height: 30, borderRadius: 15, background: active > 0.5 ? '#fff' : C.orange, color: active > 0.5 ? C.orange : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Oswald', fontSize: 20}}>{n}</span>
            {text}
          </span>
        }
      />
    </>
  );
};

/** TBM cutaway geometry used by S22/S23. */
const CUT = {x: 300, y: 600, len: 1320, h: 300};
const shieldX = CUT.x + CUT.len * 0.36;
const front = CUT.x + CUT.len;

export const S22: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const c0 = cue('চলমান কারখানা', -6);
  const cutterOn = f >= cue('বিশাল ঘুরন্ত', -4) ? 1 : 0;
  const e = enter(f, 4, 20, 30, 8);
  return (
    <>
      <Head kicker="ভেতর থেকে" text="একটা চলমান [[কারখানা]]" at={2} world={world} y={56} />
      <Layer style={{opacity: e.opacity}}>
        <TBM {...CUT} rot={f * 1.2} screw={f * 2} muck={f / 200} highlight={cutterOn ? 'cutter' : null} />
      </Layer>
      <Callout at={c0} px={front - 20} py={CUT.y - 120} lx={1640} ly={330} n={1} text="ঘুরন্ত কাটার-হেড" active={cutterOn} />
      <Callout at={c0 + 10} px={front - 90} py={CUT.y + 60} lx={1520} ly={860} n={2} text="মাটির চেম্বার" />
      <Callout at={c0 + 20} px={(front - 110 + shieldX + 120) / 2} py={(CUT.y + 116 + CUT.y - 30) / 2} lx={1050} ly={330} n={3} text="প্যাঁচানো স্ক্রু" />
      <Callout at={c0 + 30} px={shieldX + 150} py={CUT.y - 60} lx={760} ly={330} n={4} text="রিং বসানোর হাত" />
      <Callout at={c0 + 40} px={CUT.x + 170} py={CUT.y} lx={420} ly={860} n={5} text="পেছনের কারখানা" />
      <Sfx name="pop" at={c0 + 8} volume={0.2} />
      <Sfx name="pop" at={c0 + 28} volume={0.2} />
      <Sfx name="pop" at={c0 + 48} volume={0.2} />
    </>
  );
};

export const S23: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const z = prog(f, 0, 30);
  const scale = interpolate(z, [0, 1], [1, 1.45]);
  const fx = front - 260;
  const tx = interpolate(z, [0, 1], [0, 960 - fx * scale]);
  const ty = interpolate(z, [0, 1], [0, 500 - CUT.y * scale]);
  const flowAt = cue('প্যাঁচানো স্ক্রু', -10);
  const flow = prog(f, flowAt, 20);
  const sx1 = front - 110;
  const sy1 = CUT.y + CUT.h / 2 - 34;
  const sx2 = shieldX + 120;
  const sy2 = CUT.y - 30;
  const r = rng(31);
  const parts = new Array(22).fill(0).map(() => ({ph: r(), s: 6 + r() * 6}));
  const cartsAt = cue('ছোট ছোট গাড়িতে', -10);
  const carts = prog(f, cartsAt, 14);
  return (
    <>
      <Layer>
        <g transform={`translate(${tx} ${ty}) scale(${scale})`}>
          <TBM {...CUT} rot={f * 1.2} screw={f * 3} muck={f / 120} highlight={f > flowAt ? 'screw' : 'chamber'} />
          {flow > 0 &&
            parts.map((p, i) => {
              const t = ((f - flowAt) / 70 + p.ph) % 1;
              return <circle key={i} cx={sx1 + (sx2 - sx1) * t} cy={sy1 + (sy2 - sy1) * t} r={p.s} fill={C.mudDark} opacity={flow * Math.sin(t * Math.PI)} />;
            })}
        </g>
        <g opacity={carts}>
          <line x1={0} x2={1920} y1={905} y2={905} stroke={C.steel} strokeWidth={4} />
          {[0, 1, 2, 3].map((k) => {
            const cx = 1500 - ((f - cartsAt) * 3 + k * 380) % 1600;
            return (
              <g key={k} transform={`translate(${cx} 860)`}>
                <path d="M -70 -10 L 70 -10 L 56 36 L -56 36 Z" fill={C.steelLight} />
                <ellipse cx={0} cy={-12} rx={62} ry={22} fill={C.mudDark} />
                <circle cx={-40} cy={42} r={10} fill={C.steel} />
                <circle cx={40} cy={42} r={10} fill={C.steel} />
              </g>
            );
          })}
        </g>
      </Layer>
      <Chip at={cue('কাটা মাটি', -4)} x={960} y={110} text="কাটা মাটি → স্ক্রু → গাড়ি → বাইরে" size={34} />
      <Sfx name="swoosh-soft" at={flowAt} volume={0.3} />
    </>
  );
};

const Arrows: React.FC<{dir: 1 | -1; color: string; f: number; at: number}> = ({dir, color, f, at}) => {
  const p = prog(f, at, 24);
  const quiver = p >= 1 ? Math.sin(f / 2.5) * 6 : 0;
  const dx = dir * (interpolate(p, [0, 1], [-520, -30]) + quiver);
  return (
    <g transform={`translate(${960 + dx} 560)`} opacity={Math.min(1, p * 2)}>
      {[-150, 0, 150].map((yy) => (
        <path key={yy} transform={`translate(0 ${yy}) scale(${dir} 1)`} d="M -300 -22 L -60 -22 L -60 -56 L 0 0 L -60 56 L -60 22 L -300 22 Z" fill={color} />
      ))}
    </g>
  );
};

export const S24: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  return (
    <>
      <Head kicker="আসল ম্যাজিক" text="চাপের সঙ্গে [[চাপের]] লড়াই" at={2} world={world} y={56} />
      <Layer>
        <Arrows dir={1} color={C.sky} f={f} at={12} />
        <Arrows dir={-1} color={C.amber} f={f} at={18} />
        <line x1={960} x2={960} y1={360} y2={760} stroke="#fff" strokeWidth={3} strokeDasharray="8 8" opacity={prog(f, 40, 10) * 0.6} />
      </Layer>
      <Chip at={14} x={420} y={330} text="বাইরের চাপ" tone="blue" size={30} />
      <Chip at={20} x={1500} y={330} text="ভেতরের চাপ" tone="orange" world={world} size={30} />
      <Chip
        at={cue('আর্থ প্রেশার', -4)}
        x={960}
        y={860}
        world={world}
        size={40}
        text={
          <span>
            আর্থ প্রেশার <span style={{color: C.amber}}>ব্যালান্স</span> মেশিন
          </span>
        }
      />
      <Sfx name="whoosh" at={10} volume={0.25} />
    </>
  );
};

/** Screw speed over time for S25 (0 slow .. 1 fast). */
const screwAt = (t: number, slowAt: number, fastAt: number, endAt: number) =>
  interpolate(t, [slowAt - 10, slowAt + 20, fastAt - 10, fastAt + 20, endAt, endAt + 30], [0.5, 0.18, 0.18, 0.85, 0.85, 0.5], {...clamp, easing: easeInOut});

const WIN = {x: 260, y: 170, w: 1400, h: 760};

export const S25: React.FC<SceneProps> = ({cue, s}) => {
  const f = useCurrentFrame();
  const slowAt = cue('আস্তে ঘোরালে', -6);
  const fastAt = cue('জোরে ঘোরালে', -6);
  const endAt = s.dur - 40;
  const sp = (t: number) => screwAt(t, slowAt, fastAt, endAt);
  const outside = (t: number) => 0.6 + 0.02 * Math.sin(t / 9);
  const chamber = (t: number) => 0.6 + (0.5 - sp(t - 12)) * 0.55 + 0.015 * Math.sin(t / 7);
  const N = 60;
  const series = [
    {values: new Array(N).fill(0).map((_, k) => outside(f - (N - 1 - k) * 3)), color: C.sky},
    {values: new Array(N).fill(0).map((_, k) => chamber(f - (N - 1 - k) * 3)), color: C.orange},
  ];
  const v = sp(f);
  const knobX = WIN.x + 64 + 900 + 360 * v;
  const knobY = WIN.y + 50 + 215;
  const bar = (x: number) => (3 * x / 0.6).toFixed(1);
  return (
    <>
      <AppWindow {...WIN} at={0} title="চাপ নিয়ন্ত্রণ">
        <div style={{position: 'absolute', left: 34, top: 110}}>
          <LineChart w={800} h={420} series={series} draw={prog(f, 10, 30)} />
          <div style={{display: 'flex', gap: 30, marginTop: 24, fontSize: 24, fontWeight: 600}}>
            <span style={{color: C.blue}}>━ বাইরের চাপ</span>
            <span style={{color: C.orange}}>━ চেম্বারের চাপ</span>
          </div>
        </div>
        <div style={{position: 'absolute', left: 900, top: 120, fontSize: 26, fontWeight: 600}}>স্ক্রুর গতি</div>
        <div style={{position: 'absolute', left: 900, top: 200}}>
          <Slider value={v} w={360} />
          <div style={{display: 'flex', justifyContent: 'space-between', width: 360, fontSize: 22, color: C.inkSoft, marginTop: 8}}>
            <span>আস্তে</span>
            <span>জোরে</span>
          </div>
        </div>
        <div style={{position: 'absolute', left: 900, top: 340, display: 'flex', flexDirection: 'column', gap: 18}}>
          {[
            ['বাইরের চাপ', outside(f), C.blue],
            ['চেম্বারের চাপ', chamber(f), C.orange],
          ].map(([label, val, col]) => (
            <div key={String(label)} style={{padding: '16px 22px', borderRadius: 14, background: '#FAF8F3', border: '1.5px solid #ECE7DC', width: 360}}>
              <div style={{fontSize: 22, color: C.inkSoft}}>{label}</div>
              <Num size={52} color={String(col)}>
                {bar(Number(val))}
              </Num>
              <span style={{fontSize: 24, marginLeft: 8}}>বার</span>
            </div>
          ))}
        </div>
      </AppWindow>
      <Cursor
        path={
          f < slowAt - 24
            ? [
                [0, 1500, 980],
                [slowAt - 24, WIN.x + 64 + 900 + 360 * sp(slowAt - 24), knobY + 6],
              ]
            : [
                [f - 1, knobX, knobY + 6],
                [f, knobX, knobY + 6],
              ]
        }
        clicks={[slowAt - 12]}
        at={slowAt - 50}
      />
      <Sfx name="click" at={slowAt - 12} volume={0.4} />
    </>
  );
};

const StateRow: React.FC<{at: number; icon: React.ReactNode; a: string; b: string; tone: 'red' | 'green'; y: number; glow?: number}> = ({at, icon, a, b, tone, y, glow = 0}) => {
  const f = useCurrentFrame();
  const e = enter(f, at, 16, 0, 8);
  const col = tone === 'red' ? C.red : C.green;
  return (
    <div
      style={{
        position: 'absolute',
        left: 40,
        top: y,
        width: 1180,
        height: 120,
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        gap: 26,
        padding: '0 30px',
        background: tone === 'red' ? '#FDF1EF' : '#EFF8F2',
        border: `2px solid ${col}66`,
        boxShadow: glow > 0 ? `0 0 ${40 * glow}px ${col}66` : undefined,
        opacity: e.opacity,
        transform: `translateX(${(1 - e.opacity) * -50}px)`,
        filter: e.filter,
        fontSize: 40,
        fontWeight: 700,
      }}
    >
      <div style={{width: 70, height: 70, borderRadius: 35, background: col, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{icon}</div>
      <span>{a}</span>
      <span style={{color: C.inkSoft}}>→</span>
      <span style={{color: col}}>{b}</span>
    </div>
  );
};

export const S26: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const g = cue('তাই অপারেটররা', -4);
  return (
    <>
      <AppWindow {...WIN} at={-40} title="চাপ নিয়ন্ত্রণ">
        <StateRow at={cue('চাপ কম')} y={110} icon={<ArrowDown size={40} />} a="চাপ কম" b="জল-কাদা ঢুকে পড়বে" tone="red" />
        <StateRow at={cue('বেশি হলে', -4)} y={260} icon={<ArrowUp size={40} />} a="চাপ বেশি" b="ওপরের মাটি ফুলে উঠবে" tone="red" />
        <StateRow at={g} y={410} icon={<Check size={40} strokeWidth={3} />} a="চাপ সমান" b="নিরাপদ" tone="green" glow={prog(f, g + 10, 20) * (0.7 + 0.3 * Math.sin(f / 6))} />
      </AppWindow>
      <Sfx name="ding" at={g + 10} volume={0.3} />
    </>
  );
};

export const S27: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const p0 = cue('পেছনে লাগানো', -4);
  const cyc = 54;
  const k = Math.max(0, Math.min(3, Math.floor((f - p0) / cyc)));
  const local = f - p0 - k * cyc;
  const ext = f < p0 ? 0 : k >= 3 ? 0 : local < 32 ? local / 32 : 1 - (local - 32) / 22;
  const adv = (f < p0 ? 0 : Math.min(3, (f - p0) / cyc)) ;
  const stepPx = 46;
  const baseX = 260;
  const moved = Math.floor(adv) * stepPx + (k < 3 && local < 32 && f >= p0 ? (local / 32) * stepPx : k < 3 && f >= p0 ? stepPx : 0);
  const x = baseX + moved;
  const len = 1150;
  const shield = x + len * 0.36;
  const nRings = Math.floor((shield - 0) / 46);
  return (
    <>
      <CrossSection variant="paper" skyH={250} bedY={420}>
        {new Array(nRings).fill(0).map((_, i) => {
          const rx = shield - (i + 1) * 46;
          return (
            <g key={i}>
              <rect x={rx} y={760 - 120 - 4} width={42} height={22} fill={C.concrete} />
              <rect x={rx} y={760 + 120 - 18} width={42} height={22} fill={C.concrete} />
            </g>
          );
        })}
        <TBM x={x} y={760} len={len} h={240} rot={f} jack={ext} rings={0} />
      </CrossSection>
      <Head text="এগোয় [[কেঁচোর]] মতো" at={cue('আর এগোয়', -4)} world={world} y={50} />
      <Chip at={cue('হাইড্রলিক জ্যাক')} x={x + len * 0.36 + 40} y={600} text="হাইড্রলিক জ্যাক" tone="orange" size={28} />
      <Chip at={cue('ঠেলে দেয়')} x={1500} y={600} text="ধাক্কা → এগিয়ে যাও" size={28} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="thud" at={p0 + i * cyc + 30} volume={0.25} />
      ))}
    </>
  );
};
