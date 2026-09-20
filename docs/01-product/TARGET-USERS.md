# Target Users

## Persona Utama

1. **Tim frontend startup/product** yang butuh membangun UI cepat tanpa membangun design
   system dari nol, tapi tetap ingin kontrol penuh atas kode komponen (bukan black-box).
2. **Tim dengan stack campuran** — sebagian produk pakai Next.js, sebagian pakai Nuxt —
   dan ingin bahasa desain yang konsisten di kedua stack tanpa membangun dua design system terpisah.
3. **Developer individu/agency** yang membangun banyak project client dengan kebutuhan
   UI serupa, dan ingin CLI yang cepat men-scaffold komponen dasar.

## Bukan Target Utama (untuk sekarang)

- Tim yang butuh component library enterprise dengan dukungan komersial/SLA formal.
- Framework di luar ekosistem React/Vue (mis. Svelte, Angular) — bisa jadi roadmap masa depan,
  tapi di luar cakupan Section 2 & Section 7 AGENTS.md saat ini.

## Kebutuhan yang Harus Dipenuhi

- Instalasi cepat (`npx qlxion-ui init` dalam hitungan detik).
- Dokumentasi komponen yang jelas dan konsisten strukturnya.
- Kemudahan kustomisasi tanpa harus "melawan" library.
- Kepercayaan terhadap aksesibilitas out-of-the-box.
