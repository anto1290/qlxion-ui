# Vue — Setup

## Prasyarat

- Vue 3.x (Composition API)
- Tailwind CSS terkonfigurasi
- TypeScript disarankan

## Instalasi via CLI

```bash
npx qlxion-ui init
npx qlxion-ui add button
```

CLI mendeteksi Vue melalui `package.json` (dependency `vue`, bukan `nuxt`), lalu
menanyakan lokasi Tailwind config dan alias path (`@/components`), sama seperti alur React.

## Struktur Hasil Instalasi

```text
src/
└── components/
    └── ui/
        └── Button.vue
```

## Perbedaan Penamaan File

Komponen Vue menggunakan PascalCase untuk nama file (`Button.vue`), berbeda dari
konvensi React (`button.tsx`), mengikuti konvensi komunitas Vue masing-masing.
Ini didokumentasikan sebagai pengecualian yang disengaja terhadap konsistensi lintas
framework (AGENTS.md Section 20 tetap menekankan konsistensi konsep, bukan literal string).
