import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("renders children with the column flex layout", () => {
    render(
      <Stack data-testid="stack">
        <div>Child</div>
      </Stack>,
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("flex", "flex-col");
    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  it("applies gap and align variant classes", () => {
    render(
      <Stack gap={8} align="center" data-testid="stack">
        <div>Child</div>
      </Stack>,
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("gap-8", "items-center");
  });

  it("renders as a different element when `as` is set", () => {
    render(
      <Stack as="ul" data-testid="stack">
        <li>Item</li>
      </Stack>,
    );
    expect(screen.getByTestId("stack").tagName).toBe("UL");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Stack>
        <div>Accessible</div>
      </Stack>,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
