import type { RefactorExercise } from './types';

export const data: RefactorExercise = {
  kind: 'refactor',
  id: 'sum-refactor',
  title: 'Refactor: ref loop to fold',
  difficulty: 'medium',
  conceptLink: { label: 'Mutability', href: '/concepts/mutability' },
  prompt:
    'This function sums a list using a mutable ref and a loop -- the imperative style. ' +
    'Rewrite it as a single expression using `List.fold_left`. ' +
    'The function signature must stay the same: `val sum : int list -> int`.',
  starterCode: `let sum xs =
  let total = ref 0 in
  List.iter (fun x -> total := !total + x) xs;
  !total`,
  tests: [
    {
      name: 'sum [] = 0',
      testCode: 'let () = Printf.printf "%d\\n" (sum [])',
      expected: '0',
    },
    {
      name: 'sum [1;2;3;4;5] = 15',
      testCode: 'let () = Printf.printf "%d\\n" (sum [1;2;3;4;5])',
      expected: '15',
    },
    {
      name: 'sum [10] = 10',
      testCode: 'let () = Printf.printf "%d\\n" (sum [10])',
      expected: '10',
    },
    {
      name: 'sum [-1;1] = 0',
      testCode: 'let () = Printf.printf "%d\\n" (sum [-1;1])',
      expected: '0',
    },
  ],
  solution: `let sum xs = List.fold_left ( + ) 0 xs`,
  signature: 'val sum : int list -> int',
};
