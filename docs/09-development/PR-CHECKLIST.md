# PR Checklist

Sebelum membuka Pull Request, pastikan:

```text
[ ] Perubahan mengikuti spesifikasi terkait di docs/ (bukan menyimpang tanpa ADR)
[ ] Framework parity dipertimbangkan (React & Vue diubah bersamaan jika kontrak berubah)
[ ] Test unit ditambahkan/diperbarui
[ ] Test aksesibilitas lulus untuk komponen yang terpengaruh
[ ] Dokumentasi terkait diperbarui (SPEC.md/EXAMPLES.md/CHANGELOG.md komponen)
[ ] Changeset ditambahkan jika ada perubahan pada package yang dipublish
[ ] Tidak ada perubahan tidak terkait yang ikut terbawa (AGENTS.md Section 25)
[ ] Tidak ada secret/API key yang ter-commit
```

## Review Framework Parity

Reviewer wajib memeriksa: jika PR mengubah kontrak komponen (props/behavior) di satu
framework, apakah framework lain (React ⇄ Vue) ikut diperbarui, atau setidaknya
dicatat sebagai technical debt eksplisit dengan issue tracking terpisah.
