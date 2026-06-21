import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Container } from "./Container";

describe("Container", () => {
  it("renders children centered with default max width", () => {
    render(
      <Container data-testid="container">
        <div>Child</div>
      </Container>,
    );
    const container = screen.getByTestId("container");
    expect(container).toHaveClass("mx-auto", "max-w-screen-lg");
    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  it("applies the size variant class", () => {
    render(
      <Container size="sm" data-testid="container">
        <div>Child</div>
      </Container>,
    );
    expect(screen.getByTestId("container")).toHaveClass("max-w-screen-sm");
  });

  it("renders as a different element when `as` is set", () => {
    render(
      <Container as="main" data-testid="container">
        <div>Child</div>
      </Container>,
    );
    expect(screen.getByTestId("container").tagName).toBe("MAIN");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Container>
        <div>Accessible</div>
      </Container>,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
