import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";

function Example() {
  return (
    <Select>
      <SelectTrigger aria-label="Fruit">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("renders a combobox trigger with an accessible name", () => {
    render(<Example />);
    expect(screen.getByRole("combobox", { name: "Fruit" })).toBeInTheDocument();
  });

  it("shows the placeholder while closed", () => {
    render(<Example />);
    expect(screen.getByText("Select a fruit")).toBeInTheDocument();
  });

  it("has no accessibility violations on the closed trigger", async () => {
    const { container } = render(<Example />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
