# CLI — Overview

## Nama Package

`qlxion-ui`, dijalankan tanpa instalasi global via `npx qlxion-ui <command>`
(AGENTS.md Section 12).

## Prinsip

- CLI tidak menyimpan metadata komponen sendiri — semua ditarik dari registry
  (AGENTS.md Section 11).
- Output CLI harus jelas, deterministik, actionable, aman, dan script-friendly.
- Operasi destruktif (overwrite file, remove komponen) butuh konfirmasi kecuali
  dijalankan dengan flag `--yes`/`--force`.

## Daftar Command

```text
init      inisialisasi konfigurasi project
add       menambahkan komponen dari registry
remove    menghapus komponen yang sudah terpasang
update    memperbarui komponen ke versi registry terbaru
list      menampilkan daftar komponen yang tersedia
search    mencari komponen berdasarkan kata kunci
info      menampilkan detail metadata satu komponen
diff      menampilkan perbedaan file lokal vs versi registry
```

## Alur Umum

```text
qlxion-ui init   →  qlxion.config.json dibuat
qlxion-ui add X  →  file komponen X disalin ke project
qlxion-ui diff X →  bandingkan file lokal vs registry (jika sudah dikustomisasi)
qlxion-ui update X → perbarui, dengan konfirmasi jika ada konflik
```
