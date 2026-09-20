# Getting Started — Kontributor

## Setup Lokal

```bash
git clone <repo-url>
cd qlxion-ui
pnpm install
pnpm build
pnpm dev # menjalankan docs-site + playground secara lokal
```

## Menjalankan Test

```bash
pnpm test           # unit test seluruh package
pnpm test:a11y      # accessibility test
pnpm test:visual    # visual regression (butuh baseline snapshot)
```

## Struktur yang Perlu Dipahami Sebelum Kontribusi

Baca urutan berikut sebelum membuat perubahan (mengikuti AGENTS.md Section 26):

1. `AGENTS.md`
2. `docs/00-project/OVERVIEW.md` dan `DECISIONS.md`
3. Spesifikasi area yang relevan (`docs/03` s.d. `docs/06`)
4. Kode implementasi terkait
