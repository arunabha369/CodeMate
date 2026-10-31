import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Construction, Droplets, Gauge, Mountain, Pickaxe, Shovel} from 'lucide-react';
import {SceneProps, Sfx} from '../kit';
import {C, FONT_BN} from '../theme';
import {clamp, countUp, enter, pop, prog, rng} from '../anim';
import {Chip, Head, Num} from '../ui/text';
import {IconCard} from '../ui/cards';
import {DimArrow, Elephant, Layer, Person} from '../ui/svg';

export const S13: React.FC<SceneProps> = ({world}) => {
  const f = useCurrentFrame();
  const a = prog(f, 0, 18);
  return (
    <>
    <Head kicker="একটা পরীক্ষা" text="ভেজা বালিতে একটা [[গর্ত]]" at={4} world={world} y={60} />
    <Layer>
      <g opacity={a}>
        <circle cx={1580} cy={250} r={70} fill={C.amber} opacity={0.35} />
        <circle cx={1580} cy={250} r={46} fill={C.amber} opacity={0.6} />
        <path d={`M 1150 800 Q 1300 770 1900 760 L 1900 960 L 1150 960 Z`} fill={C.waterLight} />
        {[0, 1, 2].map((k) => {
          const x = 1180 + ((f * 2 + k * 240) % 720);
          return <path key={k} d={`M ${x} ${800 - k * 6} q 20 -14 40 0 t 40 0`} stroke="#8FA9C2" strokeWidth={4} fill="none" />;
        })}
        <path d="M 0 820 Q 600 800 1250 830 L 1250 960 L 0 960 Z" fill={C.ground} />
        <ellipse cx={860} cy={835} rx={90} ry={16} fill="#B9A281" />
        <Person x={760} y={830} pose="dig" t={f} />
      </g>
    </Layer>
    </>
  );
};

export const S14: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const seep = cue('চারপাশ থেকে', -6);
  const slump = prog(f, cue('দেয়ালগুলো', -4), 40);
  const lvl = prog(f, seep, 90);
  const cx = 960;
  const top = 400;
  const depth = 380;
  const half = 320;
  const wallIn = 70 * slump;
  const hole = `M ${cx - half} ${top} C ${cx - half + 20 + wallIn} ${top + 160}, ${cx - 220 + wallIn} ${top + depth}, ${cx} ${top + depth} C ${cx + 220 - wallIn} ${top + depth}, ${cx + half - 20 - wallIn} ${top + 160}, ${cx + half} ${top} Z`;
  const r = rng(12);
  const drops = new Array(14).fill(0).map((_, i) => ({side: i % 2 ? 1 : -1, y: top + 40 + r() * 260, ph: r()}));
  const grains = new Array(26).fill(0).map(() => ({x: (r() - 0.5) * 2, d: r(), s: 3 + r() * 5}));
  return (
    <>
      <Layer>
        <rect x={0} y={top} width={1920} height={680} fill={C.ground} />
        <rect x={0} y={top + 420} width={1920} height={300} fill={C.groundDeep} />
        <clipPath id="s14-hole">
          <path d={hole} />
        </clipPath>
        <path d={hole} fill="#8C7556" />
        <rect x={cx - half} y={top + depth - lvl * 220} width={half * 2} height={400} fill={C.sky} opacity={0.85} clipPath="url(#s14-hole)" />
        {f > seep &&
          drops.map((d, i) => {
            const t = ((f - seep) / 40 + d.ph) % 1;
            const x0 = cx + d.side * (half + 160);
            const x1 = cx + d.side * (half - 70 - (d.y - top) * 0.4);
            return <ellipse key={i} cx={x0 + (x1 - x0) * t} cy={d.y + t * 30} rx={8} ry={11} fill={C.blue} opacity={0.75 * Math.sin(t * Math.PI)} />;
          })}
        {slump > 0 &&
          grains.map((g, i) => {
            const t = Math.min(1, slump * 1.4 - g.d * 0.4);
            if (t <= 0) return null;
            const side = g.x > 0 ? 1 : -1;
            return <circle key={i} cx={cx + side * (half - 40 - t * 140) + g.x * 30} cy={top + 20 + t * (depth - 60)} r={g.s} fill="#9C8462" />;
          })}
        <rect x={0} y={top - 3} width={1920} height={6} fill="#C4AE88" />
      </Layer>
      <Chip at={seep} x={420} y={560} text="জল চুঁইয়ে ঢুকছে" tone="blue" size={32} />
      <Chip at={cue('দেয়ালগুলো', -2)} x={1500} y={560} text="দেয়াল ধসে পড়ছে" tone="red" size={32} />
      <Sfx name="rumble" at={cue('দেয়ালগুলো')} volume={0.2} />
    </>
  );
};

const BigChip: React.FC<{at: number; x: number; y: number; tone: 'blue' | 'red'; icon: React.ReactNode; text: string}> = ({at, x, y, tone, icon, text}) => {
  const f = useCurrentFrame();
  const p = pop(f, at);
  const col = tone === 'blue' ? C.sky : C.red;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%,-50%) scale(${0.5 + 0.5 * p})`,
        opacity: prog(f, at, 8),
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        padding: '28px 44px',
        borderRadius: 26,
        background: 'rgba(36,32,61,0.95)',
        border: `2px solid ${col}`,
        boxShadow: `0 0 40px ${col}44`,
        color: '#fff',
        fontFamily: FONT_BN,
        fontWeight: 700,
        fontSize: 48,
      }}
    >
      <span style={{color: col, display: 'flex'}}>{icon}</span>
      {text}
    </div>
  );
};

export const S15: React.FC<SceneProps> = ({cue, world}) => (
  <>
    <Head kicker="গঙ্গার নিচে" text="দুটো [[শত্রু]]" at={4} world={world} y={150} size={96} />
    <BigChip at={cue('এক —')} x={620} y={520} tone="blue" icon={<Droplets size={60} />} text="১ · জল ঢুকবে" />
    <BigChip at={cue('দুই —')} x={1300} y={520} tone="red" icon={<Mountain size={60} />} text="২ · মাটি ধসবে" />
    <Sfx name="pop" at={cue('এক —')} volume={0.35} />
    <Sfx name="pop" at={cue('দুই —')} volume={0.35} />
  </>
);

export const S16: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const start = cue('যত নামবেন', -10);
  const end = cue('বায়ুমণ্ডলের', 10);
  const y0 = 230;
  const y1 = 900;
  const gy = interpolate(f, [start, end], [y0 + 20, y1 - 40], clamp);
  const ticks = [0, 10, 20, 30];
  const needle = interpolate(gy, [y0, y1], [-70, 70]);
  return (
    <>
      <Layer>
        <defs>
          <linearGradient id="s16-w" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#D7E1EA" />
            <stop offset="1" stopColor="#7E98B3" />
          </linearGradient>
        </defs>
        <rect x={300} y={y0} width={1000} height={y1 - y0} rx={10} fill="url(#s16-w)" opacity={prog(f, 0, 14)} />
        {[0, 1, 2, 3, 4].map((k) => (
          <path key={k} d={`M ${360 + k * 200 + ((f * 1.3) % 60)} ${y0 + 40} q 14 -7 28 0 t 28 0`} stroke="#fff" strokeWidth={3} fill="none" opacity={0.7} />
        ))}
        <line x1={1400} x2={1400} y1={y0} y2={y1} stroke={C.ink} strokeWidth={3} />
        {ticks.map((t, i) => {
          const ty = y0 + (i / 3) * (y1 - y0);
          return (
            <g key={t}>
              <line x1={1385} x2={1415} y1={ty} y2={ty} stroke={C.ink} strokeWidth={3} />
              <text x={1435} y={ty + 10} fontFamily="Oswald" fontWeight={600} fontSize={34} fill={C.ink}>
                {t}
              </text>
              <text x={1435 + (t >= 10 ? 46 : 26)} y={ty + 10} fontFamily={FONT_BN} fontWeight={600} fontSize={26} fill={C.inkSoft}>
                মিটার
              </text>
            </g>
          );
        })}
        <g transform={`translate(800 ${gy})`}>
          <circle r={62} fill="#fff" stroke={C.ink} strokeWidth={5} />
          <path d="M -44 18 A 48 48 0 1 1 44 18" fill="none" stroke={C.paperLine} strokeWidth={8} />
          <line x1={0} y1={0} x2={Math.sin((needle * Math.PI) / 180) * 42} y2={-Math.cos((needle * Math.PI) / 180) * 42} stroke={C.red} strokeWidth={6} strokeLinecap="round" />
          <circle r={8} fill={C.ink} />
        </g>
      </Layer>
      {ticks.slice(1).map((t, i) => {
        const ty = y0 + ((i + 1) / 3) * (y1 - y0);
        const at = interpolate(ty - 40, [y0 + 20, y1 - 40], [start, end]);
        return <Chip key={t} at={at} x={1000} y={ty} text={<Num size={34}>+1</Num>} tone="orange" size={28} />;
      })}
      <Chip at={cue('মোটামুটি', -4)} x={800} y={140} text="প্রতি 10 মিটারে চাপ বাড়ে ≈ 1 বায়ুমণ্ডল" size={34} />
    </>
  );
};

export const S17: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const dropStart = cue('তিরিশ টন', -10);
  const step = 12;
  const spots: [number, number][] = [
    [560, 700],
    [760, 700],
    [960, 700],
    [660, 590],
    [860, 590],
    [760, 480],
  ];
  const landed = spots.map((_, i) => prog(f, dropStart + i * step, 12));
  const count = landed.filter((x) => x >= 1).length;
  const tons = Math.round(countUp(f, dropStart, 30, step * 6 + 10));
  return (
    <>
      <Head text="প্রতি বর্গমিটারে ~30 [[টন]]" at={cue('মানে', -6)} world={world} y={70} />
      <Chip at={4} x={760} y={230} text="সুড়ঙ্গ: জলের উপরিতল থেকে ~30 মিটার নিচে" tone="blue" size={28} out={cue('মানে', -6)} />
      <Layer>
        <rect x={500} y={740} width={520} height={44} rx={6} fill={C.concrete} stroke="#8E909A" strokeWidth={2} opacity={prog(f, 0, 12)} />
        <DimArrow x1={500} y1={820} x2={1020} y2={820} at={10} />
        {spots.map(([x, y], i) => {
          const p = landed[i];
          if (p <= 0) return null;
          const yy = interpolate(p, [0, 1], [y - 500, y]);
          return <Elephant key={i} x={x} y={yy + 40} scale={0.95} />;
        })}
      </Layer>
      <Chip at={14} x={760} y={866} text="1 বর্গমিটার" size={26} />
      <div style={{position: 'absolute', left: 1240, top: 420, opacity: prog(f, dropStart, 10), fontFamily: FONT_BN}}>
        <Num size={170} color={C.orange}>
          ~{tons}
        </Num>
        <span style={{fontSize: 60, fontWeight: 700, color: C.ink, marginLeft: 16}}>টন</span>
        <div style={{fontSize: 30, fontWeight: 600, color: C.inkSoft, marginTop: 8}}>জলের চাপ</div>
      </div>
      <Chip at={cue('ছটা হাতির')} x={1420} y={740} text={`≈ ${count}টা হাতি`} tone="orange" size={32} />
      {spots.map((_, i) => (
        <Sfx key={i} name="thud" at={dropStart + i * step + 11} volume={0.3} />
      ))}
    </>
  );
};

export const S18: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const n1 = cue('কোদাল', 6);
  const n2 = cue('সাধারণ কোনো', 8);
  const need = cue('দরকার ছিল', -4);
  const out = need - 4;
  const bp = prog(f, need, 30);
  return (
    <>
      <Head text="সাধারণ খোঁড়াখুঁড়ি {{চলবে না}}" at={2} world={world} y={70} out={out + 8} />
      <IconCard at={6} x={420} y={330} w={300} h={320} world={world} icon={<Shovel size={110} strokeWidth={1.6} />} label="কোদাল-বেলচা" strikeAt={n1} out={out} />
      <IconCard at={12} x={800} y={330} w={300} h={320} world={world} icon={<Pickaxe size={110} strokeWidth={1.6} />} label="গাঁইতি" strikeAt={n1 + 8} out={out} />
      <IconCard at={18} x={1180} y={330} w={300} h={320} world={world} icon={<Construction size={110} strokeWidth={1.6} />} label="সাধারণ যন্ত্র" strikeAt={n2} out={out} />
      <Layer>
        <g opacity={bp} transform={`translate(${interpolate(bp, [0, 1], [300, 0])} 0)`} stroke={C.sky} strokeWidth={3} fill="none" strokeDasharray="10 8">
          <rect x={360} y={300} width={1200} height={300} rx={150} />
          <ellipse cx={1560} cy={450} rx={40} ry={150} />
          <line x1={760} y1={300} x2={760} y2={600} />
          <line x1={1160} y1={300} x2={1160} y2={600} />
        </g>
      </Layer>
      <Chip at={cue('খুঁড়বে,')} x={560} y={720} text="⚙ খুঁড়বে" tone="orange" world={world} size={34} />
      <Chip at={cue('চাপ ঠেকাবে')} x={960} y={720} text="⇆ চাপ ঠেকাবে" tone="orange" world={world} size={34} />
      <Chip at={cue('দেয়াল গেঁথে')} x={1370} y={720} text="◯ দেয়াল গাঁথবে" tone="orange" world={world} size={34} />
      <Sfx name="pop" at={cue('খুঁড়বে,')} volume={0.3} />
      <Sfx name="pop" at={cue('চাপ ঠেকাবে')} volume={0.3} />
      <Sfx name="pop" at={cue('দেয়াল গেঁথে')} volume={0.3} />
    </>
  );
};
