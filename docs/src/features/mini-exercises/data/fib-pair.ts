import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'fib-pair',
  title: 'Fibonacci with a pair accumulator',
  difficulty: 'medium',
  conceptLink: { label: 'Iteration', href: '/concepts/iteration' },
  category: 'iteration',
  filename: 'fib_exercise.ml',
  prompt:
    'Compute the n-th Fibonacci number using iter and a pair (a, b). Each step shifts the window: (a, b) becomes (b, a + b). The answer is the first element after n steps.',
  prefixCode: [
    '(* Mini Exercise: Fibonacci with a pair accumulator',
    '   Iterate (a, b) -> (b, a + b) starting at (0, 1). *)',
    '',
    "(* iter : ('a -> 'a) -> int -> 'a -> 'a *)",
    'let rec iter f n x =',
    '  if n = 0 then x else iter f (n - 1) (f x)',
    '',
    '(* Fill in the missing lines below *)',
    'let fib (n : int) : int =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: fib 0  = 0  *)',
    '(* expected: fib 10 = 55 *)',
    '',
    'let () =',
    '  Printf.printf "fib 10 = %d\\n" (fib 10)',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let step (a, b) = (b, a + b) in' },
    { id: 'b', code: '  let a, _ = iter step n (0, 1) in' },
    { id: 'c', code: '  a' },
  ],
  expectedOutput: 'fib 10 = 55',
};
