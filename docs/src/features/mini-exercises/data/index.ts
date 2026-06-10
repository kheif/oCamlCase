import type { MiniExercise } from './types';
import { data as gaussSum } from './gauss-sum';
import { data as factorial } from './factorial';
import { data as power } from './power';
import { data as fibPair } from './fib-pair';
import { data as firstMultiple } from './first-multiple';
import { data as gcd } from './gcd';
import { data as countDigits } from './count-digits';
import { data as shadowing } from './shadowing';
import { data as partialApp } from './partial-app';
import { data as listCons } from './list-cons';
import { data as listLength } from './list-length';
import { data as mapImpl } from './map-impl';
import { data as filterImpl } from './filter-impl';
import { data as foldSum } from './fold-sum';
import { data as matchShape } from './match-shape';

export const miniExercises: MiniExercise[] = [
  shadowing,
  partialApp,
  listCons,
  listLength,
  mapImpl,
  filterImpl,
  foldSum,
  matchShape,
  gaussSum,
  factorial,
  power,
  firstMultiple,
  fibPair,
  gcd,
  countDigits,
];

export const miniExerciseById: Record<string, MiniExercise> = Object.fromEntries(
  miniExercises.map((m) => [m.id, m]),
);
