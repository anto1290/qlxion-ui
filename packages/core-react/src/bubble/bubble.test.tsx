import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Bubble } from "./bubble";

describe("Bubble", () => {
  it("renders user bubble with timestamp", () => {
    const { getByText } = render(
      <Bubble variant="user" timestamp="12:00">
        Halo
      </Bubble>
    );
    expect(getByText("Halo")).toBeInTheDocument();
    expect(getByText("12:00")).toBeInTheDocument();
  });

  it("renders bot bubble with different layout", () => {
    const { container } = render(<Bubble variant="bot">Bot message</Bubble>);
    expect(container.firstChild).toHaveClass("justify-start");
  });
});

describe("Bubble accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(<Bubble>Hello</Bubble>);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
