import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'result-validate',
  title: 'Validate with result',
  difficulty: 'medium',
  conceptLink: { label: 'Options and Result', href: '/concepts/options-result' },
  category: 'options',
  filename: 'result_validate_exercise.ml',
  prompt:
    'A result carries a payload in both arms. Match the Ok case first, then the Error case, to turn a validation result into a message.',
  prefixCode: [
    '(* Mini Exercise: Result',
    "   type ('a, 'e) result = Ok of 'a | Error of 'e *)",
    '',
    'let validate_age n =',
    '  if n < 0 then Error "negative"',
    '  else if n > 150 then Error "implausible"',
    '  else Ok n',
    '',
    '(* Arrange the body of describe: Ok arm first *)',
  ].join('\n'),
  suffixCode: [
    '',
    'let () =',
    '  Printf.printf "%s; %s\\n" (describe 30) (describe (-3))',
  ].join('\n'),
  items: [
    { id: 'a', code: 'let describe n =' },
    { id: 'b', code: '  match validate_age n with' },
    { id: 'c', code: '  | Ok age -> "age " ^ string_of_int age' },
    { id: 'd', code: '  | Error msg -> "invalid: " ^ msg' },
  ],
  expectedOutput: 'age 30; invalid: negative',
};
