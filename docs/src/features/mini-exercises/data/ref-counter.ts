import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'ref-counter',
  title: 'Mutable counter',
  difficulty: 'easy',
  conceptLink: { label: 'Mutability', href: '/concepts/mutability' },
  category: 'mutability',
  filename: 'ref_counter_exercise.ml',
  prompt:
    'A ref is a mutable cell: := writes it, ! reads it. Create the counter, set it to 5, then double it. Order matters: doubling before setting gives the wrong answer.',
  prefixCode: [
    '(* Mini Exercise: Refs',
    '   := writes a cell, ! reads it. *)',
    '',
    '(* Arrange: create, set to 5, double *)',
  ].join('\n'),
  suffixCode: ['', 'let () = Printf.printf "counter = %d\\n" !counter'].join('\n'),
  items: [
    { id: 'a', code: 'let counter = ref 0' },
    { id: 'b', code: 'let () = counter := 5' },
    { id: 'c', code: 'let () = counter := !counter * 2' },
  ],
  expectedOutput: 'counter = 10',
};
