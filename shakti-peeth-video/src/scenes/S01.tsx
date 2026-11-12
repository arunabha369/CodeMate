import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { asset } from "../lib/assets";
import { hookCue } from "../lib/hookCues";
import { sceneTiming } from "../lib/timing";
import { colors, fonts } from "../theme";

const ID = "S01";

/**
 * Hook. Five full-screen photos, hard-cut on the narration (cut on the region word, title lands
 * on the place name): punch-in zoom, light flash, giant title, and a route line that fills
 * across the top as the journey jumps from Kolkata to Tibet. Cue frames come from the audio
 * itself (scripts/hook_cues.py), so the cuts stay tight with any voice.
 */
const SHOTS = [
  { key: "photo-kalighat", cut: "কলকাতার", at: "কালীঘাট", name: "কালীঘাট", place: "কলকাতা · ভারত", pos: "50% 38%", short: "কালীঘাট" },
  { key: "photo-kamakhya", cut: "অসমের", at: "কামাখ্যা", name: "কামাখ্যা", place: "অসম · ভারত", pos: "50% 45%", short: "কামাখ্যা" },
  { key: "photo-hinglaj", cut: "পাকিস্তানের", at: "হিংলাজ", name: "হিংলাজ", place: "বালুচিস্তান · পাকিস্তান", pos: "50% 50%", short: "হিংলাজ" },
  { key: "photo-nainativu", cut: "শ্রীলঙ্কার", at: "নয়নাতিভু", name: "নয়নাতিভু", place: "জাফনা · শ্রীলঙ্কা", pos: "50% 40%", short: "নয়নাতিভু" },
  { key: "photo-manasarovar", cut: "এমনকি", at: "মানস", name: "মানস সরোবর", place: "তিব্বত", pos: "50% 55%", short: "মানস সরোবর" },
] as const;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Shot: React.FC<{ i: number; f: number; len: number; nameAt: number }> = ({ i, f, len, nameAt }) => {
  const { fps } = useVideoConfig();
  const s = SHOTS[i];
  const a = asset(s.key);
  // Punch in fast, then keep pushing slowly; alternate the drift direction per shot.
  const punch = interpolate(f, [0, 11], [1, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const scale = 1.1 + 0.24 * punch + 0.07 * (f / len);
  const dir = i % 2 === 0 ? 1 : -1;
  const dx = dir * (26 * punch - 22 * (f / len));
  const nameIn = spring({ frame: f - nameAt, fps, config: { damping: 14, stiffness: 190, mass: 0.7 } });
  const placeIn = interpolate(f, [2, 10], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const rule = interpolate(f, [nameAt + 4, nameAt + 18], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: colors.night0, overflow: "hidden" }}>
      {a.src ? (
        <Img
          src={staticFile(a.src)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: s.pos,
            transform: `translateX(${dx}px) scale(${scale}) rotate(${dir * 0.8 * punch}deg)`,
            filter: `blur(${7 * punch}px) saturate(1.12) contrast(1.06)`,
          }}
        />
      ) : null}
      {/* Legibility: dark from the left and from below, plus a vignette. */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(10,9,16,0.88) 0%, rgba(10,9,16,0.45) 42%, rgba(10,9,16,0.05) 72%), linear-gradient(0deg, rgba(10,9,16,0.85) 0%, transparent 42%), linear-gradient(180deg, rgba(10,9,16,0.7) 0%, transparent 22%)",
        }}
      />
      {/* Title block */}
      <div style={{ position: "absolute", left: 110, bottom: 170, right: 200 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: placeIn, transform: `translateX(${(1 - placeIn) * -40}px)` }}>
          <div style={{ width: 14, height: 46, background: colors.sindoor }} />
          <div style={{ fontFamily: fonts.body, fontSize: 44, fontWeight: 600, color: colors.cream, textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>{s.place}</div>
        </div>
        <div style={{ overflow: "hidden", paddingTop: 30, marginTop: -6 }}>
          <div
            style={{
              fontFamily: fonts.heading,
              fontSize: 232,
              lineHeight: 1.16,
              color: colors.cream,
              textShadow: "0 8px 0 rgba(0,0,0,0.55), 0 0 60px rgba(0,0,0,0.75)",
              transform: `translateY(${(1 - nameIn) * 115}%) scale(${1.08 - 0.08 * nameIn})`,
              transformOrigin: "0% 100%",
              opacity: f >= nameAt ? 1 : 0,
              whiteSpace: "nowrap",
            }}
          >
            {s.name}
          </div>
        </div>
        <div style={{ height: 8, width: 520 * rule, background: `linear-gradient(90deg, ${colors.gold}, ${colors.diya})`, marginTop: 6, boxShadow: `0 0 24px ${colors.diya}` }} />
      </div>
      {a.credit ? (
        <div style={{ position: "absolute", right: 34, bottom: 22, fontFamily: fonts.body, fontSize: 17, color: colors.muted, textShadow: "0 1px 3px rgba(0,0,0,0.95)" }}>{a.credit}</div>
      ) : null}
      {/* Cut flash + a light sweep */}
      <AbsoluteFill style={{ background: `linear-gradient(120deg, #fff 0%, ${colors.gold} 100%)`, opacity: interpolate(f, [0, 7], [i === 0 ? 0 : 0.85, 0], clamp), mixBlendMode: "screen" }} />
      <div
        style={{
          position: "absolute",
          top: -200,
          bottom: -200,
          width: 260,
          left: interpolate(f, [0, 16], [-400, 2200], clamp),
          background: "linear-gradient(90deg, transparent, rgba(255,244,226,0.38), transparent)",
          transform: "skewX(-18deg)",
          opacity: f < 17 ? 1 : 0,
        }}
      />
    </AbsoluteFill>
  );
};

/** Route line across the top: one node per place, filling as the narration jumps. */
const Route: React.FC<{ cuts: number[]; frame: number }> = ({ cuts, frame }) => {
  const x0 = 700;
  const x1 = 1790;
  const y = 92;
  const xs = SHOTS.map((_, i) => x0 + ((x1 - x0) * i) / (SHOTS.length - 1));
  // progress in "node units": moves to node i over 12 frames after cut i
  let prog = 0;
  cuts.forEach((c, i) => {
    if (i > 0) prog += interpolate(frame, [c, c + 12], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  });
  const head = x0 + ((x1 - x0) * prog) / (SHOTS.length - 1);
  return (
    <svg width={1920} height={220} style={{ position: "absolute", left: 0, top: 0 }}>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke="rgba(255,244,226,0.3)" strokeWidth={3} strokeDasharray="2 12" strokeLinecap="round" />
      <line x1={x0} y1={y} x2={head} y2={y} stroke={colors.gold} strokeWidth={5} strokeLinecap="round" />
      {SHOTS.map((s, i) => {
        const on = interpolate(frame, [cuts[i] + (i === 0 ? 0 : 8), cuts[i] + (i === 0 ? 8 : 16)], [0, 1], clamp);
        const active = i === cuts.filter((c) => frame >= c).length - 1;
        const pulse = active ? 0.5 + 0.5 * Math.sin(frame / 4) : 0;
        return (
          <g key={s.key}>
            {active ? <circle cx={xs[i]} cy={y} r={20 + 8 * pulse} fill="none" stroke={colors.diya} strokeWidth={3} opacity={0.75 - 0.4 * pulse} /> : null}
            <circle cx={xs[i]} cy={y} r={7 + 6 * on} fill={on > 0.5 ? colors.gold : colors.night0} stroke={on > 0 ? colors.gold : "rgba(255,244,226,0.5)"} strokeWidth={3} />
            <text
              x={xs[i]}
              y={y + 58}
              textAnchor={i === SHOTS.length - 1 ? "end" : i === 0 ? "start" : "middle"}
              dx={i === SHOTS.length - 1 ? 16 : i === 0 ? -16 : 0}
              fontFamily={fonts.body}
              fontSize={29}
              fontWeight={active ? 700 : 500}
              fill={active ? colors.gold : colors.cream}
              opacity={0.35 + 0.65 * on}
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
            >
              {s.short}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const S01: React.FC = () => {
  const frame = useCurrentFrame();
  const t = sceneTiming(ID);
  const cuts = SHOTS.map((s, i) => (i === 0 ? 0 : hookCue(ID, s.cut)));
  const names = SHOTS.map((s) => hookCue(ID, s.at));
  const i = Math.max(0, cuts.filter((c) => frame >= c).length - 1);
  const end = i < SHOTS.length - 1 ? cuts[i + 1] : t.frames;
  return (
    <AbsoluteFill style={{ backgroundColor: colors.night0 }}>
      <Shot key={i} i={i} f={frame - cuts[i]} len={end - cuts[i]} nameAt={Math.max(3, names[i] - cuts[i] - 5)} />
      {/* Topic tag: tells a scrolling viewer what this is in the first frame. */}
      <div style={{ position: "absolute", left: 110, top: 62, display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ background: colors.sindoor, color: colors.cream, fontFamily: fonts.heading, fontSize: 52, lineHeight: 1, padding: "10px 18px 4px", borderRadius: 6, boxShadow: "0 6px 24px rgba(193,18,31,0.55)" }}>৫১</div>
        <div style={{ fontFamily: fonts.heading, fontSize: 52, color: colors.cream, textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>সতীপীঠ</div>
      </div>
      <Route cuts={cuts} frame={frame} />
    </AbsoluteFill>
  );
};
