import { test, expect } from '@playwright/test';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(__dirname, '../fixtures');

mkdirSync(join(__dirname, '../baselines'), { recursive: true });
mkdirSync(join(__dirname, '../screenshots'), { recursive: true });

const FIXTURES = [
  { name: 'button', type: 'react' as const },
  { name: 'button', type: 'vue' as const },
  { name: 'button', type: 'side-by-side' as const },
];

test.describe('Visual Regression — React Components', () => {
  for (const fixture of FIXTURES.filter(f => f.type === 'react')) {
    test(`${fixture.name} React`, async ({ page }) => {
      const filePath = join(FIXTURES_DIR, `${fixture.name}-react.html`);
      if (!existsSync(filePath)) test.skip();
      await page.goto(`file://${filePath}`);
      await page.waitForTimeout(1500);
      await expect(page).toHaveScreenshot(`button-react.png`, { threshold: 0.01 });
    });
  }
});

test.describe('Visual Regression — Vue Components', () => {
  for (const fixture of FIXTURES.filter(f => f.type === 'vue')) {
    test(`${fixture.name} Vue`, async ({ page }) => {
      const filePath = join(FIXTURES_DIR, `${fixture.name}-vue.html`);
      if (!existsSync(filePath)) test.skip();
      await page.goto(`file://${filePath}`);
      await page.waitForTimeout(1500);
      await expect(page).toHaveScreenshot(`button-vue.png`, { threshold: 0.01 });
    });
  }
});

test.describe('Visual Regression — Side-by-Side Comparison', () => {
  for (const fixture of FIXTURES.filter(f => f.type === 'side-by-side')) {
    test(`${fixture.name} React vs Vue`, async ({ page }) => {
      const filePath = join(FIXTURES_DIR, `${fixture.name}-side-by-side.html`);
      if (!existsSync(filePath)) test.skip();
      await page.goto(`file://${filePath}`);
      await page.waitForTimeout(2000);
      await expect(page).toHaveScreenshot(`button-side-by-side.png`, { threshold: 0.01 });
    });
  }
});



