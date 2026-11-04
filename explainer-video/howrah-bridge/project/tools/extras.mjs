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
  ['S01', 'দুই পাড়ের দুটো হাত'],
  ['S06', 'ব্রিজের আগে: ভাসমান সেতু'],
  ['S13', 'নদীতে খুঁটি চলবে না · ক্যান্টিলিভার'],
  ['S24', 'মাটির নিচের লড়াই: কেসন'],
  ['S33', 'যুদ্ধ আর টাটার ইস্পাত'],
  ['S41', 'শূন্যে লোহা জোড়া'],
  ['S49', 'মাঝখানে মিলন'],
  ['S54', 'অন্ধকার শহর, নিঃশব্দ উদ্বোধন'],
  ['S59', 'রবীন্দ্র সেতু'],
  ['S62', 'এক কথায়'],
].map(([id, title]) => `${mmss(TIMELINE.find((s) => s.id === id).start)} ${title}`);

const md = `# YouTube upload kit: হাওড়া ব্রিজ কীভাবে তৈরি হলো

## Title options
1. হাওড়া ব্রিজ কীভাবে তৈরি হলো? নদীতে একটাও খুঁটি ছাড়া!
2. যুদ্ধের মধ্যে, নরম কাদার ওপর: হাওড়া ব্রিজ তৈরির আসল গল্প
3. দুই পাড় থেকে দুটো লোহার হাত — কীভাবে মিলল গঙ্গার মাঝখানে?

## Description
দুই পাড় থেকে দুটো লোহার হাত এগিয়ে আসছে গঙ্গার মাঝখানের দিকে — নিচে নদীতে একটাও খুঁটি নেই। কীভাবে তৈরি হয়েছিল হাওড়া ব্রিজ? ভাসমান পন্টুন সেতু থেকে শুরু করে মাটির ৩০ মিটার নিচে কেসন, যুদ্ধের মধ্যে টাটার "টিসক্রম" ইস্পাত, ক্রিপার ক্রেন, আর ১৯৪৩-এর সেই নিঃশব্দ উদ্বোধন — অ্যানিমেশনে পুরো গল্প।

পরের ভিডিও কোন স্থাপত্য নিয়ে চান? কমেন্টে লিখে জানান।

### Chapters
${chapters.join('\n')}

### Sources
- Wikipedia — Howrah Bridge; Bombing of Calcutta; Bradford Leslie
- Braithwaite, Burn & Jessop Construction Co. — bbjconst.com/howrah-bridge.html
- Tata Steel press release (2018) — "Kolkata celebrates 75 years of Howrah Bridge"
- Structurae — Howrah Bridge; The Constructor — Howrah Bridge case study
- Graces Guide — Howrah Pontoon Bridge; FIBIS wiki — Howrah Floating Bridge and Howrah Bridge
- The Quint, The News Minute (75th anniversary, 2018)

All illustrations and animation are original. Numbers marked "~" are approximate; sources differ slightly on some figures.

## Tags
হাওড়া ব্রিজ, রবীন্দ্র সেতু, হাওড়া ব্রিজ কীভাবে তৈরি, কলকাতা, ক্যান্টিলিভার সেতু, বাংলা এক্সপ্লেনার, কলকাতার ইতিহাস, টাটা স্টিল, Howrah Bridge, Rabindra Setu, Howrah Bridge construction, cantilever bridge, Kolkata history, Tata Steel Tiscrom, Bengali documentary

Length: ${mmss(TOTAL_FRAMES)}
`;
fs.writeFileSync(path.join(root, 'out', 'youtube.md'), md);
console.log('wrote out/captions.srt (' + n + ' cues) and out/youtube.md; length ' + mmss(TOTAL_FRAMES));
