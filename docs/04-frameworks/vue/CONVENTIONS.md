# Vue — Conventions

## Struktur File Komponen

```text
Button/
├── Button.vue
├── Button.test.ts
└── index.ts
```

## Konvensi Penulisan

- `<script setup lang="ts">` sebagai standar, bukan Options API (kecuali diputuskan lain
  di ADR terpisah).
- Props dideklarasikan dengan `defineProps<T>()` bertipe eksplisit.
- Emits dideklarasikan eksplisit dengan `defineEmits<T>()`.
- Class Tailwind disusun lewat helper varian yang secara konsep identik dengan versi React,
  walau implementasi bahasa berbeda.
- Gunakan `defineExpose` bila konsumen perlu mengakses method/instance internal (mis. fokus
  programatik pada Input).

## Slot vs Props

Konten yang bersifat konten (children di React) direpresentasikan sebagai default slot
di Vue. Named slot dipakai untuk area yang jelas terpisah secara struktural (mis. slot
`icon` di komponen Button).
