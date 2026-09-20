import { Layout } from "@/components/Layout";

export default function InstallationPage() {
  return (
    <Layout>
      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Installation</h1>
        
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
          <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
            <li>Node.js 18+</li>
            <li>Tailwind CSS 3.0+ configured in your project</li>
            <li>React 18+ or Vue 3+ project</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
          <p className="text-muted-foreground mb-4">
            Initialize QLXion UI in your project:
          </p>
          <pre className="p-4 bg-muted rounded overflow-x-auto mb-4"><code>{`npx qlxion-ui init`}</code></pre>
          <p className="text-muted-foreground mb-4">
            This will:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-muted-foreground mb-4">
            <li>Create a <code>components.json</code> configuration file</li>
            <li>Set up Tailwind CSS with QLXion UI design tokens</li>
            <li>Configure path aliases for components</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Adding Components</h2>
          <p className="text-muted-foreground mb-4">
            Add components using the CLI:
          </p>
          <pre className="p-4 bg-muted rounded overflow-x-auto mb-4"><code>{`npx qlxion-ui add button`}</code></pre>
          <p className="text-muted-foreground mb-4">
            This copies the component source files to your project, making them fully customizable.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Manual Setup (React)</h2>
          <pre className="p-4 bg-muted rounded overflow-x-auto mb-4"><code>{`// tailwind.config.js
import { qlxionUI } from "@qlxion-ui/tailwind-config";

export default {
  plugins: [qlxionUI],
  // ...your config
}`}</code></pre>
          <pre className="p-4 bg-muted rounded overflow-x-auto mb-4"><code>{`// app/globals.css
@import "@qlxion-ui/tokens/css-variables";
@tailwind base;
@tailwind components;
@tailwind utilities;`}</code></pre>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Manual Setup (Vue)</h2>
          <pre className="p-4 bg-muted rounded overflow-x-auto mb-4"><code>{`// tailwind.config.js
import { qlxionUI } from "@qlxion-ui/tailwind-config";

export default {
  plugins: [qlxionUI],
  // ...your config
}`}</code></pre>
          <pre className="p-4 bg-muted rounded overflow-x-auto mb-4"><code>{`// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import "@qlxion-ui/tokens/css-variables.css";

createApp(App).mount("#app");`}</code></pre>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
            <li><a href="/components" className="underline hover:text-primary">Browse Components</a></li>
            <li><a href="/playground" className="underline hover:text-primary">Try the Playground</a></li>
            <li><a href="/getting-started/cli" className="underline hover:text-primary">Learn CLI Commands</a></li>
            <li><a href="/theming" className="underline hover:text-primary">Customize Themes</a></li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}