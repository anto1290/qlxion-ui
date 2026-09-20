# Registry — Versioning

## Registry-Item Version vs Package Version

Setiap entri registry (`button.json`, dst.) punya field `version` sendiri, independen
dari versi npm package `core-react`/`core-vue`/`cli` (lihat ADR-0004 di `DECISIONS.md`).

## Semver per Komponen

- **Patch**: perbaikan bug visual/perilaku kecil, tidak mengubah props/API.
- **Minor**: penambahan varian/prop baru yang backward-compatible.
- **Major**: perubahan yang mematahkan penggunaan sebelumnya (rename prop, hapus varian).

## Pencatatan Versi Lokal

Saat `add` dijalankan, CLI mencatat versi registry-item yang terpasang (mis. di dalam
`qlxion.config.json` atau file manifest terpisah `qlxion.lock.json`) agar `diff`/`update`
bisa membandingkan versi lokal vs versi registry terbaru secara akurat.
