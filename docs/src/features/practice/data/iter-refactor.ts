import type { RefactorExercise } from './types';

export const data: RefactorExercise = {
  kind: 'refactor',
  id: 'iter-refactor',
  title: 'Refactor: ref accumulator to map',
  difficulty: 'medium',
  conceptLink: { label: 'Higher-Order Functions', href: '/concepts/higher-order' },
  prompt:
    'This function doubles every element using a ref and List.rev, the imperative style. ' +
    'Rewrite `double_all` as a single expression using `List.map`. ' +
    'Signature: `val double_all : int list -> int list`.',
  starterCode: `let double_all xs =
  let result = ref [] in
  List.iter (fun x -> result := (x * 2) :: !result) xs;
  List.rev !result`,
  tests: [
    {
      name: 'double_all [] = []',
      testCode: 'let () = Printf.printf "%d\\n" (List.length (double_all []))',
      expected: '0',
    },
    {
      name: 'double_all [1;2;3] head = 2',
      testCode: 'let () = Printf.printf "%d\\n" (List.nth (double_all [1;2;3]) 0)',
      expected: '2',
    },
    {
      name: 'double_all [1;2;3] last = 6',
      testCode: 'let () = Printf.printf "%d\\n" (List.nth (double_all [1;2;3]) 2)',
      expected: '6',
    },
    {
      name: 'double_all preserves length',
      testCode: 'let () = Printf.printf "%d\\n" (List.length (double_all [1;2;3;4;5]))',
      expected: '5',
    },
  ],
  solution: `let double_all xs = List.map (fun x -> x * 2) xs`,
};
