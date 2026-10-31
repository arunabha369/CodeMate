import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { ParticleLayer } from "../components/ParticleLayer";
import { cue } from "../lib/timing";
import { colors } from "../theme";
import { CONTENT_FROM, WithChapterCard } from "./shared";

const ID = "S25";
const c = (phrase: string, o = 0) => cue(ID, phrase, o) - CONTENT_FROM;
const GROUND = { x: 960, y: 800 };

const Content: React.FC = () => {
  const frame = useCurrentFrame();
  const tear = c("জটা ছিঁড়ে", -6);
  const hit = c("মাটিতে", -4);
  const fall = interpolate(frame, [tear, hit], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });
  const t = frame - hit;
  const shake = t > 0 && t < 30 ? (1 - t / 30) * 14 * Math.sin(t * 2.7) : 0;
  return (
    <AbsoluteFill style={{ translate: `${shake}px ${shake * 0.6}px` }}>
      <Background variant="night" red />
      {/* the lock of matted hair, falling */}
      {frame < hit + 2 ? (
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: frame >= tear ? 1 : 0 }}>
          {[0, 1, 2].map((k) => {
            const y0 = -120 + (GROUND.y + 120) * fall;
            const d = `M ${GROUND.x - 14 + k * 14} ${y0 - 140} C ${GROUND.x + 30 - k * 10} ${y0 - 90} ${GROUND.x - 30 + k * 12} ${y0 - 40} ${GROUND.x + k * 6} ${y0}`;
            return <path key={k} d={d} fill="none" stroke={colors.ash} strokeWidth={5} strokeLinecap="round" />;
          })}
        </svg>
      ) : null}
      {/* shockwave rings */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {[0, 8, 16].map((d, k) => {
          const p = interpolate(t - d, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          if (p <= 0 || p >= 1) return null;
          return <ellipse key={k} cx={GROUND.x} cy={GROUND.y} rx={40 + 900 * p} ry={12 + 220 * p} fill="none" stroke={k === 0 ? colors.gold : colors.sindoor} strokeWidth={6 * (1 - p) + 1} opacity={1 - p} />;
        })}
      </svg>
      <ParticleLayer kind="sparks" count={70} origin={GROUND} startFrame={hit} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", justifyContent: "center" }}>
        <Headline text="শোকে আর ক্রোধে" highlight="ক্রোধে" highlightColor="sindoor" start={c("শোকে", -6)} size={84} />
      </div>
    </AbsoluteFill>
  );
};

/** অধ্যায় ৪. Shiva strikes a lock of his hair on the ground — a shockwave. */
export const S25: React.FC = () => (
  <WithChapterCard number={4} title="বীরভদ্র" variant="red">
    <Content />
  </WithChapterCard>
);
