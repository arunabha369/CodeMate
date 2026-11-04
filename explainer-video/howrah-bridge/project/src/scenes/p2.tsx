import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Check} from 'lucide-react';
import {Camera, SceneProps, Sfx} from '../kit';
import {C, FONT_BN, FONT_NUM} from '../theme';
import {clamp, easeInOut, pop, prog, rng} from '../anim';
import {Chip, Head} from '../ui/text';
import {cardBg} from '../ui/cards';
import {Cursor} from '../ui/app';
import {ChapterIntro, chapterReveal, Pitch, PushHand, Stamp, TopShip} from '../ui/story';
import {BookIcon} from '../ui/ruler';
import {DimArrow, Layer} from '../ui/svg';
import {RulerExperiment} from '../ui/ruler';
import {bridgeSpace, G, HowrahBridge, Part} from '../hero/HowrahBridge';

/** S19: a thick book on the inner end holds the ruler far out over the edge: that is a cantilever. */
export const S19: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const drop = cue('মোটা বই', -2);
  const book = interpolate(f, [drop, drop + 14], [0, 1], {...clamp, easing: (t) => t * t});
  const push = cue('অনেকটা', -10);
  const overhang = interpolate(f, [0, 8, push, push + 40], [0.32, 0.32, 0.32, 0.6], {...clamp, easing: easeInOut});
  const ok = cue('আর পড়ছে না', 0);
  const checkS = pop(f, ok);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 860, y: 540, z: 1.16},
          {f: s.dur + 12, x: 930, y: 540, z: 1.22},
        ]}
      >
        <Layer>
          <RulerExperiment overhang={overhang} book={book} frame={f} />
        </Layer>
        <Chip text="বই = পেছনের ভার" at={drop + 16} x={540} y={390} world={world} tone="blue" size={28} />
        <Chip text="কিনারা = ভরকেন্দ্র" at={drop + 26} x={980} y={650} world={world} tone="orange" size={28} />
        <div
          style={{
            position: 'absolute',
            left: 1330,
            top: 400,
            width: 110,
            height: 110,
            borderRadius: 55,
            background: C.green,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${checkS})`,
            boxShadow: '0 12px 30px rgba(46,158,91,0.35)',
          }}
        >
          <Check size={68} strokeWidth={3.4} />
        </div>
      </Camera>
      <Head kicker="ছোট্ট পরীক্ষা" text="এটাই [[ক্যান্টিলিভার]]" at={cue('এটাই', -14)} world={world} y={60} size={72} />
      <Sfx name="thud" at={drop + 14} volume={0.45} />
      <Sfx name="swoosh-soft" at={push} volume={0.18} />
      <Sfx name="ding" at={ok} volume={0.25} />
    </>
  );
};

/** S23: anatomy: the suspended span between the tips, then the overall lengths. */
export const ANATOMY = {x: 960, y: 650, s: 2.3, vex: 1.55};

export const S23: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(ANATOMY);
  const susp = cue('সাসপেন্ডেড', -6);
  const total = cue('সব মিলিয়ে', -6);
  // final glow sequence through the parts
  const seqStart = Math.max(total + 40, s.dur - 120);
  const seq: Part[] = ['towers', 'anchor', 'cantilever', 'suspended'];
  const k = Math.floor(interpolate(f, [seqStart, seqStart + 80], [0, 4], clamp));
  const hi: Part = f >= seqStart && k < 4 ? seq[k] : 'suspended';
  const dimO = interpolate(f, [susp - 6, susp + 6], [1, 0.32], clamp);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 560, z: 1.02},
          {f: s.dur + 12, x: 960, y: 560, z: 1.06},
        ]}
      >
        <Layer>
          <HowrahBridge {...ANATOMY} theme="paper" site highlight={f >= susp ? hi : null} dimOthers={dimO} />
          <DimArrow x1={sp.X(-G.tip)} y1={sp.top(0) - 60} x2={sp.X(G.tip)} y2={sp.top(0) - 60} at={susp + 4} color={C.orange} />
          <DimArrow x1={sp.X(-G.tower)} y1={ANATOMY.y + 70} x2={sp.X(G.tower)} y2={ANATOMY.y + 70} at={total} color={C.ink} />
          <DimArrow x1={sp.X(-G.half)} y1={ANATOMY.y + 175} x2={sp.X(G.half)} y2={ANATOMY.y + 175} at={total + 16} color={C.blue} />
        </Layer>
        <Chip text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{fontFamily: FONT_NUM}}>~172</span> মি</span>} at={susp + 14} x={960} y={sp.top(0) - 60} world={world} tone="orange" size={30} />
        <Chip text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{fontFamily: FONT_NUM}}>~457</span> মি · মূল স্প্যান</span>} at={total + 10} x={960} y={ANATOMY.y + 70} world={world} size={28} />
        <Chip text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{fontFamily: FONT_NUM}}>~705</span> মি · মোট দৈর্ঘ্য</span>} at={total + 26} x={960} y={ANATOMY.y + 175} world={world} tone="blue" size={28} />
      </Camera>
      <Head kicker="সেতুর গঠন" text="মাঝে ঝোলানো [[সাসপেন্ডেড স্প্যান]]" at={susp - 10} world={world} y={60} size={64} />
      <Sfx name="pop" at={susp + 14} volume={0.25} />
      <Sfx name="whoosh" at={total} volume={0.2} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name="tick" at={seqStart + i * 20} volume={0.15} />
      ))}
    </>
  );
};


/** S13: chapter 2: a blueprint with a pier in the river gets a red "rejected" stamp. */
export const S13: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const hit = cue('চলবে না', -4);
  const pierO = interpolate(f, [hit + 14, hit + 40], [1, 0.25], clamp);
  const ink = C.blue;
  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: chapterReveal(f)}}>
        <Layer>
          {/* blueprint sheet */}
          <rect x={210} y={300} width={1500} height={600} rx={10} fill="#E3EDF6" stroke={ink} strokeWidth={3} />
          {Array.from({length: 24}, (_, i) => (
            <line key={i} x1={210 + i * 62.5} y1={300} x2={210 + i * 62.5} y2={900} stroke={ink} strokeWidth={1} opacity={0.15} />
          ))}
          {Array.from({length: 10}, (_, i) => (
            <line key={`h${i}`} x1={210} y1={300 + i * 60} x2={1710} y2={300 + i * 60} stroke={ink} strokeWidth={1} opacity={0.15} />
          ))}
          {/* banks and river */}
          <path d="M 260 640 L 520 640 L 580 820 L 260 820 Z" fill="none" stroke={ink} strokeWidth={3} />
          <path d="M 1660 640 L 1400 640 L 1340 820 L 1660 820 Z" fill="none" stroke={ink} strokeWidth={3} />
          <path d="M 580 700 Q 960 690 1340 700" fill="none" stroke={ink} strokeWidth={2} strokeDasharray="12 10" />
          {/* generic girder bridge with a pier in mid-river */}
          <rect x={300} y={600} width={1320} height={22} fill="none" stroke={ink} strokeWidth={3} />
          {Array.from({length: 22}, (_, i) => (
            <line key={`g${i}`} x1={300 + i * 60} y1={600} x2={330 + i * 60} y2={622} stroke={ink} strokeWidth={2} />
          ))}
          <g opacity={pierO}>
            <rect x={930} y={622} width={60} height={200} fill="#F7D9D5" stroke={C.red} strokeWidth={4} />
            <line x1={930} y1={700} x2={990} y2={700} stroke={C.red} strokeWidth={2} />
          </g>
          <text x={250} y={350} fontFamily={FONT_BN} fontWeight={700} fontSize={28} fill={ink}>
            নকশা: নদীর মাঝে খুঁটি
          </text>
        </Layer>
      </div>
      <Stamp text="বাতিল" x={960} y={700} at={hit} size={84} />
      <ChapterIntro n="২" title="নদীতে খুঁটি {{চলবে না}}" world={world} />
      <Sfx name="thud" at={hit} volume={0.5} />
    </>
  );
};

/** S14: plan view: water flows around a pier, silt piles up downstream, a ship's path is blocked. */
export const S14: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const silt = cue('পলি জমার', -8);
  const ship = Math.min(cue('জাহাজ চলাচল', -70), s.dur - 110);
  const bank = interpolate(f, [silt, silt + 90], [0, 1], clamp);
  const shipX = interpolate(f, [ship, ship + 60], [-200, 640], {...clamp, easing: easeInOut});
  const warn = f > ship + 60 ? 0.5 + 0.5 * Math.sin((f - ship) / 5) : 0;
  const r = rng(5);
  const flows = Array.from({length: 9}, (_, i) => 380 + i * 60);
  const specks = Array.from({length: 70}, () => ({x: r(), y: r(), d: r()}));
  const py = 640;
  const px = 820;
  return (
    <>
      <Layer>
        <rect x={0} y={260} width={1920} height={120} fill={C.ground} />
        <rect x={0} y={900} width={1920} height={180} fill={C.ground} />
        <rect x={0} y={380} width={1920} height={520} fill={C.waterLight} />
        {/* streamlines bending around the pier */}
        {flows.map((y0, i) => {
          const dy = y0 - py;
          const bend = Math.abs(dy) < 200 ? Math.sign(dy || 1) * (200 - Math.abs(dy)) * 0.45 : 0;
          const d = `M 0 ${y0} C ${px - 300} ${y0}, ${px - 120} ${y0 + bend}, ${px} ${y0 + bend} S ${px + 300} ${y0}, 1920 ${y0}`;
          return <path key={i} d={d} fill="none" stroke="#7FA0BE" strokeWidth={3} strokeDasharray="26 22" strokeDashoffset={-f * 3} opacity={0.75} />;
        })}
        {/* the pier */}
        <ellipse cx={px} cy={py} rx={46} ry={70} fill="#F7D9D5" stroke={C.red} strokeWidth={4} strokeDasharray="10 8" />
        {/* silt bank growing downstream */}
        <path d={`M ${px + 50} ${py} Q ${px + 300 * bank + 60} ${py - 70 * bank} ${px + 520 * bank + 60} ${py} Q ${px + 300 * bank + 60} ${py + 70 * bank} ${px + 50} ${py} Z`} fill={C.groundDeep} opacity={0.85} />
        {specks.map((p, i) => {
          const t = ((f / 120 + p.d) % 1);
          const x = px + 60 + t * 560 * Math.max(0.2, bank);
          const y = py + (p.y - 0.5) * 120 * (1 - t * 0.6);
          return <circle key={i} cx={x} cy={y} r={3} fill={C.groundDeeper} opacity={0.55 * bank} />;
        })}
        <TopShip x={shipX} y={py} scale={1.3} color={C.steel} t={f} />
        {warn > 0 && <circle cx={px + 470} cy={py} r={70 + 10 * warn} fill="none" stroke={C.red} strokeWidth={6} opacity={warn} />}
      </Layer>
      <Chip text="পলি জমবে" at={silt + 20} x={px + 330} y={py - 120} world={world} tone="red" size={28} />
      <Chip text="জাহাজের পথ" at={ship + 10} x={330} y={py + 110} world={world} size={28} />
      <Head kicker="বন্দর কর্তৃপক্ষের ভয়" text="পলি জমবে, আটকাবে [[জাহাজ]]" at={4} world={world} y={60} size={64} />
      <Sfx name="whoosh" at={ship} volume={0.2} />
      <Sfx name="tick" at={ship + 60} volume={0.25} />
    </>
  );
};

/** S15: ~457 m with nothing below: more than four football pitches end to end. */
export const S15: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const arrow = cue('চারশো সাতান্ন', -10);
  const pitches = (() => {
    try {
      return cue('চারটে ফুটবল', -6);
    } catch {
      return arrow + 90;
    }
  })();
  const x1 = 220;
  const x2 = 1700;
  const pw = ((x2 - x1) * 105) / 457;
  return (
    <>
      <Layer>
        <rect x={0} y={560} width={x1 + 10} height={520} fill={C.ground} />
        <rect x={x2 - 10} y={560} width={1920 - x2 + 10} height={520} fill={C.ground} />
        <rect x={x1} y={600} width={x2 - x1} height={480} fill={C.waterLight} />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={x1 + 60 + ((f * 1.2 + i * 300) % (x2 - x1 - 140))} y1={660 + i * 70} x2={x1 + 130 + ((f * 1.2 + i * 300) % (x2 - x1 - 140))} y2={660 + i * 70} stroke="#9FB3C6" strokeWidth={3} />
        ))}
        <DimArrow x1={x1} y1={470} x2={x2} y2={470} at={arrow} color={C.ink} />
        {[0, 1, 2, 3].map((i) => {
          const at = pitches + i * 8;
          const p = interpolate(f, [at, at + 16], [0, 1], {...clamp, easing: easeInOut});
          const x = interpolate(p, [0, 1], [x1 - 400, x1 + i * pw]);
          return <Pitch key={i} x={x} y={500} w={pw - 6} h={pw * 0.64} color="#2E7D4F" opacity={p} />;
        })}
        {f > pitches + 40 && (
          <g opacity={prog(f, pitches + 40, 12)}>
            <rect x={x1 + 4 * pw} y={500} width={x2 - x1 - 4 * pw} height={pw * 0.64} fill="url(#hatch15)" stroke={C.red} strokeWidth={3} />
          </g>
        )}
        <defs>
          <pattern id="hatch15" width={14} height={14} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1={0} y1={0} x2={0} y2={14} stroke={C.red} strokeWidth={4} opacity={0.5} />
          </pattern>
        </defs>
      </Layer>
      <Chip text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{fontFamily: FONT_NUM}}>~457</span> মিটার · নিচে কিছু নেই</span>} at={arrow + 10} x={960} y={470} world={world} tone="orange" size={30} />
      <Head text="পুরোটাই [[শূন্যে]]" at={4} world={world} y={80} size={78} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name="pop" at={pitches + i * 8} volume={0.15} />
      ))}
    </>
  );
};

const SuspensionSketch: React.FC = () => (
  <g stroke={C.steel} strokeWidth={4} fill="none" strokeLinecap="round">
    <line x1={20} y1={190} x2={460} y2={190} strokeWidth={6} />
    <line x1={130} y1={40} x2={130} y2={230} strokeWidth={7} />
    <line x1={350} y1={40} x2={350} y2={230} strokeWidth={7} />
    <path d="M 20 150 Q 75 60 130 40 Q 240 170 350 40 Q 405 60 460 150" />
    {Array.from({length: 9}, (_, i) => {
      const x = 150 + i * 22;
      const t = (x - 130) / 220;
      const y = 40 + 130 * (1 - Math.pow(2 * t - 1, 2));
      return <line key={i} x1={x} y1={y} x2={x} y2={190} strokeWidth={2} />;
    })}
  </g>
);

/** S16: suspension vs cantilever; the cursor picks the cantilever. */
export const S16: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const pick = cue('ক্যান্টিলিভার', 4);
  const chosen = pop(f, pick);
  const dim = prog(f, pick, 12);
  const card = (x: number, title: string, child: React.ReactNode, sel: number, dimK: number, at: number) => {
    const o = prog(f, at, 14);
    return (
      <div
        style={{
          position: 'absolute',
          left: x,
          top: 300,
          width: 620,
          height: 460,
          borderRadius: 24,
          ...cardBg(world),
          border: `3px solid ${sel > 0.5 ? C.orange : C.paperLine}`,
          boxShadow: sel > 0.5 ? `0 0 0 8px ${C.orange}22, 0 24px 60px rgba(200,116,26,0.25)` : '0 18px 40px rgba(30,27,46,0.1)',
          transform: `translateY(${(1 - o) * 30}px) scale(${1 + 0.05 * sel})`,
          opacity: o * (1 - 0.55 * dimK),
          filter: dimK > 0 ? `grayscale(${dimK})` : undefined,
        }}
      >
        <svg width={620} height={330} viewBox="-60 0 600 260" style={{position: 'absolute', top: 30, left: 0}}>
          {child}
        </svg>
        <div style={{position: 'absolute', bottom: 34, width: '100%', textAlign: 'center', fontFamily: FONT_BN, fontWeight: 700, fontSize: 44, color: sel > 0.5 ? C.orange : C.ink}}>{title}</div>
      </div>
    );
  };
  return (
    <>
      {card(300, 'ঝুলন্ত সেতু', <SuspensionSketch />, 0, dim, 4)}
      {card(1000, 'ক্যান্টিলিভার', <HowrahBridge x={240} y={200} s={0.76} vex={2.3} theme="paper" detail="lo" depth={false} />, f >= pick ? 1 : 0, 0, 14)}
      <Chip text="Rendel, Palmer & Tritton" at={cue('রেন্ডেল', -4)} x={960} y={250} world={world} size={28} tone="blue" />
      <Cursor
        path={[
          [0, 1700, 980],
          [pick - 16, 1330, 560],
          [pick + 40, 1340, 570],
        ]}
        clicks={[pick]}
        at={6}
      />
      <Head text="বেছে নেওয়া হলো [[ক্যান্টিলিভার]]" at={pick - 20} world={world} y={70} size={70} />
      <Sfx name="click" at={pick} volume={0.4} />
      <Sfx name="ding" at={pick + 6} volume={0.25} />
    </>
  );
};

/** S17: the experiment begins: a ruler sticking out over the table edge. */
export const S17: React.FC<SceneProps> = ({s, world}) => {
  const f = useCurrentFrame();
  const overhang = interpolate(f, [10, s.dur], [0.22, 0.38], {...clamp, easing: easeInOut});
  const edgeX = 980;
  const len = 760;
  const left = edgeX - len * (1 - overhang);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 820, y: 540, z: 1.12},
          {f: s.dur + 12, x: 900, y: 540, z: 1.2},
        ]}
      >
        <Layer>
          <RulerExperiment overhang={overhang} frame={f} />
          <PushHand x={left - 2} y={563} scale={1.1} />
        </Layer>
      </Camera>
      <Head kicker="ছোট্ট পরীক্ষা" text="টেবিল, স্কেল আর একটা [[বই]]" at={4} world={world} y={60} size={70} />
    </>
  );
};

/** S18: push further and the ruler tips over the edge. */
export const S18: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const push = cue('আরও ঠেলুন', -6);
  const fall = cue('টুপ করে', -8);
  const overhang = interpolate(f, [push, fall], [0.38, 0.56], {...clamp, easing: easeInOut});
  const tip = interpolate(f, [fall, fall + 26], [0, 1], {...clamp, easing: (t) => t * t});
  const edgeX = 980;
  const left = edgeX - 760 * (1 - overhang);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 900, y: 560, z: 1.2},
          {f: s.dur + 12, x: 980, y: 600, z: 1.1},
        ]}
      >
        <Layer>
          <RulerExperiment overhang={overhang} tip={tip} frame={f} />
          {tip === 0 && <PushHand x={left - 2} y={563} scale={1.1} />}
          {tip > 0 && <path d={`M ${edgeX + 280} 500 A 300 300 0 0 1 ${edgeX + 160} 820`} stroke={C.red} strokeWidth={6} fill="none" strokeDasharray="14 10" opacity={prog(f, fall, 8)} />}
        </Layer>
        <Chip text="বাইরের ভার > ভেতরের ভার" at={fall + 18} x={1180} y={380} world={world} tone="red" size={30} />
      </Camera>
      <Head kicker="ছোট্ট পরীক্ষা" text="বেশি বাইরে, তাই {{পড়ে}} গেল" at={4} world={world} y={60} size={68} />
      <Sfx name="tick" at={fall + 22} volume={0.35} />
      <Sfx name="thud" at={fall + 30} volume={0.3} />
    </>
  );
};

/** Mini table-edge icon used as an inset in the anatomy scenes. */
const TableInset: React.FC<{x: number; y: number; at: number; label: string; book?: boolean}> = ({x, y, at, label, book = false}) => {
  const f = useCurrentFrame();
  const o = prog(f, at, 12);
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <rect x={-130} y={-80} width={260} height={150} rx={16} fill="#fff" stroke={C.paperLine} strokeWidth={2} />
      <rect x={-110} y={0} width={130} height={16} fill="#C99B6A" />
      <rect x={-100} y={16} width={10} height={40} fill="#A87B4F" />
      <rect x={4} y={16} width={10} height={40} fill="#A87B4F" />
      <rect x={-90} y={-10} width={190} height={10} rx={2} fill="#F2C94C" />
      {book && <rect x={-86} y={-40} width={70} height={30} rx={4} fill="#2F6FB5" />}
      <path d="M 20 1 L 12 16 L 28 16 Z" fill={C.orange} />
      <text x={0} y={60} textAnchor="middle" fontFamily={FONT_BN} fontWeight={700} fontSize={22} fill={C.ink}>
        {label}
      </text>
    </g>
  );
};

/** S20: the full bridge draws in; the two towers are the table edge. */
export const S20: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(ANATOMY);
  const b = interpolate(f, [0, 40], [0, 1], {...clamp, easing: easeInOut});
  const tw = cue('টাওয়ার', -6);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 560, z: 1.06},
          {f: s.dur + 12, x: 960, y: 560, z: 1.02},
        ]}
      >
        <Layer>
          <HowrahBridge {...ANATOMY} theme="paper" site parts={{piers: 1, towers: b, anchor: b, cantilever: b, suspended: b, deck: b}} highlight={f >= tw ? 'towers' : null} hiColor={C.blue} dimOthers={0.35} />
          <TableInset x={sp.X(-G.tower) + 10} y={250} at={cue('টেবিলের কিনারা', -6)} label="টেবিলের কিনারা" />
          <line x1={sp.X(-G.tower)} y1={330} x2={sp.X(-G.tower)} y2={sp.top(G.tower) - 10} stroke={C.blue} strokeWidth={3} strokeDasharray="8 8" opacity={prog(f, cue('টেবিলের কিনারা', 0), 10)} />
        </Layer>
      </Camera>
      <Head text="দুই পাড়ে দুটো [[টাওয়ার]]" at={4} world={world} y={60} size={72} />
      <Sfx name="whoosh" at={2} volume={0.2} />
      <Sfx name="pop" at={tw} volume={0.25} />
    </>
  );
};

/** S21: anchor arms = the heavy book. */
export const S21: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(ANATOMY);
  const hi = cue('অ্যাঙ্কর আর্ম', -6);
  const book = cue('ভারী বই', -6);
  const drop = (side: number) => interpolate(f, [book + side * 6, book + side * 6 + 14], [0, 1], {...clamp, easing: (t) => t * t});
  const midA = (G.tower + G.anchorEnd) / 2;
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 560, z: 1.04},
          {f: 200, x: 960, y: 560, z: 1.08},
        ]}
      >
        <Layer>
          <HowrahBridge {...ANATOMY} theme="paper" site highlight={f >= hi ? 'anchor' : null} hiColor={C.blue} dimOthers={0.32} />
          {[-1, 1].map((side, k) => {
            const bx = sp.X(side * midA);
            const by = sp.top(midA);
            const d = drop(k);
            return (
              <g key={side}>
                <DimArrow x1={sp.X(side * G.tower)} y1={ANATOMY.y + 60} x2={sp.X(side * G.anchorEnd)} y2={ANATOMY.y + 60} at={hi + 6} color={C.blue} />
                {d > 0 && (
                  <g transform={`translate(${bx - 60} ${by - 44 - (1 - d) * 320}) rotate(${side * 14} 60 44)`}>
                    <BookIcon w={120} h={44} />
                  </g>
                )}
              </g>
            );
          })}
        </Layer>
        <Chip text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{fontFamily: FONT_NUM}}>~99</span> মি</span>} at={hi + 14} x={sp.X(-midA)} y={ANATOMY.y + 60} world={world} tone="blue" size={26} />
        <Chip text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{fontFamily: FONT_NUM}}>~99</span> মি</span>} at={hi + 18} x={sp.X(midA)} y={ANATOMY.y + 60} world={world} tone="blue" size={26} />
      </Camera>
      <Head kicker="পেছনের ভার" text="অ্যাঙ্কর আর্ম = সেই [[ভারী বই]]" at={hi - 10} world={world} y={60} size={66} />
      <Sfx name="thud" at={book + 14} volume={0.3} />
      <Sfx name="thud" at={book + 20} volume={0.25} />
    </>
  );
};

/** S22: cantilever arms reach out over the water with nothing below. */
export const S22: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(ANATOMY);
  const hi = cue('ক্যান্টিলিভার আর্ম', -6);
  const nothing = cue('নিচে কিছু নেই', -6);
  const midC = (G.tower + G.tip) / 2;
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 560, z: 1.04},
          {f: 220, x: 960, y: 580, z: 1.1},
        ]}
      >
        <Layer>
          <HowrahBridge {...ANATOMY} theme="paper" site highlight={f >= hi ? 'cantilever' : null} dimOthers={0.32} />
          {[-1, 1].map((side) => (
            <g key={side}>
              <DimArrow x1={sp.X(side * G.tower)} y1={sp.top(G.tower) - 40} x2={sp.X(side * G.tip)} y2={sp.top(G.tower) - 40} at={hi + 8} color={C.orange} />
              <g opacity={prog(f, nothing, 12)}>
                <line x1={sp.X(side * G.tip)} y1={ANATOMY.y + 4} x2={sp.X(side * G.tip)} y2={ANATOMY.y + 120} stroke={C.red} strokeWidth={4} strokeDasharray="10 8" />
                <g transform={`translate(${sp.X(side * G.tip)} ${ANATOMY.y + 140})`} stroke={C.red} strokeWidth={6} strokeLinecap="round">
                  <line x1={-14} y1={-14} x2={14} y2={14} />
                  <line x1={14} y1={-14} x2={-14} y2={14} />
                </g>
              </g>
            </g>
          ))}
        </Layer>
        <Chip text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{fontFamily: FONT_NUM}}>~143</span> মি</span>} at={hi + 16} x={sp.X(-midC)} y={sp.top(G.tower) - 40} world={world} tone="orange" size={26} />
        <Chip text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{fontFamily: FONT_NUM}}>~143</span> মি</span>} at={hi + 20} x={sp.X(midC)} y={sp.top(G.tower) - 40} world={world} tone="orange" size={26} />
      </Camera>
      <Head kicker="শূন্যে বাড়ানো হাত" text="[[ক্যান্টিলিভার]] আর্ম" at={hi - 10} world={world} y={60} size={70} />
      <Sfx name="whoosh" at={hi} volume={0.2} />
    </>
  );
};
