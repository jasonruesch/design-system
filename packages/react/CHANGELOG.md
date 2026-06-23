# @jasonruesch/react

## 0.3.0

### Minor Changes

- [`8ababe6`](https://github.com/jasonruesch/design-system/commit/8ababe6ce453ba5407f30009682681326a2da665) Thanks [@jasonruesch](https://github.com/jasonruesch)! - Add an `asChild` prop to `Link`, letting consumers render a third-party link component (such as React Router's `Link`) as the base while keeping the design-system styling.

## 0.2.0

### Minor Changes

- [`7ba2f8a`](https://github.com/jasonruesch/design-system/commit/7ba2f8ab9dc11e551aa90270f3dcf68af471473c) Thanks [@jasonruesch](https://github.com/jasonruesch)! - Support consumer-side Tailwind styling without going fully headless.

  - Add a new `@jasonruesch/react/preset.css` export — a Tailwind v4 token/theme
    layer consumers can `@import` into their own build to compile the design
    system against the `--ds-*` tokens (with `data-theme` / `data-brand`
    switching) instead of, or alongside, the precompiled `styles.css`.
  - Export every component's CVA styling recipe as `<name>Variants` (e.g.
    `inputVariants`, `badgeVariants`, `textVariants`), so consumers can apply the
    design system's styling to their own elements. Previously only
    `buttonVariants` was exported.

  Both changes are additive; the existing `styles.css` workflow is unchanged.
  `@jasonruesch/tokens` and `tw-animate-css` are now runtime dependencies (they
  back the shared preset).

## 0.1.1

### Patch Changes

- bbfb501: Add README files for both published packages, documenting installation, usage, exports, and (for `@jasonruesch/react`) the required `styles.css` import.

## 0.1.0

### Minor Changes

- 4e9b7cd: Set up automated npm publishing via Changesets and GitHub Actions, and publish the packages under the `@jasonruesch` scope.
