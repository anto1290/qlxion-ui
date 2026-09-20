# Button — Examples

## Basic

```text
Default button, digunakan untuk aksi primer di form atau halaman.
```

## Variants

```text
default | destructive | outline | ghost | link
```

Setiap varian dipakai sesuai konteks:

- `default`: aksi primer/utama pada halaman (submit, simpan).
- `destructive`: aksi yang menghapus/tidak bisa dibatalkan.
- `outline`: aksi sekunder.
- `ghost`: aksi tersier, minim visual weight (mis. di dalam toolbar).
- `link`: aksi yang secara visual seperti tautan teks.

## With Icon

```text
Button dengan ikon di kiri teks, spacing menggunakan token spacing.2.
```

## Loading State

```text
Button dengan loading=true menampilkan spinner menggantikan/mendampingi teks,
dan tidak bisa diklik ulang (mencegah double submit).
```

## Icon-Only

```text
size="icon" digunakan untuk tombol berisi ikon saja — wajib disertai aria-label
karena tidak ada teks visible untuk screen reader.
```
