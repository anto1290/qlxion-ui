# Next.js — Setup

## Prasyarat

- Next.js 13+
- Tailwind CSS
- TypeScript disarankan

## Deteksi Otomatis oleh CLI

CLI mendeteksi Next.js melalui keberadaan `next` di `package.json` dan/atau
`next.config.js`/`next.config.ts`, kemudian menentukan apakah project memakai
App Router (`app/`) atau Pages Router (`pages/`) untuk menyesuaikan lokasi
alias import dan contoh penggunaan di dokumentasi yang ditampilkan CLI.

## Sumber Komponen

Next.js tidak punya implementasi komponen sendiri — ia mengonsumsi `core-react`
ditambah lapisan `adapters-next` untuk hal-hal spesifik Next.js (lihat
`CLIENT-SERVER-BOUNDARY.md`).
