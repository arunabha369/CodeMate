import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Check} from 'lucide-react';
import {Camera, SceneProps, Sfx} from '../kit';
import {C, FONT_NUM} from '../theme';
import {clamp, easeInOut, pop} from '../anim';
import {Chip, Head} from '../ui/text';
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

