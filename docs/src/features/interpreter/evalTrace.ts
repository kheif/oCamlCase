// Dynamic semantics as a *derivation* — the runtime twin of elab.ts's typing
// derivation. Where the evaluator in toycaml/eval.ts returns just a value, this
// builds the value-judgement tree `V ⊢ e ⇒ v` recording every rule the lecture
// gives (Lecture 8, pages 13–16):
//
//   (Dconst) V ⊢ c ⇒ c            (Did) V ⊢ x ⇒ v          if v = V(x)
//   (Dop)    V ⊢ e1 ⇒ v1  V ⊢ e2 ⇒ v2  /  V ⊢ e1 o e2 ⇒ v   if v1 o v2 = v
//   (Diftrue / Diffalse)   the condition, then the taken branch
//   (Dabs)   V ⊢ fun(x:t)->e ⇒ (x, e, V)        -- a closure; body NOT run yet
//   (Dapp)   V ⊢ e1 ⇒ (x, e, V')  V ⊢ e2 ⇒ v2  V'[x:=v2] ⊢ e ⇒ v  /  V ⊢ e1 e2 ⇒ v
//
// It is a thin wrapper over the same logic as `evaluate`: the tree's root value
// always equals `evaluate env e` for a well-typed `e` (asserted in the page's
// dev self-check). Building the tree — rather than reusing `evaluate` — is only
// so each premise becomes a visible, steppable node, and so Dapp's environment
// extension V'[x:=v2] shows up as its own sub-derivation.

import { showExp, showOp, type Exp } from '../toycaml/ast';
import { vlookup, vupdate, type Value, type VEnv } from '../toycaml/eval';

export type EvalRule =
  | 'Dconst'
  | 'Did'
  | 'Dop'
  | 'Diftrue'
  | 'Diffalse'
  | 'Dabs'
  | 'Dapp'
  | 'Drabs'
  | 'Drapp';

export type EvalNode = {
  rule: EvalRule;
  env: VEnv;
  exp: Exp;
  /** The value `exp` evaluates to here, or `null` if evaluation is stuck. */
  value: Value | null;
  children: EvalNode[];
  error?: string;
};

// Value environment display, matching the lecture's `[x:=5, f:=…]` (oldest
// first). Closures print as the triple (x, e, V) the slides use.
export function showValue(v: Value): string {
  switch (v.kind) {
    case 'VInt':
      return String(v.value);
    case 'VBool':
      return String(v.value);
    case 'VClosure':
      return `(${v.param}, ${showExp(v.body)}, ${showVEnv(v.env)})`;
    case 'VRClosure':
      return `(${v.fnName}, ${v.param}, ${showExp(v.body)}, ${showVEnv(v.env)})`;
  }
}

export function showVEnv(env: VEnv): string {
  if (env.length === 0) return '[]';
  return `[${[...env]
    .reverse()
    .map((e) => `${e.name}:=${showValue(e.value)}`)
    .join(', ')}]`;
}

// Compact forms for the derivation tree, where a node's environment is repeated
// at every level. Printing a closure's full body (and its captured env, which
// for a recursive function contains the closure again) makes each judgement
// enormous and the tree unreadable, so closures collapse to their binders with
// an ellipsis for the body.
export function showValueShort(v: Value): string {
  switch (v.kind) {
    case 'VInt':
      return String(v.value);
    case 'VBool':
      return String(v.value);
    case 'VClosure':
      return `(${v.param}, …)`;
    case 'VRClosure':
      return `(${v.fnName}, ${v.param}, …)`;
  }
}

export function showVEnvShort(env: VEnv): string {
  if (env.length === 0) return '[]';
  return `[${[...env]
    .reverse()
    .map((e) => `${e.name}:=${showValueShort(e.value)}`)
    .join(', ')}]`;
}

function node(
  rule: EvalRule,
  env: VEnv,
  exp: Exp,
  value: Value | null,
  children: EvalNode[],
  error?: string,
): EvalNode {
  return { rule, env, exp, value, children, error };
}

const DEFAULT_BUDGET = 400;

const DIVERGES = 'evaluation did not terminate within the step budget (this expression diverges)';

/**
 * `evalDerivation env e` — the big-step evaluation of `e` under `env`, as a tree.
 *
 * `budget` caps the total number of derivation nodes, so a divergent recursive
 * function (such as `rfun loop (x:int):int -> loop x`) can be visualized safely
 * rather than hanging the browser: once the budget runs out, the current node
 * is marked as a non-terminating placeholder and that error propagates to the
 * root. Terminating expressions are unaffected, since they finish well within it.
 */
export function evalDerivation(env: VEnv, exp: Exp, budget = DEFAULT_BUDGET): EvalNode {
  return go(env, exp, { fuel: budget });
}

function ruleForKind(exp: Exp): EvalRule {
  switch (exp.kind) {
    case 'Con':
      return 'Dconst';
    case 'Var':
      return 'Did';
    case 'OApp':
      return 'Dop';
    case 'If':
      return 'Diftrue';
    case 'Fun':
      return 'Dabs';
    case 'RFun':
      return 'Drabs';
    case 'FApp':
      return 'Dapp';
  }
}

function go(env: VEnv, exp: Exp, st: { fuel: number }): EvalNode {
  if (st.fuel <= 0) return node(ruleForKind(exp), env, exp, null, [], DIVERGES);
  st.fuel--;

  switch (exp.kind) {
    case 'Con':
      return node(
        'Dconst',
        env,
        exp,
        exp.con.kind === 'BCon'
          ? { kind: 'VBool', value: exp.con.value }
          : { kind: 'VInt', value: exp.con.value },
        [],
      );

    case 'Var': {
      const v = vlookup(env, exp.name);
      if (v === undefined)
        return node('Did', env, exp, null, [], `unbound identifier "${exp.name}" at runtime`);
      return node('Did', env, exp, v, []);
    }

    case 'OApp': {
      const l = go(env, exp.left, st);
      const r = go(env, exp.right, st);
      const children = [l, r];
      if (l.value === null || r.value === null)
        return node('Dop', env, exp, null, children, l.error ?? r.error ?? 'an operand is stuck');
      if (l.value.kind !== 'VInt' || r.value.kind !== 'VInt')
        return node('Dop', env, exp, null, children, `"${showOp(exp.op)}" expects two integers`);
      const a = l.value.value;
      const b = r.value.value;
      const value: Value =
        exp.op === 'Add'
          ? { kind: 'VInt', value: a + b }
          : exp.op === 'Sub'
            ? { kind: 'VInt', value: a - b }
            : exp.op === 'Mul'
              ? { kind: 'VInt', value: a * b }
              : { kind: 'VBool', value: a <= b };
      return node('Dop', env, exp, value, children);
    }

    case 'If': {
      const cond = go(env, exp.cond, st);
      if (cond.value === null)
        return node('Diftrue', env, exp, null, [cond], cond.error ?? 'the condition is stuck');
      if (cond.value.kind !== 'VBool')
        return node('Diftrue', env, exp, null, [cond], 'the condition is not a boolean');
      if (cond.value.value) {
        const then = go(env, exp.then, st);
        return node('Diftrue', env, exp, then.value, [cond, then], then.error);
      }
      const els = go(env, exp.else, st);
      return node('Diffalse', env, exp, els.value, [cond, els], els.error);
    }

    case 'Fun':
      return node('Dabs', env, exp, { kind: 'VClosure', param: exp.param, body: exp.body, env }, []);

    case 'RFun':
      return node(
        'Drabs',
        env,
        exp,
        { kind: 'VRClosure', fnName: exp.fnName, param: exp.param, body: exp.body, env },
        [],
      );

    case 'FApp': {
      const fn = go(env, exp.fn, st);
      const arg = go(env, exp.arg, st);
      if (fn.value === null || arg.value === null)
        return node(
          'Dapp',
          env,
          exp,
          null,
          [fn, arg],
          fn.error ?? arg.error ?? 'the function or argument is stuck',
        );
      if (fn.value.kind === 'VClosure') {
        // Dapp: extend the closure's CAPTURED environment, then run the body there.
        const bodyEnv = vupdate(fn.value.env, fn.value.param, arg.value);
        const body = go(bodyEnv, fn.value.body, st);
        return node('Dapp', env, exp, body.value, [fn, arg, body], body.error);
      }
      if (fn.value.kind === 'VRClosure') {
        // Drapp: bind the recursive name to its own closure, then the argument.
        const rc = fn.value;
        const bodyEnv = vupdate(vupdate(rc.env, rc.fnName, rc), rc.param, arg.value);
        const body = go(bodyEnv, rc.body, st);
        return node('Drapp', env, exp, body.value, [fn, arg, body], body.error);
      }
      return node('Dapp', env, exp, null, [fn, arg], 'cannot apply a non-function value');
    }
  }
}

/** Post-order flatten (premises before conclusion) — drives the step reveal. */
export function flattenEvalPostOrder(root: EvalNode): EvalNode[] {
  const out: EvalNode[] = [];
  const visit = (n: EvalNode) => {
    n.children.forEach(visit);
    out.push(n);
  };
  visit(root);
  return out;
}
