import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'fold-sum',
  title: 'Sum of squares with fold',
  difficulty: 'medium',
  conceptLink: { label: 'Higher-Order Functions', href: '/concepts/higher-order' },
  category: 'higher-order',
  filename: 'fold_exercise.ml',
  prompt:
    'Arrange three lines: first square every element with map, then define an accumulating add function, then fold over the squared list starting from 0.',
  prefixCode: [
    '(* Mini Exercise: Sum of squares with fold_left',
    '   Map to get squares, then fold to sum them. *)',
    '',
    '(* Arrange the body of sum_of_squares in order *)',
    'let sum_of_squares (xs : int list) : int =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: sum_of_squares [1;2;3;4;5] = 55 *)',
    '',
    'let () =',
    '  Printf.printf "sum_of_squares [1;2;3;4;5] = %d\\n" (sum_of_squares [1;2;3;4;5])',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let squares = List.map (fun x -> x * x) xs in' },
    { id: 'b', code: '  let add acc x = acc + x in' },
    { id: 'c', code: '  List.fold_left add 0 squares' },
  ],
  expectedOutput: 'sum_of_squares [1;2;3;4;5] = 55',
};
