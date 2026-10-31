import React from "react";
import { AbsoluteFill, Sequence, getStaticFiles, interpolate, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { CameraDrift } from "./components/CameraDrift";
import { CaptionLayer } from "./components/CaptionLayer";
import { FilmFinish } from "./components/FilmFinish";
import { SFX } from "./data/sfx";
import { SCENES } from "./scenes";
import { PendingScene } from "./scenes/PendingScene";
import { SCENE_IDS, TRANSITION_FRAMES, cue, sceneTiming } from "./lib/timing";
import { colors } from "./theme";

export type FilmProps = {
  /** First and last scene number (1–67). */
  from: number;
  to: number;
  /** Burn in Bengali captions (FB version / previews without voice). */
  captions: boolean;
};

export const filmScenes = (from: number, to: number) => SCENE_IDS.slice(from - 1, to);

export const filmDuration = ({ from, to }: Pick<FilmProps, "from" | "to">) => {
  const ids = filmScenes(from, to);
  return ids.reduce((a, id) => a + sceneTiming(id).frames, 0) - TRANSITION_FRAMES * (ids.length - 1);
};

/** Start frame of each scene on the film timeline (transitions overlap). */
const sceneStarts = (ids: string[]) => {
  let t = 0;
  return ids.map((id) => {
    const s = t;
    t += sceneTiming(id).frames - TRANSITION_FRAMES;
    return s;
  });
};

const MUSIC = "music/bg.mp3";

export const Film: React.FC<FilmProps> = ({ from, to, captions }) => {
  const ids = filmScenes(from, to);
  const files = new Set(getStaticFiles().map((f) => f.name));
  const starts = sceneStarts(ids);
  const total = filmDuration({ from, to });

  // Music bed: ~0.07 under narration, ~0.15 on ChapterCards, ~0.02 in S24; 2 s fades.
  const musicVolume = (f: number) => {
    let v = 0.07;
    ids.forEach((id, i) => {
      const t = sceneTiming(id);
      if (t.leadInFrames > 0 && f >= starts[i] && f < starts[i] + t.leadInFrames) v = 0.15;
      if (id === "S24" && f >= starts[i] && f < starts[i] + t.frames) v = 0.02;
    });
    const fadeIn = interpolate(f, [0, 60], [0, 1], { extrapolateRight: "clamp" });
    const fadeOut = interpolate(f, [total - 60, total], [1, 0], { extrapolateLeft: "clamp" });
    return v * Math.min(fadeIn, fadeOut);
  };

  const items: React.ReactNode[] = [];
  ids.forEach((id, i) => {
    const t = sceneTiming(id);
    const Scene = SCENES[id];
    const audio = `audio/scene-${id.slice(1)}.mp3`;
    if (i > 0) {
      items.push(
        <TransitionSeries.Transition key={`tr-${id}`} presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />,
      );
    }
    items.push(
      <TransitionSeries.Sequence key={id} durationInFrames={t.frames}>
        <CameraDrift durationInFrames={t.frames} seed={id}>
          {Scene ? <Scene /> : <PendingScene id={id} />}
        </CameraDrift>
        {files.has(audio) ? (
          <Sequence from={t.leadInFrames} name={`voice ${id}`}>
            <Audio src={staticFile(audio)} />
          </Sequence>
        ) : null}
        {(SFX[id] ?? [])
          .filter((fx) => files.has(fx.file))
          .map((fx, k) => (
            <Sequence key={k} from={Math.max(0, (fx.phrase ? cue(id, fx.phrase) : 0) + (fx.offset ?? 0))} name={`sfx ${fx.file}`}>
              <Audio src={staticFile(fx.file)} volume={fx.volume} />
            </Sequence>
          ))}
        {captions ? <CaptionLayer text={t.narration} durationInFrames={t.leadInFrames + t.audioFrames} leadIn={t.leadInFrames} /> : null}
      </TransitionSeries.Sequence>,
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      <TransitionSeries>{items}</TransitionSeries>
      <FilmFinish />
      {files.has(MUSIC) ? <Audio src={staticFile(MUSIC)} loop volume={musicVolume} /> : null}
    </AbsoluteFill>
  );
};
