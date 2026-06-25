import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves this project site under /<repo>/.
const basePath = "/design-system/";

// rafgraph's Single Page Apps for GitHub Pages redirect.
// 404.html (in ../public) encodes the requested path into a query string and
// redirects to index.html; this snippet decodes it back so deep links work.
// https://github.com/rafgraph/spa-github-pages
const spaRedirect = `
<script type="text/javascript">
  // Single Page Apps for GitHub Pages
  // MIT License
  // https://github.com/rafgraph/spa-github-pages
  (function (l) {
    if (l.search[1] === '/') {
      var decoded = l.search
        .slice(1)
        .split('&')
        .map(function (s) {
          return s.replace(/~and~/g, '&');
        })
        .join('?');
      window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
    }
  })(window.location);
</script>
`;

const config: StorybookConfig = {
  // Stories are co-located with each component in @jasonruesch/react.
  stories: ["../../../packages/react/src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // Copies 404.html (and .nojekyll) into the build output for GitHub Pages.
  staticDirs: ["../public"],
  // Inject the rafgraph redirect handler into the manager's index.html head.
  managerHead: (head) => `${head}${spaRedirect}`,
  viteFinal: async (cfg, { configType }) => {
    cfg.plugins = cfg.plugins ?? [];
    cfg.plugins.push(tailwindcss());
    // Only the GitHub Pages deploy build needs to serve assets from /<repo>/, so
    // it opts in by setting STORYBOOK_BASE_PATH. Every other production build —
    // the CI Chromatic run, the local Visual Tests addon, the `chromatic` CLI —
    // serves from a root domain, where the base path makes every asset 404 and
    // Chromatic reports "Failed to verify your Storybook" / "JavaScript failed
    // to load". Opt-in (vs. opt-out) keeps any new Chromatic entry point correct
    // by default.
    if (configType === "PRODUCTION" && process.env.STORYBOOK_BASE_PATH) {
      cfg.base = basePath;
    }
    return cfg;
  },
};

export default config;
