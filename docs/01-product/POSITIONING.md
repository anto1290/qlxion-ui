# Positioning

## Dibanding shadcn/ui

shadcn/ui adalah referensi utama model source-owned, tapi terbatas pada React/Next.js.
QLXion UI mengambil filosofi yang sama dan memperluasnya ke Vue/Nuxt.js, dengan tambahan
kontrak formal (`SPEC.md` per komponen) agar parity lintas-framework terjaga, bukan sekadar
"port informal".

## Dibanding Radix UI / Headless UI

Radix dan Headless UI adalah primitive library tanpa styling (headless). QLXion UI
tidak menggantikan mereka — QLXion UI bisa membangun di atas primitive semacam itu untuk
perilaku a11y kompleks (dialog, popover, combobox), lalu menambahkan lapisan styling
Tailwind + design token di atasnya. Keputusan primitive mana yang dipakai per komponen
didokumentasikan di `docs/03-components/<nama>/SPEC.md`.

## Dibanding PrimeVue / Vuetify

PrimeVue dan Vuetify adalah component library tertutup (black-box) untuk Vue saja.
QLXion UI berbeda karena: (1) source-owned, (2) multi-framework dengan kontrak yang sama,
(3) desain berbasis token yang bisa di-theme penuh tanpa override CSS yang rapuh.

## Proposisi Nilai Utama

1. Satu kontrak desain, empat target framework.
2. Kontrol penuh atas source code komponen di project pengguna.
3. Registry terpusat untuk penemuan dan update komponen, tanpa vendor lock-in penuh.
4. Aksesibilitas dan konsistensi visual sebagai bagian dari kontrak, bukan tambahan.
