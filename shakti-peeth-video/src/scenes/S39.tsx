import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { ShaktiBhairavaCard } from "../components/ShaktiBhairavaCard";
import { asset } from "../lib/assets";
import { cue } from "../lib/timing";

const ID = "S39";

/** The Bhairava half opens; example chip: Kalighat. */
export const S39: React.FC = () => (
  <AbsoluteFill>
    <Background variant="gold" />
    <ShaktiBhairavaCard
      leftAt={-60}
      rightAt={cue(ID, "শিবের এক রূপ", -8)}
      example={{ place: "কালীঘাট", shakti: "কালিকা", bhairava: "নকুলেশ্বর", photo: asset("photo-kalighat").src, at: cue(ID, "বিশ্বাস", -6) }}
    />
  </AbsoluteFill>
);
