// The ToyCaml elaborator (type-checker), ported from the lecture's:
//
//   type 'a env = var -> 'a
//   exception Unbound of var
//   let empty = fun x -> raise (Unbound x)
//   let update env x v = fun y -> if x = y then v else env y
//   let env_of_list = List.fold_left (fun env (x, v) -> update env x v) empty
//
//   let elab_con = function BCon _ -> Bool | ICon _ -> Int
//   let elab_op = function Add | Sub | Mul -> (Int, Int, Int) | Leq -> (Int, Int, Bool)
//
//   let rec elab env = function
//     | Con c -> elab_con c
//     | Var x -> env x
//     | OApp (op, e1, e2) -> ...
//     | FApp (e1, e2)     -> (match elab env e1 with Arrow (t1, t2) -> ... )
//     | Fun (x, t, e)     -> Arrow (t, elab (update env x t) e)
//     | If (e1, e2, e3)   -> ...
//
// Two changes turn this into the engine for the interactive widget:
//
// 1. `env: var -> ty` becomes an ordered association list. Functions are
//    opaque in TS (can't be pretty-printed), but `T = [x:=int, b:=bool]` is
//    exactly what the lecture's slides display — so a list *is* the faithful
//    representation for a tool whose job is to show T to a learner. `update`
//    still has the lecture's "most recent binding shadows" semantics.
//
// 2. `elab` doesn't just return a `ty` or raise — it builds a `DerivationNode`
//    tree recording every rule application (Sconst/Sid/Sop/Sapp/Sabs/Sif), the
//    judgement at each step, and — when typing fails — exactly which premise
//    broke and why. That tree is both the result *and* the animation data for
//    <DerivationTree>.

import {
  Arrow,
  Bool,
  Int,
  showOp,
  showTy,
  tyEquals,
  type Con,
  type Exp,
  type Op,
  type Ty,
} from './ast';

// ---- typing environment ---------------------------------------------------

export type EnvEntry = { name: string; ty: Ty };
/** Most-recent-first, mirroring `update`'s left-biased shadowing. */
export type Env = readonly EnvEntry[];

export const emptyEnv: Env = [];

export function update(env: Env, x: string, ty: Ty): Env {
  return [{ name: x, ty }, ...env];
}

/** Faithful to `env_of_list = List.fold_left (fun env (x, v) -> update env x v) empty`. */
export function envOfList(pairs: ReadonlyArray<readonly [string, Ty]>): Env {
  return pairs.reduce<Env>((env, [x, ty]) => update(env, x, ty), emptyEnv);
}

export function lookup(env: Env, x: string): Ty | undefined {
  return env.find((e) => e.name === x)?.ty;
}

export function showEnv(env: Env): string {
  if (env.length === 0) return '[]';
  // Display oldest-first (declaration order), matching the lecture's `[x:=int, b:=bool]`.
  return `[${[...env]
    .reverse()
    .map((e) => `${e.name}:=${showTy(e.ty)}`)
    .join(', ')}]`;
}

// ---- elab_con / elab_op ----------------------------------------------------

export function elabCon(c: Con): Ty {
  return c.kind === 'BCon' ? Bool : Int;
}

export function elabOp(op: Op): readonly [Ty, Ty, Ty] {
  switch (op) {
    case 'Add':
    case 'Sub':
    case 'Mul':
      return [Int, Int, Int];
    case 'Leq':
      return [Int, Int, Bool];
  }
}

// ---- instrumented elaborator: builds a derivation tree --------------------

export type Rule = 'Sconst' | 'Sid' | 'Sop' | 'Sapp' | 'Sabs' | 'Sif';

export type DerivationNode = {
  rule: Rule;
  env: Env;
  exp: Exp;
  /** The type derived for `exp`, or `null` if no derivation exists at this node. */
  ty: Ty | null;
  children: DerivationNode[];
  /** Set on the node where elaboration first fails — explains *why* in plain language. */
  error?: string;
};

function node(
  rule: Rule,
  env: Env,
  exp: Exp,
  ty: Ty | null,
  children: DerivationNode[],
  error?: string,
): DerivationNode {
  return { rule, env, exp, ty, children, error };
}

/**
 * `elab env e` — but instead of returning `ty` (or raising, as the lecture's
 * version does on a type error), it always returns a `DerivationNode`: the
 * rule that applies to `e`'s shape, the judgement `env ⊢ e : ty`, the premises
 * (recursive sub-derivations) it depends on, and — if typing fails here — a
 * plain-language `error` pinpointing the mismatch.
 */
export function elaborate(env: Env, exp: Exp): DerivationNode {
  switch (exp.kind) {
    case 'Con':
      return node('Sconst', env, exp, elabCon(exp.con), []);

    case 'Var': {
      const ty = lookup(env, exp.name);
      if (ty === undefined) {
        return node(
          'Sid',
          env,
          exp,
          null,
          [],
          `unbound identifier "${exp.name}" — Unbound "${exp.name}"`,
        );
      }
      return node('Sid', env, exp, ty, []);
    }

    case 'OApp': {
      const left = elaborate(env, exp.left);
      const right = elaborate(env, exp.right);
      const [t1, t2, t3] = elabOp(exp.op);
      let ty: Ty | null = null;
      let error: string | undefined;
      if (left.ty === null || right.ty === null) {
        error = 'cannot apply this operator — one of its operands does not type-check';
      } else if (!tyEquals(left.ty, t1)) {
        error = `"${showOp(exp.op)}" expects a left operand of type ${showTy(t1)}, but found ${showTy(left.ty)}`;
      } else if (!tyEquals(right.ty, t2)) {
        error = `"${showOp(exp.op)}" expects a right operand of type ${showTy(t2)}, but found ${showTy(right.ty)}`;
      } else {
        ty = t3;
      }
      return node('Sop', env, exp, ty, [left, right], error);
    }

    case 'FApp': {
      const fn = elaborate(env, exp.fn);
      const arg = elaborate(env, exp.arg);
      let ty: Ty | null = null;
      let error: string | undefined;
      if (fn.ty === null || arg.ty === null) {
        error = 'cannot apply — the function or its argument does not type-check';
      } else if (fn.ty.kind !== 'Arrow') {
        error = `expected a function on the left of the application, but found type ${showTy(fn.ty)}`;
      } else if (!tyEquals(fn.ty.from, arg.ty)) {
        error = `function expects an argument of type ${showTy(fn.ty.from)}, but found ${showTy(arg.ty)}`;
      } else {
        ty = fn.ty.to;
      }
      return node('Sapp', env, exp, ty, [fn, arg], error);
    }

    case 'Fun': {
      const body = elaborate(update(env, exp.param, exp.paramTy), exp.body);
      const ty = body.ty === null ? null : Arrow(exp.paramTy, body.ty);
      const error = body.ty === null ? 'the function body does not type-check' : undefined;
      return node('Sabs', env, exp, ty, [body], error);
    }

    case 'If': {
      const cond = elaborate(env, exp.cond);
      const then = elaborate(env, exp.then);
      const els = elaborate(env, exp.else);
      let ty: Ty | null = null;
      let error: string | undefined;
      if (cond.ty === null || then.ty === null || els.ty === null) {
        error = 'cannot type this conditional — one of its branches does not type-check';
      } else if (!tyEquals(cond.ty, Bool)) {
        error = `the condition of "if" must have type bool, but found ${showTy(cond.ty)}`;
      } else if (!tyEquals(then.ty, els.ty)) {
        error = `the two branches of "if" must have the same type, but found ${showTy(then.ty)} and ${showTy(els.ty)}`;
      } else {
        ty = then.ty;
      }
      return node('Sif', env, exp, ty, [cond, then, els], error);
    }
  }
}

/**
 * Flattens the derivation in the order a learner builds it by hand: every
 * premise is established *before* the conclusion that depends on it
 * (post-order). Drives the step-by-step "Next / Prev" reveal.
 */
export function flattenPostOrder(root: DerivationNode): DerivationNode[] {
  const out: DerivationNode[] = [];
  const visit = (n: DerivationNode) => {
    n.children.forEach(visit);
    out.push(n);
  };
  visit(root);
  return out;
}
