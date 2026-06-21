import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

function renderTabs() {
  return render(
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTrigger value="a">Tab A</TabsTrigger>
        <TabsTrigger value="b">Tab B</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Panel A content</TabsContent>
      <TabsContent value="b">Panel B content</TabsContent>
    </Tabs>,
  );
}

describe("Tabs", () => {
  it("shows the default active panel and hides the inactive one", () => {
    renderTabs();
    expect(screen.getByText("Panel A content")).toBeInTheDocument();
    expect(screen.queryByText("Panel B content")).not.toBeInTheDocument();
  });

  it("switches panels when another tab is clicked", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole("tab", { name: "Tab B" }));
    expect(screen.getByText("Panel B content")).toBeInTheDocument();
    expect(screen.queryByText("Panel A content")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderTabs();
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
