import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'desugar-bool',
  title: 'Desugar && to if',
  difficulty: 'easy',
  conceptLink: { label: 'Derived Forms', href: '/concepts/derived-forms' },
  category: 'derived-forms',
  filename: 'desugar_bool_exercise.ml',
  prompt:
    'x > 0 && y > 0 is syntactic sugar for nested if-expressions. Arrange the desugared version: the outer if checks x, the inner if checks y.',
  prefixCode: [
    '(* Mini Exercise: Derived forms',
    '   a && b desugars to: if a then b else false *)',
    '',
    '(* Arrange the desugared body of both_positive *)',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: both_positive 3 5 = true *)',
    '',
    'let () =',
    '  Printf.printf "both_positive 3 5 = %b\\n" (both_positive 3 5)',
  ].join('\n'),
  items: [
    { id: 'a', code: 'let both_positive x y =' },
    { id: 'b', code: '  if x > 0 then' },
    { id: 'c', code: '    if y > 0 then true else false' },
    { id: 'd', code: '  else false' },
  ],
  expectedOutput: 'both_positive 3 5 = true',
};
