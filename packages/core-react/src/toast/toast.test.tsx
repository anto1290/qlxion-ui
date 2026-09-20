import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Toast, ToastTitle, ToastDescription } from "./toast";

describe("Toast", () => {
  it("renders toast message with role status", () => {
    render(
      <Toast>
        <ToastTitle>Notification</ToastTitle>
        <ToastDescription>Action completed</ToastDescription>
      </Toast>
    );

    expect(screen.getByRole("status")).toBeDefined();
    expect(screen.getByText("Notification")).toBeDefined();
    expect(screen.getByText("Action completed")).toBeDefined();
  });
});

describe("Toast accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <Toast>
        <ToastTitle>Notification</ToastTitle>
        <ToastDescription>Action completed</ToastDescription>
      </Toast>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
