# Engineering — Release

Lihat detail lengkap alur release, versioning, dan channel di `docs/11-deployment/`.
Dokumen ini hanya merangkum keterkaitan release dengan arsitektur engineering.

## Ringkasan Alur

```text
Changeset ditulis → CI hijau → merge ke main →
"Version Packages" PR otomatis (changesets) → merge →
publish npm + deploy registry + deploy docs-site
```

## Ketergantungan Teknis

Proses release bergantung pada:

- Turborepo untuk build package dalam urutan dependency yang benar sebelum publish.
- Changesets untuk generate CHANGELOG dan bump versi otomatis per package.
- GitHub Actions untuk otomasi CI/CD (lihat `.github/workflows/release.yml`).

Detail lengkap: `docs/11-deployment/RELEASE-CHANNELS.md`, `CHANGESETS.md`, `PUBLISH-CHECKLIST.md`.
