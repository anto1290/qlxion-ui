# Theming

## Pendekatan

Menggunakan CSS variables sebagai layer runtime theming, dikombinasikan dengan Tailwind
utility classes yang mereferensikan variable tersebut (bukan hardcoded hex).

```css
:root {
  --qlx-color-primary: 222 89% 55%;
  --qlx-radius-md: 0.5rem;
}
[data-theme="dark"] {
  --qlx-color-primary: 222 80% 65%;
}
```

## Dark Mode

Didukung melalui atribut `data-theme` atau class `.dark` di elemen root (dikonfirmasi
saat implementasi Tailwind config — lihat `docs/04-frameworks/*/SETUP.md`).

## Custom Theme oleh Pengguna

Karena model source-owned, pengguna bebas mengubah nilai CSS variable di project mereka
tanpa perlu fork package. Ini adalah salah satu keunggulan utama dibanding library tertutup.

## Framework Switching di Playground

Playground harus bisa menampilkan tema yang sama diterapkan ke implementasi React dan Vue
secara berdampingan, untuk memverifikasi konsistensi visual (lihat `docs/07-documentation/PLAYGROUND-SPEC.md`).
