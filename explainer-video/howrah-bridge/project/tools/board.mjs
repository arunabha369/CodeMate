// Style board: renders one still per listed scene (at a fraction of the scene) and tiles them 3×3.
// usage: node tools/board.mjs <name> S01@0.7,S08@0.6,...   (default fraction 0.65)
import path from 'node:path';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition, openBrowser} from '@remotion/renderer';

const [, , name = 'board', spec = '', colsArg = '3', scaleArg = '0.5'] = process.argv;
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outDir = path.join(root, 'out', 'stills', name);
fs.rmSync(outDir, {recursive: true, force: true});
fs.mkdirSync(outDir, {recursive: true});
const shell = '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const browserExecutable = fs.existsSync(shell) ? shell : null;
const timing = JSON.parse(execFileSync('node', [path.join(root, 'tools', 'timeline.mjs')]).toString());
const serveUrl = await bundle({entryPoint: path.join(root, 'src', 'index.ts')});
const browser = await openBrowser('chrome', {browserExecutable});
const comp = await selectComposition({serveUrl, id: 'Main', puppeteerInstance: browser, browserExecutable});
const items = spec.split(',').filter(Boolean).map((t) => {
  const [id, fr] = t.split('@');
  const s = timing.find((x) => x.id === id);
  if (!s) throw new Error('unknown scene ' + id);
  const p = fr ? parseFloat(fr) : 0.65;
  // "@f123" means an absolute local frame
  const local = fr && fr.startsWith('f') ? parseInt(fr.slice(1), 10) : Math.round(s.dur * p);
  return {id, frame: s.start + local};
});
const files = [];
for (const [i, it] of items.entries()) {
  const file = path.join(outDir, `${String(i).padStart(2, '0')}_${it.id}_f${it.frame}.png`);
  await renderStill({composition: comp, serveUrl, frame: it.frame, output: file, puppeteerInstance: browser, browserExecutable, scale: Number(scaleArg)});
  files.push(file);
  console.log('rendered', it.id, it.frame);
}
await browser.close({silent: true});
const cols = Number(colsArg);
const sheet = path.join(root, 'out', 'stills', `${name}.png`);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-pattern_type', 'glob', '-i', path.join(outDir, '*.png'), '-vf', `scale=640:-1,tile=${cols}x${Math.ceil(files.length / cols)}:padding=6:color=white`, '-frames:v', '1', sheet]);
console.log(sheet);
