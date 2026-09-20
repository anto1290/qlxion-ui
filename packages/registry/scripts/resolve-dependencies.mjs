import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const componentsDir = join(__dirname, "..", "components");

const files = readdirSync(componentsDir).filter((f) => f.endsWith(".json"));

const registry = new Map();

for (const file of files) {
  const filePath = join(componentsDir, file);
  const content = JSON.parse(readFileSync(filePath, "utf-8"));
  registry.set(content.name, content);
}

function resolveDependencies(
  componentNames,
  visited = new Set(),
  visiting = new Set(),
  result = []
) {
  for (const name of componentNames) {
    if (!registry.has(name)) {
      throw new Error(`Component "${name}" not found in registry`);
    }

    if (visiting.has(name)) {
      const cycle = [...visiting, name].join(" → ");
      throw new Error(`Cycle detected in registry dependencies: ${cycle}`);
    }

    if (visited.has(name)) {
      continue;
    }

    visiting.add(name);

    const component = registry.get(name);
    const deps = component.registryDependencies || [];

    resolveDependencies(deps, visited, visiting, result);

    visiting.delete(name);
    visited.add(name);

    if (!result.includes(name)) {
      result.push(name);
    }
  }

  return result;
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: node scripts/resolve-dependencies.mjs <component-name> [component-name...]");
  process.exit(1);
}

try {
  const resolved = resolveDependencies(args);
  console.log("Resolved installation order:");
  for (const name of resolved) {
    console.log(`  ${name}`);
  }
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}