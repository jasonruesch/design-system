import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("has role=status with an accessible label", () => {
    render(<Spinner label="Loading data" />);
    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
    expect(screen.getByText("Loading data")).toBeInTheDocument();
  });

  it("defaults the label to Loading", () => {
    render(<Spinner />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Spinner />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
