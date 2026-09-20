import { describe, it, expect } from "vitest";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./select";

describe("Select", () => {
  it("selects an item value", () => {
    const { getByRole, getByText, queryByText } = render(
      <Select defaultValue="id">
        <SelectTrigger>
          <SelectValue placeholder="Pilih Bahasa" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="id">Indonesia</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    );

    fireEvent.click(getByRole("combobox"));
    expect(getByText("English")).toBeInTheDocument();
    fireEvent.click(getByText("English"));
    expect(getByText("English")).toBeInTheDocument();
  });
});

describe("Select accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <Select defaultValue="id">
        <SelectTrigger aria-label="Pilih Bahasa">
          <SelectValue placeholder="Pilih Bahasa" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="id">Indonesia</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
