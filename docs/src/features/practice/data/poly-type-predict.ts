import type { PredictTypeExercise } from './types';

export const data: PredictTypeExercise = {
  kind: 'predict-type',
  id: 'poly-type-predict',
  title: 'What is the type of f?',
  difficulty: 'medium',
  conceptLink: { label: 'Type Inference', href: '/concepts/type-inference' },
  prompt:
    'OCaml infers types without annotations. What type does the compiler give to `f`? ' +
    "Write the type exactly, e.g. `'a -> 'b -> 'a`.",
  code: `let f x y = x`,
  expected: "'a -> 'b -> 'a",
  explanation:
    "`f` takes two arguments and returns the first. " +
    'OCaml sees that `x` is returned and `y` is discarded, so it assigns ' +
    "fresh type variables: `x : 'a`, `y : 'b`, return : `'a`. " +
    "The type is `'a -> 'b -> 'a` -- not `int -> int -> int`, because nothing " +
    'in the body constrains the types to any specific type.',
};
