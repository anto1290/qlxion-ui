import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Card } from "./card";

describe("Card", () => {
  it("renders children", () => {
    const { getByText } = render(<Card>hello</Card>);
    expect(getByText("hello")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    const { container } = render(<Card>content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("bg-background");
    expect(card).toHaveClass("p-4");
    expect(card).toHaveClass("rounded-md");
    expect(card).toHaveClass("shadow-sm");
  });

  it("outline variant adds border-border", () => {
    const { container } = render(<Card variant="outline">x</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("border-border");
  });

  it("padding sm/lg update padding class", () => {
    const { container: c1 } = render(<Card padding="sm" />);
    expect(c1.firstChild).toHaveClass("p-2");
    const { container: c2 } = render(<Card padding="lg" />);
    expect(c2.firstChild).toHaveClass("p-6");
  });

  it("radius sm/lg update radius class", () => {
    const { container: c1 } = render(<Card radius="sm" />);
    expect(c1.firstChild).toHaveClass("rounded-sm");
    const { container: c2 } = render(<Card radius="lg" />);
    expect(c2.firstChild).toHaveClass("rounded-lg");
  });

  it("render as element via as prop", () => {
    const { container } = render(<Card as="section">s</Card>);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});

describe("Card accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(<Card>test</Card>);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
