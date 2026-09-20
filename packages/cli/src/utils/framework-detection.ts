import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { FrameworkDetectionResult } from "../types/index.js";

export async function detectFramework(
  cwd: string = process.cwd()
): Promise<FrameworkDetectionResult> {
  const packageJsonPath = join(cwd, "package.json");
  let packageJson: any = {};

  if (existsSync(packageJsonPath)) {
    try {
      packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    } catch {
      // ignore parse errors
    }
  }

  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  // Check for Next.js
  if (dependencies.next) {
    const router = await detectNextRouter(cwd);
    return {
      framework: "next",
      router,
      isTypeScript: existsSync(join(cwd, "tsconfig.json")),
      tailwindConfigPath: findTailwindConfig(cwd),
    };
  }

  // Check for Nuxt
  if (
    dependencies.nuxt ||
    existsSync(join(cwd, "nuxt.config.ts")) ||
    existsSync(join(cwd, "nuxt.config.js"))
  ) {
    return {
      framework: "nuxt",
      isTypeScript: existsSync(join(cwd, "tsconfig.json")),
      tailwindConfigPath: findTailwindConfig(cwd),
    };
  }

  // Check for Vue
  if (dependencies.vue && !dependencies.nuxt) {
    return {
      framework: "vue",
      isTypeScript: existsSync(join(cwd, "tsconfig.json")),
      tailwindConfigPath: findTailwindConfig(cwd),
    };
  }

  // Check for React
  if (dependencies.react && dependencies["react-dom"] && !dependencies.next) {
    return {
      framework: "react",
      isTypeScript: existsSync(join(cwd, "tsconfig.json")),
      tailwindConfigPath: findTailwindConfig(cwd),
    };
  }

  return {
    framework: "unknown",
    isTypeScript: existsSync(join(cwd, "tsconfig.json")),
    tailwindConfigPath: findTailwindConfig(cwd),
  };
}

async function detectNextRouter(cwd: string): Promise<"app" | "pages" | undefined> {
  const hasAppDir = existsSync(join(cwd, "app"));
  const hasPagesDir = existsSync(join(cwd, "pages"));

  if (hasAppDir && hasPagesDir) {
    return undefined; // Will ask user
  }
  if (hasAppDir) return "app";
  if (hasPagesDir) return "pages";
  return "app"; // Default to app router
}

function findTailwindConfig(cwd: string): string {
  const possibleConfigs = [
    "tailwind.config.ts",
    "tailwind.config.js",
    "tailwind.config.mjs",
    "tailwind.config.cjs",
  ];

  for (const config of possibleConfigs) {
    if (existsSync(join(cwd, config))) {
      return config;
    }
  }
  return "tailwind.config.ts"; // Default
}

export function getSupportedFrameworks(): ("react" | "next" | "vue" | "nuxt")[] {
  return ["react", "next"]; // Only React/Next.js for Phase 1
}
