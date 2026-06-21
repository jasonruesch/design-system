import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Switch } from "./Switch";
import { Label } from "../Label";

describe("Switch", () => {
  it("toggles its checked state when clicked", async () => {
    render(<Switch aria-label="Airplane mode" />);
    const toggle = screen.getByRole("switch", { name: "Airplane mode" });
    expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
    await userEvent.click(toggle);
    expect(toggle).not.toBeChecked();
  });

  it("does not toggle when disabled", async () => {
    render(<Switch aria-label="Airplane mode" disabled />);
    const toggle = screen.getByRole("switch", { name: "Airplane mode" });
    await userEvent.click(toggle);
    expect(toggle).not.toBeChecked();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div className="flex items-center gap-2">
        <Switch id="airplane" />
        <Label htmlFor="airplane">Airplane mode</Label>
      </div>,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
