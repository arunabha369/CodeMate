import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BgFx, SceneProps, Sfx} from '../kit';

import {clamp} from '../anim';
import {Head} from '../ui/text';
import {Calendar} from '../ui/cards';
import {Layer} from '../ui/svg';
import {HowrahBridge} from '../hero/HowrahBridge';
import {HOOK_BRIDGE} from './p0';

/** S54 background: the city blacks out block by block, then searchlights rise. */
export const S54_bg: BgFx = (lf, s) => ({
  blackout: interpolate(lf, [10, Math.min(150, s.dur * 0.45)], [0, 1], clamp),
  beams: interpolate(lf, [60, 120], [0, 1], clamp),
});

/** Generic twin-engine aircraft silhouette (not any specific type). */
const Plane: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#5A5880">
    <path d="M -40 0 Q 0 -6 44 0 Q 0 6 -40 0 Z" />
    <path d="M -6 -2 L -18 -34 L -8 -34 L 10 -2 Z M -6 2 L -18 34 L -8 34 L 10 2 Z" />
    <path d="M -36 -1 L -44 -12 L -38 -12 L -30 -1 Z M -36 1 L -44 12 L -38 12 L -30 1 Z" />
  </g>
);

/** S54: chapter 7: blackout, searchlights, the 20 Dec 1942 raid. */
export const S54: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const cal = cue('উনিশশো বিয়াল্লিশের', -8);
  const planeX = interpolate(f, [cal, s.dur], [-120, 2100], clamp);
  // distant glows: slow pulses (< 1 Hz), never flashing
  const glow = (ph: number) => 0.5 - 0.5 * Math.cos(((f - cal - ph) / 50) * Math.PI * 2);
  const glowsOn = f > cal + 40 ? 1 : 0;
  return (
    <>
      <Layer>
        <defs>
          <radialGradient id="s54-g" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FF9A4A" stopOpacity={0.55} />
            <stop offset="1" stopColor="#FF9A4A" stopOpacity={0} />
          </radialGradient>
        </defs>
        {glowsOn > 0 && (
          <>
            <ellipse cx={1500} cy={610} rx={180} ry={60} fill="url(#s54-g)" opacity={0.6 * glow(0)} />
            <ellipse cx={420} cy={620} rx={140} ry={50} fill="url(#s54-g)" opacity={0.5 * glow(22)} />
          </>
        )}
        <Plane x={planeX} y={210} s={0.9} />
        <Plane x={planeX - 140} y={240} s={0.75} />
        <HowrahBridge {...HOOK_BRIDGE} theme="night" color="#4A4D7E" reflection depth={false} />
      </Layer>
      <Calendar month="ডিসেম্বর" day="20" year="1942" at={cal} x={960} y={345} scale={0.78} world={world} />
      <Head kicker="অধ্যায় ৭" text="{{অন্ধকার}} শহর" at={4} world={world} y={60} size={76} />
      <Sfx name="siren" at={cal - 10} volume={0.18} />
      <Sfx name="rumble" at={cal + 50} volume={0.2} />
    </>
  );
};

