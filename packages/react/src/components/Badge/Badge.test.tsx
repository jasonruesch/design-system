import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<Badge variant="success">Done</Badge>);
    const badge = screen.getByText("Done");
    expect(badge).toHaveClass("bg-success-subtle", "text-success-fg");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge>Accessible</Badge>);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
