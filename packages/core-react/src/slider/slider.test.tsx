import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Slider } from "./slider";

describe("Slider", () => {
  it("handles value change on input range", () => {
    const onValueChange = vi.fn();
    render(<Slider defaultValue={20} min={0} max={100} onValueChange={onValueChange} />);
    const slider = screen.getByRole("slider");
    expect(slider.getAttribute("aria-valuenow")).toBe("20");

    fireEvent.change(slider, { target: { value: "50" } });
    expect(onValueChange).toHaveBeenCalledWith(50);
  });
});

describe("Slider accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <div>
        <label htmlFor="slider-1">Volume</label>
        <Slider id="slider-1" defaultValue={50} min={0} max={100} />
      </div>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
