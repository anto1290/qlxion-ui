# Command: init

```bash
npx qlxion-ui init
```

## Perilaku

1. Deteksi framework (lihat `FRAMEWORK-DETECTION.md`).
2. Tanyakan lokasi Tailwind config.
3. Tanyakan alias path import.
4. Tanyakan preferensi CSS variables vs utility class langsung untuk theming.
5. Tulis `qlxion.config.json`.

## Flag

| Flag | Deskripsi |
|---|---|
| `--yes` | Terima semua default tanpa prompt interaktif |
| `--framework <name>` | Paksa framework tertentu, lewati deteksi otomatis |

## Idempotensi

Menjalankan `init` ulang pada project yang sudah dikonfigurasi akan menanyakan
konfirmasi sebelum menimpa `qlxion.config.json` yang ada.
