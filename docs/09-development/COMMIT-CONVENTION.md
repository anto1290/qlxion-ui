# Commit Convention

## Format (Conventional Commits)

```text
<type>(<scope>): <deskripsi singkat>

[body opsional]
```

## Type yang Dipakai

```text
feat     fitur baru
fix      perbaikan bug
docs     perubahan dokumentasi saja
refactor perubahan kode tanpa mengubah perilaku
test     penambahan/perbaikan test
chore    perubahan tooling/konfigurasi
```

## Contoh

```text
feat(core-react): tambah varian loading pada Button
docs(components/button): update SPEC.md dengan state loading
fix(cli): perbaiki deteksi framework Nuxt saat nuxt.config.js
```

## Kaitan dengan Changesets

Commit message TIDAK menggantikan changeset — setiap perubahan yang mempengaruhi
package yang dipublish tetap wajib disertai file changeset (lihat
`docs/11-deployment/CHANGESETS.md`), terlepas dari commit message-nya.
