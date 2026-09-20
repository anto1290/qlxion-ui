# AGENTS.md

# QLXion UI — AI Agent Guidelines

## 1. Purpose

This document defines the mandatory rules, responsibilities, constraints, and development principles for AI coding agents working on the QLXion UI project.

AI agents MUST read this document before making any change to the repository.

The purpose of this document is to ensure that:

* architecture remains consistent;
* project decisions are not made arbitrarily;
* components remain framework-consistent;
* documentation stays synchronized with implementation;
* the CLI, registry, design system, and documentation remain compatible;
* source ownership remains a core principle;
* changes remain maintainable and scalable.

This document is the top-level instruction for AI-assisted development.

Detailed specifications are defined inside the `docs/` directory.

---

# 2. Project Identity

## Project Name

QLXion UI

## Project Type

QLXion UI is a multi-framework, Tailwind CSS-based design system and component ecosystem.

The project provides:

* UI components;
* design tokens;
* themes;
* component registry;
* CLI;
* documentation website;
* interactive playground;
* framework integrations;
* testing utilities;
* developer tooling.

The primary supported ecosystems are:

* React;
* Next.js;
* Vue;
* Nuxt.js.

---

# 3. Core Product Model

QLXion UI follows a source-owned component model inspired by the shadcn/ui approach.

The primary developer experience is:

```bash
npx qlxion-ui init
```

followed by:

```bash
npx qlxion-ui add button
```

The CLI retrieves component definitions from the QLXion UI registry and places the required source files into the user's project.

QLXion UI MUST NOT depend exclusively on a traditional black-box component-library model.

The source component should remain accessible and customizable by the consuming project.

---

# 4. Core Architecture

The system consists of the following major layers:

```text
QLXion UI
│
├── Design System
│   ├── Design Tokens
│   ├── Themes
│   └── Component Contracts
│
├── Components
│   ├── React
│   └── Vue
│
├── Framework Support
│   ├── React
│   ├── Next.js
│   ├── Vue
│   └── Nuxt.js
│
├── CLI
│   ├── init
│   ├── add
│   ├── remove
│   ├── update
│   ├── list
│   ├── search
│   ├── info
│   └── diff
│
├── Registry
│   ├── Component Metadata
│   ├── Source Files
│   ├── Dependencies
│   └── Versions
│
├── Documentation
│   ├── Guides
│   ├── Component Documentation
│   ├── API Reference
│   └── Examples
│
└── Playground
    └── Interactive Component Preview
```

No AI agent may introduce a new architectural layer without documenting the reason and impact.

---

# 5. Source of Truth

The following hierarchy MUST be respected:

```text
Project Specification
        ↓
Design System
        ↓
Component Specification
        ↓
Framework Specification
        ↓
CLI / Registry Specification
        ↓
Implementation
        ↓
Documentation
```

Implementation MUST NOT become the source of architectural truth.

If implementation conflicts with documented specification:

1. identify the conflict;
2. determine whether the specification is outdated;
3. update the specification if the architecture intentionally changed;
4. then update the implementation.

Do not silently change architecture through code.

---

# 6. Documentation-First Rule

Every significant feature MUST have documentation.

Before implementing a major feature, the AI agent SHOULD identify the relevant specification document.

Examples:

```text
Component
→ docs/03-components/

Framework
→ docs/04-frameworks/

CLI
→ docs/05-cli/

Registry
→ docs/06-registry/

Documentation website
→ docs/07-documentation/

Architecture
→ docs/08-engineering/
```

Documentation is part of the product.

A feature is not considered complete if its required documentation is missing.

---

# 7. Framework Parity

QLXion UI supports multiple frontend ecosystems.

The supported targets are:

```text
React
Next.js
Vue
Nuxt.js
```

Equivalent components MUST maintain consistent:

* visual appearance;
* design tokens;
* component purpose;
* variants;
* sizes;
* states;
* accessibility behavior;
* interaction model;
* naming conventions;
* conceptual API.

Framework-specific implementation differences are allowed where required by the framework.

However, unnecessary divergence MUST be avoided.

Example:

React:

```tsx
<Button variant="destructive" size="sm">
  Delete
</Button>
```

Vue:

```vue
<Button variant="destructive" size="sm">
  Delete
</Button>
```

The implementation may differ, but the component contract should remain conceptually consistent.

---

# 8. Tailwind CSS Rule

Tailwind CSS is the primary styling system.

Components MUST use the project's design tokens and Tailwind conventions.

Avoid hard-coded design values when an existing design token exists.

Avoid unnecessary custom CSS.

Do not introduce another styling framework without an explicit architectural decision.

Do not mix multiple styling paradigms arbitrarily.

---

# 9. Design Token Rule

Components MUST be token-driven.

Design values such as:

* colors;
* typography;
* spacing;
* radius;
* shadows;
* motion;
* breakpoints;
* z-index;

should come from the QLXion UI design system.

Do not create component-specific visual values when an appropriate token already exists.

If a new token is required:

1. document the reason;
2. add the token to the design system;
3. update the relevant documentation;
4. then use the token in the component.

---

# 10. Component Ownership

Components installed through the CLI should become part of the user's project.

For example:

```bash
npx qlxion-ui add button
```

may produce:

```text
components/
└── ui/
    └── button.tsx
```

The consuming project should be able to:

* inspect the source;
* customize the source;
* extend the source;
* modify the source;
* remove the source.

Do not design the primary workflow around inaccessible or opaque component implementations.

---

# 11. Registry Rule

The registry is the source used by the CLI to resolve component metadata and source files.

Registry metadata SHOULD define information such as:

* component name;
* description;
* category;
* supported frameworks;
* files;
* dependencies;
* registry dependencies;
* versions;
* documentation references;
* examples;
* compatibility.

The CLI MUST NOT contain duplicated component definitions that should belong to the registry.

Avoid hard-coding component metadata inside the CLI.

---

# 12. CLI Rule

The primary CLI package is:

```text
qlxion-ui
```

The expected developer experience is:

```bash
npx qlxion-ui
```

The CLI MUST be designed to work without requiring a global installation.

Primary commands include:

```bash
npx qlxion-ui init
npx qlxion-ui add <component>
npx qlxion-ui remove <component>
npx qlxion-ui update <component>
npx qlxion-ui list
npx qlxion-ui search <query>
npx qlxion-ui info <component>
npx qlxion-ui diff <component>
```

Command behavior MUST be documented before becoming stable API.

CLI output should be:

* clear;
* deterministic;
* actionable;
* safe;
* script-friendly where appropriate.

Destructive operations SHOULD require confirmation unless explicitly forced.

---

# 13. Documentation Website Rule

The documentation website is a first-class product.

It MUST provide documentation for:

* installation;
* CLI;
* components;
* framework usage;
* theming;
* accessibility;
* customization;
* examples;
* API;
* component source;
* supported versions.

The documentation website should support interactive component previews.

Each component should have a consistent documentation structure.

At minimum:

```text
Description
Installation
Usage
Preview
Variants
Sizes
States
Examples
API
Accessibility
Framework Support
Source
```

---

# 14. Playground Rule

The project should provide an interactive playground for component exploration.

The playground SHOULD support:

* live preview;
* code preview;
* component variants;
* component states;
* theme switching;
* framework selection where practical.

The playground MUST use the same component implementations and design tokens as the actual project.

Do not create separate fake implementations solely for documentation previews unless explicitly required.

---

# 15. Accessibility

Accessibility is a core requirement.

Components SHOULD follow established accessibility standards and framework best practices.

Components MUST consider:

* keyboard navigation;
* focus management;
* semantic HTML;
* screen-reader behavior;
* ARIA usage;
* disabled states;
* loading states;
* color contrast;
* reduced motion where applicable.

Do not use ARIA attributes as a substitute for correct semantic HTML.

---

# 16. Responsive Design

Components MUST support responsive usage where relevant.

Responsive behavior should be based on the design system's breakpoint and layout conventions.

Do not introduce arbitrary breakpoint values when an existing token is appropriate.

---

# 17. Testing

Every production component SHOULD have appropriate tests.

Testing may include:

```text
Unit
Component
Accessibility
Integration
E2E
Visual Regression
Cross Framework
```

Critical components MUST have behavior and accessibility coverage.

A component is not considered production-ready solely because it renders successfully.

---

# 18. TypeScript

TypeScript is the primary development language.

Use strict typing.

Avoid:

```ts
any
```

unless there is a documented technical reason.

Prefer:

* explicit interfaces;
* type-safe APIs;
* discriminated unions;
* generic types where useful;
* inferred types where clear.

Do not over-engineer types unnecessarily.

---

# 19. Dependency Policy

Dependencies MUST be justified.

Before adding a dependency, determine:

1. whether the functionality already exists;
2. whether the dependency is required across frameworks;
3. bundle and runtime impact;
4. maintenance status;
5. licensing compatibility;
6. security implications;
7. whether the dependency conflicts with the source-owned component model.

Do not add dependencies simply for convenience.

---

# 20. Naming Conventions

Names MUST be:

* descriptive;
* consistent;
* framework-appropriate;
* predictable.

Component concepts should use the same naming wherever possible.

Examples:

```text
Button
Card
Dialog
Input
Select
Dropdown
Tooltip
Tabs
```

Avoid creating aliases with unclear semantic differences.

---

# 21. Folder Structure Rule

The repository structure is part of the architecture.

Do not arbitrarily create new top-level directories.

Before adding a new directory:

1. determine whether an existing directory is appropriate;
2. check the architecture documentation;
3. document the architectural reason if a new boundary is required.

---

# 22. Changes to Existing Components

When modifying an existing component:

1. inspect its specification;
2. inspect its implementation;
3. inspect its examples;
4. inspect its tests;
5. inspect related framework implementations;
6. inspect documentation;
7. make the smallest coherent change;
8. update tests;
9. update documentation when behavior changes.

Do not modify only one framework implementation when the component contract requires parity.

---

# 23. Breaking Changes

Breaking changes MUST be treated explicitly.

Examples include:

* changing component API;
* removing props;
* changing CLI commands;
* changing registry schema;
* changing configuration format;
* changing design tokens;
* changing generated file structure.

Breaking changes MUST be documented.

Use the project's versioning policy defined in:

```text
docs/06-registry/VERSIONING.md
```

and:

```text
docs/08-engineering/RELEASE.md
```

---

# 24. Security

AI agents MUST NOT:

* commit secrets;
* expose credentials;
* hard-code API keys;
* commit private tokens;
* disable security controls without justification;
* execute destructive commands without understanding their impact.

Environment-specific secrets belong in environment configuration, not source code.

---

# 25. Git Rules

Changes should be:

* focused;
* reviewable;
* logically grouped;
* free from unrelated modifications.

Avoid large unrelated refactors while implementing a feature.

Do not rewrite project history unless explicitly requested.

Do not delete existing project files merely because they appear unused without verifying their purpose.

---

# 26. AI Agent Workflow

Before changing code, the AI agent MUST:

```text
1. Read AGENTS.md
2. Identify the relevant specification
3. Inspect the existing implementation
4. Identify dependencies and affected areas
5. Plan the smallest coherent change
6. Implement
7. Run relevant tests
8. Update documentation
9. Review for framework parity
10. Summarize the changes
```

For large changes:

```text
Specification
    ↓
Architecture
    ↓
Implementation
    ↓
Testing
    ↓
Documentation
```

---

# 27. Do Not Guess

When a behavior is not defined:

* inspect existing documentation;
* inspect existing implementation;
* inspect related components;
* inspect architecture decisions;
* determine whether the behavior is framework-specific.

Do not invent architecture merely to make an implementation compile.

If an architectural decision is genuinely required, document it in:

```text
docs/00-project/DECISIONS.md
```

---

# 28. Avoid Premature Abstraction

Do not create abstractions solely because two pieces of code look similar.

An abstraction should have a clear purpose and stable boundary.

Prefer:

```text
simple
composable
explicit
maintainable
```

over:

```text
complex
magical
deeply coupled
over-generalized
```

---

# 29. Do Not Violate the Product Model

AI agents MUST NOT transform QLXion UI into a fundamentally different product without an explicit project decision.

The following principles are foundational:

```text
Tailwind-based
Multi-framework
Source-owned
Registry-driven
CLI-driven
Documentation-first
Design-token-driven
Accessible
Composable
```

---

# 30. Definition of Done

A feature is considered complete only when applicable requirements are satisfied.

Minimum expectations:

```text
[ ] Specification understood
[ ] Implementation completed
[ ] TypeScript/build passes
[ ] Relevant tests pass
[ ] Accessibility considered
[ ] Framework parity considered
[ ] Registry updated if applicable
[ ] CLI updated if applicable
[ ] Documentation updated
[ ] No secrets introduced
[ ] No unnecessary dependencies introduced
```

---

# 31. Documentation Hierarchy

The AI agent should use the following hierarchy when looking for project rules:

```text
AGENTS.md
    ↓
docs/00-project/
    ↓
docs/01-product/
    ↓
docs/02-design-system/
    ↓
docs/03-components/
    ↓
docs/04-frameworks/
    ↓
docs/05-cli/
    ↓
docs/06-registry/
    ↓
docs/07-documentation/
    ↓
docs/08-engineering/
    ↓
docs/09-development/
    ↓
docs/10-testing/
    ↓
docs/11-deployment/
```

More specific documentation takes precedence over general documentation when the two describe different implementation details.

However, a lower-level document MUST NOT silently contradict a higher-level architectural decision.

---

# 32. Final Principle

QLXion UI should be developed as an ecosystem, not merely as a collection of UI components.

The relationship between the major systems should remain:

```text
             Design System
                   │
                   ▼
              Components
                   │
          ┌────────┼────────┐
          ▼        ▼        ▼
        React     Vue    Frameworks
          │        │
        Next      Nuxt
          │        │
          └────┬───┘
               ▼
            Registry
               │
               ▼
              CLI
               │
               ▼
          User Project

               │
               ▼
        Documentation
               │
               ▼
           Playground
```

Every major architectural decision should preserve this ecosystem model.

The goal is to make QLXion UI easy to adopt, easy to understand, easy to customize, easy to extend, and maintainable across multiple frontend frameworks.
