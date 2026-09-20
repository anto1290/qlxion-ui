import { Command } from "commander";
import { logInfo, logWarn, logError } from "../utils/prompts.js";
import { getRegistryComponent } from "../utils/registry.js";

export const infoCommand = new Command("info")
  .argument("<component>")
  .description("Detail metadata registry untuk satu komponen.")
  .option("--json", "Output JSON")
  .action((name, opts) => {
    const c = getRegistryComponent(name);
    if (!c) {
      logError(`Komponen '${name}' tidak ditemukan di registry.`);
      // Give search suggestion? (as in error-handling doc)
      process.exit(1);
    }
    if (opts.json) return console.log(JSON.stringify(c, null, 2));
    logInfo(c.name);
    console.log(`Kategori: ${c.category}\nFramework: ${c.frameworks.join(", ")}\nVersi registry: ${c.version}`);
    if (c.dependencies?.length) console.log(`Dependency npm: ${c.dependencies.join(", ")}`);
    else console.log("Dependency npm: (tidak ada)");
    if (c.registryDependencies?.length) console.log(`Registry dependency: ${c.registryDependencies.join(", ")}`);
    else console.log("Registry dependency: (tidak ada)");
    console.log(`Dokumentasi: ${c.docs}`);
    if (c.deprecated) logWarn(`Komponen ini deprecated${c.deprecatedReason?": "+c.deprecatedReason: ""}`);
  });