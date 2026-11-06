import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { calm } from "../lib/anim";
import { colors, fonts } from "../theme";
import { PhotoKenBurns } from "./PhotoKenBurns";

/**
 * Split card: শক্তি (left, warm) · ভৈরব (right, ash-blue). The right half
 * opens at `rightAt`. Optional example chip (e.g. Kalighat) with a photo thumbnail.
 */
export const ShaktiBhairavaCard: React.FC<{
  leftAt?: number;
  rightAt?: number;
  example?: { place: string; shakti: string; bhairava: string; photo?: string; credit?: string; at: number };
}> = ({ leftAt = 0, rightAt, example }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const l = calm(frame, fps, leftAt);
  const r = rightAt !== undefined ? calm(frame, fps, rightAt) : 0;
  const ex = example ? calm(frame, fps, example.at) : 0;
  const W = 640;
  const H = 440;
  const top = 170;
  const half = (side: "left" | "right", s: number) => {
    const warm = side === "left";
    return (
      <div
        style={{
          position: "absolute",
          top,
          left: warm ? 960 - W - 8 : 960 + 8,
          width: W,
          height: H,
          borderRadius: warm ? "28px 0 0 28px" : "0 28px 28px 0",
          background: warm
            ? `linear-gradient(135deg, ${colors.shaktiWarm} 0%, #F2C69A 100%)`
            : `linear-gradient(225deg, ${colors.bhairavaAsh} 0%, #C2CCD8 100%)`,
          border: `3px solid ${warm ? colors.sindoor : colors.vishnu}`,
          transform: `scaleX(${s})`,
          transformOrigin: warm ? "right center" : "left center",
          opacity: Math.min(1, s * 1.5),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 18px 50px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ fontFamily: fonts.heading, fontSize: 120, lineHeight: 1.2, color: warm ? colors.sindoor : colors.bhairavaInk }}>
          {warm ? "শক্তি" : "ভৈরব"}
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 36, color: warm ? colors.ink : colors.bhairavaInk, marginTop: 10, textAlign: "center" }}>
          {warm ? "প্রতি পীঠে মায়ের আলাদা নাম" : "শিবের রূপ · পীঠের রক্ষক"}
        </div>
      </div>
    );
  };
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {half("left", l)}
      {half("right", r)}
      {example ? (
        <div
          style={{
            position: "absolute",
            left: 960 - 560,
            width: 1120,
            top: top + H + 50,
            height: 150,
            display: "flex",
            alignItems: "center",
            gap: 26,
            padding: "0 26px 0 0",
            borderRadius: 999,
            background: colors.ivory,
            border: `2px solid ${colors.gold}`,
            opacity: ex,
            transform: `translateY(${(1 - ex) * 30}px)`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", width: 150, height: 150, flexShrink: 0, borderRadius: "50%", overflow: "hidden" }}>
            <PhotoKenBurns src={example.photo} label={example.place} durationInFrames={150} />
          </div>
          <div style={{ fontFamily: fonts.heading, fontSize: 48, color: colors.ink }}>{example.place}</div>
          <div style={{ fontFamily: fonts.body, fontSize: 34, color: colors.ink }}>
            — শক্তি <span style={{ color: colors.sindoor, fontWeight: 600 }}>{example.shakti}</span> · ভৈরব{" "}
            <span style={{ color: colors.bhairavaInk, fontWeight: 600 }}>{example.bhairava}</span>
          </div>
        </div>
      ) : null}
      {example?.credit ? (
        <div style={{ position: "absolute", left: 960 - 560, width: 1120, top: top + H + 50 + 160, textAlign: "center", fontFamily: fonts.body, fontSize: 18, color: colors.muted, opacity: ex }}>
          {example.credit}
        </div>
      ) : null}
    </div>
  );
};
