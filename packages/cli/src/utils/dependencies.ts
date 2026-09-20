import { getRegistryComponent, listRegistryComponents } from "./registry.js";

export interface ResolvedDependencies {
  components: string[];
  npmDependencies: string[];
}

export function resolveDependencies(componentNames: string[]): ResolvedDependencies {
  const visited = new Set<string>();
  const visiting = new Set<string>();
  const result: string[] = [];
  const npmDeps = new Set<string>();

  function resolve(name: string) {
    if (visiting.has(name)) {
      const cycle = [...visiting, name].join(" → ");
      throw new Error(`Cycle detected in registry dependencies: ${cycle}`);
    }
    if (visited.has(name)) {
      return;
    }

    const component = getRegistryComponent(name);
    if (!component) {
      throw new Error(`Component "${name}" not found in registry`);
    }

    visiting.add(name);

    // Resolve registry dependencies first
    for (const dep of component.registryDependencies || []) {
      resolve(dep);
    }

    // Add npm dependencies
    for (const dep of component.dependencies || []) {
      npmDeps.add(dep);
    }

    visiting.delete(name);
    visited.add(name);
    result.push(name);
  }

  for (const name of componentNames) {
    resolve(name);
  }

  return {
    components: result,
    npmDependencies: Array.from(npmDeps),
  };
}

export function validateComponentsExist(componentNames: string[]): string[] {
  const available = listRegistryComponents();
  return componentNames.filter((name) => !available.includes(name));
}