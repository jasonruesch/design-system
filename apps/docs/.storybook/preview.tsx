import * as React from "react";
import type { Preview, Decorator } from "@storybook/react-vite";
import {
  DocsContainer,
  type DocsContainerProps,
} from "@storybook/addon-docs/blocks";
import { addons } from "storybook/preview-api";

import { themeFor } from "./theme";
import {
  BRAND_EVENT,
  REQUEST_EVENT,
  THEME_EVENT,
  applyThemeAttrs,
  readBrandChoice,
  readThemeChoice,
  resolveTheme,
  type BrandChoice,
  type ResolvedTheme,
  type ThemeChoice,
} from "./theme-addon";

// Source Tailwind entry — @tailwindcss/vite compiles it (incl. token CSS vars)
// and rebuilds utilities live as stories change.
import "../../../packages/react/src/styles/tailwind.css";

// Theme/Brand are driven by the custom toolbar addon (manager.tsx), not by
// Storybook globals — so toggling no longer re-renders the story or reloads the
// docs page (which was the flash). The manager broadcasts the choice; here we
// keep the iframe's <html> attributes and the docs container in sync with it.
const channel = addons.getChannel();

// Live preview state, seeded from the shared store for the first paint and then
// kept current by the manager's broadcasts.
let currentChoice: ThemeChoice = readThemeChoice();
let currentBrand: BrandChoice = readBrandChoice();

const applyNow = () =>
  applyThemeAttrs(document, resolveTheme(currentChoice), currentBrand);

// Paint the initial theme before any story/docs renders.
applyNow();

// Track the OS while on System, and follow the manager's toolbar.
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (currentChoice === "system") applyNow();
  });
channel.on(THEME_EVENT, (payload: { choice?: ThemeChoice }) => {
  if (payload?.choice) currentChoice = payload.choice;
  applyNow();
});
channel.on(BRAND_EVENT, (payload: { brand?: BrandChoice }) => {
  if (payload?.brand) currentBrand = payload.brand;
  applyNow();
});

// Ask the manager to re-broadcast the current state — covers iframe (re)loads,
// where this preview bundle re-evaluates but the manager keeps its state.
channel.emit(REQUEST_EVENT);

// Resolved theme as React state, for components (the docs container) that must
// re-render — mirrors the module-level listeners above.
const useResolvedTheme = (): ResolvedTheme => {
  const [resolved, setResolved] = React.useState<ResolvedTheme>(() =>
    resolveTheme(currentChoice),
  );

  React.useEffect(() => {
    const update = () => setResolved(resolveTheme(currentChoice));
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    channel.on(THEME_EVENT, update);
    mq.addEventListener("change", update);
    update();
    return () => {
      channel.off(THEME_EVENT, update);
      mq.removeEventListener("change", update);
    };
  }, []);

  return resolved;
};

// Static story wrapper — the active theme lives on <html> (applied above), so
// `bg-canvas`/`text-fg` resolve correctly; no per-story theme side effects.
const withTheme: Decorator = (Story) => (
  <div className="min-h-svh bg-canvas p-6 text-fg">
    <Story />
  </div>
);

// Docs pages follow the same toolbar theme as the stories. The DocsContainer's
// emotion theme isn't driven by <html>, so feed it the resolved theme directly.
const ThemedDocsContainer = (
  props: React.PropsWithChildren<DocsContainerProps>,
) => {
  const resolved = useResolvedTheme();
  return <DocsContainer {...props} theme={themeFor(resolved)} />;
};

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    // The themed `bg-canvas` decorator paints the story background, so the
    // built-in backgrounds toolbar is redundant — hide it.
    backgrounds: { disable: true },
    // Run axe on every story. `test: "error"` fails the Vitest run (pnpm test)
    // on violations; Chromatic also reports a11y results for accept/deny review.
    // Tune axe here via `element` (selector to inspect), `config`
    // (axe.configure options, e.g. disabling a rule), and `options` — see
    // https://www.chromatic.com/docs/accessibility/configure/.
    a11y: { test: "error" },
    // Docs pages follow the single Theme toolbar — see ThemedDocsContainer.
    docs: { container: ThemedDocsContainer },
  },
  decorators: [withTheme],
};

export default preview;
