---
"@jasonruesch/docs": patch
---

Replace the Storybook theme toggles with a custom toolbar addon to eliminate the flash on toggle.

Theme (System / Light / Dark) and Brand (Default / Acme) were Storybook globals applied through a story decorator, so every toggle re-rendered — and in docs re-prepared — the story, producing a skeleton/white flash. They now run through a custom toolbar addon that owns the state, themes the chrome, writes `data-theme` / `data-brand` straight into the preview iframe synchronously, and broadcasts on the channel (mirroring the dark-mode addon's approach, but as a 3-state control on `data-theme`). No globals change, so toggling no longer re-renders the story or reloads the docs, and the chrome and content switch in the same frame. The three theme controls are also consolidated into a single unified Theme toggle.
