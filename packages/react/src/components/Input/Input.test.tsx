import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Input } from "./Input";
import { Field } from "../Field";

describe("Input", () => {
  it("updates its value as the user types", async () => {
    render(<Input aria-label="Name" />);
    const input = screen.getByRole("textbox", { name: "Name" });
    await userEvent.type(input, "Jane");
    expect(input).toHaveValue("Jane");
  });

  it("inherits accessibility wiring from a parent Field", () => {
    render(
      <Field label="Email" error="Required">
        <Input />
      </Field>,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Required");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Input aria-label="Name" />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
