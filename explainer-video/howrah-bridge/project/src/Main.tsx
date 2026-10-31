import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import './fonts';
import {NightSky} from './bg/NightSky';
import {Paper} from './bg/Paper';
import {Archive} from './bg/Archive';
import {clamp} from './anim';
import {cueOf, OVERLAP, TIMELINE, TOTAL_FRAMES, WorldName, worldOf} from './timing';
import {SceneShell, Sfx, worldFor} from './kit';
import {BGFX, SCENES} from './scenes';
import {CaptionPill} from './ui/text';
import {HAS_MUSIC} from './assets';

export const SHOW_CAPTIONS = true;

const sceneAt = (f: number) => {
  let i = TIMELINE.findIndex((s) => f >= s.start && f < s.start + s.dur);
  if (i < 0) i = TIMELINE.length - 1;
  return TIMELINE[i];
};

/** The three worlds are rendered once at Main level and cross-faded on world switches, so ambient motion never restarts. */
const WorldBackground: React.FC = () => {
  const f = useCurrentFrame();
  const s = sceneAt(f);
  const lf = f - s.start;
  const cur = worldOf(s.bg);
  const prevW: WorldName = s.index > 0 ? worldOf(TIMELINE[s.index - 1].bg) : cur;
  const a = interpolate(lf, [0, 12], [0, 1], clamp);
  const weight = (w: WorldName) => (w === cur ? (prevW === cur ? 1 : a) : w === prevW ? 1 - a : 0);
  const fx = BGFX[s.id]?.(lf, s) ?? {};
  const prevFx = s.index > 0 && a < 1 ? (BGFX[TIMELINE[s.index - 1].id]?.(f - TIMELINE[s.index - 1].start, TIMELINE[s.index - 1]) ?? {}) : fx;
  const mix = (k: 'blackout' | 'beams') => (prevFx[k] ?? 0) * (1 - a) + (fx[k] ?? 0) * a;
  // draw the outgoing world underneath and the incoming one on top
  const order: WorldName[] = prevW === cur ? [cur] : [prevW, cur];
  return (
    <AbsoluteFill>
      {order.map((w) => (
        <AbsoluteFill key={w} style={{opacity: w === order[0] ? 1 : weight(w)}}>
          {w === 'night' && <NightSky frame={f} blackout={mix('blackout')} beams={mix('beams')} />}
          {w === 'paper' && <Paper frame={f} />}
          {w === 'archive' && <Archive frame={f} />}
        </AbsoluteFill>
      ))}
    </AbsoluteFill>
  );
};

const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const s = sceneAt(f);
  const lf = f - s.start;
  const c = s.chunks.find((k) => lf >= k.from && lf < k.to);
  if (!c) return null;
  const o = interpolate(lf, [c.from, c.from + 4, c.to - 3, c.to], [0, 1, 1, 0], clamp);
  return <CaptionPill text={c.text} world={worldOf(s.bg)} opacity={o} />;
};

export const Main: React.FC = () => {
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <WorldBackground />
      {TIMELINE.map((s) => {
        const Comp = SCENES[s.id];
        if (!Comp) return null;
        return (
          <Sequence key={s.id} from={s.start} durationInFrames={s.dur + OVERLAP} name={s.id}>
            <SceneShell s={s}>
              <Comp s={s} cue={cueOf(s)} world={worldFor(s)} />
            </SceneShell>
          </Sequence>
        );
      })}
      {SHOW_CAPTIONS && <Captions />}
      {TIMELINE.filter((s) => s.index > 0 && worldOf(s.bg) !== worldOf(TIMELINE[s.index - 1].bg)).map((s) => (
        <Sfx key={'w' + s.id} name="swoosh-soft" at={s.start - 6} volume={0.18} />
      ))}
      {TIMELINE.filter((s) => s.hasAudio).map((s) => (
        <Sequence key={'vo' + s.id} from={s.start + 8} durationInFrames={s.voFrames + 10} layout="none">
          <Html5Audio src={staticFile(`vo/${s.id}.mp3`)} volume={1} />
        </Sequence>
      ))}
      {HAS_MUSIC && (
        <Html5Audio
          src={staticFile('music.mp3')}
          loop
          volume={(f) => {
            const fadeIn = interpolate(f, [0, 45], [0, 1], clamp);
            const fadeOut = interpolate(f, [TOTAL_FRAMES - 90, TOTAL_FRAMES], [1, 0], clamp);
            const anyVo = TIMELINE.some((s) => s.hasAudio);
            // music is normalized to about -16 LUFS: ~-30 LUFS under narration, ~-22 LUFS when there is no narration yet
            return (anyVo ? 0.2 : 0.5) * fadeIn * fadeOut;
          }}
        />
      )}
    </AbsoluteFill>
  );
};
