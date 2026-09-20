#!/usr/bin/env node
// scripts/generate-docs-pages.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REGISTRY_DIR = path.join(ROOT, "packages", "registry", "components");
const OUT_DIR = path.join(ROOT, "apps", "docs-site", "pages", "components");
const INDEX_OUT = path.join(ROOT, "apps", "docs-site", "public", "search-index.json");