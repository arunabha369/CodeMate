import {SCRIPT, ScriptScene, Bg} from './script.generated';
import voDurations from './vo-durations.json';
import {FPS} from './theme';

/** Frames before the narration starts in each scene. */
export const LEAD_IN = 8;
/** Frames after the narration ends before the next scene starts. */
export const LEAD_OUT = 10;
/** Cross-fade overlap: each scene keeps rendering this many frames into the next one. */
export const OVERLAP = 12;
/** Extra hold at the very end for the YouTube end screen. */
export const END_HOLD = 3 * FPS;

const VO = voDurations as Record<string, number>;

/** Placeholder speech estimate when no recorded/TTS file exists: ~156 wpm (brisk explainer pace) + pauses. */
export const estimateSeconds = (vo: string) => {
  const words = vo.trim().split(/\s+/).length;
  const stops = (vo.match(/[।?!]/g) ?? []).length;
  const soft = (vo.match(/[,—]/g) ?? []).length;
  return words / 2.6 + stops * 0.25 + soft * 0.1;
};

export type Chunk = {text: string; from: number; to: number};

export type SceneTiming = ScriptScene & {
  index: number;
  start: number; // absolute frame
  dur: number; // frames (without overlap)
  voFrames: number;
  hasAudio: boolean;
  chunks: Chunk[]; // local frames
};

/** Split narration into 2–6 word caption chunks at punctuation. */
export const chunkVo = (vo: string): string[] => {
  const parts = vo
    .replace(/\s+—\s+/g, ' — ')
    .split(/(?<=[,।?!])\s+|\s+(?=—)/)
    .map((p) => p.trim())
    .filter(Boolean);
  const out: string[] = [];
  for (const p of parts) {
    const w = p.split(/\s+/);
    if (w.length <= 6) {
      out.push(p);
      continue;
    }
    const n = Math.ceil(w.length / 5);
    const size = Math.ceil(w.length / n);
    for (let i = 0; i < w.length; i += size) out.push(w.slice(i, i + size).join(' '));
  }
  // merge very short leftovers (1 word) into the previous chunk
  const merged: string[] = [];
  for (const c of out) {
    if (merged.length && c.split(/\s+/).length === 1 && merged[merged.length - 1].split(/\s+/).length < 6) {
      merged[merged.length - 1] += ' ' + c;
    } else merged.push(c);
  }
  return merged;
};

const build = (): SceneTiming[] => {
  let t = 0;
  return SCRIPT.map((s, index) => {
    const hasAudio = typeof VO[s.id] === 'number';
    const voSec = hasAudio ? VO[s.id] : estimateSeconds(s.vo);
    const voFrames = Math.round(voSec * FPS);
    let dur = Math.max(3 * FPS, LEAD_IN + voFrames + LEAD_OUT);
    if (index === SCRIPT.length - 1) dur += END_HOLD;
    const texts = chunkVo(s.vo);
    const total = texts.reduce((a, c) => a + c.length, 0);
    let acc = 0;
    const chunks = texts.map((text) => {
      const from = LEAD_IN + Math.round((acc / total) * voFrames);
      acc += text.length;
      const to = LEAD_IN + Math.round((acc / total) * voFrames);
      return {text, from, to};
    });
    const st: SceneTiming = {...s, index, start: t, dur, voFrames, hasAudio, chunks};
    t += dur;
    return st;
  });
};

export const TIMELINE = build();
export const TOTAL_FRAMES = TIMELINE.reduce((a, s) => a + s.dur, 0);
export const byId = (id: string) => {
  const s = TIMELINE.find((x) => x.id === id);
  if (!s) throw new Error('Unknown scene ' + id);
  return s;
};

export const worldOf = (bg: Bg) => (bg.startsWith('night') ? 'night' : 'paper');

/** Frame (local to the scene) at which `phrase` is spoken. */
export const cueOf = (s: SceneTiming) => (phrase: string, offset = 0) => {
  const i = s.vo.indexOf(phrase);
  if (i < 0) {
    // Fail loudly in development so cues never silently drift.
    throw new Error(`Cue "${phrase}" not found in ${s.id}`);
  }
  return Math.round(LEAD_IN + (i / s.vo.length) * s.voFrames) + offset;
};
