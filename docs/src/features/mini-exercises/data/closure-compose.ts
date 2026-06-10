import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'closure-compose',
  title: 'Compose two functions',
  difficulty: 'medium',
  conceptLink: { label: 'Closures', href: '/concepts/closures' },
  category: 'closures',
  filename: 'closure_compose_exercise.ml',
  prompt:
    'compose f g returns a new function that applies g first, then f. The result is a closure capturing both f and g. Arrange the definitions and the final call.',
  prefixCode: [
    '(* Mini Exercise: Function composition',
    '   compose f g = fun x -> f (g x)',
    '   The composed function is a closure over f and g. *)',
    '',
    '(* Arrange the body of compose_demo in order *)',
    'let compose_demo () =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: result = 15 *)',
    '',
    'let () =',
    '  Printf.printf "result = %d\\n" (compose_demo ())',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let compose f g = fun x -> f (g x) in' },
    { id: 'b', code: '  let double x = x * 2 in' },
    { id: 'c', code: '  let succ x = x + 1 in' },
    { id: 'd', code: '  compose succ double 7' },
  ],
  expectedOutput: 'result = 15',
};
