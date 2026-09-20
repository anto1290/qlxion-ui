# Overview — QLXion UI

## Apa Itu QLXion UI

QLXion UI adalah design system + component distribution system berbasis Tailwind CSS,
mendukung empat target framework sekaligus: React, Next.js, Vue, dan Nuxt.js.

Model distribusi mengikuti pendekatan *source-owned* (terinspirasi shadcn/ui):
komponen tidak diimpor sebagai dependency tertutup dari `node_modules`, melainkan
di-*copy* langsung ke dalam project pengguna melalui CLI (`npx qlxion-ui add <component>`).

## Kenapa Bukan Library Biasa

Pendekatan library tertutup (black-box) punya kelemahan:

- sulit dikustomisasi tanpa override CSS yang rapuh;
- versi komponen terkunci ke versi package;
- styling internal tidak transparan bagi konsumen.

QLXion UI menyelesaikan ini dengan menaruh source code komponen langsung di project
pengguna, sehingga pengguna punya kontrol penuh, sambil tetap mendapat manfaat dari
registry terpusat untuk update dan penemuan komponen baru.

## Perbedaan dengan shadcn/ui

| Aspek | shadcn/ui | QLXion UI |
|---|---|---|
| Framework | React (Next.js) | React, Next.js, Vue, Nuxt.js |
| Styling | Tailwind + Radix | Tailwind + design token internal |
| Registry | JSON registry | JSON registry + versi per-komponen lintas framework |
| Parity lintas-framework | Tidak relevan (single framework) | Wajib dijaga (Section 7 AGENTS.md) |

## Prinsip Non-Negosiasi

Diturunkan langsung dari AGENTS.md:

- Tailwind-based
- Multi-framework dengan parity kontrak komponen
- Source-owned (bukan black-box)
- Registry-driven, bukan hardcoded di CLI
- Documentation-first
- Design-token-driven
- Accessible by default
- Composable, bukan monolitik

## Audiens Dokumen Ini

Dokumen di `docs/00-project/` sampai `docs/11-deployment/` ditujukan untuk:

- kontributor manusia;
- AI coding agent yang bekerja pada repository ini (lihat AGENTS.md Section 26 — AI Agent Workflow).

Dokumen ini adalah lapisan spesifikasi, bukan implementasi. Jika implementasi
menyimpang dari dokumen ini tanpa keputusan eksplisit di `DECISIONS.md`, itu dianggap bug proses.
