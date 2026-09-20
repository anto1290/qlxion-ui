import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Input } from "./input";

beforeEach(() => {
  cleanup();
});

describe("Input", () => {
  describe("variants", () => {
    it("renders default variant", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
      expect(input).not.toHaveClass("border-destructive");
    });

    it("renders destructive variant with correct classes", () => {
      const { container } = render(<Input variant="destructive" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("border-destructive");
      expect(input).toHaveClass("focus-visible:ring-destructive");
    });
  });

  describe("sizes", () => {
    it("renders default size with h-9", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("h-9");
    });

    it("renders sm size with h-8", () => {
      const { container } = render(<Input size="sm" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("h-8");
    });

    it("renders lg size with h-10", () => {
      const { container } = render(<Input size="lg" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("h-10");
    });
  });

  describe("disabled state", () => {
    it("has disabled attribute when disabled", () => {
      const { container } = render(<Input disabled />);
      const input = container.querySelector("input");
      expect(input).toBeDisabled();
    });

    it("has aria-disabled attribute when disabled", () => {
      const { container } = render(<Input disabled />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("aria-disabled", "true");
    });

    it("does not trigger onChange when disabled", () => {
      const handleChange = vi.fn();
      const { container } = render(<Input disabled onChange={handleChange} />);
      const input = container.querySelector("input")!;
      input.dispatchEvent(new Event("change", { bubbles: true }));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("error state", () => {
    it("shows error message", () => {
      const { getByText } = render(<Input error="Invalid email" />);
      expect(getByText("Invalid email")).toBeInTheDocument();
    });

    it("has aria-invalid=true when error", () => {
      const { container } = render(<Input error="Invalid" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("applies destructive border when error", () => {
      const { container } = render(<Input error="Invalid" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("border-destructive");
    });

    it("links error via aria-describedby", () => {
      const { container } = render(<Input error="Invalid" id="my-input" />);
      const input = container.querySelector("input");
      const errorEl = document.getElementById("my-input-error");
      expect(input).toHaveAttribute("aria-describedby", "my-input-error");
      expect(errorEl).toBeInTheDocument();
    });
  });

  describe("prefix/suffix/icon", () => {
    it("renders prefix", () => {
      const { getByText } = render(<Input prefix="$" />);
      expect(getByText("$")).toBeInTheDocument();
    });

    it("renders suffix", () => {
      const { getByText } = render(<Input suffix="@example.com" />);
      expect(getByText("@example.com")).toBeInTheDocument();
    });

    it("applies padding when prefix or icon present", () => {
      const { container } = render(<Input icon={<span>icon</span>} />);
      const wrapper = container.querySelector(".relative");
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe("type", () => {
    it("renders password type correctly", () => {
      const { container } = render(<Input type="password" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "password");
    });
  });

  describe("forwardRef", () => {
    it("forwards ref to input element", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe("controlled value", () => {
    it("reflects controlled value", () => {
      const { container } = render(<Input value="hello" />);
      const input = container.querySelector("input");
      expect(input).toHaveValue("hello");
    });
  });
});

describe("Input accessibility", () => {
  it("passes axe-core accessibility check", async () => {
    const { container } = render(<Input label="Email" placeholder="Enter email" />);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });

  it("passes axe-core with error state", async () => {
    const { container } = render(<Input label="Email" error="Invalid email" />);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });

  it("disabled input cannot receive focus", () => {
    const { container } = render(
      <>
        <Input label="First" />
        <Input label="Second" disabled />
      </>
    );
    const inputs = container.querySelectorAll("input");
    expect(inputs[1]).toBeDisabled();
  });
});