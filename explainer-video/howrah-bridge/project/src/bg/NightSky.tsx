import React, {useMemo} from 'react';
import {C, H, W} from '../theme';
import {rng} from '../anim';

export const HORIZON = 640;

type Bld = {x: number; w: number; h: number; windows: {x: number; y: number; ph: number; tw: boolean}[]};

const makeSkyline = (seed: number, minH: number, maxH: number, minW: number, maxW: number, winProb: number): Bld[] => {
  const r = rng(seed);
  const out: Bld[] = [];
  let x = -30;
  while (x < W + 30) {
    const w = minW + r() * (maxW - minW);
    const h = minH + Math.pow(r(), 1.6) * (maxH - minH);
    const windows: Bld['windows'] = [];
    if (winProb > 0) {
      for (let wy = HORIZON - h + 10; wy < HORIZON - 8; wy += 16) {
        for (let wx = x + 6; wx < x + w - 8; wx += 12) {
          if (r() < winProb) windows.push({x: wx, y: wy, ph: r() * Math.PI * 2, tw: r() < 0.35});
        }
      }
    }
    out.push({x, w, h, windows});
    x += w + (r() < 0.25 ? r() * 18 : 0);
  }
  return out;
};

/** 0 = all windows lit, 1 = full wartime blackout (buildings go dark left→right with a little jitter). */
const litFactor = (b: Bld, i: number, blackout: number) => {
  if (blackout <= 0) return 1;
  const jitter = ((i * 37) % 11) / 11 - 0.5;
  const edge = blackout * 1.25 - 0.1;
  const t = (edge - (b.x / W + jitter * 0.12)) / 0.06;
  return 1 - Math.max(0, Math.min(1, t));
};

const Skyline: React.FC<{blds: Bld[]; fill: string; frame: number; windowOpacity?: number; blackout?: number}> = ({blds, fill, frame, windowOpacity = 1, blackout = 0}) => (
  <g>
    {blds.map((b, i) => {
      const lit = litFactor(b, i, blackout);
      return (
        <g key={i}>
          <rect x={b.x} y={HORIZON - b.h} width={b.w} height={b.h} fill={fill} />
          {lit > 0.01 &&
            b.windows.map((w, j) => (
              <rect
                key={j}
                x={w.x}
                y={w.y}
                width={4}
                height={5}
                fill={C.window}
                opacity={lit * windowOpacity * (w.tw ? 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(frame / 22 + w.ph)) : 0.75)}
              />
            ))}
        </g>
      );
    })}
  </g>
);

export type NightFx = {blackout?: number; beams?: number};

export const NightSky: React.FC<{frame: number; showCity?: boolean} & NightFx> = ({frame, showCity = true, blackout = 0, beams = 0}) => {
  const back = useMemo(() => makeSkyline(11, 70, 210, 40, 110, 0), []);
  const front = useMemo(() => makeSkyline(29, 30, 140, 26, 80, 0.16), []);
  const dust = useMemo(() => {
    const r = rng(5);
    return new Array(26).fill(0).map(() => ({x: r() * W, y: r() * H, s: 1 + r() * 2.2, v: 0.15 + r() * 0.4, o: 0.12 + r() * 0.25}));
  }, []);
  const streaks = useMemo(() => {
    const r = rng(77);
    return new Array(40).fill(0).map(() => ({x: r() * W, y: HORIZON + 12 + Math.pow(r(), 1.5) * 380, w: 20 + r() * 90, ph: r() * 6.28}));
  }, []);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="ns-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.skyTop} />
          <stop offset="0.45" stopColor={C.skyMid} />
          <stop offset="0.8" stopColor={C.skyLow} />
          <stop offset="0.96" stopColor={C.horizon} />
          <stop offset="1" stopColor={C.glow} />
        </linearGradient>
        <linearGradient id="ns-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.waterTop} />
          <stop offset="1" stopColor={C.waterDeep} />
        </linearGradient>
        <radialGradient id="ns-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={C.glow} stopOpacity={0.55} />
          <stop offset="1" stopColor={C.glow} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="ns-refl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={0.9} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="ns-beam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#FFF6DC" stopOpacity={0.34} />
          <stop offset="1" stopColor="#FFF6DC" stopOpacity={0} />
        </linearGradient>
        <mask id="ns-refl-mask">
          <rect x={0} y={HORIZON} width={W} height={H - HORIZON} fill="url(#ns-refl)" />
        </mask>
      </defs>
      <rect width={W} height={HORIZON} fill="url(#ns-sky)" />
      <ellipse cx={W / 2} cy={HORIZON} rx={1250} ry={150} fill="url(#ns-glow)" opacity={1 - blackout * 0.6} />
      <rect width={W} height={HORIZON} fill="#05040C" opacity={blackout * 0.35} />
      {beams > 0 && (
        <g opacity={beams}>
          {[0, 1, 2].map((k) => {
            // slow sweeps (period 6–9 s): calm, never flashing
            const a = -28 + k * 26 + Math.sin(frame / (58 + k * 13) + k * 2.1) * 22;
            return (
              <path
                key={k}
                d="M -10 0 L -95 -1150 L 95 -1150 L 10 0 Z"
                fill="url(#ns-beam)"
                transform={`translate(${380 + k * 560} ${HORIZON - 30}) rotate(${a})`}
              />
            );
          })}
        </g>
      )}
      {showCity && (
        <>
          <Skyline blds={back} fill={C.skylineBack} frame={frame} />
          <Skyline blds={front} fill={C.skyline} frame={frame} blackout={blackout} />
        </>
      )}
      <rect y={HORIZON} width={W} height={H - HORIZON} fill="url(#ns-water)" />
      {showCity && (
        <g mask="url(#ns-refl-mask)" opacity={0.3}>
          <g transform={`translate(0 ${HORIZON * 2}) scale(1 -1)`}>
            <Skyline blds={front} fill="#2a2a4a" frame={frame} windowOpacity={0.8} blackout={blackout} />
          </g>
        </g>
      )}
      <rect y={HORIZON} width={W} height={2} fill={C.glow} opacity={0.35} />
      {streaks.map((s, i) => (
        <rect key={i} x={s.x + Math.sin(frame / 40 + s.ph) * 14} y={s.y} width={s.w} height={1.5} fill="#8f86b8" opacity={0.1 + 0.12 * (0.5 + 0.5 * Math.sin(frame / 25 + s.ph))} />
      ))}
      {dust.map((d, i) => {
        const y = (((d.y - frame * d.v) % H) + H) % H;
        return <circle key={i} cx={d.x + Math.sin(frame / 60 + i) * 10} cy={y} r={d.s} fill="#fff" opacity={d.o} />;
      })}
    </svg>
  );
};
