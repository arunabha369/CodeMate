import React from "react";
import { AbsoluteFill } from "remotion";
import { Alpana } from "../components/Alpana";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { ParticleLayer } from "../components/ParticleLayer";

/** Title lockup. */
export const S04: React.FC = () => (
  <AbsoluteFill>
    <Background variant="night" />
    <Alpana drawFrom={0} drawFrames={45} />
    <ParticleLayer kind="embers" count={60} />
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Headline
        text="৫১ সতীপীঠ — পুরো কাহিনি"
        highlight="৫১"
        highlightColor="sindoor"
        kicker="পুরাণ, তন্ত্র ও প্রচলিত বিশ্বাস অবলম্বনে"
        size={112}
        start={10}
      />
    </AbsoluteFill>
  </AbsoluteFill>
);
