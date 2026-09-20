# Glossary

- **Registry Item**: satu entri metadata komponen di dalam registry (nama, files, dependencies, versi).
- **Primitive**: komponen dasar tanpa styling opini kuat, jadi fondasi komponen lain (mis. dialog primitive sebelum jadi Modal).
- **Adapter**: lapisan tipis framework-specific di atas core component (mis. `adapters-next`, `adapters-nuxt`).
- **Core Component**: implementasi komponen aktual per framework (`core-react`, `core-vue`), sumber kebenaran perilaku & markup.
- **Design Token**: nilai desain atomik (warna, spacing, radius, dll) yang didefinisikan sekali dan dikonsumsi di semua framework.
- **Component Contract**: spesifikasi framework-agnostic yang mendefinisikan props, states, dan perilaku a11y suatu komponen (lihat `docs/03-components/*/SPEC.md`).
- **Source-Owned Component**: komponen yang source code-nya berada di project pengguna setelah `qlxion-ui add`, bukan di `node_modules`.
- **Framework Parity**: kondisi ketika implementasi React dan Vue dari komponen yang sama memiliki kontrak dan perilaku setara (AGENTS.md Section 7).
- **Registry Dependency**: dependency antar komponen di registry (mis. komponen `Combobox` bergantung pada `Popover`).
- **Changeset**: unit deskripsi perubahan yang dipakai tool Changesets untuk generate CHANGELOG dan bump versi otomatis.
- **Release Channel**: jalur distribusi versi npm (`stable`/`latest`, `next`, `canary`).
