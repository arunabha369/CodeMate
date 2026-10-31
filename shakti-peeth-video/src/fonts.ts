import { continueRender, delayRender, staticFile } from "remotion";
import manifest from "./data/fonts.json";

/**
 * Tiro Bangla (headings) and Hind Siliguri (body, labels, captions), the
 * Google Fonts files (OFL) served from public/fonts so renders need no
 * network. Re-download with `node scripts/fetch_fonts.cjs`.
 */
export const FONT_HEADING = "Tiro Bangla";
export const FONT_BODY = "Hind Siliguri";

type FontEntry = { family: string; weight: string; unicodeRange: string; file: string };

let loading: Promise<void> | null = null;

const loadAll = () => {
  if (loading) return loading;
  const handle = delayRender("Loading Bengali fonts");
  loading = Promise.all(
    (manifest as FontEntry[]).map(async (f) => {
      const face = new FontFace(f.family, `url(${staticFile(f.file)}) format("woff2")`, {
        weight: f.weight,
        style: "normal",
        unicodeRange: f.unicodeRange,
      });
      await face.load();
      document.fonts.add(face);
    }),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      // Fail loudly: a render with fallback system fonts would break Bengali conjuncts.
      throw err;
    });
  return loading;
};

if (typeof document !== "undefined") {
  loadAll();
}
