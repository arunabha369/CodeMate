import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {MoveHorizontal, Weight} from 'lucide-react';
import {Camera, SceneProps, Sfx} from '../kit';
import {C} from '../theme';
import {clamp, prog, stepFrames, stepped} from '../anim';
import {Head, Headline, Kicker, TitleCard} from '../ui/text';
import {StatCard} from '../ui/cards';
import {DimArrow, Layer} from '../ui/svg';
import {Bracket, PhotoCard} from '../ui/extra';
import {Portal, Stamp} from '../ui/story';
import {bridgeSpace, G, HowrahBridge} from '../hero/HowrahBridge';

/** Hook framing, reused by S49 (chapter 6) and S63 (bookend) so the film closes the loop on the same shot. */
export const HOOK_BRIDGE = {x: 960, y: 600, s: 3.3, vex: 1.35};

export const S01: React.FC<SceneProps> = ({s}) => {
  const f = useCurrentFrame();
  const N = 14;
  // the arms creep toward each other from frame 0: one new panel lands every 34 frames
  const every = 34;
  const panels = stepped(f, -8, every, 12, 9, 13.4);
  const cant = panels / N;
  const sp = bridgeSpace(HOOK_BRIDGE);
  const tipM = G.tower - 143 * cant;
  const tipY = sp.top(tipM);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 540, z: 1},
          {f: s.dur + 12, x: 960, y: 520, z: 1.08},
        ]}
      >
        <Layer>
          <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{cantilever: cant, suspended: 0, lights: 0.25}} cranes gapGlow={1} reflection />
          <Bracket x1={sp.X(-tipM) + 18} x2={sp.X(tipM) - 18} y={tipY - 70} at={30} color={C.amber} label="?" labelColor={C.ink} />
        </Layer>
      </Camera>
      <Kicker text="গঙ্গার ঠিক মাঝখানে" at={4} world="night" y={70} />
      <Headline text="দুই পাড়ের দুটো হাত — [[মিলবে]] তো?" at={16} world="night" y={110} size={76} />
      {stepFrames(-8 + every, every, 5).map((t) => (
        <Sfx key={t} name="clank" at={t} volume={0.16} />
      ))}
    </>
  );
};

/** S02: push into the gap; a red ghost shows what a miss would look like. */
export const S02: React.FC<SceneProps> = ({s, cue}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(HOOK_BRIDGE);
  const cant = 13.4 / 14;
  const tipM = G.tower - 143 * cant;
  const miss = cue('একটুও না মেলে', -4);
  const ghost = interpolate(f, [miss, miss + 10, miss + 46, miss + 56], [0, 1, 1, 0], clamp);
  const shake = ghost > 0.5 ? Math.sin(f * 2.2) * 6 * (1 - prog(f, miss + 20, 20)) : 0;
  const fail = cue('সব বৃথা', -2);
  const dim = interpolate(f, [fail, fail + 12], [1, 0.4], clamp);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 520, z: 1.08},
          {f: Math.round(s.dur * 0.6), x: 960, y: sp.top(tipM) + 20, z: 2.1},
          {f: s.dur + 12, x: 960, y: sp.top(tipM) + 20, z: 2.25},
        ]}
      >
        <Layer>
          <g opacity={dim}>
            <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{cantilever: cant, suspended: 0, lights: 0.25}} cranes gapGlow={1} reflection />
          </g>
          <g opacity={ghost * 0.85} transform={`translate(${shake} 26)`}>
            <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{cantilever: cant, suspended: 0, anchor: 0, towers: 0, piers: 0, deck: 0}} color={C.red} only={1} depth={false} />
          </g>
          {ghost > 0.3 && (
            <g opacity={ghost} stroke={C.red} strokeWidth={8} strokeLinecap="round">
              <line x1={sp.X(tipM) - 40} y1={sp.top(tipM) - 40} x2={sp.X(tipM) - 4} y2={sp.top(tipM) - 4} />
              <line x1={sp.X(tipM) - 4} y1={sp.top(tipM) - 40} x2={sp.X(tipM) - 40} y2={sp.top(tipM) - 4} />
            </g>
          )}
        </Layer>
      </Camera>
      <Headline text="একচুল {{ভুল}} হলেই সব শেষ" at={6} world="night" y={90} size={76} />
      <Sfx name="whoosh" at={4} volume={0.2} />
      <Sfx name="thud" at={miss + 4} volume={0.35} />
      <Sfx name="rumble" at={fail} volume={0.2} />
    </>
  );
};

/** S03: pull back to the whole bridge; two stat cards count up. */
export const S03: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(HOOK_BRIDGE);
  const a = cue('ছাব্বিশ', -8);
  const b = cue('চারশো', -8);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 500, z: 1.5},
          {f: 40, x: 960, y: 540, z: 1.0},
          {f: s.dur + 12, x: 960, y: 540, z: 1.03},
        ]}
      >
        <Layer>
          <HowrahBridge {...HOOK_BRIDGE} theme="night" reflection />
          <DimArrow x1={sp.X(-G.tower)} y1={HOOK_BRIDGE.y + 90} x2={sp.X(G.tower)} y2={HOOK_BRIDGE.y + 90} at={b + 6} color={C.amber} />
        </Layer>
      </Camera>
      <StatCard icon={<Weight size={36} />} value={26500} unit="টন" label="ইস্পাত" at={a} x={250} y={120} world={world} dur={45} />
      <StatCard icon={<MoveHorizontal size={36} />} value={457} prefix="~" unit="মিটার" label="নদীতে একটাও খুঁটি নেই" at={b} x={1080} y={120} world={world} dur={40} />
      <Sfx name="pop" at={a} volume={0.3} />
      <Sfx name="pop" at={b} volume={0.3} />
    </>
  );
};

/** S04: title over the finished, lit bridge (or the real dusk photo when cleared). */
export const S04: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const photoOut = Math.round(s.dur * 0.6);
  const photoO = interpolate(f, [photoOut, photoOut + 20], [1, 0], clamp);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 520, z: 1.0},
          {f: s.dur + 12, x: 960, y: 500, z: 1.07},
        ]}
      >
        <Layer>
          <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{lights: 1}} traffic reflection />
        </Layer>
      </Camera>
      <div style={{position: 'absolute', inset: 0, opacity: photoO}}>
        <PhotoCard slot="P01" x={260} y={150} w={1400} h={640} at={0} grade="night" dur={photoOut} rot={-1} />
      </div>
      <TitleCard text="হাওড়া ব্রিজ কীভাবে [[তৈরি]] হলো" at={cue('আজ দেখব', -16)} world={world} y={700} />
      <Kicker text="এক লোহার দানবের জন্মকথা" at={4} world={world} y={70} />
      <Sfx name="whoosh" at={cue('আজ দেখব', -16)} volume={0.3} />
    </>
  );
};

/** S05: the open loop: a ribbon nobody cut. */
export const S05: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const why = cue('কেন?', -2);
  return (
    <>
      <Layer>
        <g transform="translate(96 210) scale(0.9)">
          <Portal frame={f} ribbon={1} scissors={0.95} />
        </g>
      </Layer>
      <Stamp text="?" x={960} y={560} at={why} size={150} rot={-8} />
      <Head kicker="একটা রহস্য" text="ফিতে কাটল {{না}} কেউ" at={4} world={world} y={40} size={72} />
      <Sfx name="thud" at={why} volume={0.45} />
    </>
  );
};
