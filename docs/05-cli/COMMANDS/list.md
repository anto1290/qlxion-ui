# Command: list

```bash
npx qlxion-ui list
```

## Perilaku

Menampilkan seluruh komponen yang tersedia di registry untuk framework project
saat ini (berdasarkan `qlxion.config.json`), dikelompokkan per kategori
(form, layout, feedback, navigation, overlay, dll).

## Flag

| Flag | Deskripsi |
|---|---|
| `--framework <name>` | Tampilkan daftar untuk framework lain, bukan default project |
| `--installed` | Hanya tampilkan komponen yang sudah terpasang di project |
| `--json` | Output JSON untuk keperluan scripting |
