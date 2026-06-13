import type { RefactorExercise } from './types';

export const data: RefactorExercise = {
  kind: 'refactor',
  id: 'max-refactor',
  title: 'Refactor: find max with fold',
  difficulty: 'hard',
  conceptLink: { label: 'Higher-Order Functions', href: '/concepts/higher-order' },
  prompt:
    'This function finds the maximum element using a ref and a loop. ' +
    'Rewrite `list_max` as a single expression using `List.fold_left`. ' +
    'Assume the list is non-empty. Signature: `val list_max : int list -> int`.',
  starterCode: `let list_max xs =
  let m = ref (List.hd xs) in
  List.iter (fun x -> if x > !m then m := x) xs;
  !m`,
  tests: [
    {
      name: 'list_max [1] = 1',
      testCode: 'let () = Printf.printf "%d\\n" (list_max [1])',
      expected: '1',
    },
    {
      name: 'list_max [3;1;4;1;5;9;2;6] = 9',
      testCode: 'let () = Printf.printf "%d\\n" (list_max [3;1;4;1;5;9;2;6])',
      expected: '9',
    },
    {
      name: 'list_max [-5;-1;-3] = -1',
      testCode: 'let () = Printf.printf "%d\\n" (list_max [-5;-1;-3])',
      expected: '-1',
    },
    {
      name: 'list_max [7;7;7] = 7',
      testCode: 'let () = Printf.printf "%d\\n" (list_max [7;7;7])',
      expected: '7',
    },
  ],
  solution: `let list_max xs =
  List.fold_left (fun m x -> if x > m then x else m) (List.hd xs) (List.tl xs)`,
};
