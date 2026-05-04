export type NavLink = {
  num: string;
  label: string;
  path: string;
};

export type NavGroup = {
  label: string;
  links: NavLink[];
};

export const navGroups: NavGroup[] = [
  {
    label: 'Start here',
    links: [
      { num: '·', label: 'Home', path: '/' },
      { num: '·', label: 'Cheat Sheet', path: '/cheatsheet' },
    ],
  },
  {
    label: 'Concepts',
    links: [
      { num: '1.', label: 'Bindings', path: '/concepts/bindings' },
      { num: '2.', label: 'Currying', path: '/concepts/currying' },
      { num: '3.', label: 'Abstractions', path: '/concepts/abstractions' },
      { num: '4.', label: 'Lexical Scope', path: '/concepts/lexical-scope' },
      { num: '5.', label: 'Closures', path: '/concepts/closures' },
      { num: '6.', label: 'Type Inference', path: '/concepts/type-inference' },
      { num: '7.', label: 'Polymorphism', path: '/concepts/polymorphism' },
      { num: '8.', label: 'Pattern Matching', path: '/concepts/pattern-matching' },
      { num: '9.', label: 'Lists', path: '/concepts/lists' },
      { num: '10.', label: 'List Operations', path: '/concepts/list-operations' },
      { num: '11.', label: 'Higher-Order Functions', path: '/concepts/higher-order' },
      { num: '12.', label: 'Tail Recursion', path: '/concepts/tail-recursion' },
      { num: '13.', label: 'Iteration', path: '/concepts/iteration' },
      { num: '14.', label: 'Derived Forms', path: '/concepts/derived-forms' },
    ],
  },
  {
    label: 'Exercises',
    links: [
      { num: 'E1.', label: 'Bank Account', path: '/exercises/bank' },
      { num: 'E2.', label: 'Playlist', path: '/exercises/playlist' },
      { num: 'E3.', label: 'Search', path: '/exercises/search' },
      { num: '·', label: 'Mini Exercises', path: '/exercises/mini' },
    ],
  },
];

export const topbarLinks: { label: string; path: string; matchPrefix?: string }[] = [
  { label: 'Home', path: '/' },
  { label: 'Cheat Sheet', path: '/cheatsheet' },
  { label: 'Concepts', path: '/concepts/bindings', matchPrefix: '/concepts/' },
  { label: 'Playground', path: '/playground' },
];
