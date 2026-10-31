import {Config} from '@remotion/cli/config';
import fs from 'node:fs';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setConcurrency(null);
Config.setOverwriteOutput(true);

// In the cloud build container Remotion cannot download its own browser, so use the
// pre-installed headless shell when it exists. On your own machine this is skipped and
// Remotion downloads its browser automatically.
const shell = '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
if (fs.existsSync(shell)) {
  Config.setBrowserExecutable(shell);
}
