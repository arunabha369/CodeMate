import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { KalashIcon } from "../components/Icons";
import { ParticleLayer } from "../components/ParticleLayer";
import { YajnaFire } from "../components/YajnaFire";
import { cue } from "../lib/timing";
import { colors } from "../theme";

const ID = "S27";

/** The yajna scattered: fire bursts into sparks, vessels tumble away. */
export const S27: React.FC = () => {
  const frame = useCurrentFrame();
  const storm = cue(ID, "ঝড়ের মতো", -6);
  const burst = interpolate(frame, [storm, storm + 10, storm + 40], [1, 1.8, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Background variant="night" red />
      <YajnaFire y={820} scale={1.1} intensity={burst} />
      <ParticleLayer kind="sparks" count={120} origin={{ x: 960, y: 700 }} startFrame={storm} />
      {Array.from({ length: 5 }).map((_, i) => {
        const p = interpolate(frame, [storm + i * 3, storm + i * 3 + 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
        const dir = i % 2 ? 1 : -1;
        const x = 915 + (i - 2) * 140 * (1 - p) + dir * (300 + random(`k${i}`) * 900) * p;
        const y = 760 - Math.sin(p * Math.PI) * (220 + i * 30) + p * 420;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, rotate: `${dir * p * (360 + i * 80)}deg`, opacity: 1 - p * 0.6 }}>
            <KalashIcon size={86} color={colors.gold} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", justifyContent: "center" }}>
        <Headline text="তছনছ" highlight="তছনছ" highlightColor="sindoor" start={cue(ID, "তছনছ", -6)} size={110} />
      </div>
    </AbsoluteFill>
  );
};
