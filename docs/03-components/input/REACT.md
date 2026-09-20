# Input — Catatan Implementasi React

## Lokasi Source

`packages/core-react/src/input/input.tsx`

## Pendekatan Implementasi

- Native `<input>` element sebagai basis.
- Variant dan size dikelola melalui helper varian (cva-like) di `packages/utils`.
- Wrapper `div` dengan `relative` positioning untuk prefix/suffix/icon support.
- Label dan error message menggunakan htmlFor/id association untuk accessibility.
- Tidak menggunakan Radix Slot — `asChild` merender langsung `<input>` tanpa wrapper.

## Contoh API

```tsx
<Input label="Email" placeholder="Enter email" required />

<Input variant="destructive" error="Invalid email" />

<Input prefix="$" suffix=".com" type="text" />

<Input size="sm" disabled />
```

## Checklist Implementasi

```text
[ ] Semua varian di SPEC.md diimplementasikan
[ ] Semua size (sm, default, lg) sesuai SPEC.md
[ ] States: default, focus, disabled, error sesuai SPEC.md
[ ] Forward ref ke elemen <input>
[ ] Prop label membuat <label> dengan htmlFor yang benar
[ ] Prop error men-set aria-invalid dan menampilkan pesan
[ ] Prop prefix/suffix/icon bekerja dengan positioning yang benar
[ ] Unit test (21 tests) mencakup semua variant, size, dan state
[ ] Test aksesibilitas dasar (axe-core) lulus
```