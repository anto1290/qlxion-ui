# CLI — Config File (`qlxion.config.json`)

## Tujuan

Menyimpan preferensi project agar setiap command CLI tidak perlu bertanya ulang.

## Skema (diusulkan)

```json
{
  "framework": "next",
  "tailwindConfig": "tailwind.config.ts",
  "tsx": true,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  },
  "cssVariables": true
}
```

## Field

| Field | Tipe | Deskripsi |
|---|---|---|
| `framework` | `react \| next \| vue \| nuxt` | Hasil deteksi/konfirmasi saat `init` |
| `tailwindConfig` | string | Path ke file config Tailwind |
| `tsx` | boolean | Apakah project pakai TypeScript |
| `aliases` | object | Alias path import yang dipakai project |
| `cssVariables` | boolean | Apakah theming pakai CSS variables atau utility class langsung |

## Validasi

CLI memvalidasi skema file ini sebelum menjalankan command apa pun selain `init`.
Jika file tidak ada, CLI mengarahkan pengguna untuk menjalankan `init` terlebih dahulu.
