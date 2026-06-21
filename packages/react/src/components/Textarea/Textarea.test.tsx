import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Textarea } from "./Textarea";
import { Field } from "../Field";

describe("Textarea", () => {
  it("updates its value as the user types", async () => {
    render(<Textarea aria-label="Bio" />);
    const textarea = screen.getByRole("textbox", { name: "Bio" });
    await userEvent.type(textarea, "Hello");
    expect(textarea).toHaveValue("Hello");
  });

  it("inherits accessibility wiring from a parent Field", () => {
    render(
      <Field label="Bio" error="Required">
        <Textarea />
      </Field>,
    );
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Required");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Textarea aria-label="Bio" />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
