import React from 'react';
import {Html5Audio, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {clamp} from './anim';
import {OVERLAP, SceneTiming, worldOf} from './timing';
import {World} from './ui/text';

export type SceneProps = {s: SceneTiming; cue: (phrase: string, offset?: number) => number; world: World};

/** Enter/exit + slow camera push for every scene. */
export const SceneShell: React.FC<{s: SceneTiming; children: React.ReactNode; push?: number}> = ({s, children, push = 0.04}) => {
  const f = useCurrentFrame();
  const fadeIn = s.index === 0 ? 1 : interpolate(f, [0, 10], [0, 1], clamp);
  const out = interpolate(f, [s.dur - 2, s.dur + OVERLAP - 2], [1, 0], clamp);
  const blur = (1 - fadeIn) * 10 + (1 - out) * 12;
  const scale = 1 + push * interpolate(f, [0, s.dur + OVERLAP], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: fadeIn * out, filter: blur > 0.05 ? `blur(${blur}px)` : undefined, transform: `scale(${scale})`}}>
      {children}
    </div>
  );
};

export type SfxName = 'whoosh' | 'pop' | 'click' | 'tick' | 'thud' | 'rumble' | 'type' | 'ding' | 'swoosh-soft';

export const Sfx: React.FC<{name: SfxName; at: number; volume?: number}> = ({name, at, volume = 0.5}) => (
  <Sequence from={Math.max(0, Math.round(at))} durationInFrames={90} layout="none">
    <Html5Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

export const worldFor = (s: SceneTiming): World => worldOf(s.bg);
