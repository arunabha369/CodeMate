import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { colors } from "../theme";

export type ParticleKind = "embers" | "sparks" | "petals" | "snow" | "bokeh";

/**
 * Deterministic particle field. Every particle's path is a pure function of
 * (seed, index, frame), so renders are reproducible across workers.
 */
export const ParticleLayer: React.FC<{
  kind: ParticleKind;
  count?: number;
  seed?: string;
  opacity?: number;
  /** Origin for sparks (bursting outward). */
  origin?: { x: number; y: number };
  startFrame?: number;
}> = ({ kind, count = 60, seed = kind, opacity = 1, origin = { x: 960, y: 640 }, startFrame = 0 }) => {
  const frame = useCurrentFrame() - startFrame;
  if (frame < 0) return null;
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      <svg width={1920} height={1080}>
        <defs>
          <radialGradient id={`bokeh-${seed}`}>
            <stop offset="0%" stopColor={colors.diya} stopOpacity={0.9} />
            <stop offset="70%" stopColor={colors.gold} stopOpacity={0.5} />
            <stop offset="100%" stopColor={colors.gold} stopOpacity={0} />
          </radialGradient>
          <radialGradient id={`ember-${seed}`}>
            <stop offset="0%" stopColor="#FFE2A8" />
            <stop offset="45%" stopColor={colors.diya} />
            <stop offset="100%" stopColor={colors.diya} stopOpacity={0} />
          </radialGradient>
        </defs>
        {Array.from({ length: count }).map((_, i) => {
          const r = (k: string) => random(`${seed}-${k}-${i}`);
          if (kind === "bokeh") {
            // Large, soft, out-of-focus lights drifting slowly: depth for night scenes.
            const x = r("x") * 1920 + Math.sin(frame / (90 + r("p") * 60) + r("ph") * 6) * 60;
            const y = r("y") * 1080 + Math.cos(frame / (120 + r("q") * 60) + r("ph") * 6) * 40;
            const size = 24 + r("s") * 60;
            const a = 0.05 + 0.08 * r("a") + 0.03 * Math.sin(frame / 40 + i);
            return <circle key={i} cx={x} cy={y} r={size} fill={`url(#bokeh-${seed})`} opacity={a} />;
          }
          if (kind === "embers") {
            const life = 120 + r("life") * 120;
            const t = ((frame + r("off") * life) % life) / life;
            const x = r("x") * 1920 + Math.sin(frame / 25 + r("ph") * 6) * 30;
            const y = 1100 - t * (500 + r("h") * 600);
            const size = 2 + r("s") * 5;
            const a = Math.sin(t * Math.PI) * (0.5 + 0.5 * Math.sin(frame / 4 + i));
            return <circle key={i} cx={x} cy={y} r={size} fill={`url(#ember-${seed})`} opacity={Math.max(0, a)} />;
          }
          if (kind === "sparks") {
            const ang = r("a") * Math.PI * 2;
            const speed = 6 + r("v") * 14;
            const t = frame;
            const x = origin.x + Math.cos(ang) * speed * t;
            const y = origin.y + Math.sin(ang) * speed * t + 0.12 * t * t;
            const a = Math.max(0, 1 - t / (30 + r("l") * 30));
            return (
              <line
                key={i}
                x1={x}
                y1={y}
                x2={x - Math.cos(ang) * speed * 1.6}
                y2={y - Math.sin(ang) * speed * 1.6}
                stroke={i % 3 === 0 ? colors.gold : colors.diya}
                strokeWidth={2 + r("w") * 2}
                strokeLinecap="round"
                opacity={a}
              />
            );
          }
          if (kind === "petals") {
            const life = 240 + r("life") * 180;
            const t = ((frame + r("off") * life) % life) / life;
            const x = r("x") * 1920 + Math.sin(frame / 30 + r("ph") * 6) * 60;
            const y = -40 + t * 1160;
            const rot = frame * (1 + r("rot") * 2) + r("r0") * 360;
            const c = i % 2 ? colors.jaba : colors.sindoor;
            return (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx={9 + r("s") * 6}
                ry={5 + r("s") * 3}
                fill={c}
                opacity={0.75}
                transform={`rotate(${rot} ${x} ${y})`}
              />
            );
          }
          // snow
          const life = 300 + r("life") * 200;
          const t = ((frame + r("off") * life) % life) / life;
          const x = r("x") * 1920 + Math.sin(frame / 40 + r("ph") * 6) * 25;
          const y = -20 + t * 1120;
          return <circle key={i} cx={x} cy={y} r={1.5 + r("s") * 2.5} fill={colors.cream} opacity={0.65} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};
