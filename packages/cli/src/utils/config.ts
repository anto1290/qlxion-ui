import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { QlxionConfig } from "../types/index.js";

const CONFIG_FILE = "qlxion.config.json";

export function readConfig(cwd: string = process.cwd()): QlxionConfig | null {
  const configPath = join(cwd, CONFIG_FILE);
  if (!existsSync(configPath)) {
    return null;
  }
  try {
    const content = readFileSync(configPath, "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export function writeConfig(config: QlxionConfig, cwd: string = process.cwd()): void {
  const configPath = join(cwd, CONFIG_FILE);
  writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
}

export function configExists(cwd: string = process.cwd()): boolean {
  return existsSync(join(cwd, CONFIG_FILE));
}

export function validateConfig(config: any): config is QlxionConfig {
  if (!config || typeof config !== "object") return false;
  if (!["react", "next"].includes(config.framework)) return false;
  if (typeof config.tailwindConfig !== "string") return false;
  if (typeof config.tsx !== "boolean") return false;
  if (!config.aliases || typeof config.aliases !== "object") return false;
  if (typeof config.aliases.components !== "string") return false;
  if (typeof config.aliases.utils !== "string") return false;
  if (typeof config.aliases.ui !== "string") return false;
  if (typeof config.cssVariables !== "boolean") return false;
  return true;
}

export function getDefaultConfig(
  framework: "react" | "next",
  isTypeScript: boolean,
  tailwindConfig: string
): QlxionConfig {
  return {
    framework,
    tailwindConfig,
    tsx: isTypeScript,
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
    },
    cssVariables: true,
  };
}
