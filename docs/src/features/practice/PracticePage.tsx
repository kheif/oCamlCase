import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type UIEvent,
} from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { KIND_LABEL } from './data/labels';
import { highlightOcaml } from '../../lib/highlightOcaml';
import { useTheme } from '../../hooks/useTheme';
import { useOcamlToplevel } from '../../hooks/useOcamlToplevel';
import { usePracticeProgress } from '../../hooks/usePracticeProgress';
import { practiceExerciseById, practiceExercises } from './data';
import type {
  CompleteExercise,
  FixErrorExercise,
  PracticeExercise,
  PredictOutputExercise,
  PredictTypeExercise,
  RefactorExercise,
  TestCase,
} from './data/types';
import ConfettiBurst from '../mini-exercises/ConfettiBurst';
import KindIcon from './KindIcon';
import './Practice.css';

// ── Syntax-highlighted read-only code block ───────────────────────────────

function CodeBlock({ code }: { code: string }) {
  const lines = code.split('\n');
  return (
    <div className="pr-code-block">
      <pre>
        {lines.map((line, i) => (
          <div key={i} className="pr-code-line">
            <span className="pr-code-gutter">{i + 1}</span>
            <span className="pr-code-text">{highlightOcaml(line)}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

// ── Editable code editor (highlighted backdrop trick) ─────────────────────

function CodeEditor({
  value,
  onChange,
  disabled,
  filename,
  onRun,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  filename: string;
  onRun?: () => void;
}) {
  const preRef = useRef<HTMLPreElement>(null);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    // Ctrl+Enter / Cmd+Enter → run
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && onRun) {
      e.preventDefault();
      onRun();
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = value.slice(0, start) + '  ' + value.slice(end);
      onChange(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2;
      });
    }
  }

  function handleScroll(e: UIEvent<HTMLTextAreaElement>) {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  }

  const lines = value.split('\n');

  return (
    <div className="pr-editor-wrap">
      <div className="pr-editor-tab">
        <span className="pr-editor-tab-dot" />
        <span className="pr-editor-tab-dot" />
        <span className="pr-editor-tab-dot" />
        <span className="pr-editor-tab-name">{filename}</span>
      </div>
      <div className="pr-editor-inner">
        <div className="pr-editor-sizer" aria-hidden="true">{value + '\n'}</div>
        <pre ref={preRef} className="pr-editor-highlight" aria-hidden="true">
          {lines.map((line, i) => (
            <span key={i} className="pr-hl-line">
              {highlightOcaml(line)}
              {i < lines.length - 1 && '\n'}
            </span>
          ))}
          {'\n'}
        </pre>
        <textarea
          className="pr-editor-textarea"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          disabled={disabled}
          spellCheck={false}
          autoCapitalize="none"
          autoCorrect="off"
        />
      </div>
    </div>
  );
}

// ── Spinner ───────────────────────────────────────────────────────────────

function Spinner() {
  return <span className="pr-spinner" aria-hidden="true" />;
}

// ── Predict-output exercise ───────────────────────────────────────────────

function PredictOutputView({
  exercise,
  onComplete,
}: {
  exercise: PredictOutputExercise;
  onComplete: () => void;
}) {
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  function check() {
    if (!answer.trim()) return;
    const ok = answer.trim() === exercise.expected.trim();
    setCorrect(ok);
    setChecked(true);
    if (ok) onComplete();
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') check();
  }

  const isDone = checked && correct;

  return (
    <>
      {/* LEFT panel content */}
      <div className="pr-left">
        <ExerciseHeader exercise={exercise} />

        <div className="pr-section">
          <div className="pr-section-label">Your prediction</div>
          <div className="pr-predict-input-row">
            <div className="pr-terminal-prompt">$</div>
            <input
              type="text"
              className={`pr-predict-input ${checked ? (correct ? 'is-correct' : 'is-wrong') : ''}`}
              placeholder="What does this print?"
              value={answer}
              onChange={(e) => setAnswer(e.currentTarget.value)}
              onKeyDown={handleKey}
              disabled={isDone}
              autoFocus
            />
          </div>
          {!isDone && (
            <button
              className="pr-run-btn"
              onClick={check}
              disabled={!answer.trim()}
            >
              Check answer
              <kbd className="pr-kbd">↵</kbd>
            </button>
          )}
        </div>

        {checked && (
          <div className={`pr-feedback ${correct ? 'is-correct' : 'is-wrong'}`}>
            <div className="pr-feedback-row">
              <span className="pr-feedback-icon">{correct ? '✓' : '✗'}</span>
              <span className="pr-feedback-headline">
                {correct ? 'Correct!' : 'Not quite -- try again.'}
              </span>
            </div>
            {!correct && (
              <div className="pr-feedback-hint">
                Expected output: <code>{exercise.expected}</code>
              </div>
            )}
            {(correct || checked) && (
              <div className="pr-feedback-explanation">{exercise.explanation}</div>
            )}
          </div>
        )}

        <ExerciseFooter exercise={exercise} />
      </div>

      {/* RIGHT panel content */}
      <div className="pr-right pr-right-code">
        <div className="pr-right-label">Code</div>
        <CodeBlock code={exercise.code} />
      </div>
    </>
  );
}

// ── Predict-type exercise ─────────────────────────────────────────────────

function normalizeType(t: string): string {
  return t.trim().replace(/\s+/g, ' ').replace(/\( /g, '(').replace(/ \)/g, ')');
}

function PredictTypeView({
  exercise,
  onComplete,
}: {
  exercise: PredictTypeExercise;
  onComplete: () => void;
}) {
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  function check() {
    if (!answer.trim()) return;
    const ok = normalizeType(answer) === normalizeType(exercise.expected);
    setCorrect(ok);
    setChecked(true);
    if (ok) onComplete();
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') check();
  }

  const isDone = checked && correct;

  return (
    <>
      <div className="pr-left">
        <ExerciseHeader exercise={exercise} />

        <div className="pr-section">
          <div className="pr-section-label">Your answer</div>
          <div className="pr-predict-input-row">
            <div className="pr-terminal-prompt">val f :</div>
            <input
              type="text"
              className={`pr-predict-input ${checked ? (correct ? 'is-correct' : 'is-wrong') : ''}`}
              placeholder="'a -> 'b -> 'a"
              value={answer}
              onChange={(e) => setAnswer(e.currentTarget.value)}
              onKeyDown={handleKey}
              disabled={isDone}
              autoFocus
            />
          </div>
          {!isDone && (
            <button
              className="pr-run-btn"
              onClick={check}
              disabled={!answer.trim()}
            >
              Check type
              <kbd className="pr-kbd">↵</kbd>
            </button>
          )}
        </div>

        {checked && (
          <div className={`pr-feedback ${correct ? 'is-correct' : 'is-wrong'}`}>
            <div className="pr-feedback-row">
              <span className="pr-feedback-icon">{correct ? '✓' : '✗'}</span>
              <span className="pr-feedback-headline">
                {correct ? 'Correct!' : 'Not quite -- try again.'}
              </span>
            </div>
            {!correct && (
              <div className="pr-feedback-hint">
                Correct type: <code>{exercise.expected}</code>
              </div>
            )}
            {(correct || checked) && (
              <div className="pr-feedback-explanation">{exercise.explanation}</div>
            )}
          </div>
        )}

        <ExerciseFooter exercise={exercise} />
      </div>

      <div className="pr-right pr-right-code">
        <div className="pr-right-label">Expression</div>
        <CodeBlock code={exercise.code} />
      </div>
    </>
  );
}

// ── Code exercises (fix-error / complete / refactor) ──────────────────────

type TestResult = {
  name: string;
  state: 'pending' | 'pass' | 'fail';
  got?: string;
  expected: string;
};

function CodeExerciseView({
  exercise,
  onComplete,
}: {
  exercise: FixErrorExercise | CompleteExercise | RefactorExercise;
  onComplete: () => void;
}) {
  const { status, run, load } = useOcamlToplevel();
  const [code, setCode] = useState(exercise.starterCode);
  const [results, setResults] = useState<TestResult[]>([]);
  const [rawOutput, setRawOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const runBtnRef = useRef<HTMLButtonElement>(null);

  const [celebrating, setCelebrating] = useState(false);
  const [confettiOrigin, setConfettiOrigin] = useState<{ x: number; y: number } | null>(null);

  const allPass = results.length > 0 && results.every((r) => r.state === 'pass');
  const passCount = results.filter((r) => r.state === 'pass').length;

  const runTests = useCallback(() => {
    if (status !== 'ready') {
      load();
      return;
    }
    setRunning(true);
    setRawOutput('');

    const testResults: TestResult[] = exercise.tests.map((t) => ({
      name: t.name,
      state: 'pending',
      expected: t.expected,
    }));
    setResults(testResults);

    const compileResult = run(code);
    if (compileResult.hasError) {
      setRawOutput(compileResult.raw);
      setResults(testResults.map((r) => ({ ...r, state: 'fail' as const, got: 'compile error' })));
      setRunning(false);
      setFailCount((n) => n + 1);
      return;
    }

    const filled: TestResult[] = [];
    let allGood = true;
    let accOutput = '';

    for (let i = 0; i < exercise.tests.length; i++) {
      const t: TestCase = exercise.tests[i];
      const res = run(code + '\n' + t.testCode);
      const line = res.raw.split('\n').map((l) => l.trim()).filter(Boolean)[0] ?? '';
      const pass = line === t.expected;
      if (!pass) allGood = false;
      accOutput += res.raw + '\n';
      filled.push({ name: t.name, state: pass ? 'pass' : 'fail', got: line, expected: t.expected });
    }

    setResults(filled);
    setRawOutput(accOutput.trim());
    setRunning(false);

    if (allGood) {
      onComplete();
      const el = runBtnRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        setConfettiOrigin({ x: rect.left + rect.width / 2, y: rect.top });
        setCelebrating(true);
      }
    } else {
      setFailCount((n) => n + 1);
    }
  }, [status, run, load, code, exercise, onComplete]);

  const isLoading = status === 'loading' || running;
  const canShowSolution = exercise.solution != null && failCount >= 2 && !showSolution;

  return (
    <>
      {/* LEFT: description + test results */}
      <div className="pr-left">
        <ExerciseHeader exercise={exercise} />

        {results.length > 0 && (
          <div className="pr-section">
            <div className="pr-section-label">
              Tests
              {results.length > 0 && (
                <span className={`pr-test-score ${allPass ? 'all-pass' : ''}`}>
                  {passCount} / {results.length}
                </span>
              )}
            </div>
            <div className="pr-tests">
              {results.map((r, i) => (
                <div
                  key={r.name}
                  className={`pr-test ${r.state === 'pass' ? 'is-pass' : r.state === 'fail' ? 'is-fail' : ''}`}
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <span className="pr-test-icon">
                    {r.state === 'pass' ? '✓' : r.state === 'fail' ? '✗' : '·'}
                  </span>
                  <span className="pr-test-name">{r.name}</span>
                  {r.state === 'fail' && r.got !== undefined && (
                    <span className="pr-test-detail">
                      got <code>{r.got || 'nothing'}</code>
                    </span>
                  )}
                </div>
              ))}
            </div>

            {allPass && (
              <div className="pr-success">
                <span className="pr-success-icon">✓</span>
                All tests pass!
              </div>
            )}
          </div>
        )}

        {rawOutput && !allPass && (
          <details className="pr-output-details">
            <summary className="pr-output-summary">OCaml output</summary>
            <div className="pr-output">{rawOutput}</div>
          </details>
        )}

        <ExerciseFooter exercise={exercise} />
      </div>

      {/* RIGHT: editor + sticky run bar */}
      <div className="pr-right pr-right-editor">
        <CodeEditor
          value={code}
          onChange={setCode}
          disabled={isLoading}
          filename="exercise.ml"
          onRun={runTests}
        />

        <div className="pr-run-bar">
          <button
            ref={runBtnRef}
            className={`pr-run-btn ${isLoading ? 'is-loading' : ''}`}
            onClick={runTests}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner />
                {status === 'loading' ? 'Loading OCaml...' : 'Running...'}
              </>
            ) : (
              <>
                Run Tests
                <kbd className="pr-kbd">⌘↵</kbd>
              </>
            )}
          </button>

          {status === 'error' && (
            <span className="pr-run-bar-error">Failed to load OCaml runtime</span>
          )}

          {canShowSolution && (
            <button
              className="pr-solution-btn"
              onClick={() => {
                setShowSolution(true);
                setCode(exercise.solution!);
              }}
            >
              Show solution
            </button>
          )}
        </div>
      </div>

      {celebrating && confettiOrigin && (
        <ConfettiBurst
          origin={confettiOrigin}
          onDone={() => setCelebrating(false)}
        />
      )}
    </>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────

function ExerciseHeader({ exercise }: { exercise: PracticeExercise }) {
  return (
    <div className="pr-ex-header">
      <div className="pr-badges">
        <span className="pr-badge pr-badge-kind">
          <span className="pr-badge-icon"><KindIcon kind={exercise.kind} /></span>
          {KIND_LABEL[exercise.kind]}
        </span>
        <span className={`pr-badge pr-badge-${exercise.difficulty}`}>
          {exercise.difficulty}
        </span>
      </div>
      <h1 className="pr-title">{exercise.title}</h1>
      <p className="pr-prompt">{exercise.prompt}</p>
    </div>
  );
}

function ExerciseFooter({ exercise }: { exercise: PracticeExercise }) {
  if (!exercise.conceptLink) return null;
  return (
    <div className="pr-concept-link">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M6 1L6 11M1 6L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <Link to={exercise.conceptLink.href}>{exercise.conceptLink.label}</Link>
    </div>
  );
}

// ── Top-level page ────────────────────────────────────────────────────────

export default function PracticePage() {
  const { id } = useParams<{ id: string }>();
  const exercise = id ? practiceExerciseById[id] : undefined;
  const { completed, markComplete } = usePracticeProgress();
  if (!exercise) return <Navigate to="/exercises" replace />;
  return <PracticeInner exercise={exercise} completed={completed} markComplete={markComplete} />;
}

function PracticeInner({
  exercise,
  completed,
  markComplete,
}: {
  exercise: PracticeExercise;
  completed: Set<string>;
  markComplete: (id: string) => void;
}) {
  const { theme, toggle } = useTheme();
  // Scope navigation to the same kind so prev/next stays within the exercise type
  const sameKind = practiceExercises.filter((e) => e.kind === exercise.kind);
  const total = sameKind.length;
  const idx = sameKind.findIndex((e) => e.id === exercise.id);
  const prev = idx > 0 ? sameKind[idx - 1] : null;
  const next = idx < total - 1 ? sameKind[idx + 1] : null;
  const isDone = completed.has(exercise.id);

  const onComplete = useCallback(() => markComplete(exercise.id), [exercise.id, markComplete]);

  function renderPanels() {
    switch (exercise.kind) {
      case 'predict-output':
        return <PredictOutputView key={exercise.id} exercise={exercise} onComplete={onComplete} />;
      case 'predict-type':
        return <PredictTypeView key={exercise.id} exercise={exercise} onComplete={onComplete} />;
      case 'fix-error':
      case 'complete':
      case 'refactor':
        return <CodeExerciseView key={exercise.id} exercise={exercise} onComplete={onComplete} />;
    }
  }

  return (
    <div className="pr-page" data-theme={theme}>
      <div className="pr-topbar">
        <Link to="/" className="pr-brand">
          <img src="/flaticon.png" alt="" />
          <span>o<em>Caml</em>Case</span>
        </Link>
        <span className="pr-sep">/</span>
        <Link to={`/exercises/practice/kind/${exercise.kind}`} className="pr-breadcrumb">{KIND_LABEL[exercise.kind]}</Link>
        <span className="pr-sep">/</span>
        <span className="pr-current-title">{exercise.title}</span>

        <div className="pr-topright">
          <span className="pr-counter">
            {isDone && <span className="pr-counter-check">✓</span>}
            {idx + 1} <span className="pr-counter-of">of</span> {total}
          </span>

          <div className="pr-dots" aria-hidden="true">
            {sameKind.map((e, i) => (
              <div
                key={e.id}
                className={`pr-dot ${completed.has(e.id) ? 'is-done' : ''} ${i === idx ? 'is-current' : ''}`}
                title={e.title}
              />
            ))}
          </div>

          {prev ? (
            <Link to={`/exercises/practice/${prev.id}`} className="pr-nav-btn" title={prev.title}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 3L5 7l4 4"/></svg>
            </Link>
          ) : (
            <span className="pr-nav-btn is-disabled"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 3L5 7l4 4"/></svg></span>
          )}
          {next ? (
            <Link to={`/exercises/practice/${next.id}`} className="pr-nav-btn" title={next.title}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 3l4 4-4 4"/></svg>
            </Link>
          ) : (
            <span className="pr-nav-btn is-disabled"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 3l4 4-4 4"/></svg></span>
          )}

          <button className="pr-theme-btn" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <circle cx="8" cy="8" r="3"/>
                <line x1="8" y1="1" x2="8" y2="3"/><line x1="8" y1="13" x2="8" y2="15"/>
                <line x1="1" y1="8" x2="3" y2="8"/><line x1="13" y1="8" x2="15" y2="8"/>
                <line x1="3.05" y1="3.05" x2="4.46" y2="4.46"/><line x1="11.54" y1="11.54" x2="12.95" y2="12.95"/>
                <line x1="12.95" y1="3.05" x2="11.54" y2="4.46"/><line x1="4.46" y1="11.54" x2="3.05" y2="12.95"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M13.5 9A5.5 5.5 0 0 1 6.5 2a5.5 5.5 0 1 0 7 7Z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="pr-main">
        {renderPanels()}
      </div>
    </div>
  );
}
