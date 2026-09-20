# Card — Catatan Implementasi React

## Lokasi Source

`packages/core-react/src/card/card.tsx`

## Kontrak

- Native `<div>` (atau sesuai as prop) sebagai basis.
- Variant, padding, radius controlled via prop (map ke class Tailwind)
- Tidak ada logic interaksi built-in (klik/fokus by consumer)
- Menggunakan cn helper, forwardRef ke root
- `children` prop bebas

### Checklist Implementasi

```
[x] Semua varian di SPEC.md diimplementasikan (variant, padding, radius)
[x] Prop as/asChild bekerja
[x] Tidak ada style hardcoded di luar token/skala Tailwind
[x] Unit test + axe-core accessibility
```
