# Versioning Policy

## Dua Lapis Versioning

1. **Package-level semver** — untuk `cli`, `core-react`, `core-vue`, `utils`, mengikuti
   semver standar npm (major.minor.patch).
2. **Registry-item versioning** — independen, per komponen (lihat `docs/06-registry/VERSIONING.md`
   dan ADR-0004).

## Aturan Bump Package

- **Patch**: bug fix internal, tidak mengubah public API package.
- **Minor**: penambahan command CLI baru, penambahan komponen baru ke `core-react`/`core-vue`
  tanpa mengubah komponen yang sudah ada secara breaking.
- **Major**: perubahan API CLI yang breaking, perubahan struktur config file, perubahan
  breaking pada komponen yang sudah stabil.

## Breaking Change pada Satu Komponen

Breaking change pada satu komponen (mis. rename prop di Button) TIDAK otomatis memicu
major bump di seluruh `core-react` — cukup dicatat sebagai breaking change pada
registry-item Button tersebut, dengan migration note di `docs/03-components/button/CHANGELOG.md`,
kecuali perubahan tersebut juga mengubah API publik package secara keseluruhan.
