---
"@jasonruesch/react": patch
---

Add the `@vitest/coverage-v8` dev dependency so Vitest can initialize when coverage is enabled (e.g. via the VS Code Vitest extension). Vitest 4's default coverage provider is v8, which requires this package.
