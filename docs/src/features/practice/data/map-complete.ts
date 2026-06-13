import type { CompleteExercise } from './types';

export const data: CompleteExercise = {
  kind: 'complete',
  id: 'map-complete',
  title: 'Implement map',
  difficulty: 'easy',
  conceptLink: { label: 'Lists & Recursion', href: '/concepts/lists' },
  prompt:
    'Implement `map` from scratch using pattern matching and recursion. ' +
    'Do not use `List.map`.',
  starterCode: `let rec map f xs =
  failwith "TODO"`,
  tests: [
    {
      name: 'map over empty list returns []',
      testCode:
        'let () = Printf.printf "%d\\n" (List.length (map (fun x -> x + 1) []))',
      expected: '0',
    },
    {
      name: 'map (+1) head of [1;2;3] = 2',
      testCode:
        'let () = Printf.printf "%d\\n" (List.nth (map (fun x -> x + 1) [1;2;3]) 0)',
      expected: '2',
    },
    {
      name: 'map preserves length',
      testCode:
        'let () = Printf.printf "%d\\n" (List.length (map (fun x -> x * 2) [1;2;3;4;5]))',
      expected: '5',
    },
    {
      name: 'map (*3) sum of [1;2;3] = 18',
      testCode:
        'let () = Printf.printf "%d\\n" (List.fold_left ( + ) 0 (map (fun x -> x * 3) [1;2;3]))',
      expected: '18',
    },
  ],
  solution: `let rec map f xs =
  match xs with
  | [] -> []
  | x :: rest -> f x :: map f rest`,
};
