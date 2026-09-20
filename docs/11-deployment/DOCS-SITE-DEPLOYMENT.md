# Docs Site Deployment

## Platform (diusulkan)

Vercel, karena `apps/docs-site` dibangun dengan Next.js dan mendapat dukungan
preview deployment otomatis per Pull Request secara native.

## Alur Deployment

1. Setiap PR yang menyentuh `apps/docs-site` atau `docs/03-components/*` memicu
   preview deployment otomatis.
2. Reviewer memeriksa preview URL sebagai bagian dari review PR (terutama untuk
   perubahan visual/komponen baru).
3. Merge ke `main` memicu deployment production.

## Environment Variables

Konfigurasi seperti URL registry CDN untuk playground disimpan sebagai environment
variable di platform hosting, bukan hardcoded di source (AGENTS.md Section 24).

## Cache Invalidation

Setelah release baru, docs-site production perlu memastikan cache halaman komponen
ter-invalidate agar contoh kode dan preview mencerminkan versi registry terbaru.
