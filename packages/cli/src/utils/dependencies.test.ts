import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { resolveDependencies, validateComponentsExist } from "./dependencies.js";
import { join } from "path";
import { existsSync, writeFileSync, mkdirSync, rmSync } from "fs";

const TEST_DIR = join(process.cwd(), ".test-temp-deps");

function setup() {
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true, force: true });
  }
  mkdirSync(TEST_DIR, { recursive: true });
  // Create a minimal package.json
  writeFileSync(
    join(TEST_DIR, "package.json"),
    JSON.stringify({ name: "test", dependencies: {} })
  );
}

function teardown() {
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

describe("dependencies", () => {
  beforeEach(setup);
  afterEach(teardown);

  describe("resolveDependencies", () => {
    it("resolves a single component", () => {
      const result = resolveDependencies(["button"]);
      expect(result.components).toContain("button");
    });

    it("throws for non-existent component", () => {
      expect(() => resolveDependencies(["nonexistent"])).toThrow();
    });
  });

  describe("validateComponentsExist", () => {
    it("returns empty array for valid components", () => {
      const invalid = validateComponentsExist(["button"]);
      expect(invalid).toHaveLength(0);
    });

    it("returns invalid component names", () => {
      const invalid = validateComponentsExist(["nonexistent"]);
      expect(invalid).toContain("nonexistent");
    });
  });
});
