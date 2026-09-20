# Registry — Hosting

## Opsi A: Statis via CDN (rekomendasi awal)

Registry berupa file JSON di dalam repo, di-build ke `packages/registry/build/`,
lalu diakses CLI melalui CDN seperti jsDelivr yang menyajikan konten langsung dari
tag/release GitHub. Tidak butuh infrastruktur server terpisah.

## Opsi B: API Server

Server dinamis yang bisa menyediakan fitur tambahan: registry privat per organisasi,
analytics pemakaian komponen, otentikasi akses. Lebih kompleks secara operasional.

## Rekomendasi

Mulai dari Opsi A. Migrasi ke Opsi B hanya jika ada kebutuhan nyata (bukan spekulatif)
seperti permintaan enterprise untuk private registry — dicatat sebagai ADR baru saat itu.

## Cache & Versioning

CLI harus melakukan fetch registry dengan cache-busting yang wajar (mis. cache pendek
atau parameter versi) agar `qlxion-ui add` selalu mendapat versi registry-item terbaru
yang relevan, tanpa membebani CDN dengan request berulang tanpa cache sama sekali.
