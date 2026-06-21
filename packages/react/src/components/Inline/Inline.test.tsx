import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Inline } from "./Inline";

describe("Inline", () => {
  it("renders children with the row flex layout", () => {
    render(
      <Inline data-testid="inline">
        <div>Child</div>
      </Inline>,
    );
    const inline = screen.getByTestId("inline");
    expect(inline).toHaveClass("flex", "flex-row");
    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  it("applies wrap and gap variant classes", () => {
    render(
      <Inline wrap gap={6} data-testid="inline">
        <div>Child</div>
      </Inline>,
    );
    const inline = screen.getByTestId("inline");
    expect(inline).toHaveClass("flex-wrap", "gap-6");
  });

  it("renders as a different element when `as` is set", () => {
    render(
      <Inline as="nav" data-testid="inline">
        <a href="/">Home</a>
      </Inline>,
    );
    expect(screen.getByTestId("inline").tagName).toBe("NAV");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Inline>
        <div>Accessible</div>
      </Inline>,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
