# Design System — Implementation Plan

## Context

This is a greenfield repository. The goal is an accessible, themeable React component library built from design tokens, documented in Storybook for both engineers and designers.

The stack and architecture were decided up front:

- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config)
- **Behavior primitives:** Radix UI (accessible Dialog, Select, Popover, etc.; we own the styling)
- **Tokens:** Style Dictionary, authored in W3C DTCG JSON, layered **primitive → semantic → component**
- **Theming:** light/dark **and** multi-brand, via CSS variables + `data-theme` / `data-brand` selectors
- **Repo:** pnpm monorepo
- **Distribution:** precompiled CSS + token CSS variables (consumers need no Tailwind setup)
- **Scope:** foundation + a broad component set (layout, typography, forms, feedback, overlays)

The intended outcome: a publishable, versioned token package and React package, a Storybook docs site, accessibility + visual testing wired in, and ~25 components establishing repeatable patterns.

## Architecture

### Monorepo layout
```
design-system/
├── pnpm-workspace.yaml          # packages/*, apps/*, tooling/*
├── turbo.json                   # build/test/lint/storybook pipelines
├── package.json                 # root scripts, workspace devDeps
├── tsconfig.base.json
├── packages/
│   ├── tokens/                  # @ds/tokens
│   │   ├── tokens/              # DTCG JSON: primitive + semantic + component layers
│   │   ├── config.mjs           # Style Dictionary config
│   │   └── dist/                # generated: css vars + ts exports (gitignored, built)
│   └── react/                   # @ds/react
│       ├── src/
│       │   ├── components/      # one folder per component
│       │   ├── styles/          # tailwind.css entry + theme layer
│       │   ├── utils/           # cn() classname helper, etc.
│       │   └── index.ts
│       └── dist/                # js + d.ts + styles.css (built)
├── apps/
│   └── docs/                    # Storybook (React + Vite)
└── tooling/
    ├── eslint-config/
    └── tsconfig/
```

Use **Turborepo** for task orchestration and caching; `@ds/react` and `apps/docs` depend on `@ds/tokens`.

### Token pipeline (`@ds/tokens`)
- Author tokens in DTCG format under `tokens/`, split into three layers:
  - **primitive** — raw scales (`color.blue.500`, `space.4`, `font.size.md`, radii, shadows)
  - **semantic** — intent aliases referencing primitives (`color.bg.default`, `color.fg.muted`, `color.action.primary`, `border.radius.control`)
  - **component** — optional per-component overrides (`button.bg.primary`)
- `config.mjs` runs Style Dictionary (v4) to emit:
  - `dist/css/variables.css` — primitive CSS vars on `:root`
  - `dist/css/theme-light.css`, `theme-dark.css` — semantic vars under `[data-theme~="light"]` / `[data-theme~="dark"]`
  - `dist/css/brand-*.css` — semantic overrides under `[data-brand="..."]`
  - `dist/ts/tokens.ts` — typed token object for programmatic use
- Theming model: a consumer sets `<html data-theme="dark" data-brand="acme">`. Semantic vars resolve per selector; brand selectors win over mode where they overlap.

### Tailwind v4 integration (`@ds/react`)
- `src/styles/tailwind.css`: `@import "tailwindcss";` then an `@theme` block mapping Tailwind's design tokens to the Style Dictionary CSS vars, e.g. `--color-bg-default: var(--ds-color-bg-default);`. This makes utilities like `bg-bg-default`, `text-fg-muted`, `p-4` resolve to tokens.
- Import the generated token CSS (`@ds/tokens/dist/css/*`) into the styles entry so vars exist at runtime.
- Dark mode configured via the `data-theme` custom variant.

### Distribution
- Build `@ds/react` JS + types with **tsup** (or Vite library mode) → `dist/`, externalizing `react`, `react-dom`, and `@radix-ui/*`.
- Run Tailwind v4 over the component source to emit a single **`dist/styles.css`** (utilities + theme + token vars). Consumers do:
  ```ts
  import "@ds/react/styles.css";
  import { Button } from "@ds/react";
  ```
- `package.json` `exports` map: `"."` → JS/types, `"./styles.css"` → compiled CSS.

## Component set (broad initial coverage)

Each component ships: `Component.tsx`, `Component.stories.tsx`, `Component.test.tsx`, and an `index.ts` export. Variants handled with **`cva`** (class-variance-authority) + a `cn()` (clsx + tailwind-merge) helper.

- **Layout / primitives:** Box, Stack, Inline, Grid, Container
- **Typography:** Text, Heading
- **Actions:** Button, IconButton, Link
- **Forms:** Field (label/description/error wrapper), Input, Textarea, Checkbox, Radio(Group), Switch, Select *(Radix)*, Label
- **Feedback / display:** Badge, Alert, Spinner, Avatar, Card, Separator
- **Overlays / disclosure (Radix-backed):** Dialog, Popover, Tooltip, DropdownMenu, Tabs, Accordion

Build order: layout/typography → actions → forms → feedback → overlays (overlays depend on patterns proven by simpler ones).

## Tooling & quality

- **TypeScript** strict, shared `tsconfig.base.json`.
- **Testing:** Vitest + `@testing-library/react` + `@testing-library/user-event`; accessibility assertions via **`vitest-axe`** (jest-axe for Vitest). Co-located `*.test.tsx`.
- **Storybook** (React+Vite) in `apps/docs`: `@storybook/addon-a11y`, autodocs from JSDoc/props, and a theme/brand toolbar toggle (sets `data-theme`/`data-brand` on the preview) backed by a global decorator. Optional `@storybook/test-runner` for interaction/a11y CI.
- **Lint/format:** shared ESLint flat config + Prettier; `eslint-plugin-jsx-a11y`.
- **Root scripts:** `build`, `test`, `lint`, `storybook`, `tokens:build` orchestrated through Turbo.

## Critical files to create

- `pnpm-workspace.yaml`, `turbo.json`, root `package.json`, `tsconfig.base.json`
- `packages/tokens/`: `tokens/**/*.json` (DTCG, 3 layers), `config.mjs`, `package.json`
- `packages/react/`: `src/styles/tailwind.css`, `src/utils/cn.ts`, `src/components/**`, `src/index.ts`, `tsup.config.ts`, `package.json`
- `apps/docs/`: `.storybook/main.ts`, `.storybook/preview.tsx` (theme/brand decorator), `package.json`
- `tooling/eslint-config/`, `tooling/tsconfig/`

## Verification

1. `pnpm install` at root resolves the workspace.
2. `pnpm tokens:build` generates `packages/tokens/dist/` CSS + TS; spot-check that `variables.css` and `theme-dark.css` contain expected vars.
3. `pnpm build` builds `@ds/tokens` then `@ds/react`; confirm `packages/react/dist/` contains JS, `.d.ts`, and a non-empty `styles.css`.
4. `pnpm test` runs Vitest including `vitest-axe` checks — all green, zero a11y violations on rendered components.
5. `pnpm storybook` launches docs; manually verify:
   - Components render with token-driven styling.
   - The toolbar theme toggle switches light/dark and brand themes live (CSS vars swap, no reload).
   - The a11y addon panel reports no violations on each story.
6. Keyboard/AX smoke test on overlays (Dialog focus trap + Esc, DropdownMenu arrow-key nav, Tooltip on focus).

## Notes / assumptions

- Pin to current major versions at implementation time: Tailwind **v4**, Style Dictionary **v4**, latest Storybook, Radix UI latest. Verify versions during install rather than hardcoding from memory.
- Token CSS var prefix: `--ds-*` (namespaced to avoid consumer collisions); Tailwind `@theme` aliases map onto these.
- `dist/` directories are build output (gitignored); only sources are committed.
