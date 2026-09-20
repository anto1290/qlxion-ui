import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Badge>New</Badge>);
    expect(getByText("New")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    expect(container.firstChild).toHaveClass("bg-secondary");
  });

  it("passes axe-core accessibility", async () => {
    const { container } = render(<Badge>Badge</Badge>);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
