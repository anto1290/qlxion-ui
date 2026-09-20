import "@testing-library/jest-dom/vitest";
import type { Assertion } from "vitest";

interface CustomMatchers {
  toHaveClass(classes: string): void;
  toHaveAttribute(name: string, value?: string): void;
  toBeDisabled(): void;
  toBeInTheDocument(): void;
}

declare module "vitest" {
  interface Assertion<T> extends CustomMatchers {}
}
