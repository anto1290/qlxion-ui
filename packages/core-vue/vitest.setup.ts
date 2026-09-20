import { expect } from "vitest";
import "@testing-library/jest-dom/vitest";

// Extend expect with custom matchers
declare module "vitest" {
  interface Assertion<T> {
    toHaveClass(classes: string): void;
    toBeDisabled(): void;
  }
}

expect.extend({
  toHaveClass(received: Element, classes: string) {
    const classList = received.className as string;
    const passes = classes.split(" ").every((c) => classList.includes(c));
    return {
      pass: passes,
      message: () =>
        `expected element to have class ${classes}, but had ${classList}`,
    };
  },
  toBeDisabled(received: Element) {
    const isDisabled = received.hasAttribute("disabled");
    return {
      pass: isDisabled,
      message: () => "expected element to be disabled",
    };
  },
});