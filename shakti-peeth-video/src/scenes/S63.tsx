import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { Kailash } from "../components/Kailash";
import { PaintingFrame } from "../components/PaintingFrame";
import { ParticleLayer } from "../components/ParticleLayer";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";
import { CONTENT_FROM, WithChapterCard } from "./shared";

const ID = "S63";
const c = (phrase: string, o = 0) => cue(ID, phrase, o) - CONTENT_FROM;

const Content: React.FC = () => {
  const frame = useCurrentFrame();
  const t = sceneTiming(ID);
  const art = asset("parvati-painting");
  const dawn = interpolate(frame, [0, 120], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, transparent 30%, rgba(240,138,36,${0.35 * dawn}) 100%)` }} />
      <Kailash moon={false} glow={dawn} x={art.src ? 300 : 0} />
      <ParticleLayer kind="snow" count={40} opacity={0.6} />
      {art.src ? <PaintingFrame src={art.src} label={art.label} credit={art.credit} bg="night" durationInFrames={t.frames} box={{ x: 120, y: 140, w: 520, h: 680 }} start={c("পার্বতী", -10)} /> : null}
      <div style={{ position: "absolute", left: 0, right: 0, top: 110, display: "flex", justifyContent: "center" }}>
        <Headline text="পার্বতী · বাংলার আদরের উমা" highlight="উমা" size={80} start={c("নাম পার্বতী", -8)} />
      </div>
    </AbsoluteFill>
  );
};

/** অধ্যায় ৯. Dawn on the snow peaks: Sati reborn as Parvati, Uma. */
export const S63: React.FC = () => (
  <WithChapterCard number={9} title="উমা ফিরে আসেন">
    <Content />
  </WithChapterCard>
);
