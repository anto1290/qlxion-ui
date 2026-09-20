import { describe, it, expect } from "vitest";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "./dropdown";

describe("Dropdown", () => {
  it("renders menu items when trigger clicked", () => {
    const { getByText, queryByText } = render(
      <Dropdown>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="edit">Edit</DropdownItem>
        </DropdownContent>
      </Dropdown>
    );

    expect(queryByText("Edit")).not.toBeInTheDocument();
    fireEvent.click(getByText("Menu"));
    expect(getByText("Edit")).toBeInTheDocument();
  });
});

describe("Dropdown accessibility", () => {
  it("passes axe-core accessibility when closed", async () => {
    const { container } = render(
      <Dropdown>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="edit">Edit</DropdownItem>
        </DropdownContent>
      </Dropdown>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
