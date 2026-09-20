import fs from "fs";
import path from "path";

const REGISTRY_DIR = path.join(process.cwd(), "packages", "registry", "components");
const SPEC_DIR = path.join(process.cwd(), "docs", "03-components");
const OUTPUT_PATH = path.join(process.cwd(), "apps", "docs-site", "public", "search-index.json");

interface SearchEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  frameworks: string[];
  url: string;
  props?: string[];
  variants?: string[];
}

function readRegistryComponents() {
  const files = fs.readdirSync(REGISTRY_DIR).filter((f) => f.endsWith(".json"));
  return files.map((f) => JSON.parse(fs.readFileSync(path.join(REGISTRY_DIR, f), "utf-8")));
}

function parseSpecForPropsAndVariants(spec: string | null): { props: string[]; variants: string[] } {
  if (!spec) return { props: [], variants: [] };
  
  const props: string[] = [];
  const variants: string[] = [];
  let inPropsSection = false;
  
  for (const line of spec.split("\n")) {
    if (line.startsWith("## Props") || line.startsWith("## Props / Atribut")) {
      inPropsSection = true;
      continue;
    }
    if (line.startsWith("##") && inPropsSection) {
      inPropsSection = false;
      continue;
    }
    if (inPropsSection && line.includes("|") && !line.includes("---")) {
      const parts = line.split("|").map(p => p.trim()).filter(p => p);
      if (parts.length >= 2 && parts[0] !== "Nama") {
        const propName = parts[0];
        props.push(propName);
        if (propName.toLowerCase().includes("variant")) {
          const variantMatches = line.match(/(default|destructive|outline|ghost|link|sm|md|lg|icon)/g);
          if (variantMatches) {
            for (const v of variantMatches) {
              if (!variants.includes(v)) variants.push(v);
            }
          }
        }
      }
    }
  }
  
  return { props, variants };
}

function generateSearchIndex() {
  const components = readRegistryComponents();
  const entries: SearchEntry[] = [];

  for (const component of components) {
    const name = component.name;
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    
    // Try to read SPEC.md for props and variants
    const specPath = path.join(SPEC_DIR, name, "SPEC.md");
    const spec = fs.existsSync(specPath) ? fs.readFileSync(specPath, "utf-8") : null;
    const { props, variants } = parseSpecForPropsAndVariants(spec);
    
    entries.push({
      id: name,
      title: capitalized,
      description: component.description || "",
      category: component.category || "uncategorized",
      frameworks: component.frameworks || ["react"],
      url: `/components/${name}`,
      props,
      variants
    });
  }

  // Also add guide pages
  const guides = [
    { id: "getting-started", title: "Getting Started", description: "Installation and quick start guide", category: "guides", frameworks: [], url: "/getting-started", props: [], variants: [] },
    { id: "installation", title: "Installation", description: "How to install QLXion UI", category: "guides", frameworks: [], url: "/getting-started/installation", props: [], variants: [] },
    { id: "cli", title: "CLI", description: "Command line interface usage", category: "guides", frameworks: [], url: "/getting-started/cli", props: [], variants: [] },
    { id: "theming", title: "Theming", description: "Customizing themes and design tokens", category: "guides", frameworks: [], url: "/theming", props: [], variants: [] },
    { id: "playground", title: "Playground", description: "Interactive component playground", category: "guides", frameworks: [], url: "/playground", props: [], variants: [] },
  ];

  entries.push(...guides);

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(entries, null, 2));
  console.log(`Search index generated at ${OUTPUT_PATH}`);
  console.log(`Total entries: ${entries.length}`);
}

generateSearchIndex();