import { Layout } from "@/components/Layout";

export default function BadgeDoc() {
  // Real project: load MDX
  return (
    <Layout>
      <main className="prose mx-auto max-w-3xl p-6">
        <h1>Badge</h1>
        <h2>Description</h2>
        <p>Label badge kecil untuk status, tag, atau jumlah</p>

        <h2>Installation</h2>
        <pre><code>npx qlxion-ui add badge</code></pre>

        <h2>Usage</h2>
        <pre><code>{'<Badge />'}</code></pre>

        <h2>Preview</h2>
        <div className="p-4 border rounded bg-muted/50">
          <p className="text-sm text-muted-foreground">Preview not available in static documentation. Use the Playground for interactive preview.</p>
        </div>
        <h2>Examples</h2>
        <h3>Basic</h3>
        <pre><code>{'<Badge />'}</code></pre>
        <h2>API</h2>
        <ul>
        </ul>
        <h2>Accessibility</h2>
        <ul>
          <li>Follows standard accessibility practices</li>
        </ul>
        <h2>Framework Support</h2>
        <ul>
          <li>React</li>
        </ul>
        <h2>Source</h2>
        <pre><code>npm add qlxion-ui
npx qlxion-ui add badge</code></pre>
      </main>
    </Layout>
  );
}
