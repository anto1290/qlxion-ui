# Documentation Site — MDX Conventions

## Lokasi Konten

`apps/docs-site/content/components/<nama>.mdx`

## Komponen Custom MDX (diusulkan)

- `<ComponentPreview name="button" variant="destructive" />` — merender live preview
  dari implementasi asli (`core-react`/`core-vue`), bukan gambar statis.
- `<CodeBlock framework="react|vue" />` — menampilkan source code sesuai framework
  yang dipilih pengguna di toggle switcher global halaman.
- `<PropsTable component="button" />` — digenerate otomatis dari SPEC.md/type definition,
  bukan ditulis manual, untuk menghindari dokumentasi API yang basi.

## Aturan

Contoh kode di MDX tidak boleh menyimpang dari kontrak di `SPEC.md`. Jika ada perbedaan,
`SPEC.md` yang harus diperbarui dulu, baru MDX menyesuaikan (Source of Truth hierarchy,
AGENTS.md Section 5).
