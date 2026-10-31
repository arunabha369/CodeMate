import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ArrowDown} from 'lucide-react';
import {Camera, SceneProps, Sfx} from '../kit';
import {C, FONT_BN} from '../theme';
import {prog, stepFrames, stepped} from '../anim';
import {Chip, Head} from '../ui/text';
import {Layer} from '../ui/svg';
import {CaissonSection, DepthRuler, STRATA} from '../ui/caisson';
import {Person} from '../ui/svg';

const GROUND = 380;
const BOTTOM = 1040;

/** S27: dig inside the shafts → the box settles under its own weight, one step per cycle. */
export const S27: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const start = cue('খুঁড়ে', -10);
  const every = 80;
  const steps = stepped(f, start, every, 18, 0, 4);
  const sink = steps * 34;
  const arrowsAt = cue('নিজের ভারেই', -8);
  const arrowsO = prog(f, arrowsAt, 12);
  const bob = (Math.sin(f / 6) * 0.5 + 0.5) * 8;
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 900, y: 600, z: 1.0},
          {f: s.dur + 12, x: 900, y: 640, z: 1.05},
        ]}
      >
        <Layer>
          <CaissonSection frame={f} groundY={GROUND} bottomY={BOTTOM} cx={880} w={640} h={260} sink={sink} />
          {/* tiny anonymous workers on the top deck */}
          {[0, 1, 2].map((i) => (
            <Person key={i} x={620 + i * 260} y={GROUND - 70 + sink} scale={0.2} pose={i === 1 ? 'point' : 'stand'} color={C.ink} />
          ))}
          <DepthRuler x={1640} groundY={GROUND} pxPerM={20} maxM={30} />
          {/* "settling under its own weight" arrows */}
          {[480, 1280].map((x, i) => (
            <g key={i} opacity={arrowsO} transform={`translate(${x} ${GROUND + 120 + sink + bob})`}>
              <line x1={0} y1={-60} x2={0} y2={40} stroke={C.orange} strokeWidth={8} strokeLinecap="round" />
              <path d="M -24 30 L 0 64 L 24 30 Z" fill={C.orange} />
            </g>
          ))}
        </Layer>
        {STRATA.map((st, i) => (
          <Chip key={i} text={st.name} at={6 + i * 6} x={250} y={GROUND + ((st.top + st.bottom) / 2) * (BOTTOM - GROUND)} world={world} size={26} tone={i === 2 ? 'orange' : 'neutral'} />
        ))}
        <div
          style={{
            position: 'absolute',
            left: 1010,
            top: GROUND + 470 + sink,
            transform: 'translateX(-50%)',
            opacity: arrowsO,
            fontFamily: FONT_BN,
            fontWeight: 700,
            fontSize: 30,
            color: C.ink,
            background: '#fff',
            padding: '8px 20px',
            borderRadius: 999,
            border: `2px solid ${C.orange}`,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <ArrowDown size={26} color={C.orange} strokeWidth={3} /> নিজের ভারে নামছে
        </div>
      </Camera>
      <Head text="খোঁড়ো, আর [[নামাও]]" at={4} world={world} y={50} size={70} />
      {stepFrames(start + every, every, 3).map((t) => (
        <Sfx key={t} name="thud" at={t} volume={0.3} />
      ))}
    </>
  );
};
