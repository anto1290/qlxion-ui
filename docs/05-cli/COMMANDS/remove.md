# Command: remove

```bash
npx qlxion-ui remove <component>
```

## Perilaku

Menghapus file komponen yang sebelumnya ditambahkan via `add`. Ini adalah operasi
destruktif — wajib konfirmasi kecuali `--yes` (AGENTS.md Section 12).

## Batasan

CLI tidak menghapus komponen lain yang bergantung pada komponen ini tanpa peringatan
eksplisit. Jika ditemukan komponen lain yang masih mereferensikan komponen yang akan
dihapus, tampilkan peringatan dan minta konfirmasi tambahan.

## Flag

| Flag | Deskripsi |
|---|---|
| `--yes` | Lewati konfirmasi |
| `--force` | Hapus meski ada dependent lain (tidak disarankan) |
