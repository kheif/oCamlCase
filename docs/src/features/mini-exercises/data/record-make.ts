import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'record-make',
  title: 'Build a record',
  difficulty: 'easy',
  conceptLink: { label: 'Records', href: '/concepts/records' },
  category: 'records',
  filename: 'record_make_exercise.ml',
  prompt:
    'Define a point record type, build a value with named fields, and read the fields back with dot access.',
  prefixCode: [
    '(* Mini Exercise: Records',
    '   The type must exist before a value can use its fields. *)',
    '',
    '(* Arrange: type, value, field access *)',
  ].join('\n'),
  suffixCode: ['', 'let () = Printf.printf "dist_sq = %d\\n" dist_sq'].join('\n'),
  items: [
    { id: 'a', code: 'type point = { x : int; y : int }' },
    { id: 'b', code: 'let p = { x = 3; y = 4 }' },
    { id: 'c', code: 'let dist_sq = (p.x * p.x) + (p.y * p.y)' },
  ],
  expectedOutput: 'dist_sq = 25',
};
