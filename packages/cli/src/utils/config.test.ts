import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { readConfig, writeConfig, configExists, validateConfig, getDefaultConfig } from "./config.js";
import { join, dirname } from "path";
import { existsSync, writeFileSync, unlinkSync } from "fs";

const TEST_DIR = join(process.cwd(), ".test-temp");
const CONFIG_PATH = join(TEST_DIR, "qlxion.config.json");

function setup() {
  if (!existsSync(TEST_DIR)) {
    require("fs").mkdirSync(TEST_DIR, { recursive: true });
  }
}

function teardown() {
  if (existsSync(CONFIG_PATH)) {
    unlinkSync(CONFIG_PATH);
  }
  if (existsSync(TEST_DIR)) {
    require("fs").rmdirSync(TEST_DIR);
  }
}

describe("config", () => {
  beforeEach(setup);
  afterEach(teardown);

  describe("getDefaultConfig", () => {
    it("returns correct defaults for react", () => {
      const config = getDefaultConfig("react", true, "tailwind.config.ts");
      expect(config.framework).toBe("react");
      expect(config.tsx).toBe(true);
      expect(config.cssVariables).toBe(true);
      expect(config.aliases.components).toBe("@/components");
      expect(config.aliases.utils).toBe("@/lib/utils");
      expect(config.aliases.ui).toBe("@/components/ui");
    });

    it("returns correct defaults for next", () => {
      const config = getDefaultConfig("next", false, "tailwind.config.js");
      expect(config.framework).toBe("next");
      expect(config.tsx).toBe(false);
    });
  });

  describe("validateConfig", () => {
    it("validates correct config", () => {
      const config = getDefaultConfig("react", true, "tailwind.config.ts");
      expect(validateConfig(config)).toBe(true);
    });

    it("rejects invalid framework", () => {
      const config = getDefaultConfig("react", true, "tailwind.config.ts");
      expect(validateConfig({ ...config, framework: "vue" as any })).toBe(false);
    });

    it("rejects missing aliases", () => {
      const config = getDefaultConfig("react", true, "tailwind.config.ts");
      expect(validateConfig({ ...config, aliases: undefined })).toBe(false);
    });
  });

  describe("writeConfig / readConfig", () => {
    it("writes and reads config", () => {
      const config = getDefaultConfig("react", true, "tailwind.config.ts");
      writeConfig(config, TEST_DIR);
      const read = readConfig(TEST_DIR);
      expect(read).not.toBeNull();
      expect(read!.framework).toBe("react");
    });

    it("returns null for non-existent config", () => {
      expect(readConfig(join(TEST_DIR, "nonexistent"))).toBeNull();
    });
  });

  describe("configExists", () => {
    it("returns true when config exists", () => {
      const config = getDefaultConfig("react", true, "tailwind.config.ts");
      writeConfig(config, TEST_DIR);
      expect(configExists(TEST_DIR)).toBe(true);
    });

    it("returns false when config does not exist", () => {
      expect(configExists(TEST_DIR)).toBe(false);
    });
  });
});
