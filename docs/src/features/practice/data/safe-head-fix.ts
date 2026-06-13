import type { FixErrorExercise } from './types';

export const data: FixErrorExercise = {
  kind: 'fix-error',
  id: 'safe-head-fix',
  title: 'Fix the partial match',
  difficulty: 'easy',
  conceptLink: { label: 'Options & Result', href: '/concepts/options-result' },
  prompt:
    'This `head` function compiles but OCaml warns about a non-exhaustive match -- ' +
    'calling `head []` would raise a runtime exception. ' +
    'Rewrite it to return `int option` instead, so callers must handle the empty case.',
  starterCode: `let head xs =
  match xs with
  | x :: _ -> x`,
  tests: [
    {
      name: 'head [1;2;3] = Some 1',
      testCode:
        'let () = Printf.printf "%s\\n" (match head [1;2;3] with Some 1 -> "pass" | _ -> "fail")',
      expected: 'pass',
    },
    {
      name: 'head [] = None',
      testCode:
        'let () = Printf.printf "%s\\n" (match head [] with None -> "pass" | _ -> "fail")',
      expected: 'pass',
    },
    {
      name: 'head [42] = Some 42',
      testCode:
        'let () = Printf.printf "%s\\n" (match head [42] with Some 42 -> "pass" | _ -> "fail")',
      expected: 'pass',
    },
  ],
  solution: `let head xs =
  match xs with
  | [] -> None
  | x :: _ -> Some x`,
};
