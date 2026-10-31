import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Background } from "./components/Background";
import { Chakra, ChakraDefs } from "./components/ChakraSpin";
import { PeethMap } from "./components/PeethMap";
import { asset } from "./lib/assets";
import { colors, fonts } from "./theme";

/**
 * YouTube thumbnail, 1280×720 (brief, Phase 7): Met 2000.313 on the left,
 * glowing borderless map with 51 dots on the right, bold question with "৫১"
 * in sindoor red. Until the painting is sourced, the left shows the drawn
 * chakra and light (no placeholder in a thumbnail).
 * Built on the 1920×1080 canvas and scaled down, so all components work unchanged.
 */
export const Thumbnail: React.FC = () => {
  const art = asset("met-2000-313");
  return (
    <AbsoluteFill style={{ backgroundColor: colors.night0 }}>
      <div style={{ position: "absolute", width: 1920, height: 1080, scale: 1280 / 1920, transformOrigin: "0 0" }}>
        <Background variant="night" bokeh={false} />
        <PeethMap camera={{ lon: 71.5, lat: 21.5, zoom: 1.12 }} twinkle={false} />
        <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(10,9,16,0.95) 0%, rgba(10,9,16,0.6) 45%, transparent 70%)" }} />
        {art.src ? (
          <div style={{ position: "absolute", left: 40, top: 60, width: 620, height: 960, border: `6px solid ${colors.gold}`, boxShadow: "0 20px 60px rgba(0,0,0,0.8)", overflow: "hidden" }}>
            <Img src={staticFile(art.src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 25%" }} />
          </div>
        ) : (
          <svg width={760} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
            <ChakraDefs />
            <defs>
              <radialGradient id="thumbSil">
                <stop offset="0%" stopColor={colors.cream} stopOpacity={0.95} />
                <stop offset="50%" stopColor={colors.gold} stopOpacity={0.55} />
                <stop offset="100%" stopColor={colors.gold} stopOpacity={0} />
              </radialGradient>
            </defs>
            <ellipse cx={360} cy={560} rx={150} ry={380} fill="url(#thumbSil)" />
            <g transform="translate(360 560)">
              <Chakra r={190} rotation={12} />
            </g>
          </svg>
        )}
        <div style={{ position: "absolute", left: 700, right: 60, top: 70, textAlign: "right" }}>
          <div style={{ fontFamily: fonts.heading, fontSize: 300, lineHeight: 1, color: colors.sindoor, textShadow: "0 6px 0 rgba(0,0,0,0.6), 0 0 60px rgba(193,18,31,0.6)" }}>৫১</div>
          <div style={{ fontFamily: fonts.heading, fontSize: 120, lineHeight: 1.15, color: colors.cream, textShadow: "0 6px 24px rgba(0,0,0,0.95)" }}>সতীপীঠ</div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 60,
            right: 60,
            bottom: 70,
            textAlign: "center",
            fontFamily: fonts.heading,
            fontSize: 96,
            lineHeight: 1.2,
            color: colors.gold,
            textShadow: "0 6px 0 rgba(0,0,0,0.85), 0 0 30px rgba(0,0,0,0.9)",
          }}
        >
          সতীর দেহ কোথায় কোথায় পড়েছিল?
        </div>
      </div>
    </AbsoluteFill>
  );
};
