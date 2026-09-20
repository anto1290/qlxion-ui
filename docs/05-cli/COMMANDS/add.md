# Command: add

```bash
npx qlxion-ui add <component>
```

## Perilaku

1. Baca `qlxion.config.json`.
2. Resolve metadata komponen dari registry sesuai framework project.
3. Resolve registry dependencies (mis. `Combobox` butuh `Popover`) secara rekursif.
4. Salin file source ke direktori `ui` sesuai alias config.
5. Jika ada dependency npm yang dibutuhkan dan belum terpasang, tampilkan daftar
   lalu install (dengan konfirmasi kecuali `--yes`).
6. Jika file tujuan sudah ada, tampilkan diff dan minta konfirmasi overwrite.

## Flag

| Flag | Deskripsi |
|---|---|
| `--yes` | Lewati semua konfirmasi |
| `--overwrite` | Paksa overwrite tanpa diff prompt |
| `--dry-run` | Tampilkan apa yang akan terjadi tanpa menulis file |

## Multi-komponen

```bash
npx qlxion-ui add button card dialog
```
Diproses berurutan, dengan resolusi dependency gabungan agar tidak duplikat proses install.
