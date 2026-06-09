import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { highlightOcaml } from '../../lib/highlightOcaml';
import { free, showExp, showExpAst, showTy, type Exp, type Ty } from './ast';
import {
  elaborate,
  envOfList,
  flattenPostOrder,
  lookup,
  showEnv,
  type DerivationNode,
  type Env,
} from './elab';
import { evaluate, showValue, type VEnv, type Value } from './eval';
import { parseExp, parseTy, ParseError } from './parser';
import DerivationTree from './DerivationTree';
import './Toycaml.css';

// ---- static code listings (rendered with the same OCaml highlighter as the
// mini-exercises feature, so the prose reads like the rest of the site) -----

const ABSTRACT_SYNTAX = `type ty  = Bool | Int | Arrow of ty * ty
type con = BCon of bool | ICon of int
type op  = Add | Sub | Mul | Leq
type var = string

type exp =
  | Var  of var
  | Con  of con
  | OApp of op * exp * exp
  | FApp of exp * exp
  | If   of exp * exp * exp
  | Fun  of var * ty * exp`;

const FREE_IDS = `let rec free = function
  | Var x             -> [x]
  | Con _             -> []
  | OApp (_, e1, e2)  -> free e1 @ free e2
  | FApp (e1, e2)     -> free e1 @ free e2
  | If (e1, e2, e3)   -> free e1 @ free e2 @ free e3
  | Fun (x, _, e)     -> List.filter (fun y -> y <> x) (free e)`;

const ENV_CODE = `type 'a env = var -> 'a
exception Unbound of var

let empty = fun x -> raise (Unbound x)
let update env x v = fun y -> if x = y then v else env y
let env_of_list = List.fold_left (fun env (x, v) -> update env x v) empty`;

const ELAB_CODE = `let elab_con = function
  | BCon _ -> Bool
  | ICon _ -> Int

let elab_op = function
  | Add | Sub | Mul -> (Int, Int, Int)
  | Leq             -> (Int, Int, Bool)

let rec elab env = function
  | Con c -> elab_con c
  | Var x -> env x
  | OApp (op, e1, e2) ->
      let (t1, t2, t3) = elab_op op in
      if elab env e1 = t1 && elab env e2 = t2 then t3
      else failwith "type error"
  | FApp (e1, e2) ->
      (match elab env e1 with
       | Arrow (t1, t2) when elab env e2 = t1 -> t2
       | _ -> failwith "type error")
  | Fun (x, t, e) -> Arrow (t, elab (update env x t) e)
  | If (e1, e2, e3) ->
      if elab env e1 = Bool && elab env e2 = elab env e3
      then elab env e2
      else failwith "type error"`;

const EVAL_CODE = `let rec eval env = function
  | Con (BCon b) -> VBool b
  | Con (ICon n) -> VInt n
  | Var x        -> env x
  | OApp (op, e1, e2) -> apply_op op (eval env e1) (eval env e2)
  | FApp (e1, e2)     ->
      (match eval env e1 with
       | VClosure (x, body, cenv) -> eval (update cenv x (eval env e2)) body
       | _ -> failwith "stuck")
  | If (e1, e2, e3) ->
      (match eval env e1 with
       | VBool true  -> eval env e2
       | VBool false -> eval env e3
       | _ -> failwith "stuck")
  | Fun (x, _, e) -> VClosure (x, e, env)`;

function CodeBlock({ fname, code }: { fname: string; code: string }) {
  const lines = code.split('\n');
  return (
    <div className="code-block">
      <div className="code-top">
        <span className="code-fname">{fname}</span>
      </div>
      <pre>
        {lines.map((line, i) => (
          <Fragment key={i}>
            {highlightOcaml(line)}
            {i < lines.length - 1 ? '\n' : ''}
          </Fragment>
        ))}
      </pre>
    </div>
  );
}

// ---- 2a: interpreter phases pipeline — live, wired to widget state -----------

type PhaseStatus = 'pass' | 'fail' | 'pending';

function PhasesPipeline({
  phases,
}: {
  phases: readonly { label: string; sublabel: string; status: PhaseStatus; detail?: string }[];
}) {
  return (
    <div className="tc-pipeline">
      {phases.map((phase, i) => (
        <Fragment key={phase.label}>
          <div className={`tc-phase tc-phase--${phase.status}`}>
            <span className="tc-phase-icon" aria-hidden="true">
              {phase.status === 'pass' ? '✓' : phase.status === 'fail' ? '✗' : '○'}
            </span>
            <span className="tc-phase-label">{phase.label}</span>
            <span className="tc-phase-sub">{phase.sublabel}</span>
            {phase.detail && <span className="tc-phase-detail">{phase.detail}</span>}
          </div>
          {i < phases.length - 1 && (
            <div className="tc-pipeline-sep" aria-hidden="true">→</div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

function RuleBar({
  name,
  premises,
  conclusion,
  active,
}: {
  name: string;
  premises: string[];
  conclusion: string;
  active: boolean;
}) {
  return (
    <div className={`tc-rule ${active ? 'is-active' : ''}`}>
      <div className="tc-rule-body">
        {premises.length > 0 && (
          <div className="tc-rule-premises">{premises.join('          ')}</div>
        )}
        <div className="tc-rule-line" />
        <div className="tc-rule-conclusion">{conclusion}</div>
      </div>
      <div className="tc-rule-name">{name}</div>
    </div>
  );
}

// ---- the interactive elaborator widget -------------------------------------

type EnvRow = { name: string; tyText: string };

type Preset = {
  label: string;
  env: EnvRow[];
  expr: string;
  note: string;
  /** D1 self-check: the type this preset should elaborate to, or `null` for the ill-typed ones. */
  expectTy: string | null;
};

const PRESETS: Preset[] = [
  {
    label: 'fun (b:bool) -> if b then x else 2*x',
    env: [
      { name: 'x', tyText: 'int' },
      { name: 'b', tyText: 'bool' },
    ],
    expr: 'fun (b:bool) -> if b then x else 2 * x',
    note: 'The lecture’s worked example — its full derivation has type bool -> int.',
    expectTy: 'bool -> int',
  },
  {
    label: 'fun (y:int) -> x <= y',
    env: [{ name: 'x', tyText: 'int' }],
    expr: 'fun (y:int) -> x <= y',
    note: 'A second walk-through from the slides — elaborates to int -> bool.',
    expectTy: 'int -> bool',
  },
  {
    label: '⚠ unbound identifier',
    env: [{ name: 'x', tyText: 'int' }],
    expr: 'x + z',
    note: '"z" is not in T — Sid fails with Unbound "z", and the whole derivation fails with it.',
    expectTy: null,
  },
  {
    label: '⚠ branches disagree',
    env: [
      { name: 'x', tyText: 'int' },
      { name: 'b', tyText: 'bool' },
    ],
    expr: 'if b then x else b',
    note: 'Sif requires both branches to have the same type — here int vs. bool.',
    expectTy: null,
  },
  {
    label: '⚠ applying a non-function',
    env: [{ name: 'x', tyText: 'int' }],
    expr: 'x x',
    note: 'Sapp requires the left side of an application to have an arrow type.',
    expectTy: null,
  },
];

function clonePreset(p: Preset): { env: EnvRow[]; expr: string } {
  return { env: p.env.map((row) => ({ ...row })), expr: p.expr };
}

type Parsed<T> = { ok: true; value: T } | { ok: false; error: string };

function describeParseError(e: unknown): string {
  if (e instanceof ParseError) return e.message;
  return e instanceof Error ? e.message : String(e);
}

// Pulled out of the component so the `useMemo`s below wrap plain function
// calls — the React Compiler can't preserve manual memoization around a
// closure with early `return`s inside a loop, but it preserves a call to a
// pure helper fine.
function parseEnvRows(rows: readonly EnvRow[]): Parsed<Env> {
  const pairs: [string, Ty][] = [];
  for (const row of rows) {
    const name = row.name.trim();
    if (!name) continue;
    try {
      pairs.push([name, parseTy(row.tyText.trim())]);
    } catch (e) {
      return { ok: false, error: `binding "${name || '?'}": ${describeParseError(e)}` };
    }
  }
  return { ok: true, value: envOfList(pairs) };
}

// ---- B3/B5/C1: classify each free identifier of `e` against `T` ------------
//
// 'unbound' -> the exact failure Sid would report (front-loaded, before the
//              learner even runs the elaborator); 'fun' -> bound, but to an
//              arrow type, so the widget can't synthesize a runtime value for
//              it (no literal function syntax in the env editor); 'base' ->
//              bound to int/bool, displayable AND runnable.
type FreeIdInfo =
  | { name: string; status: 'unknown' }
  | { name: string; status: 'unbound' }
  | { name: string; status: 'fun'; ty: Ty }
  | { name: string; status: 'base'; ty: Ty };

function classifyFreeIds(parsedExpr: Parsed<Exp>, parsedEnv: Parsed<Env>): FreeIdInfo[] {
  if (!parsedExpr.ok) return [];
  const names = Array.from(new Set(free(parsedExpr.value)));
  return names.map((name): FreeIdInfo => {
    if (!parsedEnv.ok) return { name, status: 'unknown' };
    const ty = lookup(parsedEnv.value, name);
    if (ty === undefined) return { name, status: 'unbound' };
    return ty.kind === 'Arrow' ? { name, status: 'fun', ty } : { name, status: 'base', ty };
  });
}

// ---- C1: turn the free-id chips' sample values into a runtime `VEnv` -------

function defaultRuntimeValueText(ty: Ty): string {
  return ty.kind === 'Bool' ? 'true' : '0';
}

function parseRuntimeValue(text: string, ty: Ty): Parsed<Value> {
  const t = text.trim();
  if (ty.kind === 'Int') {
    if (!/^-?\d+$/.test(t)) return { ok: false, error: `"${t}" is not an integer` };
    return { ok: true, value: { kind: 'VInt', value: Number(t) } };
  }
  if (ty.kind === 'Bool') {
    if (t === 'true' || t === 'false')
      return { ok: true, value: { kind: 'VBool', value: t === 'true' } };
    return { ok: false, error: `"${t}" is not "true" or "false"` };
  }
  return { ok: false, error: 'function-typed values cannot be entered as text' };
}

function buildRunEnv(
  infos: readonly FreeIdInfo[],
  values: Readonly<Record<string, string>>,
): Parsed<VEnv> {
  const entries: { name: string; value: Value }[] = [];
  for (const info of infos) {
    if (info.status !== 'base') continue;
    const text = values[info.name] ?? defaultRuntimeValueText(info.ty);
    const parsed = parseRuntimeValue(text, info.ty);
    if (!parsed.ok) return { ok: false, error: `value for "${info.name}": ${parsed.error}` };
    entries.push({ name: info.name, value: parsed.value });
  }
  return { ok: true, value: entries };
}

// D1 — preset self-check: in dev builds, assert each preset elaborates to the
// type the lecture states (or fails, for the ill-typed ones). A silent
// regression here would mean the page is teaching something wrong.
if (import.meta.env.DEV) {
  for (const preset of PRESETS) {
    try {
      const { env, expr } = clonePreset(preset);
      const envResult = parseEnvRows(env);
      const exprResult: Parsed<Exp> = (() => {
        try {
          return { ok: true, value: parseExp(expr) };
        } catch (e) {
          return { ok: false, error: describeParseError(e) };
        }
      })();
      if (!envResult.ok || !exprResult.ok) {
        console.error(`[toycaml] preset "${preset.label}" failed to parse`, envResult, exprResult);
        continue;
      }
      const derivation = elaborate(envResult.value, exprResult.value);
      const got = derivation.ty ? showTy(derivation.ty) : null;
      const want = preset.expectTy;
      console.assert(
        got === want,
        `[toycaml] preset "${preset.label}": expected ${want ?? 'a type error'}, got ${got ?? 'a type error'}`,
      );
    } catch (e) {
      console.error(`[toycaml] preset "${preset.label}" threw during self-check`, e);
    }
  }
}

export default function Toycaml() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [envRows, setEnvRows] = useState<EnvRow[]>(() => clonePreset(PRESETS[0]).env);
  const [exprText, setExprText] = useState(() => clonePreset(PRESETS[0]).expr);
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'check' | 'run'>('check');
  const [runValues, setRunValues] = useState<Record<string, string>>({});

  function applyPreset(idx: number) {
    const { env, expr } = clonePreset(PRESETS[idx]);
    setPresetIdx(idx);
    setEnvRows(env);
    setExprText(expr);
  }

  function updateRow(i: number, patch: Partial<EnvRow>) {
    setEnvRows((rows) => rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  }
  function addRow() {
    setEnvRows((rows) => [...rows, { name: '', tyText: 'int' }]);
  }
  function removeRow(i: number) {
    setEnvRows((rows) => rows.filter((_, j) => j !== i));
  }

  // Parse the environment rows into a `T : env` (an ordered association list —
  // see elab.ts for why that's the *faithful* representation here, not a cop-out).
  const parsedEnv = useMemo<Parsed<Env>>(() => parseEnvRows(envRows), [envRows]);

  const parsedExpr = useMemo<Parsed<Exp>>(() => {
    try {
      return { ok: true, value: parseExp(exprText) };
    } catch (e) {
      return { ok: false, error: describeParseError(e) };
    }
  }, [exprText]);

  const derivation = useMemo<DerivationNode | null>(() => {
    if (!parsedEnv.ok || !parsedExpr.ok) return null;
    return elaborate(parsedEnv.value, parsedExpr.value);
  }, [parsedEnv, parsedExpr]);

  const steps = useMemo(() => (derivation ? flattenPostOrder(derivation) : []), [derivation]);

  // Re-derivations (new preset, edited env/expression) start fully revealed —
  // the result should never feel "stuck" — but the stepper can replay the build.
  // Resetting on a new `steps` identity *during render* (React's documented
  // "adjusting state when a prop changes" pattern) avoids the cascading-render
  // effect the linter flags for `setState` inside `useEffect`.
  const [seenSteps, setSeenSteps] = useState(steps);
  if (steps !== seenSteps) {
    setSeenSteps(steps);
    setStepIdx(steps.length);
    if (playing) setPlaying(false);
  }

  // ---- B1: autoplay — schedules its own next tick; the pending setState lives
  // inside the timer callback (async), not the effect body, so this is the
  // "subscribe to an external clock" shape the set-state-in-effect lint allows. ----
  useEffect(() => {
    if (!playing || stepIdx >= steps.length) return undefined;
    const id = setTimeout(() => setStepIdx((s) => Math.min(steps.length, s + 1)), 900);
    return () => clearTimeout(id);
  }, [playing, stepIdx, steps.length]);

  const atEnd = stepIdx >= steps.length;
  function togglePlay() {
    if (atEnd) {
      setStepIdx(0);
      setPlaying(true);
    } else {
      setPlaying((p) => !p);
    }
  }

  // ---- B2: the node the cursor is currently on — drives cross-panel highlight
  const activeNode: DerivationNode | null =
    stepIdx > 0 && stepIdx <= steps.length ? steps[stepIdx - 1] : null;

  // The binding the active step is reading (Sid) or introducing (Sabs extends
  // T[x:=t]) — only lights up a row when the name matches one the learner
  // actually wrote (a freshly-introduced parameter like `y` won't, since it
  // isn't in T; the judgement card itself shows the extended environment).
  const activeBindingName: string | null = useMemo(() => {
    if (!activeNode) return null;
    if (activeNode.rule === 'Sid' && activeNode.exp.kind === 'Var') return activeNode.exp.name;
    if (activeNode.rule === 'Sabs' && activeNode.exp.kind === 'Fun') return activeNode.exp.param;
    return null;
  }, [activeNode]);

  // ---- B3/B5: free identifiers of `e`, classified against `T` ----------------
  const freeIdInfos = useMemo(
    () => classifyFreeIds(parsedExpr, parsedEnv),
    [parsedExpr, parsedEnv],
  );

  function runValueFor(info: FreeIdInfo & { status: 'base' }): string {
    return runValues[info.name] ?? defaultRuntimeValueText(info.ty);
  }
  function setRunValue(name: string, text: string) {
    setRunValues((vs) => ({ ...vs, [name]: text }));
  }

  // ---- C1: can we run it, and if so, with what? ------------------------------
  const runBlockedReason = useMemo(() => {
    const funs = freeIdInfos.filter((i): i is FreeIdInfo & { status: 'fun' } => i.status === 'fun');
    if (funs.length === 0) return null;
    const names = funs.map((i) => `"${i.name}"`).join(', ');
    return `Run is unavailable: the free identifier${funs.length > 1 ? 's' : ''} ${names} ${
      funs.length > 1 ? 'have' : 'has'
    } a function type — this widget can only supply integer/boolean sample values, not functions.`;
  }, [freeIdInfos]);

  const canRun = derivation !== null && derivation.ty !== null && runBlockedReason === null;
  const effectiveTab: 'check' | 'run' = canRun ? activeTab : 'check';

  // 2a: which interpreter phase does the current input reach?
  const phases = useMemo(() => {
    const empty = !exprText.trim();
    const parseOk = parsedExpr.ok && parsedEnv.ok;
    const semanticOk = parseOk && derivation !== null && derivation.ty !== null;
    return [
      {
        label: 'Lexical',
        sublabel: 'tokenize',
        status: (empty ? 'pending' : 'pass') as PhaseStatus,
      },
      {
        label: 'Syntactic',
        sublabel: 'parse → AST',
        status: (empty ? 'pending' : parseOk ? 'pass' : 'fail') as PhaseStatus,
        detail:
          !parseOk && !empty
            ? !parsedExpr.ok
              ? parsedExpr.error
              : !parsedEnv.ok
                ? parsedEnv.error
                : undefined
            : undefined,
      },
      {
        label: 'Semantic',
        sublabel: 'elab → type',
        status: (!parseOk ? 'pending' : semanticOk ? 'pass' : 'fail') as PhaseStatus,
        detail: parseOk && !semanticOk ? 'type error' : undefined,
      },
      {
        label: 'Execution',
        sublabel: 'eval → value',
        status: (!semanticOk || runBlockedReason !== null ? 'pending' : 'pass') as PhaseStatus,
      },
    ];
  }, [exprText, parsedExpr, parsedEnv, derivation, runBlockedReason]);

  const runResult = useMemo<Parsed<Value> | null>(() => {
    if (!canRun || !parsedExpr.ok) return null;
    const venv = buildRunEnv(freeIdInfos, runValues);
    if (!venv.ok) return venv;
    const result = evaluate(venv.value, parsedExpr.value);
    return result.ok ? { ok: true, value: result.value } : { ok: false, error: result.error };
  }, [canRun, parsedExpr, freeIdInfos, runValues]);

  return (
    <div className="article">
      <PageMeta
        title="Static Semantics | oCamlCase"
        description="ToyCaml's static and dynamic semantics, live: typing judgements, inference rules, an elaborator that builds and animates the derivation tree for any expression you type, and an evaluator that runs what type-checks."
      />

      <div className="page-header">
        <div className="page-label">Concepts</div>
        <h1 className="page-title">Static Semantics</h1>
        <p className="page-intro">
          How do we decide whether an expression is well-typed — and what type does it have? ToyCaml
          (a tiny language with booleans, integers, conditionals, and functions) answers both at
          once: a handful of <strong>inference rules</strong> define a typing judgement{' '}
          <code>T ⊢ e : t</code> ("under environment T, expression e has type t"), and{' '}
          <code>elab</code> is an algorithm that searches for — or fails to find — a derivation of
          that judgement. Type your own expressions below and watch the derivation get built rule by
          rule, exactly as you would by hand — then run the result and see why a well-typed program
          never gets stuck.
        </p>
      </div>

      <h2>Abstract Syntax</h2>
      <p>
        ToyCaml expressions are variables, constants, binary operators, function application,
        conditionals, and (typed) lambda abstractions. Every elaboration rule below corresponds to
        exactly one of these six shapes. The abstract grammar names the syntactic categories — each
        metavariable (<code>c</code>, <code>e</code>, <code>t</code>) ranges over one level of the
        language:
      </p>

      {/* 2c: abstract grammar BNF card */}
      <div className="tc-grammar">
        <div className="tc-grammar-title">Abstract Grammar</div>
        <table className="tc-grammar-table">
          <tbody>
            <tr>
              <td className="tc-grammar-meta">c ∈ Con</td>
              <td className="tc-grammar-sep">::=</td>
              <td className="tc-grammar-prod">
                true &nbsp;|&nbsp; false &nbsp;|&nbsp; 0 &nbsp;|&nbsp; 1 &nbsp;|&nbsp; −1 &nbsp;|&nbsp; …
              </td>
            </tr>
            <tr>
              <td className="tc-grammar-meta">e ∈ Exp</td>
              <td className="tc-grammar-sep">::=</td>
              <td className="tc-grammar-prod">
                c &nbsp;|&nbsp; x &nbsp;|&nbsp; e₁ ⊕ e₂ &nbsp;|&nbsp; e₁ e₂ &nbsp;|&nbsp; if e₁
                then e₂ else e₃ &nbsp;|&nbsp; fun (x : t) → e
              </td>
            </tr>
            <tr>
              <td className="tc-grammar-meta">t ∈ Ty</td>
              <td className="tc-grammar-sep">::=</td>
              <td className="tc-grammar-prod">bool &nbsp;|&nbsp; int &nbsp;|&nbsp; t₁ → t₂</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CodeBlock fname="syntax.ml" code={ABSTRACT_SYNTAX} />

      <h2>Free Identifiers</h2>
      <p>
        An identifier occurs <em>free</em> in <code>e</code> if it is used but not bound by an
        enclosing <code>fun</code>. <code>free</code> walks the syntax tree, collecting variable
        occurrences and removing a name once <code>Fun (x, _, e)</code> binds it — this is precisely
        what the typing environment needs to cover. The widget below runs this exact function on
        whatever you type: see the <strong>Free identifiers</strong> panel.
      </p>
      <CodeBlock fname="free.ml" code={FREE_IDS} />

      <h2>The Typing Judgement</h2>
      <p>
        A typing environment <code>T</code> records the types of free identifiers — the lecture
        writes it as a finite list like <code>[x:=int, b:=bool]</code>, and represents it abstractly
        as a function <code>var -&gt; ty</code> that raises <code>Unbound x</code> when asked about
        a name it doesn't cover. <code>update env x v</code> extends the environment, shadowing any
        earlier binding for <code>x</code>.
      </p>
      <CodeBlock fname="env.ml" code={ENV_CODE} />
      <p>
        The judgement <code>T ⊢ e : t</code> reads "under environment <code>T</code>, expression{' '}
        <code>e</code> elaborates to type <code>t</code>". Six inference rules — one per syntactic
        shape — define exactly when this judgement holds.{' '}
        <strong>Premises sit above the bar, conclusion below</strong> — the same shape the
        derivation tree below builds in:
      </p>

      <div className="tc-rules">
        <RuleBar
          name="Sconst"
          premises={[]}
          conclusion="T ⊢ c : elab_con c"
          active={activeNode?.rule === 'Sconst'}
        />
        <RuleBar
          name="Sid"
          premises={['x ∈ dom(T)']}
          conclusion="T ⊢ x : T x"
          active={activeNode?.rule === 'Sid'}
        />
        <RuleBar
          name="Sop"
          premises={['T ⊢ e₁ : t₁', 'T ⊢ e₂ : t₂', '(t₁, t₂, t₃) = elab_op ⊕']}
          conclusion="T ⊢ e₁ ⊕ e₂ : t₃"
          active={activeNode?.rule === 'Sop'}
        />
        <RuleBar
          name="Sapp"
          premises={['T ⊢ e₁ : t₁ → t₂', 'T ⊢ e₂ : t₁']}
          conclusion="T ⊢ e₁ e₂ : t₂"
          active={activeNode?.rule === 'Sapp'}
        />
        <RuleBar
          name="Sabs"
          premises={['T[x:=t₁] ⊢ e : t₂']}
          conclusion="T ⊢ fun (x:t₁) -> e : t₁ → t₂"
          active={activeNode?.rule === 'Sabs'}
        />
        <RuleBar
          name="Sif"
          premises={['T ⊢ e₁ : bool', 'T ⊢ e₂ : t', 'T ⊢ e₃ : t']}
          conclusion="T ⊢ if e₁ then e₂ else e₃ : t"
          active={activeNode?.rule === 'Sif'}
        />
      </div>

      {/* 2d: determinism callout (PDF p.26) */}
      <div className="callout callout-tip">
        <div className="callout-title">Determinism</div>
        <p>
          For any typing environment <code>T</code> and expression <code>e</code>, there is{' '}
          <strong>at most one</strong> type <code>t</code> such that <code>T ⊢ e : t</code>. Each
          syntactic shape maps to exactly one rule — no ambiguity, no choice. The elaborator above
          never returns two types for the same input; verify by typing anything below.
        </p>
      </div>

      <div className="callout callout-key">
        <div className="callout-title">Pattern</div>
        <p>
          <code>elab</code> below is exactly these six rules turned into an algorithm: one branch
          per shape, each computing — or failing to compute — the type its rule's conclusion
          promises, from the types its premises recursively establish. <code>Sabs</code> is the only
          rule that changes the environment: typing a function body happens under{' '}
          <code>T[x:=t₁]</code>, which is why the derivation tree below shows <code>T</code> growing
          as it descends into a <code>fun</code>.
        </p>
      </div>
      <CodeBlock fname="elab.ml" code={ELAB_CODE} />

      <h2>Try the Elaborator — and Run It</h2>
      <p>
        Pick a preset or write your own ToyCaml expression and environment below. Everything updates
        live: the <strong>free identifiers</strong> panel runs <code>free</code> on your expression
        and checks each one against <code>T</code>; the elaborator builds a derivation tree you can
        step through (or autoplay) rule by rule, with the active rule, binding, and judgement
        lighting up together; and once an expression type-checks, a <strong>Run</strong> tab
        evaluates it — proof that a well-typed ToyCaml program never gets stuck. The last three
        presets are deliberately ill-typed: a real strength of having an algorithm (rather than just
        rules on paper) is that it tells you precisely <em>where</em> and <em>why</em> a derivation
        is impossible.
      </p>

      <div className="tc-widget">
        <PhasesPipeline phases={phases} />
        <div className="tc-controls">
          <label className="tc-field">
            <span className="tc-field-label">Preset</span>
            <select value={presetIdx} onChange={(e) => applyPreset(Number(e.target.value))}>
              {PRESETS.map((p, i) => (
                <option key={i} value={i}>
                  {p.label}
                </option>
              ))}
            </select>
            <span className="tc-field-note">{PRESETS[presetIdx].note}</span>
          </label>

          <label className="tc-field">
            <span className="tc-field-label">Expression e</span>
            <input
              className="tc-expr-input"
              value={exprText}
              spellCheck={false}
              onChange={(e) => setExprText(e.target.value)}
            />
          </label>

          <div className="tc-field">
            <span className="tc-field-label">Environment T</span>
            <div className="tc-env-rows">
              {envRows.map((row, i) => {
                const name = row.name.trim();
                const isFree = name !== '' && freeIdInfos.some((info) => info.name === name);
                const isActive = name !== '' && name === activeBindingName;
                return (
                  <div className={`tc-env-row ${isActive ? 'is-active' : ''}`} key={i}>
                    <input
                      className="tc-env-name"
                      value={row.name}
                      placeholder="name"
                      spellCheck={false}
                      onChange={(e) => updateRow(i, { name: e.target.value })}
                    />
                    <span className="tc-env-colon">:</span>
                    <input
                      className="tc-env-ty"
                      value={row.tyText}
                      placeholder="type, e.g. int -> bool"
                      spellCheck={false}
                      onChange={(e) => updateRow(i, { tyText: e.target.value })}
                    />
                    {name !== '' && (
                      <span className="tc-env-used">{isFree ? '● used in e' : '○ unused'}</span>
                    )}
                    <button
                      type="button"
                      className="tc-env-remove"
                      aria-label={`remove binding for ${row.name || 'this row'}`}
                      onClick={() => removeRow(i)}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
            <button type="button" className="tc-env-add" onClick={addRow}>
              + add binding
            </button>
          </div>

          {/* B3/B5: free(e) against T, live — also where Run gets its sample values (C1) */}
          <div className="tc-field tc-free-panel">
            <span className="tc-field-label">Free identifiers in e — free(e)</span>
            {freeIdInfos.length === 0 ? (
              <span className="tc-free-empty">
                e has no free identifiers — it type-checks under any T.
              </span>
            ) : (
              <div className="tc-free-chips">
                {freeIdInfos.map((info) => {
                  if (info.status === 'unbound') {
                    return (
                      <span className="tc-chip is-unbound" key={info.name}>
                        <span className="tc-chip-name">{info.name}</span>
                        <span className="tc-chip-ty">∉ dom(T)</span>
                      </span>
                    );
                  }
                  if (info.status === 'unknown') {
                    return (
                      <span className="tc-chip" key={info.name}>
                        <span className="tc-chip-name">{info.name}</span>
                        <span className="tc-chip-ty">: ?</span>
                      </span>
                    );
                  }
                  if (info.status === 'fun') {
                    return (
                      <span className="tc-chip is-fun" key={info.name}>
                        <span className="tc-chip-name">{info.name}</span>
                        <span className="tc-chip-ty">: {showTy(info.ty)} (function)</span>
                      </span>
                    );
                  }
                  return (
                    <span className="tc-chip is-bound" key={info.name}>
                      <span className="tc-chip-name">{info.name}</span>
                      <span className="tc-chip-ty">: {showTy(info.ty)} =</span>
                      <input
                        className="tc-chip-value"
                        value={runValueFor(info)}
                        spellCheck={false}
                        aria-label={`sample runtime value for ${info.name}`}
                        onChange={(e) => setRunValue(info.name, e.target.value)}
                      />
                    </span>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {!parsedEnv.ok && <div className="tc-error">environment: {parsedEnv.error}</div>}
        {!parsedExpr.ok && <div className="tc-error">expression: {parsedExpr.error}</div>}

        {parsedEnv.ok && parsedExpr.ok && (
          <>
            {/* 2b: always-visible concrete ↔ abstract syntax side-by-side */}
            <div className="tc-syntax-bridge">
              <div className="tc-syntax-col">
                <div className="tc-syntax-col-label">Concrete syntax</div>
                <code className="tc-syntax-concrete">{showExp(parsedExpr.value)}</code>
              </div>
              <div className="tc-syntax-arrow" aria-hidden="true">→</div>
              <div className="tc-syntax-col">
                <div className="tc-syntax-col-label">Abstract syntax (AST)</div>
                <div className="tc-ast">
                  <div className="tc-ast-row">
                    <span className="tc-ast-label">T</span> ={' '}
                    {showEnv(parsedEnv.value)}
                  </div>
                  <div className="tc-ast-row">
                    <span className="tc-ast-label">e</span> ={' '}
                    {showExpAst(parsedExpr.value)}
                  </div>
                </div>
              </div>
            </div>

            {derivation && (
              <>
                <div className={`tc-result ${derivation.ty ? 'is-ok' : 'is-error'}`}>
                  {derivation.ty ? (
                    <>
                      {showEnv(parsedEnv.value)} ⊢ {highlightOcaml(showExp(parsedExpr.value))} :{' '}
                      <strong>{showTy(derivation.ty)}</strong>
                    </>
                  ) : (
                    <>
                      no derivation of {showEnv(parsedEnv.value)} ⊢ e : t exists — type error below
                    </>
                  )}
                </div>

                <div className="tc-tabs">
                  <button
                    type="button"
                    className={`tc-tab ${effectiveTab === 'check' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('check')}
                  >
                    Type-check
                  </button>
                  <button
                    type="button"
                    className={`tc-tab ${effectiveTab === 'run' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('run')}
                    disabled={!canRun}
                    title={
                      canRun
                        ? 'Evaluate e'
                        : (runBlockedReason ?? 'Only well-typed expressions can run')
                    }
                  >
                    Run ▸
                  </button>
                </div>

                {effectiveTab === 'check' && (
                  <>
                    <div className="tc-stepper">
                      <button type="button" onClick={() => setStepIdx(0)} disabled={stepIdx === 0}>
                        ⟲ Replay
                      </button>
                      <button
                        type="button"
                        onClick={() => setStepIdx((s) => Math.max(0, s - 1))}
                        disabled={stepIdx === 0}
                      >
                        ← Prev
                      </button>
                      <button
                        type="button"
                        className={`tc-play-btn ${playing ? 'is-playing' : ''}`}
                        onClick={togglePlay}
                      >
                        {playing && !atEnd ? '⏸ Pause' : '▶ Play'}
                      </button>
                      <span className="tc-step-count">
                        {stepIdx} / {steps.length} steps built
                      </span>
                      <button
                        type="button"
                        onClick={() => setStepIdx((s) => Math.min(steps.length, s + 1))}
                        disabled={stepIdx === steps.length}
                      >
                        Next →
                      </button>
                      <button
                        type="button"
                        className="tc-step-skip"
                        onClick={() => setStepIdx(steps.length)}
                        disabled={stepIdx === steps.length}
                      >
                        Show full derivation
                      </button>
                    </div>

                    <DerivationTree root={derivation} revealedCount={stepIdx} />
                  </>
                )}

                {effectiveTab === 'run' && (
                  <div className="tc-run-panel">
                    {runBlockedReason ? (
                      <p className="tc-run-blocked">{runBlockedReason}</p>
                    ) : runResult === null ? (
                      <p className="tc-run-blocked">Type-check the expression first.</p>
                    ) : runResult.ok ? (
                      <>
                        <div className="tc-run-trace">
                          <span>{highlightOcaml(showExp(parsedExpr.value))}</span>
                          <span className="tc-run-arrow">⇓</span>
                          <span className="tc-run-value">{showValue(runResult.value)}</span>
                        </div>
                        <p className="tc-run-note">
                          Evaluated with <code>eval</code> (below) under the sample values from the
                          free-identifiers panel — edit them and watch the result change. A
                          well-typed expression always reaches a value: that's exactly what Sop's
                          and Sif's and Sapp's premises guarantee at the type level, so{' '}
                          <code>eval</code> never needs a "stuck" case for it.
                        </p>
                      </>
                    ) : (
                      <p className="tc-run-blocked">⚠ {runResult.error}</p>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      <h2>Dynamic Semantics — Running What Type-Checks</h2>
      <p>
        Typing isn't an end in itself: it's a guarantee about <em>running</em> the program. The
        lecture's evaluator below is a big-step interpreter — <code>eval env e</code> reduces{' '}
        <code>e</code> to a <code>value</code> (a boolean, an integer, or a closure) directly,
        without naming the intermediate steps. Compare its shape to <code>elab</code>: every case
        lines up, because <strong>type soundness</strong> is exactly the claim that they agree —
        <code>elab</code>'s <code>Sop</code>/<code>Sif</code>/<code>Sapp</code> premises are
        precisely the runtime checks <code>eval</code> would otherwise have to perform (and could
        fail). A well-typed expression provably never hits the <code>failwith "stuck"</code> cases —
        which is what the <strong>Run</strong> tab above demonstrates on whatever you type.
      </p>
      <CodeBlock fname="eval.ml" code={EVAL_CODE} />

      <div className="page-footer">
        <Link to="/concepts/trees">← Trees</Link>
        <Link to="/exercises/bank">Next: Bank Account →</Link>
      </div>
    </div>
  );
}
