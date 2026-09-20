import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { DataTable } from "./data-table";

describe("DataTable", () => {
  it("renders rows and columns from data props", () => {
    const data = [
      { id: "1", name: "Alice", role: "Admin" },
      { id: "2", name: "Bob", role: "User" },
    ];
    const columns = [
      { key: "id", header: "ID" },
      { key: "name", header: "Name" },
      { key: "role", header: "Role" },
    ];

    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("Bob")).toBeDefined();
    expect(screen.getByText("Admin")).toBeDefined();
  });

  it("renders empty message when no data", () => {
    render(<DataTable columns={[{ key: "id", header: "ID" }]} data={[]} />);
    expect(screen.getByText("No results.")).toBeDefined();
  });
});

describe("DataTable accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const data = [{ id: "1", name: "Alice" }];
    const columns = [
      { key: "id", header: "ID" },
      { key: "name", header: "Name" },
    ];
    const { container } = render(<DataTable columns={columns} data={data} />);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
