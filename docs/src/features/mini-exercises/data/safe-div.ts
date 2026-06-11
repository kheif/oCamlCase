import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'safe-div',
  title: 'Safe division with option',
  difficulty: 'easy',
  conceptLink: { label: 'Options and Result', href: '/concepts/options-result' },
  category: 'options',
  filename: 'safe_div_exercise.ml',
  prompt:
    'Division by zero should not crash. Return None when the divisor is 0, and Some quotient otherwise.',
  prefixCode: [
    '(* Mini Exercise: Safe division',
    '   type \'a option = None | Some of \'a *)',
    '',
    '(* Arrange the body of safe_div *)',
  ].join('\n'),
  suffixCode: [
    '',
    'let show = function',
    '  | None -> "undefined"',
    '  | Some q -> string_of_int q',
    '',
    'let () =',
    '  Printf.printf "10/2 = %s, 10/0 = %s\\n"',
    '    (show (safe_div 10 2)) (show (safe_div 10 0))',
  ].join('\n'),
  items: [
    { id: 'a', code: 'let safe_div a b =' },
    { id: 'b', code: '  if b = 0 then None' },
    { id: 'c', code: '  else Some (a / b)' },
  ],
  expectedOutput: '10/2 = 5, 10/0 = undefined',
};
