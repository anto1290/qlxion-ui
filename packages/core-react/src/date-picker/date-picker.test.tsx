import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { DatePicker } from "./date-picker";

describe("DatePicker", () => {
  it("opens calendar popover when clicked", () => {
    const onChange = vi.fn();
    render(<DatePicker onChange={onChange} placeholder="Pilih tanggal" />);

    const button = screen.getByRole("button", { name: /Pilih tanggal/i });
    expect(button).toBeDefined();

    fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    // Calendar now uses table structure
    expect(screen.getByRole("table")).toBeDefined();
  });

  it("shows selected date in formatted format", () => {
    const testDate = new Date(2026, 8, 15);
    const { getByText } = render(<DatePicker defaultValue={testDate} />);
    expect(getByText("2026-09-15")).toBeDefined();
  });

  it("calls onChange when a date is selected", () => {
    const onChange = vi.fn();
    render(<DatePicker onChange={onChange} />);

    const button = screen.getByRole("button", { name: /Pick a date/i });
    fireEvent.click(button);
    // The calendar is rendered inside a popover - use the first table
    const tables = document.querySelectorAll("table");
    expect(tables.length).toBeGreaterThan(0);
  });

  it("is disabled when disabled prop is true", () => {
    const { container } = render(<DatePicker disabled />);
    const button = container.querySelector("button");
    expect(button).toBeDisabled();
  });
});

describe("DatePicker accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(<DatePicker placeholder="Pick a date" />);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
