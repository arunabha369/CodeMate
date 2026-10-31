import storyboard from "../../storyboard.json";
import durations from "../data/durations.json";

export type SceneTiming = {
  id: string;
  narration: string;
  leadInFrames: number;
  audioFrames: number;
  frames: number;
  estimated: boolean;
};

const SB = storyboard.scenes as Array<{ id: string; narration: string }>;
export const TRANSITION_FRAMES = durations.transitionFrames;
export const SCENE_IDS = SB.map((s) => s.id);

export const sceneTiming = (id: string): SceneTiming => {
  const d = durations.scenes.find((x) => x.id === id);
  const s = SB.find((x) => x.id === id);
  if (!d || !s) throw new Error(`No timing for ${id}`);
  return { id, narration: s.narration, leadInFrames: d.leadInFrames, audioFrames: d.audioFrames, frames: d.frames, estimated: d.estimated };
};

/**
 * Frame (within the scene) where `phrase` is spoken, estimated from its
 * position in the narration. Works the same with real audio, since speech
 * runs at a roughly even pace; fine-tune with `offset`.
 */
export const cue = (id: string, phrase: string, offset = 0): number => {
  const t = sceneTiming(id);
  const idx = t.narration.indexOf(phrase);
  if (idx < 0) throw new Error(`Cue "${phrase}" not in ${id}`);
  return t.leadInFrames + Math.round((idx / t.narration.length) * t.audioFrames) + offset;
};

/** Frame when this scene's narration ends. */
export const audioEnd = (id: string): number => {
  const t = sceneTiming(id);
  return t.leadInFrames + t.audioFrames;
};
