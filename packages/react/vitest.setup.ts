import "@testing-library/jest-dom/vitest";
// Activates the global `toHaveNoViolations` matcher types (runtime no-op).
import "vitest-axe/extend-expect";
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import * as axeMatchers from "vitest-axe/matchers";

expect.extend(axeMatchers);

afterEach(() => {
  cleanup();
});
