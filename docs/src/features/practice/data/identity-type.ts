import type { PredictTypeExercise } from './types';

export const data: PredictTypeExercise = {
  kind: 'predict-type',
  id: 'identity-type',
  title: 'The identity function',
  difficulty: 'easy',
  conceptLink: { label: 'Polymorphism', href: '/concepts/polymorphism' },
  prompt:
    'OCaml infers the most general type for this function. ' +
    'What is the type of `f`?',
  code: `let f x = x`,
  expected: "'a -> 'a",
  explanation:
    '`f` takes any value and returns it unchanged. ' +
    'OCaml has no constraint on what type `x` is, so it generalises to ' +
    'the type variable `\'a`. The function returns the same type it receives, ' +
    "giving `'a -> 'a`, the classic identity type.",
};
