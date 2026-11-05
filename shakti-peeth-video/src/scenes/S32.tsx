import React from "react";
import { AbsoluteFill, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { BrollClip } from "../components/BrollClip";
import { asset } from "../lib/assets";
import { sceneTiming } from "../lib/timing";
import { colors } from "../theme";

const ID = "S32";

/** Drawn storm (until licensed storm/sea B-roll is sourced): rolling cloud bands, lightning, heaving waves. */
const DrawnStorm: React.FC = () => {
  const frame = useCurrentFrame();
  const flashes = [24, 31, 88, 140, 147, 205];
  const flash = Math.max(0, ...flashes.map((f) => (frame >= f && frame < f + 6 ? 1 - (frame - f) / 6 : 0)));
  return (
    <AbsoluteFill>
      <Background variant="night" red stars={false} bokeh={false} />
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="s32cloud">
            <feGaussianBlur stdDeviation={28} />
          </filter>
        </defs>
        {Array.from({ length: 9 }).map((_, i) => {
          const y = 80 + i * 55;
          const x = ((frame * (1.2 + random(`c${i}`) * 2) + random(`cx${i}`) * 1920) % 2400) - 240;
          return <ellipse key={i} cx={x} cy={y} rx={420} ry={70} fill={i % 2 ? colors.silhouette : colors.nightRed} opacity={0.75} filter="url(#s32cloud)" />;
        })}
        {flash > 0 ? (
          <path d={`M ${1100 + (frame % 7) * 30} 0 L ${1060} 220 L ${1120} 230 L ${1040} 470`} stroke={colors.cream} strokeWidth={5} fill="none" opacity={flash} />
        ) : null}
        {Array.from({ length: 7 }).map((_, k) => {
          const base = 760 + k * 50;
          const amp = 26 + k * 6;
          const pts = Array.from({ length: 48 }).map((__, i) => {
            const x = (i / 47) * 1920;
            const y = base + Math.sin(i / 3 + frame / (8 - k * 0.4) + k) * amp * Math.sin(frame / 30 + k);
            return `${i ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`;
          });
          return <path key={k} d={`${pts.join(" ")} L 1920 1080 L 0 1080 Z`} fill={k % 2 ? colors.night1 : colors.night0} stroke={colors.vishnu} strokeOpacity={0.35} strokeWidth={2} opacity={0.9} />;
        })}
      </svg>
      <AbsoluteFill style={{ backgroundColor: colors.cream, opacity: flash * 0.25 }} />
    </AbsoluteFill>
  );
};

/** Mountains break, seas rise: storm then rough sea, red vignette. */
export const S32: React.FC = () => {
  const frame = useCurrentFrame();
  const t = sceneTiming(ID);
  const storm = asset("broll-storm");
  const sea = asset("broll-sea");
  const half = Math.floor(t.frames / 2);
  const pulse = 0.6 + 0.4 * Math.sin(frame / 8);
  return (
    <AbsoluteFill>
      {storm.src && sea.src ? (
        <>
          <Sequence durationInFrames={half + 10} layout="absolute-fill">
            <BrollClip src={storm.src} label={storm.label} trimStart={90} vignette="red" vignetteStrength={pulse} />
          </Sequence>
          <Sequence from={half} layout="absolute-fill">
            <BrollClip src={sea.src} label={sea.label} vignette="red" vignetteStrength={pulse} />
          </Sequence>
        </>
      ) : (
        <DrawnStorm />
      )}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 65% at 50% 50%, transparent 45%, rgba(193,18,31,0.5) 100%)", opacity: interpolate(pulse, [0.2, 1], [0.4, 1]) }} />
    </AbsoluteFill>
  );
};
