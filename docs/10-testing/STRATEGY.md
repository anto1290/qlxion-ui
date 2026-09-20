# Testing — Strategy

## Piramida Testing

```text
        /\
       /  \      E2E (sedikit, kritis saja)
      /----\
     /      \    Visual Regression (per komponen, cross-framework)
    /--------\
   /          \  Accessibility Testing
  /------------\
 /              \ Component / Unit Testing (paling banyak)
/________________\
```

## Prinsip

Komponen tidak dianggap production-ready hanya karena berhasil di-render
(AGENTS.md Section 17). Minimal harus ada unit test dan accessibility test
untuk komponen yang ditandai "critical" (Button, Input, Dialog, Select, Form-related).

## Cakupan per Jenis

| Jenis | Alat (diusulkan) | Wajib untuk |
|---|---|---|
| Unit/Component | Vitest + Testing Library | Semua komponen |
| Accessibility | axe-core + Testing Library | Semua komponen |
| Visual Regression | Playwright/Chromatic screenshot | Komponen dengan variant visual signifikan |
| Cross-Framework Parity | Playwright, bandingkan React vs Vue | Semua komponen yang sudah di-porting ke Vue |
| E2E | Playwright pada `examples/*` | Alur kritis: init → add → render di app nyata |
