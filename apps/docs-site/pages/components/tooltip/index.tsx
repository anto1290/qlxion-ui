import { Layout } from "@/components/Layout";

export default function TooltipDoc() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold">Tooltip</h1>
          <p className="mt-2 text-lg text-muted-foreground">Popup info mengambang.</p>
        </div>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Installation</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>npx qlxion-ui add tooltip</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Usage</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";`}</code></pre>
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
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`<Tooltip><TooltipTrigger>Hover me</TooltipTrigger><TooltipContent side="top">This is a tooltip</TooltipContent></Tooltip>`}</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">API</h2>
          <h3 className="mb-2 text-base font-medium">Sub-components</h3>
          <ul className="list-disc pl-6 space-y-1 text-sm"><li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">Tooltip</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">TooltipTrigger</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">TooltipContent</code></li></ul>
          <h3 className="mb-4 mt-4 text-base font-medium">Props</h3>
          <div className="overflow-x-auto"><table className="w-full border-collapse text-sm"><thead><tr className="bg-muted"><th className="border border-border px-3 py-2 text-left font-semibold">Prop</th><th className="border border-border px-3 py-2 text-left font-semibold">Type</th><th className="border border-border px-3 py-2 text-left font-semibold">Default</th><th className="border border-border px-3 py-2 text-left font-semibold">Description</th></tr></thead><tbody><tr><td className="border border-border px-3 py-2 font-mono text-sm">delayDuration</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">number</td><td className="border border-border px-3 py-2 text-sm">0</td><td className="border border-border px-3 py-2 text-sm">Delay sebelum tooltip muncul (ms).</td></tr>
<tr><td className="border border-border px-3 py-2 font-mono text-sm">side</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">"top"|"bottom"|"left"|"right"</td><td className="border border-border px-3 py-2 text-sm">"top"</td><td className="border border-border px-3 py-2 text-sm">Posisi tooltip.</td></tr></tbody></table></div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Accessibility</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm"><li>role="tooltip" pada TooltipContent</li>
<li>Tooltip tidak boleh berisi konten interaktif</li></ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Framework Support</h2>
          <p className="text-sm">react</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Source</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`npx qlxion-ui add tooltip`}</code></pre>
        </section>
      </div>
    </Layout>
  );
}
