import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { YajnaFire } from "../components/YajnaFire";
import { calm } from "../lib/anim";
import { cue } from "../lib/timing";
import { colors, fonts, textHalo } from "../theme";
import { CONTENT_FROM, WithChapterCard } from "./shared";

const ID = "S21";
const c = (phrase: string, o = 0) => cue(ID, phrase, o) - CONTENT_FROM;
const SEATS = ["ইন্দ্র", "অগ্নি", "বরুণ", "বায়ু", "", "সূর্য", "চন্দ্র", "যম", "কুবের"];
const GAP = 4;
const ROW_Y = 760;
const seatX = (i: number) => 200 + i * 190;

const Content: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const focusAt = c("শুধু শিবের", -6);
  const push = interpolate(frame, [focusAt, focusAt + 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.45, 0, 0.2, 1) });
  const share = c("যজ্ঞের ভাগ", -6);
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <AbsoluteFill style={{ scale: 1 + 0.35 * push, transformOrigin: `${seatX(GAP)}px ${ROW_Y}px` }}>
        <YajnaFire y={430} scale={0.55} />
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          {SEATS.map((name, i) => {
            const s = calm(frame, fps, 6 + i * 3);
            const x = seatX(i);
            if (i === GAP) {
              return (
                <g key={i} opacity={s}>
                  <rect x={x - 70} y={ROW_Y - 30} width={140} height={60} rx={14} fill="none" stroke={colors.ash} strokeWidth={2.5} strokeDasharray="8 8" />
                </g>
              );
            }
            const bowl = calm(frame, fps, share + i * 2);
            return (
              <g key={i} opacity={s}>
                <rect x={x - 70} y={ROW_Y - 30} width={140} height={60} rx={14} fill={colors.nightRed} stroke={colors.gold} strokeWidth={2.5} />
                <g opacity={bowl} transform={`translate(${x} ${ROW_Y - 62})`}>
                  <path d="M -26 0 Q 0 26 26 0 Z" fill={colors.goldDeep} stroke={colors.gold} strokeWidth={2} />
                  <circle cx={0} cy={-6} r={6} fill={colors.diya} opacity={0.85} />
                </g>
              </g>
            );
          })}
        </svg>
        {SEATS.map((name, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: seatX(i) - 90,
              width: 180,
              top: ROW_Y + 44,
              textAlign: "center",
              fontFamily: fonts.heading,
              fontSize: i === GAP ? 46 : 36,
              color: i === GAP ? colors.ash : colors.cream,
              opacity: i === GAP ? calm(frame, fps, focusAt + 10) : calm(frame, fps, 10 + i * 3),
              textShadow: textHalo(true),
            }}
          >
            {i === GAP ? "শিব" : name}
          </div>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** অধ্যায় ৩. Every god has a seat and a share — except Shiva. */
export const S21: React.FC = () => (
  <WithChapterCard number={3} title="দেহত্যাগ">
    <Content />
  </WithChapterCard>
);
