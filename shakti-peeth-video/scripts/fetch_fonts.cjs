// Downloads the Tiro Bangla and Hind Siliguri WOFF2 files (Google Fonts, OFL)
// into public/fonts and writes src/data/fonts.json. Run: node scripts/fetch_fonts.cjs
// Uses curl so the session's proxy CA bundle is honoured.
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const families = [
  ["TiroBangla", ["400"]],
  ["HindSiliguri", ["400", "500", "600", "700"]],
];
const manifest = [];
fs.mkdirSync(path.join(root, "public/fonts"), { recursive: true });
for (const [mod, weights] of families) {
  const info = require(`@remotion/google-fonts/${mod}`).getInfo();
  for (const weight of weights) {
    for (const subset of ["bengali", "latin"]) {
      const url = info.fonts.normal[weight][subset];
      const file = `fonts/${mod}-${weight}-${subset}.woff2`;
      const dest = path.join(root, "public", file);
      if (!fs.existsSync(dest)) execFileSync("curl", ["-sS", "--fail", "-o", dest, url]);
      manifest.push({ family: info.fontFamily, weight, subset, unicodeRange: info.unicodeRanges[subset], file, source: url });
    }
  }
}
fs.writeFileSync(path.join(root, "src/data/fonts.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`fonts: ${manifest.length} files`);
