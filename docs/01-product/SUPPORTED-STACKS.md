# Supported Stacks

## Matrix Dukungan (diusulkan, perlu dikonfirmasi di DECISIONS.md)

| Stack | Versi Minimum | Status |
|---|---|---|
| React | 18+ | Prioritas Fase 1 |
| Next.js | 13+ (App Router diutamakan, Pages Router didukung) | Prioritas Fase 1–2 |
| Vue | 3.x (Composition API) | Prioritas Fase 3 |
| Nuxt.js | 3.x | Prioritas Fase 4 |
| Tailwind CSS | v3 (evaluasi v4 sebelum Fase 2 — lihat DECISIONS.md ADR terkait) | Wajib |
| TypeScript | 5.x | Wajib (AGENTS.md Section 18) |
| Node.js (untuk CLI) | 18 LTS+ | Wajib |

## Catatan Dukungan Vue

Fase awal hanya mendukung Composition API dengan `<script setup>`. Dukungan Options API
adalah keputusan terbuka (lihat pertanyaan di planning awal) — didokumentasikan sebagai
ADR terpisah jika diputuskan untuk didukung.

## Catatan Dukungan Next.js

Kedua router (App Router dan Pages Router) didukung, tapi App Router adalah target utama
karena tren ekosistem. Perbedaan penanganan `'use client'` didokumentasikan di
`docs/04-frameworks/nextjs/APP-ROUTER.md` dan `PAGES-ROUTER.md`.
