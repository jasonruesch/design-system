import { create } from "storybook/theming/create";
import type { ThemeVars } from "storybook/theming";

// Shared Atelier themes, used both for the manager chrome (manager.tsx) and the
// docs page shell (preview.tsx DocsContainer). brandImage is served from
// ../public; a leading-relative path resolves correctly both locally and under
// the GitHub Pages /design-system/ base path.
const brand = {
  brandTitle: "Atelier",
  brandTarget: "_self",
} as const;

export const lightTheme: ThemeVars = create({
  ...brand,
  base: "light",
  brandImage: "atelier-logo.svg",
  colorPrimary: "#2563eb", // accent / blue-600 (light)
  colorSecondary: "#2563eb",
  // Preview iframe background — shown behind/around the canvas and during
  // overscroll. Match the App page background (--ds-color-bg-default) so it
  // stays consistent with the chrome rather than defaulting to white.
  appPreviewBg: "#ffffff",
  appContentBg: "#ffffff",
});

export const darkTheme: ThemeVars = create({
  ...brand,
  base: "dark",
  brandImage: "atelier-logo-dark.svg", // light wordmark for the dark sidebar
  colorPrimary: "#3b82f6", // accent / blue-500 (dark)
  colorSecondary: "#3b82f6",
  appPreviewBg: "#020617", // slate-950
  appContentBg: "#020617",
});

export const themeFor = (mode: "light" | "dark"): ThemeVars =>
  mode === "dark" ? darkTheme : lightTheme;
