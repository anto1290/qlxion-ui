# Design Tokens

## Kategori Token

Sesuai AGENTS.md Section 9, kategori token yang wajib ada:

- Color
- Typography
- Spacing
- Radius
- Shadow
- Motion
- Breakpoints
- Z-index

## Sumber Kebenaran

Token didefinisikan sekali di `packages/tokens/src/*.json`, lalu ditransformasikan
(mis. via Style Dictionary) ke:

- Tailwind config (React/Next & Vue/Nuxt memakai config yang identik secara nilai);
- CSS variables untuk theming runtime (light/dark, custom brand theme).

## Naming Convention (diusulkan)

```text
color.primary.{50-900}
color.destructive.{50-900}
color.background
color.foreground
color.border
color.ring

spacing.{0,1,2,3,4,6,8,12,16,24}
radius.{none,sm,md,lg,full}
shadow.{sm,md,lg,xl}
motion.duration.{fast,normal,slow}
motion.easing.{standard,decelerate,accelerate}
zIndex.{dropdown,modal,toast,tooltip}
```

## Aturan

- Tidak boleh ada nilai visual hardcoded di level komponen jika token yang sesuai sudah ada
  (AGENTS.md Section 9).
- Token baru harus melalui proses: dokumentasikan alasan → tambahkan ke design system →
  update dokumentasi → baru dipakai di komponen.
- Token harus punya representasi yang identik lintas React dan Vue — tidak boleh ada
  token yang hanya ada di satu framework.
