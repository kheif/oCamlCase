import type { RefactorExercise } from './types';

export const data: RefactorExercise = {
  kind: 'refactor',
  id: 'loop-refactor',
  title: 'Refactor: while loop to fold',
  difficulty: 'medium',
  conceptLink: { label: 'Iteration', href: '/concepts/iteration' },
  prompt:
    'This function uses a mutable reference and a while loop, the imperative style. ' +
    'Rewrite `product` as a single expression using `List.fold_left`. ' +
    'The signature must stay: `val product : int list -> int`.',
  starterCode: `let product xs =
  let result = ref 1 in
  let lst = ref xs in
  while !lst <> [] do
    result := !result * List.hd !lst;
    lst := List.tl !lst
  done;
  !result`,
  tests: [
    {
      name: 'product [] = 1',
      testCode: 'let () = Printf.printf "%d\\n" (product [])',
      expected: '1',
    },
    {
      name: 'product [1;2;3;4] = 24',
      testCode: 'let () = Printf.printf "%d\\n" (product [1;2;3;4])',
      expected: '24',
    },
    {
      name: 'product [5] = 5',
      testCode: 'let () = Printf.printf "%d\\n" (product [5])',
      expected: '5',
    },
    {
      name: 'product [2;3;5] = 30',
      testCode: 'let () = Printf.printf "%d\\n" (product [2;3;5])',
      expected: '30',
    },
  ],
  solution: `let product xs = List.fold_left ( * ) 1 xs`,
  signature: 'val product : int list -> int',
};
