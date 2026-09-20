import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders textarea element properly", () => {
    render(<Textarea placeholder="Type message..." />);
    const textarea = screen.getByPlaceholderText("Type message...");
    expect(textarea).toBeDefined();
  });
});

describe("Textarea accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(<Textarea placeholder="Type message..." />);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
