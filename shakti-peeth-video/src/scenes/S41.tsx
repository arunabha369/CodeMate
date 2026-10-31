import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { CountCards } from "../components/CountCards";
import { cue } from "../lib/timing";

const ID = "S41";

/** ৫১ · ৫২ · ৬৪ · ১০৮ flip in as each count is spoken. */
export const S41: React.FC = () => (
  <AbsoluteFill>
    <Background variant="gold" />
    <CountCards
      revealAt={[cue(ID, "একান্ন", -8), cue(ID, "বাহান্ন", -8), cue(ID, "চৌষট্টি", -8), cue(ID, "একশো আট", -8)]}
      cards={[
        { value: "৫১", label: "পীঠনির্ণয় তন্ত্র" },
        { value: "৫২", label: "বাংলার প্রচলিত মত" },
        { value: "৬৪", label: "অন্য মত" },
        { value: "১০৮", label: "দেবীভাগবত পুরাণ" },
      ]}
    />
  </AbsoluteFill>
);
