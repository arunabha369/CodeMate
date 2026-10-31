import {continueRender, delayRender, staticFile} from 'remotion';

// Fonts are bundled in public/fonts (copied from @fontsource, SIL Open Font License),
// so rendering works offline and is fully deterministic.
const BN = 'U+0951-0952,U+0964-0965,U+0980-09FE,U+1CD0-1CFF,U+200C-200D,U+20B9,U+25CC,U+A8F1';
const LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';

const faces: [string, string, string, string][] = [];
for (const w of ['500', '600', '700']) {
  faces.push(['Hind Siliguri', `fonts/hind-siliguri-bengali-${w}-normal.woff2`, w, BN]);
  faces.push(['Hind Siliguri', `fonts/hind-siliguri-latin-${w}-normal.woff2`, w, LATIN]);
}
for (const w of ['500', '600']) faces.push(['Oswald', `fonts/oswald-latin-${w}-normal.woff2`, w, LATIN]);

if (typeof document !== 'undefined') {
  const handle = delayRender('Loading local fonts');
  Promise.all(
    faces.map(([family, file, weight, unicodeRange]) => {
      const ff = new FontFace(family, `url(${staticFile(file)}) format('woff2')`, {weight, unicodeRange});
      (document.fonts as unknown as {add: (f: FontFace) => void}).add(ff);
      return ff.load();
    }),
  )
    .then(() => continueRender(handle))
    .catch((e) => {
      console.error(e);
      continueRender(handle);
    });
}
