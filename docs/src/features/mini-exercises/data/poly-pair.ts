import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'poly-pair',
  title: 'Polymorphic pairs',
  difficulty: 'easy',
  conceptLink: { label: 'Polymorphism', href: '/concepts/polymorphism' },
  category: 'polymorphism',
  filename: 'poly_pair_exercise.ml',
  prompt:
    'make_pair is polymorphic: it works with any two types. Use it to create pairs of different types. Arrange the three steps.',
  prefixCode: [
    '(* Mini Exercise: Parametric polymorphism',
    '   make_pair : \'a -> \'b -> \'a * \'b',
    '   The same function works at any pair of types. *)',
    '',
    '(* Arrange the body of poly_demo in order *)',
    'let poly_demo () =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: (1, hello) and (true, 3.14) *)',
    '',
    'let () =',
    '  let (a, b) = fst (poly_demo ()) in',
    '  let (c, d) = snd (poly_demo ()) in',
    '  Printf.printf "(%d, %s) and (%b, %.2f)\\n" a b c d',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let make_pair a b = (a, b) in' },
    { id: 'b', code: '  let p1 = make_pair 1 "hello" in' },
    { id: 'c', code: '  (p1, make_pair true 3.14)' },
  ],
  expectedOutput: '(1, hello) and (true, 3.14)',
};
