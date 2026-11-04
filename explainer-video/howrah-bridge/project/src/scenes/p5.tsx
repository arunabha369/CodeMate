import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Camera, SceneProps, Sfx} from '../kit';
import {C, FONT_BN, FONT_NUM} from '../theme';
import {clamp, easeInOut, pop, prog, stepFrames, stepped} from '../anim';
import {Chip, Head} from '../ui/text';
import {Calendar} from '../ui/cards';
import {DimArrow, Layer} from '../ui/svg';
import {Bracket, BigNum} from '../ui/extra';
import {ChapterIntro, chapterReveal, Lens, QuestionCard} from '../ui/story';
import {RulerExperiment} from '../ui/ruler';
import {bridgeSpace, G, HowrahBridge, PANELS, PANELS_LO} from '../hero/HowrahBridge';
import {HOOK_BRIDGE} from './p0';
import {ANATOMY} from './p2';

export const FLY = {x: 760, y: 760, s: 4.2, vex: 1.35};

/** S44: camera flies along the top chord while the creeper crane sets panel after panel. */
export const S44: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(FLY);
  const N = PANELS.cantilever;
  const every = 48;
  const panels = stepped(f, 6, every, 14, 9.6, 14.2);
  const cant = panels / N;
  const tipM = G.tower - 143 * cant;
  // camera: start over the tower, glide out along the arm and follow the crane at the open edge
  const camY = (m: number) => sp.top(m) + 40;
  const z = 2.1;
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: sp.X(G.tower - 10), y: camY(G.tower - 10) + 60, z: z * 0.92},
          {f: Math.round(s.dur * 0.55), x: sp.X(tipM + 30), y: camY(tipM + 30), z},
          {f: s.dur + 12, x: sp.X(G.tower - 143 * (14.2 / N) + 20), y: camY(G.tower - 143 * (14.2 / N) + 20) + 10, z: z * 1.04},
        ]}
      >
        <Layer>
          <HowrahBridge {...FLY} theme="paper" site parts={{cantilever: cant, suspended: 0}} cranes rivets only={1} />
        </Layer>
      </Camera>
      <Chip text="ক্রিপার ক্রেন" at={cue('ক্রিপার', -6)} x={1340} y={300} world={world} tone="orange" size={32} />
      <Chip
        text={
          <span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}>
            প্যানেল <span style={{fontFamily: FONT_NUM}}>{Math.min(N, Math.floor(panels + 0.05))}</span>/<span style={{fontFamily: FONT_NUM}}>{N}</span>
          </span>
        }
        at={10}
        x={300}
        y={300}
        world={world}
        size={28}
      />
      <Head text="ক্রেন নিজেই [[এগিয়ে]] চলে" at={4} world={world} y={60} size={68} />
      {stepFrames(6 + every, every, 5).map((t) => (
        <Sfx key={t} name="clank" at={t} volume={0.2} />
      ))}
    </>
  );
};

/** S41: chapter 5: only the foundations exist; how do you join steel in mid-air? */
export const S41: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const q = cue('তাহলে শূন্যে', -12);
  const glow = 0.5 + 0.5 * Math.sin(f / 14);
  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: chapterReveal(f)}}>
        <Layer>
          <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{towers: 0, anchor: 0, cantilever: 0, suspended: 0, deck: 0, piers: 1}} reflection depth={false} />
          {[-1, 1].map((side) => (
            <ellipse key={side} cx={HOOK_BRIDGE.x + side * G.tower * HOOK_BRIDGE.s} cy={HOOK_BRIDGE.y + 30} rx={70} ry={26} fill={C.amber} opacity={0.18 + 0.12 * glow} />
          ))}
          <Bracket x1={HOOK_BRIDGE.x - G.tower * HOOK_BRIDGE.s + 60} x2={HOOK_BRIDGE.x + G.tower * HOOK_BRIDGE.s - 60} y={HOOK_BRIDGE.y - 30} at={20} color={C.amber} label="?" labelColor={C.ink} />
        </Layer>
      </div>
      <QuestionCard text="নিচে ঠেকনা নেই — তাহলে?" at={q} x={960} y={320} world={world} />
      <ChapterIntro n="৫" title="শূন্যে [[লোহা]] জোড়া" world={world} />
      <Sfx name="whoosh" at={2} volume={0.2} />
      <Sfx name="pop" at={q} volume={0.25} />
    </>
  );
};

/** S42: erection starts on land: anchor arms panel by panel, then the towers rise. */
export const S42: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(ANATOMY);
  const NA = PANELS_LO.anchor;
  const anchor = stepped(f, 4, 14, 8, 0, NA) / NA;
  const tw = cue('টাওয়ার', -10);
  const towers = interpolate(f, [Math.min(tw, 4 + 14 * NA), Math.min(tw, 4 + 14 * NA) + 50], [0.12, 1], {...clamp, easing: easeInOut});
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 560, z: 1.05},
          {f: s.dur + 12, x: 960, y: 540, z: 1.0},
        ]}
      >
        <Layer>
          <HowrahBridge {...ANATOMY} theme="paper" site parts={{anchor, towers, cantilever: 0, suspended: 0, deck: 0.29}} cranes highlight={['anchor', 'towers']} dimOthers={1} hiColor={C.blue} />
          <DimArrow x1={sp.X(G.tower) + 50} y1={ANATOMY.y} x2={sp.X(G.tower) + 50} y2={sp.Y(G.T)} at={tw + 50} color={C.ink} />
        </Layer>
        <Chip text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{fontFamily: FONT_NUM}}>~82</span> মি</span>} at={tw + 60} x={sp.X(G.tower) + 140} y={(ANATOMY.y + sp.Y(G.T)) / 2} world={world} size={28} />
      </Camera>
      <Head kicker="নির্মাণ শুরু" text="শুরু [[ডাঙা]] থেকে" at={4} world={world} y={60} size={72} />
      {stepFrames(18, 14, NA).map((t) => (
        <Sfx key={t} name="clank" at={t} volume={0.08} />
      ))}
    </>
  );
};

/** S43: the cantilever arms start out over the river, each panel hanging off the one before. */
export const S43: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const N = PANELS.cantilever;
  const every = 30;
  const panels = stepped(f, 4, every, 10, 0, 8);
  const magic = cue('জাদু', -6);
  return (
    <>
      <Layer>
        <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{cantilever: panels / N, suspended: 0, lights: 0.2}} cranes reflection />
      </Layer>
      <Chip text="প্রতিটা প্যানেল ঝোলে আগেরটা ধরে" at={magic} x={960} y={330} world={world} tone="orange" size={32} />
      <Head text="নদীর দিকে [[এক পা]], এক পা" at={4} world={world} y={70} size={72} />
      {stepFrames(4 + every, every, 7).map((t) => (
        <Sfx key={t} name="clank" at={t} volume={0.14} />
      ))}
    </>
  );
};

/** S45: the further the arm reaches, the harder the anchor arm holds it back (with the ruler-and-book inset). */
export const S45: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const B = {x: 260, y: 760, s: 3.3, vex: 1.4};
  const sp = bridgeSpace(B);
  const grow = interpolate(f, [6, s.dur - 20], [0.45, 0.92], clamp);
  const hold = cue('টেনে ধরে', -8);
  const holdK = prog(f, hold, 16);
  const tipM = G.tower - 143 * grow;
  const tq = 0.4 + 0.6 * grow;
  return (
    <>
      <Layer>
        <HowrahBridge {...B} theme="paper" site parts={{cantilever: grow, suspended: 0}} only={1} cranes highlight={f >= hold ? 'anchor' : null} hiColor={C.blue} dimOthers={1} />
        {/* weight at the tip pulling down */}
        <g transform={`translate(${sp.X(tipM)} ${sp.top(tipM) + 20})`}>
          <line x1={0} y1={0} x2={0} y2={60 + 90 * tq} stroke={C.red} strokeWidth={10} strokeLinecap="round" />
          <path d={`M -22 ${50 + 90 * tq} L 0 ${84 + 90 * tq} L 22 ${50 + 90 * tq} Z`} fill={C.red} />
        </g>
        {/* the anchor arm pulling back */}
        <g opacity={holdK} transform={`translate(${sp.X(G.anchorEnd - 10)} ${B.y - 10})`}>
          <line x1={0} y1={0} x2={0} y2={-150 * tq} stroke={C.blue} strokeWidth={10} strokeLinecap="round" />
          <path d={`M -22 ${-130 * tq} L 0 ${-164 * tq} L 22 ${-130 * tq} Z`} fill={C.blue} />
        </g>
      </Layer>
      {/* inset: the same balance on the table */}
      <div style={{position: 'absolute', left: 80, top: 250, width: 560, height: 330, borderRadius: 18, background: '#fff', border: `2px solid ${C.paperLine}`, overflow: 'hidden', boxShadow: '0 16px 40px rgba(30,27,46,0.12)', opacity: prog(f, 10, 12)}}>
        <svg width={560} height={330} viewBox="120 300 1000 590">
          <RulerExperiment overhang={0.3 + 0.3 * grow} book={1} frame={f} showFulcrum={1} />
        </svg>
        <div style={{position: 'absolute', left: 16, top: 12, fontFamily: FONT_BN, fontWeight: 700, fontSize: 24, color: C.inkSoft}}>সেই বইয়ের মতো</div>
      </div>
      <Head kicker="ভারসাম্য" text="পেছন থেকে টেনে রাখে [[অ্যাঙ্কর আর্ম]]" at={4} world={world} y={60} size={62} />
    </>
  );
};

/** S46: end of 1940 → summer 1941: both cantilever arms built. */
export const S46: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const c1 = cue('উনিশশো চল্লিশের', -8);
  const c2 = cue('উনিশশো একচল্লিশের', -8);
  const grow = interpolate(f, [c1 + 10, c2 + 20], [0, 1], {...clamp, easing: easeInOut});
  return (
    <>
      <Layer>
        <HowrahBridge x={960} y={760} s={1.9} vex={1.6} theme="paper" site parts={{cantilever: grow, suspended: 0}} cranes depth={false} />
      </Layer>
      <Calendar month="শুরু" year="1940" at={c1} x={330} y={360} scale={0.75} />
      <Chip text="বছরের শেষে" at={c1 + 8} x={330} y={520} world={world} size={26} />
      <Calendar month="শেষ" year="1941" at={c2} x={1590} y={360} scale={0.75} />
      <Chip text="গ্রীষ্মে" at={c2 + 8} x={1590} y={520} world={world} size={26} tone="orange" />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <line x1={480} y1={360} x2={480 + 960 * grow} y2={360} stroke={C.orange} strokeWidth={6} strokeDasharray="14 10" opacity={prog(f, c1, 10)} />
      </svg>
      <Head text="দুই হাত তৈরি — [[1941]]-এর গ্রীষ্মে" at={4} world={world} y={70} size={66} />
      <Sfx name="pop" at={c1} volume={0.25} />
      <Sfx name="ding" at={c2} volume={0.25} />
    </>
  );
};

/** S47: riveting in a magnifier: hot rivet in, three blows, it cools and grips. */
export const S47: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const B = {x: 560, y: 820, s: 3.0, vex: 1.4};
  const sp = bridgeSpace(B);
  const start = cue('গনগনে', -10);
  const slide = interpolate(f, [start, start + 18], [0, 1], {...clamp, easing: easeInOut});
  const hits = [start + 26, start + 40, start + 54];
  const head = interpolate(f, [hits[0], hits[2] + 6], [0, 1], clamp);
  const cool = interpolate(f, [hits[2], hits[2] + 60], [0, 1], clamp);
  const hammerY = hits.reduce((acc, h) => (f >= h - 8 && f < h + 6 ? Math.abs(f - h) : acc), 99);
  const hy = hammerY === 99 ? -60 : -60 + (8 - Math.min(8, hammerY)) * 7;
  const hot = `rgb(${Math.round(240 - 150 * cool)}, ${Math.round(110 - 20 * cool)}, ${Math.round(40 + 60 * cool)})`;
  const jx = sp.X(G.tower - 40);
  const jy = sp.top(G.tower - 40);
  return (
    <>
      <Layer>
        <g opacity={0.45}>
          <HowrahBridge {...B} theme="paper" only={1} site depth={false} rivets />
        </g>
        <line x1={jx} y1={jy} x2={1180} y2={560} stroke={C.ink} strokeWidth={3} strokeDasharray="10 8" opacity={prog(f, 6, 10)} />
        <circle cx={jx} cy={jy} r={16} fill="none" stroke={C.orange} strokeWidth={5} opacity={prog(f, 4, 10)} />
        <Lens x={1340} y={560} r={300} at={6} id="rivet">
          {/* two plates with a hole */}
          <rect x={-260} y={-90} width={520} height={70} fill={C.steelLight} />
          <rect x={-260} y={-20} width={520} height={70} fill={C.steel} />
          <rect x={-22} y={-90} width={44} height={140} fill="#FBF8F1" />
          {/* rivet: shank + factory head; slides in from above */}
          <g transform={`translate(0 ${(1 - slide) * -220})`}>
            <rect x={-20} y={-90} width={40} height={150} rx={6} fill={hot} />
            <path d="M -48 -90 Q 0 -150 48 -90 Z" fill={hot} />
            {cool < 0.6 && <circle cx={0} cy={-40} r={70} fill={C.amber} opacity={0.25 * (1 - cool)} />}
          </g>
          {/* the formed head at the bottom */}
          {slide >= 1 && <path d={`M -48 50 Q 0 ${50 + 60 * head} 48 50 Z`} fill={hot} />}
          {/* plates pulled tight */}
          {cool > 0.4 &&
            [-1, 1].map((sd) => (
              <path key={sd} d={`M ${sd * 200} ${sd > 0 ? -110 : 70} l 0 ${sd > 0 ? 20 : -20} l -10 0 l 10 ${sd > 0 ? 14 : -14} l 10 ${sd > 0 ? -14 : 14} l -10 0 Z`} fill={C.green} opacity={prog(f, hits[2] + 30, 10)} />
            ))}
          {/* hammer from below (the bucking side) */}
          <g transform={`translate(0 ${170 + hy * -1})`} opacity={f > start + 18 && f < hits[2] + 16 ? 1 : 0}>
            <rect x={-60} y={0} width={120} height={46} rx={8} fill={C.ink} />
            <rect x={-12} y={46} width={24} height={140} fill="#8A5A2B" />
          </g>
        </Lens>
      </Layer>
      <Chip text="নাট-বোল্ট নেই, সব রিভেট" at={8} x={420} y={300} world={world} tone="orange" size={30} />
      <Chip text="ঠান্ডা হলে শক্ত কামড়" at={hits[2] + 30} x={1340} y={940} world={world} tone="green" size={28} />
      <Head text="নাট-বোল্ট নয়, [[রিভেট]]" at={4} world={world} y={60} size={72} />
      {hits.map((h) => (
        <Sfx key={h} name="hammer" at={h} volume={0.4} />
      ))}
    </>
  );
};

/** S48: both arms complete: a ~172 m gap left for the suspended span. */
export const S48: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(HOOK_BRIDGE);
  const gapAt = cue('একশো বাহাত্তর', -14);
  const tipY = sp.top(G.tip);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 520, z: 1.0},
          {f: 260, x: 960, y: 500, z: 1.1},
        ]}
      >
        <Layer>
          <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{suspended: 0, lights: 0.3}} gapGlow={1} reflection />
          <Bracket x1={sp.X(-G.tip) + 6} x2={sp.X(G.tip) - 6} y={tipY - 50} at={gapAt} color={C.amber} />
        </Layer>
      </Camera>
      <BigNum value="~172" unit="মিটার ফাঁক" x={960} y={330} at={gapAt + 6} world={world} size={110} color={C.amber} />
      <Head text="মাঝে এখনও [[ফাঁক]]" at={4} world={world} y={70} size={72} />
      <Sfx name="pop" at={gapAt + 6} volume={0.3} />
    </>
  );
};
