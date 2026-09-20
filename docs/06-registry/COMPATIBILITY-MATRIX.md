# Registry — Compatibility Matrix

## Tujuan

Setiap registry item mendeklarasikan kompatibilitas minimum terhadap Tailwind,
React, dan/atau Vue, supaya CLI bisa memperingatkan pengguna sebelum instalasi
jika versi project mereka tidak memenuhi syarat.

## Contoh

| Komponen | Tailwind Min | React Min | Vue Min |
|---|---|---|---|
| Button | 3.0.0 | 18.0.0 | 3.0.0 |
| Dialog | 3.0.0 | 18.0.0 | 3.0.0 |
| Combobox | 3.0.0 | 18.0.0 | 3.2.0 (butuh Teleport stabil) |

## Perilaku CLI

Jika versi project tidak memenuhi `compatibility` di metadata registry, CLI menampilkan
peringatan jelas dan meminta konfirmasi eksplisit sebelum melanjutkan instalasi.
