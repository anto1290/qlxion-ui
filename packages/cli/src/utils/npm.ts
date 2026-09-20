import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

export function getPackageJson(cwd: string = process.cwd()): any {
  const packageJsonPath = join(cwd, "package.json");
  if (!existsSync(packageJsonPath)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync(packageJsonPath, "utf-8"));
  } catch {
    return null;
  }
}

export function getMissingDependencies(required: string[], cwd: string = process.cwd()): string[] {
  const pkg = getPackageJson(cwd);
  if (!pkg) return required;

  const deps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };

  // Check if already in package.json
  const missingFromPackageJson = required.filter((dep) => !deps[dep]);

  // Also check if installed in node_modules
  const nodeModulesPath = join(cwd, "node_modules");
  const missingFromNodeModules = required.filter((dep) => {
    const depPath = join(nodeModulesPath, dep);
    return !existsSync(depPath);
  });

  // Return union of both
  return [...new Set([...missingFromPackageJson, ...missingFromNodeModules])];
}

export function addDependencies(
  dependencies: string[],
  dev = false,
  cwd: string = process.cwd()
): void {
  if (dependencies.length === 0) return;

  const pkg = getPackageJson(cwd);
  if (!pkg) {
    throw new Error("package.json not found");
  }

  const target = dev ? "devDependencies" : "dependencies";
  pkg[target] = pkg[target] || {};

  for (const dep of dependencies) {
    // Handle scoped packages like @radix-ui/react-slot
    // The registry stores full package names, we just use them directly with "latest"
    if (!pkg[target][dep]) {
      pkg[target][dep] = "latest";
    }
  }

  const packageJsonPath = join(cwd, "package.json");
  writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2), "utf-8");
}

export function installDependencies(cwd: string = process.cwd()): void {
  try {
    execSync("pnpm install", { cwd, stdio: "inherit" });
  } catch {
    throw new Error("Failed to install dependencies");
  }
}

export function checkPackageManager(): "pnpm" | "npm" | "yarn" {
  // Prefer pnpm if available
  try {
    execSync("pnpm --version", { stdio: "ignore" });
    return "pnpm";
  } catch {
    // ignore
  }
  try {
    execSync("npm --version", { stdio: "ignore" });
    return "npm";
  } catch {
    return "yarn";
  }
}
