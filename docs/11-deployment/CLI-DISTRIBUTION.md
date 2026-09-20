# CLI Distribution

## Target Distribusi

Package npm bernama `qlxion-ui`, dirancang untuk dijalankan via `npx` tanpa instalasi
global (AGENTS.md Section 12).

## Build Sebelum Publish

CLI di-bundle (mis. via `tsup`/`esbuild`) menjadi output CommonJS/ESM yang ringan,
dengan `bin` field di `package.json` mengarah ke entry point terkompilasi
(`bin/qlxion-ui.js`), bukan langsung ke source TypeScript.

## Verifikasi Sebelum Publish

- Jalankan CLI hasil build secara lokal (`node bin/qlxion-ui.js init`) terhadap
  project contoh di `examples/` untuk memastikan tidak ada regresi runtime.
- Pastikan `files` field di `package.json` CLI hanya menyertakan output build,
  bukan seluruh source TypeScript, untuk menjaga ukuran package tetap kecil.

## Publish

Dilakukan otomatis oleh GitHub Action setelah PR "Version Packages" di-merge
(lihat `CHANGESETS.md`), menggunakan token npm yang disimpan sebagai repository secret
(bukan hardcoded, sesuai AGENTS.md Section 24 — Security).
