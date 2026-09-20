import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Empty } from "./empty";

describe("Empty", () => {
  it("renders title and description", () => {
    render(<Empty title="No data" description="There is nothing here" />);
    expect(screen.getByText("No data")).toBeDefined();
    expect(screen.getByText("There is nothing here")).toBeDefined();
  });

  it("renders custom action button", () => {
    render(<Empty action={<button>Add Item</button>} />);
    expect(screen.getByRole("button", { name: "Add Item" })).toBeDefined();
  });
});

describe("Empty accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(<Empty title="No data" description="There is nothing here" />);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
