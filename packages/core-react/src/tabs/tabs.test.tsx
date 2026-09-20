import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

describe("Tabs", () => {
  it("switches active tab content on click", () => {
    render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account settings</TabsContent>
        <TabsContent value="password">Change password</TabsContent>
      </Tabs>
    );

    expect(screen.getByText("Account settings")).toBeDefined();
    expect(screen.queryByText("Change password")).toBeNull();

    fireEvent.click(screen.getByRole("tab", { name: "Password" }));

    expect(screen.queryByText("Account settings")).toBeNull();
    expect(screen.getByText("Change password")).toBeDefined();
  });
});

describe("Tabs accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account settings</TabsContent>
        <TabsContent value="password">Change password</TabsContent>
      </Tabs>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
