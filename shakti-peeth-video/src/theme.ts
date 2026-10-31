import { FONT_BODY, FONT_HEADING } from "./fonts";

/** All colours used anywhere in the video. Scenes must not hard-code colours. */
export const colors = {
  // night
  night0: "#0A0910",
  night1: "#1B0F1C",
  nightRed: "#2A0A10", // chapters ৪–৫ deep-red variant
  // parchment
  parchment: "#EADCC0",
  parchmentDark: "#D8C49E",
  parchmentBorder: "#7A1420",
  // gold
  ivory: "#F7EFDD",
  gold: "#E3B04B",
  goldDeep: "#B9862A",
  // accents
  sindoor: "#C1121F",
  jaba: "#B5122B",
  diya: "#F08A24",
  vishnu: "#2F5D9E",
  ash: "#8C8C8C",
  muted: "#A89F90",
  // Shakti / Bhairava split card
  shaktiWarm: "#F6D9B8",
  bhairavaAsh: "#D9DFE6",
  bhairavaInk: "#22344F",
  // text
  cream: "#FFF4E2",
  ink: "#2A1810",
  black: "#000000",
} as const;

export type BgVariant = "night" | "parchment" | "gold";

/** Per-background text/accent roles, so components can follow the scene background. */
export const palettes: Record<
  BgVariant,
  { text: string; subtext: string; accent: string; highlight: string; panel: string; panelBorder: string; land: string; coast: string; sea: string }
> = {
  night: {
    text: colors.cream,
    subtext: colors.muted,
    accent: colors.gold,
    highlight: colors.gold,
    panel: "rgba(27,15,28,0.78)",
    panelBorder: "rgba(227,176,75,0.55)",
    land: "#2A1D2E",
    coast: colors.gold,
    sea: "transparent",
  },
  parchment: {
    text: colors.ink,
    subtext: "#6B5A45",
    accent: colors.parchmentBorder,
    highlight: colors.sindoor,
    panel: "rgba(234,220,192,0.92)",
    panelBorder: colors.parchmentBorder,
    land: colors.parchmentDark,
    coast: colors.parchmentBorder,
    sea: "transparent",
  },
  gold: {
    text: colors.ink,
    subtext: "#6B5A45",
    accent: colors.goldDeep,
    highlight: colors.sindoor,
    panel: "rgba(247,239,221,0.94)",
    panelBorder: colors.gold,
    land: "#EBDDBE",
    coast: colors.goldDeep,
    sea: "transparent",
  },
};

export const fonts = {
  heading: FONT_HEADING,
  body: FONT_BODY,
};

export const type = {
  heading: 80, // 72–88 px
  headingSmall: 64,
  body: 38, // 34–40 px
  label: 30,
  small: 24,
  credit: 20,
};

export const layout = {
  width: 1920,
  height: 1080,
  safe: 80,
};

export const motion = {
  fps: 30,
  springDamping: 200,
  crossfadeFrames: 18,
  kenBurnsFrom: 1.0,
  kenBurnsTo: 1.08,
  chapterCardSec: 1.5,
};

/** Soft text shadow that keeps text readable over photos. */
export const textHalo = (dark = true) =>
  dark
    ? "0 2px 18px rgba(0,0,0,0.75), 0 0 4px rgba(0,0,0,0.6)"
    : "0 1px 10px rgba(247,239,221,0.9)";
