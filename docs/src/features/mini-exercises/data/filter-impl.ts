import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'filter-impl',
  title: 'Implement filter',
  difficulty: 'medium',
  conceptLink: { label: 'List Operations', href: '/concepts/list-operations' },
  category: 'list-ops',
  filename: 'filter_exercise.ml',
  prompt:
    'Implement filter from scratch. Three cases: empty list, head passes predicate (keep it), head fails predicate (skip it). Use a guard pattern for the second case.',
  prefixCode: [
    '(* Mini Exercise: Implement filter',
    '   Keep elements where f returns true; skip the rest. *)',
    '',
    '(* Fill in the three match arms below *)',
    "let rec filter (f : 'a -> bool) (xs : 'a list) : 'a list =",
    '  match xs with',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: filter even [1;2;3;4;5] = [2;4] *)',
    '',
    'let () =',
    '  let evens = filter (fun x -> x mod 2 = 0) [1; 2; 3; 4; 5] in',
    '  let s = String.concat "; " (List.map string_of_int evens) in',
    '  Printf.printf "filter even [1;2;3;4;5] = [%s]\\n" s',
  ].join('\n'),
  items: [
    { id: 'a', code: '  | [] -> []' },
    { id: 'b', code: '  | x :: rest when f x -> x :: filter f rest' },
    { id: 'c', code: '  | _ :: rest -> filter f rest' },
  ],
  expectedOutput: 'filter even [1;2;3;4;5] = [2;4]',
};
