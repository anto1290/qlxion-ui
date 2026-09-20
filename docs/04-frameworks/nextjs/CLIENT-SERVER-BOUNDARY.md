# Next.js — Client/Server Boundary

## Prinsip

`core-react` tetap ditulis framework-agnostic (tidak tahu soal Next.js). Penambahan
direktif `'use client'` dan penanganan boundary Server/Client adalah tanggung jawab
`adapters-next`, bukan `core-react` langsung — ini menjaga `core-react` tetap bisa
dipakai di project React murni (Vite, CRA, dll) tanpa bagasi spesifik Next.js.

## Implementasi Praktis

Karena model CLI adalah copy-source (bukan import dari package), pendekatan yang
digunakan adalah: registry menyimpan dua varian file untuk komponen yang butuh
`'use client'` — satu versi polos untuk React biasa, satu versi dengan direktif
untuk target Next.js — dipilih otomatis oleh CLI berdasarkan deteksi framework
(lihat `docs/05-cli/FRAMEWORK-DETECTION.md`).

## next/image dan next/link

Jika sebuah komponen QLXion UI secara opsional bisa memanfaatkan `next/image` atau
`next/link` untuk optimasi (mis. di dalam komponen Avatar atau Card dengan gambar),
ini diimplementasikan sebagai prop opsional yang menerima komponen custom dari
pengguna, bukan hard dependency ke Next.js di dalam `core-react`.
