# Consistency Review — Phase 1 (React Core)

Tanggal: 2026-09-20
Status: **Review Awal** - ditemukan 1 defect, 4 item open, 1 dokumentasi perlu diperbaiki

---

## Ringkasan Fase 1

Fase 1 menuntut 8 komponen inti di `core-react`:

```
Button  ✓  terimplementasi + teruji
Input   ✓  terimplementasi + teruji
Card    ✓  terimplementasi + teruji
Dialog  ✗  belum dimulai
Select  ✗  belum dimulai
Tooltip ✗  belum dimulai
Tabs    ✗  belum dimulai
Checkbox✗  belum dimulai
```

---

## 1. Desain Token Konsistensi

### Radius

| Komponen | default | sm | lg |
|---|---|---|---|
| Button | `rounded-md` | `rounded-md` | `rounded-md` |
| Input | `rounded-md` | ~~`undefined`~~ → `rounded-md` (setelah fix) | `rounded-md` |

**Defect ditemukan:** `Input size="sm"` tidak memakai `rounded-md`, melanggar SPACING-RADIUS.md
"Aturan Konsistensi: komponen sejenis (misalnya semua elemen form: Input, Select, Textarea)
harus memakai token radius yang sama agar terlihat sebagai satu keluarga visual."

**Status:** Sudah diperbaiki di commit ini — semua ukuran Input sekarang `rounded-md`.

### Color Token

Kedua komponen menggunakan semantic color token yang konsisten:

| Token | Button | Input |
|---|---|---|
| `color.primary` | ✓ (variant default/link) | — |
| `color.destructive` | ✓ (variant destructive) | ✓ (variant destructive + error) |
| `color.background` | ✓ (outline, ghost) | ✓ (field background) |
| `color.foreground` | ✓ (text) | ✓ (text) |
| `color.ring` | ✓ (focus-visible) | ✓ (focus-visible) |
| `color.muted-foreground` | — | ✓ (placeholder, icon, prefix, suffix) |

**Tidak ditemukan pelanggaran.** Semua nilai warna berasal dari token Tailwind semantic.

### Spacing & Typography

- Button: `text-sm`, `h-8/9/10`, `px-3/4/8` — semua Tailwind scale.
- Input: `text-sm`, `h-8/9/10`, `px-2/3/4` — semua Tailwind scale.
- Tidak ada hardcoded pixel/em di luar skala token.

### Motion

Kedua komponen menggunakan `transition-colors` (Tailwind default ~150ms) tanpa durasi custom.
**Sesuai** karena transisi warna adalah micro-interaction cepat; motion duration token
(`motion.duration.fast = 100ms`) lebih relevan untuk animasi structural (buka/tutup dialog).

**Status:** ✅ Konsisten.

---

## 2. Naming Convention (AGENTS.md Section 20)

### Export names

```
Button    → export { Button, buttonVariants }
Input     → export { Input, inputVariants }
index.ts  → export * from "./button/button"; export * from "./input/input";
```

Pola: `{ComponentName}` PascalCase untuk export utama, `{componentName}Variants` untuk cva export.
**Konsisten.**

### Props names

| Prop | Button | Input | Catatan |
|---|---|---|---|
| `variant` | ✓ | ✓ | Sama |
| `size` | ✓ | ✓ | Sama |
| `disabled` | ✓ | ✓ | Sama |
| `asChild` | ✓ | ✓ | Sama |
| `error` | — | ✓ | Input-only (natural) |
| `label` | — | ✓ | Input-only (natural) |
| `prefix`/`suffix`/`icon` | — | ✓ | Input-only (natural) |

Props yang shared (`variant`, `size`, `disabled`, `asChild`) memiliki nama identik.
Props spesifik per komponen wajar berbeda (form vs non-form).

**Status:** ✅ Konsisten.

### Type names

```ts
export type ButtonVariant = ...
export type ButtonSize = ...
export interface ButtonProps extends ...

export type InputVariant = ...
export type InputSize = ...
export interface InputProps extends ...
```

Pola `{ComponentName}{PropName}` konsisten.

**Status:** ✅ Konsisten.