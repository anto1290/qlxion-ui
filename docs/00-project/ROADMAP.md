# Roadmap

Roadmap bertahap. Setiap fase harus selesai (Definition of Done — AGENTS.md Section 30)
sebelum lanjut ke fase berikutnya, kecuali ada keputusan eksplisit untuk paralelisasi.

| Fase | Fokus | Output Utama |
|---|---|---|
| 0 | Fondasi | Tokens, `DECISIONS.md`, struktur folder final, `SPEC.md` template |
| 1 | Komponen inti React | `core-react` jalan standalone (Button, Input, Card, Dialog, Select, Tooltip, Tabs, Checkbox) |
| 2 | Registry + CLI dasar | `init`, `add` bekerja untuk project Next.js |
| 3 | Port ke Vue | `core-vue` dengan parity penuh vs React |
| 4 | CLI multi-framework + Nuxt | `add` mendeteksi framework otomatis, dukungan Nuxt module |
| 5 | Docs site + Playground | Dokumentasi interaktif live, preview React & Vue |
| 6 | Testing menyeluruh | Unit, a11y, visual regression cross-framework, CI gate |
| 7 | Versioning & Release | `VERSIONING-POLICY.md`, `RELEASE.md` diimplementasikan nyata, rilis publik pertama |

## Prinsip Urutan

Mulai dari satu framework (React) sampai kontrak komponennya matang, baru port ke Vue.
Ini menghindari premature abstraction (AGENTS.md Section 28) — jangan membuat lapisan
abstraksi lintas-framework sebelum tahu betul apa yang benar-benar perlu digeneralisasi.

## Milestone Rilis Publik

Rilis publik pertama (`v1.0.0` untuk `cli` dan `core-react`) hanya dilakukan setelah:

- Fase 0–2 selesai penuh;
- minimal 8 komponen inti stabil di React;
- dokumentasi komponen (`docs/03-components/*/SPEC.md`) lengkap untuk semua komponen yang dirilis;
- CI gate (unit + a11y) hijau.

Vue/Nuxt boleh dirilis sebagai `v0.x` (experimental) sebelum mencapai parity penuh,
selama ditandai jelas sebagai pre-1.0 di README dan docs site.
