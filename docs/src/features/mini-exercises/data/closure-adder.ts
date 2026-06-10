import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'closure-adder',
  title: 'Build an adder',
  difficulty: 'easy',
  conceptLink: { label: 'Closures', href: '/concepts/closures' },
  category: 'closures',
  filename: 'closure_adder_exercise.ml',
  prompt:
    'make_adder takes n and returns a function that adds n to its argument. The returned function is a closure that captures n. Arrange the three steps.',
  prefixCode: [
    '(* Mini Exercise: Closures',
    '   A closure captures free variables from its environment. *)',
    '',
    '(* Arrange the body of closure_demo in order *)',
    'let closure_demo () =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: result = 17 *)',
    '',
    'let () =',
    '  Printf.printf "result = %d\\n" (closure_demo ())',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let make_adder n = fun x -> n + x in' },
    { id: 'b', code: '  let add5 = make_adder 5 in' },
    { id: 'c', code: '  add5 12' },
  ],
  expectedOutput: 'result = 17',
};
