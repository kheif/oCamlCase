import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'array-sum',
  title: 'Sum an array with while',
  difficulty: 'medium',
  conceptLink: { label: 'Mutability', href: '/concepts/mutability' },
  category: 'mutability',
  filename: 'array_sum_exercise.ml',
  prompt:
    'Walk the array with a while loop and an index ref: add the current element to total, THEN advance the index. Swapping those two lines reads out of bounds.',
  prefixCode: [
    '(* Mini Exercise: Imperative array sum',
    '   a.(i) reads index i; the loop runs while the condition is true. *)',
    '',
    'let a = [| 10; 20; 30; 40 |]',
    '',
    'let total = ref 0',
    '',
    '(* Arrange the index and the loop *)',
  ].join('\n'),
  suffixCode: ['', 'let () = Printf.printf "total = %d\\n" !total'].join('\n'),
  items: [
    { id: 'a', code: 'let i = ref 0' },
    { id: 'b', code: 'let () =' },
    { id: 'c', code: '  while !i < Array.length a do' },
    { id: 'd', code: '    total := !total + a.(!i);' },
    { id: 'e', code: '    incr i' },
    { id: 'f', code: '  done' },
  ],
  expectedOutput: 'total = 100',
};
