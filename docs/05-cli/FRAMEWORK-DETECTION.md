# CLI — Framework Detection

## Heuristik Deteksi

Urutan pengecekan saat `init`:

1. Jika `package.json` punya dependency `next` → framework = `next`.
2. Jika ada `nuxt.config.ts`/`nuxt.config.js` atau dependency `nuxt` → framework = `nuxt`.
3. Jika dependency `vue` ada tanpa `nuxt` → framework = `vue`.
4. Jika dependency `react`/`react-dom` ada tanpa `next` → framework = `react`.
5. Jika tidak terdeteksi otomatis → tanyakan langsung ke pengguna (jangan menebak diam-diam,
   sesuai prinsip "Do Not Guess" AGENTS.md Section 27).

## Sub-deteksi Next.js Router

Jika framework = `next`, deteksi tambahan:

- Ada folder `app/` → App Router.
- Hanya ada folder `pages/` → Pages Router.
- Ada keduanya → tanyakan mode default yang dipakai untuk komponen baru.

## Output ke Pengguna

Hasil deteksi selalu ditampilkan eksplisit ke pengguna sebelum ditulis ke
`qlxion.config.json`, dengan opsi untuk mengoreksi jika deteksi salah.
