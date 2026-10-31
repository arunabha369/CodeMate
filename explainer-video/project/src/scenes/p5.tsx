import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Satellite, TriangleAlert} from 'lucide-react';
import {SceneProps, Sfx} from '../kit';
import {C, FONT_BN, W} from '../theme';
import {clamp, countUp, easeInOut, fmtIN, pop, prog} from '../anim';
import {Chip, Head, Num} from '../ui/text';
import {Calendar} from '../ui/cards';
import {AppWindow, Cursor, ProgressBar} from '../ui/app';
import {Boat, DimArrow, GirderBridge, Layer, Negation, Train} from '../ui/svg';
import {TBM} from '../ui/tbm';
import {CrossSection, Tube} from '../ui/xs';
import {HORIZON} from '../bg/NightSky';

export const S34: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const r = cue('রচনা', -6);
  return (
    <>
      <Calendar month="এপ্রিল" year="2017" at={4} x={640} y={540} scale={1.3} />
      <Layer>
        <clipPath id="s34-box">
          <rect x={1040} y={420} width={700} height={300} rx={10} />
        </clipPath>
        <g opacity={prog(f, r, 14)} clipPath="url(#s34-box)">
          <rect x={1040} y={420} width={700} height={110} rx={10} fill={C.waterLight} />
          <rect x={1040} y={530} width={700} height={190} rx={10} fill={C.ground} />
          <g transform={`translate(${interpolate(f, [r, r + 90], [880, 1180], clamp)} 0)`}>
            <TBM x={0} y={620} len={420} h={90} rot={f} rings={3} />
          </g>
        </g>
      </Layer>
      <Chip at={r + 6} x={1390} y={340} text="রচনা ঢুকল গঙ্গার তলায়" tone="blue" size={32} />
    </>
  );
};

export const S35: React.FC<SceneProps> = ({cue, s}) => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, s.dur], [-380, 780]);
  const len = 620;
  return (
    <>
      <CrossSection
        variant="night"
        skyH={300}
        bedY={520}
        overlay={
          <>
            <Boat kind="launch" x={((f * 2.2 + 400) % 2300) - 150} y={300} />
            <Boat kind="ferry" x={2050 - ((f * 1.4 + 300) % 2400)} y={300} />
            <Boat kind="cargo" x={((f * 1 + 1300) % 2500) - 250} y={300} scale={0.8} />
            <DimArrow x1={1700} y1={306} x2={1700} y2={700} at={cue('নদীর তলারও', -10)} color="#fff" />
          </>
        }
      >
        <Tube x1={-100} x2={x + len * 0.36} y={780} h={130} night />
        <TBM x={x} y={780} len={len} h={150} rot={f} silhouette rings={0} />
      </CrossSection>
      <Chip at={4} x={240} y={240} text="হাওড়া" tone="dark" world="night" size={30} />
      <Chip at={8} x={1680} y={240} text="কলকাতা" tone="dark" world="night" size={30} />
      <Chip at={12} x={960} y={110} text="হাওড়া → কলকাতা" tone="orange" world="night" size={34} />
      <Chip at={cue('নদীর তলারও')} x={1700} y={560} text="নদীর তলা" world="night" size={24} />
      <Chip at={cue('নদীর তলারও', 10)} x={1490} y={650} text="জলের উপরিতল থেকে ~30 মি" tone="dark" world="night" size={24} />
    </>
  );
};

const WIN = {x: 260, y: 200, w: 1400, h: 730};

export const S36: React.FC<SceneProps> = ({cue, world, s}) => {
  const f = useCurrentFrame();
  const drift = cue('একটু এদিক', -6);
  const fixAt = Math.min(s.dur - 40, drift + 70);
  const off = interpolate(f, [drift, drift + 30, fixAt + 4, fixAt + 34], [0, 1, 1, 0], {...clamp, easing: easeInOut});
  const wob = Math.sin(f / 9) * 6;
  const tx = WIN.x + 64 + 420; // target centre (page coords)
  const ty = WIN.y + 50 + 360;
  const dx = wob + off * 120;
  const dy = Math.cos(f / 11) * 5 + off * -60;
  const cm = (2 + off * 4).toFixed(0);
  const warn = off > 0.5;
  const banner = prog(f, drift + 20, 10) * (1 - prog(f, fixAt + 30, 10));
  const gps = cue('জিপিএস', -4);
  const laser = cue('লেজার', -6);
  return (
    <>
      <Head text="অন্ধকারে [[দিশা]]" at={2} world={world} y={60} />
      <AppWindow {...WIN} at={0} title="দিক ঠিক রাখা">
        <svg width={1330} height={620} style={{position: 'absolute', left: 0, top: 60}}>
          <rect x={34} y={20} width={780} height={560} rx={14} fill="#1C1A30" />
          {[60, 130, 200].map((rr) => (
            <circle key={rr} cx={420} cy={300} r={rr} fill="none" stroke="#3E3A60" strokeWidth={2} />
          ))}
          <line x1={420} y1={60} x2={420} y2={540} stroke="#3E3A60" strokeWidth={2} />
          <line x1={120} y1={300} x2={720} y2={300} stroke="#3E3A60" strokeWidth={2} />
          <line x1={34} y1={300} x2={420 + dx} y2={300 + dy} stroke={C.red} strokeWidth={3} opacity={prog(f, laser, 10) * (0.7 + 0.3 * Math.sin(f / 2))} />
          <circle cx={420 + dx} cy={300 + dy} r={16} fill={warn ? C.red : C.green} />
          <circle cx={420 + dx} cy={300 + dy} r={28} fill="none" stroke={warn ? C.red : C.green} strokeWidth={3} opacity={0.6} />
        </svg>
        <div style={{position: 'absolute', left: 900, top: 120, width: 380, fontSize: 24, color: C.inkSoft}}>মেশিনের মুখ · বিচ্যুতি</div>
        <div style={{position: 'absolute', left: 900, top: 160}}>
          <Num size={96} color={warn ? C.red : C.green}>
            ± {cm}
          </Num>
          <span style={{fontSize: 36, fontWeight: 700, marginLeft: 12}}>সেমি</span>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 900,
            top: 300,
            width: 380,
            padding: '16px 20px',
            borderRadius: 14,
            background: '#FFF4D6',
            border: `2px solid ${C.amber}`,
            fontSize: 26,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            opacity: banner,
            transform: `translateY(${(1 - banner) * -20}px)`,
          }}
        >
          <TriangleAlert size={30} color={C.orange} /> দিক সরে যাচ্ছে!
        </div>
        <div
          style={{
            position: 'absolute',
            left: 900,
            top: 400,
            padding: '12px 30px',
            borderRadius: 999,
            background: f >= fixAt + 3 ? C.green : C.orange,
            color: '#fff',
            fontSize: 28,
            fontWeight: 700,
            opacity: banner > 0 || f >= fixAt ? 1 : 0.35,
          }}
        >
          {f >= fixAt + 3 ? '✓ ঠিক আছে' : 'ঠিক করো'}
        </div>
      </AppWindow>
      <div style={{position: 'absolute', left: 1430, top: 120, opacity: prog(f, gps, 10), display: 'flex', alignItems: 'center', gap: 10, fontFamily: FONT_BN, fontWeight: 700, fontSize: 28}}>
        <div style={{position: 'relative', width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.inkSoft}}>
          <Satellite size={56} />
          <div style={{position: 'absolute', left: 0, top: 0}}>
            <Negation at={gps + 6} size={90} />
          </div>
        </div>
        জিপিএস
      </div>
      <Cursor path={[[0, 1600, 980], [fixAt - 20, WIN.x + 64 + 990, WIN.y + 50 + 425], [fixAt + 40, WIN.x + 64 + 990, WIN.y + 50 + 425]]} clicks={[fixAt]} at={drift} />
      <Sfx name="ding" at={drift + 20} volume={0.3} />
      <Sfx name="click" at={fixAt} volume={0.45} />
      <Sfx name="tick" at={laser} volume={0.25} />
    </>
  );
};

const FaceRing: React.FC<{cx: number; cy: number; lit: number; rot: number}> = ({cx, cy, lit, rot}) => (
  <g>
    <circle cx={cx} cy={cy} r={165} fill="#6B6F84" />
    <circle cx={cx} cy={cy} r={140} fill="#16152A" />
    <circle cx={cx} cy={cy} r={140} fill={C.amber} opacity={0.18 * lit} />
    <g opacity={1 - lit} transform={`translate(${cx} ${cy}) rotate(${rot})`}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <rect key={a} x={-10} y={-138} width={20} height={138} fill="#3A3658" transform={`rotate(${a})`} />
      ))}
      <circle r={30} fill={C.amber} />
    </g>
    <g opacity={lit}>
      <rect x={cx - 90} y={cy - 70} width={180} height={150} rx={30} fill="#E9EAF0" />
      <rect x={cx - 66} y={cy - 48} width={132} height={60} rx={10} fill="#2B2E46" />
      <rect x={cx - 90} y={cy + 50} width={180} height={8} fill={C.green} />
    </g>
  </g>
);

export const S37: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const pr = cue('প্রেরণা', -6);
  const lit2 = prog(f, pr + 30, 20);
  return (
    <>
      <CrossSection variant="night" skyH={260} bedY={430} overlay={<></>}>
        <FaceRing cx={700} cy={740} lit={1} rot={0} />
        <FaceRing cx={1220} cy={740} lit={lit2} rot={f * 3} />
      </CrossSection>
      <Head text="দুটো আলাদা [[সুড়ঙ্গ]]" at={cue('দুটো আলাদা', -8)} world={world} y={50} />
      <Chip at={4} x={700} y={540} text="রচনা" tone="blue" size={34} />
      <Chip at={pr} x={1220} y={540} text="প্রেরণা" tone="orange" size={34} />
      <Chip at={cue('যাওয়ার')} x={700} y={950} text="যাওয়া →" world={world} tone="dark" size={30} />
      <Chip at={cue('আসার')} x={1220} y={950} text="← আসা" world={world} tone="dark" size={30} />
    </>
  );
};

export const S38: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const a = 6;
  const end = cue('জোড়া সুড়ঙ্গ', 0);
  const p1 = interpolate(f, [a, end - 10], [0, 1], {...clamp, easing: easeInOut});
  const p2 = interpolate(f, [a + 14, end], [0, 1], {...clamp, easing: easeInOut});
  const m = countUp(f, a, 520, end - a);
  return (
    <>
      <Layer>
        <rect x={260} y={300} width={1400} height={110} rx={10} fill={C.waterLight} opacity={prog(f, 0, 12)} />
        {[0, 1, 2, 3, 4].map((k) => (
          <path key={k} d={`M ${330 + k * 280 + ((f * 1.2) % 60)} 350 q 14 -7 28 0 t 28 0`} stroke="#98AFC4" strokeWidth={3} fill="none" />
        ))}
      </Layer>
      <div style={{position: 'absolute', left: 260, top: 450, fontFamily: FONT_BN, fontWeight: 600, fontSize: 26, color: C.inkSoft, display: 'flex', flexDirection: 'column', gap: 26}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <span style={{width: 110}}>রচনা</span>
          <ProgressBar value={p1} w={1290} h={28} color={C.blue} />
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <span style={{width: 110}}>প্রেরণা</span>
          <ProgressBar value={p2} w={1290} h={28} color={C.orange} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 230, top: 250, fontFamily: FONT_BN, fontWeight: 700, fontSize: 30, color: C.ink}}>হাওড়া</div>
      <div style={{position: 'absolute', left: 1560, top: 250, fontFamily: FONT_BN, fontWeight: 700, fontSize: 30, color: C.ink}}>কলকাতা</div>
      <div style={{position: 'absolute', left: 0, width: W, top: 640, textAlign: 'center', fontFamily: FONT_BN}}>
        <Num size={150} color={C.orange}>
          {fmtIN(Math.round(m))}
        </Num>
        <span style={{fontSize: 56, fontWeight: 700, marginLeft: 16, color: C.ink}}>মিটার</span>
      </div>
      <Calendar month="জুন" year="2017" at={cue('জুনে', -4)} x={1560} y={760} scale={0.7} />
      <Chip at={end + 4} x={960} y={190} text="✓ দুটো সুড়ঙ্গই নদী পার" tone="green" size={36} />
      <Sfx name="ding" at={end + 4} volume={0.3} />
    </>
  );
};

export const S39: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const below = cue('নিচে', -6);
  const tx = ((f * 9) % 2600) - 500;
  return (
    <>
      <Layer>
        <g opacity={prog(f, 0, 14)}>
          <GirderBridge x1={150} x2={1770} deck={HORIZON + 20} frame={f} color="#34325A" />
          <Boat kind="ferry" x={((f * 1.5 + 600) % 2300) - 150} y={HORIZON + 40} color="#1B1A33" />
          <Boat kind="launch" x={2050 - ((f * 2 + 200) % 2300)} y={HORIZON + 80} color="#1B1A33" />
        </g>
        <g opacity={prog(f, below, 20)}>
          <rect x={0} y={870} width={1920} height={70} fill="#0A0A18" opacity={0.6} />
          <Tube x1={-60} x2={1980} y={905} h={46} night />
          <Train x={tx} y={905} len={420} h={30} cars={4} />
        </g>
      </Layer>
      <Chip at={cue('ওপরে', -2)} x={960} y={190} text="ওপরে: ব্রিজ, ফেরি, নৌকা" world="night" size={32} />
      <Chip at={below + 10} x={960} y={810} world="night" size={34} text={<span>নিচে: <span style={{color: C.amber}}>মেট্রো</span></span>} />
    </>
  );
};
