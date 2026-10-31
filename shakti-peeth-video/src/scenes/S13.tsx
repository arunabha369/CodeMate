import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { InviteIcon } from "../components/Icons";
import { calm } from "../lib/anim";
import { cue } from "../lib/timing";
import { colors, fonts, textHalo } from "../theme";

const ID = "S13";
const ROW_Y = 660;
const GROUPS: Array<[string, string]> = [
  ["দেবতা", "দেবতা"],
  ["ঋষি", "ঋষি"],
  ["মুনির", "মুনি"],
];
const PER_GROUP = 4;
const guestX = (i: number) => 230 + i * 112 + Math.floor(i / PER_GROUP) * 40;
const EMPTY_X = [1700, 1810];

/** Invitations fly to gods, rishis and munis; two places stay empty — শিব, সতী. */
export const S13: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const groupAt = GROUPS.map(([phrase]) => cue(ID, phrase, -8));
  const emptyAt = cue(ID, "বাদ পড়লেন", -4);
  const namesAt = cue(ID, "শিব আর সতী", -4);
  return (
    <AbsoluteFill>
      <Background variant="night" />
      {/* origin: Daksha's seal */}
      <div style={{ position: "absolute", left: 960 - 60, top: 150, opacity: calm(frame, fps, 0) }}>
        <InviteIcon size={120} color={colors.gold} seal={colors.sindoor} />
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: PER_GROUP * GROUPS.length }).map((_, i) => {
          const g = Math.floor(i / PER_GROUP);
          const s = calm(frame, fps, groupAt[g] - 10 + (i % PER_GROUP) * 3);
          const lit = interpolate(frame, [groupAt[g] + 18 + (i % PER_GROUP) * 3, groupAt[g] + 26 + (i % PER_GROUP) * 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <g key={i} opacity={s}>
              <circle cx={guestX(i)} cy={ROW_Y} r={36} fill={colors.night1} stroke={colors.gold} strokeWidth={2.5} />
              <circle cx={guestX(i)} cy={ROW_Y} r={12} fill={colors.gold} opacity={0.3 + 0.7 * lit} />
            </g>
          );
        })}
        {EMPTY_X.map((x, k) => {
          const s = calm(frame, fps, emptyAt + k * 4);
          return <circle key={k} cx={x} cy={ROW_Y} r={36} fill="none" stroke={colors.ash} strokeWidth={2.5} strokeDasharray="6 7" opacity={s} />;
        })}
      </svg>
      {/* invitation cards in flight */}
      {Array.from({ length: PER_GROUP * GROUPS.length }).map((_, i) => {
        const g = Math.floor(i / PER_GROUP);
        const start = groupAt[g] + (i % PER_GROUP) * 3;
        const p = interpolate(frame, [start, start + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
        if (p <= 0 || p >= 1) return null;
        const x = 960 + (guestX(i) - 960) * p;
        const y = 210 + (ROW_Y - 210) * p - Math.sin(p * Math.PI) * 120;
        return (
          <div key={i} style={{ position: "absolute", left: x - 26, top: y - 19, transform: `rotate(${(p - 0.5) * 40}deg)` }}>
            <InviteIcon size={52} color={colors.gold} seal={colors.sindoor} strokeWidth={4} />
          </div>
        );
      })}
      {GROUPS.map(([, label], g) => (
        <div
          key={label}
          style={{
            position: "absolute",
            left: guestX(g * PER_GROUP) - 40,
            width: guestX(g * PER_GROUP + PER_GROUP - 1) - guestX(g * PER_GROUP) + 80,
            top: ROW_Y + 60,
            textAlign: "center",
            fontFamily: fonts.heading,
            fontSize: 48,
            color: colors.cream,
            opacity: calm(frame, fps, groupAt[g]),
            textShadow: textHalo(true),
          }}
        >
          {label}
        </div>
      ))}
      {["শিব", "সতী"].map((n, k) => (
        <div key={n} style={{ position: "absolute", left: EMPTY_X[k] - 60, width: 120, top: ROW_Y + 60, textAlign: "center", fontFamily: fonts.heading, fontSize: 48, color: colors.ash, opacity: calm(frame, fps, namesAt + k * 6) }}>
          {n}
        </div>
      ))}
    </AbsoluteFill>
  );
};
