import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { AspectRatio } from "./aspect-ratio";

describe("AspectRatio", () => {
  it("renders children with padding bottom ratio style", () => {
    const { container, getByText } = render(
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    );
    expect(getByText("Content")).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({ paddingBottom: "56.25%" });
  });
});

describe("AspectRatio accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
