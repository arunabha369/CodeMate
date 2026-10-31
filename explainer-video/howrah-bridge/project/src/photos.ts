// Real-photo slots (see ../research/photos.md). Each entry is filled by tools/fetch-photos.mjs only after
// the licence has been confirmed on the file page. `null` = not available yet → scenes use their drawn fallback.
export type Photo = {file: string; credit: string; license: string; url: string};
export const PHOTOS: Record<string, Photo | null> = {
  P01: null,
  P02: null,
  P03: null,
  P04: null,
  P05: null,
  P06: null,
  P07: null,
};
