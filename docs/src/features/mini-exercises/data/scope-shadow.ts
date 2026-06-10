import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'scope-shadow',
  title: 'Lexical scope trap',
  difficulty: 'medium',
  conceptLink: { label: 'Lexical Scope', href: '/concepts/lexical-scope' },
  category: 'lexical-scope',
  filename: 'scope_shadow_exercise.ml',
  prompt:
    'f is defined when x is 10. A later let x = 20 shadows x, but f still sees the x from its definition site. Arrange the bindings so the result is 15.',
  prefixCode: [
    '(* Mini Exercise: Lexical scope',
    '   A function captures the environment where it was defined,',
    '   not where it is called. *)',
    '',
    '(* Arrange the body of scope_demo in order *)',
    'let scope_demo () =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: result = 15 *)',
    '',
    'let () =',
    '  Printf.printf "result = %d\\n" (scope_demo ())',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let x = 10 in' },
    { id: 'b', code: '  let f y = x + y in' },
    { id: 'c', code: '  let x = 20 in' },
    { id: 'd', code: '  f 5' },
  ],
  expectedOutput: 'result = 15',
};
