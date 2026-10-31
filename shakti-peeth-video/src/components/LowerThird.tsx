import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { calm } from "../lib/anim";
import { BgVariant, colors, fonts, layout, palettes } from "../theme";

/** Bottom-left name strip, e.g. "কালীঘাট · কলকাতা — শক্তি কালিকা · ভৈরব নকুলেশ্বর". */
export const LowerThird: React.FC<{
  title: string;
  subtitle?: string;
  chip?: string;
  start?: number;
  bg?: BgVariant;
}> = ({ title, subtitle, chip, start = 0, bg = "night" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = calm(frame, fps, start);
  const c = calm(frame, fps, start + 12);
  const pal = palettes[bg];
  const dark = bg === "night";
  return (
    <div
      style={{
        position: "absolute",
        left: layout.safe,
        bottom: layout.safe,
        display: "flex",
        alignItems: "stretch",
        opacity: s,
        transform: `translateX(${(1 - s) * -60}px)`,
      }}
    >
      <div style={{ width: 8, background: colors.sindoor, borderRadius: 4 }} />
      <div
        style={{
          padding: "18px 34px 20px 26px",
          background: dark
            ? "linear-gradient(90deg, rgba(10,9,16,0.88), rgba(27,15,28,0.62))"
            : "linear-gradient(90deg, rgba(247,239,221,0.96), rgba(247,239,221,0.82))",
          borderTop: `2px solid ${pal.accent}`,
          borderBottom: `2px solid ${pal.accent}`,
          maxWidth: 1400,
        }}
      >
        <div style={{ fontFamily: fonts.heading, fontSize: 50, lineHeight: 1.3, color: dark ? colors.cream : colors.ink }}>
          {title}
        </div>
        {subtitle ? (
          <div style={{ fontFamily: fonts.body, fontSize: 32, color: dark ? colors.gold : colors.goldDeep, marginTop: 4 }}>
            {subtitle}
          </div>
        ) : null}
      </div>
      {chip ? (
        <div
          style={{
            alignSelf: "center",
            marginLeft: 18,
            padding: "8px 20px",
            borderRadius: 999,
            border: `2px dashed ${pal.accent}`,
            fontFamily: fonts.body,
            fontSize: 26,
            color: dark ? colors.cream : colors.ink,
            background: dark ? "rgba(10,9,16,0.7)" : "rgba(247,239,221,0.9)",
            opacity: c,
          }}
        >
          {chip}
        </div>
      ) : null}
    </div>
  );
};
