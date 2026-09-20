import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from "./sidebar";

describe("Sidebar", () => {
  it("renders sidebar with header, content and footer", () => {
    render(
      <Sidebar>
        <SidebarHeader>Header</SidebarHeader>
        <SidebarContent>Navigation items</SidebarContent>
        <SidebarFooter>Footer</SidebarFooter>
      </Sidebar>
    );

    expect(screen.getByRole("complementary")).toBeDefined();
    expect(screen.getByText("Header")).toBeDefined();
    expect(screen.getByText("Navigation items")).toBeDefined();
    expect(screen.getByText("Footer")).toBeDefined();
  });
});

describe("Sidebar accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <Sidebar>
        <SidebarHeader>Header</SidebarHeader>
        <SidebarContent>Items</SidebarContent>
      </Sidebar>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
