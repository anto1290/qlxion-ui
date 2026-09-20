# Component Spec: Input

Status: Draft
Kontrak ini framework-agnostic. Implementasi React dan Vue WAJIB memenuhi kontrak ini
sebelum dianggap selesai (AGENTS.md Section 7 — Framework Parity).

## Tujuan

Input teks standar untuk menerima input dari pengguna. Mendukung berbagai jenis input,
validasi visual, dan state management dasar.

## Props / Atribut

| Nama | Tipe | Default | Deskripsi |
|---|---|---|---|
| `type` | `text` | `text` | Jenis input HTML |
| `disabled` | `boolean` | `false` | Menonaktifkan input |
| `placeholder` | `string` | `""` | Teks placeholder |
| `value` | `string` | `""` | Nilai controlled |
| `onChange` | `(e: ChangeEvent) => void` | - | Handler perubahan nilai |
| `error` | `string` | - | Pesan error validasi |
| `required` | `boolean` | `false` | Menandai field wajib |
| `label` | `string` | - | Label teks (opsional) |
| `id` | `string` | - | ID elemen (untuk label association) |
| `name` | `string` | - | Nama field (untuk form submission) |
| `asChild` | `boolean` | `false` | Merender sebagai elemen lain |
| `prefix` | `ReactNode` | - | Konten prefix di dalam input |
| `suffix` | `ReactNode` | - | Konten suffix di dalam input |
| `icon` | `ReactNode` | - | Ikon dekoratif sebelum input |

## Slot / Children

- **prefix**: Konten yang muncul sebelum area input
- **suffix**: Konten yang muncul setelah area input  
- **children**: Tidak digunakan secara langsung — props lain mengontrol perilaku

## States

- default
- hover
- focus
- focus-within (ketika prefix/suffix fokus)
- disabled
- error
- loading (opsional, untuk input dengan spinner)

## Accessibility Contract

- Label dan input harus terhubung via `htmlFor`/`id`
- Pesan error harus dihubungkan via `aria-describedby`
- Input wajib memiliki `aria-invalid="true"` saat state error
- Input disabled tidak boleh menerima fokus keyboard
- Placeholder tidak menggantikan label (placeholder bersifat temporal, label permanen)
- Kontras warna teks-terhadap-background wajib memenuhi WCAG AA

## Token yang Digunakan

- `color.input`, `color.border`, `color.destructive`, `color.background`, `color.foreground`
- `radius.sm` (untuk border-radius)
- `spacing.2`, `spacing.3`, `spacing.4` (untuk padding)
- `typography.body-sm` atau `typography.body` (untuk font size)
- `motion.duration.fast` (untuk transisi focus)

## Non-Goals

- Validasi kompleks (regex patterns, custom validators) — tanggung jawab konsumen
- Inline validation real-time — hanya visual feedback berdasarkan prop `error`
- File input — gunakan komponen terpisah jika diperlukan
- Auto-complete/logic bisnis — tanggung jawab konsumen component