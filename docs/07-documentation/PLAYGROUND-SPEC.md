# Playground — Spec

## Fitur Wajib (AGENTS.md Section 14)

- Live preview
- Code preview
- Component variants switcher
- Component states switcher
- Theme switching (light/dark, custom token override)
- Framework selection (toggle React ⇄ Vue pada komponen yang sama)

## Prinsip Implementasi

Playground WAJIB memakai implementasi asli dari `core-react`/`core-vue` dan token asli
dari `packages/tokens` — dilarang membuat implementasi tiruan hanya untuk kebutuhan
preview dokumentasi (AGENTS.md Section 14, larangan eksplisit).

## Kegunaan Tambahan: Cross-Framework Visual Check

Karena playground bisa menampilkan React dan Vue berdampingan dengan tema yang sama,
ini juga berfungsi sebagai alat verifikasi manual untuk framework parity, melengkapi
automated visual regression test (lihat `docs/10-testing/VISUAL-REGRESSION.md`).
