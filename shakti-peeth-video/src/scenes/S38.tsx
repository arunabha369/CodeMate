import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { ShaktiBhairavaCard } from "../components/ShaktiBhairavaCard";
import { cue } from "../lib/timing";
import { CONTENT_FROM, WithChapterCard } from "./shared";

const ID = "S38";

/** অধ্যায় ৬. The Shakti half of the split card opens. */
export const S38: React.FC = () => (
  <WithChapterCard number={6} title="শক্তি, ভৈরব আর সংখ্যার রহস্য" variant="gold">
    <AbsoluteFill>
      <Background variant="gold" />
      <ShaktiBhairavaCard leftAt={cue(ID, "আলাদা নামে", -10) - CONTENT_FROM} />
    </AbsoluteFill>
  </WithChapterCard>
);
