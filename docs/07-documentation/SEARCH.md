# Documentation Site — Search

## Cakupan Pencarian

- Nama komponen dan deskripsi singkat.
- Nama prop/varian (mis. mencari "destructive" mengarah ke halaman Button & Alert).
- Halaman panduan (Getting Started, Theming, dsb).

## Pendekatan Teknis (diusulkan)

Client-side search index (mis. berbasis static search seperti Pagefind/Flexsearch)
di-generate saat build docs-site, tanpa butuh backend search terpisah untuk fase awal.

## Keterkaitan dengan Registry

Hasil pencarian di docs site sebaiknya konsisten dengan hasil `qlxion-ui search`
di CLI — idealnya keduanya membaca dari sumber metadata yang sama (registry),
untuk menghindari daftar komponen yang berbeda antara CLI dan website.
