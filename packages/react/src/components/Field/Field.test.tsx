import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Field } from "./Field";
import { Input } from "../Input";

describe("Field", () => {
  it("renders the label and associates it with the control", () => {
    render(
      <Field label="Email">
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("describes the control with the description text", () => {
    render(
      <Field label="Email" description="We never share it.">
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText("Email")).toHaveAccessibleDescription(
      "We never share it.",
    );
  });

  it("marks the control invalid and describes it with the error", () => {
    render(
      <Field label="Email" error="Required">
        <Input />
      </Field>,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Required");
  });

  it("propagates required to the control", () => {
    render(
      <Field label="Email" required>
        <Input />
      </Field>,
    );
    expect(screen.getByRole("textbox")).toBeRequired();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Field label="Email" description="We never share it." error="Required">
        <Input />
      </Field>,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
