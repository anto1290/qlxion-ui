# @qlxion-ui/tokens

Source of truth for the QLXion UI design system. All tokens are defined once in `src/*.json` and transformed into:

- **Tailwind config preset** (`dist/tailwind.config.cjs`) — use as `require('@qlxion-ui/tokens/tailwind')`
- **CSS custom properties** (`dist/tokens.css`) — drop into your project's root stylesheet
- **Raw JSON** (`dist/tokens.json`) — consume programmatically in build scripts

## Token Categories

| File | Purpose |
|------|---------|
| `color.json` | Semantic colors (primary, secondary, destructive, muted, accent) + surface tokens |
| `typography.json` | Font families (sans, serif, mono) |
| `spacing.json` | Spacing scale and line-height scale |
| `radius.json` | Border radius scale |
| `shadow.json` | Box shadow definitions |
| `motion.json` | Transition durations and easing functions |
| `breakpoints.json` | Responsive breakpoint values |
| `zIndex.json` | Z-index scale |

## Usage

### Tailwind Preset

```js
// tailwind.config.js
const qlxion = require('@qlxion-ui/tokens/tailwind');

module.exports = {
  content: ['./src/**/*.{ts,tsx,vue}'],
  presets: [qlxion],
  theme: {
    extend: {
      // Override tokens per-project if needed
      // colors: { primary: { 500: '240 80% 55%' } }
    },
  },
};
```

### CSS Variables

Import `dist/tokens.css` in your project's entry point:

```css
@import '@qlxion-ui/tokens/css';
```

Or copy the contents into your own stylesheet. Variables are namespaced with `--qlx-`:

```css
:root {
  --qlx-color-primary: 222 89% 55%;
  --qlx-color-primary-50: 222 89% 97%;
  --qlx-color-primary-500: 222 89% 55%;
  --qlx-color-primary-950: 226 70% 16%;
  --qlx-spacing-4: 1rem;
  --qlx-radius-md: 0.375rem;
  --qlx-shadow-sm: 0px 1px 2px 0px rgb(0 0 0 / 0.05);
  --qlx-motion-duration-fast: 100ms;
  --qlx-breakpoint-lg: 1024px;
}
```

### Dark Mode

Add `[data-theme='dark']` rules to override variable values:

```css
[data-theme='dark'] {
  --qlx-color-background: 224 71% 4%;
  --qlx-color-foreground: 213 31% 91%;
  /* ... */
}
```

### TypeScript Types

Import raw token types for compile-time safety:

```ts
import type { ColorTokens, SpacingTokens } from '@qlxion-ui/tokens';

// Used in build scripts or code generation
```

## Build

```bash
pnpm --filter @qlxion-ui/tokens run build
```

Regenerates `dist/tailwind.config.cjs`, `dist/tokens.css`, and `dist/tokens.json` from `src/*.json`.

## Framework Parity

Tokens are framework-agnostic. Both React and Vue projects consume the same Tailwind preset and CSS variables, ensuring visual consistency across ecosystems.