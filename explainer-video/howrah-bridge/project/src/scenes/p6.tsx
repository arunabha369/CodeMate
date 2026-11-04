import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Camera, SceneProps, Sfx} from '../kit';
import {C, FONT_NUM} from '../theme';
import {clamp, easeInOut, pop, prog, rng, stepFrames, stepped} from '../anim';
import {Chip, Head, Headline} from '../ui/text';
import {Calendar} from '../ui/cards';
import {Layer} from '../ui/svg';
import {BigNum, Bracket} from '../ui/extra';
import {ChapterIntro, chapterReveal, Jack} from '../ui/story';
import {bridgeSpace, G, HowrahBridge, PANELS_LO} from '../hero/HowrahBridge';
import {HOOK_BRIDGE} from './p0';
import {ANATOMY} from './p2';

/** S49: chapter 6: back to the opening shot, the arms now complete. */
export const S49: React.FC<SceneProps> = ({s, world}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(HOOK_BRIDGE);
  const ghost = interpolate(f, [40, 56, 110, 130], [0, 0.4, 0.4, 0], clamp);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 540, z: 1.0},
          {f: s.dur + 12, x: 960, y: 520, z: 1.12},
        ]}
      >
        <div style={{position: 'absolute', inset: 0, opacity: chapterReveal(f)}}>
          <Layer>
            <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{suspended: 0, lights: 0.3}} gapGlow={1} reflection />
            <Bracket x1={sp.X(-G.tip) + 6} x2={sp.X(G.tip) - 6} y={sp.top(G.tip) - 60} at={30} color={C.amber} label="?" labelColor={C.ink} />
          </Layer>
        </div>
      </Camera>
      <div style={{position: 'absolute', inset: 0, opacity: ghost}}>
        <Headline text="দুই পাড়ের দুটো হাত — মিলবে তো?" at={-20} world={world} y={860} size={48} />
      </div>
      <ChapterIntro n="৬" title="মাঝখানে [[মিলন]]" world={world} />
      <Sfx name="whoosh" at={2} volume={0.2} />
    </>
  );
};

/** S50: the suspended span is built out in two halves from both tips. */
export const S50: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(ANATOMY);
  const N = PANELS_LO.suspended;
  const susp = stepped(f, 8, 26, 10, 0, N * 0.92) / N;
  const chips = cue('ছিয়াশি', -10);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 560, z: 1.25},
          {f: s.dur + 12, x: 960, y: 560, z: 1.35},
        ]}
      >
        <Layer>
          <HowrahBridge {...ANATOMY} theme="paper" site parts={{suspended: susp}} cranes highlight="suspended" dimOthers={0.55} />
        </Layer>
        {[-1, 1].map((side) => (
          <Chip
            key={side}
            text={
              <span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}>
                <span style={{fontFamily: FONT_NUM}}>~86</span> মি · <span style={{fontFamily: FONT_NUM}}>~2,000</span> টন
              </span>
            }
            at={chips + (side + 1) * 4}
            x={sp.X(side * 50)}
            y={ANATOMY.y + 60}
            world={world}
            tone="orange"
            size={24}
          />
        ))}
      </Camera>
      <Head text="মাঝের অংশ [[দুই ভাগে]]" at={4} world={world} y={60} size={72} />
      {stepFrames(34, 26, 6).map((t) => (
        <Sfx key={t} name="clank" at={t} volume={0.12} />
      ))}
    </>
  );
};

/** S51: sixteen hydraulic jacks of 800 t each push the two halves together. */
export const S51: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const jacksAt = cue('ষোলোটা', -10);
  const B = {x: 960, y: 820, s: 9, vex: 1.4};
  const sp = bridgeSpace(B);
  const close = interpolate(f, [jacksAt, s.dur], [0.9, 0.97], clamp);
  return (
    <>
      <Layer>
        <HowrahBridge {...B} theme="paper" parts={{suspended: close}} depth={false} detail="hi" rivets />
        {Array.from({length: 16}, (_, i) => {
          const side = i < 8 ? -1 : 1;
          const k = i % 8;
          const x = 960 + side * (50 + k * 34);
          const at = jacksAt + 8 + i * 3;
          const ext = 0.5 + 0.5 * Math.sin((f - at) / 6);
          return (
            <g key={i} opacity={prog(f, at, 8)}>
              <Jack x={x} y={sp.Y(-7)} ext={f > at ? ext : 0} scale={0.85} color={C.steel} />
            </g>
          );
        })}
        {[-1, 1].map((side) => (
          <g key={side} opacity={prog(f, jacksAt + 30, 10)} transform={`translate(${960 + side * 260} ${sp.Y(10)})`}>
            <line x1={side * 80} y1={0} x2={side * 10} y2={0} stroke={C.orange} strokeWidth={10} strokeLinecap="round" />
            <path d={`M ${side * 10} -18 L ${side * -16} 0 L ${side * 10} 18 Z`} fill={C.orange} />
          </g>
        ))}
      </Layer>
      <div style={{position: 'absolute', left: 960, top: 300, transform: `translate(-50%, -50%) scale(${pop(f, jacksAt + 20)})`, opacity: prog(f, jacksAt + 20, 8), padding: '16px 36px', borderRadius: 20, background: '#fff', border: `3px solid ${C.orange}`, boxShadow: '0 18px 40px rgba(200,116,26,0.25)'}}>
        <span style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: 72, color: C.orange}}>16 × 800</span>
        <span style={{fontFamily: 'Hind Siliguri', fontWeight: 700, fontSize: 36, color: C.ink, marginLeft: 12}}>টন</span>
      </div>
      <Head text="ষোলোটা [[হাইড্রলিক জ্যাক]]" at={4} world={world} y={60} size={72} />
      {Array.from({length: 16}, (_, i) => (
        <Sfx key={i} name="tick" at={jacksAt + 8 + i * 3} volume={0.08} />
      ))}
    </>
  );
};

/** S52: the gap closes to zero: one clank, one soft bloom, sparks. */
export const S52: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const meet = cue('অবশেষে মিলল', -6);
  const sp = bridgeSpace(HOOK_BRIDGE);
  const susp = interpolate(f, [0, meet], [0.9, 1], {...clamp, easing: easeInOut});
  const bloom = interpolate(f, [meet, meet + 4, meet + 30], [0, 0.55, 0], clamp);
  const gapW = (1 - susp) * G.tip * 2 * HOOK_BRIDGE.s;
  const r = rng(11);
  const sparks = Array.from({length: 26}, () => ({a: r() * Math.PI * 2, v: 4 + r() * 9}));
  const cy = sp.top(0) + 20;
  const zero = f >= meet;
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: cy, z: 2.8},
          {f: meet, x: 960, y: cy, z: 3.1},
          {f: s.dur + 12, x: 960, y: cy, z: 2.9},
        ]}
      >
        <Layer>
          <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{lights: 0.4, suspended: susp}} reflection />
          {!zero && <rect x={960 - gapW / 2} y={cy - 40} width={gapW} height={80} fill={C.amber} opacity={0.25} />}
          {zero &&
            f < meet + 30 &&
            sparks.map((p, i) => {
              const t = f - meet;
              return <circle key={i} cx={960 + Math.cos(p.a) * p.v * t * 0.6} cy={cy + Math.sin(p.a) * p.v * t * 0.6 + t * t * 0.03} r={1.6} fill={C.amber} opacity={1 - t / 30} />;
            })}
        </Layer>
      </Camera>
      <div style={{position: 'absolute', inset: 0, background: '#FFF3D6', opacity: bloom, pointerEvents: 'none'}} />
      <BigNum value={zero ? '0' : '…'} unit={zero ? 'ফাঁক' : 'ফাঁক কমছে'} x={960} y={300} at={6} world={world} size={zero ? 150 : 80} color={zero ? C.amber : '#fff'} />
      <Calendar month="ডিসেম্বর" year="1941" at={meet + 20} x={1600} y={300} scale={0.7} />
      <Head text="ফাঁক — [[শূন্য]]" at={meet - 4} world={world} y={60} size={78} />
      <Sfx name="clank" at={meet} volume={0.6} />
      <Sfx name="rumble" at={meet + 2} volume={0.3} />
    </>
  );
};

/** S53: a long pull-back reveals the complete steel structure over the river. */
export const S53: React.FC<SceneProps> = ({s, world}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(HOOK_BRIDGE);
  const cy = sp.top(0) + 20;
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: cy, z: 3.0},
          {f: Math.round(s.dur * 0.7), x: 960, y: 540, z: 1.0},
          {f: s.dur + 12, x: 960, y: 540, z: 0.98},
        ]}
      >
        <Layer>
          <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{lights: 0.4}} reflection />
        </Layer>
      </Camera>
      <Head text="এক পাড় থেকে আরেক পাড়, [[একটানা]]" at={Math.round(s.dur * 0.45)} world={world} y={70} size={68} />
      <Sfx name="whoosh" at={6} volume={0.25} />
    </>
  );
};
