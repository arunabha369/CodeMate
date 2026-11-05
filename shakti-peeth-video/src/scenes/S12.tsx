import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { BrollClip } from "../components/BrollClip";
import { Headline } from "../components/Headline";
import { ParticleLayer } from "../components/ParticleLayer";
import { YajnaFire } from "../components/YajnaFire";
import { asset } from "../lib/assets";
import { cue } from "../lib/timing";
import { CONTENT_FROM, WithChapterCard } from "./shared";

const ID = "S12";

/** অধ্যায় ২. The great yajna: havan B-roll (drawn fire until it is sourced). */
export const S12: React.FC = () => {
  const b = asset("broll-havan");
  return (
    <WithChapterCard number={2} title="দক্ষযজ্ঞ">
      <AbsoluteFill>
        {b.src ? <BrollClip src={b.src} label={b.label} warm vignette="dark" vignetteStrength={0.7} /> : <Background variant="night" />}
        {b.src ? null : <YajnaFire y={900} scale={1.15} />}
        <ParticleLayer kind="embers" count={60} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", justifyContent: "center" }}>
          <Headline text="এক বিশাল যজ্ঞ" highlight="যজ্ঞ" start={cue(ID, "বিশাল যজ্ঞের", -8) - CONTENT_FROM} size={88} />
        </div>
      </AbsoluteFill>
    </WithChapterCard>
  );
};
