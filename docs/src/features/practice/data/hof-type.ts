import type { PredictTypeExercise } from './types';

export const data: PredictTypeExercise = {
  kind: 'predict-type',
  id: 'hof-type',
  title: 'Apply a function',
  difficulty: 'medium',
  conceptLink: { label: 'Higher-Order Functions', href: '/concepts/higher-order' },
  prompt:
    '`apply` takes a function and an argument and calls the function. ' +
    'What is the type of `apply`?',
  code: `let apply f x = f x`,
  expected: "('a -> 'b) -> 'a -> 'b",
  explanation:
    '`f` must be a function from some type `\'a` to some type `\'b`. ' +
    '`x` must match `f`\'s input, so it has type `\'a`. ' +
    "The result is whatever `f` returns, so `'b`. " +
    "Full type: `('a -> 'b) -> 'a -> 'b`.",
};
