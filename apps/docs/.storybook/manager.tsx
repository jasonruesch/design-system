import * as React from "react";
import {
  addons,
  types,
  useGlobals,
  useStorybookApi,
} from "storybook/manager-api";
import { themeFor } from "./theme";

const prefersDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

// Initial chrome theme at manager boot — follow the OS until the sync tool
// (below) mounts and takes over from the `app` global.
addons.setConfig({ theme: themeFor(prefersDark() ? "dark" : "light") });

const ADDON_ID = "atelier/app-theme";

// Headless tool: re-themes the Storybook chrome whenever the `app` global
// (System / Light / Dark) changes, and — while on System — tracks live OS
// theme changes. The preview content is themed independently via the `content`
// global in preview.tsx, so the chrome and the canvas can differ.
const AppThemeSync = () => {
  const [globals] = useGlobals();
  const api = useStorybookApi();
  const choice: string = globals?.app ?? "system";

  React.useEffect(() => {
    const apply = () => {
      const mode =
        choice === "system" ? (prefersDark() ? "dark" : "light") : choice;
      api.setOptions({ theme: themeFor(mode as "light" | "dark") });
    };
    apply();

    if (choice !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [choice, api]);

  return null;
};

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    type: types.TOOL,
    title: "App theme sync",
    // Always mounted, in every view mode, so the chrome stays in sync.
    match: () => true,
    render: () => <AppThemeSync />,
  });
});
