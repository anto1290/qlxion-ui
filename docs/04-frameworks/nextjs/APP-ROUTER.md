# Next.js — App Router

## Implikasi Server Component

Secara default, file di dalam `app/` adalah Server Component. Komponen QLXion UI yang
memiliki interaktivitas (event handler, state) harus diberi direktif `'use client'`.

## Strategi

- Komponen interaktif (Button, Dialog, Select, Tabs, dll) diekspor dengan `'use client'`
  sudah disertakan di file yang di-copy oleh CLI untuk target Next.js App Router.
- Komponen non-interaktif murni (mis. Card sebagai container visual saja) tidak perlu
  `'use client'`, kecuali punya sub-bagian interaktif.

## Tanggung Jawab Registry

Metadata registry untuk App Router menandai file mana yang butuh `'use client'`
ditambahkan otomatis saat proses `add`, supaya tidak perlu campur tangan manual dari pengguna.
