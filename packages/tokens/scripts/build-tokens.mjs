import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, '..');
const srcDir = path.join(pkgRoot, 'src');
const outDir = path.join(pkgRoot, 'dist');

// ── Load tokens ──────────────────────────────────────────────────────────────
const color = JSON.parse(fs.readFileSync(path.join(srcDir, 'color.json'), 'utf8'));
const typography = JSON.parse(fs.readFileSync(path.join(srcDir, 'typography.json'), 'utf8'));
const spacing = JSON.parse(fs.readFileSync(path.join(srcDir, 'spacing.json'), 'utf8'));
const radius = JSON.parse(fs.readFileSync(path.join(srcDir, 'radius.json'), 'utf8'));
const shadow = JSON.parse(fs.readFileSync(path.join(srcDir, 'shadow.json'), 'utf8'));
const motion = JSON.parse(fs.readFileSync(path.join(srcDir, 'motion.json'), 'utf8'));
const breakpoints = JSON.parse(fs.readFileSync(path.join(srcDir, 'breakpoints.json'), 'utf8'));
const zIndex = JSON.parse(fs.readFileSync(path.join(srcDir, 'zIndex.json'), 'utf8'));

// ── Helpers ──────────────────────────────────────────────────────────────────
const hsl = (h, s, l) => `${h} ${s}% ${l}%`;
const hsla = (h, s, l, a) => `${h} ${s}% ${l}% / ${a}`;

// Build semantic color classes for Tailwind
const buildSemanticColors = () => {
  const colors = {};
  for (const [name, value] of Object.entries(color)) {
    // Scalar HSL tokens (background, foreground, border, etc.)
    if (typeof value === 'object' && value !== null && !Array.isArray(value) && 'h' in value) {
      const { h, s, l } = value;
      colors[name] = hsl(h, s, l);
    }
    // Scale tokens (primary, secondary, destructive, muted, accent)
    else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      colors[name] = {};
      for (const [shade, { h, s, l }] of Object.entries(value)) {
        colors[name][shade] = hsl(h, s, l);
      }
    }
  }
  return colors;
};

// Build design token theme map for Tailwind
const buildTheme = () => {
  const theme = {
    colors: buildSemanticColors(),
    spacing: spacing.spacing,
    borderRadius: radius,
    boxShadow: shadow,
    fontFamily: {
      sans: [...typography.sans],
      serif: [...typography.serif],
      mono: [...typography.mono],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    },
    fontWeight: typography.fontWeight || {},
    lineHeight: spacing.lineHeight,
    transitionDuration: motion.duration,
    transitionTimingFunction: motion.easing,
    screens: breakpoints,
    zIndex,
  };
  return theme;
};

// Build CSS custom properties
const buildCssVars = (base = '--qlx-') => {
  const lines = [];

  // Colors
  for (const [name, value] of Object.entries(color)) {
    // Scalar HSL tokens (background, foreground, border, etc.)
    if (typeof value === 'object' && value !== null && !Array.isArray(value) && 'h' in value) {
      const { h, s, l } = value;
      lines.push(`  ${base}color-${name}: ${hsl(h, s, l)};`);
    }
    // Scale tokens (primary, secondary, destructive, muted, accent)
    else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const flat = {};
      for (const [shade, { h, s, l }] of Object.entries(value)) {
        flat[shade] = hsl(h, s, l);
      }
      const baseVal = flat['500'] ?? Object.values(flat)[0];
      lines.push(`  ${base}color-${name}: ${baseVal};`);
      for (const [shade, val] of Object.entries(flat)) {
        lines.push(`  ${base}color-${name}-${shade}: ${val};`);
      }
    }
  }

  // Spacing
  for (const [k, v] of Object.entries(spacing.spacing)) {
    lines.push(`  ${base}spacing-${k}: ${v};`);
  }

  // Radius
  for (const [k, v] of Object.entries(radius)) {
    lines.push(`  ${base}radius-${k}: ${v};`);
  }

  // Shadow
  for (const [k, v] of Object.entries(shadow)) {
    lines.push(`  ${base}shadow-${k}: ${v};`);
  }

  // Motion
  for (const [k, v] of Object.entries(motion.duration)) {
    lines.push(`  ${base}motion-duration-${k}: ${v};`);
  }
  for (const [k, v] of Object.entries(motion.easing)) {
    lines.push(`  ${base}motion-easing-${k}: ${v};`);
  }

  // Breakpoints
  for (const [k, v] of Object.entries(breakpoints)) {
    lines.push(`  ${base}breakpoint-${k}: ${v};`);
  }

  // Z-index
  for (const [k, v] of Object.entries(zIndex)) {
    lines.push(`  ${base}z-${k}: ${v};`);
  }

  return lines.join('\n');
};

// ── Build output ─────────────────────────────────────────────────────────────
fs.mkdirSync(outDir, { recursive: true });

const tailwindPreset = {
  theme: {
    extend: buildTheme(),
  },
  plugins: [],
};

fs.writeFileSync(
  path.join(outDir, 'tailwind.config.cjs'),
  `// Auto-generated — do not edit manually. Rebuild with \`pnpm run build\`.\nmodule.exports = ${JSON.stringify(tailwindPreset, null, 2)};\n`,
  'utf8',
);

const cssVars = `/* Auto-generated by @qlxion-ui/tokens — do not edit manually. */
/* Rebuild with \`pnpm run build\` in packages/tokens. */
:root {
${buildCssVars()}
}

[data-theme='dark'] {
${buildCssVars('--qlx-')}
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

fs.writeFileSync(path.join(outDir, 'tokens.css'), cssVars, 'utf8');

// Also output raw tokens as JSON for type-safe consumption
fs.writeFileSync(
  path.join(outDir, 'tokens.json'),
  JSON.stringify({ color, typography, spacing, radius, shadow, motion, breakpoints, zIndex }, null, 2),
  'utf8',
);

console.log('Built:');
console.log('  dist/tailwind.config.cjs');
console.log('  dist/tokens.css');
console.log('  dist/tokens.json');
