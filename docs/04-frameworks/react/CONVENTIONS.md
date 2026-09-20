# React — Conventions

## Struktur File Komponen

```text
button/
├── button.tsx      # implementasi + export
├── button.test.tsx
└── index.ts        # re-export
```

## Konvensi Penulisan

- Named export untuk komponen, bukan default export (memudahkan tree-shaking dan
  konsistensi impor di seluruh project pengguna).
- Props di-*type* eksplisit dengan interface, extend dari `React.ComponentPropsWithoutRef`
  untuk elemen native yang relevan.
- Gunakan `forwardRef` pada semua komponen yang membungkus elemen DOM interaktif,
  agar konsumen bisa mengambil ref native.
- Class Tailwind disusun lewat helper varian terpusat, bukan template string manual
  yang berulang di banyak komponen.

## Penamaan

Mengikuti AGENTS.md Section 20 — nama komponen menggunakan PascalCase (`Button`, `Dialog`),
nama file menggunakan kebab-case (`button.tsx`, bukan `Button.tsx`) untuk konsistensi
lintas OS case-sensitive/insensitive.
