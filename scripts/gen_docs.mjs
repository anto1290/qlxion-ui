import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'apps/docs-site/pages/components');
const INDEX_OUT = path.join(ROOT, 'apps/docs-site/public/search-index.json');

function tc(n) {
  return n.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
}

function cb(code) {
  return '{`' + code.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`}';
}

function li(items, code = false) {
  if (!items?.length) return '          <p className="text-sm text-muted-foreground">None.</p>';
  const tag = (i) => code ? `<code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">${i}</code>` : i;
  const rows = items.map(i => `            <li>${tag(i)}</li>`).join('\n');
  return `          <ul className="list-disc pl-6 space-y-1 text-sm">\n${rows}\n          </ul>`;
}

function pr(props) {
  if (!props?.length) return '              <tr><td colSpan={4} className="border border-border px-3 py-2 text-sm text-muted-foreground">Extends HTML attributes.</td></tr>';
  return props.map(([n, t, d, desc]) => {
    const t2 = t.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `              <tr>\n                <td className="border border-border px-3 py-2 font-mono text-sm">${n}</td>\n                <td className="border border-border px-3 py-2 text-sm text-muted-foreground">${t2}</td>\n                <td className="border border-border px-3 py-2 text-sm">${d}</td>\n                <td className="border border-border px-3 py-2 text-sm">${desc}</td>\n              </tr>`;
  }).join('\n');
}
