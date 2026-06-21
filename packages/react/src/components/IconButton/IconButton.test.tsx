import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { checkA11y } from "../../test/a11y";
import { IconButton } from "./IconButton";

const Icon = () => <svg aria-hidden="true" viewBox="0 0 24 24" />;

describe("IconButton", () => {
  it("exposes its accessible label", () => {
    render(
      <IconButton aria-label="Add item">
        <Icon />
      </IconButton>,
    );
    expect(
      screen.getByRole("button", { name: "Add item" }),
    ).toBeInTheDocument();
  });

  it("calls onClick when pressed", async () => {
    const onClick = vi.fn();
    render(
      <IconButton aria-label="Add item" onClick={onClick}>
        <Icon />
      </IconButton>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Add item" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies variant and size classes", () => {
    render(
      <IconButton aria-label="Add item" variant="primary" size="lg">
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("bg-accent", "size-12");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <IconButton aria-label="Add item">
        <Icon />
      </IconButton>,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
