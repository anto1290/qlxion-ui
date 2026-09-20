import { Command } from "commander";
import { logInfo, logWarn, logError, confirm } from "../utils/prompts.js";
import { readConfig, configExists } from "../utils/config.js";
import { getRegistryComponent } from "../utils/registry.js";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";

export const removeCommand = new Command("remove")
  .argument("<component>")
  .description("Hapus file komponen dari project (dengan konfirmasi)")
  .option("--yes", "Lewati konfirmasi")
  .option("--force", "Paksa hapus meski masih ada dependent")
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
    const meta = getRegistryComponent(name);
    if (!meta) {
      logError(`Komponen '${name}' tidak ditemukan di registry.`);
      process.exit(1);
    }
    // check dependents? (skip for minimum viable, TODO cross-ref local imports)
    if (!opts.yes) {
      const ok = await confirm(`Yakin ingin hapus semua file komponen '${name}'?`, false);
      if (!ok) {
        logInfo("Penghapusan dibatalkan.");
        return;
      }
    }
    // Delete files in ui dir
    for (const f of meta.files[config.framework] || []) {
      const p = join(cwd, config.aliases.ui.replace("@/", "src/"), f);
      if (existsSync(p)) {
        unlinkSync(p);
        logInfo(`Dihapus: ${p}`);
      } else {
        logWarn(`File tidak ditemukan: ${p}`);
      }
    }
    logInfo(`Komponen '${name}' telah dihapus.`);
  });
