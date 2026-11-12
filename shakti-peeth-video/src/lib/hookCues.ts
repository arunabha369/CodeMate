import cues from "../data/hookCues.json";

/** Frame (scene-relative) when a hook phrase is spoken, measured from the audio by scripts/hook_cues.py. */
export const hookCue = (id: "S01" | "S02", phrase: string): number => {
  const f = (cues as Record<string, Record<string, number>>)[id]?.[phrase];
  if (f === undefined) throw new Error(`Hook cue "${phrase}" missing for ${id}: run scripts/hook_cues.py`);
  return f;
};
