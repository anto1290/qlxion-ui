import fs from "fs";
import path from "path";

const REGISTRY_DIR = path.join(process.cwd(), "packages", "registry", "components");
const OUTPUT_DIR = path.join(process.cwd(), "apps", "docs-site", "pages", "components");
const SPEC_DIR = path.join(process.cwd(), "docs", "03-components");

function readRegistryComponents() {
  const files = fs.readdirSync(REGISTRY_DIR).filter((f) => f.endsWith(".json"));
  return files.map((f) => JSON.parse(fs.readFileSync(path.join(REGISTRY_DIR, f), "utf-8")));
}
function readSpec(componentName: string) {
  const specPath = path.join(SPEC_DIR, componentName, "SPEC.md");
  const examplesPath = path.join(SPEC_DIR, componentName, "EXAMPLES.md");
  const spec = fs.existsSync(specPath) ? fs.readFileSync(specPath, "utf-8") : null;
  const examples = fs.existsSync(examplesPath) ? fs.readFileSync(examplesPath, "utf-8") : null;
  return { spec, examples };
}

function escapeForJsx(text: string): string {
  return text
    .replace(/</g, "{'<'}")
    .replace(/>/g, "{'>'}");
}

function parseSpec(spec: string | null) {
  if (!spec) return {};
  const sections: Record<string, string[]> = {};
  let currentSection = "";
  for (const line of spec.split("\n")) {
    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      currentSection = headingMatch[1].trim();
      sections[currentSection] = [];
    } else if (currentSection) {
      sections[currentSection].push(escapeForJsx(line));
    }
  }
  return sections;
}

function parseExamples(examples: string | null) {
  if (!examples) return [];
  const result: { title: string; content: string }[] = [];
  let currentTitle = "";
  let currentContent: string[] = [];
  for (const line of examples.split("\n")) {
    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      if (currentTitle) {
        result.push({ title: currentTitle, content: currentContent.join("\n").trim() });
      }
      currentTitle = headingMatch[1].trim();
      currentContent = [];
    } else if (currentTitle) {
      currentContent.push(escapeForJsx(line));
    }
  }
  if (currentTitle) {
    result.push({ title: currentTitle, content: currentContent.join("\n").trim() });
  }
  return result;
}
function generatePage(component: any, specSections: Record<string, string[]>, examples: { title: string; content: string }[]) {
  const name = component.name;
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  const description = component.description || "";
  const frameworks = component.frameworks || ["react"];
  const hasVue = frameworks.includes("vue");
  
  // Generate valid function name (replace hyphens with PascalCase)
  const functionName = name.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("");

  const props = specSections["Props / Atribut"] || specSections["Props"] || [];
  const variants: string[] = [];
  const sizes: string[] = [];
  const states = specSections["States"] || [];
  
  for (const line of props) {
    if (line.includes("variant")) {
      const match = line.match(/\|.*?\|/g);
      if (match) {
        const variantLine = match[0];
        const variantMatches = variantLine.match(/(default|destructive|outline|ghost|link|sm|md|lg|icon|sm\|md\|lg)/g);
        if (variantMatches) {
          for (const v of variantMatches) {
            if (["default", "destructive", "outline", "ghost", "link"].includes(v)) variants.push(v);
            if (["sm", "md", "lg", "icon"].includes(v)) sizes.push(v);
          }
        }
      }
    }
  }

  let content = `import { Layout } from "@/components/Layout";

export default function ${functionName}Doc() {
  // Real project: load MDX
  return (
    <Layout>
      <main className="prose mx-auto max-w-3xl p-6">
        <h1>${capitalized}</h1>
        <h2>Description</h2>
        <p>${description.replace(/"/g, '\\"')}</p>

        <h2>Installation</h2>
        <pre><code>npx qlxion-ui add ${name}</code></pre>

        <h2>Usage</h2>
        <pre><code>{'<${capitalized} />'}</code></pre>

        <h2>Preview</h2>
        <div className="p-4 border rounded bg-muted/50">
          <p className="text-sm text-muted-foreground">Preview not available in static documentation. Use the Playground for interactive preview.</p>
        </div>
`;

  if (variants.length > 0) {
    content += `        <h2>Variants</h2>
        <ul>
${variants.map(v => `          <li>${v}</li>`).join("\n")}
        </ul>
`;
  }

  if (sizes.length > 0) {
    content += `        <h2>Sizes</h2>
        <ul>
${sizes.map(s => `          <li>${s}</li>`).join("\n")}
        </ul>
`;
  }

  if (states.length > 0) {
    content += `        <h2>States</h2>
        <ul>
${states.map(s => `          <li>${s.replace(/^-/, '').trim()}</li>`).join("\n")}
        </ul>
`;
  }

  if (examples.length > 0) {
    content += `        <h2>Examples</h2>
`;
    for (const ex of examples) {
      content += `        <h3>${ex.title}</h3>
        <pre><code>{'<${capitalized} />'}</code></pre>
`;
    }
  } else {
    content += `        <h2>Examples</h2>
        <h3>Basic</h3>
        <pre><code>{'<${capitalized} />'}</code></pre>
`;
  }

  content += `        <h2>API</h2>
        <ul>
`;
  for (const line of props) {
    if (line.includes("|") && !line.includes("---")) {
      const parts = line.split("|").map(p => p.trim()).filter(p => p);
      if (parts.length >= 2 && parts[0] !== "Nama") {
        content += `          <li>${parts[0]}: ${parts[1]}${parts[3] ? ` (default: ${parts[3]})` : ""}</li>
`;
      }
    }
  }
  content += `        </ul>
`;

  const a11y = specSections["Accessibility Contract"] || specSections["Accessibility"] || [];
  if (a11y.length > 0) {
    content += `        <h2>Accessibility</h2>
        <ul>
`;
    for (const line of a11y) {
      const clean = line.replace(/^-/, '').trim();
      if (clean) content += `          <li>${clean}</li>
`;
    }
    content += `        </ul>
`;
  } else {
    content += `        <h2>Accessibility</h2>
        <ul>
          <li>Follows standard accessibility practices</li>
        </ul>
`;
  }

  content += `        <h2>Framework Support</h2>
        <ul>
          <li>${hasVue ? "React, Vue" : "React"}</li>
        </ul>
        <h2>Source</h2>
        <pre><code>npm add qlxion-ui
npx qlxion-ui add ${name}</code></pre>
      </main>
    </Layout>
  );
}
`;

  return content;
}

async function main() {
  const components = readRegistryComponents();
  
  for (const component of components) {
    const { spec, examples } = readSpec(component.name);
    const specSections = parseSpec(spec);
    const parsedExamples = parseExamples(examples);
    const pageContent = generatePage(component, specSections, parsedExamples);
    
    const outputPath = path.join(OUTPUT_DIR, component.name, "index.tsx");
    fs.writeFileSync(outputPath, pageContent);
    console.log(`Generated: ${outputPath}`);
  }
  
  console.log("All component pages generated!");
}

main().catch(console.error);