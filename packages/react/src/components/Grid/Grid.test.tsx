import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("renders children with the grid layout", () => {
    render(
      <Grid data-testid="grid">
        <div>Child</div>
      </Grid>,
    );
    const grid = screen.getByTestId("grid");
    expect(grid).toHaveClass("grid");
    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  it("applies cols and gap variant classes", () => {
    render(
      <Grid cols={3} gap={6} data-testid="grid">
        <div>Child</div>
      </Grid>,
    );
    const grid = screen.getByTestId("grid");
    expect(grid).toHaveClass("grid-cols-3", "gap-6");
  });

  it("renders as a different element when `as` is set", () => {
    render(
      <Grid as="ul" data-testid="grid">
        <li>Item</li>
      </Grid>,
    );
    expect(screen.getByTestId("grid").tagName).toBe("UL");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Grid>
        <div>Accessible</div>
      </Grid>,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
