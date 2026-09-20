import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Toggle } from "./toggle";

describe("Toggle", () => {
  it("toggles aria-pressed attribute when clicked", () => {
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Bold</Toggle>);
    const btn = screen.getByRole("button", { name: "Bold" });
    expect(btn.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(btn);
    expect(btn.getAttribute("aria-pressed")).toBe("true");
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it("is disabled when disabled prop is true", () => {
    const { container } = render(<Toggle disabled>Bold</Toggle>);
    const btn = container.querySelector("button");
    expect(btn).toBeDisabled();
  });

  it("supports outline variant", () => {
    const { container } = render(<Toggle variant="outline">Bold</Toggle>);
    const btn = container.querySelector("button");
    expect(btn?.className).toContain("border");
  });

  it("supports size variants", () => {
    const { container } = render(<Toggle size="sm">Small</Toggle>);
    expect(container.querySelector("button")?.className).toContain("h-9");

    const { container: containerLg } = render(<Toggle size="lg">Large</Toggle>);
    expect(containerLg.querySelector("button")?.className).toContain("h-11");
  });

  it("starts in pressed state when defaultPressed=true", () => {
    const { container } = render(<Toggle defaultPressed>Bold</Toggle>);
    const btn = container.querySelector("button");
    expect(btn?.getAttribute("aria-pressed")).toBe("true");
  });
});

describe("Toggle accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(<Toggle>Bold</Toggle>);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
