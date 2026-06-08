import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'first-multiple',
  title: 'First multiple of k from start',
  difficulty: 'easy',
  conceptLink: { label: 'Iteration', href: '/concepts/iteration' },
  category: 'iteration',
  filename: 'first_multiple_exercise.ml',
  prompt:
    'Use first to find the smallest integer at or above start that is divisible by k. The predicate just checks the remainder.',
  prefixCode: [
    '(* Mini Exercise: First multiple of k from start',
    '   Use the indefinite-iteration helper first. *)',
    '',
    '(* first : (int -> bool) -> int -> int *)',
    'let rec first pred start =',
    '  if pred start then start',
    '  else first pred (start + 1)',
    '',
    '(* Fill in the missing lines below *)',
    'let first_multiple (k : int) (start : int) : int =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: first_multiple 7  50 = 56 *)',
    '(* expected: first_multiple 10 23 = 30 *)',
    '',
    'let () =',
    '  Printf.printf "first multiple of 7 from 50 = %d\\n"',
    '    (first_multiple 7 50)',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let divides x = x mod k = 0 in' },
    { id: 'b', code: '  first divides start' },
  ],
  expectedOutput: 'first multiple of 7 from 50 = 56',
};
