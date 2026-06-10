import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'anon-apply',
  title: 'Anonymous functions',
  difficulty: 'easy',
  conceptLink: { label: 'Abstractions', href: '/concepts/abstractions' },
  category: 'abstractions',
  filename: 'anon_apply_exercise.ml',
  prompt:
    'Use fun to define a named function, apply an anonymous function inline, then combine the results. Arrange the three bindings in the right order.',
  prefixCode: [
    '(* Mini Exercise: Anonymous function application',
    '   fun x -> ... creates a function value; you can apply it immediately. *)',
    '',
    '(* Arrange the body of anon_demo in order *)',
    'let anon_demo () =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: result = 36 *)',
    '',
    'let () =',
    '  Printf.printf "result = %d\\n" (anon_demo ())',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let square = fun x -> x * x in' },
    { id: 'b', code: '  let result = (fun x -> x + 1) 5 in' },
    { id: 'c', code: '  square result' },
  ],
  expectedOutput: 'result = 36',
};
