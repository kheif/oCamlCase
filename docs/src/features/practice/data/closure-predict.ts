import type { PredictOutputExercise } from './types';

export const data: PredictOutputExercise = {
  kind: 'predict-output',
  id: 'closure-predict',
  title: 'What does this print?',
  difficulty: 'medium',
  conceptLink: { label: 'Closures', href: '/concepts/closures' },
  prompt:
    'This snippet uses let-binding to shadow a variable. ' +
    'What value does `f ()` return? Type the number on its own line.',
  code: `let x = 1
let f () = x
let x = 2
let () = Printf.printf "%d\\n" (f ())`,
  expected: '1',
  explanation:
    'OCaml uses lexical (static) scope. When `f` was defined, `x` was bound to 1 ' +
    'in the enclosing environment. The later `let x = 2` creates a new binding ' +
    'in the module scope but does not mutate the one `f` captured. ' +
    'So `f ()` returns 1, not 2.',
};
