import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts } from "../theme";

/**
 * Stand-in shown while a licensed photo/painting/clip is not yet sourced
 * (Phase 3). It is deliberately obvious so it can never ship by accident.
 */
export const MediaPlaceholder: React.FC<{ kind: "ছবি" | "চিত্রকলা" | "ভিডিও"; label: string }> = ({ kind, label }) => (
  <AbsoluteFill
    style={{
      background: `repeating-linear-gradient(135deg, ${colors.night1} 0 26px, #241626 26px 52px)`,
      alignItems: "center",
      justifyContent: "center",
      border: `3px dashed ${colors.diya}`,
    }}
  >
    <div style={{ fontFamily: fonts.body, fontSize: 30, color: colors.diya, textAlign: "center", padding: 20 }}>
      [{kind} আসবে]
      <div style={{ fontSize: 24, color: colors.muted, marginTop: 6 }}>{label}</div>
    </div>
  </AbsoluteFill>
);
