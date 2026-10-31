// Writes out/captions.srt and out/youtube.md from the real timeline.
import {build} from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const res = await build({entryPoints: [path.join(root, 'src', 'timing.ts')], bundle: true, write: false, format: 'esm', platform: 'node', loader: {'.json': 'json'}});
const {TIMELINE, TOTAL_FRAMES} = await import('data:text/javascript;base64,' + Buffer.from(res.outputFiles[0].text).toString('base64'));
const FPS = 30;
fs.mkdirSync(path.join(root, 'out'), {recursive: true});

const ts = (frames) => {
  const ms = Math.round((frames / FPS) * 1000);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const r = ms % 1000;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(r).padStart(3, '0')}`;
};
let n = 0;
const srt = [];
for (const s of TIMELINE) for (const c of s.chunks) srt.push(`${++n}\n${ts(s.start + c.from)} --> ${ts(s.start + c.to)}\n${c.text}\n`);
fs.writeFileSync(path.join(root, 'out', 'captions.srt'), srt.join('\n'));

const mmss = (frames) => {
  const t = Math.round(frames / FPS);
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
};
const chapters = [
  ['S01', 'নদীর নিচে ট্রেন?'],
  ['S05', 'আসল প্রশ্ন'],
  ['S07', 'দুই শহর, মাঝখানে নদী'],
  ['S13', 'ভেজা বালির পরীক্ষা'],
  ['S19', 'টানেল বোরিং মেশিন'],
  ['S28', 'খুঁড়তে খুঁড়তেই দেয়াল'],
  ['S34', '2017: গঙ্গা পারাপার'],
  ['S40', 'দেশের সবচেয়ে গভীর স্টেশন'],
  ['S42', 'আসল বিপদ: বউবাজার'],
  ['S49', 'অবশেষে খুলল'],
  ['S52', 'এক কথায়'],
].map(([id, title]) => `${mmss(TIMELINE.find((s) => s.id === id).start)} ${title}`);

const md = `# YouTube upload kit

## Title options
1. গঙ্গার নিচে মেট্রো: নদীর তলা দিয়ে ট্রেন চলে কীভাবে?
2. মাথার ওপর আস্ত নদী, তবু একফোঁটা জল নেই! কলকাতার আন্ডারওয়াটার মেট্রোর রহস্য
3. ৩০ টন চাপ সামলে নদীর নিচে সুড়ঙ্গ — কীভাবে বানানো হলো ভারতের প্রথম আন্ডারওয়াটার মেট্রো?

## Description
এই মুহূর্তে কলকাতার একটা ট্রেনের মাথার ওপর দিয়ে বয়ে যাচ্ছে আস্ত গঙ্গা — অথচ ভেতরে একফোঁটা জল নেই। কীভাবে নদীর নিচে খোঁড়া হলো ৫২০ মিটার লম্বা সুড়ঙ্গ? কী এই টানেল বোরিং মেশিন "প্রেরণা" আর "রচনা"? আর কেন সবচেয়ে বড় বিপদটা ঘটেছিল নদীতে নয়, বউবাজারের নিচে?

অ্যানিমেশনে দেখুন ভারতের প্রথম নদীর নিচের মেট্রোর পুরো গল্প।

এরপর কোন জিনিস কীভাবে কাজ করে জানতে চান? কমেন্টে লিখে জানান।

### Chapters
${chapters.join('\n')}

### Sources
- Wikipedia — East–West Metro Tunnel; Howrah metro station; Green Line (Kolkata Metro)
- railway-technology.com — East-West Metro underground twin tunnels
- The Week (Apr 2023) — "A 45-second ride"
- themetrorailguy.com — TBM S640 completes 2nd tunnel under Hooghly (Jun 2017)
- JICA / Embassy of Japan — Esplanade–Sealdah inauguration (22 Aug 2025)
- The Quint, The Statesman — Bowbazar 2019

## Tags
কলকাতা মেট্রো, আন্ডারওয়াটার মেট্রো, গঙ্গার নিচে মেট্রো, হাওড়া মেট্রো, ইস্ট ওয়েস্ট মেট্রো, টানেল বোরিং মেশিন, বউবাজার, বাংলা এক্সপ্লেনার, কীভাবে কাজ করে, Kolkata underwater metro, Howrah Maidan metro, East West Metro Kolkata, tunnel boring machine, Hooghly tunnel, Bengali explainer

Length: ${mmss(TOTAL_FRAMES)}
`;
fs.writeFileSync(path.join(root, 'out', 'youtube.md'), md);
console.log('wrote out/captions.srt (' + n + ' cues) and out/youtube.md; length ' + mmss(TOTAL_FRAMES));
