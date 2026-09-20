import { Layout } from "@/components/Layout";

export default function AccordionDoc() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold">Accordion</h1>
          <p className="mt-2 text-lg text-muted-foreground">Panel terlipat vertikal untuk menampilkan/menyembunyikan konten.</p>
        </div>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Installation</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>npx qlxion-ui add accordion</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Usage</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";`}</code></pre>
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
<li>open</li>
<li>closed</li>
<li>disabled</li></ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Examples</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. WAI-ARIA standards.</AccordionContent>
  </AccordionItem>
</Accordion>`}</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">API</h2>
          <h3 className="mb-2 text-base font-medium">Sub-components</h3>
          <ul className="list-disc pl-6 space-y-1 text-sm"><li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">Accordion</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">AccordionItem</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">AccordionTrigger</code></li>
<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">AccordionContent</code></li></ul>
          <h3 className="mb-4 mt-4 text-base font-medium">Props</h3>
          <div className="overflow-x-auto"><table className="w-full border-collapse text-sm"><thead><tr className="bg-muted"><th className="border border-border px-3 py-2 text-left font-semibold">Prop</th><th className="border border-border px-3 py-2 text-left font-semibold">Type</th><th className="border border-border px-3 py-2 text-left font-semibold">Default</th><th className="border border-border px-3 py-2 text-left font-semibold">Description</th></tr></thead><tbody><tr><td className="border border-border px-3 py-2 font-mono text-sm">type</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">"single" | "multiple"</td><td className="border border-border px-3 py-2 text-sm">"single"</td><td className="border border-border px-3 py-2 text-sm">Mode seleksi panel.</td></tr>
<tr><td className="border border-border px-3 py-2 font-mono text-sm">value</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">string | string[]</td><td className="border border-border px-3 py-2 text-sm">-</td><td className="border border-border px-3 py-2 text-sm">Nilai terbuka (controlled).</td></tr>
<tr><td className="border border-border px-3 py-2 font-mono text-sm">defaultValue</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">string | string[]</td><td className="border border-border px-3 py-2 text-sm">""</td><td className="border border-border px-3 py-2 text-sm">Nilai awal (uncontrolled).</td></tr>
<tr><td className="border border-border px-3 py-2 font-mono text-sm">onValueChange</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">(value) =&gt; void</td><td className="border border-border px-3 py-2 text-sm">-</td><td className="border border-border px-3 py-2 text-sm">Callback saat nilai berubah.</td></tr>
<tr><td className="border border-border px-3 py-2 font-mono text-sm">collapsible</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">boolean</td><td className="border border-border px-3 py-2 text-sm">true</td><td className="border border-border px-3 py-2 text-sm">Izinkan panel aktif ditutup kembali.</td></tr></tbody></table></div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Accessibility</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm"><li>aria-expanded pada AccordionTrigger</li>
<li>Keyboard: Enter/Space toggle</li></ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Framework Support</h2>
          <p className="text-sm">react</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Source</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{`npx qlxion-ui add accordion`}</code></pre>
        </section>
      </div>
    </Layout>
  );
}
