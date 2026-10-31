import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { PeethMap } from "../components/PeethMap";
import { WithChapterCard } from "./shared";

/** অধ্যায় ৭. The full map, all dots. */
export const S44: React.FC = () => (
  <WithChapterCard number={7} title="পীঠ পরিক্রমা">
    <AbsoluteFill>
      <Background variant="night" />
      <PeethMap showNote showTray />
    </AbsoluteFill>
  </WithChapterCard>
);
