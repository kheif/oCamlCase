import type { ContentPageDef } from '../types';

import home from './home.html?raw';
import cheatsheet from './cheatsheet.html?raw';
import bindings from './concepts/bindings.html?raw';
import currying from './concepts/currying.html?raw';
import abstractions from './concepts/abstractions.html?raw';
import lexicalScope from './concepts/lexical-scope.html?raw';
import closures from './concepts/closures.html?raw';
import typeInference from './concepts/type-inference.html?raw';
import polymorphism from './concepts/polymorphism.html?raw';
import patternMatching from './concepts/pattern-matching.html?raw';
import lists from './concepts/lists.html?raw';
import listOperations from './concepts/list-operations.html?raw';
import higherOrder from './concepts/higher-order.html?raw';
import tailRecursion from './concepts/tail-recursion.html?raw';
import iteration from './concepts/iteration.html?raw';
import derivedForms from './concepts/derived-forms.html?raw';
import sorting from './concepts/sorting.html?raw';
import constructorsExceptions from './concepts/constructors-exceptions.html?raw';
import trees from './concepts/trees.html?raw';
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
    path: '/',
    html: home,
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
    path: '/concepts/bindings',
    html: bindings,
    title: 'OCaml Let Bindings | oCamlCase',
    description:
      'Understand let bindings in OCaml: how names are linked to values, local let ... in scoping, shadowing as a substitute for assignment, and opt-in mutability with refs.',
    nav: { group: 'Concepts', num: '1.', label: 'Bindings' },
  },
  {
    path: '/concepts/currying',
    html: currying,
    title: 'OCaml Currying and Partial Application | oCamlCase',
    description:
      'Understand currying in OCaml: how every function takes exactly one argument, what partial application is, and how labeled arguments change the picture.',
    nav: { group: 'Concepts', num: '2.', label: 'Currying' },
  },
  {
    path: '/concepts/abstractions',
    html: abstractions,
    title: 'OCaml Anonymous Functions | oCamlCase',
    description:
      'Learn how OCaml uses anonymous functions (abstractions) as first-class values, and how let bindings are just syntactic sugar for naming them.',
    nav: { group: 'Concepts', num: '3.', label: 'Abstractions' },
  },
  {
    path: '/concepts/lexical-scope',
    html: lexicalScope,
    title: 'OCaml Lexical Scope and Binding | oCamlCase',
    description:
      'Reason about names in OCaml: defining vs. using occurrences, bound vs. free occurrences, lexical binding, and the sanitization conditions that make substitution safe.',
    nav: { group: 'Concepts', num: '4.', label: 'Lexical Scope' },
  },
  {
    path: '/concepts/closures',
    html: closures,
    title: 'OCaml Closures Explained | oCamlCase',
    description:
      'Learn how OCaml represents function values as closures: a tuple of argument, body, and captured environment. See why recursive functions also store their own name.',
    nav: { group: 'Concepts', num: '5.', label: 'Closures' },
  },
  {
    path: '/concepts/type-inference',
    html: typeInference,
    title: 'OCaml Type Inference Step by Step | oCamlCase',
    description:
      'How OCaml infers the most general type for every binding using Hindley-Milner: how constraints propagate, when type variables appear, and when annotations help.',
    nav: { group: 'Concepts', num: '6.', label: 'Type Inference' },
  },
  {
    path: '/concepts/polymorphism',
    html: polymorphism,
    title: 'OCaml Parametric Polymorphism | oCamlCase',
    description:
      'Parametric polymorphism in OCaml: type variables, generic functions like List.length and List.map, and the value restriction that keeps the type system sound.',
    nav: { group: 'Concepts', num: '7.', label: 'Polymorphism' },
  },
  {
    path: '/concepts/pattern-matching',
    html: patternMatching,
    title: 'OCaml Pattern Matching | oCamlCase',
    description:
      'Learn pattern matching in OCaml: the match expression, variant types, exhaustiveness checking, guards, and nested patterns.',
    nav: { group: 'Concepts', num: '8.', label: 'Pattern Matching' },
  },
  {
    path: '/concepts/lists',
    html: lists,
    title: 'OCaml Lists | oCamlCase',
    description:
      'Understand OCaml lists from the ground up: the two constructors, the recursive construction rule, tree representation, pattern matching, and recursive implementations of length, append, rev, and concat.',
    nav: { group: 'Concepts', num: '9.', label: 'Lists' },
  },
  {
    path: '/concepts/list-operations',
    html: listOperations,
    title: 'OCaml List Operations: Map, Filter, Exists | oCamlCase',
    description:
      'Build map, filter, and exists from scratch as recursive functions, see how they compare to imperative loops, and learn to pipe them together with the standard List module.',
    nav: { group: 'Concepts', num: '10.', label: 'List Operations' },
  },
  {
    path: '/concepts/higher-order',
    html: higherOrder,
    title: 'OCaml Higher-Order Functions | oCamlCase',
    description:
      'Learn higher-order functions in OCaml: map, filter, fold, the pipe operator, and how passing functions as arguments compares to dependency injection in OOP.',
    nav: { group: 'Concepts', num: '11.', label: 'Higher-Order Functions' },
  },
  {
    path: '/concepts/tail-recursion',
    html: tailRecursion,
    title: 'OCaml Tail Recursion | oCamlCase',
    description:
      'Understand tail recursion in OCaml: what tail position means, how the compiler optimizes tail calls, the accumulator pattern, and divergence.',
    nav: { group: 'Concepts', num: '12.', label: 'Tail Recursion' },
  },
  {
    path: '/concepts/iteration',
    html: iteration,
    title: 'OCaml Iteration Patterns | oCamlCase',
    description:
      'Learn definite and indefinite iteration in OCaml: how to apply a function n times with iter, and how to search for the first value satisfying a predicate with first.',
    nav: { group: 'Concepts', num: '13.', label: 'Iteration' },
  },
  {
    path: '/concepts/derived-forms',
    html: derivedForms,
    title: 'OCaml Derived Forms and Syntactic Sugar | oCamlCase',
    description:
      'See how OCaml syntax desugars to a small core: && and || are if-expressions, operators in parentheses are functions, and let f x = ... is sugar for fun.',
    nav: { group: 'Concepts', num: '14.', label: 'Derived Forms' },
  },
  {
    path: '/concepts/sorting',
    html: sorting,
    title: 'OCaml Sorting Algorithms | oCamlCase',
    description:
      'Learn about sorting algorithms in OCaml, including insertion sort, polymorphic sorting, and merge sort, and understand recursion trees.',
    nav: { group: 'Concepts', num: '15.', label: 'Sorting' },
  },
  {
    path: '/concepts/constructors-exceptions',
    html: constructorsExceptions,
    title: 'OCaml Variant Types and Exceptions | oCamlCase',
    description:
      'Understand variant types, structural recursion, exceptions, and option types for handling alternative data shapes and control flow.',
    nav: { group: 'Concepts', num: '16.', label: 'Constructors and Exceptions' },
  },
  {
    path: '/concepts/trees',
    html: trees,
    title: 'OCaml Trees and Structural Recursion | oCamlCase',
    description:
      'Explore rose trees, structural terminology, and computing properties of tree data structures recursively.',
    nav: { group: 'Concepts', num: '17.', label: 'Trees' },
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
