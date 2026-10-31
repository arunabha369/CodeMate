import { Config } from "@remotion/cli/config";
import fs from "node:fs";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(null);
// No GPU here: plain SwiftShader is ~3x faster than swangle. (LightLeak is CSS, so WebGL2 is not needed.)
Config.setChromiumOpenGlRenderer("swiftshader");

// Cloud sessions ship a headless Chromium; use it when present so Remotion
// doesn't try to download its own. Elsewhere Remotion's default applies.
const localShell =
  "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
if (fs.existsSync(localShell)) {
  Config.setBrowserExecutable(localShell);
}
