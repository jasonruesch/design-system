import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Checkbox } from "./Checkbox";
import { Label } from "../Label";

describe("Checkbox", () => {
  it("toggles its checked state when clicked", async () => {
    render(<Checkbox aria-label="Accept" />);
    const checkbox = screen.getByRole("checkbox", { name: "Accept" });
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("does not toggle when disabled", async () => {
    render(<Checkbox aria-label="Accept" disabled />);
    const checkbox = screen.getByRole("checkbox", { name: "Accept" });
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms</Label>
      </div>,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
