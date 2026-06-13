import type { PracticeExercise } from './types';

// predict-output
import { data as closurePredict }   from './closure-predict';
import { data as listOutput }        from './list-output';
import { data as scopeOutput }       from './scope-output';
import { data as recursionOutput }   from './recursion-output';

// predict-type
import { data as polyTypePredict }   from './poly-type-predict';
import { data as identityType }      from './identity-type';
import { data as hofType }           from './hof-type';
import { data as curryType }         from './curry-type';

// fix-error
import { data as safeHeadFix }       from './safe-head-fix';
import { data as matchFix }          from './match-fix';
import { data as typeFix }           from './type-fix';
import { data as recFix }            from './rec-fix';

// complete
import { data as mapComplete }       from './map-complete';
import { data as filterComplete }    from './filter-complete';
import { data as foldComplete }      from './fold-complete';
import { data as zipComplete }       from './zip-complete';

// refactor
import { data as sumRefactor }       from './sum-refactor';
import { data as loopRefactor }      from './loop-refactor';
import { data as iterRefactor }      from './iter-refactor';
import { data as maxRefactor }       from './max-refactor';

export const practiceExercises: PracticeExercise[] = [
  // predict-output
  closurePredict,
  listOutput,
  scopeOutput,
  recursionOutput,
  // predict-type
  polyTypePredict,
  identityType,
  hofType,
  curryType,
  // fix-error
  safeHeadFix,
  matchFix,
  typeFix,
  recFix,
  // complete
  mapComplete,
  filterComplete,
  foldComplete,
  zipComplete,
  // refactor
  sumRefactor,
  loopRefactor,
  iterRefactor,
  maxRefactor,
];

export const practiceExerciseById: Record<string, PracticeExercise> = Object.fromEntries(
  practiceExercises.map((e) => [e.id, e]),
);
