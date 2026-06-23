---
"@jasonruesch/react": minor
---

Support consumer-side Tailwind styling without going fully headless.

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
