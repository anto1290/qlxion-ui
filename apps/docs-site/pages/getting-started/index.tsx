import { Layout } from "@/components/Layout";
import Link from "next/link";

export default function GettingStartedIndex() {
  return (
    <Layout>
      <main className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Getting Started</h1>
        <p className="text-lg text-muted-foreground mb-8">
          QLXion UI is a multi-framework, Tailwind CSS-based design system. 
          Choose your framework to get started.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/getting-started/installation" className="p-6 border rounded-lg hover:border-primary/50 hover:bg-accent transition-colors">
            <h2 className="text-xl font-semibold mb-2">Installation</h2>
            <p className="text-muted-foreground">Install QLXion UI and set up Tailwind CSS.</p>
          </Link>
          <Link href="/getting-started/cli" className="p-6 border rounded-lg hover:border-primary/50 hover:bg-accent transition-colors">
            <h2 className="text-xl font-semibold mb-2">CLI</h2>
            <p className="text-muted-foreground">Use the CLI to add components to your project.</p>
          </Link>
        </div>
      </main>
    </Layout>
  );
}