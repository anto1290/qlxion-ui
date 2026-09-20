# Architecture Decision Records (ADR)

Setiap keputusan arsitektur signifikan dicatat di sini menggunakan format ringkas.
Jangan mengubah arsitektur secara diam-diam melalui kode — lihat AGENTS.md Section 5 (Source of Truth).

## Format ADR

```text
## ADR-XXXX: <judul singkat>
Status: Proposed | Accepted | Superseded by ADR-YYYY | Rejected
Tanggal: YYYY-MM-DD
Konteks: kenapa keputusan ini perlu diambil
Keputusan: apa yang diputuskan
Konsekuensi: dampak positif dan negatif, termasuk trade-off
```

---

## ADR-0001: Model distribusi source-owned via CLI

Status: Accepted
Tanggal: 2026-01-01
Konteks: Perlu memilih antara model npm package tertutup vs source-owned seperti shadcn/ui.
Keputusan: QLXion UI menggunakan model source-owned — CLI meng-copy source file ke project pengguna.
Konsekuensi: Update komponen tidak otomatis (butuh `qlxion-ui update`), tapi kustomisasi jauh lebih fleksibel dan transparan.

---

## ADR-0002: Monorepo dengan pnpm workspaces + Turborepo

Status: Accepted
Tanggal: 2026-09-20
Konteks: Banyak package saling bergantung (tokens, core-react, core-vue, cli, registry, docs-site).
Keputusan: Gunakan pnpm workspaces untuk dependency management, Turborepo untuk task orchestration & caching.
Konsekuensi: Build lebih cepat lewat caching, tapi menambah kompleksitas konfigurasi awal.

---

## ADR-0003: Styling menggunakan Tailwind utility classes + cva helper

Status: Accepted
Tanggal: 2026-09-20
Konteks: Perlu pendekatan styling yang konsisten lintas React dan Vue, dan mudah dikustomisasi oleh pengguna.
Keputusan: Komponen ditulis dengan utility class Tailwind langsung, variant dikelola lewat helper `cva`-like (dibuat versi framework-agnostic di `packages/utils`).
Konsekuensi: Tidak ada runtime CSS-in-JS, output ringan, tapi class string bisa panjang di file komponen.

---

## ADR-0004: Registry-item versioning terpisah dari package versioning

Status: Accepted
Tanggal: 2026-09-20
Konteks: Breaking change pada satu komponen tidak boleh memaksa bump versi seluruh package `core-react`.
Keputusan: Setiap entri registry punya field `version` sendiri, independen dari versi npm package.
Konsekuensi: `diff` dan `update` di CLI bisa presisi per komponen, tapi menambah kompleksitas skema registry.

---

## ADR-0005: Registry hosting — statis vs API server

Status: Accepted
Tanggal: 2026-09-20
Konteks: Registry bisa berupa file JSON statis di-serve via CDN, atau API server dinamis.
Keputusan: Mulai dari Opsi A (JSON statis via jsDelivr/GitHub raw) — sederhana, tidak butuh infrastruktur server.
Rekomendasi: Migrasi ke Opsi B (API server) jika kebutuhan privat/analytics muncul (lihat `docs/06-registry/HOSTING.md`).
Konsekuensi: Opsi A cukup untuk publik, tapi tidak mendukung registry privat tanpa solusi tambahan.
