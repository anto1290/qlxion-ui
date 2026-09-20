# Component Spec: Button

Status: Draft
Kontrak ini framework-agnostic. Implementasi React dan Vue WAJIB memenuhi kontrak ini
sebelum dianggap selesai (AGENTS.md Section 7 — Framework Parity).

## Tujuan

Elemen interaktif untuk memicu aksi (submit form, navigasi, trigger dialog, dll).

## Props / Atribut

| Nama | Tipe | Default | Deskripsi |
|---|---|---|---|
| `variant` | `default \| destructive \| outline \| ghost \| link` | `default` | Gaya visual tombol |
| `size` | `sm \| md \| lg \| icon` | `md` | Ukuran tombol |
| `disabled` | `boolean` | `false` | Menonaktifkan interaksi |
| `loading` | `boolean` | `false` | Menampilkan indikator loading, menonaktifkan klik |
| `asChild` / `as` | opsional | - | Merender sebagai elemen lain (mis. `<a>`) sambil mempertahankan styling |

## Slot / Children

Menerima children berupa teks dan/atau ikon. Ikon di kiri/kanan teks harus punya
spacing konsisten menggunakan token `spacing.2`.

## States

- default
- hover
- focus-visible
- active
- disabled
- loading

## Accessibility Contract

- Elemen dasar harus `<button>` (native), bukan `<div>` dengan `role="button"`, kecuali
  memakai `asChild`/`as` ke elemen semantik lain (mis. `<a>` untuk navigasi).
- Wajib mendukung fokus keyboard (`Tab`) dan aktivasi via `Enter`/`Space` (native behavior).
- Saat `loading=true`, wajib punya `aria-busy="true"` dan tetap dapat diumumkan oleh screen reader.
- Saat `disabled=true`, tombol tidak boleh menerima fokus keyboard.
- Kontras warna teks-terhadap-background wajib memenuhi WCAG AA di semua varian.

## Token yang Digunakan

- `color.primary`, `color.destructive`, `color.background`, `color.foreground`
- `radius.md`
- `spacing.2`, `spacing.4`
- `motion.duration.fast` (untuk transisi hover/active)

## Non-Goals

- Button tidak menangani logic form submission kompleks — itu tanggung jawab komponen Form terpisah.
- Button tidak menyediakan tooltip built-in — kombinasikan dengan komponen Tooltip terpisah.
