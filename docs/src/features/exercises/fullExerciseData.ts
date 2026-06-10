export type FullExercise = {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  concepts: string[];
  description: string;
  path: string;
};

export const fullExercises: FullExercise[] = [
  {
    id: 'playlist',
    title: 'Playlist',
    difficulty: 'easy',
    concepts: ['Lists', 'Higher-Order Functions', 'Tuples', 'Variant Types'],
    description:
      'Model a music playlist with tuples and variants. Filter by genre, format tracks, and compute durations using list operations.',
    path: '/exercises/playlist',
  },
  {
    id: 'bank',
    title: 'Bank Account',
    difficulty: 'medium',
    concepts: ['Variant Types', 'Records', 'List Fold', 'Immutability'],
    description:
      'Build a bank account model where balance is derived from transaction history using variant types, immutable records, and fold.',
    path: '/exercises/bank',
  },
  {
    id: 'search',
    title: 'Iteration & Search',
    difficulty: 'hard',
    concepts: ['Iteration', 'Currying', 'Partial Application', 'Tail Recursion'],
    description:
      'Implement iter for definite repetition and first for indefinite search, then derive specialized utilities via partial application.',
    path: '/exercises/search',
  },
  {
    id: 'phonebook',
    title: 'Phonebook',
    difficulty: 'easy',
    concepts: ['Lists', 'Closures', 'Higher-Order Functions'],
    description:
      'Build a phonebook with lookup, filtering by prefix, and formatting. Practice list operations with closures that capture search parameters.',
    path: '/exercises/phonebook',
  },
  {
    id: 'evaluator',
    title: 'Expression Evaluator',
    difficulty: 'hard',
    concepts: ['Variant Types', 'Pattern Matching', 'Structural Recursion', 'Trees'],
    description:
      'Define an arithmetic expression type and build an evaluator, pretty-printer, and simplifier using structural recursion on a tree-shaped variant.',
    path: '/exercises/evaluator',
  },
  {
    id: 'mergesort',
    title: 'Merge Sort',
    difficulty: 'medium',
    concepts: ['Sorting', 'Recursion', 'Lists', 'Pattern Matching', 'Polymorphism'],
    description:
      'Implement merge sort from scratch: split, merge, and sort. Make it polymorphic with a comparison function parameter.',
    path: '/exercises/mergesort',
  },
];
