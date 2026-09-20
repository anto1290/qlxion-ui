# Publish Checklist

Checklist wajib sebelum menyelesaikan siklus release (melengkapi AGENTS.md Section 30):

```text
[ ] Semua changeset yang relevan sudah ditulis dan masuk ke "Version Packages" PR
[ ] CHANGELOG.md ter-update otomatis untuk setiap package yang bump
[ ] Versi registry-item di-bump untuk setiap komponen yang source-nya berubah
[ ] CI gate hijau: build, unit test, a11y test, visual regression, parity check
[ ] Docs site preview deployment sudah direview untuk perubahan yang relevan
[ ] Tidak ada breaking change tanpa entri eksplisit di VERSIONING-POLICY.md/CHANGELOG.md
[ ] Tag git dibuat sesuai versi package utama yang dirilis
[ ] Release notes ter-generate dari changeset dan direview sebelum dipublikasikan
[ ] npm publish sukses untuk semua package yang bump (cli, core-react, core-vue, utils)
[ ] Registry build ter-deploy ke CDN dan bisa diakses CLI versi terbaru
[ ] Docs site production ter-deploy dan mencerminkan versi terbaru
```
