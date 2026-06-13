import type { CompleteExercise } from './types';

export const data: CompleteExercise = {
  kind: 'complete',
  id: 'zip-complete',
  title: 'Implement zip',
  difficulty: 'hard',
  conceptLink: { label: 'Lists & Recursion', href: '/concepts/lists' },
  prompt:
    'Implement `zip` which pairs elements from two lists. ' +
    'Stop when the shorter list runs out. ' +
    'Do not use `List.combine`.',
  starterCode: `let rec zip a b =
  failwith "TODO"`,
  tests: [
    {
      name: 'zip [] [] = []',
      testCode: 'let () = Printf.printf "%d\\n" (List.length (zip [] []))',
      expected: '0',
    },
    {
      name: 'zip [1;2] ["a";"b"] has length 2',
      testCode:
        'let () = Printf.printf "%d\\n" (List.length (zip [1;2] ["a";"b"]))',
      expected: '2',
    },
    {
      name: 'first pair of zip [1;2] ["a";"b"] = (1,"a")',
      testCode:
        'let () = let (n, s) = List.nth (zip [1;2] ["a";"b"]) 0 in Printf.printf "%d%s\\n" n s',
      expected: '1a',
    },
    {
      name: 'zip stops at shorter list',
      testCode:
        'let () = Printf.printf "%d\\n" (List.length (zip [1;2;3] ["x"]))',
      expected: '1',
    },
  ],
  solution: `let rec zip a b =
  match a, b with
  | [], _ | _, [] -> []
  | x :: xs, y :: ys -> (x, y) :: zip xs ys`,
};
