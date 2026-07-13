import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
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
import CmEditor, { type CmEditorHandle, type TypeSig } from './CmEditor';
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

// ── Spinner ───────────────────────────────────────────────────────────────

function Spinner() {
  return <span className="pr-spinner" aria-hidden="true" />;
}

// ── Predict-output exercise ───────────────────────────────────────────────

/** Compare stdout leniently: trim each line, drop trailing blank lines. */
function normalizeOutput(s: string): string {
  const lines = s.replace(/\r\n/g, '\n').split('\n').map((l) => l.trim());
  while (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();
  return lines.join('\n');
}

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
    const ok = normalizeOutput(answer) === normalizeOutput(exercise.expected);
    setCorrect(ok);
    setChecked(true);
    if (ok) onComplete();
  }

  function handleKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter submits; Shift+Enter inserts a newline (output may span lines).
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      check();
    }
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
            <textarea
              className={`pr-predict-input pr-predict-textarea ${checked ? (correct ? 'is-correct' : 'is-wrong') : ''}`}
              placeholder="What does this print?"
              value={answer}
              onChange={(e) => setAnswer(e.currentTarget.value)}
              onKeyDown={handleKey}
              disabled={isDone}
              rows={3}
              spellCheck={false}
              autoCapitalize="none"
              autoCorrect="off"
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
  let s = t.trim().replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
  s = stripOuterParens(s);
  return canonicalizeVars(s);
}

/** Remove redundant balanced outer parens; leave `(a -> b) -> c` intact. */
function stripOuterParens(s: string): string {
  let str = s.trim();
  while (str.length >= 2 && str[0] === '(' && str[str.length - 1] === ')') {
    let depth = 0;
    let wrapsWhole = true;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') depth++;
      else if (str[i] === ')') {
        depth--;
        // Outer parens close before the end => they don't wrap the whole type.
        if (depth === 0 && i < str.length - 1) { wrapsWhole = false; break; }
      }
    }
    if (!wrapsWhole || depth !== 0) break;
    str = str.slice(1, -1).trim();
  }
  return str;
}

/** Rename type vars canonically by first appearance: first distinct -> 'a, etc. */
function canonicalizeVars(s: string): string {
  const map = new Map<string, string>();
  let n = 0;
  return s.replace(/'[A-Za-z_][A-Za-z0-9_]*/g, (orig) => {
    let canon = map.get(orig);
    if (canon === undefined) { canon = "'" + nthVarName(n++); map.set(orig, canon); }
    return canon;
  });
}

/** 0->a ... 25->z, 26->a1, ... (matches OCaml's variable-naming scheme). */
function nthVarName(i: number): string {
  const letter = String.fromCharCode(97 + (i % 26));
  const suffix = Math.floor(i / 26);
  return suffix === 0 ? letter : `${letter}${suffix}`;
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

/** Parse `val name : type = ...` echo lines from toplevel output. */
function parseSignatures(raw: string): TypeSig[] {
  const out: TypeSig[] = [];
  raw.split('\n').forEach((line) => {
    const m = line.match(/^val\s+(\S+)\s*:\s*(.+?)\s*=\s*.*$/);
    if (m) out.push({ name: m[1], type: m[2].trim() });
  });
  return out;
}

/** First non-empty trimmed stdout line (the convention tests print one line). */
function firstLine(raw: string): string {
  return raw.split('\n').map((l) => l.trim()).filter(Boolean)[0] ?? '';
}

function CodeExerciseView({
  exercise,
  onComplete,
  theme,
}: {
  exercise: FixErrorExercise | CompleteExercise | RefactorExercise;
  onComplete: () => void;
  theme: 'light' | 'dark';
}) {
  const { status, run, load } = useOcamlToplevel();
  const [code, setCode] = useState(exercise.starterCode);
  const [results, setResults] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const runBtnRef = useRef<HTMLButtonElement>(null);
  const cmRef = useRef<CmEditorHandle>(null);

  // ── Failure-reason panel ────────────────────────────────────────────────
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [errorCollapsed, setErrorCollapsed] = useState(false);

  // ── .ml / .mli tabs (refactor only) ─────────────────────────────────────
  const isRefactor = exercise.kind === 'refactor';
  const [activeTab, setActiveTab] = useState<'ml' | 'mli'>('ml');
  const [signatures, setSignatures] = useState<TypeSig[]>([]);

  // ── User-authored tests ─────────────────────────────────────────────────
  const [userTests, setUserTests] = useState<TestCase[]>([]);
  const [showAddTest, setShowAddTest] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftExpr, setDraftExpr] = useState('');
  const [draftExpected, setDraftExpected] = useState('');

  const [celebrating, setCelebrating] = useState(false);
  const [confettiOrigin, setConfettiOrigin] = useState<{ x: number; y: number } | null>(null);

  const allTests = [...exercise.tests, ...userTests];
  const userStartIdx = exercise.tests.length;
  const allPass = results.length > 0 && results.every((r) => r.state === 'pass');
  const passCount = results.filter((r) => r.state === 'pass').length;

  // Rows to show: live results once a run happened, else a pending preview.
  const rows: TestResult[] =
    results.length > 0
      ? results
      : allTests.map((t) => ({ name: t.name, state: 'pending', expected: t.expected }));

  // Stored signature fallback for the .mli tab before the first run.
  const mliText =
    signatures.length > 0
      ? signatures.map((s) => `val ${s.name} : ${s.type}`).join('\n')
      : isRefactor && exercise.signature
        ? exercise.signature
        : '';

  function invalidateResults() {
    // User changed the test set -- stale pass/fail no longer applies.
    setResults([]);
  }

  function addTest() {
    if (!draftExpr.trim()) return;
    const name = draftName.trim() || `custom test ${userTests.length + 1}`;
    setUserTests((prev) => [
      ...prev,
      { name, testCode: draftExpr, expected: draftExpected.trim() },
    ]);
    setDraftName('');
    setDraftExpr('');
    setDraftExpected('');
    setShowAddTest(false);
    invalidateResults();
  }

  function removeUserTest(userIdx: number) {
    setUserTests((prev) => prev.filter((_, i) => i !== userIdx));
    invalidateResults();
  }

  const runTests = useCallback(() => {
    if (status !== 'ready') {
      load();
      return;
    }
    setRunning(true);

    const tests = [...exercise.tests, ...userTests];
    setResults(tests.map((t) => ({ name: t.name, state: 'pending', expected: t.expected })));

    try {
      const compileResult = run(code);
      if (compileResult.hasError) {
        setResults(
          tests.map((t) => ({
            name: t.name,
            state: 'fail' as const,
            got: 'compile error',
            expected: t.expected,
          })),
        );
        setSignatures([]);
        cmRef.current?.clearTypeHints();
        setErrorDetail(compileResult.raw.trim() || 'Compilation failed.');
        setErrorCollapsed(false);
        setFailCount((n) => n + 1);
        return;
      }

      // Code compiled -- derive + render inferred type signatures.
      const sigs = parseSignatures(compileResult.raw);
      setSignatures(sigs);
      cmRef.current?.setTypeHints(sigs);

      const filled: TestResult[] = [];
      let allGood = true;
      let firstFailRaw = '';

      for (const t of tests) {
        // Run the test expression alone against the already-compiled code.
        // reset:false keeps the just-compiled definitions in scope, and avoids
        // re-echoing their `val ... = <fun>` signatures into the output (which
        // would make firstLine pick up the signature instead of the printed
        // result).
        const res = run(t.testCode, { reset: false });
        const line = firstLine(res.raw);
        const pass = line === t.expected;
        if (!pass) {
          allGood = false;
          if (!firstFailRaw) firstFailRaw = res.raw;
        }
        filled.push({ name: t.name, state: pass ? 'pass' : 'fail', got: line, expected: t.expected });
      }

      setResults(filled);

      if (allGood) {
        setErrorDetail(null);
        onComplete();
        const el = runBtnRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          setConfettiOrigin({ x: rect.left + rect.width / 2, y: rect.top });
          setCelebrating(true);
        }
      } else {
        const failed = filled.find((r) => r.state === 'fail');
        const summary = failed
          ? `Test "${failed.name}" failed.\nExpected: ${failed.expected}\nGot: ${failed.got || '(nothing)'}\n\n${firstFailRaw.trim()}`
          : firstFailRaw.trim();
        setErrorDetail(summary.trim() || 'A test failed.');
        setErrorCollapsed(false);
        setFailCount((n) => n + 1);
      }
    } finally {
      // Always reset -- a synchronous throw must never leave the button stuck.
      setRunning(false);
    }
  }, [status, run, load, code, exercise, userTests, onComplete]);

  // CodeMirror renders blank if it was display:none (the .mli tab); re-measure
  // whenever the editor tab becomes visible again.
  useEffect(() => {
    if (activeTab === 'ml') {
      const id = requestAnimationFrame(() => cmRef.current?.refresh());
      return () => cancelAnimationFrame(id);
    }
  }, [activeTab]);

  const isLoading = status === 'loading' || running;
  const canShowSolution = exercise.solution != null && failCount >= 2 && !showSolution;

  return (
    <>
      {/* LEFT: description + test results */}
      <div className="pr-left">
        <ExerciseHeader exercise={exercise} />

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
            {rows.map((r, i) => {
              const isUser = i >= userStartIdx;
              return (
                <div
                  key={`${r.name}-${i}`}
                  className={`pr-test ${r.state === 'pass' ? 'is-pass' : r.state === 'fail' ? 'is-fail' : ''}`}
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <span className="pr-test-icon">
                    {r.state === 'pass' ? '✓' : r.state === 'fail' ? '✗' : '·'}
                  </span>
                  <span className="pr-test-name">{r.name}</span>
                  {isUser && <span className="pr-test-tag">yours</span>}
                  {r.state === 'fail' && r.got !== undefined && (
                    <span className="pr-test-detail">
                      got <code>{r.got || 'nothing'}</code>
                    </span>
                  )}
                  {isUser && (
                    <button
                      className="pr-test-remove"
                      onClick={() => removeUserTest(i - userStartIdx)}
                      aria-label={`Remove test ${r.name}`}
                      title="Remove"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {showAddTest ? (
            <div className="pr-add-test">
              <input
                className="pr-add-test-input"
                placeholder="Test name (optional)"
                value={draftName}
                onChange={(e) => setDraftName(e.currentTarget.value)}
              />
              <input
                className="pr-add-test-input pr-add-test-code"
                placeholder={'let () = Printf.printf "%d\\n" (f 7)'}
                value={draftExpr}
                onChange={(e) => setDraftExpr(e.currentTarget.value)}
                spellCheck={false}
                autoCapitalize="none"
                autoCorrect="off"
              />
              <input
                className="pr-add-test-input"
                placeholder="Expected output (e.g. 42)"
                value={draftExpected}
                onChange={(e) => setDraftExpected(e.currentTarget.value)}
              />
              <p className="pr-add-test-hint">
                The expression must print exactly one line; it is compared to the expected output.
              </p>
              <div className="pr-add-test-actions">
                <button className="pr-add-test-confirm" onClick={addTest} disabled={!draftExpr.trim()}>
                  Add test
                </button>
                <button
                  className="pr-add-test-cancel"
                  onClick={() => setShowAddTest(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button className="pr-add-test-btn" onClick={() => setShowAddTest(true)}>
              <span className="pr-add-test-plus">+</span> Add your own test
            </button>
          )}

          {allPass && (
            <div className="pr-success">
              <span className="pr-success-icon">✓</span>
              All tests pass!
            </div>
          )}
        </div>

        <ExerciseFooter exercise={exercise} />
      </div>

      {/* RIGHT: tabbed editor + sticky run bar */}
      <div className="pr-right pr-right-editor">
        <div className="pr-editor-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'ml'}
            className={`pr-tab ${activeTab === 'ml' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('ml')}
          >
            exercise.ml
          </button>
          {isRefactor && (
            <button
              role="tab"
              aria-selected={activeTab === 'mli'}
              className={`pr-tab ${activeTab === 'mli' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('mli')}
              title="Expected type signature"
            >
              exercise.mli
            </button>
          )}
        </div>

        <div className="pr-editor-stage">
          <div
            className="pr-editor-pane"
            style={{ display: activeTab === 'ml' ? 'flex' : 'none' }}
          >
            <CmEditor
              ref={cmRef}
              value={code}
              onChange={setCode}
              disabled={isLoading}
              theme={theme}
              onRun={runTests}
            />
          </div>

          {isRefactor && activeTab === 'mli' && (
            <div className="pr-mli-pane">
              <div className="pr-mli-note">
                {signatures.length > 0
                  ? 'Inferred signature from your last run.'
                  : 'Target signature. Run your code to see the inferred type.'}
              </div>
              <div className="pr-code-block">
                <pre>
                  {(mliText || '(* no signature *)').split('\n').map((line, i) => (
                    <div key={i} className="pr-code-line">
                      <span className="pr-code-gutter">{i + 1}</span>
                      <span className="pr-code-text">{highlightOcaml(line)}</span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          )}

          {errorDetail && (
            <div className={`pr-why ${errorCollapsed ? 'is-collapsed' : ''}`} role="alert">
              <div className="pr-why-head">
                <span className="pr-why-icon">✗</span>
                <span className="pr-why-title">Why it failed</span>
                <button
                  className="pr-why-toggle"
                  onClick={() => setErrorCollapsed((c) => !c)}
                  aria-label={errorCollapsed ? 'Expand' : 'Collapse'}
                  aria-expanded={!errorCollapsed}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 4.5L6 7.5l3-3" />
                  </svg>
                </button>
                <button
                  className="pr-why-close"
                  onClick={() => setErrorDetail(null)}
                  aria-label="Dismiss"
                >
                  ✕
                </button>
              </div>
              <div className="pr-why-body">
                <pre>{errorDetail}</pre>
              </div>
            </div>
          )}
        </div>

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
    <Link to={exercise.conceptLink.href} className="pr-concept-link">
      <span className="pr-concept-icon" aria-hidden="true">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3.5C8 3.5 6.5 2.5 3.5 2.5C2.95 2.5 2.5 2.95 2.5 3.5V12C2.5 12 4 11.5 6 12C7.2 12.3 8 13 8 13V3.5Z" />
          <path d="M8 3.5C8 3.5 9.5 2.5 12.5 2.5C13.05 2.5 13.5 2.95 13.5 3.5V12C13.5 12 12 11.5 10 12C8.8 12.3 8 13 8 13V3.5Z" />
        </svg>
      </span>
      <span className="pr-concept-text">
        <span className="pr-concept-eyebrow">Related concept</span>
        <span className="pr-concept-label">{exercise.conceptLink.label}</span>
      </span>
      <span className="pr-concept-arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
        </svg>
      </span>
    </Link>
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
        return <CodeExerciseView key={exercise.id} exercise={exercise} onComplete={onComplete} theme={theme} />;
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
