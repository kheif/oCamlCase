import { Fragment, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { highlightOcaml } from '../../lib/highlightOcaml';
import { useStepper } from '../../hooks/useStepper';
import { parseExp, ParseError } from '../toycaml/parser';
import { evaluate, emptyVEnv } from '../toycaml/eval';
import {
  evalDerivation,
  flattenEvalPostOrder,
  showValue,
  type EvalNode,
  type EvalRule,
} from './evalTrace';
import ValueDerivationTree from './ValueDerivationTree';
import './Interpreter.css';

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

// ---- inference-rule card (active = currently-applied rule) -----------------

function RuleBar({
  name,
  premises,
  conclusion,
  side,
  active,
}: {
  name: string;
  premises: string[];
  conclusion: string;
  side?: string;
  active: boolean;
}) {
  return (
    <div className={`vr-rule ${active ? 'is-active' : ''}`}>
      <div className="vr-rule-body">
        {premises.length > 0 && <div className="vr-rule-premises">{premises.join('     ')}</div>}
        <div className="vr-rule-line" />
        <div className="vr-rule-conclusion">{conclusion}</div>
      </div>
      <div className="vr-rule-meta">
        <span className="vr-rule-name">{name}</span>
        {side && <span className="vr-rule-side">{side}</span>}
      </div>
    </div>
  );
}

const RULES: { name: EvalRule; premises: string[]; conclusion: string; side?: string }[] = [
  { name: 'Dconst', premises: [], conclusion: 'V ⊢ c ⇒ c' },
  { name: 'Did', premises: [], conclusion: 'V ⊢ x ⇒ v', side: 'v = V(x)' },
  {
    name: 'Dop',
    premises: ['V ⊢ e₁ ⇒ v₁', 'V ⊢ e₂ ⇒ v₂'],
    conclusion: 'V ⊢ e₁ o e₂ ⇒ v',
    side: 'v₁ o v₂ = v',
  },
  {
    name: 'Diftrue',
    premises: ['V ⊢ e₁ ⇒ true', 'V ⊢ e₂ ⇒ v'],
    conclusion: 'V ⊢ if e₁ then e₂ else e₃ ⇒ v',
  },
  {
    name: 'Diffalse',
    premises: ['V ⊢ e₁ ⇒ false', 'V ⊢ e₃ ⇒ v'],
    conclusion: 'V ⊢ if e₁ then e₂ else e₃ ⇒ v',
  },
  { name: 'Dabs', premises: [], conclusion: 'V ⊢ fun(x:t)->e ⇒ (x, e, V)' },
  {
    name: 'Dapp',
    premises: ['V ⊢ e₁ ⇒ (x, e, V′)', 'V ⊢ e₂ ⇒ v₂', 'V′[x:=v₂] ⊢ e ⇒ v'],
    conclusion: 'V ⊢ e₁ e₂ ⇒ v',
  },
];

const PRESETS = [
  '(fun (x:int) -> x + 1) 4',
  '(fun (x:int) -> if x <= 0 then 1 else x * 2) 3',
  '(fun (x:int) -> fun (y:int) -> x + y) 3 4',
  'if false then 0 else 1',
];

type DState =
  | { ok: true; root: EvalNode; flat: EvalNode[]; result: string }
  | { ok: false; error: string };

// ---- dev self-check: the derivation's root value must equal `evaluate` ------
if (import.meta.env.DEV) {
  const expected: Record<string, string> = {
    '(fun (x:int) -> x + 1) 4': '5',
    '(fun (x:int) -> if x <= 0 then 1 else x * 2) 3': '6',
    '(fun (x:int) -> fun (y:int) -> x + y) 3 4': '7',
    'if false then 0 else 1': '1',
  };
  for (const [src, want] of Object.entries(expected)) {
    const exp = parseExp(src);
    const got = showValue(evalDerivation(emptyVEnv, exp).value!);
    const pure = evaluate(emptyVEnv, exp);
    if (got !== want)
      console.error(`[Dynamics self-check] "${src}" => ${got}, expected ${want}`);
    if (!pure.ok || showValue(pure.value) !== got)
      console.error(`[Dynamics self-check] "${src}" derivation ≠ evaluate`);
  }
}

export default function Dynamics() {
  const [src, setSrc] = useState(PRESETS[0]);

  const state = useMemo<DState>(() => {
    let exp;
    try {
      exp = parseExp(src);
    } catch (e) {
      if (e instanceof ParseError) return { ok: false, error: e.message };
      throw e;
    }
    const root = evalDerivation(emptyVEnv, exp);
    const flat = flattenEvalPostOrder(root);
    return { ok: true, root, flat, result: root.value ? showValue(root.value) : 'stuck' };
  }, [src]);

  const total = state.ok ? state.flat.length : 0;
  const stepper = useStepper(total);
  const idx = stepper.stepIdx;
  const activeRule = state.ok && idx > 0 ? state.flat[idx - 1].rule : null;

  return (
    <div className="article">
      <PageMeta
        title="Dynamic Semantics | oCamlCase"
        description="The execution phase of a ToyCaml interpreter: big-step evaluation. Watch the value judgement V ⊢ e ⇒ v build as a derivation, with closures and the environment-extension dance of function application made visible."
      />

      <div className="page-header">
        <div className="page-label">Building an Interpreter · 4. Dynamic Semantics</div>
        <h1 className="page-title">Dynamic Semantics: evaluation</h1>
        <p className="page-intro">
          The <Link to="/concepts/static-semantics">static semantics</Link> checks that an
          expression is admissible and finds its type. The <strong>dynamic semantics</strong> then{' '}
          <em>evaluates</em> it: does it terminate, and with what value? We read the judgement{' '}
          <code>V ⊢ e ⇒ v</code> as &ldquo;<code>e</code> evaluates to <code>v</code> in value
          environment <code>V</code>&rdquo;.
        </p>
      </div>

      <h2>Values and closures</h2>
      <p>
        ToyCaml values are integers (booleans are integers too: <code>false ≈ 0</code>,{' '}
        <code>true ≈ 1</code>) and <strong>functions represented as closures</strong>, a triple{' '}
        <code>(x, e, V)</code> of the argument variable, the body, and the value environment{' '}
        <em>captured when the function was created</em>. Creating a function does not run its body;
        it only packages the body with its environment (rule <code>Dabs</code>). See{' '}
        <Link to="/concepts/closures">Closures</Link> for the same idea in real OCaml.
      </p>

      <h2>The rules</h2>
      <p>Step the widget below and watch which rule lights up here as each node is built.</p>
      <div className="vr-rules">
        {RULES.map((r) => (
          <RuleBar
            key={r.name}
            name={r.name}
            premises={r.premises}
            conclusion={r.conclusion}
            side={r.side}
            active={activeRule === r.name}
          />
        ))}
      </div>

      <h2>Try it</h2>
      <p>
        Type a closed expression (operators, <code>if</code>, and function application are all
        supported here). The evaluation builds bottom-up, establishing premises before the conclusion
        that uses them, exactly as you would derive it by hand.
      </p>

      <div className="lx-widget">
        <div className="lx-input-row">
          <input
            className="lx-input"
            value={src}
            spellCheck={false}
            aria-label="Expression to evaluate"
            onChange={(e) => setSrc(e.target.value)}
          />
        </div>
        <div className="lx-presets">
          {PRESETS.map((p) => (
            <button
              key={p}
              className={`lx-preset-btn ${p === src ? 'is-active' : ''}`}
              onClick={() => setSrc(p)}
            >
              {p}
            </button>
          ))}
        </div>

        {state.ok ? (
          <>
            <div className="vd-canvas">
              <ValueDerivationTree root={state.root} revealedCount={idx} />
            </div>

            <div className="lx-stepper">
              <button className="lx-step-btn" onClick={stepper.replay} title="Replay from start">
                ⟨⟨ Replay
              </button>
              <button className="lx-step-btn" onClick={stepper.prev} disabled={idx === 0}>
                ⟨ Prev
              </button>
              <button
                className={`lx-step-btn lx-play-btn ${stepper.playing ? 'is-playing' : ''}`}
                onClick={stepper.togglePlay}
              >
                {stepper.playing ? '⏸ Pause' : stepper.atEnd ? '▶ Replay' : '▶ Play'}
              </button>
              <button className="lx-step-btn" onClick={stepper.next} disabled={stepper.atEnd}>
                Next ⟩
              </button>
              <button className="lx-step-btn" onClick={stepper.showAll} disabled={stepper.atEnd}>
                Show all
              </button>
              <span className="lx-progress">
                Step {idx} / {total}
              </span>
            </div>

            {stepper.atEnd && (
              <div className="lx-result">
                <span className="lx-result-label">value</span>
                {state.result}
              </div>
            )}
          </>
        ) : (
          <div className="lx-error">
            <div className="lx-error-msg">Failure "parse": {state.error}</div>
          </div>
        )}
      </div>

      <h2>Function application, step by step</h2>
      <p>
        Rule <code>Dapp</code> is the heart of evaluation. To evaluate <code>e₁ e₂</code>:
      </p>
      <ol>
        <li>evaluate the function expression <code>e₁</code> to a closure <code>(x, e, V′)</code>;</li>
        <li>evaluate the argument <code>e₂</code> to a value <code>v₂</code>;</li>
        <li>
          extend the closure&rsquo;s <em>captured</em> environment: <code>V′[x := v₂]</code>;
        </li>
        <li>evaluate the body <code>e</code> in that extended environment.</li>
      </ol>
      <p>
        Notice it is <code>V′</code>, the environment from when the function was <em>created</em>,
        that gets extended, not the caller&rsquo;s <code>V</code>. That is exactly what makes
        closures lexically scoped.
      </p>

      <h2>The evaluator</h2>
      <CodeBlock fname="eval" code={EVAL_CODE} />
      <p>
        The evaluator <em>ignores</em> the type annotation on <code>Fun (x, _, e)</code>: only the
        argument variable, the body, and the captured environment matter at runtime. Interpreters
        often erase types before execution entirely.
      </p>

      <div className="lx-next">
        Next: <Link to="/interpreter/recursion">Recursion &amp; Divergence →</Link> adding{' '}
        <code>rfun</code>, where termination is no longer guaranteed.
      </div>
    </div>
  );
}
