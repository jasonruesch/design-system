import { defineConfig } from "vitest/config";

export default defineConfig({
  // Resolve React's development builds so dev-only APIs (e.g. `act`, used by
  // Testing Library) are available under jsdom.
  resolve: {
    conditions: ["development", "browser"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    include: ["src/**/*.test.{ts,tsx}"],
    // The CI environment may set NODE_ENV=production, which makes React load its
    // production build (dev-only `act` stripped). Force a test environment.
    env: { NODE_ENV: "test" },
  },
});
