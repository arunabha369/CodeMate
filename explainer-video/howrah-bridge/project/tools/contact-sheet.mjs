// Renders stills at given frames (or every N seconds) and tiles them into a contact sheet.
// usage: node tools/contact-sheet.mjs <name> <frames|every:SECONDS|scenes:S01,S02> [cols]
import path from 'node:path';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition, openBrowser} from '@remotion/renderer';

const [, , name = 'sheet', spec = 'every:10', colsArg = '4'] = process.argv;
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outDir = path.join(root, 'out', 'stills', name);
fs.mkdirSync(outDir, {recursive: true});
const shell = '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const browserExecutable = fs.existsSync(shell) ? shell : null;
const serveUrl = await bundle({entryPoint: path.join(root, 'src', 'index.ts')});
const browser = await openBrowser('chrome', {browserExecutable});
const comp = await selectComposition({serveUrl, id: 'Main', puppeteerInstance: browser, browserExecutable});
let frames = [];
if (spec.startsWith('every:')) {
  const n = Math.round(parseFloat(spec.slice(6)) * comp.fps);
  for (let f = 0; f < comp.durationInFrames; f += n) frames.push(f);
} else if (spec.startsWith('scenes:')) {
  // 3 stills per scene: 30%, 60%, 92% through
  const timing = JSON.parse(execFileSync('node', [path.join(root, 'tools', 'timeline.mjs')]).toString());
  for (const id of spec.slice(7).split(',')) {
    const s = timing.find((t) => t.id === id);
    for (const p of [0.3, 0.6, 0.92]) frames.push(Math.round(s.start + s.dur * p));
  }
} else frames = spec.split(',').map(Number);
const files = [];
for (const [i, frame] of frames.entries()) {
  const file = path.join(outDir, `${String(i).padStart(3, '0')}_f${frame}.png`);
  await renderStill({composition: comp, serveUrl, frame, output: file, puppeteerInstance: browser, browserExecutable, scale: 0.5});
  files.push(file);
}
await browser.close({silent: true});
const cols = Number(colsArg);
const sheet = path.join(root, 'out', 'stills', `${name}.png`);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-pattern_type', 'glob', '-i', path.join(outDir, '*.png'), '-vf', `scale=480:-1,tile=${cols}x${Math.ceil(files.length / cols)}:padding=4:color=white`, '-frames:v', '1', sheet]);
console.log('frames', frames.join(','));
console.log(sheet);
