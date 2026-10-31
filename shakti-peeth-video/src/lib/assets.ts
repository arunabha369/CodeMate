import registry from "../data/assets.json";

type Entry = { what: string; file: string | null; credit: string | null; licence: string | null };
const ASSETS = registry.assets as Record<string, Entry>;

/** Media for a scene: `src` is undefined until Phase 3 sources it (components then show a placeholder). */
export const asset = (key: string): { src?: string; label: string; credit: string } => {
  const e = ASSETS[key];
  if (!e) throw new Error(`Unknown asset key: ${key}`);
  return { src: e.file ?? undefined, label: e.what, credit: e.credit ?? "" };
};
