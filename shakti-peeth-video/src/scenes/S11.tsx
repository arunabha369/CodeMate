import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { ParticleLayer } from "../components/ParticleLayer";
import { cue } from "../lib/timing";

const ID = "S11";

/** Red pulse; "বিদ্বেষের শুরু". */
export const S11: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 0.55 + 0.45 * Math.sin(frame / 10);
  const inRed = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Background variant="night" red />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(193,18,31,0.45) 0%, transparent 70%)", opacity: inRed * pulse }} />
      <ParticleLayer kind="embers" count={40} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Headline text="বিদ্বেষের শুরু" highlight="বিদ্বেষ" highlightColor="sindoor" size={120} start={cue(ID, "অপমানে", 0)} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
