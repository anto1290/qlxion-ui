import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Switch } from "./switch";

describe("Switch", () => {
  it("toggles checked state when clicked", () => {
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);
    const sw = screen.getByRole("switch");
    expect(sw.getAttribute("aria-checked")).toBe("false");
    fireEvent.click(sw);
    expect(sw.getAttribute("aria-checked")).toBe("true");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});

describe("Switch accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(<Switch aria-label="Enable notifications" />);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
