import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'type-pipeline',
  title: 'Typed conversion chain',
  difficulty: 'medium',
  conceptLink: { label: 'Type Inference', href: '/concepts/type-inference' },
  category: 'type-inference',
  filename: 'type_pipeline_exercise.ml',
  prompt:
    'Each function has explicit type annotations. Chain them so the types line up: int -> float -> float -> int. Arrange the four steps.',
  prefixCode: [
    '(* Mini Exercise: Type annotations and inference',
    '   Explicit annotations constrain the types at each step. *)',
    '',
    '(* Arrange the body of type_demo in order *)',
    'let type_demo () =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: result = 3 *)',
    '',
    'let () =',
    '  Printf.printf "result = %d\\n" (type_demo ())',
  ].join('\n'),
  items: [
    { id: 'a', code: '  let to_float (n : int) : float = float_of_int n in' },
    { id: 'b', code: '  let halve (x : float) : float = x /. 2.0 in' },
    { id: 'c', code: '  let result = halve (to_float 7) in' },
    { id: 'd', code: '  int_of_float result' },
  ],
  expectedOutput: 'result = 3',
};
