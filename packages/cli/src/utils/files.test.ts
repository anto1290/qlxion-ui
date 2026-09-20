import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { ensureDir, fileExists, readFile, writeFile, showDiff } from "./files.js";
import { join } from "path";
import { existsSync, mkdirSync, rmSync } from "fs";

const TEST_DIR = join(process.cwd(), ".test-temp-files");

function setup() {
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true, force: true });
  }
  mkdirSync(TEST_DIR, { recursive: true });
}

function teardown() {
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

describe("files", () => {
  beforeEach(setup);
  afterEach(teardown);

  describe("ensureDir", () => {
    it("creates parent directory for nested path", () => {
      const nestedPath = join(TEST_DIR, "a", "b", "c");
      ensureDir(nestedPath);
      // ensureDir creates the parent dir of the given path
      expect(existsSync(join(TEST_DIR, "a", "b"))).toBe(true);
    });
  });

  describe("writeFile / readFile", () => {
    it("writes and reads file content", () => {
      const filePath = join(TEST_DIR, "test.txt");
      const content = "Hello, QLXion!";
      writeFile(filePath, content);
      expect(readFile(filePath)).toBe(content);
    });
  });

  describe("fileExists", () => {
    it("returns true for existing file", () => {
      const filePath = join(TEST_DIR, "exists.txt");
      writeFile(filePath, "content");
      expect(fileExists(filePath)).toBe(true);
    });

    it("returns false for non-existent file", () => {
      expect(fileExists(join(TEST_DIR, "missing.txt"))).toBe(false);
    });
  });

  describe("showDiff", () => {
    it("returns diff with + prefix for added lines", () => {
      const oldContent = "line1\nline2";
      const newContent = "line1\nline3";
      const diff = showDiff(oldContent, newContent, "test.txt");
      expect(diff).toContain("+ line3");
      expect(diff).toContain("- line2");
    });
  });
});
