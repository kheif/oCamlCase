import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'partial-app',
  title: 'Partial application',
  difficulty: 'easy',
  conceptLink: { label: 'Currying', href: '/concepts/currying' },
  category: 'currying',
  filename: 'partial_app_exercise.ml',
  prompt:
    'Define a two-argument multiply function, then partially apply it to get double, then call double. Arrange the three lines so each name is defined before it is used.',
  prefixCode: [
    '(* Mini Exercise: Partial application',
    '   Partially applying multiply to 2 produces a one-argument function. *)',
    '',
    '(* Arrange the three lines in the right order *)',
    'let result =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: result = 14 *)',
    '',
    'let () =',
    '  Printf.printf "result = %d\\n" result',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let multiply x y = x * y in' },
    { id: 'b', code: '  let double = multiply 2 in' },
    { id: 'c', code: '  double 7' },
  ],
  expectedOutput: 'result = 14',
};
