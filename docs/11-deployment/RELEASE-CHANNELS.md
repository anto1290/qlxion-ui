# Release Channels

| Channel | Tag npm | Sumber | Tujuan |
|---|---|---|---|
| stable | `latest` | branch `main` | pengguna produksi |
| next | `next` | branch `next`/release candidate | preview breaking changes sebelum stable |
| canary | `canary` | tiap commit ke `main` (opsional, fase lanjut) | early adopter/testing internal |

## Kebijakan Promosi Antar Channel

`next` dipromosikan ke `stable` setelah periode uji tertentu (mis. minimal satu minggu
tanpa laporan regresi kritis) dan setelah checklist rilis di `PUBLISH-CHECKLIST.md` terpenuhi.

## Instalasi per Channel

```bash
npx qlxion-ui@latest add button
npx qlxion-ui@next add button
npx qlxion-ui@canary add button
```
