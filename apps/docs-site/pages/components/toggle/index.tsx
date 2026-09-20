import { Layout } from "@/components/Layout";

export default function ToggleDoc() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold">Toggle</h1>
          <p className="mt-2 text-lg text-muted-foreground">Tombol dua kondisi yang dapat ditekan.</p>
        </div>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Installation</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>npx qlxion-ui add toggle</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Usage</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`import { Toggle } from "@/components/ui/toggle";`}</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Preview</h2>
          <div className="rounded-md border border-border bg-muted/30 p-6 flex items-center justify-center min-h-24">
            <p className="text-sm text-muted-foreground">Interactive preview â€” use the <a href="/playground" className="underline hover:text-foreground">Playground</a>.</p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Variants</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm"><li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">default</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">outline</code></li></ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">States</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm"><li>pressed</li>
<li>unpressed</li>
<li>disabled</li></ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Examples</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`<Toggle variant="outline" onPressedChange={(p) => console.log(p)}>Bold</Toggle>`}</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">API</h2>
          <h3 className="mb-2 text-base font-medium">Sub-components</h3>
          <ul className="list-disc pl-6 space-y-1 text-sm"><li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">Toggle</code></li></ul>
          <h3 className="mb-4 mt-4 text-base font-medium">Props</h3>
          <div className="overflow-x-auto"><table className="w-full border-collapse text-sm"><thead><tr className="bg-muted"><th className="border border-border px-3 py-2 text-left font-semibold">Prop</th><th className="border border-border px-3 py-2 text-left font-semibold">Type</th><th className="border border-border px-3 py-2 text-left font-semibold">Default</th><th className="border border-border px-3 py-2 text-left font-semibold">Description</th></tr></thead><tbody><tr><td className="border border-border px-3 py-2 font-mono text-sm">pressed</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">boolean</td><td className="border border-border px-3 py-2 text-sm">-</td><td className="border border-border px-3 py-2 text-sm">Status pressed.</td></tr>
<tr><td className="border border-border px-3 py-2 font-mono text-sm">defaultPressed</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">boolean</td><td className="border border-border px-3 py-2 text-sm">false</td><td className="border border-border px-3 py-2 text-sm">Status awal.</td></tr>
<tr><td className="border border-border px-3 py-2 font-mono text-sm">onPressedChange</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">(pressed: boolean) =&gt; void</td><td className="border border-border px-3 py-2 text-sm">-</td><td className="border border-border px-3 py-2 text-sm">Callback saat berubah.</td></tr>
<tr><td className="border border-border px-3 py-2 font-mono text-sm">variant</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">"default" | "outline"</td><td className="border border-border px-3 py-2 text-sm">"default"</td><td className="border border-border px-3 py-2 text-sm">Gaya visual.</td></tr>
<tr><td className="border border-border px-3 py-2 font-mono text-sm">size</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">"default" | "sm" | "lg"</td><td className="border border-border px-3 py-2 text-sm">"default"</td><td className="border border-border px-3 py-2 text-sm">Ukuran.</td></tr></tbody></table></div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Accessibility</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm"><li>aria-pressed menunjukkan status</li>
<li>Keyboard: Space atau Enter untuk toggle</li></ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Framework Support</h2>
          <p className="text-sm">react</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Source</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`npx qlxion-ui add toggle`}</code></pre>
        </section>
      </div>
    </Layout>
  );
}
