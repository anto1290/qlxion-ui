# Nuxt.js — Auto Import

## Perilaku Default Nuxt

Nuxt secara otomatis meng-auto-import komponen dari direktori `components/` tanpa
perlu `import` manual. Komponen QLXion UI yang di-copy CLI ke `components/ui/Button.vue`
otomatis tersedia sebagai `<Button />` di seluruh project.

## Penamaan dengan Prefix

Untuk menghindari bentrok nama dengan komponen lain di project pengguna, disarankan
komponen di-copy ke subfolder `components/ui/`, yang oleh Nuxt otomatis di-prefix
menjadi `<UiButton />` kecuali dikonfigurasi lain — ini perlu didokumentasikan jelas
di output CLI setelah instalasi agar tidak membingungkan pengguna.

## SSR Hydration

Komponen dengan state berbasis browser API (mis. `window`, `matchMedia` untuk deteksi
reduced-motion) harus menangani kondisi SSR dengan aman (guard `process.client` atau
`onMounted`) agar tidak menyebabkan hydration mismatch.
