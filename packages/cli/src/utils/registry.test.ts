import { describe, it, expect } from "vitest";
import { getRegistryComponent, listRegistryComponents } from "./registry.js";

describe("registry", () => {
  describe("listRegistryComponents", () => {
    it("returns a non-empty array", () => {
      const components = listRegistryComponents();
      expect(components.length).toBeGreaterThan(0);
    });

    it("returns component names without .json extension", () => {
      const components = listRegistryComponents();
      components.forEach((name) => {
        expect(name.endsWith(".json")).toBe(false);
      });
    });

    it("includes 'button' in the list", () => {
      const components = listRegistryComponents();
      expect(components).toContain("button");
    });
  });

  describe("getRegistryComponent", () => {
    it("returns component data for existing component", () => {
      const button = getRegistryComponent("button");
      expect(button).not.toBeNull();
      expect(button.name).toBe("button");
    });

    it("returns null for non-existent component", () => {
      const missing = getRegistryComponent("nonexistent-component");
      expect(missing).toBeNull();
    });
  });
});
