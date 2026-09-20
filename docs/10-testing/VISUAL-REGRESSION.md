# Testing — Visual Regression

## Tujuan

Mendeteksi perubahan visual tak disengaja pada komponen, termasuk perbedaan yang
muncul antara implementasi React dan Vue untuk komponen yang sama (cross-framework drift).

## Pendekatan (diusulkan)

- Screenshot testing berbasis Playwright, dijalankan terhadap playground/docs-site
  untuk setiap varian × size × state komponen.
- Baseline snapshot disimpan dan direview manual saat ada perubahan visual yang disengaja.

## Threshold

Perbedaan piksel di atas ambang batas tertentu (mis. >0.1% area) menggagalkan test
dan butuh approval eksplisit untuk update baseline — mencegah perubahan visual
"menyelinap" tanpa disadari reviewer.

## Cross-Framework Diff

Selain baseline historis, dilakukan juga snapshot side-by-side React vs Vue untuk
komponen yang sama dengan props identik, untuk memverifikasi framework parity secara visual.
