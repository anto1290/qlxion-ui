# Next.js — Pages Router

## Perbedaan dengan App Router

Pages Router tidak mengenal pemisahan Server/Client Component seperti App Router,
sehingga direktif `'use client'` tidak relevan/diabaikan browser bundler untuk konteks ini,
namun tetap aman disertakan (no-op) untuk menjaga satu source file yang sama dipakai
di kedua mode router, guna menghindari duplikasi source per router.

## Rekomendasi

CLI tetap menyalin file komponen yang sama untuk App Router maupun Pages Router;
perbedaan hanya pada contoh penggunaan yang ditampilkan (mis. lokasi import,
penjelasan penempatan Provider jika ada) yang didokumentasikan terpisah di docs site.
