import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import Ajv from "ajv";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const schemaPath = join(__dirname, "..", "registry-item.schema.json");
const componentsDir = join(__dirname, "..", "components");

const schema = JSON.parse(readFileSync(schemaPath, "utf-8"));
const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

const files = readdirSync(componentsDir).filter((f) => f.endsWith(".json"));

let hasErrors = false;

for (const file of files) {
  const filePath = join(componentsDir, file);
  const content = JSON.parse(readFileSync(filePath, "utf-8"));
  const valid = validate(content);
  if (!valid) {
    console.error(`❌ ${file}:`);
    for (const err of validate.errors || []) {
      console.error(`  ${err.instancePath || "."} ${err.message}`);
    }
    hasErrors = true;
  } else {
    console.log(`✅ ${file}`);
  }
}

if (hasErrors) {
  console.error("\n❌ Registry validation failed");
  process.exit(1);
} else {
  console.log(`\n✅ All ${files.length} registry items are valid`);
}