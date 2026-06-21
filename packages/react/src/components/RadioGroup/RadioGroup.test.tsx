import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Label } from "../Label";

function Example() {
  return (
    <RadioGroup defaultValue="one">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="one" id="one" />
        <Label htmlFor="one">One</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="two" id="two" />
        <Label htmlFor="two">Two</Label>
      </div>
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("selects an item when clicked", async () => {
    render(<Example />);
    const one = screen.getByRole("radio", { name: "One" });
    const two = screen.getByRole("radio", { name: "Two" });
    expect(one).toBeChecked();
    expect(two).not.toBeChecked();
    await userEvent.click(two);
    expect(two).toBeChecked();
    expect(one).not.toBeChecked();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
