// Downloads the real-photo slots listed below, but only after confirming each licence from the source itself.
//   Wikimedia Commons: licence + author come from the Commons API (extmetadata). Only PD / CC0 / CC BY / CC BY-SA pass.
//   Unsplash: the photo page must load without login (Unsplash+ photos need a paid licence and are refused).
// Writes public/photos/<slot>.jpg, public/photos/CREDITS.md and src/photos.ts.
// Needs network access to commons.wikimedia.org, upload.wikimedia.org, unsplash.com, images.unsplash.com.
// usage: node tools/fetch-photos.mjs
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outDir = path.join(root, 'public', 'photos');
fs.mkdirSync(outDir, {recursive: true});

// Candidate list from ../research/photos.md: first entry that passes wins.
const SLOTS = {
  P01: [{unsplash: 'KucspYX1Ft0'}],
  P02: [{commonsCategory: 'Howrah Pontoon Bridge', before: 1910}],
  P03: [{commonsCategory: 'Howrah Pontoon Bridge', before: 1945, skip: 1}],
  P04: [{commons: 'File:Howrah Bridge from Babu ghat.JPG'}, {commons: 'File:Howrah Bridge-Rabindra Setu.jpg'}, {commons: 'File:Howrah Bridge view 01.jpg'}],
  P05: [{commons: 'File:The Howrah Bridge, Kolkata, India.jpg'}, {commons: 'File:Howrah Bridge shot from Howrah Railway station.jpg'}],
  P06: [{unsplash: 'D8ADmv1IuKY'}, {unsplash: 'd2eVURGcqjc'}],
  P07: [{commons: 'File:Howrah Bridge, Calcutta in 1945.jpg'}],
};
const OK_LICENSE = /^(public domain|pd|cc0|cc by(-sa)? \d|cc-by(-sa)?-\d|no restrictions)/i;
const UA = {'User-Agent': 'howrah-explainer/1.0 (educational video; contact via repo)'};

const api = async (params) => {
  const u = new URL('https://commons.wikimedia.org/w/api.php');
  for (const [k, v] of Object.entries({format: 'json', origin: '*', ...params})) u.searchParams.set(k, String(v));
  const r = await fetch(u, {headers: UA});
  if (!r.ok) throw new Error(`Commons API ${r.status}`);
  return r.json();
};
const strip = (h = '') => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const commonsInfo = async (title) => {
  const j = await api({action: 'query', titles: title, prop: 'imageinfo', iiprop: 'url|extmetadata|size', iiurlwidth: 2400});
  const page = Object.values(j.query.pages)[0];
  const ii = page.imageinfo?.[0];
  if (!ii) return null;
  const m = ii.extmetadata ?? {};
  return {
    title,
    url: ii.thumburl ?? ii.url,
    page: ii.descriptionurl,
    license: strip(m.LicenseShortName?.value),
    author: strip(m.Artist?.value) || 'Unknown',
    date: strip(m.DateTimeOriginal?.value),
  };
};

const fromCategory = async (cat, before, skip = 0) => {
  const j = await api({action: 'query', list: 'categorymembers', cmtitle: `Category:${cat}`, cmtype: 'file', cmlimit: 50});
  const out = [];
  for (const m of j.query.categorymembers) {
    const info = await commonsInfo(m.title);
    if (!info || !OK_LICENSE.test(info.license)) continue;
    const yr = parseInt((info.date.match(/1[89]\d\d/) ?? [])[0] ?? '0', 10);
    if (before && (!yr || yr >= before)) continue;
    out.push(info);
  }
  return out[skip] ?? null;
};

const unsplash = async (id) => {
  const r = await fetch(`https://unsplash.com/photos/${id}`, {headers: UA});
  if (!r.ok) return null;
  const html = await r.text();
  if (/unsplash\+|plus\.unsplash\.com/i.test(html) && !/Free to use under the Unsplash License/i.test(html)) return null;
  const author = (html.match(/"name":"([^"]+)","first_name"/) ?? [])[1] ?? 'Unsplash';
  return {title: id, url: `https://unsplash.com/photos/${id}/download?force=true`, page: `https://unsplash.com/photos/${id}`, license: 'Unsplash License', author};
};

const credits = [];
const manifest = {};
for (const [slot, cands] of Object.entries(SLOTS)) {
  let chosen = null;
  for (const c of cands) {
    try {
      const info = c.unsplash ? await unsplash(c.unsplash) : c.commons ? await commonsInfo(c.commons) : await fromCategory(c.commonsCategory, c.before, c.skip);
      if (info && (c.unsplash || OK_LICENSE.test(info.license))) {
        chosen = info;
        break;
      }
      console.log(`  ${slot}: rejected ${c.unsplash ?? c.commons ?? c.commonsCategory} (${info?.license ?? 'not found'})`);
    } catch (e) {
      console.log(`  ${slot}: error ${e.message}`);
    }
  }
  if (!chosen) {
    manifest[slot] = null;
    console.log(`${slot}: no cleared photo, the scene will use its drawing`);
    continue;
  }
  const r = await fetch(chosen.url, {headers: UA, redirect: 'follow'});
  if (!r.ok) {
    manifest[slot] = null;
    console.log(`${slot}: download failed ${r.status}`);
    continue;
  }
  const file = `${slot}.jpg`;
  fs.writeFileSync(path.join(outDir, file), Buffer.from(await r.arrayBuffer()));
  const credit = `${chosen.author} · ${chosen.license}`;
  manifest[slot] = {file, credit, license: chosen.license, url: chosen.page};
  credits.push(`| ${slot} | ${chosen.author} | ${chosen.license} | ${chosen.page} |`);
  console.log(`${slot}: ${credit}`);
}
fs.writeFileSync(path.join(outDir, 'CREDITS.md'), `# Photo credits\n\n| Slot | Author | Licence | Source |\n|---|---|---|---|\n${credits.join('\n')}\n`);
fs.writeFileSync(
  path.join(root, 'src', 'photos.ts'),
  `// GENERATED by tools/fetch-photos.mjs: licences confirmed from the source. null = use the drawn fallback.\nexport type Photo = {file: string; credit: string; license: string; url: string};\nexport const PHOTOS: Record<string, Photo | null> = ${JSON.stringify(manifest, null, 2)};\n`,
);
console.log('wrote src/photos.ts and public/photos/CREDITS.md');
