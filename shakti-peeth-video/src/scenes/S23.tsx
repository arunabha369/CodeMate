import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { QuoteCard } from "../components/QuoteCard";
import { cue } from "../lib/timing";

const ID = "S23";

/** Sati's vow, held a beat longer. */
export const S23: React.FC = () => (
  <AbsoluteFill>
    <Background variant="night" red bokeh={false} />
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <QuoteCard text="যে দেহ তোমার থেকে পেয়েছি, সেই দেহ আমি আর রাখব না" attribution="সতী" start={cue(ID, "যে দেহ", -6)} wordStagger={6} />
    </AbsoluteFill>
  </AbsoluteFill>
);
