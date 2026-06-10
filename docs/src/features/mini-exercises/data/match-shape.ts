import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'match-shape',
  title: 'Area of shapes',
  difficulty: 'hard',
  conceptLink: { label: 'Constructors and Exceptions', href: '/concepts/constructors-exceptions' },
  category: 'variants',
  filename: 'shape_exercise.ml',
  prompt:
    'Match on each variant constructor and compute the area. Circle uses pi * r^2, Square uses a^2, Triangle uses half base times height. Arrange the three match arms.',
  prefixCode: [
    '(* Mini Exercise: Match on variant constructors',
    '   Each constructor carries different data. Unpack and compute. *)',
    '',
    'type shape =',
    '  | Circle of float',
    '  | Square of float',
    '  | Triangle of float * float',
    '',
    '(* Fill in the three match arms below *)',
    'let area (s : shape) : float =',
    '  match s with',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: area of Square 4.0 = 16.00 *)',
    '',
    'let () =',
    '  Printf.printf "area of Square 4.0 = %.2f\\n" (area (Square 4.0))',
  ].join('\n'),
  items: [
    { id: 'a', code: '  | Circle r -> 3.14159265 *. r *. r' },
    { id: 'b', code: '  | Square a -> a *. a' },
    { id: 'c', code: '  | Triangle (b, h) -> 0.5 *. b *. h' },
  ],
  expectedOutput: 'area of Square 4.0 = 16.00',
};
