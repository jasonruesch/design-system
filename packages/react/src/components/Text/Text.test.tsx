import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Text } from "./Text";

describe("Text", () => {
  it("renders its children as a paragraph by default", () => {
    render(<Text>Hello</Text>);
    const text = screen.getByText("Hello");
    expect(text.tagName).toBe("P");
  });

  it("applies size, weight, and tone variant classes", () => {
    render(
      <Text size="lg" weight="bold" tone="muted">
        Styled
      </Text>,
    );
    const text = screen.getByText("Styled");
    expect(text).toHaveClass("text-lg", "font-bold", "text-fg-muted");
  });

  it("renders as a different element when `as` is set", () => {
    render(<Text as="span">Inline</Text>);
    expect(screen.getByText("Inline").tagName).toBe("SPAN");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Text>Accessible</Text>);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
