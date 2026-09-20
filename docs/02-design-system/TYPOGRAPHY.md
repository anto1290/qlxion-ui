# Typography

## Skala Tipografi (diusulkan)

```text
text-xs    12px / 16px
text-sm    14px / 20px
text-base  16px / 24px
text-lg    18px / 28px
text-xl    20px / 28px
text-2xl   24px / 32px
text-3xl   30px / 36px
```

## Font Family

Default menggunakan font system stack, dengan kemampuan override oleh pengguna
melalui token `typography.fontFamily.sans` dan `typography.fontFamily.mono`.

## Aturan Penggunaan

- Komponen tidak boleh menetapkan ukuran font secara hardcoded di luar skala token ini.
- Heading dan body text harus menggunakan token yang sama lintas React dan Vue.
