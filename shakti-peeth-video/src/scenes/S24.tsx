import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { DiyaRow } from "../components/DiyaRow";
import { cue } from "../lib/timing";
import { colors, fonts } from "../theme";
import { SourceKicker } from "./shared";

const ID = "S24";

/** Sati leaves her body — shown only as one diya flame going out. */
export const S24: React.FC = () => {
  const frame = useCurrentFrame();
  const outAt = cue(ID, "দেহত্যাগ", 6);
  const dim = interpolate(frame, [outAt, outAt + 40], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Background variant="night" stars={false} bokeh={false} />
      <DiyaRow count={1} y={660} size={1.7} outAt={outAt} />
      <AbsoluteFill style={{ backgroundColor: colors.black, opacity: dim }} />
      <SourceKicker text="ভাগবত পুরাণ" color={colors.muted} font={fonts.body} />
    </AbsoluteFill>
  );
};
