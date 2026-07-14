// The whole interpreter as one function: source string in, value out, with
// every intermediate stage kept for display. Each stage reuses the engine the
// corresponding page already ships (lex.ts, toycaml/parser + elab + evalTrace),
// so the capstone can never disagree with the per-stage widgets.

import type { Exp, Ty } from '../toycaml/ast';
import { parseExp, ParseError } from '../toycaml/parser';
import { elaborate, type DerivationNode } from '../toycaml/elab';
import type { Value } from '../toycaml/eval';
import { evalDerivation, type EvalNode } from './evalTrace';
import { lex, LexError, type Token } from './lex';

export type StageId = 'source' | 'tokens' | 'ast' | 'type' | 'value';

export type PipelineRun = {
  src: string;
  /** Tokens from the lecture lexer; null when lexing failed. */
  tokens: Token[] | null;
  /** AST from the full-fragment parser; null when parsing failed. */
  exp: Exp | null;
  ty: Ty | null;
  value: Value | null;
  /** The first stage that failed, or null when the pipeline ran through. */
  failedAt: Exclude<StageId, 'source'> | null;
  /** Human explanation for the failing stage. */
  error: string | null;
};

/** First error message in a typing derivation (the node where elaboration failed). */
function firstDerivationError(node: DerivationNode): string | null {
  if (node.error) return node.error.split(';')[0];
  for (const child of node.children) {
    const err = firstDerivationError(child);
    if (err) return err;
  }
  return null;
}

function firstEvalError(node: EvalNode): string | null {
  if (node.error) return node.error;
  for (const child of node.children) {
    const err = firstEvalError(child);
    if (err) return err;
  }
  return null;
}

export function runPipeline(src: string): PipelineRun {
  const run: PipelineRun = {
    src,
    tokens: null,
    exp: null,
    ty: null,
    value: null,
    failedAt: null,
    error: null,
  };

  try {
    run.tokens = lex(src).tokens;
  } catch (e) {
    run.failedAt = 'tokens';
    run.error = e instanceof LexError ? e.message : String(e);
    return run;
  }

  try {
    run.exp = parseExp(src);
  } catch (e) {
    run.failedAt = 'ast';
    run.error = e instanceof ParseError ? e.message : String(e);
    return run;
  }

  const derivation = elaborate([], run.exp);
  if (derivation.ty === null) {
    run.failedAt = 'type';
    run.error = firstDerivationError(derivation) ?? 'the expression does not type-check';
    return run;
  }
  run.ty = derivation.ty;

  const evaluated = evalDerivation([], run.exp);
  if (evaluated.value === null) {
    run.failedAt = 'value';
    run.error = firstEvalError(evaluated) ?? 'evaluation got stuck';
    return run;
  }
  run.value = evaluated.value;
  return run;
}
