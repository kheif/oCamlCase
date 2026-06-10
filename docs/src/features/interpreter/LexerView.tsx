import { useMemo, useState } from 'react';
import { useStepper } from '../../hooks/useStepper';
import { lex, showToken, LexError, type LexStep, type Token } from './lex';

// Interactive lexer: type a source string and watch `lex` consume it one token
// at a time. The character strip shows what has been read (done), what is being
// read right now (active), and what is still ahead (future); the token strip
// grows in lockstep. Maximal munch is visible directly — a multi-character
// number or identifier lights up as one active span.

const PRESETS = [
  '(int->bool)->int',
  'int bool->int',
  'fun (x:bool) -> if x then 1 else 0',
  'if false then 0 else 1',
];

type LexState =
  | { ok: true; steps: LexStep[]; tokens: Token[] }
  | { ok: false; error: string; pos: number };

export default function LexerView() {
  const [src, setSrc] = useState(PRESETS[0]);

  const state = useMemo<LexState>(() => {
    try {
      const { steps, tokens } = lex(src);
      return { ok: true, steps, tokens };
    } catch (e) {
      if (e instanceof LexError) return { ok: false, error: e.message, pos: e.pos };
      throw e;
    }
  }, [src]);

  const steps = state.ok ? state.steps : [];
  const stepper = useStepper(steps.length);
  const idx = stepper.stepIdx;

  const activeStep = idx > 0 ? steps[idx - 1] : null;
  // Steps cover the source contiguously from 0, so the consumed prefix ends
  // exactly where the most recent step ended.
  const consumedEnd = idx > 0 ? steps[idx - 1].end : 0;
  const emitted = steps.slice(0, idx).filter((s) => s.token);

  const chars = [...src];

  function charClass(i: number): string {
    if (activeStep && i >= activeStep.start && i < activeStep.end) return 'lx-char is-active';
    if (i < consumedEnd) return 'lx-char is-done';
    return 'lx-char is-future';
  }

  function caption(): string {
    if (!activeStep) return 'Press ▶ Play (or Next) to run the lexer one step at a time.';
    const span = src.slice(activeStep.start, activeStep.end);
    if (activeStep.token === null) return 'skip whitespace';
    const munch = activeStep.end - activeStep.start > 1 ? ' (maximal munch: longest match)' : '';
    return `emit ${showToken(activeStep.token)} from "${span}"${munch}`;
  }

  return (
    <div className="lx-widget">
      <div className="lx-input-row">
        <input
          className="lx-input"
          value={src}
          spellCheck={false}
          aria-label="Source to lex"
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
          <div className="lx-label">characters</div>
          <div className="lx-chars" aria-label="source characters">
            {chars.map((c, i) => (
              <span key={i} className={charClass(i)}>
                {c === ' ' ? '·' : c === '\t' ? '⇥' : c}
              </span>
            ))}
          </div>

          <div className="lx-arrow" aria-hidden="true">
            ↓ lex
          </div>

          <div className="lx-label">tokens</div>
          <div className="lx-tokens" aria-label="emitted tokens">
            {emitted.length === 0 ? (
              <span className="lx-tokens-empty">[]</span>
            ) : (
              emitted.map((s, k) => (
                <span
                  key={k}
                  className={`lx-token ${k === emitted.length - 1 && !stepper.atEnd ? 'is-new' : ''}`}
                >
                  {showToken(s.token!)}
                </span>
              ))
            )}
          </div>

          <div className="lx-caption">{caption()}</div>

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
              Step {idx} / {steps.length}
            </span>
          </div>

          {stepper.atEnd && (
            <div className="lx-result">
              <span className="lx-result-label">result</span>
              [{state.tokens.map(showToken).join('; ')}]
            </div>
          )}
        </>
      ) : (
        <div className="lx-error">
          <div className="lx-error-msg">Failure "lex": {state.error}</div>
          <div className="lx-error-src">
            {[...src].map((c, i) => (
              <span key={i} className={i === state.pos ? 'lx-error-caret' : ''}>
                {c === ' ' ? '·' : c}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
