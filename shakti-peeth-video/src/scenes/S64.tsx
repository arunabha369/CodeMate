import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { BrollClip } from "../components/BrollClip";
import { Headline } from "../components/Headline";
import { asset } from "../lib/assets";
import { cue } from "../lib/timing";
import { colors } from "../theme";

const ID = "S64";

/** Drawn kash-flower field swaying in an autumn breeze (until kash B-roll is sourced). */
const KashField: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <filter id="kashSoft">
          <feGaussianBlur stdDeviation={3} />
        </filter>
      </defs>
      {Array.from({ length: 90 }).map((_, i) => {
        const x0 = random(`k-x-${i}`) * 2000 - 40;
        const h = 360 + random(`k-h-${i}`) * 420;
        const sway = Math.sin(frame / 22 + random(`k-p-${i}`) * 6) * (24 + 20 * random(`k-a-${i}`));
        const tipX = x0 + sway;
        const tipY = 1080 - h;
        const depth = 0.45 + 0.55 * random(`k-d-${i}`);
        return (
          <g key={i} opacity={depth}>
            <path d={`M ${x0} 1080 Q ${x0 + sway * 0.3} ${1080 - h * 0.5} ${tipX} ${tipY}`} stroke={colors.goldDeep} strokeWidth={2.5} fill="none" />
            {Array.from({ length: 7 }).map((__, k) => (
              <ellipse key={k} cx={tipX + sway * 0.05 * k + (k % 2 ? 10 : -10)} cy={tipY - k * 16} rx={14} ry={30} fill={colors.cream} opacity={0.75} filter="url(#kashSoft)" transform={`rotate(${sway * 0.4 + (k % 2 ? 18 : -18)} ${tipX} ${tipY - k * 16})`} />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/** Uma returns every autumn as Durga: kash flowers, dhak (SFX in Film). */
export const S64: React.FC = () => {
  const b = asset("broll-kash");
  return (
    <AbsoluteFill>
      {b.src ? (
        <BrollClip src={b.src} label={b.label} warm />
      ) : (
        <>
          <Background variant="night" />
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(240,138,36,0.10) 0%, rgba(240,138,36,0.32) 100%)" }} />
          <KashField />
        </>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: 130, display: "flex", justifyContent: "center" }}>
        <Headline text="শরতে উমা আসেন দুর্গা হয়ে" highlight="দুর্গা" highlightColor="sindoor" size={84} start={cue(ID, "প্রতি শরতে", -8)} />
      </div>
    </AbsoluteFill>
  );
};
