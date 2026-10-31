import React from 'react';
import {Html5Audio, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {clamp, easeInOut} from './anim';
import {OVERLAP, SceneTiming, worldOf} from './timing';
import {World} from './ui/text';
import {H, W} from './theme';
import type {NightFx} from './bg/NightSky';

export type SceneProps = {s: SceneTiming; cue: (phrase: string, offset?: number) => number; world: World};

/** A scene component may export `<id>_bg` to drive the shared night background (blackout, searchlights). */
export type BgFx = (localFrame: number, s: SceneTiming) => NightFx;

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

export type CamKey = {f: number; x: number; y: number; z: number};

/** Camera state at frame f: focus point (x, y) in frame pixels and zoom z, eased between keyframes. */
export const camAt = (f: number, keys: CamKey[]) => {
  if (keys.length === 1) return keys[0];
  const fr = keys.map((k) => k.f);
  const o = {...clamp, easing: easeInOut};
  return {f, x: interpolate(f, fr, keys.map((k) => k.x), o), y: interpolate(f, fr, keys.map((k) => k.y), o), z: interpolate(f, fr, keys.map((k) => k.z), o)};
};

/**
 * Real camera moves: everything inside is laid out in normal 1920×1080 frame space, and the camera
 * looks at (x, y) with zoom z. Keep HUD elements (headlines, chips) outside the Camera.
 */
export const Camera: React.FC<{keys: CamKey[]; children: React.ReactNode}> = ({keys, children}) => {
  const f = useCurrentFrame();
  const c = camAt(f, keys);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: W,
        height: H,
        transformOrigin: '0 0',
        transform: `translate(${W / 2}px, ${H / 2}px) scale(${c.z}) translate(${-c.x}px, ${-c.y}px)`,
      }}
    >
      {children}
    </div>
  );
};

export type SfxName = 'whoosh' | 'pop' | 'click' | 'tick' | 'thud' | 'rumble' | 'type' | 'ding' | 'swoosh-soft' | 'clank' | 'siren' | 'hammer';

export const Sfx: React.FC<{name: SfxName; at: number; volume?: number}> = ({name, at, volume = 0.5}) => (
  <Sequence from={Math.max(0, Math.round(at))} durationInFrames={name === 'siren' ? 180 : 90} layout="none">
    <Html5Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

export const worldFor = (s: SceneTiming): World => worldOf(s.bg);
