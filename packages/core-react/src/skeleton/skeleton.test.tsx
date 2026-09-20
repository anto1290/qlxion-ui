import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders with animation class", () => {
    render(<Skeleton data-testid="skeleton" />);
    const el = screen.getByTestId("skeleton");
    expect(el).toBeDefined();
    expect(el.className).toContain("animate-pulse");
  });
});

describe("Skeleton accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(<Skeleton data-testid="skeleton" />);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
