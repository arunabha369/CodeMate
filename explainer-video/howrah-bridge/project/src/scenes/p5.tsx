import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Camera, SceneProps, Sfx} from '../kit';
import {FONT_NUM} from '../theme';
import {stepFrames, stepped} from '../anim';
import {Chip, Head} from '../ui/text';
import {Layer} from '../ui/svg';
import {bridgeSpace, G, HowrahBridge, PANELS} from '../hero/HowrahBridge';

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
