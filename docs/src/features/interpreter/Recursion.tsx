import { Fragment, useMemo, useState } from 'react';
import PageMeta from '../../components/PageMeta';
import { highlightOcaml } from '../../lib/highlightOcaml';
import { useStepper } from '../../hooks/useStepper';
import { parseExp, ParseError } from '../toycaml/parser';
import { emptyVEnv } from '../toycaml/eval';
import {
  evalDerivation,
  flattenEvalPostOrder,
  showValue,
  type EvalNode,
  type EvalRule,
} from './evalTrace';
import ValueDerivationTree from './ValueDerivationTree';
import './Interpreter.css';

// Node budget for the value derivation. Generous enough for the terminating
// presets (factorial/sum of small inputs), small enough that a divergent
// recursive function is capped almost immediately instead of building a huge
// tree.
const BUDGET = 140;

const RFUN_CODE = `(* one new expression constructor … *)
type exp = ... | RFun of var * var * ty * ty * exp

(* … and a recursive closure that carries its own name *)
type value = ... | VRClosure of var * var * exp * value env

let rec eval env = function
  | ...
  | RFun (f, x, _, _, e) -> VRClosure (f, x, e, env)
  | FApp (e1, e2) ->
      (match eval env e1, eval env e2 with
       | VRClosure (f, x, body, cenv), v ->
           let cenv = update cenv f (VRClosure (f, x, body, cenv)) in
           eval (update cenv x v) body
       | VClosure (x, body, cenv), v -> eval (update cenv x v) body
       | _ -> failwith "stuck")`;

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

function RuleBar({
  name,
  premises,
  conclusion,
  kind,
  active,
}: {
  name: string;
  premises: string[];
  conclusion: string;
  kind: 'static' | 'dynamic';
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
        <span className="vr-rule-side">{kind === 'static' ? 'typing' : 'evaluation'}</span>
      </div>
    </div>
  );
}

const RULES: {
  name: string;
  rule: EvalRule | null;
  premises: string[];
  conclusion: string;
  kind: 'static' | 'dynamic';
}[] = [
  {
    name: 'Srabs',
    rule: null,
    kind: 'static',
    premises: ['T[f:=t->t′][x:=t] ⊢ e : t′'],
    conclusion: 'T ⊢ rfun f(x:t):t′ -> e : t -> t′',
  },
  {
    name: 'Drabs',
    rule: 'Drabs',
    kind: 'dynamic',
    premises: [],
    conclusion: 'V ⊢ rfun f(x:t):t′ -> e ⇒ (f, x, e, V)',
  },
  {
    name: 'Drapp',
    rule: 'Drapp',
    kind: 'dynamic',
    premises: ['V ⊢ e₁ ⇒ (f, x, e, V′)', 'V ⊢ e₂ ⇒ v₂', 'V′[f:=(f,x,e,V′)][x:=v₂] ⊢ e ⇒ v'],
    conclusion: 'V ⊢ e₁ e₂ ⇒ v',
  },
];

const PRESETS = [
  '(rfun fac (n:int):int -> if n <= 0 then 1 else n * fac (n - 1)) 3',
  '(rfun sum (n:int):int -> if n <= 0 then 0 else n + sum (n - 1)) 4',
  '(rfun loop (x:int):int -> loop x) 0',
];

type RState =
  | { ok: true; root: EvalNode; flat: EvalNode[]; result: string; diverged: boolean }
  | { ok: false; error: string };

// ---- dev self-check --------------------------------------------------------
if (import.meta.env.DEV) {
  const fac = (n: number) =>
    showValue(
      evalDerivation(
        emptyVEnv,
        parseExp(`(rfun fac (n:int):int -> if n <= 0 then 1 else n * fac (n - 1)) ${n}`),
        4000,
      ).value!,
    );
  if (fac(3) !== '6') console.error(`[Recursion self-check] fac 3 = ${fac(3)}, expected 6`);
  if (fac(5) !== '120') console.error(`[Recursion self-check] fac 5 = ${fac(5)}, expected 120`);
  const div = evalDerivation(emptyVEnv, parseExp('(rfun loop (x:int):int -> loop x) 0'), 50);
  if (div.value !== null)
    console.error('[Recursion self-check] divergent loop should be capped (null value)');
}

export default function Recursion() {
  const [src, setSrc] = useState(PRESETS[0]);

  const state = useMemo<RState>(() => {
    let exp;
    try {
      exp = parseExp(src);
    } catch (e) {
      if (e instanceof ParseError) return { ok: false, error: e.message };
      throw e;
    }
    const root = evalDerivation(emptyVEnv, exp, BUDGET);
    const flat = flattenEvalPostOrder(root);
    const diverged = root.value === null;
    return {
      ok: true,
      root,
      flat,
      diverged,
      result: root.value ? showValue(root.value) : 'does not terminate',
    };
  }, [src]);

  const total = state.ok ? state.flat.length : 0;
  const stepper = useStepper(total);
  const idx = stepper.stepIdx;
  const activeRule = state.ok && idx > 0 ? state.flat[idx - 1].rule : null;

  return (
    <div className="article">
      <PageMeta
        title="Recursion and Divergence | oCamlCase"
        description="Adding recursive functions (rfun) to ToyCaml: the Srabs typing rule, the Drabs/Drapp evaluation rules with self-referential closures, and how recursion makes non-termination possible."
      />

      <div className="page-header">
        <div className="page-label">Building an Interpreter · 5. Recursion &amp; Divergence</div>
        <h1 className="page-title">Recursion and Divergence</h1>
        <p className="page-intro">
          So far every ToyCaml function is anonymous and cannot refer to itself. We now add a
          recursive abstraction <code>rfun f (x : t) : t&prime; -&gt; e</code>, which introduces a
          name <code>f</code> usable inside the body <code>e</code>. With it we can write the classic
          example:
        </p>
      </div>

      <CodeBlock
        fname="factorial"
        code={`rfun fac (n:int):int -> if n <= 0 then 1 else n * fac (n - 1)`}
      />

      <h2>The rules</h2>
      <p>
        Typing assumes the function already has its declared type while checking the body
        (<code>Srabs</code>). At runtime a recursive function evaluates to a closure that carries its
        own name (<code>Drabs</code>), and applying it rebinds that name before running the body
        (<code>Drapp</code>). Step the widget and watch the dynamic rules light up.
      </p>
      <div className="vr-rules">
        {RULES.map((r) => (
          <RuleBar
            key={r.name}
            name={r.name}
            premises={r.premises}
            conclusion={r.conclusion}
            kind={r.kind}
            active={r.rule !== null && activeRule === r.rule}
          />
        ))}
      </div>

      <h2>Try it</h2>
      <p>
        The first two presets terminate; the third loops forever. To keep the page responsive the
        evaluator is given a finite step budget, so a divergent expression stops with a{' '}
        <em>does not terminate</em> marker instead of freezing the browser.
      </p>

      <div className="lx-widget">
        <div className="lx-input-row">
          <input
            className="lx-input"
            value={src}
            spellCheck={false}
            aria-label="Recursive expression to evaluate"
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
                {state.diverged ? ' (capped)' : ''}
              </span>
            </div>

            {stepper.atEnd && (
              <div className="lx-result">
                <span className="lx-result-label">{state.diverged ? 'result' : 'value'}</span>
                {state.diverged ? '⚠ still running… does not terminate' : state.result}
              </div>
            )}
          </>
        ) : (
          <div className="lx-error">
            <div className="lx-error-msg">Failure "parse": {state.error}</div>
          </div>
        )}
      </div>

      <h2>Implementing recursion</h2>
      <p>
        Only the closure changes: a recursive closure stores the function&rsquo;s own name alongside
        its parameter, body, and captured environment. On application, that name is bound back to the
        closure before the body runs, so a call inside the body finds the function again.
      </p>
      <CodeBlock fname="eval (with rfun)" code={RFUN_CODE} />

      <h2>Divergence</h2>
      <p>
        Without recursion, every admissible ToyCaml expression terminates. Recursive abstractions
        break that guarantee: <code>rfun loop (x:int):int -&gt; loop x</code> applies itself forever.
        Static determinism, dynamic determinism, and type correctness all still hold; only{' '}
        <strong>termination</strong> is lost. Recursion buys a large increase in expressive power,
        and the price is that some well-typed programs now diverge.
      </p>
    </div>
  );
}
