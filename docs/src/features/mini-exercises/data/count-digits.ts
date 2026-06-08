import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'count-digits',
  title: 'Count digits',
  difficulty: 'medium',
  conceptLink: { label: 'Tail Recursion', href: '/concepts/tail-recursion' },
  category: 'recursion',
  filename: 'count_digits_exercise.ml',
  prompt:
    'Count the digits of a non-negative integer n by repeatedly dividing by 10. Use a tail-recursive helper with an accumulator. count_digits 0 returns 1.',
  prefixCode: [
    '(* Mini Exercise: Count digits',
    '   Tail-recursive division by 10. *)',
    '',
    '(* Fill in the body of count_digits below *)',
    'let count_digits (n : int) : int =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: count_digits 0     = 1 *)',
    '(* expected: count_digits 7     = 1 *)',
    '(* expected: count_digits 12345 = 5 *)',
    '',
    'let () =',
    '  Printf.printf "digits of 12345 = %d\\n" (count_digits 12345)',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let rec loop value acc =' },
    { id: 'b', code: '    if value < 10 then acc' },
    { id: 'c', code: '    else loop (value / 10) (acc + 1)' },
    { id: 'd', code: '  in loop n 1' },
  ],
  expectedOutput: 'digits of 12345 = 5',
};
