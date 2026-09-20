# Engineering — Monorepo

## Tooling (diusulkan, lihat ADR-0002)

- **pnpm workspaces**: dependency management antar package dalam satu repo.
- **Turborepo**: task orchestration (`build`, `test`, `lint`) dengan caching agar CI cepat.

## Struktur Workspace

```yaml
# pnpm-workspace.yaml
packages:
  - "packages/*"
  - "apps/*"
```

## Task Pipeline (diusulkan di `turbo.json`)

```text
build   → tergantung build package dependency-nya dulu (topological)
test    → tergantung build
lint    → independen, bisa paralel penuh
```

## Alasan Memilih Monorepo

Semua package (tokens, core-react, core-vue, cli, registry, docs-site) saling terkait
erat dan sering berubah bersamaan (mis. token baru butuh update di React & Vue sekaligus).
Monorepo menghindari overhead publish antar-repo terpisah untuk perubahan yang saling terkait.
