# Spacing & Radius

## Spacing Scale

Mengikuti skala Tailwind default sebagai basis (`0, 1, 2, 3, 4, 6, 8, 12, 16, 24, ...`),
direpresentasikan dalam rem. Tidak ada nilai spacing custom per komponen di luar skala ini
kecuali didokumentasikan sebagai pengecualian di `DECISIONS.md`.

## Radius Scale

```text
radius.none  0px
radius.sm    0.25rem
radius.md    0.5rem
radius.lg    0.75rem
radius.full  9999px
```

## Aturan Konsistensi

Komponen sejenis (misalnya semua elemen form: Input, Select, Textarea) harus memakai
token radius yang sama agar terlihat sebagai satu keluarga visual.
