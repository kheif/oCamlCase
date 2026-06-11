import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'opt-chain',
  title: 'Option pipeline',
  difficulty: 'medium',
  conceptLink: { label: 'Options and Result', href: '/concepts/options-result' },
  category: 'options',
  filename: 'opt_chain_exercise.ml',
  prompt:
    'Chain option combinators: look up an age, double it inside the option with Option.map, then unwrap with Option.value and a default of 0.',
  prefixCode: [
    '(* Mini Exercise: Option pipeline',
    '   Option.map transforms inside Some; None passes through.',
    '   Option.value unwraps with a fallback. *)',
    '',
    'let age_of = function',
    '  | "alice" -> Some 30',
    '  | _ -> None',
    '',
    '(* Arrange the body of doubled_age *)',
  ].join('\n'),
  suffixCode: [
    '',
    'let () =',
    '  Printf.printf "alice: %d, bob: %d\\n"',
    '    (doubled_age "alice") (doubled_age "bob")',
  ].join('\n'),
  items: [
    { id: 'a', code: 'let doubled_age name =' },
    { id: 'b', code: '  age_of name' },
    { id: 'c', code: '  |> Option.map (fun a -> a * 2)' },
    { id: 'd', code: '  |> Option.value ~default:0' },
  ],
  expectedOutput: 'alice: 60, bob: 0',
};
