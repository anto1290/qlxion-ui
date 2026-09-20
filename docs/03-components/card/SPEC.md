# Component Spec: Card

Status: Draft
Kontrak ini framework-agnostic. Implementasi React dan Vue WAJIB memenuhi kontrak ini sebelum dianggap selesai (AGENTS.md Section 7 — Framework Parity).

## Tujuan

Container generik untuk membungkus konten, biasanya untuk menyorot grup informasi, preview, dsb. Card digunakan untuk visual grouping dan surface di layout.

## Props / Atribut

| Nama         | Tipe                         | Default   | Deskripsi                                            |
|--------------|-----------------------------|-----------|------------------------------------------------------|
| `variant`    | `default` \| `outline`      | `default` | Style visual: tanpa border, atau dengan border/shadow |
| `as`         | `div`, `section`, custom tag | `div`     | Elemen dasar (semantik, optional)                    |
| `padding`    | `sm` \| `md` \| `lg`        | `md`      | Inner spacing (padding)                              |
| `radius`     | `sm` \| `md` \| `lg`        | `md`      | Border radius override                               |

## Slot / Children

- Default slot: bebas (teks, elemen, gambar, dsb)
- Slot header, body, footer jika perlu per-template (ekstra, opsional; default hanya 1 slot utama)

## States

- default
- hover (opsional: shadow/raise)
- focus-visible (jika perlu interaktif/focusable)

## Accessibility Contract

- Elemen dasar sebaiknya tetap `<div>` (atau sesuai as-prop)
- Tidak boleh jadi interaktif kecuali ada prop misal `onClick`/`tabIndex` (by consumer)
- Harus tetap bisa dipakai untuk grouping semantik via aria-label/role jika diperlukan
- Kontras warna/separator sesuaikan COLOR-SYSTEM.md (kontras cukup)

## Token yang Digunakan

- `color.background`, `color.foreground`, `color.border`, `shadow.sm/md`
- `radius.md` (default, overridable via prop)
- `spacing.4` (md padding default), `spacing.2` (sm), `spacing.6` (lg)

## Non-Goals

- Tidak ada logic collapsing, tabs, expandable (split ke komponen terpisah)
- Tidak menangani selectable/drag-n-drop secara built-in