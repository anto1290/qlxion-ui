# Documentation Site — Structure

## Navigasi Utama

```text
Getting Started
  - Installation
  - CLI
  - Theming
Components
  - (satu halaman per komponen, mengikuti struktur AGENTS.md Section 13)
Frameworks
  - React / Next.js
  - Vue / Nuxt.js
Playground
```

## Struktur Halaman Komponen (wajib, AGENTS.md Section 13)

```text
Description
Installation
Usage
Preview
Variants
Sizes
States
Examples
API
Accessibility
Framework Support
Source
```

## Sumber Konten

Halaman komponen di-generate/ditulis berdasarkan `docs/03-components/<nama>/SPEC.md`
dan `EXAMPLES.md`, bukan ditulis ulang terpisah — menghindari drift antara spesifikasi
dan dokumentasi publik.
