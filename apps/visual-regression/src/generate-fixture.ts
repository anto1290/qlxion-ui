/**
 * Fixture generator — renders React & Vue components to static HTML
 * for visual regression testing via Playwright.
 */

import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../../..');
const FIXTURES_DIR = join(__dirname, '../fixtures');
const SCREENSHOTS_DIR = join(__dirname, '../screenshots');

const TOKENS_CSS = readFileSync(join(ROOT, 'packages/tokens/dist/tokens.css'), 'utf-8');

interface ComponentFixture {
  name: string;
  reactImport: string;
  vueImport: string;
  variants: Array<{ name: string; reactSnippet: string; vueSnippet: string }>;
}

const FIXTURES: ComponentFixture[] = [
  {
    name: 'button',
    reactImport: "import { Button } from '@qlxion-ui/core-react';",
    vueImport: "import Button from '@qlxion-ui/core-vue';",
    variants: [
      {
        name: 'default',
        reactSnippet: '<Button>Default</Button>',
        vueSnippet: '<Button variant="default">Default</Button>',
      },
      {
        name: 'variants',
        reactSnippet: `<div style="display:flex;gap:8px;align-items:center">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>`,
        vueSnippet: `<div style="display:flex;gap:8px;align-items:center">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>`,
      },
      {
        name: 'sizes',
        reactSnippet: `<div style="display:flex;gap:8px;align-items:center">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">A</Button>
        </div>`,
        vueSnippet: `<div style="display:flex;gap:8px;align-items:center">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">A</Button>
        </div>`,
      },
      {
        name: 'states',
        reactSnippet: `<div style="display:flex;gap:8px;align-items:center">
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>`,
        vueSnippet: `<div style="display:flex;gap:8px;align-items:center">
          <Button :disabled="true">Disabled</Button>
          <Button :loading="true">Loading</Button>
        </div>`,
      },
    ],
  },
];

function createReactFixtureHTML(f: ComponentFixture): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${f.name} — React</title>
  <style>${TOKENS_CSS}</style>
  <style>body{margin:0;font-family:system-ui,sans-serif;background:var(--background);color:var(--foreground)}</style>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    import React from 'https://esm.sh/react@19';
    import ReactDOM from 'https://esm.sh/react-dom@19/client';
    ${f.reactImport}
    ReactDOM.render(React.createElement(React.Fragment, null, '${f.variants[0].reactSnippet.replace(/'/g, "\\'")}'), document.getElementById('root'));
  </script>
</body>
</html>`;
}

function createVueFixtureHTML(f: ComponentFixture): string {
  const snippet = f.variants[0].vueSnippet.replace(/"/g, '&quot;');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${f.name} — Vue</title>
  <style>${TOKENS_CSS}</style>
  <style>body{margin:0;font-family:system-ui,sans-serif;background:var(--background);color:var(--foreground)}</style>
</head>
<body>
  <div id="app"></div>
  <script type="module">
    import { createApp } from 'https://esm.sh/vue@3';
    import Button from 'https://esm.sh/@qlxion-ui/core-vue?deps=vue@3';
    const app = createApp({ template: '<div>${snippet}</div>' });
    app.component('Button', Button);
    app.mount('#app');
  </script>
</body>
</html>`;
}

function createSideBySideHTML(f: ComponentFixture): string {
  const reactSnippet = f.variants[0].reactSnippet.replace(/'/g, "\\'");
  const vueSnippet = f.variants[0].vueSnippet.replace(/"/g, '&quot;');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${f.name} — React vs Vue</title>
  <style>${TOKENS_CSS}</style>
  <style>
    body{margin:0;font-family:system-ui,sans-serif;background:var(--background);color:var(--foreground)}
    .layout{display:grid;grid-template-columns:1fr 1fr;min-height:100vh}
    .panel{padding:24px;border-right:1px solid var(--border)}
    .panel:last-child{border-right:none}
    .label{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--muted-foreground);margin-bottom:16px}
  </style>
</head>
<body>
  <div class="layout">
    <div class="panel"><div class="label">React</div><div id="react-root"></div></div>
    <div class="panel"><div class="label">Vue</div><div id="vue-root"></div></div>
  </div>
  <script type="module">
    import React from 'https://esm.sh/react@19';
    import ReactDOM from 'https://esm.sh/react-dom@19/client';
    import { createApp } from 'https://esm.sh/vue@3';
    import Button from 'https://esm.sh/@qlxion-ui/core-vue?deps=vue@3';

    ReactDOM.render(React.createElement(React.Fragment, null, '${reactSnippet}'), document.getElementById('react-root'));

    const vueApp = createApp({ template: '<div>${vueSnippet}</div>' });
    vueApp.component('Button', Button);
    vueApp.mount('#vue-root');
  </script>
</body>
</html>`;
}

async function main() {
  mkdirSync(FIXTURES_DIR, { recursive: true });
  mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  for (const f of FIXTURES) {
    console.log(`Generating fixture: ${f.name}`);

    const reactHTML = createReactFixtureHTML(f);
    const vueHTML = createVueFixtureHTML(f);
    const sideHTML = createSideBySideHTML(f);

    writeFileSync(join(FIXTURES_DIR, `${f.name}-react.html`), reactHTML);
    writeFileSync(join(FIXTURES_DIR, `${f.name}-vue.html`), vueHTML);
    writeFileSync(join(FIXTURES_DIR, `${f.name}-side-by-side.html`), sideHTML);

    // Preview screenshots
    await page.goto(`file://${join(FIXTURES_DIR, `${f.name}-react.html`)}`);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: join(SCREENSHOTS_DIR, `${f.name}-react-preview.png`) });

    await page.goto(`file://${join(FIXTURES_DIR, `${f.name}-side-by-side.html`)}`);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: join(SCREENSHOTS_DIR, `${f.name}-side-preview.png`) });
  }

  await browser.close();
  console.log('Done. Fixtures written to apps/visual-regression/fixtures/');
}

main().catch(console.error);
