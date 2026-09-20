# QLXion UI

> A source-owned, multi-framework UI ecosystem built with Tailwind CSS.

QLXion UI is a modern UI ecosystem for building consistent, accessible, customizable, and production-ready web applications across multiple frontend frameworks.

QLXion UI combines:

* Design System
* UI Components
* Design Tokens
* CLI
* Component Registry
* Documentation
* Interactive Playground
* Framework Integrations
* Testing & Accessibility Tooling

QLXion UI is designed around a **source-owned component model** inspired by the philosophy of shadcn/ui.

Instead of forcing applications to depend on an opaque component package, QLXion UI allows developers to install component source code directly into their projects.

---

## 1. Vision

QLXion UI aims to become a complete UI development ecosystem rather than simply a component library.

The ecosystem should provide a consistent development experience across:

* React
* Next.js
* Vue
* Nuxt.js

while maintaining a unified:

* visual language
* design token system
* accessibility standard
* component philosophy
* documentation structure
* CLI workflow
* registry architecture

The goal is:

> Build once as a design system, consume everywhere through source-owned components.

---

## 2. Core Philosophy

QLXion UI follows several fundamental principles.

### 2.1 Source-Owned

Components installed through the CLI become part of the consuming application.

Example:

```text
components/
└── ui/
    ├── button.tsx
    ├── card.tsx
    └── dialog.tsx
```

Developers can:

* inspect the source
* modify the source
* customize styles
* extend behavior
* compose components
* remove components

QLXion UI does not attempt to hide implementation details.

---

### 2.2 Design-System Driven

Components are built from shared design tokens.

The system defines tokens for:

* colors
* typography
* spacing
* radius
* shadows
* motion
* breakpoints
* z-index
* states
* themes

Components should consume these tokens instead of introducing arbitrary values.

---

### 2.3 Multi-Framework

QLXion UI supports multiple frontend ecosystems while maintaining framework parity.

Initial supported frameworks:

| Framework | Status |
| --------- | ------ |
| React     | Core   |
| Next.js   | Core   |
| Vue       | Core   |
| Nuxt.js   | Core   |

Framework-specific implementation details may differ, but the conceptual design and user experience should remain consistent.

---

### 2.4 Tailwind CSS First

Tailwind CSS is the primary styling system.

QLXion UI should avoid unnecessary:

* custom CSS frameworks
* duplicated styling systems
* hardcoded design values
* framework-specific visual implementations

when the requirement can be solved through the shared design system.

---

### 2.5 Documentation First

Documentation is a first-class product.

Every major capability should have documentation covering:

* installation
* usage
* API
* examples
* customization
* accessibility
* framework differences
* dependencies
* source code
* version information

The documentation website is part of the QLXion UI ecosystem, not merely project documentation.

---

## 3. Ecosystem

QLXion UI consists of several connected layers.

```text
                         QLXion UI
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
    Documentation        Registry             CLI
          │                 │                 │
          │                 │                 │
          ▼                 ▼                 ▼
      Examples          Metadata          Installation
      API Docs          Source            Updates
      Playground        Versions          Search
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
                            ▼
                    Design System
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
              React                    Vue
                │                       │
              Next.js                  Nuxt
```

---

## 4. Components

QLXion UI provides reusable UI components based on a common design system.

Initial component categories may include:

### Basic

* Button
* Input
* Label
* Textarea
* Checkbox
* Radio
* Switch
* Select
* Badge
* Avatar

### Layout

* Card
* Separator
* Aspect Ratio
* Scroll Area
* Resizable
* Container

### Navigation

* Navigation Menu
* Tabs
* Breadcrumb
* Pagination
* Sidebar
* Menubar

### Feedback

* Alert
* Toast
* Tooltip
* Progress
* Skeleton
* Spinner

### Overlay

* Dialog
* Drawer
* Sheet
* Popover
* Dropdown Menu
* Context Menu
* Command

### Data Display

* Table
* Data Table
* Calendar
* Accordion
* Collapsible

The component catalog will evolve according to the project roadmap.

---

## 5. CLI

QLXion UI provides a CLI for initializing projects and installing components.

The CLI package is:

```text
qlxion-ui
```

The primary usage is:

```bash
npx qlxion-ui init
```

Install a component:

```bash
npx qlxion-ui add button
```

Install multiple components:

```bash
npx qlxion-ui add button card dialog
```

Other supported commands include:

```bash
npx qlxion-ui remove button
npx qlxion-ui update button
npx qlxion-ui list
npx qlxion-ui search dialog
npx qlxion-ui info button
npx qlxion-ui diff button
```

The CLI detects the target project and determines the appropriate framework implementation.

---

## 6. Registry

QLXion UI uses a component registry as the source for component metadata and source definitions.

The registry is responsible for information such as:

* component name
* component type
* framework
* version
* source files
* dependencies
* peer dependencies
* required utilities
* required tokens
* related components
* documentation
* compatibility

Conceptually:

```text
CLI
 │
 ▼
Registry
 │
 ├── Metadata
 ├── Source
 ├── Dependencies
 ├── Versions
 └── Framework information
```

The CLI should consume registry information rather than maintaining duplicated component definitions.

---

## 7. Documentation Website

The documentation website is a core QLXion UI application.

It provides:

* Getting Started
* Installation
* CLI documentation
* Component documentation
* Framework guides
* Design System documentation
* Design Tokens
* Theming
* Accessibility
* API reference
* Examples
* Interactive playground
* Source code
* Version information

A typical component documentation page should provide:

```text
Button
│
├── Overview
├── Installation
├── Usage
├── Variants
├── Sizes
├── Examples
├── API
├── Accessibility
├── Customization
├── Source
└── Related Components
```

---

## 8. Playground

QLXion UI includes an interactive playground for testing components.

The playground should use the same:

* component implementations
* design tokens
* themes
* framework implementations

used by the actual ecosystem.

The playground must not become a separate implementation of the components.

Its purpose is to allow developers to:

* experiment with components
* change properties
* preview variants
* test responsive behavior
* test themes
* inspect generated code

---

## 9. Framework Support

### React

React is one of the primary framework targets.

Example:

```tsx
import { Button } from "@/components/ui/button"

export function Example() {
  return <Button>Continue</Button>
}
```

---

### Next.js

Next.js applications should be supported as first-class React projects.

QLXion UI must account for:

* Server Components
* Client Components
* SSR
* routing
* hydration
* Tailwind configuration
* TypeScript

---

### Vue

Vue receives equivalent component implementations following the same design principles.

Example:

```vue
<script setup lang="ts">
import { Button } from "@/components/ui"
</script>

<template>
  <Button>Continue</Button>
</template>
```

---

### Nuxt.js

Nuxt.js is treated as a first-class Vue framework target.

QLXion UI must account for:

* SSR
* hydration
* auto-import conventions
* Nuxt configuration
* Tailwind integration
* TypeScript

---

## 10. Project Structure

The repository is organized as a monorepo.

```text
qlxion-ui/
│
├── apps/
│   ├── docs/
│   ├── playground/
│   └── registry/
│
├── packages/
│   ├── cli/
│   ├── core/
│   ├── tokens/
│   ├── utils/
│   ├── react/
│   ├── vue/
│   ├── registry/
│   └── testing/
│
├── components/
│
├── templates/
│   ├── react/
│   ├── next/
│   ├── vue/
│   └── nuxt/
│
├── tooling/
│
├── docs/
│
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

The exact structure may evolve as the architecture becomes more mature.

Architectural changes must be documented before implementation when they affect the project's fundamental design.

---

## 11. Technology Stack

The initial technology direction is:

| Area              | Technology           |
| ----------------- | -------------------- |
| Language          | TypeScript           |
| Package Manager   | pnpm                 |
| Monorepo          | Turborepo            |
| Styling           | Tailwind CSS         |
| Documentation     | Next.js + MDX        |
| React             | React                |
| Vue               | Vue                  |
| Next.js           | Next.js              |
| Nuxt.js           | Nuxt                 |
| CLI               | Node.js + TypeScript |
| Testing           | Vitest               |
| Component Testing | Testing Library      |
| E2E               | Playwright           |
| Accessibility     | axe                  |
| Versioning        | Changesets           |

Technology choices remain subject to the project specification and architecture decisions.

---

## 12. Installation

### Initialize a project

```bash
npx qlxion-ui init
```

The CLI detects the project and prepares the required QLXion UI configuration.

### Add a component

```bash
npx qlxion-ui add button
```

### Add multiple components

```bash
npx qlxion-ui add button card dialog
```

The installed source becomes part of the application.

---

## 13. Development

Clone the repository and install dependencies:

```bash
pnpm install
```

Start development:

```bash
pnpm dev
```

Build the repository:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```

Run linting:

```bash
pnpm lint
```

Run type checking:

```bash
pnpm typecheck
```

The exact commands may evolve with the implementation.

---

## 14. Adding Components

New components should follow the documented component lifecycle:

```text
Component Specification
        │
        ▼
Design & Tokens
        │
        ▼
Framework Implementation
        │
        ▼
Tests
        │
        ▼
Registry Metadata
        │
        ▼
CLI Integration
        │
        ▼
Documentation
        │
        ▼
Release
```

A component is not considered complete merely because its UI implementation works.

It must also satisfy the project's requirements for:

* accessibility
* testing
* framework parity
* registry metadata
* documentation
* source installation
* versioning

---

## 15. Accessibility

Accessibility is a core requirement.

Components should consider:

* semantic HTML
* keyboard navigation
* focus management
* focus visibility
* screen readers
* ARIA
* disabled states
* loading states
* error states
* color contrast
* reduced motion
* touch targets

Accessibility requirements are documented in the Design System and Component specifications.

---

## 16. Versioning

QLXion UI uses semantic versioning principles.

Changes are classified as:

```text
PATCH
MINOR
MAJOR
```

Breaking changes must be explicitly documented.

Component source, registry metadata, CLI behavior, and documentation should remain version-aware.

---

## 17. Documentation Structure

Project documentation is organized into several domains:

```text
docs/
├── 00-project/
├── 01-product/
├── 02-design-system/
├── 03-components/
├── 04-frameworks/
├── 05-cli/
├── 06-registry/
├── 07-documentation/
├── 08-engineering/
├── 09-development/
├── 10-testing/
└── 11-deployment/
```

See `AGENTS.md` for the project's development and AI-agent rules.

---

## 18. Design Principles

QLXion UI should consistently follow these principles:

1. **Simple by default**
2. **Composable by design**
3. **Source-owned**
4. **Token-driven**
5. **Accessible**
6. **Framework-aware**
7. **Documentation-first**
8. **CLI-driven**
9. **Registry-driven**
10. **Production-oriented**

---

## 19. What QLXion UI Is Not

QLXion UI is not intended to be:

* an opaque component dependency
* a framework-specific UI kit
* a collection of unrelated components
* a CSS-only utility collection
* a replacement for Tailwind CSS
* a design system without implementation
* a component library without documentation

QLXion UI is an ecosystem connecting design, implementation, source ownership, documentation, registry, and developer tooling.

---

## 20. Project Status

QLXion UI is currently in the **specification and architecture phase**.

The initial priority is to establish:

1. Project specification
2. Design system
3. Component specification
4. Framework strategy
5. CLI specification
6. Registry specification
7. Documentation architecture
8. Engineering standards

Implementation should begin only after the foundational specifications are sufficiently defined.

---

## 21. Documentation Roadmap

The project documentation will be developed in this order:

```text
AGENTS.md
    │
    ▼
README.md
    │
    ▼
Project Specification
    │
    ├── PROJECT.md
    ├── VISION.md
    ├── GOALS.md
    ├── SCOPE.md
    ├── REQUIREMENTS.md
    ├── PRINCIPLES.md
    ├── ROADMAP.md
    ├── GLOSSARY.md
    └── DECISIONS.md
    │
    ▼
Product Specification
    │
    ▼
Design System
    │
    ▼
Components
    │
    ▼
Frameworks
    │
    ▼
CLI
    │
    ▼
Registry
    │
    ▼
Documentation
    │
    ▼
Engineering
    │
    ▼
Development
    │
    ▼
Testing
    │
    ▼
Deployment
```

---

## 22. License

The final licensing model will be defined before the first public release.

The project should explicitly define licensing for:

* source code
* component source
* CLI
* registry metadata
* documentation
* examples
* templates
* branding/assets

---

## 23. Contributing

Contribution guidelines will be documented before the project opens for external contributions.

Contributors should follow:

* `AGENTS.md`
* project specifications
* design-system rules
* component specifications
* coding standards
* testing requirements
* documentation requirements
* Git workflow

---

## 24. Final Principle

QLXion UI is built around one central idea:

> **A UI ecosystem should make developers faster without taking ownership of their application away from them.**

QLXion UI therefore combines:

```text
Design System
      +
Components
      +
Source Ownership
      +
Registry
      +
CLI
      +
Documentation
      +
Framework Support
      +
Accessibility
      +
Testing
      =
QLXion UI
```

The project should remain cohesive as it grows, while allowing developers to take only what they need and fully control the resulting source code.
