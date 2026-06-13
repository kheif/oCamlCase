import type { CompleteExercise } from './types';

export const data: CompleteExercise = {
  kind: 'complete',
  id: 'filter-complete',
  title: 'Implement filter',
  difficulty: 'easy',
  conceptLink: { label: 'Lists & Recursion', href: '/concepts/lists' },
  prompt:
    'Implement `filter` from scratch using pattern matching and recursion. ' +
    'Return a list of all elements for which `pred` returns true. ' +
    'Do not use `List.filter`.',
  starterCode: `let rec filter pred xs =
  failwith "TODO"`,
  tests: [
    {
      name: 'filter on empty list returns []',
      testCode:
        'let () = Printf.printf "%d\\n" (List.length (filter (fun x -> x > 0) []))',
      expected: '0',
    },
    {
      name: 'filter (>2) [1;2;3;4] = [3;4]',
      testCode:
        'let () = Printf.printf "%d\\n" (List.length (filter (fun x -> x > 2) [1;2;3;4]))',
      expected: '2',
    },
    {
      name: 'first element of filter (>2) [1;2;3;4] = 3',
      testCode:
        'let () = Printf.printf "%d\\n" (List.nth (filter (fun x -> x > 2) [1;2;3;4]) 0)',
      expected: '3',
    },
    {
      name: 'filter even numbers from [1;2;3;4;5;6]',
      testCode:
        'let () = Printf.printf "%d\\n" (List.length (filter (fun x -> x mod 2 = 0) [1;2;3;4;5;6]))',
      expected: '3',
    },
  ],
  solution: `let rec filter pred xs =
  match xs with
  | [] -> []
  | x :: rest ->
    if pred x then x :: filter pred rest
    else filter pred rest`,
};
