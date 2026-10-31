import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ArrowDownToLine, Droplet, Moon, Shovel, Timer, TrainFrontTunnel} from 'lucide-react';
import {SceneProps, Sfx} from '../kit';
import {C, FONT_BN, W} from '../theme';
import {clamp, enter, pop, prog} from '../anim';
import {Chip, Head, Kicker, Headline, Num, TitleCard} from '../ui/text';
import {StatCard, IconCard} from '../ui/cards';
import {CrossSection, Tube} from '../ui/xs';
import {Boat, DimArrow, Layer, Negation, Train} from '../ui/svg';

/** Shared hook composition: river cross-section at night with a train in the tunnel. Reused by S01, S50, S53. */
export const RiverTrainXS: React.FC<{trainX: number; tunnelY?: number; boatsPhase?: number; depthAt?: number; variant?: 'night' | 'paper'}> = ({
  trainX,
  tunnelY = 760,
  boatsPhase = 0,
  depthAt,
  variant = 'night',
}) => {
  const f = useCurrentFrame();
  return (
    <CrossSection
      variant={variant}
      skyH={330}
      bedY={560}
      overlay={
        <>
          <Boat kind="ferry" x={((boatsPhase + f * 1.6 + 300) % 2400) - 200} y={330} scale={1} color={variant === 'night' ? C.skyline : C.steel} />
          <Boat kind="cargo" x={2100 - ((boatsPhase + f * 1.1 + 900) % 2500)} y={330} scale={0.8} color={variant === 'night' ? C.skyline : C.steel} />
          {depthAt !== undefined && <DimArrow x1={250} y1={336} x2={250} y2={tunnelY - 50} at={depthAt} color={variant === 'night' ? '#fff' : C.ink} />}
        </>
      }
    >
      <Tube x1={-80} x2={W + 80} y={tunnelY} h={84} night={variant === 'night'} />
      <Train x={trainX} y={tunnelY} len={560} h={50} cars={4} />
    </CrossSection>
  );
};

export const S01: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const trainX = interpolate(f, [0, 200], [120, 1500]);
  return (
    <>
      <RiverTrainXS trainX={trainX} depthAt={34} />
      <Chip
        at={46}
        x={250}
        y={(330 + 710) / 2}
        tone="dark"
        world="night"
        text={
          <span style={{display: 'flex', alignItems: 'baseline', gap: 10}}>
            <Num size={40} color={C.amber}>
              30+
            </Num>
            মিটার · জলের নিচে
          </span>
        }
      />
      <Kicker text="এই মুহূর্তে" at={6} world="night" y={70} />
      <Headline text="মাথার ওপর আস্ত একটা [[নদী]]" at={22} world="night" y={112} size={78} />
      <Sfx name="pop" at={46} volume={0.35} />
      <Sfx name="whoosh" at={cue('নদী', -4)} volume={0.3} />
    </>
  );
};

export const S02: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const a = cue('পাঁচশো', -6);
  const b = cue('পঁয়তাল্লিশ', -10);
  const dot = interpolate(f, [0, 200], [300, 1620], clamp);
  return (
    <>
      <Layer>
        <defs>
          <linearGradient id="s2-tun" x1="0" x2="1">
            <stop offset="0" stopColor={C.amber} stopOpacity={0} />
            <stop offset="0.5" stopColor={C.amber} stopOpacity={0.5} />
            <stop offset="1" stopColor={C.amber} stopOpacity={0} />
          </linearGradient>
        </defs>
        <rect x={200} y={880} width={1520} height={4} fill="url(#s2-tun)" />
        <circle cx={dot} cy={882} r={7} fill="#FFE6B0" />
        <rect x={dot - 120} y={880} width={120} height={4} fill={C.amber} opacity={0.7} />
      </Layer>
      <StatCard at={a} x={300} y={300} scale={1.3} world={world} icon={<TrainFrontTunnel size={36} />} value={520} unit="মিটার" label="নদীর নিচে সুড়ঙ্গ" />
      <StatCard at={b} x={1020} y={300} scale={1.3} world={world} icon={<Timer size={36} />} value={45} unit="সেকেন্ড" label="পুরো নদী পার" dur={30} />
      <Sfx name="tick" at={a + 8} volume={0.3} />
      <Sfx name="tick" at={b + 8} volume={0.3} />
    </>
  );
};

export const S03: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const crackAt = cue('ফাটল');
  const pushAt = cue('গোটা নদীটা', -4);
  const crack = prog(f, crackAt, 10);
  const pulse = f > crackAt ? 0.5 + 0.5 * Math.sin((f - crackAt) / 4) : 0;
  const cx = 960;
  const cy = 790;
  return (
    <>
      <CrossSection variant="paper" skyH={330} bedY={560}>
        <circle cx={cx} cy={cy} r={110} fill="none" stroke={C.ink} strokeWidth={4} strokeDasharray="14 10" />
        <circle cx={cx} cy={cy} r={110 + 30 * pulse} fill="none" stroke={C.red} strokeWidth={4} opacity={crack * (1 - pulse) * 0.8} />
        <path
          d={`M ${cx + 40} ${cy - 103} l -12 26 l 16 10 l -14 30`}
          fill="none"
          stroke={C.red}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={100}
          strokeDashoffset={100 * (1 - crack)}
        />
        {[
          [cx, cy - 250, 90],
          [cx - 260, cy, 0],
          [cx + 260, cy, 180],
          [cx - 190, cy - 190, 45],
          [cx + 190, cy - 190, 135],
        ].map(([x, y, rot], i) => {
          const p = prog(f, pushAt + i * 3, 16);
          const wob = Math.sin(f / 3 + i) * 6 * p;
          return (
            <g key={i} transform={`translate(${x} ${y}) rotate(${rot}) translate(${wob} 0)`} opacity={p}>
              <path d="M -40 -8 L 10 -8 L 10 -20 L 40 0 L 10 20 L 10 8 L -40 8 Z" fill={C.blue} />
            </g>
          );
        })}
      </CrossSection>
      <Head kicker="চারদিকে" text="শুধু কাদা, বালি আর [[জল]]" at={4} world={world} y={56} />
      <Chip at={cue('নরম কাদা')} x={560} y={700} text="কাদা" />
      <Chip at={cue('ভেজা বালি')} x={1360} y={700} text="ভেজা বালি" />
      <Chip at={cue('জলের প্রচণ্ড')} x={960} y={450} text="জলের চাপ" tone="blue" />
      <Sfx name="pop" at={cue('নরম কাদা')} volume={0.25} />
      <Sfx name="pop" at={cue('ভেজা বালি')} volume={0.25} />
      <Sfx name="thud" at={crackAt} volume={0.4} />
    </>
  );
};

export const S04: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const titleAt = cue('এটাই', -6);
  const moveDown = prog(f, titleAt - 6, 24);
  const ry = interpolate(moveDown, [0, 1], [560, 790]);
  const rs = interpolate(moveDown, [0, 1], [1, 0.62]);
  const glow = 0.6 + 0.4 * Math.sin(f / 10);
  return (
    <>
      <Layer>
        <defs>
          <radialGradient id="s4-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0.55" stopColor={C.amber} stopOpacity={0.55} />
            <stop offset="1" stopColor={C.amber} stopOpacity={0} />
          </radialGradient>
        </defs>
        <g transform={`translate(960 ${ry}) scale(${rs})`} opacity={prog(f, 0, 12)}>
          <circle r={300} fill="url(#s4-glow)" opacity={glow} />
          <circle r={210} fill="#16152A" stroke="#8E909A" strokeWidth={34} />
          <circle r={210} fill="none" stroke={C.amber} strokeWidth={3} opacity={0.7} />
          <rect x={-120} y={-110} width={240} height={200} rx={40} fill="#E9EAF0" />
          <rect x={-90} y={-80} width={180} height={80} rx={14} fill="#2B2E46" />
          <rect x={-120} y={50} width={240} height={10} fill={C.green} />
          <circle cx={-70} cy={30} r={12} fill="#FFF3C4" />
          <circle cx={70} cy={30} r={12} fill="#FFF3C4" />
        </g>
      </Layer>
      <div style={{position: 'absolute', left: 1330, top: 470, opacity: 1 - prog(f, titleAt - 10, 10)}}>
        <IconDropNo at={cue('একফোঁটা')} />
      </div>
      {f >= titleAt - 2 && <TitleCard text="গঙ্গার নিচে [[মেট্রো]]" at={titleAt} world="night" y={150} />}
      <Sfx name="whoosh" at={titleAt} volume={0.35} />
    </>
  );
};

const IconDropNo: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame();
  const e = enter(f, at, 14);
  return (
    <div style={{position: 'relative', width: 340, height: 220, opacity: e.opacity, transform: e.transform, filter: e.filter, fontFamily: FONT_BN}}>
      <div style={{position: 'absolute', left: 90, top: 0, width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.sky}}>
        <Droplet size={92} strokeWidth={2.2} />
      </div>
      <div style={{position: 'absolute', left: 90, top: 0}}>
        <Negation at={at + 10} size={160} />
      </div>
      <div style={{position: 'absolute', top: 172, width: 340, textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: 32}}>একফোঁটাও জল নেই</div>
    </div>
  );
};

export const S05: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const loop = (f % 75) / 75;
  const dig = interpolate(loop, [0, 0.45, 0.8, 1], [0.15, 1, 1, 0.15]);
  const flood = interpolate(loop, [0.3, 0.75, 0.95], [0, 1, 0.2], clamp);
  const appear = prog(f, 4, 16);
  return (
    <>
      <Layer>
        <g opacity={appear}>
          <rect x={320} y={420} width={1280} height={230} rx={8} fill={C.waterLight} />
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M ${420 + k * 300 + ((f * 1.2) % 80)} ${480 + (k % 2) * 60} q 14 -7 28 0 t 28 0`} stroke="#98AFC4" strokeWidth={3} fill="none" />
          ))}
          <rect x={320} y={650} width={1280} height={260} rx={8} fill={C.ground} />
          <rect x={320} y={790} width={1280} height={120} rx={8} fill={C.groundDeep} />
          <line x1={320} x2={1600} y1={650} y2={650} stroke="#A68E6A" strokeWidth={3} strokeDasharray="10 8" />
          <clipPath id="s5-hole">
            <path d={`M ${960 - 190 * dig} 650 A ${190 * dig} ${130 * dig} 0 0 0 ${960 + 190 * dig} 650 Z`} />
          </clipPath>
          <path d={`M ${960 - 190 * dig} 650 A ${190 * dig} ${130 * dig} 0 0 0 ${960 + 190 * dig} 650 Z`} fill="#8C7556" />
          <rect x={740} y={650 + 130 * dig * (1 - flood)} width={440} height={220} fill={C.sky} opacity={0.9} clipPath="url(#s5-hole)" />
          {flood > 0.1 &&
            [-1, 1].map((k) => (
              <path key={k} d={`M ${960 + k * 190 * dig} 652 q ${-k * 20} 20 ${-k * 40} ${30 * flood}`} stroke={C.sky} strokeWidth={8} fill="none" strokeLinecap="round" />
            ))}
        </g>
      </Layer>
      <div style={{position: 'absolute', left: 1050, top: 300 + Math.sin(f / 5) * 14, color: C.ink, opacity: appear, transform: `rotate(${-20 + Math.sin(f / 5) * 10}deg)`}}>
        <Shovel size={130} strokeWidth={1.8} />
      </div>
      <Head kicker="আসল প্রশ্ন" text="নদীর নিচে গর্ত খুঁড়বেন [[কীভাবে?]]" at={cue('প্রশ্নটা', -8)} world={world} y={60} />
    </>
  );
};

export const S06: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const c0 = cue('মজার', -4);
  const dimAt = cue('নদীর নিচে ঘটেনি', -6);
  const q = cue('ঘটেছিল', -4);
  const xs = [280, 610, 940];
  const qPulse = 0.5 + 0.5 * Math.sin((f - q) / 6);
  return (
    <>
      <Head kicker="মজার ব্যাপার" text="সবচেয়ে বড় বিপদ [[নদীতে]] নয়" at={cue('সবচেয়ে বড়', -8)} world={world} y={60} />
      <IconCard at={c0} x={xs[0]} y={350} w={270} h={290} world={world} icon={<Droplet size={70} />} label="জল" dimAt={dimAt} />
      <IconCard at={c0 + 6} x={xs[1]} y={350} w={270} h={290} world={world} icon={<ArrowDownToLine size={70} />} label="চাপ" dimAt={dimAt + 4} />
      <IconCard at={c0 + 12} x={xs[2]} y={350} w={270} h={290} world={world} icon={<Moon size={70} />} label="অন্ধকার" dimAt={dimAt + 8} />
      <IconCard at={q} x={1330} y={330} w={320} h={330} world={world} glowAt={q + 6} icon={<span style={{fontFamily: FONT_BN, fontWeight: 700, fontSize: 130, lineHeight: 1, color: C.red, opacity: 0.6 + 0.4 * qPulse}}>?</span>} label="অন্য কোথাও…" />
      <Sfx name="pop" at={c0} volume={0.25} />
      <Sfx name="ding" at={q + 6} volume={0.3} />
    </>
  );
};
