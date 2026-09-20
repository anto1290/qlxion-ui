import { Command } from "commander";
import { logInfo, logWarn, logError } from "../utils/prompts.js";
import { readConfig, configExists } from "../utils/config.js";
import { getComponentFiles, fileExists, readFile, generateDiff } from "../utils/files.js";
import { join } from "path";
import { readdirSync, existsSync } from "fs";

export const diffCommand = new Command("diff")
  .argument("[component]", "Nama komponen atau kosong untuk --all.")
  .description("Tampilkan diff file lokal vs registry.")
  .option("--all", "Semua komponen terpasang yg punya versi baru")
  .action((component, opts) => {
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
    const targets = opts.all ? getAllLocalComponents(config) : [component];
    for (const c of targets) {
      const files = getComponentFiles(c, config.framework, config);
      for (const file of files) {
        const targetPath = file.targetPath.startsWith("/") ? file.targetPath.slice(1) : file.targetPath;
        const localPath = join(cwd, targetPath);
        if (!fileExists(localPath)) {
          logWarn(`(Lewat) File hilang: ${localPath}`);
          continue;
        }
        const local = readFile(localPath);
        if (local !== file.content) {
          logInfo(`${c} → ${file.targetPath}`);
          console.log(generateDiff(local, file.content));
        }
      }
    }
  });

function getAllLocalComponents(config: { aliases: { ui: string } }): string[] {
  const p = config.aliases.ui.replace("@/", "src/");
  return existsSync(p) ? readdirSync(p).map((f: string) => f.replace(/\..+$/, "")) : [];
}