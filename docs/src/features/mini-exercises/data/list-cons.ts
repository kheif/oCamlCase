import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'list-cons',
  title: 'Build a range with cons',
  difficulty: 'easy',
  conceptLink: { label: 'Lists', href: '/concepts/lists' },
  category: 'lists',
  filename: 'range_exercise.ml',
  prompt:
    'Implement range lo hi = [lo; lo+1; ...; hi] using the :: operator. When lo exceeds hi, return the empty list. Otherwise cons lo onto the recursive result.',
  prefixCode: [
    '(* Mini Exercise: Build a list with cons',
    '   range lo hi should return [lo; lo+1; ...; hi]. *)',
    '',
    '(* Fill in the body of range below *)',
    'let rec range (lo : int) (hi : int) : int list =',
  ].join('\n'),
  suffixCode: [
    '',
    '(* expected: range 1 5 = [1; 2; 3; 4; 5] *)',
    '',
    'let () =',
    '  let xs = range 1 5 in',
    '  let s = String.concat "; " (List.map string_of_int xs) in',
    '  Printf.printf "range 1 5 = [%s]\\n" s',
  ].join('\n'),
  items: [
    { id: 'a', code: '  if lo > hi then []' },
    { id: 'b', code: '  else lo :: range (lo + 1) hi' },
  ],
  expectedOutput: 'range 1 5 = [1; 2; 3; 4; 5]',
};
