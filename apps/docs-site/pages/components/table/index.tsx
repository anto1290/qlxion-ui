import { Layout } from "@/components/Layout";

export default function TableDoc() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold">Table</h1>
          <p className="mt-2 text-lg text-muted-foreground">Komponen tabel semantik.</p>
        </div>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Installation</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>npx qlxion-ui add table</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Usage</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";`}</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Preview</h2>
          <div className="rounded-md border border-border bg-muted/30 p-6 flex items-center justify-center min-h-24">
            <p className="text-sm text-muted-foreground">Interactive preview â€” use the <a href="/playground" className="underline hover:text-foreground">Playground</a>.</p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Variants</h2>
          <p className="text-sm text-muted-foreground">No variants.</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">States</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm"><li>default</li>
<li>hover</li></ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Examples</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`<Table><TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Alice</TableCell></TableRow></TableBody></Table>`}</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">API</h2>
          <h3 className="mb-2 text-base font-medium">Sub-components</h3>
          <ul className="list-disc pl-6 space-y-1 text-sm"><li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">Table</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">TableHeader</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">TableBody</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">TableRow</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">TableHead</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">TableCell</code></li></ul>
          <h3 className="mb-4 mt-4 text-base font-medium">Props</h3>
          <p className="text-sm text-muted-foreground">Extends HTML attributes.</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Accessibility</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm"><li>Gunakan thead, tbody, th scope yang benar</li></ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Framework Support</h2>
          <p className="text-sm">react</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Source</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`npx qlxion-ui add table`}</code></pre>
        </section>
      </div>
    </Layout>
  );
}
