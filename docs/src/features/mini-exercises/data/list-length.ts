import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'list-length',
  title: 'Recursive list length',
  difficulty: 'easy',
  conceptLink: { label: 'Lists', href: '/concepts/lists' },
  category: 'lists',
  filename: 'length_exercise.ml',
  prompt:
    'Implement length by pattern matching: the empty list has length 0, and a list with a head and tail has length 1 more than the tail.',
  prefixCode: [
    '(* Mini Exercise: Recursive list length',
    '   Match on [] for base case, _ :: rest for recursive case. *)',
    '',
    '(* Fill in the match arms below *)',
    'let rec length (xs : \'a list) : int =',
    '  match xs with',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: length [1;2;3;4;5] = 5 *)',
    '',
    'let () =',
    '  Printf.printf "length [1;2;3;4;5] = %d\\n" (length [1;2;3;4;5])',
  ].join('\n'),
  items: [
    { id: 'a', code: '  | [] -> 0' },
    { id: 'b', code: '  | _ :: rest -> 1 + length rest' },
  ],
  expectedOutput: 'length [1;2;3;4;5] = 5',
};
