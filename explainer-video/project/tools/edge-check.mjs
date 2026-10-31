// Renders tiny stills at the edge frames of every scene (first, last, end of cross-fade)
// and reports any frame that throws. Run before a long render.
import path from 'node:path';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition, openBrowser} from '@remotion/renderer';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const shell = '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const browserExecutable = fs.existsSync(shell) ? shell : null;
const timing = JSON.parse(execFileSync('node', [path.join(root, 'tools', 'timeline.mjs')]).toString());
const serveUrl = await bundle({entryPoint: path.join(root, 'src', 'index.ts')});
const browser = await openBrowser('chrome', {browserExecutable});
const comp = await selectComposition({serveUrl, id: 'Main', puppeteerInstance: browser, browserExecutable});
const frames = new Set();
for (const s of timing) for (const d of [0, 1, s.dur - 1, s.dur + 11]) frames.add(Math.min(comp.durationInFrames - 1, s.start + d));
const out = path.join(root, 'out', 'edge.png');
const bad = [];
for (const frame of [...frames].sort((a, b) => a - b)) {
  try {
    await renderStill({composition: comp, serveUrl, frame, output: out, puppeteerInstance: browser, browserExecutable, scale: 0.2, overwrite: true});
  } catch (e) {
    bad.push(frame);
    console.log('FAIL frame', frame, String(e.message).split('\n')[0]);
  }
}
await browser.close({silent: true});
console.log(`checked ${frames.size} frames, ${bad.length} failures`);
