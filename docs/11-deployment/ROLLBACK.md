# Rollback

## npm Package Rollback

npm tidak mendukung "unpublish lalu publish ulang versi sama" dengan aman setelah
jangka waktu tertentu. Strategi rollback yang dipakai:

1. Jika versi baru bermasalah, publish versi patch baru yang memperbaiki masalah
   (rollforward), BUKAN mencoba unpublish versi yang sudah ada.
2. Jika benar-benar kritis (mis. ada kebocoran keamanan), gunakan `npm deprecate`
   pada versi bermasalah untuk memperingatkan pengguna, sambil mempercepat rilis
   versi perbaikan.

## Docs Site Rollback

Karena di-deploy lewat Vercel, rollback dilakukan dengan promote deployment
sebelumnya yang masih tersimpan sebagai instant rollback, tanpa perlu rebuild.

## Registry Rollback

Registry mengikuti prinsip rollforward yang sama seperti npm (lihat
`REGISTRY-DEPLOYMENT.md`) — tag lama tidak diubah, CLI pengguna yang sudah
menginstal dari tag lama tetap konsisten hasilnya.

## Komunikasi Insiden

Setiap rollback/rollforward akibat masalah kritis dicatat ringkas di `CHANGELOG.md`
root dan (jika relevan) diumumkan di halaman docs site, agar pengguna yang terdampak
tahu langkah migrasi yang disarankan.
