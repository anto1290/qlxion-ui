export interface QlxionConfig {
  framework: "react" | "next";
  tailwindConfig: string;
  tsx: boolean;
  aliases: {
    components: string;
    utils: string;
    ui: string;
  };
  cssVariables: boolean;
  router?: "app" | "pages";
}

export interface RegistryItem {
  name: string;
  description: string;
  category: string;
  frameworks: string[];
  version: string;
  files: {
    react?: string[];
    vue?: string[];
  };
  dependencies: string[];
  registryDependencies: string[];
  tailwind: {
    cssVars: string[];
  };
  docs: string;
  compatibility: {
    tailwind: string;
    react?: string;
    vue?: string;
  };
}

export interface FrameworkDetectionResult {
  framework: "react" | "next" | "vue" | "nuxt" | "unknown";
  router?: "app" | "pages";
  isTypeScript: boolean;
  tailwindConfigPath: string;
}

export interface ComponentSourceFile {
  sourcePath: string;
  targetPath: string;
  content: string;
}
