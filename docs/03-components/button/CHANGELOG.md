# Changelog — Button

Format mengikuti Keep a Changelog. Setiap perubahan pada kontrak atau implementasi
Button dicatat di sini, terpisah dari CHANGELOG.md tingkat package.

## [Unreleased]

### Added
- Draft SPEC.md awal: variant, size, states, accessibility contract.

## [0.1.0] - 2026-09-20

### Added
- Implementasi React Button sesuai SPEC.md
- Variants: default, destructive, outline, ghost, link
- Sizes: sm, md (default), lg, icon
- States: hover, focus-visible, active, disabled, loading
- Prop sChild menggunakan Radix Slot
- Prop loading dengan aria-busy dan disabled state
- Forward ref ke elemen button
- Unit test (21 tests) mencakup semua variant, size, dan state
- Accessibility test dengan axe-core — 0 violations
