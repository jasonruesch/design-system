import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";

// Radix Tooltip measures its trigger via ResizeObserver, which jsdom does not
// implement. Provide a minimal no-op polyfill for the test environment.
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === "undefined") {
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
});
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";

function renderTooltip() {
  return render(
    <TooltipProvider>
      <Tooltip defaultOpen>
        <TooltipTrigger>Hover</TooltipTrigger>
        <TooltipContent>Helpful hint</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );
}

describe("Tooltip", () => {
  it("renders the trigger", () => {
    renderTooltip();
    expect(screen.getByRole("button", { name: /Hover/ })).toBeInTheDocument();
  });

  it("shows the content when open by default", () => {
    renderTooltip();
    // Radix renders the visible content plus an a11y mirror, so there may be
    // more than one node with the text.
    expect(screen.getAllByText("Helpful hint").length).toBeGreaterThan(0);
  });

  it("has no accessibility violations when open", async () => {
    renderTooltip();
    // Scope to the tooltip itself; the whole document body would trip the
    // "region" landmark rule on the floating popper wrapper.
    expect(await checkA11y(screen.getByRole("tooltip"))).toHaveNoViolations();
  });
});
