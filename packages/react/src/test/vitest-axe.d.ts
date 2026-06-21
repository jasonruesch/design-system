import type { AxeMatchers } from "vitest-axe";

// vitest-axe ships its matcher augmentation against the legacy `Vi` namespace,
// which Vitest 4 no longer uses. Re-augment the current module interfaces.
declare module "vitest" {
  interface Assertion<T = unknown> extends AxeMatchers {
    _t?: T;
  }
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
