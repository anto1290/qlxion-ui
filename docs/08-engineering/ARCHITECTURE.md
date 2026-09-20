# Engineering — Architecture

## Diagram Relasi Package

```text
             Design System (packages/tokens)
                   │
                   ▼
              Components
          ┌────────┴────────┐
          ▼                 ▼
    core-react          core-vue
          │                 │
    adapters-next     adapters-nuxt
          │                 │
          └────────┬────────┘
                    ▼
                Registry
                    │
                    ▼
                   CLI
                    │
                    ▼
              User Project
                    │
                    ▼
             Documentation (docs-site)
                    │
                    ▼
               Playground
```

## Prinsip Arsitektur

- `core-react` dan `core-vue` tidak saling bergantung satu sama lain secara langsung —
  keduanya sama-sama bergantung pada `packages/tokens` sebagai sumber kebenaran visual.
- `adapters-next`/`adapters-nuxt` hanya boleh bergantung pada `core-react`/`core-vue`
  masing-masing, tidak sebaliknya.
- `registry` tidak boleh bergantung pada implementasi komponen secara runtime —
  ia hanya metadata yang *mendeskripsikan* file, bukan meng-import kode komponen.
- `cli` bergantung pada `registry` (untuk resolusi metadata), tidak pada `core-react`/`core-vue`
  secara langsung (CLI hanya menyalin file, tidak menjalankan/meng-import komponen).
