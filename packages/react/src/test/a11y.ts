import { axe } from "vitest-axe";
import type { AxeResults } from "axe-core";

/**
 * Run axe against a container. The `color-contrast` rule is disabled because
 * jsdom cannot compute layout/color, making it unreliable in unit tests —
 * contrast is verified visually in Storybook's a11y addon instead.
 */
export function checkA11y(container: Element): Promise<AxeResults> {
  return axe(container, {
    rules: { "color-contrast": { enabled: false } },
  });
}
