import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

function renderPopover(defaultOpen = true) {
  return render(
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent aria-label="Details">Popover body content</PopoverContent>
    </Popover>,
  );
}

describe("Popover", () => {
  it("shows the content when open by default", () => {
    renderPopover();
    expect(screen.getByText("Popover body content")).toBeInTheDocument();
  });

  it("opens when the trigger is clicked", async () => {
    const user = userEvent.setup();
    renderPopover(false);
    expect(screen.queryByText("Popover body content")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Popover body content")).toBeInTheDocument();
  });

  it("has no accessibility violations when open", async () => {
    renderPopover();
    // Scope to the portaled content; the whole document body would trip the
    // "region" landmark rule on the floating wrapper.
    expect(
      await checkA11y(screen.getByRole("dialog", { name: "Details" })),
    ).toHaveNoViolations();
  });
});
