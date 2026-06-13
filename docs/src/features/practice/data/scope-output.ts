import type { PredictOutputExercise } from './types';

export const data: PredictOutputExercise = {
  kind: 'predict-output',
  id: 'scope-output',
  title: 'Shadowing and closures',
  difficulty: 'medium',
  conceptLink: { label: 'Lexical Scope', href: '/concepts/lexical-scope' },
  prompt:
    'A function `f` is defined, then `x` is rebound. ' +
    'What number does this print?',
  code: `let x = 10 in
let f () = x in
let x = 20 in
Printf.printf "%d\\n" (f ())`,
  expected: '10',
  explanation:
    'OCaml uses lexical scope. When `f` was created, `x` equalled 10 in the ' +
    'enclosing environment. The later `let x = 20` introduces a new binding; ' +
    'it does not mutate the `x` that `f` already captured. ' +
    'So `f ()` evaluates to 10, not 20.',
};
