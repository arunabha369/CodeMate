import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { sceneTiming } from "../lib/timing";
import { colors, fonts } from "../theme";

/** Stand-in for scenes not built yet: shows the id and its narration. */
export const PendingScene: React.FC<{ id: string }> = ({ id }) => (
  <AbsoluteFill>
    <Background variant="night" />
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 24, padding: 160 }}>
      <div style={{ fontFamily: fonts.body, fontSize: 30, color: colors.diya }}>[{id} · দৃশ্য তৈরি হয়নি]</div>
      <div style={{ fontFamily: fonts.heading, fontSize: 52, lineHeight: 1.5, color: colors.cream, textAlign: "center" }}>
        {sceneTiming(id).narration}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
