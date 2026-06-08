import type { MiniExercise } from './types';
import { data as gaussSum } from './gauss-sum';
import { data as factorial } from './factorial';
import { data as power } from './power';
import { data as fibPair } from './fib-pair';
import { data as firstMultiple } from './first-multiple';
import { data as gcd } from './gcd';
import { data as countDigits } from './count-digits';

export const miniExercises: MiniExercise[] = [
  gaussSum,
  factorial,
  power,
  firstMultiple,
  gcd,
  fibPair,
  countDigits,
];

export const miniExerciseById: Record<string, MiniExercise> = Object.fromEntries(
  miniExercises.map((m) => [m.id, m]),
);
