import { Layout } from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <main className="max-w-2xl mx-auto p-12">
        <h1 className="text-4xl font-bold mb-6">QLXion UI Documentation</h1>
        <p className="text-lg text-muted-foreground mb-8">
          A multi-framework, Tailwind CSS-based design system and component ecosystem.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/getting-started" className="p-6 border rounded-lg hover:border-primary/50 hover:bg-accent transition-colors">
            <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
            <p className="text-muted-foreground">Installation, CLI usage, and quick start guide.</p>
          </Link>
          <Link href="/components" className="p-6 border rounded-lg hover:border-primary/50 hover:bg-accent transition-colors">
            <h2 className="text-xl font-semibold mb-2">Components</h2>
            <p className="text-muted-foreground">Browse all 36 available components.</p>
          </Link>
          <Link href="/frameworks" className="p-6 border rounded-lg hover:border-primary/50 hover:bg-accent transition-colors">
            <h2 className="text-xl font-semibold mb-2">Frameworks</h2>
            <p className="text-muted-foreground">React, Next.js, Vue, Nuxt.js integration guides.</p>
          </Link>
          <Link href="/playground" className="p-6 border rounded-lg hover:border-primary/50 hover:bg-accent transition-colors">
            <h2 className="text-xl font-semibold mb-2">Playground</h2>
            <p className="text-muted-foreground">Interactive component preview and code generator.</p>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
