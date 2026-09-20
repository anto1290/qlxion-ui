# Registry — Schema

## Skema Registry Item (diusulkan)

```json
{
  "name": "button",
  "description": "Elemen interaktif untuk memicu aksi",
  "category": "form",
  "frameworks": ["react", "vue"],
  "version": "1.2.0",
  "files": {
    "react": ["button.tsx"],
    "react-next": ["button.tsx"],
    "vue": ["Button.vue"]
  },
  "dependencies": [],
  "registryDependencies": [],
  "tailwind": {
    "cssVars": ["--qlx-color-primary", "--qlx-radius-md"]
  },
  "docs": "docs/03-components/button",
  "compatibility": {
    "tailwind": ">=3.0.0",
    "react": ">=18.0.0",
    "vue": ">=3.0.0"
  }
}
```

## Field Wajib

`name`, `category`, `frameworks`, `version`, `files`, `docs`.

## Validasi

Setiap file registry (`packages/registry/components/*.json`) divalidasi terhadap
`registry-item.schema.json` (JSON Schema) sebagai bagian dari CI, sebelum registry
di-build dan dipublish.

## Larangan

Registry TIDAK boleh berisi logic eksekusi (script) — murni data deklaratif, agar
aman diproses CLI tanpa risiko keamanan.
