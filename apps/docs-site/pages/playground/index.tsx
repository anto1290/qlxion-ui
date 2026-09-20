import React, { useState, useEffect, useRef } from "react";
import { Button as ReactButton } from "@qlxion-ui/core-react";
import { createApp, h } from "vue";
import { Button as VueButton } from "@qlxion-ui/core-vue";
import { Layout } from "@/components/Layout";

export default function PlaygroundPage() {
  const [framework, setFramework] = useState<"react" | "vue">("react");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Apply dark mode to document for Tailwind dark: variant
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const [variant, setVariant] = useState<"default" | "destructive" | "outline" | "ghost" | "link">("default");
  const [size, setSize] = useState<"sm" | "md" | "lg" | "icon">("md");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const vueMountRef = useRef<HTMLDivElement>(null);
  const vueAppRef = useRef<any>(null);

  useEffect(() => {
    if (framework === "vue" && vueMountRef.current) {
      if (vueAppRef.current) vueAppRef.current.unmount();
      vueMountRef.current.innerHTML = "";
      const app = createApp({
        render() {
          return h(VueButton, { variant, size, disabled, loading }, { default: () => "Playground Button (Vue)" });
        },
      });
      app.mount(vueMountRef.current);
      vueAppRef.current = app;
    }
    return () => {
      if (vueAppRef.current) {
        vueAppRef.current.unmount();
        vueAppRef.current = null;
      }
    };
  }, [framework, variant, size, disabled, loading]);

  const reactCode = `<Button variant="${variant}" size="${size}"${disabled ? " disabled" : ""}${loading ? " loading" : ""}>
  Playground Button
</Button>`;

  const vueCode = `<Button variant="${variant}" size="${size}"${disabled ? " :disabled=\"true\"" : ""}${loading ? " :loading=\"true\"" : ""}>
  Playground Button
</Button>`;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-xl font-bold">QLXion UI Playground</h1>
          <div className="flex gap-4">
            <div className="flex border rounded overflow-hidden">
              <button
                className={`px-3 py-1 text-sm ${framework === "react" ? "bg-blue-600 text-white" : ""}`}
                onClick={() => setFramework("react")}
              >React</button>
              <button
                className={`px-3 py-1 text-sm ${framework === "vue" ? "bg-emerald-600 text-white" : ""}`}
                onClick={() => setFramework("vue")}
              >Vue</button>
            </div>
            <button
              className="border px-3 py-1 rounded text-sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >Theme: {theme.toUpperCase()}</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded bg-muted/50">
          <div>
            <label className="block text-xs font-semibold mb-1">VARIANT</label>
            <select
              className="w-full text-sm p-1 border rounded bg-background"
              value={variant}
              onChange={(e) => setVariant(e.target.value as any)}
            >
              <option value="default">default</option>
              <option value="destructive">destructive</option>
              <option value="outline">outline</option>
              <option value="ghost">ghost</option>
              <option value="link">link</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">SIZE</label>
            <select
              className="w-full text-sm p-1 border rounded bg-background"
              value={size}
              onChange={(e) => setSize(e.target.value as any)}
            >
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
              <option value="icon">icon</option>
            </select>
          </div>
          <div className="flex flex-col justify-end space-y-1">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
              Disabled
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} />
              Loading
            </label>
          </div>
        </div>

        <div className="p-8 border rounded flex flex-col items-center justify-center min-h-[160px] bg-card">
          <div className="text-xs uppercase text-muted-foreground mb-4 font-semibold">Live Preview ({framework})</div>
          {framework === "react" ? (
            <ReactButton variant={variant} size={size === "md" ? "default" : size} disabled={disabled} loading={loading}>
              Playground Button (React)
            </ReactButton>
          ) : (
            <div ref={vueMountRef} />
          )}
        </div>

        <div>
          <div className="text-xs font-semibold uppercase text-muted-foreground mb-2">Code Preview</div>
          <pre className="p-4 bg-muted rounded text-sm overflow-x-auto">
            <code>{framework === "react" ? reactCode : vueCode}</code>
          </pre>
        </div>
      </div>
    </Layout>
  );
}
