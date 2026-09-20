# React — Setup

## Prasyarat

- React 18+
- Tailwind CSS terkonfigurasi di project
- TypeScript (disarankan, mengikuti AGENTS.md Section 18)

## Instalasi via CLI

```bash
npx qlxion-ui init
npx qlxion-ui add button
```

`init` akan:

1. Mendeteksi bahwa project adalah React (bukan Next.js) berdasarkan `package.json`
   (tidak ada dependency `next`).
2. Menanyakan lokasi Tailwind config dan alias path (`@/components`).
3. Menulis `qlxion.config.json` di root project.

## Struktur Hasil Instalasi

```text
src/
└── components/
    └── ui/
        └── button.tsx
```

## Dependency Runtime

Komponen React QLXion UI berusaha meminimalkan dependency eksternal. Dependency yang
mungkin dibutuhkan (mis. utility `clsx`/`cva`-like) didaftarkan secara eksplisit oleh
CLI berdasarkan metadata registry, bukan diasumsikan sudah terpasang.
