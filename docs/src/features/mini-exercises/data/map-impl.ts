import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'map-impl',
  title: 'Implement map',
  difficulty: 'medium',
  conceptLink: { label: 'List Operations', href: '/concepts/list-operations' },
  category: 'list-ops',
  filename: 'map_exercise.ml',
  prompt:
    'Implement map from scratch: for an empty list return []; for x :: rest, apply f to x and cons it onto the recursive result.',
  prefixCode: [
    '(* Mini Exercise: Implement map',
    '   Apply f to every element. Base case is [], recursive case uses ::. *)',
    '',
    '(* Fill in the match arms below *)',
    "let rec map (f : 'a -> 'b) (xs : 'a list) : 'b list =",
    '  match xs with',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: map double [1;2;3] = [2;4;6] *)',
    '',
    'let () =',
    '  let doubled = map (fun x -> x * 2) [1; 2; 3] in',
    '  let s = String.concat "; " (List.map string_of_int doubled) in',
    '  Printf.printf "map double [1;2;3] = [%s]\\n" s',
  ].join('\n'),
  items: [
    { id: 'a', code: '  | [] -> []' },
    { id: 'b', code: '  | x :: rest -> f x :: map f rest' },
  ],
  expectedOutput: 'map double [1;2;3] = [2;4;6]',
};
