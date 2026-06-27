import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

// Brand the manager UI (sidebar header) with the Atelier logo + name instead of
// the default Storybook logo. brandImage is served from ../public; under the
// GitHub Pages base path the manager resolves it relative to the deployed root,
// so a leading-relative path keeps it working both locally and on /design-system/.
const atelierTheme = create({
  base: "light",
  brandTitle: "Atelier",
  brandImage: "atelier-logo.svg",
  brandTarget: "_self",
  // Match the design system's accent (blue-600) for selected/active UI.
  colorPrimary: "#2563eb",
  colorSecondary: "#2563eb",
});

addons.setConfig({
  theme: atelierTheme,
});
