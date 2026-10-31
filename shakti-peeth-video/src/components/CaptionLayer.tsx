import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, layout } from "../theme";

const MAX_LINE = 38; // characters per caption line (2 lines max)

/** Split narration into caption chunks of at most two short lines, breaking at sentence ends first. */
export const toCaptionChunks = (text: string): string[] => {
  const sentences = text
    .split(/(?<=[।?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const chunks: string[] = [];
  for (const s of sentences) {
    if (s.length <= MAX_LINE * 2) {
      chunks.push(s);
      continue;
    }
    // Long sentence: split at commas/spaces into pieces that fit two lines.
    let cur = "";
    for (const w of s.split(/\s+/)) {
      const next = cur ? `${cur} ${w}` : w;
      if (next.length > MAX_LINE * 2 - 4 && cur) {
        chunks.push(cur);
        cur = w;
      } else {
        cur = next;
      }
    }
    if (cur) chunks.push(cur);
  }
  return chunks;
};

/**
 * Bottom-centre Bengali captions for the captioned render only. Chunks are
 * timed in proportion to their length across `durationInFrames`.
 */
export const CaptionLayer: React.FC<{ text: string; durationInFrames: number; leadIn?: number }> = ({
  text,
  durationInFrames,
  leadIn = 0,
}) => {
  const frame = useCurrentFrame() - leadIn;
  const chunks = toCaptionChunks(text);
  const total = chunks.reduce((a, c) => a + c.length, 0);
  const span = Math.max(1, durationInFrames - leadIn);
  let acc = 0;
  let current = -1;
  let cStart = 0;
  let cEnd = 0;
  for (let i = 0; i < chunks.length; i++) {
    const len = (chunks[i].length / total) * span;
    if (frame >= acc && frame < acc + len) {
      current = i;
      cStart = acc;
      cEnd = acc + len;
      break;
    }
    acc += len;
  }
  if (current < 0) return null;
  const o = Math.min(
    interpolate(frame, [cStart, cStart + 4], [0, 1], { extrapolateRight: "clamp" }),
    interpolate(frame, [cEnd - 4, cEnd], [1, 0], { extrapolateLeft: "clamp" }),
  );
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: layout.safe - 20 }}>
      <div
        style={{
          maxWidth: 1400,
          padding: "10px 28px 14px",
          borderRadius: 14,
          background: "rgba(10,9,16,0.72)",
          fontFamily: fonts.body,
          fontWeight: 500,
          fontSize: 46,
          lineHeight: 1.45,
          color: colors.cream,
          textAlign: "center",
          opacity: o,
        }}
      >
        {chunks[current]}
      </div>
    </AbsoluteFill>
  );
};
