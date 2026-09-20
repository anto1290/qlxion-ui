import { Layout } from "@/components/Layout";
import Link from "next/link";

const frameworks = [
  {
    name: "React",
    href: "/frameworks/react",
    description: "React integration with hooks and components",
    features: ["TypeScript support", "Server Components", "Next.js App Router"],
  },
  {
    name: "Next.js",
    href: "/frameworks/nextjs",
    description: "Next.js specific features and optimizations",
    features: ["App Router", "Server Components", "Middleware", "Image optimization"],
  },
  {
    name: "Vue",
    href: "/frameworks/vue",
    description: "Vue 3 integration with Composition API",
    features: ["TypeScript support", "Composition API", "SFC", "Nuxt 3"],
  },
  {
    name: "Nuxt.js",
    href: "/frameworks/nuxt",
    description: "Nuxt 3 integration with auto-imports",
    features: ["Auto-imports", "SSR", "Modules", "DevTools"],
  },
];

export default function FrameworksIndex() {
  return (
    <Layout>
      <main className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Frameworks</h1>
        <p className="text-lg text-muted-foreground mb-8">
          QLXion UI supports multiple frontend ecosystems with consistent APIs and design tokens.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {frameworks.map((fw) => (
            <Link
              key={fw.name}
              href={fw.href}
              className="p-6 border rounded-lg hover:border-primary/50 hover:bg-accent transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">{fw.name}</h2>
              <p className="text-muted-foreground mb-3">{fw.description}</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {fw.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}