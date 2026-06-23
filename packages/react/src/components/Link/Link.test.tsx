import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Link } from "./Link";

describe("Link", () => {
  it("renders an anchor with its href and children", () => {
    render(<Link href="/home">Home</Link>);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/home",
    );
  });

  it("applies the variant class", () => {
    render(
      <Link href="/home" variant="subtle">
        Home
      </Link>,
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass(
      "text-fg-muted",
    );
  });

  it("renders the child element with merged styling when asChild is set", () => {
    render(
      <Link asChild variant="subtle">
        <a href="/home" data-testid="custom">
          Home
        </a>
      </Link>,
    );
    const link = screen.getByTestId("custom");
    expect(link).toHaveAttribute("href", "/home");
    expect(link).toHaveClass("text-fg-muted");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Link href="/home">Accessible</Link>);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
