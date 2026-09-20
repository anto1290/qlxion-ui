# Motion

## Durasi

```text
motion.duration.fast    100ms
motion.duration.normal  200ms
motion.duration.slow    300ms
```

## Easing

```text
motion.easing.standard    cubic-bezier(0.4, 0, 0.2, 1)
motion.easing.decelerate  cubic-bezier(0, 0, 0.2, 1)
motion.easing.accelerate  cubic-bezier(0.4, 0, 1, 1)
```

## Reduced Motion

Semua animasi/transisi berbasis token motion wajib menghormati
`prefers-reduced-motion: reduce` (AGENTS.md Section 15) — implementasi harus menyediakan
fallback tanpa animasi atau animasi minimal, bukan mengabaikan preferensi ini.

## Konsistensi Lintas Framework

Durasi dan easing transisi (mis. buka/tutup Dialog, fade Tooltip) harus terasa identik
di React dan Vue — dites secara visual melalui playground/theme switcher.
