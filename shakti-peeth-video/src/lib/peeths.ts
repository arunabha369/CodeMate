import data from "../data/peeths.json";

export type AltLocation = { placeBn: string; lat: number | null; lon: number | null; note?: string };

export type Peeth = {
  id: string;
  nameEn: string;
  nameBn: string;
  placeBn: string;
  regionBn: string;
  bodyPartBn: string;
  bodyPartDisputed?: boolean;
  shaktiBn: string;
  bhairavaBn: string;
  lat: number | null;
  lon: number | null;
  coordStatus: string | null;
  status: "standard" | "disputed" | "siddhapeeth";
  checked: string;
  altLocations?: AltLocation[];
  note?: string;
  sources: string[];
};

export const PEETHS = data.peeths as Peeth[];
export const EXTRA = data.extra as Peeth[];
export const LOCATED = PEETHS.filter((p) => p.lat !== null && p.lon !== null);
export const UNLOCATED = PEETHS.filter((p) => p.lat === null || p.lon === null);

export const byId = (id: string): Peeth => {
  const p = [...PEETHS, ...EXTRA].find((x) => x.id === id);
  if (!p) throw new Error(`Unknown peeth id: ${id}`);
  return p;
};
