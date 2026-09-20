# Button — Catatan Implementasi Vue

## Lokasi Source

`packages/core-vue/src/Button/Button.vue`

## Pendekatan Implementasi (diusulkan)

- Composition API dengan `<script setup>`.
- Native `<button>` sebagai basis, dengan render dinamis via `component :is` untuk mendukung
  perilaku setara `asChild` di React (misalnya prop `as="a"`).
- Variant/size class dihasilkan dari helper varian yang sama secara konsep dengan versi React
  (implementasi terpisah karena bahasa berbeda, tapi logika pemetaan varian→class harus identik).

## Contoh API (ilustratif, bukan kode final)

```vue
<Button variant="destructive" size="sm">Delete</Button>

<Button as="a" href="/dashboard">Dashboard</Button>
```

## Nuxt Considerations

Auto-import komponen ini melalui Nuxt module (opsional) didokumentasikan di
`docs/04-frameworks/nuxt/AUTO-IMPORT.md`, bukan di file ini.

## Checklist Implementasi

```text
[ ] Semua varian di SPEC.md diimplementasikan, identik secara visual dengan versi React
[ ] Semua state (hover/focus/active/disabled/loading) sesuai SPEC.md
[ ] Prop `as` bekerja untuk elemen semantik lain
[ ] Unit test menutupi setiap varian dan size
[ ] Test aksesibilitas dasar lulus
[ ] Verifikasi manual/visual regression dibanding versi React
```
