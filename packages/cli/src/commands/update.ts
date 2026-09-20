import { Command } from "commander";
import { logInfo, logWarn, logError, confirm } from "../utils/prompts.js";
import { readConfig, configExists } from "../utils/config.js";
import { getRegistryComponent, readComponentSourceFile } from "../utils/registry.js";
import { fileExists, readFile, writeFile, generateDiff } from "../utils/files.js";
import { join } from "path";
import { readdirSync, existsSync } from "fs";

// ponytail: local version-tracking (skip manifest, no 3-way diff for now)
export const updateCommand = new Command("update")
  .argument("[component]", "komponen, kosong = semua")
  .description(
    "Update komponen ke versi registry terbaru, tampilkan diff dahulu jika file sudah dimodifikasi"
  )
  .option("--all", "update semua komponen terpasang")
  .option("--dry-run", "preview saja, tidak menulis file")
  .action(async (name, opts) => {
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
    const targets: string[] = opts.all ? getAllLocalComponents(config) : [name].filter(Boolean);

    for (const c of targets) {
      const meta = getRegistryComponent(c);
      if (!meta) {
        logWarn(`Komponen ${c} tidak ditemukan di registry, lewati.`);
        continue;
      }
      for (const f of meta.files[config.framework] || []) {
        const p = join(cwd, config.aliases.ui.replace("@/", "src/"), f);
        if (!fileExists(p)) continue;
        const local = readFile(p);
        const upstream = readComponentSourceFile(c, f);
        if (local !== upstream) {
          logInfo(`${c}/${f}`);
          const diff = generateDiff(local, upstream);
          if (opts.dryRun) {
            console.log(diff);
            continue;
          }
          if (!opts.yes) {
            console.log(diff);
            const ok = await confirm("Timpa file dengan versi registry terbaru?", false);
            if (!ok) continue;
          }
          writeFile(p, upstream);
          logInfo(`Updated: ${p}`);
        }
      }
    }
  });

function getAllLocalComponents(config: { aliases: { ui: string } }): string[] {
  const uiDir = config.aliases.ui.replace("@/", "src/");
  return existsSync(uiDir) ? readdirSync(uiDir).map((f: string) => f.replace(/\..+$/, "")) : [];
}
