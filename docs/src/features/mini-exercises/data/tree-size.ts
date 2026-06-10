import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'tree-size',
  title: 'Count tree nodes',
  difficulty: 'medium',
  conceptLink: { label: 'Trees', href: '/concepts/trees' },
  category: 'trees',
  filename: 'tree_size_exercise.ml',
  prompt:
    'A rose tree has one constructor: T of tree list. A leaf is T []. Count all nodes: each node contributes 1, plus the sum of its children\'s sizes.',
  prefixCode: [
    '(* Mini Exercise: Rose tree size',
    '   type tree = T of tree list',
    '   A leaf is T []. *)',
    '',
    'type tree = T of tree list',
    '',
    '(* Arrange the body of size *)',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: size = 4 *)',
    '',
    'let () =',
    '  let t = T [T [T []]; T []] in',
    '  Printf.printf "size = %d\\n" (size t)',
  ].join('\n'),
  items: [
    { id: 'a', code: 'let rec size (T children) =' },
    { id: 'b', code: '  let child_sizes = List.map size children in' },
    { id: 'c', code: '  1 + List.fold_left (+) 0 child_sizes' },
  ],
  expectedOutput: 'size = 4',
};
