import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BrickWall, CircleDot, Cog, Layers, MoveRight, Pickaxe} from 'lucide-react';
import {SceneProps, Sfx} from '../kit';
import {C, FONT_BN} from '../theme';
import {clamp, easeInOut, enter, pop, prog, rng} from '../anim';
import {Chip, Head, Kicker, Num} from '../ui/text';
import {StepCard} from '../ui/cards';
import {DimArrow, Layer, Specks} from '../ui/svg';
import {Ring} from '../ui/tbm';

export const S28: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const a = cue('এর সমাধানটা', -6);
  const p = prog(f, a, 26);
  const stamp = cue('মেশিনের লেজের', -4);
  const sp = pop(f, stamp);
  const word = (txt: string, icon: React.ReactNode, dir: -1 | 1) => (
    <div
      style={{
        position: 'absolute',
        top: 330,
        left: 960 + dir * interpolate(p, [0, 1], [700, 260]) - 230,
        width: 460,
        textAlign: 'center',
        opacity: p,
        fontFamily: FONT_BN,
        fontWeight: 700,
        fontSize: 110,
        color: C.ink,
      }}
    >
      <div style={{color: C.orange, display: 'flex', justifyContent: 'center', marginBottom: 10}}>{icon}</div>
      {txt}
    </div>
  );
  return (
    <>
      <Kicker text="দ্বিতীয় শত্রু: মাটি ধসা" at={2} world={world} y={90} />
      <Chip at={8} x={960} y={190} text="মাটি ধসে পড়া" tone="red" size={34} out={a} />
      {word('খোঁড়া', <Pickaxe size={90} strokeWidth={1.6} />, -1)}
      {word('দেয়াল', <BrickWall size={90} strokeWidth={1.6} />, 1)}
      <div style={{position: 'absolute', top: 470, left: 0, width: 1920, textAlign: 'center', fontFamily: FONT_BN, fontWeight: 700, fontSize: 90, color: C.inkSoft, opacity: prog(f, a + 20, 10)}}>+</div>
      <div
        style={{
          position: 'absolute',
          top: 720,
          left: 0,
          width: 1920,
          textAlign: 'center',
          fontFamily: FONT_BN,
          fontWeight: 700,
          fontSize: 92,
          color: C.orange,
          opacity: prog(f, stamp, 6),
          transform: `scale(${1.6 - 0.6 * sp}) rotate(${-4 * (1 - sp)}deg)`,
        }}
      >
        <span style={{border: `6px solid ${C.orange}`, borderRadius: 18, padding: '4px 36px'}}>একসঙ্গে</span>
      </div>
      <Sfx name="thud" at={stamp + 2} volume={0.35} />
    </>
  );
};

export const S29: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const segAt = cue('সেগমেন্ট', -6);
  const armAt = cue('একটা যান্ত্রিক', -4);
  const done = cue('পুরো রিং', -4);
  const built = interpolate(f, [armAt, done], [0, 6], clamp);
  const n = Math.min(6, Math.floor(built + 0.02));
  const cx = 860;
  const cy = 560;
  const cur = Math.min(5, Math.floor(built));
  const ang = ((cur + 0.5) * 60 - 90) * (Math.PI / 180);
  const sampleOut = prog(f, armAt, 14);
  return (
    <>
      <Layer>
        <g opacity={1 - sampleOut} transform={`translate(${-sampleOut * 200} 0)`}>
          <Ring cx={cx} cy={cy} R={280} r={232} built={1} />
        </g>
        {f >= armAt && (
          <>
            <Ring cx={cx} cy={cy} R={280} r={232} built={built} />
            {built < 6 && (
              <g>
                <circle cx={cx} cy={cy} r={34} fill={C.steel} />
                <line x1={cx} y1={cy} x2={cx + Math.cos(ang) * 220} y2={cy + Math.sin(ang) * 220} stroke={C.steelLight} strokeWidth={22} strokeLinecap="round" />
                <circle cx={cx + Math.cos(ang) * 220} cy={cy + Math.sin(ang) * 220} r={16} fill={C.orange} />
              </g>
            )}
            {built >= 6 && <circle cx={cx} cy={cy} r={300} fill="none" stroke={C.green} strokeWidth={6} opacity={(1 - prog(f, done + 6, 30)) * 0.9} />}
          </>
        )}
      </Layer>
      <Chip at={segAt} x={cx} y={190} text="বাঁকা কংক্রিটের টুকরো = সেগমেন্ট" tone="orange" size={32} />
      <div style={{position: 'absolute', left: 1360, top: 430, opacity: prog(f, armAt, 10), fontFamily: FONT_BN}}>
        <Num size={170} color={C.orange}>
          {n}/6
        </Num>
        <div style={{fontSize: 30, fontWeight: 600, color: C.inkSoft}}>টুকরো বসানো হলো</div>
      </div>
      <Chip at={done + 6} x={1520} y={760} text="✓ একটা রিং" tone="green" size={34} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Sfx key={i} name="click" at={armAt + ((done - armAt) / 6) * (i + 1) - 2} volume={0.4} />
      ))}
      <Sfx name="ding" at={done + 6} volume={0.3} />
    </>
  );
};

export const S30: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const cx = 760;
  const cy = 560;
  const R = 300;
  const r = 273;
  const th = cue('সাড়ে সাতাশ', -6);
  const inner = cue('ভেতরের মাপ', -4);
  const outer = cue('বাইরের মাপ', -4);
  const zoom = prog(f, th, 18);
  return (
    <>
      <Layer>
        <Ring cx={cx} cy={cy} R={R} r={r} built={6} />
        <DimArrow x1={cx - r + 4} y1={cy} x2={cx + r - 4} y2={cy} at={inner} color={C.ink} />
        <DimArrow x1={cx + R + 50} y1={cy - R} x2={cx + R + 50} y2={cy + R} at={outer} color={C.ink} />
        <g opacity={zoom}>
          <line x1={cx + 200} y1={cy - 205} x2={1300} y2={330} stroke={C.orange} strokeWidth={2} strokeDasharray="6 6" />
          <circle cx={cx + 202} cy={cy - 208} r={30} fill="none" stroke={C.orange} strokeWidth={4} />
          <g transform={`translate(1460 380) scale(${0.6 + 0.4 * zoom})`}>
            <circle r={170} fill="#fff" stroke={C.orange} strokeWidth={4} />
            <clipPath id="s30-z">
              <circle r={166} />
            </clipPath>
            <g clipPath="url(#s30-z)">
              <rect x={-200} y={-60} width={400} height={120} fill={C.concrete} />
              {[-140, -70, 0, 70, 140].map((x) => (
                <circle key={x} cx={x} cy={0} r={6} fill="#8E909A" />
              ))}
              <rect x={-200} y={-200} width={400} height={140} fill={C.ground} />
              <rect x={-200} y={60} width={400} height={140} fill="#3B3950" />
            </g>
            <line x1={120} y1={-60} x2={120} y2={60} stroke={C.ink} strokeWidth={3} />
            <line x1={110} y1={-60} x2={130} y2={-60} stroke={C.ink} strokeWidth={3} />
            <line x1={110} y1={60} x2={130} y2={60} stroke={C.ink} strokeWidth={3} />
          </g>
        </g>
      </Layer>
      <Chip at={th + 14} x={1460} y={610} text={<span><Num size={36} color={C.orange}>~27.5</Num> সেমি পুরু</span>} size={30} />
      <Chip at={cue('মজবুত কংক্রিটে')} x={1460} y={690} text="মজবুত কংক্রিট" tone="orange" size={28} />
      <Chip at={inner + 10} x={cx} y={cy - 46} text={<span><Num size={34} color={C.orange}>5.55</Num> মি · ভেতরে</span>} size={28} />
      <Chip at={outer + 10} x={cx + R + 50} y={cy + R + 50} text={<span><Num size={34} color={C.orange}>6.1</Num> মি · বাইরে</span>} size={28} />
    </>
  );
};

export const S31: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const gapQ = cue('ফাঁক তো', -4);
  const seal = cue('রাবারের সিল', -6);
  const press = prog(f, cue('চেপে বসলে', -4), 20);
  const gap = interpolate(press, [0, 1], [60, 0]);
  const gW = interpolate(press, [0, 1], [26, 15]);
  const glow = prog(f, seal, 12) * (0.6 + 0.4 * Math.sin(f / 5));
  const leftX = 960 - gap / 2;
  const rightX = 960 + gap / 2;
  // water drop: before press it slips through, after press it bounces
  const dropT = ((f % 60) / 60);
  const pressed = press > 0.95;
  const dy = pressed ? (dropT < 0.5 ? dropT * 2 * 330 : 330 - (dropT - 0.5) * 2 * 140) : dropT * 760;
  const dx = pressed && dropT >= 0.5 ? (dropT - 0.5) * 2 * 90 : 0;
  return (
    <>
      {f < seal && <Kicker text="তাহলে ফাঁক?" at={2} world={world} y={90} />}
      {f >= seal - 2 && <Head kicker="তাহলে ফাঁক?" text="জোড়ের মুখে [[রাবারের সিল]]" at={seal} world={world} y={56} />}
      <Layer>
        <rect x={leftX - 560} y={330} width={560} height={520} rx={12} fill={C.concrete} stroke="#8E909A" strokeWidth={2} />
        <rect x={rightX} y={330} width={560} height={520} rx={12} fill={C.concreteLight} stroke="#8E909A" strokeWidth={2} />
        <rect x={leftX - gW} y={360} width={gW} height={460} rx={5} fill="#2B2A3A" />
        <rect x={rightX} y={360} width={gW} height={460} rx={5} fill="#2B2A3A" />
        <rect x={leftX - gW - 4} y={356} width={gW * 2 + gap + 8} height={468} rx={8} fill="none" stroke={C.orange} strokeWidth={5} opacity={glow} />
        <g transform={`translate(${960 + dx} ${250 + dy * 0.85})`} opacity={prog(f, gapQ, 10)}>
          <path d="M 0 -26 C 14 -6 18 4 18 12 A 18 18 0 0 1 -18 12 C -18 4 -14 -6 0 -26 Z" fill={C.sky} />
        </g>
      </Layer>
      <Chip at={gapQ} x={960} y={900} text="ফাঁক দিয়ে জল?" tone="red" size={30} out={seal} />
      <Chip at={cue('জলের ঢোকার', -2)} x={960} y={900} text="✓ জল ঢোকার রাস্তা নেই" tone="green" size={32} />
      <Sfx name="thud" at={cue('চেপে বসলে', 14)} volume={0.35} />
    </>
  );
};

export const S32: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const cx = 960;
  const cy = 590;
  const R = 270;
  const r = 230;
  const G = 34;
  const fillAt = cue('পাম্প করে', -6);
  const fill = prog(f, fillAt, 70, easeInOut);
  const one = cue('এক হয়ে', -4);
  const gapHL = prog(f, cue('সরু ফাঁকটুকু', -6), 12) * (1 - fill);
  return (
    <>
      <Layer>
        <rect x={0} y={150} width={1920} height={930} fill={C.ground} />
        <Specks x={0} y={150} w={1920} h={930} n={160} frame={f} color={C.mudDark} opacity={0.2} />
        <circle cx={cx} cy={cy} r={R + G} fill="#8C7556" />
        <clipPath id="s32-fill">
          <rect x={cx - R - G - 10} y={cy + R + G - fill * (2 * (R + G))} width={2 * (R + G) + 20} height={2 * (R + G) + 10} />
        </clipPath>
        <circle cx={cx} cy={cy} r={R + G} fill="#C2A47E" clipPath="url(#s32-fill)" />
        <circle cx={cx} cy={cy} r={R + G / 2} fill="none" stroke={C.red} strokeWidth={4} strokeDasharray="10 8" opacity={gapHL} />
        <Ring cx={cx} cy={cy} R={R} r={r} built={6} />
        <circle cx={cx} cy={cy} r={r} fill="#3B3950" />
        <g opacity={prog(f, fillAt - 10, 10)}>
          <path d={`M 1700 150 C 1500 300, 1350 820, ${cx + 120} ${cy + R + 20}`} stroke={C.steel} strokeWidth={16} fill="none" strokeLinecap="round" />
          <path d={`M 1700 150 C 1500 300, 1350 820, ${cx + 120} ${cy + R + 20}`} stroke="#C2A47E" strokeWidth={8} fill="none" strokeDasharray="14 18" strokeDashoffset={-f * 3} opacity={fill < 1 ? 1 : 0} />
        </g>
      </Layer>
      <Chip at={cue('গ্রাউট', -4)} x={480} y={250} text="গ্রাউট = সিমেন্টের ঘন মশলা" tone="orange" size={32} />
      <Chip at={one} x={cx} y={960} text="দেয়াল + মাটি = এক" tone="green" size={32} />
      <Sfx name="swoosh-soft" at={fillAt} volume={0.3} />
    </>
  );
};

export const S33: React.FC<SceneProps> = ({cue, world, s}) => {
  const f = useCurrentFrame();
  const start = 16;
  const t = Math.max(0, f - start);
  // accelerate: phase advances faster over time
  const phase = (t / 26) * (1 + t / 260);
  const active = Math.floor(phase) % 4;
  const pipeAt = cue('নদীর তলায়', -8);
  const rings = Math.floor(interpolate(f, [pipeAt, s.dur], [0, 34], clamp));
  const steps: [React.ReactNode, string][] = [
    [<Cog key="a" size={90} strokeWidth={1.6} />, 'খোঁড়ো'],
    [<MoveRight key="b" size={90} strokeWidth={1.6} />, 'ঠেলো'],
    [<CircleDot key="c" size={90} strokeWidth={1.6} />, 'রিং বসাও'],
    [<Layers key="d" size={90} strokeWidth={1.6} />, 'ভরাট করো'],
  ];
  return (
    <>
      <Head text="কাজটা চলত [[এভাবে]]" at={2} world={world} y={70} />
      {steps.map(([icon, label], i) => (
        <StepCard key={i} icon={icon} label={label} at={6 + i * 6} active={f > start && active === i ? 1 : 0} x={170 + i * 410} y={250} n={i + 1} />
      ))}
      <Layer>
        <g opacity={prog(f, 30, 14)} stroke={C.orange} strokeWidth={4} fill="none">
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M ${480 + i * 410} 400 l 90 0 m -16 -14 l 16 14 l -16 14`} />
          ))}
          <path d="M 1530 570 C 1530 680, 320 680, 320 570" strokeDasharray="10 10" strokeDashoffset={-f * 2} />
          <path d="M 306 586 L 320 566 L 334 586" />
        </g>
        <g>
          {new Array(rings).fill(0).map((_, i) => (
            <rect key={i} x={140 + i * 48} y={760} width={44} height={110} rx={10} fill={i % 2 ? C.concreteLight : C.concrete} stroke="#8E909A" strokeWidth={2} />
          ))}
        </g>
      </Layer>
      <Chip at={pipeAt + 20} x={960} y={720} text="রিংয়ের পর রিং → কংক্রিটের পাইপ" size={28} />
    </>
  );
};
