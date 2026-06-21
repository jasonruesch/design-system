import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders an h2 by default", () => {
    render(<Heading>Title</Heading>);
    expect(
      screen.getByRole("heading", { level: 2, name: "Title" }),
    ).toBeInTheDocument();
  });

  it("renders the tag matching the level", () => {
    render(<Heading level={1}>Big</Heading>);
    expect(
      screen.getByRole("heading", { level: 1, name: "Big" }),
    ).toBeInTheDocument();
  });

  it("uses `as` to override the semantic tag independent of level", () => {
    render(
      <Heading level={1} as="h3">
        Visual one, semantic three
      </Heading>,
    );
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveClass("text-4xl");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Heading>Accessible</Heading>);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
