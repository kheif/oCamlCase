import { useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { showExpAst, showTy } from '../toycaml/ast';
import { showValue } from './evalTrace';
import { showToken } from './lex';
import { runPipeline, type PipelineRun } from './pipeline';
import PipelineRail from './PipelineRail';
import './Interpreter.css';

// ---- presets -----------------------------------------------------------------

const PRESETS: { label: string; src: string }[] = [
  { label: 'apply a function', src: '(fun (x : int) -> x + 1) 5' },
  { label: 'conditional', src: 'if 2 <= 1 then 1 else 0' },
  {
    label: 'factorial',
    src: '(rfun fact (n : int) : int -> if n <= 1 then 1 else n * fact (n - 1)) 5',
  },
  { label: 'type error', src: 'if 1 then 2 else 3' },
  { label: 'divergence', src: '(rfun loop (x : int) : int -> loop x) 0' },
];

// ---- dev self-check: the pipeline must agree with the per-stage engines -------
if (import.meta.env.DEV) {
  const ok = runPipeline('(fun (x : int) -> x + 1) 5');
  if (!ok.ty || showTy(ok.ty) !== 'int' || !ok.value || showValue(ok.value) !== '6')
    console.error('[capstone self-check] apply: expected int / 6, got', ok);
  const fact = runPipeline(PRESETS[2].src);
  if (!fact.value || showValue(fact.value) !== '120')
    console.error('[capstone self-check] factorial: expected 120, got', fact);
  const bad = runPipeline('if 1 then 2 else 3');
  if (bad.failedAt !== 'type')
    console.error('[capstone self-check] type error: expected failure at type, got', bad);
}

// ---- page ----------------------------------------------------------------------

type HistoryEntry = { run: PipelineRun };

function resultSummary(run: PipelineRun): string {
  if (run.failedAt) return `✗ ${run.failedAt}`;
  return run.value ? `⇒ ${showValue(run.value)}` : '';
}

export default function Capstone() {
  const [src, setSrc] = useState(PRESETS[0].src);
  const [run, setRun] = useState<PipelineRun | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  function execute(text: string) {
    if (!text.trim()) return;
    const result = runPipeline(text);
    setRun(result);
    setHistory((h) => [{ run: result }, ...h.filter((e) => e.run.src !== text)].slice(0, 12));
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') execute(src);
  }

  function recall(entry: HistoryEntry) {
    setSrc(entry.run.src);
    setRun(entry.run);
  }

  return (
    <div className="article">
      <PageMeta
        title="Capstone: the Whole Pipeline | oCamlCase"
        description="Every stage of the ToyCaml interpreter in one REPL: type an expression and watch it travel from characters through tokens and the syntax tree to a type and finally a value."
      />

      <div className="page-header">
        <div className="page-label">Building an Interpreter · Capstone</div>
        <h1 className="page-title">The whole pipeline, one expression at a time</h1>
        <p className="page-intro">
          Everything the series built, wired end to end. Type a ToyCaml expression and run it:
          the rail shows how far it travels (lexing, parsing, type checking, evaluation), and
          each stage&rsquo;s real output appears below. A program that fails one stage never
          reaches the next -- exactly how the pipeline protects the evaluator.
        </p>
      </div>

      <div className="cp-input-row">
        <input
          className="cp-input"
          value={src}
          onChange={(e) => setSrc(e.currentTarget.value)}
          onKeyDown={handleKey}
          spellCheck={false}
          autoCapitalize="none"
          autoCorrect="off"
          aria-label="ToyCaml expression"
        />
        <button className="cp-run" onClick={() => execute(src)} disabled={!src.trim()}>
          Run <kbd>↵</kbd>
        </button>
      </div>

      <div className="cp-presets">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            className="cp-preset"
            onClick={() => {
              setSrc(p.src);
              execute(p.src);
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <PipelineRail run={run} />

      {run && run.failedAt && (
        <div className="cp-error" role="alert">
          <span className="cp-error-stage">{run.failedAt}</span> {run.error}
        </div>
      )}

      {run && (
        <div className="cp-stages">
          {run.tokens && (
            <section className="cp-stage-card">
              <h3>Tokens</h3>
              <pre className="cp-out">[{run.tokens.map(showToken).join('; ')}]</pre>
              <Link className="cp-stage-link" to="/interpreter/lexing">How lexing works →</Link>
            </section>
          )}
          {run.exp && (
            <section className="cp-stage-card">
              <h3>Abstract syntax tree</h3>
              <pre className="cp-out">{showExpAst(run.exp)}</pre>
              <Link className="cp-stage-link" to="/interpreter/parsing">How parsing works →</Link>
            </section>
          )}
          {run.ty && (
            <section className="cp-stage-card">
              <h3>Type</h3>
              <pre className="cp-out">- : {showTy(run.ty)}</pre>
              <Link className="cp-stage-link" to="/concepts/static-semantics">
                How type checking works →
              </Link>
            </section>
          )}
          {run.value && (
            <section className="cp-stage-card">
              <h3>Value</h3>
              <pre className="cp-out">{showValue(run.value)}</pre>
              <Link className="cp-stage-link" to="/interpreter/dynamics">
                How evaluation works →
              </Link>
            </section>
          )}
        </div>
      )}

      {history.length > 0 && (
        <>
          <h2>History</h2>
          <div className="cp-history">
            {history.map((entry) => (
              <button
                key={entry.run.src}
                className={`cp-history-row ${entry.run.failedAt ? 'is-fail' : 'is-ok'}`}
                onClick={() => recall(entry)}
                title="Load this expression"
              >
                <code className="cp-history-src">{entry.run.src}</code>
                <span className="cp-history-result">{resultSummary(entry.run)}</span>
              </button>
            ))}
          </div>
        </>
      )}

      <div className="lx-next">
        Want the stages one at a time? Start at the{' '}
        <Link to="/interpreter">series overview</Link>, or open the{' '}
        <Link to="/playground">Playground</Link> to write real OCaml.
      </div>
    </div>
  );
}
