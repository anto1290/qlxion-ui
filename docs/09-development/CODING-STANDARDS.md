# Coding Standards

## TypeScript

- Strict mode aktif di seluruh package.
- Hindari `any` kecuali ada alasan teknis yang didokumentasikan di komentar kode.
- Gunakan tipe eksplisit untuk public API (props, return type fungsi CLI, dsb).

## Linting & Formatting

- ESLint untuk aturan kode.
- Prettier untuk formatting otomatis (konfigurasi seragam di root, tidak override per package
  kecuali ada kebutuhan spesifik yang didokumentasikan).

## Struktur Import

Import diurutkan: built-in/eksternal → internal package (`@qlxion-ui/*`) → relative import,
dipisahkan baris kosong antar grup.

## Komentar Kode

Komentar menjelaskan *kenapa*, bukan *apa* (kode sudah menjelaskan apa). Keputusan
non-obvious yang berulang kali ditanyakan reviewer sebaiknya dijelaskan lewat komentar
atau dirujuk ke ADR terkait di `docs/00-project/DECISIONS.md`.
