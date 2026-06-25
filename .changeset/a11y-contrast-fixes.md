---
"@jasonruesch/tokens": patch
"@jasonruesch/react": patch
---

Fix color contrast to meet WCAG AA (4.5:1):

- **tokens:** darken `fg.subtle` in the light theme from `slate.400` to `slate.500`, so subtle/placeholder text (e.g. the Select placeholder) passes contrast on light backgrounds.
- **react:** remove the `opacity-90` dim from `AlertDescription`, which pulled the success and warning alert text below the contrast threshold on their tinted backgrounds.
