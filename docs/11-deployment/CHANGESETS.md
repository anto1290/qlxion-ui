# Changesets Workflow

## Alasan Memilih Changesets

Cocok untuk monorepo dengan banyak package yang punya siklus versi independen
(dibanding semantic-release yang lebih untuk single-package/lockstep versioning).

## Alur Kontributor

```bash
pnpm changeset
```

1. Pilih package mana yang berubah (mis. `core-react`, `cli`).
2. Pilih tipe bump (patch/minor/major) untuk masing-masing.
3. Tulis ringkasan perubahan dalam bahasa yang jelas — ini akan masuk ke CHANGELOG.md otomatis.
4. File changeset (`.changeset/xxxx.md`) ikut ter-commit dalam PR yang sama.

## Alur Otomasi (GitHub Actions)

1. Saat PR merge ke `main`, action `changesets/action` mendeteksi file changeset baru.
2. Action membuka/memperbarui PR khusus "Version Packages" yang berisi bump versi
   dan update `CHANGELOG.md` teragregasi dari semua changeset yang menunggu.
3. Saat PR "Version Packages" di-merge oleh maintainer, action menjalankan `pnpm publish -r`
   untuk semua package yang bump versi.

## Kewajiban PR

Setiap PR yang mengubah isi package yang dipublish WAJIB menyertakan changeset,
diverifikasi via CI check khusus (`changeset-check`) yang gagal jika tidak ada
file changeset baru pada PR yang menyentuh `packages/*`.
