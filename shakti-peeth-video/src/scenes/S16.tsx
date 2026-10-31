import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { QuoteCard } from "../components/QuoteCard";
import { cue } from "../lib/timing";

const ID = "S16";

/** Sati's reply as a quote. */
export const S16: React.FC = () => (
  <AbsoluteFill>
    <Background variant="night" />
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <QuoteCard text="বাবার বাড়ি যেতে মেয়ের আবার নিমন্ত্রণ লাগে নাকি?" attribution="সতী" start={cue(ID, "বাবার বাড়ি", -8)} wordStagger={5} />
    </AbsoluteFill>
  </AbsoluteFill>
);
