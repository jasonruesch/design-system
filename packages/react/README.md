# @jasonruesch/react

An accessible, themeable React component library built on design tokens and
[Radix UI](https://www.radix-ui.com/) primitives. Ships precompiled JS, types,
and a single stylesheet — consumers need no Tailwind setup.

- **Accessible** — Radix UI handles focus, keyboard, and ARIA for overlays,
  forms, and disclosure; the design system owns the styling.
- **Themeable** — light/dark and multi-brand via `data-theme` / `data-brand`
  selectors. No rebuild required to switch.
- **Token-driven** — styled with [`@jasonruesch/tokens`](https://www.npmjs.com/package/@jasonruesch/tokens)
  (`--ds-*` CSS variables) through Tailwind CSS v4.

## Install

```sh
npm install @jasonruesch/react react react-dom
```

`react` and `react-dom` (>=18) are peer dependencies.

## Usage

> **The `styles.css` import is required, not optional.** Components are styled
> with compiled Tailwind utility classes whose CSS ships entirely in this one
> file — without it, components render unstyled. A single precompiled stylesheet
> dedupes shared utilities, needs no Tailwind setup on your end, and is safe for
> SSR / React Server Components.

Import the stylesheet **once** at your app root, then use components anywhere:

```tsx
import "@jasonruesch/react/styles.css";
import { Button, Dialog, DialogTrigger, DialogContent } from "@jasonruesch/react";

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>Hello</DialogContent>
    </Dialog>
  );
}
```

Set the theme and brand on the document (or any subtree):

```html
<html data-theme="dark" data-brand="acme">
```

## Components

- **Layout** — Box, Stack, Inline, Grid, Container
- **Typography** — Text, Heading
- **Actions** — Button, IconButton, Link
- **Forms** — Field, Label, Input, Textarea, Checkbox, RadioGroup, Switch, Select
- **Feedback & display** — Badge, Alert, Spinner, Avatar, Card, Separator
- **Overlays & disclosure** — Dialog, Popover, Tooltip, DropdownMenu, Tabs, Accordion

A `cn` class-merging utility (clsx + tailwind-merge) is also exported.

## Exports

| Entry                          | Contents                          |
| ------------------------------ | --------------------------------- |
| `@jasonruesch/react`           | Components + `cn` (ESM, CJS, types) |
| `@jasonruesch/react/styles.css` | Precompiled stylesheet            |

## License

MIT
