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
import { data as anonApply } from './anon-apply';
import { data as scopeShadow } from './scope-shadow';
import { data as closureAdder } from './closure-adder';
import { data as closureCompose } from './closure-compose';
import { data as typePipeline } from './type-pipeline';
import { data as polyPair } from './poly-pair';
import { data as matchList } from './match-list';
import { data as matchNested } from './match-nested';
import { data as desugarBool } from './desugar-bool';
import { data as insertSorted } from './insert-sorted';
import { data as treeSize } from './tree-size';

export const miniExercises: MiniExercise[] = [
  shadowing,
  partialApp,
  anonApply,
  scopeShadow,
  closureAdder,
  closureCompose,
  typePipeline,
  polyPair,
  matchList,
  matchNested,
  matchShape,
  listCons,
  listLength,
  mapImpl,
  filterImpl,
  foldSum,
  desugarBool,
  insertSorted,
  gaussSum,
  factorial,
  power,
  firstMultiple,
  fibPair,
  gcd,
  countDigits,
  treeSize,
];

export const miniExerciseById: Record<string, MiniExercise> = Object.fromEntries(
  miniExercises.map((m) => [m.id, m]),
);
