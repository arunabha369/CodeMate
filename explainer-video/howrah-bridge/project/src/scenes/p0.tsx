import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Camera, SceneProps, Sfx} from '../kit';
import {C} from '../theme';
import {stepFrames, stepped} from '../anim';
import {Headline, Kicker} from '../ui/text';
import {Layer} from '../ui/svg';
import {Bracket} from '../ui/extra';
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
