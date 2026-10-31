import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { calm } from "../lib/anim";
import { colors, fonts, textHalo } from "../theme";

export const MAHAVIDYAS = ["কালী", "তারা", "ষোড়শী", "ভুবনেশ্বরী", "ভৈরবী", "ছিন্নমস্তা", "ধূমাবতী", "বগলামুখী", "মাতঙ্গী", "কমলা"];

/**
 * Ten slots in a circle, names appearing one by one, Kali emphasised.
 * Optional public-domain paintings per slot (`images[name]` = path under public/).
 * `focusKaliAt` brings Kali's slot to the centre and dims the rest (S19).
 */
export const MahavidyaRing: React.FC<{
  revealAt?: number[];
  start?: number;
  gap?: number;
  titleAt?: number;
  images?: Record<string, string>;
  focusKaliAt?: number;
  center?: { x: number; y: number };
  radius?: number;
}> = ({ revealAt, start = 0, gap = 12, titleAt, images = {}, focusKaliAt, center = { x: 960, y: 520 }, radius = 320 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const focus = focusKaliAt !== undefined ? calm(frame, fps, focusKaliAt) : 0;
  const title = titleAt !== undefined ? calm(frame, fps, titleAt) : 0;
  const slotR = 66;
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <circle cx={center.x} cy={center.y} r={radius} fill="none" stroke={colors.gold} strokeWidth={1.5} strokeDasharray="2 10" opacity={0.6 * (1 - focus)} />
      </svg>
      {MAHAVIDYAS.map((name, i) => {
        const at = revealAt?.[i] ?? start + i * gap;
        const s = calm(frame, fps, at);
        const ang = -Math.PI / 2 + (i / MAHAVIDYAS.length) * Math.PI * 2;
        const isKali = i === 0;
        let x = center.x + Math.cos(ang) * radius;
        let y = center.y + Math.sin(ang) * radius;
        let scale = 1;
        let dim = 1;
        if (isKali && focus > 0) {
          x = x + (center.x - x) * focus;
          y = y + (center.y - y) * focus;
          scale = 1 + 1.3 * focus;
        } else if (focus > 0) {
          dim = 1 - 0.85 * focus;
        }
        const ring = isKali ? colors.sindoor : colors.gold;
        const img = images[name];
        return (
          <div
            key={name}
            style={{
              position: "absolute",
              left: x - slotR,
              top: y - slotR,
              width: slotR * 2,
              opacity: s * dim,
              transform: `scale(${(0.6 + 0.4 * s) * scale})`,
              transformOrigin: `${slotR}px ${slotR}px`,
              textAlign: "center",
              zIndex: isKali ? 2 : 1,
            }}
          >
            <div
              style={{
                width: slotR * 2,
                height: slotR * 2,
                borderRadius: "50%",
                border: `${isKali ? 4 : 2.5}px solid ${ring}`,
                overflow: "hidden",
                background: `radial-gradient(circle, ${isKali ? "rgba(193,18,31,0.45)" : "rgba(227,176,75,0.25)"} 0%, rgba(10,9,16,0.9) 75%)`,
                boxShadow: isKali ? `0 0 ${30 + 30 * focus}px ${colors.sindoor}` : `0 0 18px rgba(227,176,75,0.35)`,
              }}
            >
              {img ? <Img src={staticFile(img)} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : null}
            </div>
            <div
              style={{
                marginTop: 8,
                marginLeft: -60,
                width: slotR * 2 + 120,
                fontFamily: fonts.heading,
                fontSize: isKali ? 40 : 34,
                color: isKali ? colors.sindoor : colors.cream,
                textShadow: textHalo(true),
                whiteSpace: "nowrap",
                opacity: isKali ? 1 - focus : 1,
              }}
            >
              {name}
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: center.x - 300,
          top: center.y - 40,
          width: 600,
          textAlign: "center",
          fontFamily: fonts.heading,
          fontSize: 64,
          color: colors.gold,
          opacity: title * (1 - focus),
          textShadow: textHalo(true),
          transform: `scale(${0.9 + 0.1 * title})`,
        }}
      >
        দশ মহাবিদ্যা
      </div>
      {focusKaliAt !== undefined ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: center.y + 175,
            textAlign: "center",
            fontFamily: fonts.heading,
            fontSize: 84,
            color: colors.cream,
            opacity: interpolate(frame, [focusKaliAt + 12, focusKaliAt + 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            textShadow: textHalo(true),
          }}
        >
          মা <span style={{ color: colors.sindoor }}>কালী</span>
        </div>
      ) : null}
    </div>
  );
};
