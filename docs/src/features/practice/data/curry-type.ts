import type { PredictTypeExercise } from './types';

export const data: PredictTypeExercise = {
  kind: 'predict-type',
  id: 'curry-type',
  title: 'Curried addition',
  difficulty: 'easy',
  conceptLink: { label: 'Currying', href: '/concepts/currying' },
  prompt:
    'In OCaml, multi-argument functions are curried by default. ' +
    'What is the type of `add`?',
  code: `let add x y = x + y`,
  expected: 'int -> int -> int',
  explanation:
    '`+` constrains both `x` and `y` to `int`. ' +
    'Because OCaml curries functions, `add` actually takes one `int` and returns ' +
    'a function that takes another `int` and returns an `int`. ' +
    'Written in full: `int -> int -> int`.',
};
