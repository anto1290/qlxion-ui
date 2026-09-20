import { Command } from "commander";
import { detectFramework } from "../utils/framework-detection.js";
import { configExists, writeConfig, getDefaultConfig, validateConfig } from "../utils/config.js";
import { confirm, select, text, logInfo, logSuccess, logError } from "../utils/prompts.js";
import { QlxionConfig } from "../types/index.js";

export const initCommand = new Command("init")
  .description("Initialize QLXion UI configuration for your project")
  .option("-y, --yes", "Accept all defaults without prompting")
  .option("-f, --framework <name>", "Force framework (react|next)", "auto")
  .action(async (options) => {
    const cwd = process.cwd();

    // Check if config already exists
    if (configExists(cwd) && !options.yes) {
      const overwrite = await confirm("qlxion.config.json already exists. Overwrite?", false);
      if (!overwrite) {
        logInfo("Initialization cancelled");
        return;
      }
    }

    // Detect or use forced framework
    let framework: "react" | "next";
    let router: "app" | "pages" | undefined;

    if (options.framework !== "auto") {
      if (!["react", "next"].includes(options.framework)) {
        logError(`Unsupported framework: ${options.framework}. Supported: react, next`);
        process.exit(1);
      }
      framework = options.framework as "react" | "next";
      if (framework === "next") {
        router = await detectNextRouter(cwd);
      }
    } else {
      const detection = await detectFramework(cwd);
      if (detection.framework === "unknown") {
        const choice = await select("Could not auto-detect framework. Please select:", [
          { title: "React (Vite/CRA)", value: "react" },
          { title: "Next.js", value: "next" },
        ]);
        framework = choice;
        if (framework === "next") {
          router = await detectNextRouter(cwd);
        }
      } else {
        framework = detection.framework as "react" | "next";
        router = detection.router;

        logInfo(`Detected framework: ${framework}${router ? ` (${router} router)` : ""}`);
        if (!options.yes) {
          const correct = await confirm("Is this correct?", true);
          if (!correct) {
            const choice = await select("Please select the correct framework:", [
              { title: "React (Vite/CRA)", value: "react" },
              { title: "Next.js", value: "next" },
            ]);
            framework = choice;
            if (framework === "next") {
              router = await detectNextRouter(cwd);
            }
          }
        }
      }
    }

    // Tailwind config
    const detection = await detectFramework(cwd);
    let tailwindConfig = detection.tailwindConfigPath;
    if (!options.yes) {
      tailwindConfig = (await text("Tailwind config path:", tailwindConfig)) || tailwindConfig;
    }

    // TypeScript
    const isTypeScript = detection.isTypeScript;

    // Aliases
    let aliases = getDefaultConfig(framework, isTypeScript, tailwindConfig).aliases;
    if (!options.yes) {
      logInfo("Configure import aliases (press Enter for defaults):");
      const componentsAlias =
        (await text(`Components alias (${aliases.components}):`, aliases.components)) ||
        aliases.components;
      const utilsAlias =
        (await text(`Utils alias (${aliases.utils}):`, aliases.utils)) || aliases.utils;
      const uiAlias =
        (await text(`UI components alias (${aliases.ui}):`, aliases.ui)) || aliases.ui;
      aliases = { components: componentsAlias, utils: utilsAlias, ui: uiAlias };
    }

    // CSS Variables
    let cssVariables = true;
    if (!options.yes) {
      cssVariables = await confirm("Use CSS variables for theming?", true);
    }

    // Build config
    const config: QlxionConfig = {
      framework,
      tailwindConfig,
      tsx: isTypeScript,
      aliases,
      cssVariables,
    };

    if (router) {
      config.router = router;
    }

    // Validate and write
    if (!validateConfig(config)) {
      logError("Generated config is invalid");
      process.exit(1);
    }

    writeConfig(config, cwd);
    logSuccess(`Configuration written to qlxion.config.json`);

    if (framework === "next") {
      logInfo(
        "Next.js detected. Make sure to add QLXion UI to your tailwind.config.ts content paths:"
      );
      logInfo(`  content: ['${aliases.ui}/**/*.{ts,tsx}']`);
    }
  });

async function detectNextRouter(cwd: string): Promise<"app" | "pages" | undefined> {
  const fs = await import("fs");
  const path = await import("path");
  const hasAppDir = fs.existsSync(path.join(cwd, "app"));
  const hasPagesDir = fs.existsSync(path.join(cwd, "pages"));

  if (hasAppDir && hasPagesDir) return undefined;
  if (hasAppDir) return "app";
  if (hasPagesDir) return "pages";
  return "app";
}
