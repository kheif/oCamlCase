import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'power',
  title: 'Integer power with iter',
  difficulty: 'easy',
  conceptLink: { label: 'Iteration', href: '/concepts/iteration' },
  category: 'iteration',
  filename: 'power_exercise.ml',
  prompt:
    'Use iter to compute base raised to the n-th power. Each step multiplies the running value by base.',
  prefixCode: [
    '(* Mini Exercise: Integer power with iter',
    '   Compute base ^ n using repeated multiplication. *)',
    '',
    "(* iter : ('a -> 'a) -> int -> 'a -> 'a *)",
    'let rec iter f n x =',
    '  if n = 0 then x else iter f (n - 1) (f x)',
    '',
    '(* Fill in the missing line below *)',
    'let power (base : int) (n : int) : int =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: power 2 10 = 1024 *)',
    '(* expected: power 3 0  = 1    *)',
    '',
    'let () =',
    '  Printf.printf "power 2 10 = %d\\n" (power 2 10)',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let mul x = x * base in' },
    { id: 'b', code: '  iter mul n 1' },
  ],
  expectedOutput: 'power 2 10 = 1024',
};
