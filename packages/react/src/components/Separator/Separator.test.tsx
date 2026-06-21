import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Separator } from "./Separator";

describe("Separator", () => {
  it("exposes role=separator when not decorative", () => {
    render(<Separator decorative={false} />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("reflects the orientation attribute", () => {
    render(<Separator decorative={false} orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });

  it("has no separator role when decorative (default)", () => {
    render(<Separator data-testid="sep" />);
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
    expect(screen.getByTestId("sep")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Separator decorative={false} />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
