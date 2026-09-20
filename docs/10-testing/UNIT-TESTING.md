# Testing — Unit Testing

## Tooling

Vitest dipakai untuk React (`core-react`) dan Vue (`core-vue`) agar konfigurasi
testing seragam lintas package dalam monorepo.

## Cakupan Minimum per Komponen

- Setiap varian (`variant`) dirender dan diverifikasi class/attribute yang sesuai.
- Setiap size dirender dan diverifikasi.
- State disabled/loading diverifikasi tidak bisa memicu aksi (mis. onClick tidak terpanggil).
- Forward ref (React) / expose instance (Vue) bekerja sesuai kontrak SPEC.md.

## Lokasi Test

Test file bersebelahan dengan implementasi (`button.test.tsx` di sebelah `button.tsx`),
bukan di folder `__tests__` terpisah, agar mudah ditemukan saat mengubah komponen.

## Contoh Kasus Uji (ilustratif)

```text
- renders default variant with correct classes
- renders destructive variant with correct classes
- disabled button does not trigger onClick
- loading button sets aria-busy=true
- asChild/as renders as the given element
```
