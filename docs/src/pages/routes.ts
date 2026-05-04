import home from '../pages-content/home.html?raw';
import cheatsheet from '../pages-content/cheatsheet.html?raw';
import bindings from '../pages-content/concepts/bindings.html?raw';
import currying from '../pages-content/concepts/currying.html?raw';
import abstractions from '../pages-content/concepts/abstractions.html?raw';
import lexicalScope from '../pages-content/concepts/lexical-scope.html?raw';
import closures from '../pages-content/concepts/closures.html?raw';
import typeInference from '../pages-content/concepts/type-inference.html?raw';
import polymorphism from '../pages-content/concepts/polymorphism.html?raw';
import patternMatching from '../pages-content/concepts/pattern-matching.html?raw';
import lists from '../pages-content/concepts/lists.html?raw';
import listOperations from '../pages-content/concepts/list-operations.html?raw';
import higherOrder from '../pages-content/concepts/higher-order.html?raw';
import tailRecursion from '../pages-content/concepts/tail-recursion.html?raw';
import iteration from '../pages-content/concepts/iteration.html?raw';
import derivedForms from '../pages-content/concepts/derived-forms.html?raw';
import bank from '../pages-content/exercises/bank.html?raw';
import playlist from '../pages-content/exercises/playlist.html?raw';
import search from '../pages-content/exercises/search.html?raw';

export type ContentRoute = {
  path: string;
  html: string;
  title: string;
  description: string;
};

export const contentRoutes: ContentRoute[] = [
  {
    path: '/',
    html: home,
    title: 'Learn OCaml by Example | oCamlCase',
    description:
      'A practical guide to OCaml with functional patterns, type system features, and coding exercises. Written for programmers who want to understand the language.',
  },
  {
    path: '/cheatsheet',
    html: cheatsheet,
    title: 'Cheat Sheet | oCamlCase',
    description:
      'Quick reference for OCaml syntax: bindings, types, functions, pattern matching, lists, modules, and I/O.',
  },
  {
    path: '/concepts/bindings',
    html: bindings,
    title: 'Bindings | oCamlCase',
    description:
      'Understand let bindings in OCaml: how names are linked to values, local let ... in scoping, shadowing as a substitute for assignment, and opt-in mutability with refs.',
  },
  {
    path: '/concepts/currying',
    html: currying,
    title: 'Currying | oCamlCase',
    description:
      'Understand currying in OCaml: how every function takes exactly one argument, what partial application is, and how labeled arguments change the picture.',
  },
  {
    path: '/concepts/abstractions',
    html: abstractions,
    title: 'Abstractions | oCamlCase',
    description:
      'Learn how OCaml uses anonymous functions (abstractions) as first-class values, and how let bindings are just syntactic sugar for naming them.',
  },
  {
    path: '/concepts/lexical-scope',
    html: lexicalScope,
    title: 'Lexical Scope | oCamlCase',
    description:
      'Reason about names in OCaml: defining vs. using occurrences, bound vs. free occurrences, lexical binding, and the sanitization conditions that make substitution safe.',
  },
  {
    path: '/concepts/closures',
    html: closures,
    title: 'Closures | oCamlCase',
    description:
      'Learn how OCaml represents function values as closures: a tuple of argument, body, and captured environment. See why recursive functions also store their own name.',
  },
  {
    path: '/concepts/type-inference',
    html: typeInference,
    title: 'Type Inference | oCamlCase',
    description:
      'How OCaml infers the most general type for every binding using Hindley-Milner: how constraints propagate, when type variables appear, and when annotations help.',
  },
  {
    path: '/concepts/polymorphism',
    html: polymorphism,
    title: 'Polymorphism | oCamlCase',
    description:
      'Parametric polymorphism in OCaml: type variables, generic functions like List.length and List.map, and the value restriction that keeps the type system sound.',
  },
  {
    path: '/concepts/pattern-matching',
    html: patternMatching,
    title: 'Pattern Matching | oCamlCase',
    description:
      'Learn pattern matching in OCaml: the match expression, variant types, exhaustiveness checking, guards, and nested patterns.',
  },
  {
    path: '/concepts/lists',
    html: lists,
    title: 'Lists | oCamlCase',
    description:
      'Understand OCaml lists from the ground up: the two constructors, the recursive construction rule, tree representation, pattern matching, and recursive implementations of length, append, rev, and concat.',
  },
  {
    path: '/concepts/list-operations',
    html: listOperations,
    title: 'List Operations | oCamlCase',
    description:
      'Build map, filter, and exists from scratch as recursive functions, see how they compare to imperative loops, and learn to pipe them together with the standard List module.',
  },
  {
    path: '/concepts/higher-order',
    html: higherOrder,
    title: 'Higher-Order Functions | oCamlCase',
    description:
      'Learn higher-order functions in OCaml: map, filter, fold, the pipe operator, and how passing functions as arguments compares to dependency injection in OOP.',
  },
  {
    path: '/concepts/tail-recursion',
    html: tailRecursion,
    title: 'Tail Recursion | oCamlCase',
    description:
      'Understand tail recursion in OCaml: what tail position means, how the compiler optimizes tail calls, the accumulator pattern, and divergence.',
  },
  {
    path: '/concepts/iteration',
    html: iteration,
    title: 'Iteration | oCamlCase',
    description:
      'Learn definite and indefinite iteration in OCaml: how to apply a function n times with iter, and how to search for the first value satisfying a predicate with first.',
  },
  {
    path: '/concepts/derived-forms',
    html: derivedForms,
    title: 'Derived Forms | oCamlCase',
    description:
      'See how OCaml syntax desugars to a small core: && and || are if-expressions, operators in parentheses are functions, and let f x = ... is sugar for fun.',
  },
  {
    path: '/exercises/bank',
    html: bank,
    title: 'Bank Account | oCamlCase',
    description:
      'Practice OCaml variant types, immutable records, and list folds by building a bank account model that derives balance from transaction history.',
  },
  {
    path: '/exercises/playlist',
    html: playlist,
    title: 'Playlist | oCamlCase',
    description:
      'Practice OCaml list operations, higher-order functions, and tuple destructuring by building a music playlist with filtering, formatting, and duration calculation.',
  },
  {
    path: '/exercises/search',
    html: search,
    title: 'Search | oCamlCase',
    description:
      'Practice OCaml iteration patterns: implement iter for definite repetition and first for indefinite search, then use them to solve concrete problems with partial application.',
  },
];
