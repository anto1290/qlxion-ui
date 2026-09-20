import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Field } from "./field";

describe("Field", () => {
  it("renders label with required indicator and associates with input", () => {
    render(
      <Field label="Email" required htmlFor="email">
        <input id="email" type="email" />
      </Field>
    );
    const label = screen.getByText(/Email/);
    expect(label).toBeDefined();
    const input = screen.getByLabelText(/Email/);
    expect(input).toBeDefined();
  });

  it("renders error message with alert role", () => {
    render(
      <Field label="Email" error="Invalid email format" htmlFor="email">
        <input id="email" type="email" />
      </Field>
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email format");
  });

  it("renders description when no error", () => {
    render(
      <Field label="Email" description="We'll never share your email" htmlFor="email">
        <input id="email" type="email" />
      </Field>
    );
    expect(screen.getByText("We'll never share your email")).toBeDefined();
  });
});

describe("Field accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <Field label="Email" htmlFor="email">
        <input id="email" type="email" />
      </Field>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });

  it("passes axe-core with error state", async () => {
    const { container } = render(
      <Field label="Email" error="Invalid" htmlFor="email">
        <input id="email" type="email" />
      </Field>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
