import React, { useMemo } from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import land50m from "world-atlas/land-50m.json";
import { LOCATED, Peeth, UNLOCATED, byId } from "../lib/peeths";
import { shortName } from "../lib/bn";
import { colors, fonts, palettes } from "../theme";
import { Box } from "./PhotoKenBurns";
import { useBackdrop } from "./SceneBackdrop";

/*
 * HERO map. Borderless: one land path from Natural Earth (world-atlas
 * land-50m), coastline only — no countries, no state lines, no fills by
 * country. Place names are text labels only.
 */

export type Camera = { lon: number; lat: number; zoom: number };
export type CameraKey = Camera & { frame: number };

const FULL: Box = { x: 0, y: 0, w: 1920, h: 1080 };
// The brief's frame: lon 60–100, lat 4–38. Fitted via its corner points
// (a Polygon would depend on ring winding: counter-clockwise = whole globe).
const FRAME_GEO: Feature<Geometry> = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "MultiPoint",
    coordinates: [[60, 4], [100, 4], [100, 38], [60, 38]],
  },
};
export const DEFAULT_CAMERA: Camera = { lon: 80, lat: 22.5, zoom: 1 };

const landFeature = feature(
  land50m as unknown as Topology,
  (land50m as unknown as Topology).objects.land as GeometryCollection,
) as FeatureCollection | Feature;

/** Label side per peeth where the default (right) collides. */
const LABEL_SIDE: Record<string, "left" | "right" | "up" | "down"> = {
  kalighat: "left",
  vibhash: "left",
  ratnavali: "left",
  bakreshwar: "left",
  nalhati: "up",
  kankalitala: "down",
  nandipur: "left",
  attahas: "right",
  bahula: "right",
  jogadya: "down",
  ujani: "left",
  kiriteswari: "up",
  sugandha: "down",
  jeshore: "left",
  chattal: "right",
  shrishail: "right",
  jayanti: "up",
  shuchi: "left",
  kanyashram: "right",
  kalmadhav: "up",
  shona: "down",
};

const lerpCamera = (keys: CameraKey[], frame: number): Camera => {
  if (keys.length === 1 || frame <= keys[0].frame) return keys[0];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (frame <= b.frame) {
      const t = interpolate(frame, [a.frame, b.frame], [0, 1], { easing: Easing.inOut(Easing.cubic) });
      return {
        lon: a.lon + (b.lon - a.lon) * t,
        lat: a.lat + (b.lat - a.lat) * t,
        zoom: Math.exp(Math.log(a.zoom) + (Math.log(b.zoom) - Math.log(a.zoom)) * t),
      };
    }
  }
  return keys[keys.length - 1];
};

/** Nearest-neighbour tour from the westernmost dot — the "golden thread". */
const threadOrder = (pts: Array<{ id: string; x: number; y: number }>) => {
  if (pts.length === 0) return [];
  const rest = [...pts];
  rest.sort((a, b) => a.x - b.x);
  const tour = [rest.shift()!];
  while (rest.length) {
    const last = tour[tour.length - 1];
    let best = 0;
    let bestD = Infinity;
    rest.forEach((p, i) => {
      const d = (p.x - last.x) ** 2 + (p.y - last.y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    tour.push(rest.splice(best, 1)[0]);
  }
  return tour;
};

export const PeethMap: React.FC<{
  variant?: "night" | "gold";
  box?: Box;
  camera?: Camera | CameraKey[];
  /** Which dots to draw. */
  dots?: "all" | "none" | string[];
  /** Ids that light up bigger with a label; `highlightAt` gives the frame each lights (default 0). */
  highlight?: string[];
  highlightAt?: number[];
  /** Extra ids to label without highlighting. */
  labels?: string[];
  /** Label the highlighted dots (default true). Set false for dense overviews (S56). */
  labelHighlights?: boolean;
  /** Replace a dot's label, e.g. the place name the narration uses ("নয়নাতিভু" for Lanka). */
  labelText?: Record<string, string>;
  labelSize?: number;
  /** Dots arrive one by one; `fall` = drop distance in px (0 = fade in place). */
  rainIn?: { start: number; perDot: number; fall?: number; /** Each dot pops in with a bright expanding ring (hook). */ burst?: boolean };
  /** Multiplies every dot's size (default 1). */
  dotSize?: number;
  thread?: { start: number; duration: number };
  /** Dots morph into tiny temple icons from this frame. */
  templesAt?: number;
  /** Light cracks across the land (S31). */
  cracksAt?: number;
  shake?: { start: number; amplitude: number };
  showNote?: boolean;
  showTray?: boolean;
  /** Show dashed alternative sites for highlighted disputed peeths. */
  showAlt?: boolean;
  dotOpacity?: number;
  twinkle?: boolean;
  border?: boolean;
}> = ({
  variant = "night",
  box = FULL,
  camera = DEFAULT_CAMERA,
  dots = "all",
  highlight = [],
  highlightAt,
  labels = [],
  labelHighlights = true,
  labelText = {},
  labelSize = 30,
  rainIn,
  dotSize = 1,
  thread,
  templesAt,
  cracksAt,
  shake,
  showNote = false,
  showTray = false,
  showAlt = true,
  dotOpacity = 1,
  twinkle = true,
  border = false,
}) => {
  const frame = useCurrentFrame();
  const pal = palettes[variant];
  // Over a scene backdrop the land is slightly see-through, so the image reads behind the map.
  const backdrop = useBackdrop();
  const night = variant === "night";

  // Base projection: the brief's lon 60–100 / lat 4–38 frame fitted into the box.
  const { project, landPath } = useMemo(() => {
    const pad = Math.min(box.w, box.h) * 0.04;
    const proj = geoMercator().fitExtent(
      [
        [box.x + pad, box.y + pad],
        [box.x + box.w - pad, box.y + box.h - pad],
      ],
      FRAME_GEO,
    );
    // Generous clip so panning/zooming never reveals an edge.
    proj.clipExtent([
      [box.x - box.w * 1.5, box.y - box.h * 1.5],
      [box.x + box.w * 2.5, box.y + box.h * 2.5],
    ]);
    const d = geoPath(proj)(landFeature) ?? "";
    return { project: (lon: number, lat: number) => proj([lon, lat]) as [number, number], landPath: d };
  }, [box.x, box.y, box.w, box.h]);

  const cam = Array.isArray(camera) ? lerpCamera(camera, frame) : camera;
  const [cx0, cy0] = project(cam.lon, cam.lat);
  const bx = box.x + box.w / 2;
  const by = box.y + box.h / 2;
  const toScreen = (lon: number, lat: number): [number, number] => {
    const [px, py] = project(lon, lat);
    return [bx + (px - cx0) * cam.zoom, by + (py - cy0) * cam.zoom];
  };
  const groupTransform = `translate(${bx} ${by}) scale(${cam.zoom}) translate(${-cx0} ${-cy0})`;

  let shakeX = 0;
  let shakeY = 0;
  if (shake && frame >= shake.start) {
    const t = frame - shake.start;
    shakeX = shake.amplitude * Math.sin(t * 2.3) * Math.sin(t * 0.37);
    shakeY = shake.amplitude * Math.cos(t * 1.9) * Math.sin(t * 0.29 + 1);
  }

  const visible: Peeth[] =
    dots === "none" ? [] : dots === "all" ? LOCATED : LOCATED.filter((p) => dots.includes(p.id));
  const dotScale = 1 + 0.18 * Math.log2(Math.max(1, cam.zoom));
  const clipId = `mapclip-${box.x}-${box.y}-${box.w}`;
  const landClipId = `landclip-${box.x}-${box.y}-${box.w}`;

  // Rain-in order: deterministic shuffle so dots land all over the map.
  const rainRank = useMemo(() => {
    const ids = LOCATED.map((p) => p.id);
    const ranked = [...ids].sort((a, b) => random(`rain-${a}`) - random(`rain-${b}`));
    return Object.fromEntries(ranked.map((id, i) => [id, i]));
  }, []);

  const screenPts = visible.map((p) => {
    const [x, y] = toScreen(p.lon as number, p.lat as number);
    return { id: p.id, x, y };
  });

  // Golden thread
  let threadEl: React.ReactNode = null;
  if (thread && frame >= thread.start) {
    const tour = threadOrder(screenPts);
    let len = 0;
    for (let i = 1; i < tour.length; i++) len += Math.hypot(tour[i].x - tour[i - 1].x, tour[i].y - tour[i - 1].y);
    const prog = interpolate(frame, [thread.start, thread.start + thread.duration], [0, 1], {
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad),
    });
    const d = tour.map((p, i) => `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
    threadEl = (
      <g>
        <path d={d} fill="none" stroke={colors.gold} strokeWidth={6} opacity={0.25} filter="url(#mapGlow)" strokeDasharray={len} strokeDashoffset={len * (1 - prog)} />
        <path d={d} fill="none" stroke={colors.gold} strokeWidth={2} strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - prog)} />
      </g>
    );
  }

  // Light cracks (S31): random polylines from the centre, clipped to land.
  let cracksEl: React.ReactNode = null;
  if (cracksAt !== undefined && frame >= cracksAt) {
    const t = frame - cracksAt;
    cracksEl = (
      <g clipPath={`url(#${landClipId})`}>
        {Array.from({ length: 9 }).map((_, i) => {
          let x = bx;
          let y = by;
          let a = random(`crack-a-${i}`) * Math.PI * 2;
          const pts: string[] = [`M ${x} ${y}`];
          for (let k = 0; k < 7; k++) {
            a += (random(`crack-t-${i}-${k}`) - 0.5) * 1.1;
            const step = 50 + random(`crack-s-${i}-${k}`) * 70;
            x += Math.cos(a) * step;
            y += Math.sin(a) * step;
            pts.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`);
          }
          const len = 900;
          const p = interpolate(t, [i * 4, i * 4 + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <path key={i} d={pts.join(" ")} fill="none" stroke={colors.diya} strokeWidth={3} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} filter="url(#mapGlow)" />
          );
        })}
      </g>
    );
  }

  const temples = templesAt !== undefined ? interpolate(frame, [templesAt, templesAt + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;

  // Label placement: try the preferred side, then the others, and keep the
  // first spot that doesn't overlap a label already placed or a lit dot.
  type Side = "left" | "right" | "up" | "down";
  type Rect = { x0: number; y0: number; x1: number; y1: number };
  const overlaps = (a: Rect, b: Rect) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;
  const labelIds = [...new Set([...(labelHighlights ? highlight : []), ...labels])].filter((id) =>
    visible.some((p) => p.id === id),
  );
  const placed: Rect[] = [];
  // Labels must not sit on any lit or labelled dot.
  const avoidIds = [...new Set([...highlight, ...labelIds])].filter((id) => visible.some((p) => p.id === id));
  const dotRects: Array<Rect & { id: string }> = avoidIds.map((id) => {
    const pt = screenPts[visible.findIndex((p) => p.id === id)];
    const r = 11 * dotScale;
    return { id, x0: pt.x - r, y0: pt.y - r, x1: pt.x + r, y1: pt.y + r };
  });
  const placements = labelIds.map((id) => {
    const pt = screenPts[visible.findIndex((p) => p.id === id)];
    const isHi = highlight.includes(id);
    const size = isHi ? labelSize : labelSize * 0.8;
    const text = labelText[id] ?? shortName(byId(id).nameBn);
    const w = text.length * size * 0.5;
    const h = size * 1.15;
    const off = 14 * dotScale;
    const rectFor = (side: Side, nudge = 0): Rect & { tx: number; ty: number; anchor: "start" | "end" | "middle" } => {
      if (side === "right") return { x0: pt.x + off, y0: pt.y - h / 2 + nudge, x1: pt.x + off + w, y1: pt.y + h / 2 + nudge, tx: pt.x + off, ty: pt.y + size * 0.34 + nudge, anchor: "start" };
      if (side === "left") return { x0: pt.x - off - w, y0: pt.y - h / 2 + nudge, x1: pt.x - off, y1: pt.y + h / 2 + nudge, tx: pt.x - off, ty: pt.y + size * 0.34 + nudge, anchor: "end" };
      if (side === "up") return { x0: pt.x - w / 2, y0: pt.y - off - h + nudge, x1: pt.x + w / 2, y1: pt.y - off + nudge, tx: pt.x, ty: pt.y - off - size * 0.2 + nudge, anchor: "middle" };
      return { x0: pt.x - w / 2, y0: pt.y + off + nudge, x1: pt.x + w / 2, y1: pt.y + off + h + nudge, tx: pt.x, ty: pt.y + off + size * 0.85 + nudge, anchor: "middle" };
    };
    const pref: Side = LABEL_SIDE[id] ?? "right";
    const order: Side[] = [pref, ...(["right", "left", "up", "down"] as Side[]).filter((x) => x !== pref)];
    const free = (r: Rect) => !placed.some((q) => overlaps(q, r)) && !dotRects.some((d) => d.id !== id && overlaps(d, r));
    let best = order.map((sd) => rectFor(sd)).find(free);
    // Nothing free: push the preferred side down/up until it clears.
    for (let k = 1; !best && k <= 6; k++) {
      best = [rectFor(pref, k * h * 0.9), rectFor(pref, -k * h * 0.9)].find(free);
    }
    const chosen = best ?? rectFor(pref);
    placed.push(chosen);
    const hiIdx = highlight.indexOf(id);
    const hiStart = hiIdx >= 0 ? (highlightAt?.[hiIdx] ?? 0) : 0;
    const o = interpolate(frame, [hiStart + 4, hiStart + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return { id, text, size, strong: isHi, o, ...chosen };
  });

  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <defs>
        <clipPath id={clipId}>
          <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={box === FULL ? 0 : 18} />
        </clipPath>
        <clipPath id={landClipId}>
          <path d={landPath} transform={groupTransform} />
        </clipPath>
        <filter id="mapGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={5} />
        </filter>
        <radialGradient id="dotGlow">
          <stop offset="0%" stopColor={night ? colors.diya : colors.sindoor} stopOpacity={0.65} />
          <stop offset="100%" stopColor={night ? colors.diya : colors.sindoor} stopOpacity={0} />
        </radialGradient>
      </defs>
      <g clipPath={`url(#${clipId})`} transform={`translate(${shakeX} ${shakeY})`}>
        {box !== FULL ? (
          <rect x={box.x} y={box.y} width={box.w} height={box.h} fill={night ? "rgba(10,9,16,0.85)" : "rgba(247,239,221,0.95)"} />
        ) : null}
        {/* land + coastline glow */}
        <g transform={groupTransform}>
          <path d={landPath} fill="none" stroke={pal.coast} strokeWidth={night ? 7 : 4} opacity={night ? 0.35 : 0.2} filter="url(#mapGlow)" vectorEffect="non-scaling-stroke" />
          <path d={landPath} fill={pal.land} fillOpacity={backdrop ? 0.72 : 1} stroke={pal.coast} strokeWidth={1.6} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </g>
        {cracksEl}
        {threadEl}
        {/* alternative sites of highlighted disputed peeths */}
        {showAlt
          ? highlight.flatMap((id) => {
              const p = byId(id);
              if (p.status !== "disputed" || !p.altLocations || p.lat === null || p.lon === null) return [];
              const [x0, y0] = toScreen(p.lon, p.lat);
              return p.altLocations
                .filter((a) => a.lat !== null && a.lon !== null)
                .map((a, i) => {
                  const [x, y] = toScreen(a.lon as number, a.lat as number);
                  const inBox = (px: number, py: number) => px >= box.x && px <= box.x + box.w && py >= box.y && py <= box.y + box.h;
                  return (
                    <g key={`alt-${id}-${i}`} opacity={0.85}>
                      {inBox(x0, y0) && inBox(x, y) ? (
                        <line x1={x0} y1={y0} x2={x} y2={y} stroke={pal.subtext} strokeWidth={1.5} strokeDasharray="4 6" />
                      ) : null}
                      <circle cx={x} cy={y} r={8 * dotScale} fill="none" stroke={pal.accent} strokeWidth={2} strokeDasharray="3 4" />
                    </g>
                  );
                });
            })
          : null}
        {/* dots */}
        {visible.map((p, i) => {
          const [x, y] = [screenPts[i].x, screenPts[i].y];
          const hiIdx = highlight.indexOf(p.id);
          const hiStart = hiIdx >= 0 ? (highlightAt?.[hiIdx] ?? 0) : 0;
          const hi =
            hiIdx >= 0
              ? interpolate(frame, [hiStart, hiStart + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
              : 0;
          let yy = y;
          let o = dotOpacity;
          let ripple = 0;
          let pop = 1;
          let burst = 0;
          if (rainIn) {
            const t0 = rainIn.start + rainRank[p.id] * rainIn.perDot;
            const fall = interpolate(frame, [t0, t0 + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });
            yy = y - (1 - fall) * (rainIn.fall ?? 300);
            o *= frame < t0 ? 0 : interpolate(frame, [t0, t0 + 4], [0, 1], { extrapolateRight: "clamp" });
            if (rainIn.burst && frame >= t0) {
              burst = interpolate(frame, [t0, t0 + 22], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
              pop = 1 + 1.6 * Math.max(0, 1 - (frame - t0) / 10);
            }
            ripple = (rainIn.fall ?? 300) > 0 && frame >= t0 + 18 ? interpolate(frame, [t0 + 18, t0 + 42], [0, 1], { extrapolateRight: "clamp" }) : 0;
          }
          const tw = twinkle ? 0.75 + 0.25 * Math.sin(frame / 9 + random(`tw-${p.id}`) * 6) : 1;
          const r = (4.5 + 3.5 * hi) * dotScale * dotSize * pop;
          const core = night ? (hi > 0 ? colors.cream : colors.gold) : hi > 0 ? colors.sindoor : colors.goldDeep;
          return (
            <g key={p.id} opacity={o}>
              {burst > 0 && burst < 1 ? (
                <circle cx={x} cy={yy} r={8 + burst * 58 * dotScale} fill="none" stroke={colors.diya} strokeWidth={3.5 * (1 - burst) + 0.5} opacity={1 - burst} />
              ) : null}
              {ripple > 0 && ripple < 1 ? (
                <circle cx={x} cy={yy} r={6 + ripple * 34} fill="none" stroke={colors.gold} strokeWidth={2} opacity={1 - ripple} />
              ) : null}
              <circle cx={x} cy={yy} r={(14 + 10 * hi) * dotScale * dotSize * (1 + 0.5 * (pop - 1))} fill="url(#dotGlow)" opacity={tw} />
              <g opacity={1 - temples}>
                <circle cx={x} cy={yy} r={r} fill={core} />
                {p.status === "disputed" ? (
                  <circle cx={x} cy={yy} r={r + 5 * dotScale} fill="none" stroke={pal.accent} strokeWidth={1.6} strokeDasharray="3 3" />
                ) : null}
                {hi > 0 ? (
                  <circle cx={x} cy={yy} r={r + (8 + 4 * Math.sin(frame / 6)) * dotScale} fill="none" stroke={colors.sindoor} strokeWidth={2.5} opacity={hi} />
                ) : null}
              </g>
              {temples > 0 ? (
                <g transform={`translate(${x} ${yy}) scale(${0.5 * dotScale})`} opacity={temples}>
                  <path d="M -12 14 L -12 0 C -12 -10 -5 -16 0 -20 C 5 -16 12 -10 12 0 L 12 14 Z" fill={core} stroke={night ? colors.night0 : colors.ivory} strokeWidth={1.5} />
                  <line x1={0} y1={-20} x2={0} y2={-26} stroke={core} strokeWidth={2} />
                </g>
              ) : null}
            </g>
          );
        })}
        {/* labels on top */}
        {placements.map((l) => (
          <text
            key={`l-${l.id}`}
            x={l.tx}
            y={l.ty}
            textAnchor={l.anchor}
            fontFamily={fonts.body}
            fontWeight={l.strong ? 600 : 500}
            fontSize={l.size}
            fill={night ? colors.cream : colors.ink}
            stroke={night ? "rgba(10,9,16,0.85)" : "rgba(247,239,221,0.95)"}
            strokeWidth={l.size * 0.22}
            paintOrder="stroke"
            strokeLinejoin="round"
            opacity={l.o}
          >
            {l.text}
          </text>
        ))}
      </g>
      {border ? (
        <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={18} fill="none" stroke={pal.panelBorder} strokeWidth={2} />
      ) : null}
      {showTray ? (
        <g transform={`translate(${box.x + 24} ${box.y + box.h - 30})`}>
          {UNLOCATED.map((p, i) => (
            <circle key={p.id} cx={10 + i * 22} cy={-8} r={6} fill="none" stroke={pal.accent} strokeWidth={2} strokeDasharray="3 3" />
          ))}
          <text x={10 + UNLOCATED.length * 22 + 6} y={0} fontFamily={fonts.body} fontSize={22} fill={pal.subtext}>
            স্থান অনির্ণীত: {UNLOCATED.map((p) => shortName(p.nameBn)).join(" · ")}
          </text>
        </g>
      ) : null}
      {showNote ? (
        <g transform={`translate(${box.x + box.w - 24} ${box.y + box.h - 30})`}>
          <text textAnchor="end" fontFamily={fonts.body} fontSize={22} fill={pal.subtext}>
            তালিকা ও স্থান নিয়ে মতভেদ আছে
          </text>
          <circle cx={-372} cy={-8} r={8} fill="none" stroke={pal.accent} strokeWidth={1.6} strokeDasharray="3 3" />
        </g>
      ) : null}
    </svg>
  );
};
