# Button — Catatan Implementasi React

## Lokasi Source

`packages/core-react/src/button/button.tsx`

## Pendekatan Implementasi (diusulkan)

- Native `<button>` element sebagai basis.
- Variant dan size dikelola melalui helper varian (cva-like) di `packages/utils`.
- Prop `asChild` menggunakan pola Slot (terinspirasi Radix `Slot`) agar bisa merender
  sebagai elemen lain tanpa wrapper tambahan.

## Contoh API (ilustratif, bukan kode final)

```tsx
<Button variant="destructive" size="sm">
  Delete
</Button>

<Button asChild>
  <a href="/dashboard">Dashboard</a>
</Button>
```

## Next.js Considerations

Jika Button dipakai dalam Server Component tapi butuh event handler (`onClick`),
komponen ini perlu diberi `'use client'` — didokumentasikan sebagai bagian dari
`adapters-next`, bukan di `core-react` langsung (lihat `docs/04-frameworks/nextjs/CLIENT-SERVER-BOUNDARY.md`).

## Checklist Implementasi

```text
[ ] Semua varian di SPEC.md diimplementasikan
[ ] Semua state (hover/focus/active/disabled/loading) sesuai SPEC.md
[ ] Forward ref ke elemen <button>
[ ] Prop asChild bekerja tanpa merusak styling
[ ] Unit test menutupi setiap varian dan size
[ ] Test aksesibilitas dasar (axe-core) lulus
```
