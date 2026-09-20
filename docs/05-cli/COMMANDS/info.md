# Command: info

```bash
npx qlxion-ui info <component>
```

## Perilaku

Menampilkan detail metadata registry satu komponen: deskripsi, framework yang didukung,
dependency, registry dependency, versi terkini, link dokumentasi.

## Contoh Output (ilustratif)

```text
Button
Kategori: form
Framework: react, vue
Versi registry: 1.2.0
Dependency npm: (tidak ada)
Registry dependency: (tidak ada)
Dokumentasi: docs/03-components/button/SPEC.md
```

## Flag

| Flag | Deskripsi |
|---|---|
| `--json` | Output JSON |
