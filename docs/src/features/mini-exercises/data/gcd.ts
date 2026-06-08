import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'gcd',
  title: 'Euclidean gcd',
  difficulty: 'medium',
  conceptLink: { label: 'Tail Recursion', href: '/concepts/tail-recursion' },
  category: 'recursion',
  filename: 'gcd_exercise.ml',
  prompt:
    'Implement gcd using the Euclidean algorithm: when b is 0 the answer is a, otherwise recurse with (b, a mod b). The recursive call is in tail position.',
  prefixCode: [
    '(* Mini Exercise: Euclidean gcd',
    '   When b is 0 the answer is a;',
    '   otherwise gcd a b = gcd b (a mod b). *)',
    '',
    '(* Fill in the body of gcd below *)',
    'let rec gcd (a : int) (b : int) : int =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: gcd 48 36 = 12 *)',
    '(* expected: gcd 17 5  = 1  *)',
    '',
    'let () =',
    '  Printf.printf "gcd 48 36 = %d\\n" (gcd 48 36)',
  ].join('\n'),
  items: [
    { id: 'a', code: '  if b = 0 then a' },
    { id: 'b', code: '  else gcd b (a mod b)' },
  ],
  expectedOutput: 'gcd 48 36 = 12',
};
