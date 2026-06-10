import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'match-list',
  title: 'Classify a list',
  difficulty: 'easy',
  conceptLink: { label: 'Pattern Matching', href: '/concepts/pattern-matching' },
  category: 'pattern-matching',
  filename: 'match_list_exercise.ml',
  prompt:
    'Match a list to determine if it is empty, has exactly one element, or has more. Order matters: put the most specific patterns first.',
  prefixCode: [
    '(* Mini Exercise: Pattern matching on lists',
    '   More specific patterns must come before wildcards. *)',
    '',
    '(* Arrange the three match arms *)',
    'let classify lst =',
    '  match lst with',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: singleton *)',
    '',
    'let () =',
    '  Printf.printf "%s\\n" (classify [42])',
  ].join('\n'),
  items: [
    { id: 'a', code: '  | [] -> "empty"' },
    { id: 'b', code: '  | [_] -> "singleton"' },
    { id: 'c', code: '  | _ -> "many"' },
  ],
  expectedOutput: 'singleton',
};
