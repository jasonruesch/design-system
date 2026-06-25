# @jasonruesch/tokens

## 0.1.2

### Patch Changes

- [`fc71ca7`](https://github.com/jasonruesch/design-system/commit/fc71ca7d768ad3c1ddf84ac6b06c0d4387f9e1b4) Thanks [@jasonruesch](https://github.com/jasonruesch)! - Fix color contrast to meet WCAG AA (4.5:1):

  - **tokens:** darken `fg.subtle` in the light theme from `slate.400` to `slate.500`, so subtle/placeholder text (e.g. the Select placeholder) passes contrast on light backgrounds.
  - **react:** remove the `opacity-90` dim from `AlertDescription`, which pulled the success and warning alert text below the contrast threshold on their tinted backgrounds.

## 0.1.1

### Patch Changes

- bbfb501: Add README files for both published packages, documenting installation, usage, exports, and (for `@jasonruesch/react`) the required `styles.css` import.

## 0.1.0

### Minor Changes

- 4e9b7cd: Set up automated npm publishing via Changesets and GitHub Actions, and publish the packages under the `@jasonruesch` scope.
