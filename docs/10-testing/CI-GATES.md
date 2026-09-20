# Testing — CI Gates

## Gate yang Memblokir Merge ke `main`

```text
[ ] Build seluruh package sukses (Turborepo)
[ ] Unit test lulus (semua package)
[ ] Accessibility test lulus untuk komponen yang terpengaruh
[ ] Visual regression tidak menunjukkan perbedaan tak-disetujui
[ ] Cross-framework parity check lulus untuk komponen yang terpengaruh
[ ] Lint & type-check lulus
```

## Threshold Coverage

| Package | Statement | Branch | Function | Line |
|---|---|---|---|---|
| `core-react` | 80% | 70% | 80% | 80% |
| `core-vue` | 80% | 70% | 80% | 80% |
| `cli` | 60% | 50% | 60% | 60% |

## Kebijakan Override

Gate hanya boleh di-skip oleh maintainer dengan alasan eksplisit yang dicatat di
PR description (mis. flaky test yang sudah punya issue tracking terpisah) — tidak
boleh di-skip diam-diam.
