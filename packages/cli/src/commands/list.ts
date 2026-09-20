import { Command } from "commander";
import { logInfo, logError } from "../utils/prompts.js";
import { readConfig, configExists } from "../utils/config.js";
import { listRegistryComponents, getRegistryComponent } from "../utils/registry.js";
import { readdirSync } from "fs";
import { join } from "path";

export const listCommand = new Command("list")
  .description("Tampilkan semua komponen registry yang tersedia untuk framework aktif.")
  .option("--framework <name>", "Tampilkan daftar untuk framework lain")
  .option("--installed", "Hanya komponen yang sudah terpasang di project")
  .option("--json", "Output JSON untuk scripting")
  .action(async (opts) => {
    const cwd = process.cwd();
    if (!configExists(cwd)) {
      logError("qlxion.config.json tidak ditemukan. Jalankan `qlxion-ui init` dulu.");
      process.exit(1);
    }
    const config = readConfig(cwd);
    if (!config) {
      logError("Failed to read config.");
      process.exit(1);
    }
    const framework = opts.framework || config.framework;
    let names = listRegistryComponents();
    if (opts.installed) {
      // List locally present components by checking components/ui/*
      let localComponents: string[] = [];
      try {
        localComponents = readdirSync(join(cwd, config.aliases.ui.replace("@/", "src/"))).map((x) =>
          x.replace(/\..+$/, "")
        );
      } catch {
        // ignore
      }
      names = names.filter((x) => localComponents.includes(x));
    }
    const all = names
      .map((n) => getRegistryComponent(n))
      .filter((e) => e && e.frameworks.includes(framework));
    // group by category
    const byCat: Record<string, any[]> = {};
    all.forEach((c) => {
      if (!c) return;
      if (!byCat[c.category]) byCat[c.category] = [];
      byCat[c.category].push(c);
    });
    if (opts.json) {
      console.log(JSON.stringify(byCat, null, 2));
      return;
    }
    Object.keys(byCat)
      .sort()
      .forEach((cat) => {
        logInfo(cat);
        byCat[cat].forEach((c) => {
          console.log(`  ${c.name}    ${c.description}`);
        });
      });
  });
