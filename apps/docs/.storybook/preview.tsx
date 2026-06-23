import * as React from "react";
import type { Preview, Decorator } from "@storybook/react-vite";

// Source Tailwind entry — @tailwindcss/vite compiles it (incl. token CSS vars)
// and rebuilds utilities live as stories change.
import "../../../packages/react/src/styles/tailwind.css";

const withTheme: Decorator = (Story, context) => {
  const { theme, brand } = context.globals;

  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (brand && brand !== "default") {
      root.setAttribute("data-brand", brand);
    } else {
      root.removeAttribute("data-brand");
    }
  }, [theme, brand]);

  return (
    <div className="min-h-svh bg-canvas p-6 text-fg">
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "todo" },
  },
  globalTypes: {
    theme: {
      description: "Color mode",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
    brand: {
      description: "Brand",
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        items: [
          { value: "default", title: "Default" },
          { value: "acme", title: "Acme" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
    brand: "default",
  },
  decorators: [withTheme],
  tags: ["autodocs"],
};

export default preview;
