# CLI — Error Handling

## Prinsip

Error harus actionable — bukan hanya menyatakan apa yang salah, tapi juga saran perbaikan.

## Kategori Error

| Kategori | Contoh | Perilaku |
|---|---|---|
| Config tidak ditemukan | `qlxion.config.json` tidak ada | Sarankan jalankan `init` |
| Komponen tidak ditemukan di registry | Nama salah ketik | Sarankan komponen mirip (fuzzy match) via `search` |
| Konflik file lokal | File sudah dikustomisasi pengguna | Tampilkan diff, minta konfirmasi sebelum overwrite |
| Dependency registry gagal resolve | Registry down/network error | Pesan jelas + saran retry, tidak menulis file parsial |
| Framework tidak terdeteksi | Project tidak dikenali | Tanya langsung, jangan menebak |

## Exit Codes

CLI menggunakan exit code non-zero untuk semua kondisi gagal, agar bisa dipakai
dengan aman di script CI/CD (script-friendly, AGENTS.md Section 12).
