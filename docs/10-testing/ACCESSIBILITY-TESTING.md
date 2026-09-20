# Testing — Accessibility

## Tooling

`axe-core` diintegrasikan dengan Testing Library untuk memeriksa pelanggaran
aksesibilitas otomatis pada setiap komponen kritis.

## Cakupan Minimum

- Tidak ada pelanggaran axe-core severity "critical"/"serious" pada kondisi default.
- Navigasi keyboard: tab order logis, elemen disabled tidak menerima fokus.
- Kontras warna sesuai token yang sudah divalidasi WCAG AA di `docs/02-design-system/COLOR-SYSTEM.md`.
- Komponen interaktif kompleks (Dialog, Combobox, Tabs) diuji manual tambahan untuk
  perilaku ARIA pattern yang sesuai (focus trap, escape to close, arrow key navigation).

## Kapan Dijalankan

Sebagai bagian dari CI gate — PR tidak bisa merge jika accessibility test gagal
untuk komponen yang terpengaruh perubahan (lihat `CI-GATES.md`).
