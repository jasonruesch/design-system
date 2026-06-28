/*
 * Atelier theme addon — shared constants & helpers
 * ------------------------------------------------
 * Theme (System / Light / Dark) and Brand (Default / Acme) are driven by a
 * custom toolbar addon instead of Storybook globals. The manager (manager.tsx)
 * owns the toolbar state, themes the Storybook chrome, and broadcasts changes on
 * the channel; the preview (preview.tsx) applies `data-theme` / `data-brand` to
 * the iframe's <html> and re-themes the docs container.
 *
 * Why not globals + a decorator? Changing a Storybook global re-renders (and, in
 * docs, re-prepares) the story on every toggle — the visible flash. Routing the
 * choice through a side channel instead, the way Storybook's dark-mode addon
 * does, never touches globals, so toggling the theme no longer re-renders the
 * story or reloads the docs page.
 */

export type ThemeChoice = "system" | "light" | "dark";
export type BrandChoice = "default" | "acme";
export type ResolvedTheme = "light" | "dark";

export const ADDON_ID = "atelier/theme";
export const THEME_TOOL_ID = `${ADDON_ID}/theme-tool`;
export const BRAND_TOOL_ID = `${ADDON_ID}/brand-tool`;

// Channel events. The manager emits THEME/BRAND on every change; the preview
// emits REQUEST once on (re)load so the manager re-broadcasts the current state.
export const THEME_EVENT = `${ADDON_ID}/theme`;
export const BRAND_EVENT = `${ADDON_ID}/brand`;
export const REQUEST_EVENT = `${ADDON_ID}/request`;

// Persisted across reloads. Manager and preview iframe share an origin, so both
// read the same store for the initial paint before the channel handshake.
const THEME_KEY = "atelier-theme";
const BRAND_KEY = "atelier-brand";

export const THEME_ITEMS: { value: ThemeChoice; title: string }[] = [
  { value: "system", title: "System" },
  { value: "light", title: "Light" },
  { value: "dark", title: "Dark" },
];

export const BRAND_ITEMS: { value: BrandChoice; title: string }[] = [
  { value: "default", title: "Default" },
  { value: "acme", title: "Acme" },
];

export const prefersDark = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-color-scheme: dark)").matches === true;

// Resolve a choice to a concrete light/dark, following the OS when "system".
export const resolveTheme = (choice: ThemeChoice): ResolvedTheme =>
  choice === "system" ? (prefersDark() ? "dark" : "light") : choice;

export const readThemeChoice = (): ThemeChoice => {
  try {
    const v = window.localStorage.getItem(THEME_KEY);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
    /* localStorage unavailable */
  }
  return "system";
};

export const writeThemeChoice = (choice: ThemeChoice): void => {
  try {
    window.localStorage.setItem(THEME_KEY, choice);
  } catch {
    /* ignore */
  }
};

export const readBrandChoice = (): BrandChoice => {
  try {
    const v = window.localStorage.getItem(BRAND_KEY);
    if (v === "default" || v === "acme") return v;
  } catch {
    /* localStorage unavailable */
  }
  return "default";
};

export const writeBrandChoice = (brand: BrandChoice): void => {
  try {
    window.localStorage.setItem(BRAND_KEY, brand);
  } catch {
    /* ignore */
  }
};

// Apply the resolved theme + brand to a document's <html>. Components resolve the
// semantic --color-* tokens against [data-theme] / [data-brand] on an ancestor,
// so <html> is where the active theme lives for the whole iframe (stories + docs).
export const applyThemeAttrs = (
  doc: Document,
  resolved: ResolvedTheme,
  brand: BrandChoice,
): void => {
  const root = doc.documentElement;
  root.setAttribute("data-theme", resolved);
  if (brand !== "default") root.setAttribute("data-brand", brand);
  else root.removeAttribute("data-brand");
};

// Manager-only: write an attribute straight into the preview iframe's <html>, in
// the same synchronous tick as the chrome re-theme. The channel broadcast is
// async (postMessage), so without this the canvas would lag the chrome by a
// frame on toggle. Pass only the attribute(s) you're changing; null = leave as-is.
export const applyToPreviewIframe = (
  resolved: ResolvedTheme | null,
  brand: BrandChoice | null,
): void => {
  const iframe = document.getElementById(
    "storybook-preview-iframe",
  ) as HTMLIFrameElement | null;
  const root = iframe?.contentDocument?.documentElement;
  if (!root) return;
  if (resolved) root.setAttribute("data-theme", resolved);
  if (brand !== null) {
    if (brand !== "default") root.setAttribute("data-brand", brand);
    else root.removeAttribute("data-brand");
  }
};
