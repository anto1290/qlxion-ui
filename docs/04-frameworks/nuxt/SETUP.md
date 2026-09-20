# Nuxt.js — Setup

## Prasyarat

- Nuxt 3.x
- Tailwind CSS (via `@nuxtjs/tailwindcss` atau setup manual)

## Deteksi Otomatis oleh CLI

CLI mendeteksi Nuxt melalui `nuxt.config.ts`/`nuxt.config.js` dan/atau dependency `nuxt`
di `package.json`, lalu mengarahkan instalasi komponen ke direktori yang sesuai konvensi
Nuxt (`components/ui/`, memanfaatkan auto-import bawaan Nuxt).

## Sumber Komponen

Nuxt tidak punya implementasi komponen sendiri — ia mengonsumsi `core-vue` ditambah
lapisan `adapters-nuxt` untuk hal spesifik Nuxt (auto-import, module opsional, SSR).
