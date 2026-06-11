import type { MiniExercise } from './types';

export const data: MiniExercise = {
  id: 'record-update',
  title: 'Functional update',
  difficulty: 'medium',
  conceptLink: { label: 'Records', href: '/concepts/records' },
  category: 'records',
  filename: 'record_update_exercise.ml',
  prompt:
    'deposit must return a NEW account built with { acct with ... }. The original record stays unchanged, which is why both balances can be printed.',
  prefixCode: [
    '(* Mini Exercise: Functional update',
    '   { r with field = v } copies r, overriding one field. *)',
    '',
    'type account = { owner : string; balance : int }',
    '',
    'let acct = { owner = "alice"; balance = 100 }',
    '',
    '(* Arrange deposit and the updated account *)',
  ].join('\n'),
  suffixCode: [
    '',
    'let () =',
    '  Printf.printf "old = %d, new = %d\\n" acct.balance acct2.balance',
  ].join('\n'),
  items: [
    { id: 'a', code: 'let deposit amount acct =' },
    { id: 'b', code: '  { acct with balance = acct.balance + amount }' },
    { id: 'c', code: 'let acct2 = deposit 50 acct' },
  ],
  expectedOutput: 'old = 100, new = 150',
};
