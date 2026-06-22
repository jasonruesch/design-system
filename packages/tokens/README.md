# @jasonruesch/tokens

Design tokens for the design system, authored in [W3C DTCG](https://www.w3.org/community/design-tokens/)
JSON and compiled with [Style Dictionary](https://styledictionary.com/) into CSS
custom properties (`--ds-*`) and a typed TypeScript object.

Tokens are layered **primitive → semantic → component**:

- **Primitive** — raw values (color scales, dimensions, typography, shadow) on `:root`.
- **Semantic** — intent-based aliases (`bg`, `fg`, `accent`, `danger`, …) that
  switch with `data-theme`.
- **Component** — component-scoped values that reference the semantic layer.
- **Brand** — per-brand overrides applied with `data-brand`.

## Install

```sh
npm install @jasonruesch/tokens
```

## Usage

### CSS variables

Import the full cascade (primitives, light/dark themes, brand, components):

```css
@import "@jasonruesch/tokens/css";
```

…or import individual layers:

```css
@import "@jasonruesch/tokens/css/variables.css";    /* primitives → :root */
@import "@jasonruesch/tokens/css/theme-light.css";  /* [data-theme~="light"] */
@import "@jasonruesch/tokens/css/theme-dark.css";   /* [data-theme~="dark"] */
@import "@jasonruesch/tokens/css/brand-acme.css";   /* [data-brand="acme"] */
@import "@jasonruesch/tokens/css/components.css";    /* component layer → :root */
```

Then reference the variables and switch theme/brand on any ancestor element — no
rebuild required:

```html
<html data-theme="dark" data-brand="acme">
  <button style="background: var(--ds-color-accent-default); color: var(--ds-color-fg-on-accent)">
    Save
  </button>
</html>
```

### TypeScript / JavaScript

Resolved values (light theme as canonical) are also available as a typed object:

```ts
import { tokens, type TokenName } from "@jasonruesch/tokens";

tokens["color.accent.default"]; // "#2563eb"
```

## Exports

| Entry                            | Contents                                          |
| -------------------------------- | ------------------------------------------------- |
| `@jasonruesch/tokens`            | Typed `tokens` object + types (`dist/ts`)         |
| `@jasonruesch/tokens/css`        | Barrel importing every CSS layer in cascade order |
| `@jasonruesch/tokens/css/*`      | Individual CSS layer files                        |

## Build

Tokens are authored in `tokens/` and compiled into `dist/` by `config.mjs`:

```sh
pnpm build   # or: pnpm tokens:build
```

## License

MIT
