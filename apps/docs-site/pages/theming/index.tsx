import { Layout } from "@/components/Layout";

export default function ThemingPage() {
  return (
    <Layout>
      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Theming</h1>
        <p className="text-lg text-muted-foreground mb-8">
          QLXion UI uses CSS variables for theming, making it easy to customize colors, spacing, and other design tokens.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">CSS Variables</h2>
          <p className="text-muted-foreground mb-4">
            All design tokens are exposed as CSS custom properties:
          </p>
          <pre className="p-4 bg-muted rounded overflow-x-auto mb-4"><code>{`:root {
  /* Colors */
  --qlx-color-primary: 221.2 83.2% 53.3%;
  --qlx-color-primary-foreground: 210 40% 98%;
  --qlx-color-destructive: 0 84.2% 60.2%;
  --qlx-color-background: 0 0% 100%;
  --qlx-color-foreground: 222.2 84% 4.9%;
  --qlx-color-muted: 210 40% 96.1%;
  --qlx-color-muted-foreground: 215.4 16.3% 46.9%;
  --qlx-color-border: 214.3 31.8% 91.4%;
  --qlx-color-ring: 221.2 83.2% 53.3%;
  
  /* Radius */
  --qlx-radius-sm: 0.25rem;
  --qlx-radius-md: 0.375rem;
  --qlx-radius-lg: 0.5rem;
  --qlx-radius-xl: 0.75rem;
  
  /* Spacing */
  --qlx-spacing-1: 0.25rem;
  --qlx-spacing-2: 0.5rem;
  --qlx-spacing-3: 0.75rem;
  --qlx-spacing-4: 1rem;
  --qlx-spacing-6: 1.5rem;
  
  /* Typography */
  --qlx-font-sans: system-ui, -apple-system, sans-serif;
  --qlx-font-mono: ui-monospace, monospace;
}`}</code></pre>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Dark Mode</h2>
          <p className="text-muted-foreground mb-4">
            Dark mode is enabled by adding the <code className="bg-muted px-1 rounded">dark</code> class to the <code className="bg-muted px-1 rounded">html</code> element:
          </p>
          <pre className="p-4 bg-muted rounded overflow-x-auto mb-4"><code>{`.dark {
  --qlx-color-background: 222.2 84% 4.9%;
  --qlx-color-foreground: 210 40% 98%;
  --qlx-color-muted: 217.2 32.6% 17.5%;
  --qlx-color-muted-foreground: 215 20.2% 65.1%;
  --qlx-color-border: 217.2 32.6% 17.5%;
}`}</code></pre>
          <p className="text-muted-foreground mb-4">
            Toggle dark mode in JavaScript:
          </p>
          <pre className="p-4 bg-muted rounded overflow-x-auto mb-4"><code>{`// Enable dark mode
document.documentElement.classList.add("dark");

// Disable dark mode
document.documentElement.classList.remove("dark");`}</code></pre>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Customizing Tokens</h2>
          <p className="text-muted-foreground mb-4">
            Override CSS variables in your global CSS to customize the theme:
          </p>
          <pre className="p-4 bg-muted rounded overflow-x-auto mb-4"><code>{`/* app/globals.css */
:root {
  --qlx-color-primary: 142.1 76.2% 36.3%; /* Custom green primary */
  --qlx-radius-md: 0.5rem; /* Rounder corners */
}`}</code></pre>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Using Tokens in Tailwind</h2>
          <p className="text-muted-foreground mb-4">
            Reference design tokens in your Tailwind config:
          </p>
          <pre className="p-4 bg-muted rounded overflow-x-auto mb-4"><code>{`// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--qlx-color-primary))",
        background: "hsl(var(--qlx-color-background))",
        foreground: "hsl(var(--qlx-color-foreground))",
        // ...etc
      },
      borderRadius: {
        sm: "var(--qlx-radius-sm)",
        md: "var(--qlx-radius-md)",
        lg: "var(--qlx-radius-lg)",
      },
    },
  },
}`}</code></pre>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Component-Level Override</h2>
          <p className="text-muted-foreground mb-4">
            Override tokens for specific components using Tailwind's arbitrary values:
          </p>
          <pre className="p-4 bg-muted rounded overflow-x-auto mb-4"><code>{`<Button className="bg-[hsl(var(--qlx-color-destructive))] hover:bg-[hsl(var(--qlx-color-destructive))/90]">
  Custom Color
</Button>`}</code></pre>
        </section>
      </main>
    </Layout>
  );
}