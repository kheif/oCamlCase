// Abstract syntax for ToyCaml, ported directly from the lecture's OCaml types:
//
//   type ty  = Bool | Int | Arrow of ty * ty
//   type con = BCon of bool | ICon of int
//   type op  = Add | Sub | Mul | Leq
//   type var = string
//   type exp =
//     | Var of var | Con of con | OApp of op * exp * exp | FApp of exp * exp
//     | If of exp * exp * exp | Fun of var * ty * exp
//
// TS has no algebraic-datatype constructors, so each OCaml constructor becomes
// a tagged-union variant with a `kind` discriminant. Plain factory values/functions
// (`Bool`, `Int`, `Arrow(...)`) keep call sites close to the OCaml source.

export type Ty = { kind: 'Bool' } | { kind: 'Int' } | { kind: 'Arrow'; from: Ty; to: Ty };

export const Bool: Ty = { kind: 'Bool' };
export const Int: Ty = { kind: 'Int' };
export function Arrow(from: Ty, to: Ty): Ty {
  return { kind: 'Arrow', from, to };
}

export function tyEquals(a: Ty, b: Ty): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === 'Arrow' && b.kind === 'Arrow') {
    return tyEquals(a.from, b.from) && tyEquals(a.to, b.to);
  }
  return true;
}

// Concrete-syntax rendering: `int -> bool`, parenthesizing a function type that
// appears to the left of another arrow (`(int -> int) -> int`).
export function showTy(t: Ty): string {
  switch (t.kind) {
    case 'Bool':
      return 'bool';
    case 'Int':
      return 'int';
    case 'Arrow': {
      const from = t.from.kind === 'Arrow' ? `(${showTy(t.from)})` : showTy(t.from);
      return `${from} -> ${showTy(t.to)}`;
    }
  }
}

// Abstract-syntax rendering, mirroring how OCaml would print the constructor tree.
function showTyAst(t: Ty): string {
  switch (t.kind) {
    case 'Bool':
      return 'Bool';
    case 'Int':
      return 'Int';
    case 'Arrow':
      return `Arrow (${showTyAst(t.from)}, ${showTyAst(t.to)})`;
  }
}

export type Con = { kind: 'BCon'; value: boolean } | { kind: 'ICon'; value: number };

export type Op = 'Add' | 'Sub' | 'Mul' | 'Leq';
export const OPS: Op[] = ['Add', 'Sub', 'Mul', 'Leq'];

export function showOp(op: Op): string {
  switch (op) {
    case 'Add':
      return '+';
    case 'Sub':
      return '-';
    case 'Mul':
      return '*';
    case 'Leq':
      return '<=';
  }
}

export type Var = string;

export type Exp =
  | { kind: 'Var'; name: Var }
  | { kind: 'Con'; con: Con }
  | { kind: 'OApp'; op: Op; left: Exp; right: Exp }
  | { kind: 'FApp'; fn: Exp; arg: Exp }
  | { kind: 'If'; cond: Exp; then: Exp; else: Exp }
  | { kind: 'Fun'; param: Var; paramTy: Ty; body: Exp }
  | { kind: 'RFun'; fnName: Var; param: Var; paramTy: Ty; retTy: Ty; body: Exp };

// Concrete-syntax rendering — what a learner would type to produce this `exp`.
// Always parenthesizes operator/application/if/fun subterms so the structure
// stays unambiguous (the elaborator's own pretty-printing concern, not the
// parser's — the parser accepts the looser, precedence-driven surface syntax).
export function showExp(e: Exp): string {
  switch (e.kind) {
    case 'Var':
      return e.name;
    case 'Con':
      return String(e.con.value);
    case 'OApp':
      return `${showExp(e.left)} ${showOp(e.op)} ${showExp(e.right)}`;
    case 'FApp':
      return `${maybeParens(e.fn)} ${maybeParens(e.arg)}`;
    case 'If':
      return `if ${showExp(e.cond)} then ${showExp(e.then)} else ${showExp(e.else)}`;
    case 'Fun':
      return `fun (${e.param}:${showTy(e.paramTy)}) -> ${showExp(e.body)}`;
    case 'RFun':
      return `rfun ${e.fnName} (${e.param}:${showTy(e.paramTy)}) : ${showTy(e.retTy)} -> ${showExp(e.body)}`;
  }
}

function maybeParens(e: Exp): string {
  return e.kind === 'OApp' || e.kind === 'If' || e.kind === 'Fun' || e.kind === 'RFun'
    ? `(${showExp(e)})`
    : showExp(e);
}

// Abstract-syntax rendering: `Fun ("y", Int, OApp (Leq, Var "x", Var "y"))` —
// the form the lecture writes expressions in before elaboration. Driven by the
// "show abstract syntax" toggle in the elaborator widget.
export function showExpAst(e: Exp): string {
  switch (e.kind) {
    case 'Var':
      return `Var "${e.name}"`;
    case 'Con':
      return e.con.kind === 'BCon' ? `Con (BCon ${e.con.value})` : `Con (ICon ${e.con.value})`;
    case 'OApp':
      return `OApp (${e.op}, ${showExpAst(e.left)}, ${showExpAst(e.right)})`;
    case 'FApp':
      return `FApp (${showExpAst(e.fn)}, ${showExpAst(e.arg)})`;
    case 'If':
      return `If (${showExpAst(e.cond)}, ${showExpAst(e.then)}, ${showExpAst(e.else)})`;
    case 'Fun':
      return `Fun ("${e.param}", ${showTyAst(e.paramTy)}, ${showExpAst(e.body)})`;
    case 'RFun':
      return `RFun ("${e.fnName}", "${e.param}", ${showTyAst(e.paramTy)}, ${showTyAst(e.retTy)}, ${showExpAst(e.body)})`;
  }
}

// Free identifiers, ported verbatim from the lecture's:
//   let rec free = function
//     | Var x -> [x]
//     | Con _ -> []
//     | OApp (_, e1, e2) | FApp (e1, e2) -> free e1 @ free e2     (* shapes differ; written out below *)
//     | If (e1, e2, e3) -> free e1 @ free e2 @ free e3
//     | Fun (x, _, e) -> List.filter (fun y -> y <> x) (free e)
export function free(e: Exp): Var[] {
  switch (e.kind) {
    case 'Var':
      return [e.name];
    case 'Con':
      return [];
    case 'OApp':
      return [...free(e.left), ...free(e.right)];
    case 'FApp':
      return [...free(e.fn), ...free(e.arg)];
    case 'If':
      return [...free(e.cond), ...free(e.then), ...free(e.else)];
    case 'Fun':
      return free(e.body).filter((y) => y !== e.param);
    case 'RFun':
      // Both the recursive name and the parameter are bound in the body.
      return free(e.body).filter((y) => y !== e.param && y !== e.fnName);
  }
}
