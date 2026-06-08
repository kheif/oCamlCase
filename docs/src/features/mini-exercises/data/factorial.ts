import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'factorial',
  title: 'Factorial with iter',
  difficulty: 'easy',
  conceptLink: { label: 'Iteration', href: '/concepts/iteration' },
  category: 'iteration',
  filename: 'factorial_exercise.ml',
  prompt:
    'Use iter to compute n!. Iterate over a pair (i, acc): each step multiplies acc by i and increments i.',
  prefixCode: [
    '(* Mini Exercise: Factorial with iter',
    '   Use iter to compute n!. Iterate over a pair (i, acc):',
    '   each step multiplies acc by i and increments i. *)',
    '',
    "(* iter : ('a -> 'a) -> int -> 'a -> 'a *)",
    'let rec iter f n x =',
    '  if n = 0 then x else iter f (n - 1) (f x)',
    '',
    '(* Fill in the missing lines below *)',
    'let factorial (n : int) : int =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: factorial 5 = 120 *)',
    '(* expected: factorial 0 = 1   *)',
    '',
    'let () =',
    '  Printf.printf "factorial %d = %d\\n" 5 (factorial 5)',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let step (i, acc) = (i + 1, acc * i) in' },
    { id: 'b', code: '  let _, result = iter step n (1, 1) in' },
    { id: 'c', code: '  result' },
  ],
  expectedOutput: 'factorial 5 = 120',
};
