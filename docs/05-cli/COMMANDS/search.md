# Command: search

```bash
npx qlxion-ui search <query>
```

## Perilaku

Mencari komponen di registry berdasarkan nama, deskripsi, atau kategori.
Mendukung fuzzy match untuk menoleransi salah ketik ringan.

## Contoh

```bash
npx qlxion-ui search dropdown
# → menampilkan Select, Dropdown Menu, Combobox (jika relevan secara deskripsi)
```

## Flag

| Flag | Deskripsi |
|---|---|
| `--json` | Output JSON |
