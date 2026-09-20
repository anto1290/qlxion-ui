import { Command } from "commander";
import { logInfo } from "../utils/prompts.js";
import { listRegistryComponents, getRegistryComponent } from "../utils/registry.js";

function fuzzy(s: string, t: string): boolean {
  s = s.toLowerCase();
  t = t.toLowerCase();
  // Tolerate up to 2 wrong letters
  let mismatch = 0;
  for (let i = 0, j = 0; i < s.length && mismatch <= 2; i++) {
    if (s[i] !== t[j]) mismatch++;
    else j++;
  }
  return t.includes(s) || s.includes(t) || mismatch <= 2;
}

export const searchCommand = new Command("search")
  .argument("<query>")
  .description("Cari komponen di registry berdasarkan nama/deskripsi/kategori.")
  .option("--json", "Output JSON")
  .action((query, opts) => {
    const results = listRegistryComponents()
      .map((n) => getRegistryComponent(n))
      .filter(
        (c) =>
          c &&
          (fuzzy(query, c.name) || fuzzy(query, c.description ?? "") || fuzzy(query, c.category))
      );
    if (opts.json) {
      console.log(JSON.stringify(results, null, 2));
    } else {
      if (!results.length) return logInfo("Tidak ada hasil");
      results.forEach((c) => {
        if (!c) return;
        logInfo(`${c.name} (${c.category})`);
        console.log(`  ${c.description}`);
      });
    }
  });
