import fs from "fs";
import path from "path";

const PAGES_DIR = path.join(process.cwd(), "apps", "docs-site", "pages", "components");

function updateComponentPage(componentName: string) {
  const filePath = path.join(PAGES_DIR, componentName, "index.tsx");
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${componentName}: file not found`);
    return;
  }
  
  let content = fs.readFileSync(filePath, "utf-8");
  
  // Skip if already has Layout import
  if (content.includes("import { Layout }")) {
    console.log(`Skipping ${componentName}: already updated`);
    return;
  }
  
  // Replace the import section and wrap with Layout
  const capitalized = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  
  // Add Layout import
  content = content.replace(
    'import dynamic from "next/dynamic";',
    `import { Layout } from "@/components/Layout";\nimport dynamic from "next/dynamic";`
  );
  
  // Wrap return with Layout
  content = content.replace(
    'return (\n    <main className="prose mx-auto max-w-2xl p-6">',
    `return (\n    <Layout>\n      <main className="prose mx-auto max-w-3xl p-6">`
  );
  
  // Close Layout
  content = content.replace(
    '    </main>\n  );',
    '      </main>\n    </Layout>\n  );'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${componentName}`);
}

function main() {
  const components = fs.readdirSync(PAGES_DIR).filter((f) => {
    const stat = fs.statSync(path.join(PAGES_DIR, f));
    return stat.isDirectory();
  });
  
  for (const component of components) {
    updateComponentPage(component);
  }
  
  console.log("All component pages updated!");
}

main();