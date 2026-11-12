import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { ParticleLayer } from "../components/ParticleLayer";
import { PeethMap } from "../components/PeethMap";
import { toBn } from "../lib/bn";
import { hookCue } from "../lib/hookCues";
import { sceneTiming } from "../lib/timing";
import { colors, fonts } from "../theme";

const ID = "S02";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * Hook, part 2. The camera pulls back from Bengal to the whole subcontinent while the dots
 * burst in and a giant counter races to ৫১ (landing on "একান্নটা" with a shockwave); then a
 * golden thread runs through every dot as "একটাই গল্প" slams in.
 */
export const S02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = sceneTiming(ID);
  const countAt = hookCue(ID, "একান্নটা") + 8;
  const s2 = hookCue(ID, "আর প্রত্যেকটার");
  const oneAt = hookCue(ID, "একটাই") - 4;
  const rainStart = 6;
  const perDot = (countAt - rainStart) / 51;
  const n = Math.round(interpolate(frame, [rainStart, countAt], [0, 51], clamp));
  const landed = spring({ frame: frame - countAt, fps, config: { damping: 9, stiffness: 160, mass: 0.6 } });
  const punch = frame >= countAt ? 1 + 0.22 * (1 - landed) : 1 + 0.03 * Math.sin(frame * 1.7);
  const wave = interpolate(frame, [countAt, countAt + 34], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const labelIn = interpolate(frame, [countAt + 2, countAt + 14], [0, 1], clamp);
  const oneIn = spring({ frame: frame - oneAt, fps, config: { damping: 13, stiffness: 180, mass: 0.7 } });
  const rule = interpolate(frame, [oneAt + 8, oneAt + 24], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <ParticleLayer kind="embers" count={34} opacity={0.6} />
      <PeethMap
        camera={[
          { frame: 0, lon: 86.5, lat: 23.6, zoom: 2.7 },
          { frame: Math.min(countAt, 70), lon: 73.5, lat: 22.5, zoom: 1 },
          { frame: s2, lon: 73.5, lat: 22.5, zoom: 1 },
          { frame: t.frames, lon: 74.5, lat: 22.5, zoom: 1.07 },
        ]}
        rainIn={{ start: rainStart, perDot, fall: 0, burst: true }}
        dotSize={1.5}
        thread={{ start: s2, duration: Math.max(30, oneAt - s2 + 24) }}
        showNote
        showTray
      />
      {/* Left column keeps the type readable over the map's west edge. */}
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(10,9,16,0.8) 0%, rgba(10,9,16,0.4) 30%, transparent 48%)" }} />
      <div style={{ position: "absolute", left: 100, top: 170, width: 700 }}>
        <div style={{ position: "relative", width: 560, height: 400 }}>
          {/* shockwave when the count lands */}
          <div
            style={{
              position: "absolute",
              left: 280 - 600 * wave,
              top: 215 - 600 * wave,
              width: 1200 * wave,
              height: 1200 * wave,
              borderRadius: "50%",
              border: `${10 * (1 - wave)}px solid ${colors.diya}`,
              opacity: frame >= countAt ? 1 - wave : 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              fontFamily: fonts.heading,
              fontSize: 400,
              lineHeight: 1.05,
              color: colors.sindoor,
              textShadow: "0 10px 0 rgba(0,0,0,0.55), 0 0 90px rgba(193,18,31,0.75)",
              transform: `scale(${punch})`,
              transformOrigin: "30% 60%",
              fontVariantNumeric: "tabular-nums",
              whiteSpace: "nowrap",
            }}
          >
            {toBn(n)}
          </div>
        </div>
        <div style={{ fontFamily: fonts.heading, fontSize: 76, color: colors.cream, opacity: labelIn, transform: `translateY(${(1 - labelIn) * 18}px)`, textShadow: "0 3px 16px rgba(0,0,0,0.9)", marginTop: 4 }}>
          পবিত্র স্থান
        </div>
        <div style={{ overflow: "hidden", paddingTop: 22, marginTop: 14 }}>
          <div
            style={{
              fontFamily: fonts.heading,
              fontSize: 136,
              lineHeight: 1.2,
              color: colors.gold,
              textShadow: "0 6px 0 rgba(0,0,0,0.6), 0 0 50px rgba(227,176,75,0.45)",
              transform: `translateY(${(1 - oneIn) * 115}%)`,
              opacity: frame >= oneAt ? 1 : 0,
              whiteSpace: "nowrap",
            }}
          >
            একটাই গল্প
          </div>
        </div>
        <div style={{ height: 8, width: 600 * rule, background: `linear-gradient(90deg, ${colors.gold}, ${colors.diya})`, boxShadow: `0 0 24px ${colors.diya}` }} />
      </div>
    </AbsoluteFill>
  );
};
