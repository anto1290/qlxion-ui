# Color System

## Struktur Warna

- **Semantic colors**: `primary`, `secondary`, `destructive`, `muted`, `accent`, `background`, `foreground`, `border`, `ring`.
- **Scale per warna semantic**: 50–900, mengikuti konvensi umum Tailwind.

## Kontras & Aksesibilitas

Setiap kombinasi warna teks-di-atas-background pada varian komponen wajib memenuhi
rasio kontras WCAG AA minimum (4.5:1 untuk teks normal, 3:1 untuk teks besar/UI komponen).
Ini diverifikasi sebagai bagian dari `docs/10-testing/ACCESSIBILITY-TESTING.md`.

## Format Penyimpanan

Warna disimpan dalam format HSL channel-terpisah (`H S% L%`) agar mudah dipakai dengan
opacity modifier Tailwind (`bg-primary/50`), bukan hex langsung.
