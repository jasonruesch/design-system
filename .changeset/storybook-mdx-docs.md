---
"@jasonruesch/react": patch
"@jasonruesch/docs": patch
---

Add rich MDX documentation pages for every component. Each component now has a co-located `<Component>.mdx` with a consistent template — overview, when-to-use guidance, import, interactive usage/controls, variant and state examples, an anatomy table for composite components, and accessibility notes — replacing the auto-generated docs. The Storybook MDX pipeline enables `remark-gfm` so the anatomy tables render, and `@storybook/addon-docs` is added to `@jasonruesch/react` so MDX can resolve its doc blocks.
