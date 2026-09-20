import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("renders loading status svg", () => {
    render(<Spinner />);
    const el = screen.getByRole("status");
    expect(el).toBeDefined();
    expect(el.getAttribute("aria-label")).toBe("Loading");
  });
});

describe("Spinner accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(<Spinner />);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
