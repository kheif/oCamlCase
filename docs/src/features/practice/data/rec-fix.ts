import type { FixErrorExercise } from './types';

export const data: FixErrorExercise = {
  kind: 'fix-error',
  id: 'rec-fix',
  title: 'Missing rec keyword',
  difficulty: 'easy',
  conceptLink: { label: 'Recursion', href: '/concepts/tail-recursion' },
  prompt:
    'In OCaml, a function must be declared with `let rec` to call itself. ' +
    'This factorial function is missing `rec`. Fix it.',
  starterCode: `let fact n =
  if n <= 1 then 1
  else n * fact (n - 1)`,
  tests: [
    {
      name: 'fact 0 = 1',
      testCode: 'let () = Printf.printf "%d\\n" (fact 0)',
      expected: '1',
    },
    {
      name: 'fact 1 = 1',
      testCode: 'let () = Printf.printf "%d\\n" (fact 1)',
      expected: '1',
    },
    {
      name: 'fact 5 = 120',
      testCode: 'let () = Printf.printf "%d\\n" (fact 5)',
      expected: '120',
    },
    {
      name: 'fact 6 = 720',
      testCode: 'let () = Printf.printf "%d\\n" (fact 6)',
      expected: '720',
    },
  ],
  solution: `let rec fact n =
  if n <= 1 then 1
  else n * fact (n - 1)`,
};
