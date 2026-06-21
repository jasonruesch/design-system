import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkA11y } from "../../test/a11y";
import { Alert, AlertDescription, AlertTitle } from "./Alert";

describe("Alert", () => {
  it("uses role=alert for the danger variant", () => {
    render(<Alert variant="danger">Boom</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("uses role=status for the info variant", () => {
    render(<Alert variant="info">Note</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders the title and description", () => {
    render(
      <Alert variant="success">
        <AlertTitle>Saved</AlertTitle>
        <AlertDescription>All good.</AlertDescription>
      </Alert>,
    );
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("All good.")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Alert variant="info">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Informational message.</AlertDescription>
      </Alert>,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
