import type { FixErrorExercise } from './types';

export const data: FixErrorExercise = {
  kind: 'fix-error',
  id: 'match-fix',
  title: 'Exhaustive option match',
  difficulty: 'easy',
  conceptLink: { label: 'Pattern Matching', href: '/concepts/pattern-matching' },
  prompt:
    'This function only handles `Some n` but not `None`. ' +
    'Fix it so it returns 0 when the input is `None`.',
  starterCode: `let unwrap_or_zero opt =
  match opt with
  | Some n -> n`,
  tests: [
    {
      name: 'unwrap_or_zero (Some 42) = 42',
      testCode: 'let () = Printf.printf "%d\\n" (unwrap_or_zero (Some 42))',
      expected: '42',
    },
    {
      name: 'unwrap_or_zero None = 0',
      testCode: 'let () = Printf.printf "%d\\n" (unwrap_or_zero None)',
      expected: '0',
    },
    {
      name: 'unwrap_or_zero (Some 0) = 0',
      testCode: 'let () = Printf.printf "%d\\n" (unwrap_or_zero (Some 0))',
      expected: '0',
    },
  ],
  solution: `let unwrap_or_zero opt =
  match opt with
  | Some n -> n
  | None -> 0`,
};
