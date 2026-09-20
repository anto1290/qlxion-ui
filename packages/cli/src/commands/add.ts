import { Command } from "commander";
import { readConfig, configExists, validateConfig } from "../utils/config.js";
import { resolveDependencies, validateComponentsExist } from "../utils/dependencies.js";
import { getComponentFiles, fileExists, readFile, writeFile, showDiff, generateDiff } from "../utils/files.js";
import { getMissingDependencies, addDependencies, installDependencies, getPackageJson } from "../utils/npm.js";
import { confirm, logInfo, logSuccess, logWarn, logError, logStep } from "../utils/prompts.js";
import { QlxionConfig } from "../types/index.js";
import { join } from "path";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";

const UTILS_CONTENT = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * cva-like variant resolver for Tailwind utility classes.
 * Minimal implementation — no runtime validation, no compound variants.
 * Upgrade path: swap to \`class-variance-authority\` when needed.
 */
export function cva<Props extends Record<string, unknown>>(
  base: string,
  options: {
    variants?: Record<string, Record<string, string>>;
    defaultVariants?: Partial<Record<keyof NonNullable<typeof options.variants>, string>>;
  }
) {
  return (props: Props & Record<string, string>) => {
    const classes = [base];
    if (options.variants) {
      for (const [variantKey, variantValue] of Object.entries(props)) {
        const variants = options.variants[variantKey];
        if (variants && typeof variantValue === "string" && variants[variantValue]) {
          classes.push(variants[variantValue]);
        }
      }
    }
    // Apply default variants for missing props
    if (options.defaultVariants) {
      for (const [key, value] of Object.entries(options.defaultVariants)) {
        if (props[key] === undefined && options.variants?.[key]?.[value as string]) {
          classes.push(options.variants[key][value as string]);
        }
      }
    }
    return classes.join(" ");
  };
}

/** Type extracted from cva return for typing component props. */
export type VariantProps<T extends (...args: unknown[]) => string> =
  Parameters<T>[0] extends Record<string, infer V> ? V : never;
`;

function ensureUtilsFile(config: QlxionConfig, cwd: string): void {
  // The alias @/lib/utils maps to src/lib/utils.ts
  // We need to convert the alias to a filesystem path
  const utilsAlias = config.aliases.utils; // e.g., "@/lib/utils"
  const utilsDir = utilsAlias.replace("@/", "src/").replace(/\/[^/]+$/, ""); // e.g., "src/lib"
  const utilsPath = join(cwd, utilsDir, "utils.ts");
  if (!existsSync(utilsPath)) {
    mkdirSync(join(cwd, utilsDir), { recursive: true });
    writeFileSync(utilsPath, UTILS_CONTENT, "utf-8");
    logSuccess(`Created: ${utilsDir}/utils.ts`);
  }
  // Add clsx and tailwind-merge as dependencies if not already present
  const pkg = getPackageJson(cwd);
  if (pkg) {
    const deps = pkg.dependencies || {};
    if (!deps.clsx) {
      deps.clsx = "latest";
    }
    if (!deps["tailwind-merge"]) {
      deps["tailwind-merge"] = "latest";
    }
    pkg.dependencies = deps;
    writeFileSync(join(cwd, "package.json"), JSON.stringify(pkg, null, 2), "utf-8");
  }
}

function rewriteUtilsImport(content: string, config: QlxionConfig): string {
  // Replace @qlxion-ui/utils with the local alias from config
  const utilsAlias = config.aliases.utils; // e.g., "@/lib/utils"
  let result = content.replace(/@qlxion-ui\/utils/g, utilsAlias);

  // Rewrite internal component imports (e.g., "../table/table" -> "@/components/ui/table")
  const uiAlias = config.aliases.ui; // e.g., "@/components/ui"
  // Match imports like: from "../table/table" or from "../table"
  result = result.replace(/from\s+["']\.\.\/([^/]+)\/([^"']+)["']/g, (match, componentName, exportPath) => {
    // Check if this is a known component (simplified - just rewrite all relative imports to ui alias)
    return `from "${uiAlias}/${componentName}"`;
  });
  
  // Also match imports like: from "../table"
  result = result.replace(/from\s+["']\.\.\/([^"']+)["']/g, (match, componentName) => {
    return `from "${uiAlias}/${componentName}"`;
  });

  return result;
}



export const addCommand = new Command("add")
  .description("Add component(s) from the QLXion UI registry")
  .argument("<components...>", "Component names to add")
  .option("-y, --yes", "Skip all confirmations")
  .option("--overwrite", "Overwrite existing files without prompting")
  .option("--dry-run", "Show what would be done without writing files")
  .action(async (components: string[], options) => {
    const cwd = process.cwd();

    // Check config exists
    if (!configExists(cwd)) {
      logError("No qlxion.config.json found. Run 'qlxion-ui init' first.");
      process.exit(1);
    }

    const config = readConfig(cwd);
    if (!config || !validateConfig(config)) {
      logError("Invalid qlxion.config.json. Run 'qlxion-ui init' to reconfigure.");
      process.exit(1);
    }

    // Validate components exist
    const missing = validateComponentsExist(components);
    if (missing.length > 0) {
      logError(`Components not found in registry: ${missing.join(", ")}`);
      process.exit(1);
    }

    // Resolve dependencies
    let resolved: { components: string[]; npmDependencies: string[] };
    try {
      resolved = resolveDependencies(components);
    } catch (error) {
      logError((error as Error).message);
      process.exit(1);
    }

    logInfo(`Resolved components: ${resolved.components.join(" → ")}`);

    // Check npm dependencies
    const missingNpmDeps = getMissingDependencies(resolved.npmDependencies, cwd);
    if (missingNpmDeps.length > 0) {
      logInfo(`Missing npm dependencies: ${missingNpmDeps.join(", ")}`);
      if (!options.yes && !options.dryRun) {
        const shouldInstall = await confirm("Install missing dependencies?", true);
        if (shouldInstall) {
          addDependencies(missingNpmDeps, false, cwd);
          logStep("Installing dependencies...");
          installDependencies(cwd);
          logSuccess("Dependencies installed");
        } else {
          logWarn("Skipping dependency installation. Components may not work correctly.");
        }
      } else if (options.dryRun) {
        logInfo("Would install: " + missingNpmDeps.join(", "));
      } else {
        addDependencies(missingNpmDeps, false, cwd);
        logStep("Installing dependencies...");
        installDependencies(cwd);
        logSuccess("Dependencies installed");
      }
    }

    // Ensure utils file exists
    if (!options.dryRun) {
      ensureUtilsFile(config, cwd);
    }

    // Process each component
    for (const componentName of resolved.components) {
      await addComponent(componentName, config, options, cwd);
    }

    logSuccess("All components added successfully!");
  });

async function addComponent(
  componentName: string,
  config: QlxionConfig,
  options: { yes?: boolean; overwrite?: boolean; dryRun?: boolean },
  cwd: string
): Promise<void> {
  const files = getComponentFiles(componentName, config.framework, config);

  if (files.length === 0) {
    logWarn(`No source files found for ${componentName} (${config.framework})`);
    return;
  }

  for (const file of files) {
    // Rewrite imports for local utils
    const rewrittenContent = rewriteUtilsImport(file.content, config);
    const targetPath = join(cwd, file.targetPath);
    const exists = fileExists(targetPath);

    if (exists && !options.overwrite) {
      const existingContent = readFile(targetPath);
      const diff = generateDiff(existingContent, rewrittenContent);

      if (diff.trim()) {
        logWarn(`File already exists: ${file.targetPath}`);
        console.log(showDiff(existingContent, rewrittenContent, file.targetPath));

        if (!options.yes && !options.dryRun) {
          const shouldOverwrite = await confirm("Overwrite?", false);
          if (!shouldOverwrite) {
            logInfo(`Skipped ${file.targetPath}`);
            continue;
          }
        } else if (options.dryRun) {
          logInfo(`Would overwrite: ${file.targetPath}`);
          continue;
        }
      } else {
        logInfo(`File unchanged: ${file.targetPath}`);
        continue;
      }
    }

    if (options.dryRun) {
      const action = exists ? "overwrite" : "create";
      logInfo(`Would ${action}: ${file.targetPath}`);
      continue;
    }

    writeFile(targetPath, rewrittenContent);
    logSuccess(`${exists ? "Updated" : "Created"}: ${file.targetPath}`);
  }
}