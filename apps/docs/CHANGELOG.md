# @jasonruesch/docs

## 0.0.9

### Patch Changes

- [`d61cf8c`](https://github.com/jasonruesch/design-system/commit/d61cf8cc0f5952ad10bcc258f43c100683a82562) Thanks [@jasonruesch](https://github.com/jasonruesch)! - Replace the Storybook theme toggles with a custom toolbar addon to eliminate the flash on toggle.

  Theme (System / Light / Dark) and Brand (Default / Acme) were Storybook globals applied through a story decorator, so every toggle re-rendered — and in docs re-prepared — the story, producing a skeleton/white flash. They now run through a custom toolbar addon that owns the state, themes the chrome, writes `data-theme` / `data-brand` straight into the preview iframe synchronously, and broadcasts on the channel (mirroring the dark-mode addon's approach, but as a 3-state control on `data-theme`). No globals change, so toggling no longer re-renders the story or reloads the docs, and the chrome and content switch in the same frame. The three theme controls are also consolidated into a single unified Theme toggle.

- Updated dependencies [[`c0a393b`](https://github.com/jasonruesch/design-system/commit/c0a393b74fefa19692b7f4d899d0cec05259ade5)]:
  - @jasonruesch/react@0.3.5

## 0.0.8

### Patch Changes

- [#9](https://github.com/jasonruesch/design-system/pull/9) [`b95dfa3`](https://github.com/jasonruesch/design-system/commit/b95dfa3d38993588a6442e8ad0e33a9cc45062ce) Thanks [@jasonruesch](https://github.com/jasonruesch)! - Add rich MDX documentation pages for every component. Each component now has a co-located `<Component>.mdx` with a consistent template — overview, when-to-use guidance, import, interactive usage/controls, variant and state examples, an anatomy table for composite components, and accessibility notes — replacing the auto-generated docs. The Storybook MDX pipeline enables `remark-gfm` so the anatomy tables render, and `@storybook/addon-docs` is added to `@jasonruesch/react` so MDX can resolve its doc blocks.

- Updated dependencies [[`b95dfa3`](https://github.com/jasonruesch/design-system/commit/b95dfa3d38993588a6442e8ad0e33a9cc45062ce)]:
  - @jasonruesch/react@0.3.4

## 0.0.7

### Patch Changes

- Updated dependencies [[`4a42049`](https://github.com/jasonruesch/design-system/commit/4a42049f5256d83e11021f5aab5980956c018a61)]:
  - @jasonruesch/react@0.3.3

## 0.0.6

### Patch Changes

- Updated dependencies [[`fc71ca7`](https://github.com/jasonruesch/design-system/commit/fc71ca7d768ad3c1ddf84ac6b06c0d4387f9e1b4)]:
  - @jasonruesch/tokens@0.1.2
  - @jasonruesch/react@0.3.2

## 0.0.5

### Patch Changes

- Updated dependencies [[`b1f7f84`](https://github.com/jasonruesch/design-system/commit/b1f7f847d7d93c94431fe72cbae85d3f980a8bbf)]:
  - @jasonruesch/react@0.3.1

## 0.0.4

### Patch Changes

- Updated dependencies [[`8ababe6`](https://github.com/jasonruesch/design-system/commit/8ababe6ce453ba5407f30009682681326a2da665)]:
  - @jasonruesch/react@0.3.0

## 0.0.3

### Patch Changes

- Updated dependencies [[`7ba2f8a`](https://github.com/jasonruesch/design-system/commit/7ba2f8ab9dc11e551aa90270f3dcf68af471473c)]:
  - @jasonruesch/react@0.2.0

## 0.0.2

### Patch Changes

- Updated dependencies [bbfb501]
  - @jasonruesch/react@0.1.1
  - @jasonruesch/tokens@0.1.1

## 0.0.1

### Patch Changes

- Updated dependencies [4e9b7cd]
  - @jasonruesch/react@0.1.0
  - @jasonruesch/tokens@0.1.0
