import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { TypographyH1, TypographyP } from "./typography";

describe("Typography", () => {
  it("renders heading and paragraph correctly", () => {
    render(
      <div>
        <TypographyH1>Heading 1</TypographyH1>
        <TypographyP>Paragraph body</TypographyP>
      </div>
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
    expect(screen.getByText("Paragraph body")).toBeDefined();
  });

  it("renders typography variants", () => {
    const { container } = render(
      <div>
        <TypographyH1>H1</TypographyH1>
        <TypographyP>Body text</TypographyP>
      </div>
    );
    expect(container.querySelector("h1")).toBeDefined();
    expect(container.querySelector("p")).toBeDefined();
  });
});

describe("Typography accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <div>
        <TypographyH1>Heading</TypographyH1>
        <TypographyP>Body text</TypographyP>
      </div>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
