import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'shadowing',
  title: 'Shadow a binding',
  difficulty: 'easy',
  conceptLink: { label: 'Bindings', href: '/concepts/bindings' },
  category: 'bindings',
  filename: 'shadowing_exercise.ml',
  prompt:
    'Arrange the let bindings in order. Each new binding shadows the previous x, so the value changes with each step. What does shadow_example () return?',
  prefixCode: [
    '(* Mini Exercise: Binding shadowing',
    '   Each let x = ... creates a new x that shadows the old one. *)',
    '',
    '(* Arrange the body of shadow_example in order *)',
    'let shadow_example () =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: shadow result = 25 *)',
    '',
    'let () =',
    '  Printf.printf "shadow result = %d\\n" (shadow_example ())',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let x = 10 in' },
    { id: 'b', code: '  let x = x * 2 in' },
    { id: 'c', code: '  let x = x + 5 in' },
    { id: 'd', code: '  x' },
  ],
  expectedOutput: 'shadow result = 25',
};
