# Command: update

```bash
npx qlxion-ui update <component>
```

## Perilaku

1. Bandingkan versi registry-item lokal (dicatat CLI, mis. di metadata comment/manifest)
   dengan versi terbaru di registry.
2. Jika file lokal tidak dimodifikasi sejak instalasi terakhir → update langsung.
3. Jika file lokal sudah dimodifikasi pengguna → tampilkan diff tiga arah
   (versi awal terpasang, versi lokal saat ini, versi registry terbaru) dan minta
   keputusan eksplisit (accept/skip/manual merge).

## Ketergantungan pada ADR-0004

Command ini bergantung pada keputusan registry-item versioning terpisah dari
package versioning (lihat `docs/00-project/DECISIONS.md`).

## Flag

| Flag | Deskripsi |
|---|---|
| `--all` | Update semua komponen terpasang |
| `--dry-run` | Tampilkan apa yang akan berubah tanpa menulis file |
