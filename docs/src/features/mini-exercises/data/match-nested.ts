import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'match-nested',
  title: 'Add two options',
  difficulty: 'medium',
  conceptLink: { label: 'Pattern Matching', href: '/concepts/pattern-matching' },
  category: 'pattern-matching',
  filename: 'match_nested_exercise.ml',
  prompt:
    'Match a pair of option values. Return Some of their sum only when both are Some; otherwise return None. Arrange the three match arms from most specific to wildcard.',
  prefixCode: [
    '(* Mini Exercise: Nested pattern matching on options',
    '   Only when both values are present can we compute a result. *)',
    '',
    '(* Arrange the three match arms *)',
    'let add_options a b =',
    '  match (a, b) with',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: Some 7 *)',
    '',
    'let () =',
    '  match add_options (Some 3) (Some 4) with',
    '  | Some n -> Printf.printf "Some %d\\n" n',
    '  | None -> Printf.printf "None\\n"',
  ].join('\n'),
  items: [
    { id: 'a', code: '  | (Some x, Some y) -> Some (x + y)' },
    { id: 'b', code: '  | (Some _, None) -> None' },
    { id: 'c', code: '  | _ -> None' },
  ],
  expectedOutput: 'Some 7',
};
