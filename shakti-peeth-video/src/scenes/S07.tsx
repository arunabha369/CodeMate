import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { Kailash } from "../components/Kailash";
import { PaintingFrame } from "../components/PaintingFrame";
import { ParticleLayer } from "../components/ParticleLayer";
import { asset } from "../lib/assets";
import { cue, sceneTiming } from "../lib/timing";
import { FadeAt } from "./shared";

const ID = "S07";

/** Kailash under the moon; the summit glows; a Shiva painting joins on "শিব". */
export const S07: React.FC = () => {
  const frame = useCurrentFrame();
  const t = sceneTiming(ID);
  const art = asset("shiva-painting");
  const glowAt = cue(ID, "কৈলাসের", -6);
  const glow = interpolate(frame, [glowAt, glowAt + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Background variant="night" diyaGlow={false} />
      <Kailash glow={glow} scale={interpolate(frame, [0, t.frames], [1, 1.06])} />
      <ParticleLayer kind="snow" count={70} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 110, display: "flex", justifyContent: "center" }}>
        <Headline text="কৈলাসের মহাদেব" highlight="মহাদেব" start={glowAt} size={84} />
      </div>
      <FadeAt at={cue(ID, "শিব।", -10)}>
        <PaintingFrame src={art.src} label={art.label} credit={art.credit} bg="night" durationInFrames={t.frames} box={{ x: 110, y: 230, w: 420, h: 540 }} />
      </FadeAt>
    </AbsoluteFill>
  );
};
