import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Alert, AlertTitle, AlertDescription } from "./alert";

describe("Alert", () => {
  it("renders title and description", () => {
    const { getByText } = render(
      <Alert>
        <AlertTitle>Perhatian</AlertTitle>
        <AlertDescription>Pesan alert</AlertDescription>
      </Alert>
    );
    expect(getByText("Perhatian")).toBeInTheDocument();
    expect(getByText("Pesan alert")).toBeInTheDocument();
  });

  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Notice</AlertTitle>
        <AlertDescription>Content</AlertDescription>
      </Alert>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
