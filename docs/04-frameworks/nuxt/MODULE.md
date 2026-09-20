# Nuxt.js — Module (Opsional)

## Tujuan

Menyediakan opsi instalasi alternatif selain CLI copy-source: sebuah Nuxt module
(`@qlxion-ui/nuxt`) yang bisa didaftarkan di `nuxt.config.ts` untuk auto-registrasi
komponen dan konfigurasi Tailwind preset.

## Status

Opsional, bukan jalur utama. Jalur utama tetap CLI copy-source (source-owned model,
AGENTS.md Section 3 & 10). Module ini hanya membantu setup awal (preset Tailwind config,
auto-import), tidak menggantikan model kepemilikan source oleh pengguna.

## Trade-off

Jika module ini mendaftarkan komponen dari `node_modules` alih-alih source lokal,
itu bertentangan dengan prinsip source-owned. Karena itu, module sebaiknya hanya
menyediakan preset konfigurasi (Tailwind, auto-import path), bukan komponen itu sendiri.
Keputusan final harus dicatat sebagai ADR sebelum implementasi.
