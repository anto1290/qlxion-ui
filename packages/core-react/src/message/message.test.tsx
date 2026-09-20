import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Message } from "./message";

describe("Message", () => {
  it("renders message with sender and bubble content", () => {
    render(
      <Message sender="Alice" status="delivered" timestamp="12:00">
        Hello world!
      </Message>
    );

    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("Hello world!")).toBeDefined();
    expect(screen.getByText("delivered")).toBeDefined();
  });
});

describe("Message accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(<Message sender="Alice">Hello</Message>);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
