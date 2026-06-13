import type { CompleteExercise } from './types';

export const data: CompleteExercise = {
  kind: 'complete',
  id: 'fold-complete',
  title: 'Implement fold_left',
  difficulty: 'medium',
  conceptLink: { label: 'Higher-Order Functions', href: '/concepts/higher-order' },
  prompt:
    'Implement `fold_left` from scratch. It reduces a list to a single value ' +
    'by applying `f acc x` left to right. Do not use `List.fold_left`.',
  starterCode: `let rec fold_left f acc xs =
  failwith "TODO"`,
  tests: [
    {
      name: 'fold_left (+) 0 [] = 0',
      testCode: 'let () = Printf.printf "%d\\n" (fold_left ( + ) 0 [])',
      expected: '0',
    },
    {
      name: 'fold_left (+) 0 [1;2;3;4;5] = 15',
      testCode: 'let () = Printf.printf "%d\\n" (fold_left ( + ) 0 [1;2;3;4;5])',
      expected: '15',
    },
    {
      name: 'fold_left (*) 1 [1;2;3;4] = 24',
      testCode: 'let () = Printf.printf "%d\\n" (fold_left ( * ) 1 [1;2;3;4])',
      expected: '24',
    },
    {
      name: 'fold_left count 0 [_;_;_] = 3',
      testCode:
        'let () = Printf.printf "%d\\n" (fold_left (fun acc _ -> acc + 1) 0 [10;20;30])',
      expected: '3',
    },
  ],
  solution: `let rec fold_left f acc xs =
  match xs with
  | [] -> acc
  | x :: rest -> fold_left f (f acc x) rest`,
};
