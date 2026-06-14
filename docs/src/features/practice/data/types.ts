export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * A single hidden test case for exercises that run real OCaml.
 * `testCode` is an OCaml snippet that prints exactly ONE line to stdout.
 * That line is trimmed and compared to `expected`.
 */
export type TestCase = {
  name: string;
  testCode: string;
  expected: string;
};

// ── 5.1 Predict Output ────────────────────────────────────────────────────────
// Student sees OCaml code, types what it will print when run.
export type PredictOutputExercise = {
  kind: 'predict-output';
  id: string;
  title: string;
  difficulty: Difficulty;
  conceptLink?: { label: string; href: string };
  prompt: string;
  /** OCaml code shown to the student (also run to verify ground truth). */
  code: string;
  /** Canonical expected output string (what running the code actually prints). */
  expected: string;
  /** Explanation shown after the student answers -- the teaching moment. */
  explanation: string;
};

// ── 5.2 Predict Type ──────────────────────────────────────────────────────────
// Student sees an OCaml expression/definition, types its type.
export type PredictTypeExercise = {
  kind: 'predict-type';
  id: string;
  title: string;
  difficulty: Difficulty;
  conceptLink?: { label: string; href: string };
  prompt: string;
  /** OCaml expression to evaluate -- the toplevel will echo its type. */
  code: string;
  /** Canonical type string (the substring to match after "val ... : "). */
  expected: string;
  explanation: string;
};

// ── 5.3 Fix the Compiler Error ───────────────────────────────────────────────
// Buggy code is shown; student edits it until hidden tests pass.
export type FixErrorExercise = {
  kind: 'fix-error';
  id: string;
  title: string;
  difficulty: Difficulty;
  conceptLink?: { label: string; href: string };
  prompt: string;
  starterCode: string;
  tests: TestCase[];
  solution?: string;
};

// ── 5.4 Complete the Function ────────────────────────────────────────────────
// Starter code has stubs (failwith "TODO"); student fills them in.
// Hidden tests give real pass/fail feedback.
export type CompleteExercise = {
  kind: 'complete';
  id: string;
  title: string;
  difficulty: Difficulty;
  conceptLink?: { label: string; href: string };
  prompt: string;
  starterCode: string;
  tests: TestCase[];
  solution?: string;
};

// ── 5.5 Refactor ──────────────────────────────────────────────────────────────
// Imperative code shown; student rewrites it functionally.
// Tests verify identical observable behavior.
export type RefactorExercise = {
  kind: 'refactor';
  id: string;
  title: string;
  difficulty: Difficulty;
  conceptLink?: { label: string; href: string };
  prompt: string;
  starterCode: string;
  tests: TestCase[];
  solution?: string;
  /**
   * Target type signature, shown in the `.mli` tab as a fallback before the
   * student runs code (after a run the live signature is derived from the
   * toplevel). Plain OCaml signature line(s), e.g. `val sum : int list -> int`.
   */
  signature?: string;
};

export type PracticeExercise =
  | PredictOutputExercise
  | PredictTypeExercise
  | FixErrorExercise
  | CompleteExercise
  | RefactorExercise;
