import * as React from "react";
import { addons, types, useStorybookApi } from "storybook/manager-api";
import {
  IconButton,
  TooltipLinkList,
  WithTooltip,
} from "storybook/internal/components";

import { themeFor } from "./theme";
import {
  ADDON_ID,
  BRAND_EVENT,
  BRAND_ITEMS,
  BRAND_TOOL_ID,
  REQUEST_EVENT,
  THEME_EVENT,
  THEME_ITEMS,
  THEME_TOOL_ID,
  applyToPreviewIframe,
  readBrandChoice,
  readThemeChoice,
  resolveTheme,
  writeBrandChoice,
  writeThemeChoice,
  type BrandChoice,
  type ThemeChoice,
} from "./theme-addon";

// Theme the Storybook chrome (sidebar/toolbar) at boot to match the persisted
// choice, before the toolbar tool mounts and takes over.
addons.setConfig({
  theme: themeFor(resolveTheme(readThemeChoice())),
});

// --- Inline toolbar icons (avoids a runtime dep on @storybook/icons) ---------
const svg = (children: React.ReactNode) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const themeIcon = (choice: ThemeChoice): React.ReactNode => {
  if (choice === "light")
    return svg(
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </>,
    );
  if (choice === "dark")
    return svg(<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />);
  // system
  return svg(
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>,
  );
};

const brandIcon = (): React.ReactNode =>
  svg(
    <>
      <circle cx="13.5" cy="6.5" r="2.5" />
      <circle cx="6.5" cy="11.5" r="2.5" />
      <circle cx="17.5" cy="13.5" r="2.5" />
      <circle cx="10" cy="18" r="2.5" />
    </>,
  );

// --- A native-looking toolbar dropdown ---------------------------------------
type Item<T extends string> = { value: T; title: string };

const ToolbarMenu = <T extends string>({
  toolbarTitle,
  icon,
  items,
  value,
  onSelect,
}: {
  toolbarTitle: string;
  icon: React.ReactNode;
  items: readonly Item<T>[];
  value: T;
  onSelect: (value: T) => void;
}) => {
  const current = items.find((i) => i.value === value);
  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnOutsideClick
      tooltip={({ onHide }: { onHide: () => void }) => (
        <TooltipLinkList
          links={items.map((it) => ({
            id: it.value,
            title: it.title,
            active: it.value === value,
            onClick: () => {
              onSelect(it.value);
              onHide();
            },
          }))}
        />
      )}
    >
      <IconButton key={toolbarTitle} title={toolbarTitle} active={false}>
        {icon}
        <span style={{ marginLeft: 6 }}>{current?.title ?? toolbarTitle}</span>
      </IconButton>
    </WithTooltip>
  );
};

// --- Theme tool (System / Light / Dark) --------------------------------------
const ThemeTool = () => {
  const api = useStorybookApi();
  const [choice, setChoice] = React.useState<ThemeChoice>(() =>
    readThemeChoice(),
  );

  // Re-theme the chrome and the preview together, given a choice. The chrome
  // (setOptions) and the iframe write happen synchronously in this tick so they
  // switch in the same frame; the channel emit additionally drives the docs
  // container's emotion theme (and any other preview-side listeners).
  const broadcast = React.useCallback(
    (c: ThemeChoice) => {
      const resolved = resolveTheme(c);
      api.setOptions({ theme: themeFor(resolved) });
      applyToPreviewIframe(resolved, null);
      api.getChannel()?.emit(THEME_EVENT, { choice: c });
    },
    [api],
  );

  const select = (c: ThemeChoice) => {
    writeThemeChoice(c);
    setChoice(c);
    broadcast(c);
  };

  // Follow live OS changes while on System.
  React.useEffect(() => {
    if (choice !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => broadcast("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [choice, broadcast]);

  // Re-broadcast when a (re)loaded preview iframe asks for the current state.
  React.useEffect(() => {
    const ch = api.getChannel();
    if (!ch) return;
    const onRequest = () => broadcast(readThemeChoice());
    ch.on(REQUEST_EVENT, onRequest);
    return () => ch.off(REQUEST_EVENT, onRequest);
  }, [api, broadcast]);

  return (
    <ToolbarMenu
      toolbarTitle="Theme"
      icon={themeIcon(choice)}
      items={THEME_ITEMS}
      value={choice}
      onSelect={select}
    />
  );
};

// --- Brand tool (Default / Acme) ---------------------------------------------
const BrandTool = () => {
  const api = useStorybookApi();
  const [brand, setBrand] = React.useState<BrandChoice>(() =>
    readBrandChoice(),
  );

  const broadcast = React.useCallback(
    (b: BrandChoice) => {
      applyToPreviewIframe(null, b);
      api.getChannel()?.emit(BRAND_EVENT, { brand: b });
    },
    [api],
  );

  const select = (b: BrandChoice) => {
    writeBrandChoice(b);
    setBrand(b);
    broadcast(b);
  };

  React.useEffect(() => {
    const ch = api.getChannel();
    if (!ch) return;
    const onRequest = () => broadcast(readBrandChoice());
    ch.on(REQUEST_EVENT, onRequest);
    return () => ch.off(REQUEST_EVENT, onRequest);
  }, [api, broadcast]);

  return (
    <ToolbarMenu
      toolbarTitle="Brand"
      icon={brandIcon()}
      items={BRAND_ITEMS}
      value={brand}
      onSelect={select}
    />
  );
};

addons.register(ADDON_ID, () => {
  const match = ({ viewMode }: { viewMode?: string }) =>
    viewMode === "story" || viewMode === "docs";

  addons.add(THEME_TOOL_ID, {
    type: types.TOOL,
    title: "Theme",
    match,
    render: () => <ThemeTool />,
  });

  addons.add(BRAND_TOOL_ID, {
    type: types.TOOL,
    title: "Brand",
    match,
    render: () => <BrandTool />,
  });
});
