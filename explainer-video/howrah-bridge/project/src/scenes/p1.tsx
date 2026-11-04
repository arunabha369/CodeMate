import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Camera, SceneProps, Sfx} from '../kit';
import {C, FONT_BN, FONT_NUM} from '../theme';
import {clamp, pop, prog} from '../anim';
import {Chip, Head, Kicker} from '../ui/text';
import {Calendar} from '../ui/cards';
import {PhotoCard} from '../ui/extra';
import {ChapterIntro, chapterReveal, Nouka, QuestionCard, TopShip, Vignette} from '../ui/story';
import {HowrahBridge} from '../hero/HowrahBridge';
import {DimArrow, Layer} from '../ui/svg';
import {ArchiveSkyline, BullockCart, HandCart, Ledger, PontoonSection, Steamer, Walker} from '../ui/archive';

/** S08: the pontoon bridge in section; the whole road rides up and down with the river. */
export const S08: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const level = 16 * Math.sin((f / 110) * Math.PI * 2);
  const lab1 = cue('পন্টুন', -4);
  const lab2 = cue('রাস্তা', -4);
  const tide = cue('বাড়লে-কমলে', -6);
  const arrowsO = prog(f, tide, 12);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 900, y: 620, z: 1.32},
          {f: s.dur + 12, x: 1000, y: 630, z: 1.42},
        ]}
      >
        <Layer>
          <ArchiveSkyline y={600} frame={f} />
          <Steamer x={1500 - ((f * 0.8) % 600)} y={655} scale={0.45} color={C.archInkSoft} t={f} />
          <PontoonSection y={720} level={level} frame={f} n={11} />
          <DimArrow x1={120} y1={455} x2={1800} y2={455} at={20} color={C.archInk} />
          {/* rise/fall arrows */}
          <g opacity={arrowsO} transform={`translate(1480 ${610 - level})`}>
            <path d="M 0 -60 l -16 26 h 32 Z" fill={C.archAccent} />
            <line x1={0} y1={-40} x2={0} y2={40} stroke={C.archAccent} strokeWidth={6} />
            <path d="M 0 60 l -16 -26 h 32 Z" fill={C.archAccent} />
          </g>
        </Layer>
        <Chip text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{fontFamily: FONT_NUM}}>~466</span> মিটার</span>} at={26} x={960} y={455} world={world} size={26} />
        <Chip text="পন্টুন" at={lab1} x={700} y={800 - level} world={world} tone="neutral" size={28} />
        <Chip text="রাস্তা" at={lab2} x={1150} y={590 - level} world={world} size={28} />
        <Chip text="জল বাড়ে-কমে" at={tide + 6} x={1480} y={520 - level} world={world} size={24} tone="orange" />
      </Camera>
      <Kicker text="ভাসমান সেতু · 1874" at={4} world={world} y={70} />
      <Head text="জলের সঙ্গে [[ওঠে-নামে]] রাস্তা" at={10} world={world} y={60} size={64} />
      <Sfx name="swoosh-soft" at={lab1} volume={0.2} />
    </>
  );
};

/** S10: the 1906 survey: vehicles are tallied one by one, then 8 of the 13 flip to bullock carts. */
export const S10: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const fill = cue('তেরো ভাগের আট ভাগই', -4);
  const tallyEvery = 9;
  const cells = Array.from({length: 13}, (_, i) => i);
  const cw = 132;
  const gap = 18;
  const gx = 270;
  const gy = 400;
  const fracS = pop(f, fill + 8 * 4 + 6);
  return (
    <>
      <Ledger x={170} y={250} w={1580} h={620} at={0} title="সমীক্ষা · 1906 · সবচেয়ে ভিড়ের দিন">
        {null}
      </Ledger>
      <Layer>
        {cells.map((i) => {
          const row = i < 7 ? 0 : 1;
          const col = row === 0 ? i : i - 7;
          const x = gx + col * (cw + gap) + (row === 1 ? (cw + gap) / 2 : 0);
          const y = gy + row * (cw + gap + 14);
          const tallyAt = 8 + i * tallyEvery;
          const flipAt = fill + i * 4;
          const tp = pop(f, tallyAt);
          const isCart = i < 8 && f >= flipAt;
          const fp = i < 8 ? pop(f, flipAt) : 1;
          const o = Math.min(1, prog(f, tallyAt, 6));
          const sc = 0.5 + 0.5 * tp * (isCart ? 0.85 + 0.15 * fp : 1);
          return (
            <g key={i}>
              <rect x={x} y={y} width={cw} height={cw} rx={16} fill="#FBF6EA" stroke={C.archLine} strokeWidth={2} strokeDasharray="6 6" />
              <g opacity={o} transform={`translate(${x + cw / 2} ${y + cw / 2}) scale(${sc}) translate(${-x - cw / 2} ${-y - cw / 2})`}>
                <rect x={x} y={y} width={cw} height={cw} rx={16} fill={isCart ? '#F3DDBF' : '#ECE5D6'} stroke={isCart ? C.archAccent : C.archLine} strokeWidth={isCart ? 3 : 2} />
                {isCart ? (
                  <BullockCart x={x + cw / 2 + 2} y={y + cw - 24} scale={0.98} color={C.archAccent} t={f} />
                ) : (
                  <HandCart x={x + cw / 2 - 2} y={y + cw - 30} scale={1.05} color={C.archInkSoft} />
                )}
              </g>
            </g>
          );
        })}
      </Layer>
      <div style={{position: 'absolute', left: 1390, top: 430, transform: `scale(${fracS})`, transformOrigin: '0 50%', opacity: Math.min(1, fracS * 1.5)}}>
        <div style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: 170, lineHeight: 1, color: C.archAccent}}>8/13</div>
        <div style={{fontFamily: FONT_BN, fontWeight: 700, fontSize: 36, color: C.archInk, marginTop: 12}}>গাড়িই গরুর গাড়ি</div>
      </div>
      <div style={{position: 'absolute', left: 1390, top: 470, fontFamily: FONT_BN, fontWeight: 600, fontSize: 32, color: C.archInkSoft, opacity: (1 - Math.min(1, fracS * 2)) * prog(f, 10, 10)}}>
        গাড়ি গোনা চলছে…
      </div>
      <Head kicker="1906-এর সমীক্ষা" text="ভিড়ের [[রাজা]] গরুর গাড়ি" at={fill - 16} world={world} y={56} size={68} />
      {cells.map((i) => (
        <Sfx key={'t' + i} name="tick" at={8 + i * tallyEvery} volume={0.1} />
      ))}
      {cells.slice(0, 8).map((i) => (
        <Sfx key={i} name="pop" at={fill + i * 4} volume={0.12} />
      ))}
      <Sfx name="ding" at={fill + 40} volume={0.2} />
    </>
  );
};


/** Side view of the old river crossing: far-bank skyline, water, boats. */
const RiverScene: React.FC<{f: number; boats?: boolean; y?: number}> = ({f, boats = true, y = 560}) => (
  <g>
    <ArchiveSkyline y={y} frame={f} />
    <rect x={0} y={y} width={1920} height={1080 - y} fill={C.archWater} />
    {[30, 80, 150, 240, 330].map((d, i) => (
      <line key={i} x1={((f * (0.5 + i * 0.15) + i * 400) % 2200) - 200} y1={y + d} x2={((f * (0.5 + i * 0.15) + i * 400) % 2200) - 60} y2={y + d} stroke={C.archLine} strokeWidth={2.5} opacity={0.7} />
    ))}
    {boats && (
      <>
        <Steamer x={((f * 0.6 + 1200) % 2500) - 300} y={y + 70} scale={1.0} color={C.archInkSoft} t={f} />
        <Nouka x={((f * 1.1 + 300) % 2300) - 200} y={y + 170} scale={2.2} t={f} />
        <Nouka x={2000 - ((f * 0.8 + 900) % 2300)} y={y + 330} scale={2.8} flip t={f + 30} />
      </>
    )}
  </g>
);

/** S06: chapter 1: before the bridge, boats crossing the river. */
export const S06: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const q = cue('লোকে গঙ্গা', -10);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 600, z: 1.05},
          {f: s.dur + 12, x: 980, y: 620, z: 1.12},
        ]}
      >
        <div style={{position: 'absolute', inset: 0, opacity: chapterReveal(f)}}>
          <Layer>
            <RiverScene f={f} />
          </Layer>
        </div>
      </Camera>
      <ChapterIntro n="১" title="ব্রিজের [[আগে]]" world={world} />
      <QuestionCard text="লোকে গঙ্গা পেরোত কীভাবে?" at={q} x={960} y={420} world={world} />
      <Sfx name="whoosh" at={2} volume={0.25} />
      <Sfx name="pop" at={q} volume={0.25} />
    </>
  );
};

/** A drawn sepia "photograph" of the floating bridge, used when the real photo is not available. */
const PontoonPhoto: React.FC<{f: number}> = ({f}) => (
  <Vignette x={150} y={250} w={1100} h={560} at={0} rot={-1.5}>
    <g transform="translate(-40 -150) scale(0.66)">
      <ArchiveSkyline y={640} frame={f} />
      <PontoonSection y={760} level={6 * Math.sin(f / 30)} frame={f} n={12} />
    </g>
  </Vignette>
);

/** S07: the 1874 pontoon bridge: photo card (or drawn photo), calendar and engineer chip. */
export const S07: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const cal = cue('আঠারোশো', -8);
  const name = cue('ব্র্যাডফোর্ড', -4);
  return (
    <>
      <PhotoCard slot="P02" x={150} y={250} w={1100} h={560} at={0} grade="sepia" rot={-1.5} dur={240} fallback={<PontoonPhoto f={f} />} />
      <Calendar month="অক্টোবর" day="17" year="1874" at={cal} x={1560} y={470} scale={0.95} world={world} />
      <Chip text="স্যার ব্র্যাডফোর্ড লেসলি" at={name} x={1560} y={720} world={world} size={30} tone="neutral" />
      <Head text="একটা [[ভাসমান]] সেতু" at={4} world={world} y={70} size={74} />
      <Sfx name="pop" at={cal} volume={0.3} />
    </>
  );
};

/** Plan view of the pontoon bridge across the river with an opening section for ships. */
const PontoonPlan: React.FC<{f: number; open: number; shipX: number; queue: number}> = ({f, open, shipX, queue}) => {
  const top = 300;
  const bot = 860;
  const bx = 960;
  const n = 11;
  const ph = (bot - top) / n;
  const mid = Math.floor(n / 2);
  return (
    <g>
      {/* banks */}
      <rect x={0} y={150} width={1920} height={top - 150} fill="#D6C29C" />
      <rect x={0} y={bot} width={1920} height={1080 - bot} fill="#D6C29C" />
      {Array.from({length: 16}, (_, i) => (
        <rect key={i} x={40 + i * 120} y={170 + ((i * 37) % 50)} width={70} height={46} fill={C.archLine} opacity={0.5} />
      ))}
      {Array.from({length: 16}, (_, i) => (
        <rect key={`b${i}`} x={60 + i * 120} y={bot + 40 + ((i * 53) % 60)} width={70} height={46} fill={C.archLine} opacity={0.5} />
      ))}
      {/* water */}
      <rect x={0} y={top} width={1920} height={bot - top} fill={C.archWater} />
      {Array.from({length: 14}, (_, i) => {
        const yy = top + 30 + (i * 41) % (bot - top - 40);
        const xx = ((f * (1 + (i % 3) * 0.4) + i * 230) % 2100) - 100;
        return <line key={i} x1={xx} y1={yy} x2={xx + 60} y2={yy} stroke={C.archLine} strokeWidth={3} opacity={0.7} />;
      })}
      {/* pontoons + deck */}
      {Array.from({length: n}, (_, i) => {
        const y = top + i * ph;
        // a double-leaf opening: two sections swing aside like gates
        const tf = i === mid ? `rotate(${-70 * open} ${bx - 56} ${y})` : i === mid + 1 ? `rotate(${70 * open} ${bx - 56} ${y + ph})` : '';
        return (
          <g key={i} transform={tf}>
            <rect x={bx - 100} y={y + 6} width={200} height={ph - 12} rx={18} fill={C.archInk} />
            <rect x={bx - 56} y={y} width={112} height={ph} fill="#B79E74" stroke={C.archInk} strokeWidth={3} />
            <line x1={bx} y1={y + 4} x2={bx} y2={y + ph - 4} stroke={C.archInk} strokeWidth={2} strokeDasharray="8 8" opacity={0.5} />
          </g>
        );
      })}
      {/* ship passing through the opening */}
      <TopShip x={shipX} y={top + (mid + 1) * ph} scale={1.25} color={C.archInk} t={f} />
      {/* queues of carts and people on both banks */}
      {Array.from({length: Math.round(queue * 9)}, (_, i) => (
        <g key={i}>
          <rect x={bx - 30} y={top - 36 - i * 30} width={60} height={24} rx={6} fill={i % 3 ? C.archInkSoft : C.archAccent} />
          <rect x={bx - 30} y={bot + 12 + i * 30} width={60} height={24} rx={6} fill={i % 3 ? C.archInkSoft : C.archAccent} />
        </g>
      ))}
    </g>
  );
};

/** S09: the middle section swings open, a steamer passes, queues grow on both banks. */
export const S09: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const o1 = cue('খুলে সরিয়ে', -8);
  const pass = cue('স্টিমার', -20);
  const wait = cue('অপেক্ষা', -30);
  const open = interpolate(f, [o1, o1 + 24, s.dur - 30, s.dur], [0, 1, 1, 0.3], clamp);
  const shipX = interpolate(f, [pass, pass + 150], [-200, 2200], clamp);
  const queue = interpolate(f, [o1 + 10, wait + 40], [0, 1], clamp);
  const watchA = (f - o1) * 18;
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 580, z: 1.0},
          {f: s.dur + 12, x: 960, y: 580, z: 1.06},
        ]}
      >
        <Layer>
          <PontoonPlan f={f} open={open} shipX={shipX} queue={queue} />
          {/* pocket watch */}
          <g transform="translate(1600 210)" opacity={prog(f, wait - 10, 10)}>
            <circle r={58} fill="#FBF6EA" stroke={C.archInk} strokeWidth={8} />
            <rect x={-10} y={-80} width={20} height={18} rx={4} fill={C.archInk} />
            <line x1={0} y1={0} x2={0} y2={-40} stroke={C.archInk} strokeWidth={6} strokeLinecap="round" transform={`rotate(${watchA})`} />
            <line x1={0} y1={0} x2={28} y2={0} stroke={C.archAccent} strokeWidth={6} strokeLinecap="round" transform={`rotate(${watchA / 12})`} />
          </g>
        </Layer>
      </Camera>
      <Chip text="সেতু খোলা — রাস্তা বন্ধ" at={o1 + 16} x={1260} y={580} world={world} tone="red" size={28} />
      <Head text="জাহাজ এলেই রাস্তা {{বন্ধ}}" at={4} world={world} y={40} size={66} />
      <Sfx name="whoosh" at={o1} volume={0.25} />
      <Sfx name="tick" at={wait} volume={0.2} />
    </>
  );
};

/** S11: the old bridge strains in a storm; a permanent bridge is drawn over it. */
export const S11: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const storm = cue('ঝড়-বাদলেও', -10);
  const pakka = cue('পাকা, স্থায়ী', -6);
  const stormK = interpolate(f, [storm, storm + 20], [0, 1], clamp) * (1 - prog(f, pakka + 30, 20));
  const level = (6 + 14 * stormK) * Math.sin(f / (16 - 6 * stormK));
  const ghost = prog(f, pakka, 40);
  const photoO = interpolate(f, [0, 8, 56, 70], [0, 1, 1, 0], clamp);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 600, z: 1.25},
          {f: s.dur + 12, x: 960, y: 580, z: 1.12},
        ]}
      >
        <Layer>
          <ArchiveSkyline y={600} frame={f} />
          <PontoonSection y={730} level={level} frame={f} n={11} />
          {/* storm: clouds, rain, wind */}
          <g opacity={stormK}>
            {[300, 760, 1240, 1640].map((cx, i) => (
              <ellipse key={i} cx={cx + Math.sin(f / 40 + i) * 30} cy={330 + (i % 2) * 30} rx={260} ry={70} fill={C.archInkSoft} opacity={0.35} />
            ))}
            {Array.from({length: 60}, (_, i) => {
              const x = (i * 53 + f * 9) % 2000;
              const y = 350 + ((i * 97 + f * 22) % 520);
              return <line key={i} x1={x} y1={y} x2={x - 14} y2={y + 34} stroke={C.archInkSoft} strokeWidth={2} opacity={0.45} />;
            })}
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M ${((f * 6 + i * 600) % 2200) - 200} ${420 + i * 40} q 60 -20 120 0 t 120 0`} stroke={C.archInk} strokeWidth={3} fill="none" opacity={0.4} />
            ))}
          </g>
          {/* strain marks at joints (slow pulse) */}
          {[520, 880, 1240].map((x, i) => (
            <circle key={i} cx={x} cy={655 - level} r={22} fill="none" stroke="#B8322A" strokeWidth={5} opacity={stormK * (0.4 + 0.4 * Math.sin(f / 9 + i))} />
          ))}
          {/* permanent bridge drawn over it as a blueprint ghost */}
          {ghost > 0 && (
            <g opacity={0.85}>
              <HowrahBridge x={960} y={640} s={2.4} vex={1.4} theme="archive" parts={{towers: ghost, anchor: ghost, cantilever: ghost, suspended: ghost, deck: ghost, piers: ghost}} hiColor={C.archAccent} highlight={['anchor', 'cantilever', 'suspended', 'towers']} dimOthers={1} depth={false} />
            </g>
          )}
        </Layer>
      </Camera>
      <div style={{position: 'absolute', inset: 0, opacity: photoO}}>
        <PhotoCard slot="P03" x={360} y={220} w={1200} h={620} at={0} grade="sepia" dur={70} />
      </div>
      <Head text="চাই একটা [[পাকা]] সেতু" at={pakka - 20} world={world} y={60} size={72} />
      <Sfx name="rumble" at={storm} volume={0.25} />
      <Sfx name="ding" at={pakka + 20} volume={0.2} />
    </>
  );
};

/** S12: a sepia timeline from the first plans to the 1926 Act; the camera pans along it. */
export const S12: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const pins = [
    {x: 380, year: '1905', label: 'পরিকল্পনা শুরু', at: cue('উনিশশো পাঁচেই', -6), tone: C.archInk, up: true},
    {x: 900, year: '1914–18', label: 'প্রথম বিশ্বযুদ্ধ — কাজ থমকে', at: cue('প্রথম বিশ্বযুদ্ধে', -6), tone: '#B8322A', up: false},
    {x: 1420, year: '1921', label: 'মুখার্জি কমিটি', at: cue('কমিটি', -6), tone: C.archInk, up: true},
    {x: 1980, year: '1926', label: 'নিউ হাওড়া ব্রিজ আইন', at: cue('উনিশশো ছাব্বিশে', -6), tone: C.archAccent, up: false},
  ];
  const lineP = interpolate(f, [0, s.dur * 0.9], [0.05, 1], clamp);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 800, y: 560, z: 1.0},
          {f: s.dur + 12, x: 1380, y: 560, z: 1.0},
        ]}
      >
        <Layer>
          <line x1={120} y1={560} x2={120 + 2100 * lineP} y2={560} stroke={C.archInk} strokeWidth={6} strokeLinecap="round" />
          {Array.from({length: 30}, (_, i) => (
            <line key={i} x1={140 + i * 70} y1={548} x2={140 + i * 70} y2={572} stroke={C.archInk} strokeWidth={2} opacity={prog(f, (i / 30) * s.dur * 0.9, 6) * 0.5} />
          ))}
          {pins.map((p, i) => {
            const pp = pop(f, p.at);
            const o = prog(f, p.at, 8);
            const big = i === 3 ? 1.25 : 1;
            return (
              <g key={i} opacity={o}>
                <line x1={p.x} y1={560} x2={p.x} y2={p.up ? 560 - 140 * pp : 560 + 140 * pp} stroke={p.tone} strokeWidth={4} />
                <circle cx={p.x} cy={560} r={16 * big * pp} fill={p.tone} />
                <circle cx={p.x} cy={560} r={28 * big * pp} fill="none" stroke={p.tone} strokeWidth={3} opacity={0.5} />
              </g>
            );
          })}
        </Layer>
        {pins.map((p, i) => {
          const o = prog(f, p.at + 4, 10);
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: p.x,
                top: p.up ? 300 : 720,
                transform: `translate(-50%, 0) translateY(${(1 - o) * (p.up ? 20 : -20)}px)`,
                opacity: o,
                textAlign: 'center',
                padding: '16px 26px',
                borderRadius: 14,
                background: C.archCard,
                border: `2px solid ${p.tone}`,
                boxShadow: '0 14px 30px rgba(91,70,50,0.18)',
              }}
            >
              <div style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: i === 3 ? 64 : 52, color: p.tone, lineHeight: 1}}>{p.year}</div>
              <div style={{fontFamily: FONT_BN, fontWeight: 700, fontSize: 28, color: C.archInk, marginTop: 6, whiteSpace: 'nowrap'}}>{p.label}</div>
            </div>
          );
        })}
      </Camera>
      <Head kicker="নতুন সেতুর পথ" text="ভাবনা থেকে [[আইন]]" at={4} world={world} y={50} size={66} />
      {pins.map((p, i) => (
        <Sfx key={i} name={i === 3 ? 'ding' : 'pop'} at={p.at} volume={0.22} />
      ))}
    </>
  );
};
