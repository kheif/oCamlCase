// Dynamic semantics — the lecture's slide-33 tease, completing the static half
// in elab.ts. A big-step evaluator over the same `Exp`, ported from the shape
// the lecture sketches:
//
//   type value = VBool of bool | VInt of int | VClosure of var * exp * env
//
//   let rec eval env = function
//     | Con (BCon b) -> VBool b | Con (ICon n) -> VInt n
//     | Var x        -> env x
//     | OApp (op, e1, e2) -> apply_op op (eval env e1) (eval env e2)
//     | FApp (e1, e2)     ->
//         (match eval env e1 with
//          | VClosure (x, body, cenv) -> eval (update cenv x (eval env e2)) body
//          | _ -> failwith "stuck")
//     | If (e1, e2, e3) ->
//         (match eval env e1 with
//          | VBool true  -> eval env e2
//          | VBool false -> eval env e3
//          | _ -> failwith "stuck")
//     | Fun (x, _, e) -> VClosure (x, e, env)
//
// Why this belongs next to the elaborator: a well-typed ToyCaml expression
// never gets stuck (Sop/Sapp/Sif's premises are exactly the runtime checks
// `eval` would otherwise need) — "Run" is the payoff the lecture's static
// semantics promises. The widget only offers this tab once `elab` succeeds.

import { showOp, type Exp, type Op, type Var } from './ast';

export type Value =
  | { kind: 'VBool'; value: boolean }
  | { kind: 'VInt'; value: number }
  | { kind: 'VClosure'; param: Var; body: Exp; env: VEnv };

export type VEnvEntry = { name: Var; value: Value };
/** Same ordered-association-list shape as `Env` in elab.ts, and for the same reason. */
export type VEnv = readonly VEnvEntry[];

export const emptyVEnv: VEnv = [];

export function vupdate(env: VEnv, x: Var, v: Value): VEnv {
  return [{ name: x, value: v }, ...env];
}

export function vlookup(env: VEnv, x: Var): Value | undefined {
  return env.find((e) => e.name === x)?.value;
}

export function showValue(v: Value): string {
  switch (v.kind) {
    case 'VBool':
      return String(v.value);
    case 'VInt':
      return String(v.value);
    case 'VClosure':
      return `<closure: fun (${v.param}) -> ...>`;
  }
}

export type EvalResult = { ok: true; value: Value } | { ok: false; error: string };

function applyOp(op: Op, l: Value, r: Value): EvalResult {
  if (l.kind !== 'VInt' || r.kind !== 'VInt') {
    // Unreachable for a well-typed expression — Sop guarantees both operands
    // are `int`. Reported anyway so a bug in the type-checker can't crash silently.
    return { ok: false, error: `"${showOp(op)}" expects two integers at runtime` };
  }
  switch (op) {
    case 'Add':
      return { ok: true, value: { kind: 'VInt', value: l.value + r.value } };
    case 'Sub':
      return { ok: true, value: { kind: 'VInt', value: l.value - r.value } };
    case 'Mul':
      return { ok: true, value: { kind: 'VInt', value: l.value * r.value } };
    case 'Leq':
      return { ok: true, value: { kind: 'VBool', value: l.value <= r.value } };
  }
}

/**
 * `eval env e` — instrumented like `elaborate`: never throws, always returns
 * an `EvalResult`. For a well-typed `e` under a `T`-respecting `env`, this
 * always succeeds (that is precisely what type soundness buys you); the
 * `error` branches exist only to fail loudly, not silently, if that promise
 * is ever broken.
 */
export function evaluate(env: VEnv, exp: Exp): EvalResult {
  switch (exp.kind) {
    case 'Con':
      return {
        ok: true,
        value:
          exp.con.kind === 'BCon'
            ? { kind: 'VBool', value: exp.con.value }
            : { kind: 'VInt', value: exp.con.value },
      };

    case 'Var': {
      const v = vlookup(env, exp.name);
      if (v === undefined) {
        return {
          ok: false,
          error: `unbound identifier "${exp.name}" at runtime — Unbound "${exp.name}"`,
        };
      }
      return { ok: true, value: v };
    }

    case 'OApp': {
      const l = evaluate(env, exp.left);
      if (!l.ok) return l;
      const r = evaluate(env, exp.right);
      if (!r.ok) return r;
      return applyOp(exp.op, l.value, r.value);
    }

    case 'FApp': {
      const f = evaluate(env, exp.fn);
      if (!f.ok) return f;
      const a = evaluate(env, exp.arg);
      if (!a.ok) return a;
      if (f.value.kind !== 'VClosure') {
        return { ok: false, error: 'cannot apply a non-function value at runtime' };
      }
      return evaluate(vupdate(f.value.env, f.value.param, a.value), f.value.body);
    }

    case 'If': {
      const c = evaluate(env, exp.cond);
      if (!c.ok) return c;
      if (c.value.kind !== 'VBool') {
        return {
          ok: false,
          error: 'the condition of "if" did not evaluate to a boolean at runtime',
        };
      }
      return c.value.value ? evaluate(env, exp.then) : evaluate(env, exp.else);
    }

    case 'Fun':
      return { ok: true, value: { kind: 'VClosure', param: exp.param, body: exp.body, env } };
  }
}
