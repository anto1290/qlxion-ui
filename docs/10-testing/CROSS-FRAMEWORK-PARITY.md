# Testing — Cross-Framework Parity

## Definisi Parity yang Diuji

Sesuai AGENTS.md Section 7, parity mencakup: visual appearance, design tokens,
component purpose, variants, sizes, states, accessibility behavior, interaction
model, naming conventions, conceptual API.

## Metode Verifikasi

1. **Visual**: screenshot side-by-side React vs Vue dengan props identik (lihat `VISUAL-REGRESSION.md`).
2. **Behavioral**: skenario interaksi yang sama (klik, keyboard nav) dijalankan di kedua
   implementasi via Playwright, memverifikasi hasil akhir (state, aria-attribute) setara.
3. **API Conceptual**: checklist manual saat review PR — apakah prop/variant yang tersedia
   di satu framework juga tersedia secara konsep (walau beda penamaan sintaks) di framework lain.

## Kapan Wajib Dijalankan

Setiap kali `core-react` ATAU `core-vue` untuk komponen yang sama diubah, parity check
wajib dijalankan sebelum merge — bukan opsional.
