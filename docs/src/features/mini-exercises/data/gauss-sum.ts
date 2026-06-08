import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'gauss-sum',
  title: 'Sum 1..n with iter',
  difficulty: 'easy',
  conceptLink: { label: 'Iteration', href: '/concepts/iteration' },
  category: 'iteration',
  filename: 'gauss_exercise.ml',
  prompt:
    'Use iter to compute 1 + 2 + ... + n. Iterate over a pair (i, total): each step advances i and adds it to the running total.',
  prefixCode: [
    '(* Mini Exercise: Gauss sum with iter',
    '   Compute 1 + 2 + ... + n by iterating over (i, total). *)',
    '',
    "(* iter : ('a -> 'a) -> int -> 'a -> 'a *)",
    'let rec iter f n x =',
    '  if n = 0 then x else iter f (n - 1) (f x)',
    '',
    '(* Fill in the missing lines below *)',
    'let gauss (n : int) : int =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: gauss 10  = 55   *)',
    '(* expected: gauss 100 = 5050 *)',
    '',
    'let () =',
    '  Printf.printf "gauss %d = %d\\n" 100 (gauss 100)',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let step (i, total) = (i + 1, total + i) in' },
    { id: 'b', code: '  let _, total = iter step n (1, 0) in' },
    { id: 'c', code: '  total' },
  ],
  expectedOutput: 'gauss 100 = 5050',
};
