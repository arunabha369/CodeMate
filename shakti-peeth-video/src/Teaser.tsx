import React from "react";
import { AbsoluteFill, Sequence, getStaticFiles, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { toCaptionChunks } from "./components/CaptionLayer";
import { DiyaRow } from "./components/DiyaRow";
import { FilmFinish } from "./components/FilmFinish";
import { SFX } from "./data/sfx";
import { calm } from "./lib/anim";
import { TRANSITION_FRAMES, cue, sceneTiming } from "./lib/timing";
import { SCENES } from "./scenes";
import { colors, fonts } from "./theme";

/** Teaser running order (brief, Phase 8). */
export const TEASER_SCENES = ["S01", "S02", "S31", "S34", "S35", "S57"];
const END_FRAMES = 120;
const SCALE = 1080 / 1920; // a 1920×1080 scene shown full-width in the 1080-wide frame
const SCENE_TOP = 640;

export const teaserDuration = () =>
  TEASER_SCENES.reduce((a, id) => a + sceneTiming(id).frames, 0) + END_FRAMES - TRANSITION_FRAMES * TEASER_SCENES.length;

/** Big, always-on captions for vertical viewing. */
const VerticalCaption: React.FC<{ id: string }> = ({ id }) => {
  const frame = useCurrentFrame();
  const t = sceneTiming(id);
  const chunks = toCaptionChunks(t.narration);
  const total = chunks.reduce((a, c) => a + c.length, 0);
  let acc = t.leadInFrames;
  let text = "";
  for (const c of chunks) {
    const len = (c.length / total) * t.audioFrames;
    if (frame >= acc && frame < acc + len) text = c;
    acc += len;
  }
  if (!text) return null;
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: SCENE_TOP + 1080 * SCALE + 70, textAlign: "center" }}>
      <span
        style={{
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 62,
          lineHeight: 1.45,
          color: colors.cream,
          textShadow: "0 3px 18px rgba(0,0,0,0.9)",
          background: "rgba(10,9,16,0.55)",
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
          padding: "4px 18px",
          borderRadius: 12,
        }}
      >
        {text}
      </span>
    </div>
  );
};

/** One 16:9 scene reframed for 9:16: blurred fill behind, sharp full-width copy in the middle. */
const Reframe: React.FC<{ id: string }> = ({ id }) => {
  const Scene = SCENES[id];
  const box = (style: React.CSSProperties) => (
    <div style={{ position: "absolute", width: 1920, height: 1080, transformOrigin: "0 0", ...style }}>
      <Scene />
    </div>
  );
  return (
    <AbsoluteFill style={{ backgroundColor: colors.night0, overflow: "hidden" }}>
      {box({ left: -1166, top: 0, scale: 1920 / 1080, filter: "blur(28px) brightness(0.45)" })}
      {box({ left: 0, top: SCENE_TOP, scale: SCALE, boxShadow: "0 30px 80px rgba(0,0,0,0.7)" })}
      <VerticalCaption id={id} />
    </AbsoluteFill>
  );
};

const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = calm(frame, fps, 4);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 170, textAlign: "center", opacity: s, translate: `0px ${(1 - s) * 20}px` }}>
      <div style={{ fontFamily: fonts.heading, fontSize: 120, color: colors.cream, textShadow: "0 4px 24px rgba(0,0,0,0.8)" }}>
        <span style={{ color: colors.sindoor }}>৫১</span> সতীপীঠ
      </div>
      <div style={{ fontFamily: fonts.body, fontSize: 44, color: colors.gold, marginTop: 6 }}>সতীর দেহ কোথায় কোথায় পড়েছিল?</div>
    </div>
  );
};

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = calm(frame, fps, 6);
  const out = interpolate(frame, [END_FRAMES - 20, END_FRAMES], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: colors.night0, opacity: out }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 80% 50% at 50% 70%, rgba(240,138,36,0.25) 0%, transparent 70%)` }} />
      <div style={{ position: "absolute", left: 60, right: 60, top: 640, textAlign: "center", opacity: s }}>
        <div style={{ fontFamily: fonts.heading, fontSize: 88, lineHeight: 1.35, color: colors.cream }}>পুরো কাহিনি দেখুন</div>
        <div style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 92, color: colors.gold, marginTop: 20 }}>The Bong Mindset-এ</div>
      </div>
      {/* DiyaRow draws on a 1920×1080 canvas: scale it to the 1080-wide frame, low on screen. */}
      <div style={{ position: "absolute", left: 0, top: 1150, width: 1920, height: 1080, scale: SCALE, transformOrigin: "0 0" }}>
        <DiyaRow count={3} y={600} size={1.6} startFrame={10} staggerFrames={10} centerX={960} spacing={360} />
      </div>
    </AbsoluteFill>
  );
};

/** 1080×1920 teaser for Shorts / Reels (45–60 s), captions always on. */
export const Teaser: React.FC = () => {
  const files = new Set(getStaticFiles().map((f) => f.name));
  const total = teaserDuration();
  const items: React.ReactNode[] = [];
  TEASER_SCENES.forEach((id, i) => {
    const t = sceneTiming(id);
    const audio = `audio/scene-${id.slice(1)}.mp3`;
    if (i > 0) items.push(<TransitionSeries.Transition key={`tr-${id}`} presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />);
    items.push(
      <TransitionSeries.Sequence key={id} durationInFrames={t.frames}>
        <Reframe id={id} />
        {files.has(audio) ? (
          <Sequence from={t.leadInFrames}>
            <Audio src={staticFile(audio)} />
          </Sequence>
        ) : null}
        {(SFX[id] ?? [])
          .filter((fx) => files.has(fx.file))
          .map((fx, k) => (
            <Sequence key={k} from={Math.max(0, (fx.phrase ? cue(id, fx.phrase) : 0) + (fx.offset ?? 0))}>
              <Audio src={staticFile(fx.file)} volume={fx.volume} />
            </Sequence>
          ))}
      </TransitionSeries.Sequence>,
    );
  });
  items.push(<TransitionSeries.Transition key="tr-end" presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />);
  items.push(
    <TransitionSeries.Sequence key="end" durationInFrames={END_FRAMES}>
      <EndCard />
    </TransitionSeries.Sequence>,
  );
  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      <TransitionSeries>{items}</TransitionSeries>
      <Title />
      <FilmFinish vignette={0.35} />
      {files.has("music/bg.mp3") ? (
        <Audio
          src={staticFile("music/bg.mp3")}
          loop
          volume={(f) => 0.08 * Math.min(interpolate(f, [0, 30], [0, 1], { extrapolateRight: "clamp" }), interpolate(f, [total - 45, total], [1, 0], { extrapolateLeft: "clamp" }))}
        />
      ) : null}
    </AbsoluteFill>
  );
};
