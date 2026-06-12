import type { ContentPageDef } from '../types';

import cheatsheet from './cheatsheet.html?raw';
import bindings from './concepts/bindings.html?raw';
import currying from './concepts/currying.html?raw';
import abstractions from './concepts/abstractions.html?raw';
import lexicalScope from './concepts/lexical-scope.html?raw';
import closures from './concepts/closures.html?raw';
import typeInference from './concepts/type-inference.html?raw';
import polymorphism from './concepts/polymorphism.html?raw';
import howToLearn from './concepts/how-to-learn.html?raw';
import compilerErrors from './concepts/compiler-errors.html?raw';
import tuples from './concepts/tuples.html?raw';
import patternMatching from './concepts/pattern-matching.html?raw';
import lists from './concepts/lists.html?raw';
import listOperations from './concepts/list-operations.html?raw';
import higherOrder from './concepts/higher-order.html?raw';
import tailRecursion from './concepts/tail-recursion.html?raw';
import iteration from './concepts/iteration.html?raw';
import derivedForms from './concepts/derived-forms.html?raw';
import sorting from './concepts/sorting.html?raw';
import variants from './concepts/variants.html?raw';
import exceptions from './concepts/exceptions.html?raw';
import optionsResult from './concepts/options-result.html?raw';
import records from './concepts/records.html?raw';
import trees from './concepts/trees.html?raw';
import mutability from './concepts/mutability.html?raw';
import modules from './concepts/modules.html?raw';
import functors from './concepts/functors.html?raw';
import projectsDuneOpam from './concepts/projects-dune-opam.html?raw';
import testingAndQuality from './concepts/testing-and-quality.html?raw';
import bank from './exercises/bank.html?raw';
import playlist from './exercises/playlist.html?raw';
import search from './exercises/search.html?raw';
import phonebook from './exercises/phonebook.html?raw';
import evaluator from './exercises/evaluator.html?raw';
import mergesort from './exercises/mergesort.html?raw';

// Single source of truth for content pages: each page is declared exactly once,
// carrying its route (path/html/title/description) AND its sidebar placement
// (nav). `content/nav.ts` derives navGroups/topbarLinks from this list so the
// route table and the sidebar can never drift apart.
export const contentRoutes: ContentPageDef[] = [
  {
    // Home is a React component (src/features/home/Home.tsx); this entry only
    // carries meta + nav placement, so html stays empty.
    path: '/',
    html: '',
    title: 'Learn OCaml by Example | oCamlCase',
    description:
      'A practical guide to OCaml with functional patterns, type system features, and coding exercises. Written for programmers who want to understand the language.',
    nav: { group: 'Start here', num: '·', label: 'Home' },
  },
  {
    path: '/cheatsheet',
    html: cheatsheet,
    title: 'Cheat Sheet | oCamlCase',
    description:
      'Quick reference for OCaml syntax: bindings, types, functions, pattern matching, lists, modules, and I/O.',
    nav: { group: 'Start here', num: '·', label: 'Cheat Sheet' },
  },
  {
    path: '/concepts/how-to-learn',
    html: howToLearn,
    title: 'How to Learn OCaml on This Site | oCamlCase',
    description:
      'Orientation for the guided path: how the site is organized, where to run code, the read-predict-run-modify study loop, and why compiler errors are guides.',
    nav: { group: 'Start here', label: 'How to Learn' },
    concept: {
      tocDesc: 'Study loop, Playground, and how the site fits together',
      unnumbered: true,
    },
  },
  {
    path: '/concepts/bindings',
    html: bindings,
    title: 'OCaml Let Bindings | oCamlCase',
    description:
      'Understand let bindings in OCaml: how names are linked to values, local let ... in scoping, shadowing as a substitute for assignment, and opt-in mutability with refs.',
    nav: { group: 'Concepts', label: 'Bindings' },
    concept: {
      tocDesc: 'Naming values with let and local scope',
      footerExtras: [{ label: 'Mutability', href: '/concepts/mutability', kind: 'deep' }],
    },
  },
  {
    path: '/concepts/currying',
    html: currying,
    title: 'OCaml Currying and Partial Application | oCamlCase',
    description:
      'Understand currying in OCaml: how every function takes exactly one argument, what partial application is, and how labeled arguments change the picture.',
    nav: { group: 'Concepts', label: 'Currying' },
    concept: {
      tocDesc: 'Partial application and multi-arg functions',
      footerExtras: [{ label: 'Mini Exercises', href: '/exercises/mini', kind: 'practice' }],
    },
  },
  {
    path: '/concepts/abstractions',
    html: abstractions,
    title: 'OCaml Anonymous Functions | oCamlCase',
    description:
      'Learn how OCaml uses anonymous functions (abstractions) as first-class values, and how let bindings are just syntactic sugar for naming them.',
    nav: { group: 'Concepts', label: 'Abstractions' },
    concept: {
      tocDesc: 'Anonymous functions as first-class values',
    },
  },
  {
    path: '/concepts/lexical-scope',
    html: lexicalScope,
    title: 'OCaml Lexical Scope and Binding | oCamlCase',
    description:
      'Reason about names in OCaml: defining vs. using occurrences, bound vs. free occurrences, lexical binding, and the sanitization conditions that make substitution safe.',
    nav: { group: 'Concepts', label: 'Lexical Scope' },
    concept: {
      tocDesc: 'Reasoning about names and occurrences',
    },
  },
  {
    path: '/concepts/closures',
    html: closures,
    title: 'OCaml Closures Explained | oCamlCase',
    description:
      'Learn how OCaml represents function values as closures: a tuple of argument, body, and captured environment. See why recursive functions also store their own name.',
    nav: { group: 'Concepts', label: 'Closures' },
    concept: {
      tocDesc: 'Functions with captured environments',
    },
  },
  {
    path: '/concepts/type-inference',
    html: typeInference,
    title: 'OCaml Type Inference Step by Step | oCamlCase',
    description:
      'How OCaml infers the most general type for every binding using Hindley-Milner: how constraints propagate, when type variables appear, and when annotations help.',
    nav: { group: 'Concepts', label: 'Type Inference' },
    concept: {
      tocDesc: 'How OCaml derives types without annotations',
      footerExtras: [{ label: 'Static Semantics', href: '/concepts/static-semantics', kind: 'deep' }],
    },
  },
  {
    path: '/concepts/polymorphism',
    html: polymorphism,
    title: 'OCaml Parametric Polymorphism | oCamlCase',
    description:
      'Parametric polymorphism in OCaml: type variables, generic functions like List.length and List.map, and the value restriction that keeps the type system sound.',
    nav: { group: 'Concepts', label: 'Polymorphism' },
    concept: {
      tocDesc: 'Generic functions and type variables',
    },
  },
  {
    path: '/concepts/compiler-errors',
    html: compilerErrors,
    title: 'Reading OCaml Compiler Errors | oCamlCase',
    description:
      'Decode OCaml type errors: has-type vs expected-type, currying surprises, branch mismatches, non-exhaustive matches, and how annotations pin down the real bug.',
    nav: { group: 'Concepts', label: 'Reading Compiler Errors' },
    concept: {
      tocDesc: 'Decoding type errors and warning 8',
    },
  },
  {
    path: '/concepts/tuples',
    html: tuples,
    title: 'OCaml Tuples | oCamlCase',
    description:
      'Learn OCaml tuples: constructing pairs and triples, destructuring with patterns, tuples vs lists, tupled vs curried functions, and when to reach for records instead.',
    nav: { group: 'Concepts', label: 'Tuples' },
    concept: {
      tocDesc: 'Fixed-size bundles and destructuring patterns',
    },
  },
  {
    path: '/concepts/pattern-matching',
    html: patternMatching,
    title: 'OCaml Pattern Matching | oCamlCase',
    description:
      'Learn pattern matching in OCaml: the match expression, variant types, exhaustiveness checking, guards, and nested patterns.',
    nav: { group: 'Concepts', label: 'Pattern Matching' },
    concept: {
      tocDesc: 'Destructuring values with match expressions',
      footerExtras: [{ label: 'Bank Account', href: '/exercises/bank', kind: 'practice' }],
    },
  },
  {
    path: '/concepts/lists',
    html: lists,
    title: 'OCaml Lists | oCamlCase',
    description:
      'Understand OCaml lists from the ground up: the two constructors, the recursive construction rule, tree representation, pattern matching, and recursive implementations of length, append, rev, and concat.',
    nav: { group: 'Concepts', label: 'Lists' },
    concept: {
      tocDesc: 'Cons, pattern matching, and list operations',
    },
  },
  {
    path: '/concepts/list-operations',
    html: listOperations,
    title: 'OCaml List Operations: Map, Filter, Exists | oCamlCase',
    description:
      'Build map, filter, and exists from scratch as recursive functions, see how they compare to imperative loops, and learn to pipe them together with the standard List module.',
    nav: { group: 'Concepts', label: 'List Operations' },
    concept: {
      tocDesc: 'Map, filter, and exists',
      footerExtras: [{ label: 'Playlist', href: '/exercises/playlist', kind: 'practice' }],
    },
  },
  {
    path: '/concepts/higher-order',
    html: higherOrder,
    title: 'OCaml Higher-Order Functions | oCamlCase',
    description:
      'Learn higher-order functions in OCaml: map, filter, fold, the pipe operator, and how passing functions as arguments compares to dependency injection in OOP.',
    nav: { group: 'Concepts', label: 'Higher-Order Functions' },
    concept: {
      tocDesc: 'Map, filter, fold and functions as values',
    },
  },
  {
    path: '/concepts/tail-recursion',
    html: tailRecursion,
    title: 'OCaml Tail Recursion | oCamlCase',
    description:
      'Understand tail recursion in OCaml: what tail position means, how the compiler optimizes tail calls, the accumulator pattern, and divergence.',
    nav: { group: 'Concepts', label: 'Tail Recursion' },
    concept: {
      tocDesc: 'Writing stack-safe recursive functions',
    },
  },
  {
    path: '/concepts/iteration',
    html: iteration,
    title: 'OCaml Iteration Patterns | oCamlCase',
    description:
      'Learn definite and indefinite iteration in OCaml: how to apply a function n times with iter, and how to search for the first value satisfying a predicate with first.',
    nav: { group: 'Concepts', label: 'Iteration' },
    concept: {
      tocDesc: 'Loops, folds, and iterative patterns',
      footerExtras: [{ label: 'Search', href: '/exercises/search', kind: 'practice' }],
    },
  },
  {
    path: '/concepts/derived-forms',
    html: derivedForms,
    title: 'OCaml Derived Forms and Syntactic Sugar | oCamlCase',
    description:
      'See how OCaml syntax desugars to a small core: && and || are if-expressions, operators in parentheses are functions, and let f x = ... is sugar for fun.',
    nav: { group: 'Concepts', label: 'Derived Forms' },
    concept: {
      tocDesc: 'Syntactic sugar in OCaml',
    },
  },
  {
    path: '/concepts/sorting',
    html: sorting,
    title: 'OCaml Sorting Algorithms | oCamlCase',
    description:
      'Learn about sorting algorithms in OCaml, including insertion sort, polymorphic sorting, and merge sort, and understand recursion trees.',
    nav: { group: 'Concepts', label: 'Sorting' },
    concept: {
      tocDesc: 'Insertion sort, merge sort, and comparison functions',
    },
  },
  {
    path: '/concepts/variants',
    html: variants,
    title: 'OCaml Variant Types and Constructors | oCamlCase',
    description:
      'Understand variant types in OCaml: defining constructors, enumerations, recursive and parameterized types, and structural recursion over data shapes.',
    nav: { group: 'Concepts', label: 'Variants and Constructors' },
    concept: {
      tocDesc: 'Variant types, constructors, and structural recursion',
      footerExtras: [{ label: 'Bank Account', href: '/exercises/bank', kind: 'practice' }],
    },
  },
  {
    path: '/concepts/exceptions',
    html: exceptions,
    title: 'OCaml Exceptions | oCamlCase',
    description:
      'Learn exceptions in OCaml: the extensible exn type, raise and try ... with, evaluation order, and exceptions as a control flow mechanism.',
    nav: { group: 'Concepts', label: 'Exceptions' },
    concept: {
      tocDesc: 'raise, try ... with, and early exits',
    },
  },
  {
    path: '/concepts/options-result',
    html: optionsResult,
    title: 'OCaml Option and Result Types | oCamlCase',
    description:
      'Handle failure in the type system with OCaml option and result: pattern matching on None and Some, Option.map and Option.bind chains, Ok and Error, and when to prefer each over exceptions.',
    nav: { group: 'Concepts', label: 'Options and Result' },
    concept: {
      tocDesc: 'Failure in the type with None, Some, Ok, and Error',
      footerExtras: [{ label: 'Safe Division', href: '/exercises/mini/safe-div', kind: 'practice' }],
    },
  },
  {
    path: '/concepts/records',
    html: records,
    title: 'OCaml Records | oCamlCase',
    description:
      'Learn OCaml records: defining named fields, dot access and record patterns, field punning, functional update with { r with ... }, and mutable fields.',
    nav: { group: 'Concepts', label: 'Records' },
    concept: {
      tocDesc: 'Named fields, patterns, and functional update',
      footerExtras: [{ label: 'Bank Account', href: '/exercises/bank', kind: 'practice' }],
    },
  },
  {
    path: '/concepts/trees',
    html: trees,
    title: 'OCaml Trees and Structural Recursion | oCamlCase',
    description:
      'Explore rose trees, structural terminology, and computing properties of tree data structures recursively.',
    nav: { group: 'Concepts', label: 'Trees' },
    concept: {
      tocDesc: 'Rose trees and structural recursion',
      footerExtras: [{ label: 'Tree Lab', href: '/concepts/tree-lab', kind: 'practice' }, { label: 'Building an Interpreter', href: '/interpreter/lexing', kind: 'deep' }],
    },
  },
  {
    path: '/concepts/mutability',
    html: mutability,
    title: 'OCaml Refs, Arrays, and Mutability | oCamlCase',
    description:
      'Imperative OCaml when you need it: ref cells with := and !, arrays with in-place update, while and for loops, unit and sequencing, and physical vs structural equality.',
    nav: { group: 'Concepts', label: 'Mutability' },
    concept: {
      tocDesc: 'Refs, arrays, loops, and equality pitfalls',
      footerExtras: [{ label: 'Ref Counter', href: '/exercises/mini/ref-counter', kind: 'practice' }],
    },
  },
  {
    path: '/concepts/modules',
    html: modules,
    title: 'OCaml Modules and Signatures | oCamlCase',
    description:
      'Organize OCaml programs with modules and signatures: struct/sig, abstract types, .ml/.mli files, dot access and local opens, and hiding invariants behind interfaces.',
    nav: { group: 'Concepts', label: 'Modules and Signatures' },
    concept: {
      tocDesc: 'struct/sig, abstract types, and .mli interfaces',
    },
  },
  {
    path: '/concepts/functors',
    html: functors,
    title: 'OCaml Functors | oCamlCase',
    description:
      'Learn OCaml functors: modules parameterized by modules, building Set.Make-style libraries, and when a functor beats a higher-order function.',
    nav: { group: 'Concepts', label: 'Functors' },
    concept: {
      tocDesc: 'Modules parameterized by modules, Set.Make style',
    },
  },
  {
    path: '/concepts/projects-dune-opam',
    html: projectsDuneOpam,
    title: 'OCaml Projects with dune and opam | oCamlCase',
    description:
      'Set up a real OCaml project: opam switches and packages, the dune build system, the bin/lib/test layout, watch mode, and dune utop.',
    nav: { group: 'Concepts', label: 'Projects: dune & opam' },
    concept: {
      tocDesc: 'Build system, packages, and project layout',
    },
  },
  {
    path: '/concepts/testing-and-quality',
    html: testingAndQuality,
    title: 'OCaml Testing and Code Quality | oCamlCase',
    description:
      'Test OCaml code with expect tests and alcotest, format with ocamlformat, and apply project conventions: .mli interfaces, one concept per file, fast green suites.',
    nav: { group: 'Concepts', label: 'Testing & Code Quality' },
    concept: {
      tocDesc: 'Expect tests, alcotest, and ocamlformat',
    },
  },
  {
    path: '/exercises/bank',
    html: bank,
    title: 'Bank Account | oCamlCase',
    description:
      'Practice OCaml variant types, immutable records, and list folds by building a bank account model that derives balance from transaction history.',
    nav: { group: 'Exercises', num: 'E1.', label: 'Bank Account' },
  },
  {
    path: '/exercises/playlist',
    html: playlist,
    title: 'Playlist | oCamlCase',
    description:
      'Practice OCaml list operations, higher-order functions, and tuple destructuring by building a music playlist with filtering, formatting, and duration calculation.',
    nav: { group: 'Exercises', num: 'E2.', label: 'Playlist' },
  },
  {
    path: '/exercises/search',
    html: search,
    title: 'Search | oCamlCase',
    description:
      'Practice OCaml iteration patterns: implement iter for definite repetition and first for indefinite search, then use them to solve concrete problems with partial application.',
    nav: { group: 'Exercises', num: 'E3.', label: 'Search' },
  },
  {
    path: '/exercises/phonebook',
    html: phonebook,
    title: 'Phonebook | oCamlCase',
    description:
      'Practice OCaml list operations, closures, and higher-order functions by building a phonebook with lookup, filtering, and formatting.',
    nav: { group: 'Exercises', num: 'E4.', label: 'Phonebook' },
  },
  {
    path: '/exercises/evaluator',
    html: evaluator,
    title: 'Expression Evaluator | oCamlCase',
    description:
      'Practice OCaml variant types, pattern matching, and structural recursion by building an arithmetic expression evaluator, pretty-printer, and simplifier.',
    nav: { group: 'Exercises', num: 'E5.', label: 'Expression Evaluator' },
  },
  {
    path: '/exercises/mergesort',
    html: mergesort,
    title: 'Merge Sort | oCamlCase',
    description:
      'Practice OCaml recursion, pattern matching, and polymorphism by implementing merge sort with split, merge, and a polymorphic comparator.',
    nav: { group: 'Exercises', num: 'E6.', label: 'Merge Sort' },
  },
];
