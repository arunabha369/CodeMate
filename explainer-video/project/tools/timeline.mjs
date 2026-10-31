// Prints the scene timeline (start/dur in frames) as JSON, mirroring src/timing.ts.
import {build} from 'esbuild';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const res = await build({entryPoints: [path.join(root, 'src', 'timing.ts')], bundle: true, write: false, format: 'esm', platform: 'node', loader: {'.json': 'json'}});
const mod = await import('data:text/javascript;base64,' + Buffer.from(res.outputFiles[0].text).toString('base64'));
console.log(JSON.stringify(mod.TIMELINE.map((s) => ({id: s.id, start: s.start, dur: s.dur, bg: s.bg}))));
