import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Alpana } from "../components/Alpana";
import { Background } from "../components/Background";
import { DiyaRow } from "../components/DiyaRow";
import { Headline } from "../components/Headline";
import { calm } from "../lib/anim";
import { cue } from "../lib/timing";
import { colors, fonts } from "../theme";

const ID = "S67";

const Button: React.FC<{ at: number; icon: string; text: string; accent: string }> = ({ at, icon, text, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = calm(frame, fps, at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "18px 40px 20px",
        borderRadius: 999,
        background: accent,
        color: colors.cream,
        fontFamily: fonts.body,
        fontWeight: 600,
        fontSize: 44,
        opacity: s,
        scale: 0.8 + 0.2 * s,
        boxShadow: `0 0 40px ${accent}66`,
      }}
    >
      <span style={{ fontSize: 46 }}>{icon}</span>
      {text}
    </div>
  );
};

/** End card: comment + follow The Bong Mindset; diyas light; জয় মা. */
export const S67: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const followAt = cue(ID, "ফলো করুন", -8);
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <Alpana drawFrom={0} drawFrames={50} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", justifyContent: "center" }}>
        <Headline text="আপনি কোন কোন সতীপীঠে গেছেন?" highlight="সতীপীঠে" size={72} start={4} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 380, display: "flex", justifyContent: "center", gap: 40 }}>
        <Button at={cue(ID, "কমেন্টে", -8)} icon="💬" text="কমেন্টে লিখুন" accent={colors.vishnu} />
        <Button at={followAt} icon="＋" text="ফলো করুন" accent={colors.sindoor} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 540,
          textAlign: "center",
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 76,
          letterSpacing: 2,
          color: colors.gold,
          opacity: calm(frame, fps, followAt + 8),
          textShadow: `0 0 30px ${colors.diya}55`,
        }}
      >
        The Bong Mindset
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 650, textAlign: "center", fontFamily: fonts.heading, fontSize: 90, color: colors.sindoor, opacity: calm(frame, fps, cue(ID, "জয় মা", -6)) }}>
        জয় মা
      </div>
      <DiyaRow count={5} y={930} size={0.85} startFrame={10} staggerFrames={12} spacing={230} />
    </AbsoluteFill>
  );
};
