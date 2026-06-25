import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Runs every Storybook story (from @jasonruesch/react) as a Vitest test in a
// real browser via Playwright. `configDir` reuses ./.storybook, so the same
// Tailwind viteFinal and decorators apply and stories render as they do in
// Storybook. The a11y addon's `test: "todo"` annotation runs here too.
export default defineConfig({
  plugins: [
    storybookTest({
      configDir: path.join(dirname, ".storybook"),
      storybookScript: "pnpm storybook",
    }),
  ],
  test: {
    name: "storybook",
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({}),
      instances: [{ browser: "chromium" }],
    },
  },
});
