# oCamlCase

**Learn OCaml by building mental models, not just memorizing syntax.**

A practical, interactive guide to OCaml covering the type system, recursion patterns, closures, evaluation, and more. Written for programmers who want to understand the language from the ground up.

[**ocamlcase.dev**](https://ocamlcase.dev)

## Why I built it

Most OCaml tutorials teach syntax. oCamlCase teaches *how to think* in OCaml: how bindings work under the hood, what closures capture, how type inference propagates constraints, what tail position really means, and how an interpreter evaluates expressions step by step.

Every concept includes worked examples, and the interactive labs let you see evaluation, type derivation, and tree traversals happen live.

## Features

**17 Concept Pages** covering bindings, currying, closures, type inference, polymorphism, pattern matching, lists, higher-order functions, tail recursion, sorting, variant types, trees, and more.

**Interactive Labs:**
- **Static Semantics** - Live type elaborator with derivation trees. Type an expression, watch constraints propagate.
- **Tree Lab** - Rose tree explorer with 4 modes: tour, linearize, project, and balance.
- **Interpreter Pipeline** - Build an interpreter in 4 slices: lexing, parsing, dynamic semantics, and recursion & divergence. Animated steppers, derivation trees, rule cards.
- **Playground** - Run OCaml code in the browser.
- **Mini Exercises** - 15 drag-and-drop coding exercises. Group by concept or difficulty (Easy / Medium / Hard). Progress persisted in localStorage.

**3 Project Exercises:** Bank Account (variant types + fold), Playlist (list operations), Search (iteration patterns).

## Screenshots

<!-- TODO: Add screenshots after redesign -->
<!-- Screenshot list:
  1. Homepage with 3-card layout
  2. Concept page (e.g., pattern matching) with sidebar
  3. TreeLab - tree visualization with stepper
  4. Static Semantics - derivation tree
  5. Interpreter Lexing - token visualization
  6. Mini Exercise - drag-and-drop
  7. Dark mode variant
-->

*Screenshots coming soon.*

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build and dev server
- **Vanilla CSS** with design tokens (no Tailwind)
- **GitHub Pages** deployment via GitHub Actions
- Content authored as HTML fragments, imported via Vite `?raw`
- Custom type elaborator, parser, and evaluator written in TypeScript

## Learning Path

The concepts follow a deliberate progression:

1. **Foundations** (1-5): Bindings, currying, abstractions, lexical scope, closures
2. **Type System** (6-7): Type inference, parametric polymorphism
3. **Data** (8-11): Pattern matching, lists, list operations, higher-order functions
4. **Recursion** (12-13): Tail recursion, iteration patterns
5. **Advanced** (14-17): Derived forms, sorting, variant types, trees

After concepts, the Interactive Labs connect theory to practice with live visualizations.

## Local Development

```bash
git clone https://github.com/kheif/oCamlCase.git
cd oCamlCase/docs
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Roadmap

- [ ] Pre-rendering for improved SEO
- [ ] Structured data (JSON-LD) for search engines
- [ ] Dedicated 1200x630 OG banner image
- [ ] More mini exercises
- [ ] Additional interpreter pipeline stages
