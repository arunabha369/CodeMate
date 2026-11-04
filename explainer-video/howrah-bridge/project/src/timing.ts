import {SCRIPT, ScriptScene, Bg} from './script.generated';
import voDurations from './vo-durations.json';
import voSentences from './vo-sentences.json';
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
/** Per scene: [startSec, endSec, charStart, charEnd] for each sentence, measured from the real voice-over. */
const SENT = voSentences as unknown as Record<string, [number, number, number, number][]>;

/** Seconds into the scene's VO at which character `idx` of its narration is spoken. */
const charToSec = (id: string, vo: string, voSec: number, idx: number) => {
  const rows = SENT[id];
  if (!rows || !rows.length) return (idx / vo.length) * voSec;
  for (const [a, b, i, e] of rows) {
    if (idx < i) return a; // in the gap before this sentence
    if (idx <= e) return a + ((idx - i) / Math.max(1, e - i)) * (b - a);
  }
  return rows[rows.length - 1][1];
};

/**
 * Placeholder speech estimate, used only until the real voice-over exists (~132 wpm, the usual pace of
 * Bengali neural TTS, plus pauses). Every cue is proportional to the scene's VO length, so all animation
 * re-times itself automatically once src/vo-durations.json holds the measured durations.
 */
export const estimateSeconds = (vo: string) => {
  const words = vo.trim().split(/\s+/).length;
  const stops = (vo.match(/[।?!]/g) ?? []).length;
  const soft = (vo.match(/[,—]/g) ?? []).length;
  return words / 2.2 + stops * 0.3 + soft * 0.12;
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
  // merge very short leftovers (1 word) into a neighbour, but never across a sentence end (। ? !)
  const merged: string[] = [];
  let carry = '';
  for (const c of out) {
    const one = c.split(/\s+/).length === 1;
    const prev = merged[merged.length - 1];
    if (one && prev && !/[।?!]$/.test(prev) && prev.split(/\s+/).length < 6) {
      merged[merged.length - 1] += ' ' + c;
    } else if (one && !/[।?!]$/.test(c)) {
      carry = carry ? carry + ' ' + c : c;
    } else {
      merged.push(carry ? carry + ' ' + c : c);
      carry = '';
    }
  }
  if (carry) merged.push(carry);
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
    let pos = 0;
    const chunks = texts.map((text) => {
      const i = Math.max(pos, s.vo.indexOf(text.split(' ')[0], pos));
      const e = i + text.length;
      pos = e;
      const from = LEAD_IN + Math.round(charToSec(s.id, s.vo, voSec, i) * FPS);
      const to = LEAD_IN + Math.round(charToSec(s.id, s.vo, voSec, e) * FPS);
      return {text, from, to: Math.max(to, from + 12)};
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

export type WorldName = 'night' | 'paper' | 'archive';
export const worldOf = (bg: Bg): WorldName => (bg.startsWith('night') ? 'night' : bg === 'archive' ? 'archive' : 'paper');

/** Frame (local to the scene) at which `phrase` is spoken. */
export const cueOf = (s: SceneTiming) => (phrase: string, offset = 0) => {
  const i = s.vo.indexOf(phrase);
  if (i < 0) {
    // Fail loudly in development so cues never silently drift.
    throw new Error(`Cue "${phrase}" not found in ${s.id}`);
  }
  const voSec = s.voFrames / FPS;
  return Math.round(LEAD_IN + charToSec(s.id, s.vo, voSec, i) * FPS) + offset;
};
