import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'insert-sorted',
  title: 'Insert into sorted list',
  difficulty: 'medium',
  conceptLink: { label: 'Sorting', href: '/concepts/sorting' },
  category: 'sorting',
  filename: 'insert_sorted_exercise.ml',
  prompt:
    'Insert a value into a sorted list, preserving the order. Handle the empty list, the case where x belongs at the front, and the recursive case.',
  prefixCode: [
    '(* Mini Exercise: Insertion sort helper',
    '   insert x into a sorted list so it stays sorted. *)',
    '',
    '(* Arrange the match arms of insert *)',
    'let rec insert x ys =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: [1; 2; 3; 4; 5] *)',
    '',
    'let () =',
    '  let result = insert 3 [1; 2; 4; 5] in',
    '  Printf.printf "[%s]\\n"',
    '    (String.concat "; " (List.map string_of_int result))',
  ].join('\n'),
  items: [
    { id: 'a', code: '  match ys with' },
    { id: 'b', code: '  | [] -> [x]' },
    { id: 'c', code: '  | y :: rest when x <= y -> x :: y :: rest' },
    { id: 'd', code: '  | y :: rest -> y :: insert x rest' },
  ],
  expectedOutput: '[1; 2; 3; 4; 5]',
};
