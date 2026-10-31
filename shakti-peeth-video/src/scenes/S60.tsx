import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { PeethMap } from "../components/PeethMap";
import { calm } from "../lib/anim";
import { cue } from "../lib/timing";
import { colors, fonts, palettes } from "../theme";
import { Chip } from "./shared";

const ID = "S60";
const ROWS: Array<[string, string, string, string]> = [
  ["bahula", "কেতুগ্রামের", "বহুলা · কেতুগ্রাম", "বাম বাহু"],
  ["jogadya", "ক্ষীরগ্রামের", "যোগাদ্যা · ক্ষীরগ্রাম", "ডান পায়ের বুড়ো আঙুল"],
  ["ujani", "উজানিতে", "মঙ্গলচণ্ডী · উজানি", ""],
];

/** Purba Bardhaman: three peeths on a close-up map, with name cards. */
export const S60: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = palettes.gold;
  const at = ROWS.map(([, phrase]) => cue(ID, phrase, -8));
  return (
    <AbsoluteFill>
      <Background variant="gold" />
      <PeethMap
        variant="gold"
        box={{ x: 0, y: 0, w: 1000, h: 1080 }}
        camera={{ lon: 87.98, lat: 23.57, zoom: 18 }}
        dots={["bahula", "jogadya", "ujani", "attahas"]}
        highlight={ROWS.map(([id]) => id)}
        highlightAt={at}
        labelText={{ bahula: "বহুলা", jogadya: "যোগাদ্যা", ujani: "উজানি" }}
        labelSize={34}
        showAlt={false}
      />
      <Chip text="পূর্ব বর্ধমান" at={0} x={80} y={80} font={fonts.heading} size={48} color={colors.ink} border={colors.goldDeep} bgColor="rgba(247,239,221,0.95)" />
      {ROWS.map(([id, , name, part], i) => {
        const s = calm(frame, fps, at[i]);
        return (
          <div
            key={id}
            style={{
              position: "absolute",
              left: 1080,
              top: 200 + i * 230,
              width: 760,
              padding: "26px 36px",
              borderRadius: 22,
              background: pal.panel,
              border: `3px solid ${i === 2 ? pal.panelBorder : colors.sindoor}`,
              borderStyle: id === "ujani" ? "dashed" : "solid",
              opacity: s,
              translate: `${(1 - s) * 50}px 0px`,
              boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
            }}
          >
            <div style={{ fontFamily: fonts.heading, fontSize: 56, color: colors.ink }}>{name}</div>
            {part ? <div style={{ fontFamily: fonts.body, fontWeight: 600, fontSize: 36, color: colors.sindoor }}>{part}</div> : null}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
