# Design System

An accessible, themeable React component library built from design tokens and
documented in Storybook.

- **Tokens** — authored in W3C DTCG JSON, compiled with Style Dictionary into
  CSS variables (`--ds-*`) layered **primitive → semantic → component**.
- **Theming** — light/dark **and** multi-brand via `data-theme` / `data-brand`
  selectors on any ancestor element. No rebuild required to switch.
- **Styling** — Tailwind CSS v4 (`@theme` maps utilities onto the token vars).
- **Behavior** — Radix UI primitives for accessible overlays, forms, and
  disclosure; the design system owns the styling.
- **Distribution** — precompiled CSS + JS/types; consumers need no Tailwind
  setup.

## Workspace

```
packages/
  tokens/   @ds/tokens — DTCG tokens + Style Dictionary build (CSS vars + TS)
  react/    @ds/react  — ~30 components, compiled JS/types + styles.css
apps/
  docs/     @ds/docs   — Storybook (React + Vite) with theme/brand toolbar
tooling/
  eslint-config/        shared flat ESLint config (+ jsx-a11y)
  tsconfig/             shared TypeScript configs
```

Orchestrated with Turborepo; `@ds/react` and `apps/docs` depend on `@ds/tokens`.

## Usage

```ts
import "@ds/react/styles.css";
import { Button, Dialog, DialogTrigger, DialogContent } from "@ds/react";
```

Set the theme/brand on the document (or any subtree):

```html
<html data-theme="dark" data-brand="acme">
```

## Scripts

| Command                | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `pnpm install`         | Install the workspace                                |
| `pnpm tokens:build`    | Generate token CSS + TS into `packages/tokens/dist`  |
| `pnpm build`           | Build tokens, then `@ds/react` (JS, types, CSS)      |
| `pnpm test`            | Vitest + Testing Library + axe a11y checks           |
| `pnpm lint`            | ESLint (incl. `jsx-a11y`)                            |
| `pnpm typecheck`       | TypeScript across all packages                       |
| `pnpm storybook`       | Run Storybook dev server (port 6006)                 |
| `pnpm build-storybook` | Build the static docs site                           |

## Components

Layout (Box, Stack, Inline, Grid, Container) · Typography (Text, Heading) ·
Actions (Button, IconButton, Link) · Forms (Field, Label, Input, Textarea,
Checkbox, RadioGroup, Switch, Select) · Feedback (Badge, Alert, Spinner, Avatar,
Card, Separator) · Overlays (Dialog, Popover, Tooltip, DropdownMenu, Tabs,
Accordion).
