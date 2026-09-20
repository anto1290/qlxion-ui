import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Calendar } from "./calendar";

describe("Calendar", () => {
  it("renders month grid and handles date selection", () => {
    const handleSelect = vi.fn();
    const testDate = new Date(2026, 8, 20); // Sept 20, 2026
    const { getByText } = render(<Calendar value={testDate} onChange={handleSelect} />);

    expect(getByText("September 2026")).toBeInTheDocument();
    fireEvent.click(getByText("15"));
    expect(handleSelect).toHaveBeenCalledWith(new Date(2026, 8, 15));
  });

  it("renders prev/next month buttons with labels", () => {
    const { getAllByLabelText } = render(<Calendar />);
    const prevButtons = getAllByLabelText(/Bulan sebelumnya/i);
    const nextButtons = getAllByLabelText(/Bulan berikutnya/i);
    expect(prevButtons.length).toBeGreaterThanOrEqual(1);
    expect(nextButtons.length).toBeGreaterThanOrEqual(1);
  });
});

describe("Calendar accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(<Calendar />);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
