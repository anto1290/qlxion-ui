import { Layout } from "@/components/Layout";

export default function CLIPage() {
  const commands = [
    { name: "init", description: "Initialize QLXion UI in your project", usage: "npx qlxion-ui init [options]" },
    { name: "add", description: "Add a component to your project", usage: "npx qlxion-ui add <component> [options]" },
    { name: "remove", description: "Remove a component from your project", usage: "npx qlxion-ui remove <component> [options]" },
    { name: "update", description: "Update a component to the latest version", usage: "npx qlxion-ui update <component> [options]" },
    { name: "list", description: "List all available components", usage: "npx qlxion-ui list [options]" },
    { name: "search", description: "Search for components", usage: "npx qlxion-ui search <query> [options]" },
    { name: "info", description: "Show detailed information about a component", usage: "npx qlxion-ui info <component> [options]" },
    { name: "diff", description: "Show differences between local and registry component", usage: "npx qlxion-ui diff <component> [options]" },
  ];

  return (
    <Layout>
      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">CLI Reference</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The QLXion UI CLI helps you manage components in your project. All commands work with <code className="bg-muted px-1 rounded">npx</code> - no global installation required.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Commands</h2>
          <div className="space-y-6">
            {commands.map((cmd) => (
              <div key={cmd.name} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                  <code className="text-lg font-mono bg-muted px-3 py-1 rounded">
                    npx qlxion-ui {cmd.name}
                  </code>
                  <span className="text-sm text-muted-foreground">{cmd.description}</span>
                </div>
                <pre className="p-3 bg-muted rounded overflow-x-auto"><code>{cmd.usage}</code></pre>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Common Options</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li><code className="bg-muted px-1 rounded">--yes, -y</code> - Skip confirmation prompts</li>
            <li><code className="bg-muted px-1 rounded">--cwd {"<path>"}</code> - Working directory (default: current directory)</li>
            <li><code className="bg-muted px-1 rounded">--registry {"<url>"}</code> - Custom registry URL</li>
            <li><code className="bg-muted px-1 rounded">--json</code> - Output as JSON</li>
            <li><code className="bg-muted px-1 rounded">--help, -h</code> - Show help for command</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Examples</h2>
          <div className="space-y-4">
            <pre className="p-4 bg-muted rounded overflow-x-auto"><code>{`# Initialize a new project
npx qlxion-ui init

# Add button component
npx qlxion-ui add button

# Add multiple components
npx qlxion-ui add button card input

# List all components
npx qlxion-ui list

# Search for form components
npx qlxion-ui search input

# Get component info
npx qlxion-ui info button

# Update all components
npx qlxion-ui update`}</code></pre>
          </div>
        </section>
      </main>
    </Layout>
  );
}