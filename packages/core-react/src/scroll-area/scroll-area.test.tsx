import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { ScrollArea } from "./scroll-area";

describe("ScrollArea", () => {
  it("renders scrollable viewport container", () => {
    render(
      <ScrollArea data-testid="scroll-area">
        <p>Scrollable content</p>
      </ScrollArea>
    );

    const el = screen.getByTestId("scroll-area");
    expect(el).toBeDefined();
    expect(screen.getByText("Scrollable content")).toBeDefined();
  });
});

describe("ScrollArea accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <ScrollArea data-testid="scroll-area">
        <p>Scrollable content</p>
      </ScrollArea>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
