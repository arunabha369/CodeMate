import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { DialogueCard } from "../components/DialogueCard";
import { cue } from "../lib/timing";

const ID = "S15";

/** সতী ↔ শিব (names and symbols only). */
export const S15: React.FC = () => (
  <AbsoluteFill>
    <Background variant="night" />
    <DialogueCard
      left={{ name: "সতী", icon: "lotus" }}
      right={{ name: "শিব", icon: "trishul" }}
      lines={[
        { side: "left", text: "যেতে চাই", at: cue(ID, "সতী যেতে চাইলেন", 0) },
        { side: "right", text: "বিনা নিমন্ত্রণে গেলে অপমানই জুটবে", at: cue(ID, "বিনা নিমন্ত্রণে", -6) },
      ]}
    />
  </AbsoluteFill>
);
