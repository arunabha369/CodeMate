// Bundle once, then render one still per showcase demo into out/stills/.
// Usage: node scripts/render_showcase.mjs [demo ...]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";

const DEMOS = {
  night: 60, parchment: 60, gold: 60, chapter: 40, "chapter-red": 40,
  "map-full": 60, "map-wb": 60, "map-birbhum": 60, "map-bd": 60, "map-rain": 70, "map-thread": 80,
  "map-temples": 40, "map-cracks": 30, "photo-inset": 40, grid: 120, ring: 80,
  "ring-kali": 60, chakra: 20, counts: 60, "count-single": 40, dialogue: 90,
  quote: 80, lowerthird: 40, stat: 60, "diya-out": 30, "broll-captions": 120,
};
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const only = process.argv.slice(2);
const shell = "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const browserExecutable = fs.existsSync(shell) ? shell : null;
const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.ts") });
fs.mkdirSync(path.join(root, "out/stills"), { recursive: true });
for (const [demo, frame] of Object.entries(DEMOS)) {
  if (only.length && !only.includes(demo)) continue;
  const inputProps = { demo };
  const composition = await selectComposition({ serveUrl, id: "Showcase", inputProps, browserExecutable });
  const output = path.join(root, `out/stills/${demo}.png`);
  await renderStill({ composition, serveUrl, output, frame, inputProps, browserExecutable, overwrite: true });
  console.log("rendered", demo);
}
