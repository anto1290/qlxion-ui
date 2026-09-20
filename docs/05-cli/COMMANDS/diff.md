# Command: diff

```bash
npx qlxion-ui diff <component>
```

## Perilaku

Menampilkan perbedaan antara file komponen di project pengguna (yang mungkin sudah
dikustomisasi) dengan versi terbaru di registry, tanpa menulis apa pun ke disk.

## Kegunaan

Command ini krusial untuk model source-owned — pengguna perlu tahu apa yang berubah
di registry sebelum memutuskan menjalankan `update` (AGENTS.md Section 12, alinea
tentang pentingnya `diff`/`update` bagi source-owned model).

## Flag

| Flag | Deskripsi |
|---|---|
| `--all` | Tampilkan diff untuk semua komponen terpasang yang punya versi baru |
