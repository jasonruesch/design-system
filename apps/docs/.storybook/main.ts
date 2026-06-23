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
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
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
    // Serve assets from /<repo>/ for the production GitHub Pages build only.
    if (configType === "PRODUCTION") {
      cfg.base = basePath;
    }
    return cfg;
  },
};

export default config;
