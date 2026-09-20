# Engineering — Deprecation Policy

## Prinsip

Karena model source-owned, komponen yang sudah di-copy ke project pengguna tidak
bisa "ditarik kembali" — deprecation berarti menandai bahwa registry tidak lagi
merekomendasikan komponen tersebut untuk instalasi baru, bukan menghapusnya dari
project yang sudah memakainya.

## Proses Deprecation Komponen

1. Tandai `deprecated: true` dan `deprecatedReason` di metadata registry item.
2. Tampilkan peringatan di CLI saat `add`/`info` dijalankan untuk komponen tersebut.
3. Tampilkan badge "Deprecated" di halaman dokumentasi komponen.
4. Sediakan `migrateTo` (nama komponen pengganti) jika ada, di metadata registry.
5. Komponen deprecated tetap ada di registry minimal satu major version sebelum
   dipertimbangkan untuk dihapus total dari registry (bukan dari project pengguna).

## Proses Deprecation CLI Command

Command CLI yang di-deprecate harus tetap berfungsi dengan warning minimal satu
minor version sebelum benar-benar dihapus, mengikuti semver pada package `cli`.
