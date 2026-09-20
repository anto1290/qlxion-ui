import { Layout } from "@/components/Layout";

export default function DialogDoc() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold">Dialog</h1>
          <p className="mt-2 text-lg text-muted-foreground">Modal dialog untuk konten overlay.</p>
        </div>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Installation</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>npx qlxion-ui add dialog</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Usage</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";`}</code></pre>
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
          <ul className="list-disc pl-6 space-y-1 text-sm"><li>open</li>
<li>closed</li></ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Examples</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`<Dialog><DialogTrigger>Open</DialogTrigger><DialogContent><DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader><DialogFooter><DialogClose>Close</DialogClose></DialogFooter></DialogContent></Dialog>`}</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">API</h2>
          <h3 className="mb-2 text-base font-medium">Sub-components</h3>
          <ul className="list-disc pl-6 space-y-1 text-sm"><li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">Dialog</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">DialogTrigger</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">DialogContent</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">DialogHeader</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">DialogFooter</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">DialogTitle</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">DialogDescription</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">DialogClose</code></li></ul>
          <h3 className="mb-4 mt-4 text-base font-medium">Props</h3>
          <div className="overflow-x-auto"><table className="w-full border-collapse text-sm"><thead><tr className="bg-muted"><th className="border border-border px-3 py-2 text-left font-semibold">Prop</th><th className="border border-border px-3 py-2 text-left font-semibold">Type</th><th className="border border-border px-3 py-2 text-left font-semibold">Default</th><th className="border border-border px-3 py-2 text-left font-semibold">Description</th></tr></thead><tbody><tr><td className="border border-border px-3 py-2 font-mono text-sm">open</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">boolean</td><td className="border border-border px-3 py-2 text-sm">-</td><td className="border border-border px-3 py-2 text-sm">Status buka/tutup (controlled).</td></tr>
<tr><td className="border border-border px-3 py-2 font-mono text-sm">defaultOpen</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">boolean</td><td className="border border-border px-3 py-2 text-sm">false</td><td className="border border-border px-3 py-2 text-sm">Status awal (uncontrolled).</td></tr>
<tr><td className="border border-border px-3 py-2 font-mono text-sm">onOpenChange</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">(open: boolean) =&gt; void</td><td className="border border-border px-3 py-2 text-sm">-</td><td className="border border-border px-3 py-2 text-sm">Callback saat status berubah.</td></tr></tbody></table></div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Accessibility</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm"><li>role="dialog"</li>
<li>aria-modal=true</li>
<li>Escape menutup dialog</li></ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Framework Support</h2>
          <p className="text-sm">react</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Source</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`npx qlxion-ui add dialog`}</code></pre>
        </section>
      </div>
    </Layout>
  );
}
