import type { PracticeExercise } from './types';

export const KIND_LABEL: Record<PracticeExercise['kind'], string> = {
  'predict-output': 'Predict Output',
  'predict-type':   'Predict Type',
  'fix-error':      'Fix the Error',
  'complete':       'Complete the Function',
  'refactor':       'Refactor',
};

export const KIND_DESC: Record<PracticeExercise['kind'], string> = {
  'predict-output': 'Read code and predict what it prints. Trains mental execution and lexical-scope intuition.',
  'predict-type':   'Read an expression and predict the inferred type. Trains type-inference thinking.',
  'fix-error':      'Edit broken code until hidden tests pass. Forces you to understand why something is wrong.',
  'complete':       'Fill in function stubs. Hidden tests give real pass/fail feedback, with no "show answer" escape hatch.',
  'refactor':       'Rewrite imperative code in a functional style. Tests verify identical observable behavior.',
};

export const SECTION_ORDER: PracticeExercise['kind'][] = [
  'predict-output',
  'predict-type',
  'fix-error',
  'complete',
  'refactor',
];
