import { readFileSync, existsSync, readdirSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, "..", "..", "..", "..");
const REGISTRY_COMPONENTS_DIR = join(ROOT_DIR, "packages", "registry", "components");
const CORE_REACT_DIR = join(ROOT_DIR, "packages", "core-react", "src");

export interface RegistryComponent {
  name: string;
  description?: string;
  category: string;
  frameworks: string[];
  files: Record<string, string[]>;
  dependencies?: string[];
  registryDependencies?: string[];
  example?: string;
  version?: string;
  docs?: string;
  deprecated?: boolean;
  deprecatedReason?: string;
}

export function getRegistryComponent(name: string): RegistryComponent | null {
  const filePath = join(REGISTRY_COMPONENTS_DIR, `${name}.json`);
  if (!existsSync(filePath)) {
    return null;
  }
  const content = readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

export function listRegistryComponents(): string[] {
  return readdirSync(REGISTRY_COMPONENTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

export function getComponentSourceFiles(componentName: string, framework: "react"): string[] {
  const component = getRegistryComponent(componentName);
  if (!component) {
    return [];
  }
  return component.files[framework] || [];
}

export function readComponentSourceFile(componentName: string, fileName: string): string {
  const sourcePath = join(CORE_REACT_DIR, componentName, fileName);
  if (!existsSync(sourcePath)) {
    throw new Error(`Source file not found: ${sourcePath}`);
  }
  return readFileSync(sourcePath, "utf-8");
}
