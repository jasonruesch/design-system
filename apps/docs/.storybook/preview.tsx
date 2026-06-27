import * as React from "react";
import type { Preview, Decorator } from "@storybook/react-vite";
import {
  DocsContainer,
  type DocsContainerProps,
} from "@storybook/addon-docs/blocks";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";

import { themeFor } from "./theme";

// Source Tailwind entry — @tailwindcss/vite compiles it (incl. token CSS vars)
// and rebuilds utilities live as stories change.
import "../../../packages/react/src/styles/tailwind.css";

// The three theme choices shared by the App (chrome) and Content (canvas)
// toolbars. "system" follows the OS prefers-color-scheme.
const THEME_ITEMS = [
  { value: "system", title: "System", icon: "circlehollow" },
  { value: "light", title: "Light", icon: "sun" },
  { value: "dark", title: "Dark", icon: "moon" },
] as const;

// Resolve a theme choice to a concrete "light" | "dark", tracking live OS
// changes while the choice is "system".
const useResolvedTheme = (choice: string): "light" | "dark" => {
  const [systemDark, setSystemDark] = React.useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  React.useEffect(() => {
    if (choice !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [choice]);

  if (choice === "light" || choice === "dark") return choice;
  return systemDark ? "dark" : "light";
};

// Page (html/body) background per App theme. Mirrors --ds-color-bg-default
// (white / slate-950). The semantic @theme aliases (--color-canvas) can't be
// used here: Tailwind declares them at :root and they resolve once against
// <html>'s data-theme — which carries the Content theme (see withTheme) so
// components render correctly — so we set the App background color directly.
const APP_BG: Record<"light" | "dark", string> = {
  light: "#ffffff",
  dark: "#020617",
};
const applyAppBackground = (mode: "light" | "dark") => {
  document.documentElement.style.backgroundColor = APP_BG[mode];
  document.body.style.backgroundColor = APP_BG[mode];
};

const withTheme: Decorator = (Story, context) => {
  const { app, content, brand } = context.globals;
  const contentTheme = useResolvedTheme(content ?? "system");
  const appTheme = useResolvedTheme(app ?? "system");

  React.useEffect(() => {
    const root = document.documentElement;
    // Components resolve the semantic --color-* aliases at :root, so the Content
    // theme must live on <html> for the story (and embedded docs examples) to
    // render correctly. Brand (accent tokens) rides along with the content.
    root.setAttribute("data-theme", contentTheme);
    if (brand && brand !== "default") {
      root.setAttribute("data-brand", brand);
    } else {
      root.removeAttribute("data-brand");
    }
    // The page background (html/body) instead follows the App (chrome) theme, so
    // it matches the sidebar/toolbar; the story canvas keeps Content below.
    applyAppBackground(appTheme);
  }, [contentTheme, appTheme, brand]);

  return (
    <div className="min-h-svh bg-canvas p-6 text-fg">
      <Story />
    </div>
  );
};

// Docs (MDX / autodocs) pages render in the preview pane but read like part of
// the Storybook reading shell, so the doc page + prose follow the App (chrome)
// theme — keeping them consistent with the sidebar/toolbar. The component
// examples embedded in the page still follow the Content theme via withTheme.
//
// The DocsContainer is not a decorator/story function, so Storybook preview
// hooks (useGlobals) can't be used here; we read the `app` global from the
// docs channel with plain React hooks instead.
const ThemedDocsContainer = (
  props: React.PropsWithChildren<DocsContainerProps>,
) => {
  const { context } = props;

  const readApp = React.useCallback((): string => {
    try {
      return (
        context.getStoryContext(context.storyById()).globals?.app ?? "system"
      );
    } catch {
      return "system";
    }
  }, [context]);

  const [appChoice, setAppChoice] = React.useState(readApp);

  React.useEffect(() => {
    const onUpdate = (payload: { globals?: Record<string, unknown> }) => {
      const next = payload?.globals?.app;
      if (typeof next === "string") setAppChoice(next);
    };
    context.channel.on(GLOBALS_UPDATED, onUpdate);
    return () => context.channel.off(GLOBALS_UPDATED, onUpdate);
  }, [context]);

  const theme = useResolvedTheme(appChoice);

  // Paint the docs page background with the App theme too, covering pure-MDX
  // pages that render no story (so no withTheme decorator runs). data-theme on
  // <html> is left to the embedded examples' Content theme via withTheme.
  React.useEffect(() => {
    applyAppBackground(theme);
  }, [theme]);

  return <DocsContainer {...props} theme={themeFor(theme)} />;
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
    // Docs pages follow the App (chrome) theme — see ThemedDocsContainer.
    docs: { container: ThemedDocsContainer },
  },
  globalTypes: {
    // Themes the Storybook chrome (sidebar/toolbar). Read and applied by the
    // manager addon in manager.tsx; has no effect on the story canvas.
    app: {
      description: "Storybook app (chrome) theme",
      toolbar: {
        title: "App",
        icon: "browser",
        items: [...THEME_ITEMS],
        dynamicTitle: true,
      },
    },
    // Themes the story canvas, independently of the chrome.
    content: {
      description: "Content (canvas) theme",
      toolbar: {
        title: "Content",
        icon: "component",
        items: [...THEME_ITEMS],
        dynamicTitle: true,
      },
    },
    brand: {
      description: "Brand",
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        items: [
          { value: "default", title: "Default" },
          { value: "acme", title: "Acme" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    app: "system",
    content: "system",
    brand: "default",
  },
  decorators: [withTheme],
};

export default preview;
