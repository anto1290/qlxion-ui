import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { MessageScroller } from "./message-scroller";

describe("MessageScroller", () => {
  it("renders scroller with messages inside", () => {
    render(
      <MessageScroller data-testid="scroller">
        <div>Message 1</div>
        <div>Message 2</div>
      </MessageScroller>
    );

    expect(screen.getByTestId("scroller")).toBeDefined();
    expect(screen.getByText("Message 1")).toBeDefined();
    expect(screen.getByText("Message 2")).toBeDefined();
  });
});

describe("MessageScroller accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <MessageScroller>
        <div>Message</div>
      </MessageScroller>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
