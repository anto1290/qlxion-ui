#!/usr/bin/env node

import { program } from "commander";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";
import { searchCommand } from "./commands/search.js";
import { infoCommand } from "./commands/info.js";
import { diffCommand } from "./commands/diff.js";
import { removeCommand } from "./commands/remove.js";
import { updateCommand } from "./commands/update.js";
import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const packageJson = JSON.parse(readFileSync(join(__dirname, "..", "package.json"), "utf-8"));

program
  .name("qlxion-ui")
  .description("QLXion UI CLI - Component registry and design system")
  .version(packageJson.version)
  .addCommand(initCommand)
  .addCommand(addCommand)
  .addCommand(listCommand)
  .addCommand(searchCommand)
  .addCommand(infoCommand)
  .addCommand(diffCommand)
  .addCommand(removeCommand)
  .addCommand(updateCommand);

program.parse();
