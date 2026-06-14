import type { PredictOutputExercise } from './types';

export const data: PredictOutputExercise = {
  kind: 'predict-output',
  id: 'recursion-output',
  title: 'Countdown',
  difficulty: 'medium',
  conceptLink: { label: 'Recursion', href: '/concepts/tail-recursion' },
  prompt:
    'Trace through `count 3` step by step. ' +
    'What does this print?',
  code: `let rec count n =
  if n = 0 then ()
  else begin
    Printf.printf "%d " n;
    count (n - 1)
  end

let () = count 3`,
  expected: '3 2 1 ',
  explanation:
    'Each call prints `n` before recursing. So `count 3` prints 3, ' +
    'then calls `count 2` which prints 2, then `count 1` which prints 1, ' +
    'then `count 0` which does nothing. Result: "3 2 1 " (with a trailing space).',
};
