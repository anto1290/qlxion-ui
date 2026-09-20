# Changelog — Input

Format mengikuti Keep a Changelog. Setiap perubahan pada kontrak atau implementasi
Input dicatat di sini, terpisah dari CHANGELOG.md tingkat package.

## [Unreleased]

### Added
- Draft SPEC.md awal: variant, size, states, accessibility contract.

## [0.1.0] - 2026-09-20

### Added
- Implementasi React Input sesuai SPEC.md
- Variants: default, destructive
- Sizes: sm, default, lg
- States: default, focus, focus-within, disabled, error
- Prop `error` menampilkan pesan error dan men-set aria-invalid=true
- Prop `label` membuat <label> dengan htmlFor association
- Prop `required` menampilkan indikator * merah
- Prop `prefix`, `suffix`, `icon` untuk penempatan elemen di dalam wrapper
- Forward ref ke elemen input
- Unit test (21 tests) mencakup semua variant, size, state, dan fitur
- Accessibility test dengan axe-core — 0 violations

## [0.1.1] - 2026-09-20

### Fixed
- `size="sm"` tidak menerapkan `rounded-md` konsisten dengan `default`/`lg`
  (token `radius.md` wajib seragam untuk komponen form keluarga)
