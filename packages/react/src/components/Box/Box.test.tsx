import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Box } from "./Box";

describe("Box", () => {
  it("renders its children and merges className", () => {
    render(<Box className="custom-class">Content</Box>);
    const box = screen.getByText("Content");
    expect(box).toBeInTheDocument();
    expect(box).toHaveClass("custom-class");
  });

  it("renders as a different element when `as` is set", () => {
    render(
      <Box as="section" data-testid="box">
        Section
      </Box>,
    );
    expect(screen.getByTestId("box").tagName).toBe("SECTION");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Box>Accessible</Box>);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
