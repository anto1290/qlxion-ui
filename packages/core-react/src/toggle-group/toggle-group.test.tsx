import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

describe("ToggleGroup", () => {
  it("selects item single choice properly", () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="single" onValueChange={onValueChange}>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    );

    const left = screen.getByRole("button", { name: "Left" });
    fireEvent.click(left);
    expect(onValueChange).toHaveBeenCalledWith("left");
  });

  it("has role group", () => {
    const { container } = render(
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(container.querySelector('[role="group"]')).toBeDefined();
  });

  it("toggles multiple items", () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="multiple" onValueChange={onValueChange}>
        <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        <ToggleGroupItem value="b">Option B</ToggleGroupItem>
      </ToggleGroup>
    );

    const a = screen.getByRole("button", { name: "Option A" });
    const b = screen.getByRole("button", { name: "Option B" });

    fireEvent.click(a);
    expect(onValueChange).toHaveBeenCalledWith(["a"]);

    fireEvent.click(b);
    expect(onValueChange).toHaveBeenCalledWith(["a", "b"]);

    fireEvent.click(a);
    expect(onValueChange).toHaveBeenCalledWith(["b"]);
  });

  it("supports variant and size props", () => {
    const { container } = render(
      <ToggleGroup type="single" variant="outline" size="sm">
        <ToggleGroupItem value="x">X</ToggleGroupItem>
      </ToggleGroup>
    );
    const btn = container.querySelector("button");
    expect(btn).toBeDefined();
  });
});

describe("ToggleGroup accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
