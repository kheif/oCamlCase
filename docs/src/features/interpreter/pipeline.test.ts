import { describe, expect, it } from 'vitest';
import { showTy } from '../toycaml/ast';
import { showValue } from './evalTrace';
import { lex, showToken } from './lex';
import { runPipeline } from './pipeline';

describe('runPipeline', () => {
  it('runs a function application end to end', () => {
    const run = runPipeline('(fun (x : int) -> x + 1) 5');
    expect(run.failedAt).toBeNull();
    expect(run.tokens?.length).toBeGreaterThan(0);
    expect(run.exp).not.toBeNull();
    expect(run.ty && showTy(run.ty)).toBe('int');
    expect(run.value && showValue(run.value)).toBe('6');
  });

  it('evaluates recursive factorial', () => {
    const run = runPipeline(
      '(rfun fact (n : int) : int -> if n <= 1 then 1 else n * fact (n - 1)) 5',
    );
    expect(run.failedAt).toBeNull();
    expect(run.value && showValue(run.value)).toBe('120');
  });

  it('stops at the tokens stage on a lexically inadmissible character', () => {
    const run = runPipeline('1 # 2');
    expect(run.failedAt).toBe('tokens');
    expect(run.tokens).toBeNull();
    expect(run.error).toBeTruthy();
  });

  it('stops at the AST stage on a parse error', () => {
    const run = runPipeline('if then else');
    expect(run.failedAt).toBe('ast');
    expect(run.tokens).not.toBeNull(); // lexes fine
    expect(run.exp).toBeNull();
  });

  it('stops at the type stage on an ill-typed condition', () => {
    const run = runPipeline('if 1 then 2 else 3');
    expect(run.failedAt).toBe('type');
    expect(run.exp).not.toBeNull();
    expect(run.ty).toBeNull();
  });

  it('reports divergence at the value stage instead of hanging', () => {
    const run = runPipeline('(rfun loop (x : int) : int -> loop x) 0');
    expect(run.failedAt).toBe('value');
    expect(run.ty && showTy(run.ty)).toBe('int');
    expect(run.error).toMatch(/diverge/);
  });
});

describe('lex rfun extension', () => {
  it('tokenizes rfun as its own keyword, not a VAR', () => {
    const { tokens } = lex('rfun f');
    expect(tokens.map(showToken)).toEqual(['RFUN', 'VAR "f"']);
  });
});
