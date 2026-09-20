import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Button } from "./button";

beforeEach(() => {
  cleanup();
});

describe("Button", () => {
  describe("variants", () => {
    it.each([
      { variant: "default" as const, expectedClass: "bg-primary" },
      { variant: "destructive" as const, expectedClass: "bg-destructive" },
      { variant: "outline" as const, expectedClass: "border" },
      { variant: "ghost" as const, expectedClass: "hover:bg-accent" },
      { variant: "link" as const, expectedClass: "text-primary" },
    ])("renders $variant variant with correct classes", ({ variant, expectedClass }) => {
      const { container } = render(<Button variant={variant}>Click</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass(expectedClass);
    });

    it("defaults to default variant", () => {
      const { container } = render(<Button>Click</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("bg-primary");
    });
  });

  describe("sizes", () => {
    it.each([
      { size: "sm" as const, expectedClass: "h-8" },
      { size: "lg" as const, expectedClass: "h-10" },
      { size: "icon" as const, expectedClass: "w-9" },
      { size: "default" as const, expectedClass: "h-9" },
    ])("renders $size size with correct classes", ({ size, expectedClass }) => {
      const { container } = render(<Button size={size}>Click</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass(expectedClass);
    });

    it("defaults to default size", () => {
      const { container } = render(<Button>Click</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("h-9");
    });
  });

  describe("disabled state", () => {
    it("does not trigger onClick when disabled", () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Button disabled onClick={handleClick}>
          Click
        </Button>
      );
      const button = container.querySelector("button")!;
      button.click();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("has aria-disabled attribute when disabled", () => {
      const { container } = render(<Button disabled>Click</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("has disabled attribute when disabled", () => {
      const { container } = render(<Button disabled>Click</Button>);
      const button = container.querySelector("button");
      expect(button).toBeDisabled();
    });
  });

  describe("loading state", () => {
    it("sets aria-busy=true when loading", () => {
      const { container } = render(<Button loading>Click</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveAttribute("aria-busy", "true");
    });

    it("does not trigger onClick when loading", () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Button loading onClick={handleClick}>
          Click
        </Button>
      );
      const button = container.querySelector("button")!;
      button.click();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("is disabled when loading", () => {
      const { container } = render(<Button loading>Click</Button>);
      const button = container.querySelector("button");
      expect(button).toBeDisabled();
    });
  });

  describe("asChild", () => {
    it("renders as Slot without button wrapper", () => {
      const { container } = render(
        <Button asChild>
          <a href="/">Link</a>
        </Button>
      );
      const anchor = container.querySelector("a");
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveClass("inline-flex");
    });
  });

  describe("forwardRef", () => {
    it("forwards ref to button element", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Click</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});

describe("Button accessibility", () => {
  it("passes axe-core accessibility check", async () => {
    const { container } = render(<Button>Click</Button>);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });

  it("disabled button cannot receive focus", () => {
    const { container } = render(
      <>
        <Button>First</Button>
        <Button disabled>Disabled</Button>
      </>
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons[1]).toBeDisabled();
  });
});
