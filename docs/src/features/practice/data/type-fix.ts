import type { FixErrorExercise } from './types';

export const data: FixErrorExercise = {
  kind: 'fix-error',
  id: 'type-fix',
  title: 'Type mismatch in arithmetic',
  difficulty: 'medium',
  conceptLink: { label: 'Type Inference', href: '/concepts/type-inference' },
  prompt:
    'OCaml does not coerce types automatically. ' +
    'This function tries to add a string and an int, causing a type error. ' +
    'Fix it so `double_parse` converts a string to int and doubles it.',
  starterCode: `let double_parse s =
  s + s`,
  tests: [
    {
      name: 'double_parse "3" = 6',
      testCode: 'let () = Printf.printf "%d\\n" (double_parse "3")',
      expected: '6',
    },
    {
      name: 'double_parse "0" = 0',
      testCode: 'let () = Printf.printf "%d\\n" (double_parse "0")',
      expected: '0',
    },
    {
      name: 'double_parse "10" = 20',
      testCode: 'let () = Printf.printf "%d\\n" (double_parse "10")',
      expected: '20',
    },
  ],
  solution: `let double_parse s =
  let n = int_of_string s in
  n + n`,
};
