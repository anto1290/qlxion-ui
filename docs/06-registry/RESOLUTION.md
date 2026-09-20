# Registry — Dependency Resolution

## Registry Dependencies

Sebuah komponen bisa bergantung pada komponen lain di registry (misalnya `Combobox`
butuh `Popover` dan `Command`). Field `registryDependencies` mendaftarkan nama
komponen lain yang harus ikut ter-resolve.

## Algoritma Resolusi (diusulkan)

1. Mulai dari komponen yang diminta pengguna.
2. Traversal dependency graph (DFS/BFS), kumpulkan semua registry dependency secara rekursif.
3. Deteksi siklus dependency — jika ditemukan, CLI harus gagal dengan pesan jelas
   (siklus dependency adalah bug di registry, bukan kondisi valid).
4. Urutkan instalasi agar dependency terpasang sebelum komponen yang membutuhkannya.

## NPM Dependencies

Field `dependencies` (bukan `registryDependencies`) mendaftarkan package npm eksternal
yang dibutuhkan (jika ada) — di-install terpisah dari proses copy source file.
