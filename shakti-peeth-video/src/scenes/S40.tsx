import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Headline } from "../components/Headline";
import { cue } from "../lib/timing";
import { colors } from "../theme";

const ID = "S40";

/** Points along a question mark centred near (820, 470). */
const QMARK: Array<[number, number]> = (() => {
  const pts: Array<[number, number]> = [];
  const cx = 820;
  const cy = 360;
  const r = 140;
  for (let i = 0; i <= 26; i++) {
    const a = Math.PI + (i / 26) * (Math.PI * 1.45);
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  const [ex, ey] = pts[pts.length - 1];
  for (let i = 1; i <= 8; i++) {
    const t = i / 8;
    pts.push([ex + (cx - ex) * t, ey + (cy + 230 - ey) * t * t]);
  }
  for (let i = 1; i <= 4; i++) pts.push([cx, cy + 230 + i * 22]);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    pts.push([cx + Math.cos(a) * 14, cy + 420 + Math.sin(a) * 14]);
  }
  return pts;
})();

/** Dots fly in and build a question mark; they tremble on "একমত নয়". */
export const S40: React.FC = () => {
  const frame = useCurrentFrame();
  const shakeAt = cue(ID, "একমত নয়", -6);
  return (
    <AbsoluteFill>
      <Background variant="gold" />
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {QMARK.map(([x, y], i) => {
          const s = Math.floor(random(`q-${i}`) * 30);
          const p = interpolate(frame, [s, s + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
          const sx = random(`qx-${i}`) * 1920;
          const sy = random(`qy-${i}`) * 1080;
          const jit = frame > shakeAt ? Math.sin(frame * 1.7 + i) * 4 : 0;
          return <circle key={i} cx={sx + (x - sx) * p + jit} cy={sy + (y - sy) * p} r={i >= QMARK.length - 6 ? 9 : 8} fill={i % 4 ? colors.sindoor : colors.goldDeep} opacity={0.3 + 0.7 * p} />;
        })}
      </svg>
      <div style={{ position: "absolute", left: 1080, top: 420 }}>
        <Headline text="কত?" highlight="কত?" highlightColor="sindoor" bg="gold" align="left" size={150} start={cue(ID, "ঠিক কত", -6)} />
      </div>
    </AbsoluteFill>
  );
};
