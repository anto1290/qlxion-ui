# Registry Deployment

## Proses Build

`packages/registry/build/` dihasilkan dari validasi + kompilasi seluruh file JSON
di `packages/registry/components/` terhadap `registry-item.schema.json`.

## Proses Deploy (Fase Awal — Statis via CDN)

1. Build registry sebagai bagian dari pipeline release.
2. Hasil build ikut ter-tag pada git release yang sama dengan versi package.
3. CLI mengambil registry dari URL CDN yang mengarah ke tag/release tersebut
   (mis. lewat jsDelivr yang membaca langsung dari GitHub release/tag).

## Rollforward, Bukan Rollback Langsung untuk Registry

Karena registry statis diacu berdasarkan tag, kesalahan pada satu rilis registry
diperbaiki dengan merilis versi baru (rollforward) daripada menimpa tag yang sudah
ada — tag yang sudah dipublish dianggap immutable untuk menjaga reproducibility
instalasi pengguna yang sudah terjadi sebelumnya.

## Migrasi ke API Server (Fase Lanjut)

Jika nanti pindah ke Opsi B (API server, lihat `docs/06-registry/HOSTING.md`),
proses deploy registry akan mengikuti pipeline deployment aplikasi backend
terpisah, didokumentasikan ulang saat ADR terkait dibuat.
