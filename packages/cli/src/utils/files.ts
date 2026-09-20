import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { diffLines } from "diff";
import { ComponentSourceFile } from "../types/index.js";
import { getComponentSourceFiles, readComponentSourceFile } from "./registry.js";

export function getComponentFiles(
  componentName: string,
  framework: "react" | "next",
  config: any
): ComponentSourceFile[] {
  const sourceFiles = getComponentSourceFiles(componentName, "react");
  const files: ComponentSourceFile[] = [];

  for (const fileName of sourceFiles) {
    const content = readComponentSourceFile(componentName, fileName);
    const targetPath = resolveTargetPath(fileName, config);
    files.push({
      sourcePath: join(componentName, fileName),
      targetPath,
      content,
    });
  }

  return files;
}

function resolveTargetPath(fileName: string, config: any): string {
  // Convert alias path to filesystem path: @/ -> src/
  const uiDir = config.aliases.ui.replace("@/", "src/");
  const ext = fileName.endsWith(".tsx") ? ".tsx" : fileName.endsWith(".ts") ? ".ts" : ".vue";
  const baseName = fileName.replace(/\.(tsx|ts|vue)$/, "");
  return join(uiDir, `${baseName}${ext}`);
}

export function ensureDir(filePath: string): void {
  const dir = dirname(filePath);
  mkdirSync(dir, { recursive: true });
}

export function fileExists(filePath: string): boolean {
  return existsSync(filePath);
}

export function readFile(filePath: string): string {
  return readFileSync(filePath, "utf-8");
}

export function writeFile(filePath: string, content: string): void {
  ensureDir(filePath);
  writeFileSync(filePath, content, "utf-8");
}

export function showDiff(oldContent: string, newContent: string, filePath: string): string {
  const diff = diffLines(oldContent, newContent);
  let output = `\nDiff for ${filePath}:\n`;
  for (const part of diff) {
    const prefix = part.added ? "+" : part.removed ? "-" : " ";
    const lines = part.value
      .split("\n")
      .filter((l) => l)
      .map((l) => `${prefix} ${l}`)
      .join("\n");
    output += lines + "\n";
  }
  return output;
}

export function generateDiff(oldContent: string, newContent: string): string {
  const diff = diffLines(oldContent, newContent);
  return diff
    .map((part) => {
      const prefix = part.added ? "+" : part.removed ? "-" : " ";
      return part.value
        .split("\n")
        .filter((l) => l)
        .map((l) => `${prefix} ${l}`)
        .join("\n");
    })
    .join("\n");
}
