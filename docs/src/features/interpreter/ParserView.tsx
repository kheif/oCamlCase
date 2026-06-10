import { useMemo, useState } from 'react';
import { useStepper } from '../../hooks/useStepper';
import { showExpAst } from '../toycaml/ast';
import { lex, LexError, showToken, type Token } from './lex';
import { parse, ParseError, activeNode, consumedCount, type Cst } from './parse';

// Interactive recursive-descent parser for the lecture's fragment. Lex the
// source, then step through the parse: the token cursor advances as terminals
// are consumed, and the concrete syntax tree grows top-down — choose a
// production for `exp`, then descend into its parts. The abstract syntax tree
// the parser returns is shown once parsing completes.

const PRESETS = [
  'fun (x:bool) -> if x then 1 else 0',
  'if false then 0 else 1',
  'fun (n:int) -> n',
  'if true then x else y',
];

type PState =
  | { ok: true; tokens: Token[]; cst: Cst; steps: number; ast: string }
  | { ok: false; phase: 'lex' | 'parse'; error: string; tokenIndex?: number };

// ---- concrete syntax tree (revealed up to stepIdx) -------------------------

function CstView({ node, stepIdx }: { node: Cst; stepIdx: number }) {
  if (node.order > stepIdx) return null;
  const active = node.order === stepIdx;
  const kids = node.children.filter((c) => c.order <= stepIdx);
  return (
    <div className="cst-node">
      <div className={`cst-box cst-${node.kind} ${active ? 'is-active' : ''}`}>{node.label}</div>
      {kids.length > 0 && (
        <>
          <div className="cst-connector" aria-hidden="true" />
          <div className="cst-children">
            {kids.map((c) => (
              <CstView key={c.id} node={c} stepIdx={stepIdx} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ParserView() {
  const [src, setSrc] = useState(PRESETS[0]);

  const state = useMemo<PState>(() => {
    let tokens: Token[];
    try {
      tokens = lex(src).tokens;
    } catch (e) {
      if (e instanceof LexError) return { ok: false, phase: 'lex', error: e.message };
      throw e;
    }
    try {
      const { cst, exp, steps } = parse(tokens);
      return { ok: true, tokens, cst, steps, ast: showExpAst(exp) };
    } catch (e) {
      if (e instanceof ParseError)
        return { ok: false, phase: 'parse', error: e.message, tokenIndex: e.tokenIndex };
      throw e;
    }
  }, [src]);

  const totalSteps = state.ok ? state.steps : 0;
  const stepper = useStepper(totalSteps);
  const idx = stepper.stepIdx;

  const cursor = state.ok ? consumedCount(state.cst, idx) : 0;
  const active = state.ok ? activeNode(state.cst, idx) : null;

  function tokenClass(i: number): string {
    if (active?.kind === 'term' && active.tokenIndex === i) return 'lx-token is-consumed-now';
    if (i < cursor) return 'lx-token is-consumed';
    if (i === cursor) return 'lx-token is-cursor';
    return 'lx-token is-ahead';
  }

  return (
    <div className="lx-widget">
      <div className="lx-input-row">
        <input
          className="lx-input"
          value={src}
          spellCheck={false}
          aria-label="Source to parse"
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
          <div className="lx-label">tokens (cursor →)</div>
          <div className="lx-tokens">
            {state.tokens.map((t, i) => (
              <span key={i} className={tokenClass(i)}>
                {showToken(t)}
              </span>
            ))}
          </div>

          <div className="lx-label" style={{ marginTop: 'var(--s4)' }}>
            concrete syntax tree
          </div>
          <div className="cst-canvas">
            {idx === 0 ? (
              <span className="lx-tokens-empty">press ▶ Play to parse</span>
            ) : (
              <CstView node={state.cst} stepIdx={idx} />
            )}
          </div>

          <div className="lx-caption">
            {active ? active.desc : 'Press ▶ Play (or Next) to run the parser one step at a time.'}
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
              Step {idx} / {totalSteps}
            </span>
          </div>

          {stepper.atEnd && (
            <div className="lx-result">
              <span className="lx-result-label">abstract syntax</span>
              {state.ast}
            </div>
          )}
        </>
      ) : (
        <div className="lx-error">
          <div className="lx-error-msg">
            {state.phase === 'lex' ? 'Failure "lex"' : 'Failure "parse"'}: {state.error}
          </div>
        </div>
      )}
    </div>
  );
}
