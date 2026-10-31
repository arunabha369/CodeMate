// Render one still per scene from the film timeline (bundle once).
// Usage: node scripts/scene_stills.mjs <firstScene> <lastScene> [fraction=0.7] [fractions…]
// e.g.   node scripts/scene_stills.mjs 1 20 0.35 0.8   → out/stills/scenes/S01-35.png, S01-80.png …
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const [a = "1", b = "67", ...fr] = process.argv.slice(2);
const from = Number(a);
const to = Number(b);
const fractions = (fr.length ? fr : ["0.7"]).map(Number);
const durations = JSON.parse(fs.readFileSync(path.join(root, "src/data/durations.json"), "utf8"));
const T = durations.transitionFrames;
const scenes = durations.scenes.slice(from - 1, to);
const shell = "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const browserExecutable = fs.existsSync(shell) ? shell : null;
const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.ts") });
const inputProps = { from, to, captions: true };
const composition = await selectComposition({ serveUrl, id: "ShaktiPeeth", inputProps, browserExecutable });
const outDir = path.join(root, "out/stills/scenes");
fs.mkdirSync(outDir, { recursive: true });
let start = 0;
for (const s of scenes) {
  for (const f of fractions) {
    const frame = Math.min(composition.durationInFrames - 1, start + Math.round(s.frames * f));
    const output = path.join(outDir, `${s.id}-${Math.round(f * 100)}.png`);
    await renderStill({ composition, serveUrl, output, frame, inputProps, browserExecutable, overwrite: true, scale: 0.5 });
  }
  console.log("still", s.id);
  start += s.frames - T;
}
