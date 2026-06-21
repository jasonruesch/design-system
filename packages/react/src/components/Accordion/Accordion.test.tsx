import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

function renderAccordion() {
  return render(
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>First</AccordionTrigger>
        <AccordionContent>First panel content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second</AccordionTrigger>
        <AccordionContent>Second panel content</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );
}

describe("Accordion", () => {
  it("shows the default-open panel content", () => {
    renderAccordion();
    expect(screen.getByText("First panel content")).toBeVisible();
  });

  it("expands a closed item when its trigger is clicked", async () => {
    const user = userEvent.setup();
    renderAccordion();
    const secondTrigger = screen.getByRole("button", { name: "Second" });
    expect(secondTrigger).toHaveAttribute("aria-expanded", "false");
    await user.click(secondTrigger);
    expect(secondTrigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Second panel content")).toBeVisible();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderAccordion();
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
