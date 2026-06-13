import type { PredictOutputExercise } from './types';

export const data: PredictOutputExercise = {
  kind: 'predict-output',
  id: 'list-output',
  title: 'Iterating a list',
  difficulty: 'easy',
  conceptLink: { label: 'Lists', href: '/concepts/lists' },
  prompt:
    '`List.iter` walks a list left to right, calling a function on each element. ' +
    'What does this print? Write each number on its own line.',
  code: `let xs = [1; 2; 3] in
List.iter (fun x -> Printf.printf "%d\\n" x) xs`,
  expected: '1\n2\n3',
  explanation:
    '`List.iter` visits elements in order from head to tail. ' +
    'It calls `Printf.printf "%d\\n"` on 1, then 2, then 3, ' +
    'printing each on its own line.',
};
