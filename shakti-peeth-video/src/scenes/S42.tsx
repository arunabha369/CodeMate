import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { CountCards } from "../components/CountCards";
import { cue } from "../lib/timing";

const ID = "S42";

/** ১৮ — the Ashtadasha Maha Shakti Peethas, attributed to Adi Shankaracharya. */
export const S42: React.FC = () => (
  <AbsoluteFill>
    <Background variant="gold" />
    <CountCards big revealAt={[cue(ID, "আঠারোটা", -12)]} cards={[{ value: "১৮", label: "অষ্টাদশ মহাশক্তিপীঠ", note: "শঙ্করাচার্যের নামে প্রচলিত" }]} />
  </AbsoluteFill>
);
