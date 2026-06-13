import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { miniExercises } from '../mini-exercises/data';
import { useMiniProgress } from '../../hooks/useMiniProgress';
import { usePracticeProgress } from '../../hooks/usePracticeProgress';
import { practiceExercises } from '../practice/data';
import { fullExercises } from './fullExerciseData';
import { KIND_LABEL, KIND_DESC, SECTION_ORDER } from '../practice/data/labels';
import type { PracticeExercise } from '../practice/data/types';
import KindIcon from '../practice/KindIcon';
import './ExercisesHub.css';

// ── Demo: Challenges ─────────────────────────────────────────────────────────

function ChallengesDemo() {
  return (
    <div className="hub-demo hub-demo-challenges" aria-hidden="true">
      <div className="hdc-editor">
        <div className="hdc-tab">
          <span className="hdc-tab-dot" />
          <span className="hdc-tab-dot" />
          <span className="hdc-tab-dot" />
          <span className="hdc-tab-name">solution.ml</span>
        </div>
        <div className="hdc-code">
          <span className="hdc-line">
            <span className="hdc-kw">let rec</span>
            {' '}
            <span className="hdc-fn">fib</span> n =
          </span>
          <span className="hdc-line">
            {'  '}
            <span className="hdc-kw">if</span> n {'<='} 1 <span className="hdc-kw">then</span> n
          </span>
          <span className="hdc-line">
            {'  '}
            <span className="hdc-kw">else</span>{' '}
            <span className="hdc-fn">fib</span> (n-<span className="hdc-num">1</span>) +{' '}
            <span className="hdc-fn">fib</span> (n-<span className="hdc-num">2</span>)
          </span>
        </div>
      </div>
      <div className="hdc-panel">
        <div className="hdc-run-btn">
          <span className="hdc-play">▶</span> Run Tests
        </div>
        <div className="hdc-results">
          <div className="hdc-test hdc-test-1">
            <span className="hdc-check">✓</span>
            <span className="hdc-test-name">fib 0 = 0</span>
          </div>
          <div className="hdc-test hdc-test-2">
            <span className="hdc-check">✓</span>
            <span className="hdc-test-name">fib 5 = 5</span>
          </div>
          <div className="hdc-test hdc-test-3">
            <span className="hdc-check">✓</span>
            <span className="hdc-test-name">fib 10 = 55</span>
          </div>
          <div className="hdc-banner">All tests pass!</div>
        </div>
      </div>
    </div>
  );
}

// ── Demo: Drag & Drop ─────────────────────────────────────────────────────────

function DragDropDemo() {
  return (
    <div className="hub-demo hub-demo-drag" aria-hidden="true">
      <div className="hdd-prompt">Put the lines in order:</div>
      <div className="hdd-lines">
        <div className="hdd-line hdd-line-a">
          <span className="hdd-handle">⠿</span>
          <span className="hdd-code">
            {'  | [] -> '}
            <span className="hdd-num">0</span>
          </span>
        </div>
        <div className="hdd-line hdd-line-b">
          <span className="hdd-handle">⠿</span>
          <span className="hdd-code">
            <span className="hdd-kw">let rec</span> sum xs =
          </span>
        </div>
        <div className="hdd-line hdd-line-c">
          <span className="hdd-handle">⠿</span>
          <span className="hdd-code">
            {'  | x :: rest -> '}x + sum rest
          </span>
        </div>
      </div>
      <div className="hdd-ok">
        <span className="hdd-ok-icon">✓</span> Correct order!
      </div>
    </div>
  );
}

// ── Demo: Predict Output ──────────────────────────────────────────────────────

function PredictOutputDemo() {
  return (
    <div className="hub-demo hub-demo-output" aria-hidden="true">
      <div className="hdp-question">
        What does this print?
        <div className="hdp-code">
          <span className="hdp-kw">let</span> x = <span className="hdp-num">1</span>{' '}
          <span className="hdp-kw">in</span>
          <br />
          <span className="hdp-kw">let</span> f () = x{' '}
          <span className="hdp-kw">in</span>
          <br />
          <span className="hdp-kw">let</span> x = <span className="hdp-num">2</span>{' '}
          <span className="hdp-kw">in</span>
          <br />
          Printf.printf <span className="hdp-str">"%d"</span> (f ())
        </div>
      </div>
      <div className="hdp-input-row">
        <span className="hdp-prompt">$</span>
        <span className="hdp-typing">1</span>
        <span className="hdp-cursor" />
      </div>
      <div className="hdp-feedback">
        <span className="hdp-check">✓</span> Correct! Lexical scope.
      </div>
    </div>
  );
}

// ── Demo: Predict Type ────────────────────────────────────────────────────────

function PredictTypeDemo() {
  return (
    <div className="hub-demo hub-demo-type" aria-hidden="true">
      <div className="hpt-repl">
        <div className="hpt-input">
          <span className="hpt-prompt">#</span>{' '}
          <span className="hpt-kw">let</span> f x = x
        </div>
        <div className="hpt-result">
          <span className="hpt-dash">-</span>{' '}
          <span className="hpt-label">val f :</span>{' '}
          <span className="hpt-type">{'\'a -> \'a'}</span>
        </div>
      </div>
      <div className="hpt-answer-row">
        <span className="hpt-answer-prompt">val f :</span>
        <span className="hpt-answer-text">{'\'a -> \'a'}</span>
        <span className="hpt-cursor" />
      </div>
      <div className="hpt-ok">
        <span className="hpt-ok-icon">✓</span> Correct type!
      </div>
    </div>
  );
}

// ── Demo: Fix the Error ───────────────────────────────────────────────────────

function FixErrorDemo() {
  return (
    <div className="hub-demo hub-demo-fix" aria-hidden="true">
      <div className="hfe-code-wrap">
        {/* Wrong version: "let" without rec */}
        <div className="hfe-code hfe-code-bad">
          <span className="hfe-kw">let</span>{' '}
          <span className="hfe-fn">fact</span> n =
          <br />
          {'  '}n * <span className="hfe-fn">fact</span> (n-<span className="hfe-num">1</span>)
        </div>
        {/* Fixed version: "let rec" */}
        <div className="hfe-code hfe-code-good">
          <span className="hfe-kw">let rec</span>{' '}
          <span className="hfe-fn">fact</span> n =
          <br />
          {'  '}n * <span className="hfe-fn">fact</span> (n-<span className="hfe-num">1</span>)
        </div>
      </div>
      <div className="hfe-status">
        <div className="hfe-error">
          <span className="hfe-err-dot" />
          Unbound value <code>fact</code>
        </div>
        <div className="hfe-ok">
          <span className="hfe-ok-icon">✓</span> Tests pass!
        </div>
      </div>
    </div>
  );
}

// ── Demo: Complete the Function ───────────────────────────────────────────────

function CompleteDemo() {
  return (
    <div className="hub-demo hub-demo-complete" aria-hidden="true">
      <div className="hcp-code-wrap">
        {/* Stub version */}
        <div className="hcp-code hcp-code-stub">
          <span className="hcp-kw">let</span>{' '}
          <span className="hcp-fn">filter</span> f = <span className="hcp-kw">function</span>
          <br />
          {'  '}<span className="hcp-todo">{'(* TODO *)'}</span>
        </div>
        {/* Implemented version: 4 lines, sized to fit .hcp-code-wrap exactly */}
        <div className="hcp-code hcp-code-done">
          <span className="hcp-kw">let rec</span>{' '}
          <span className="hcp-fn">filter</span> p = <span className="hcp-kw">function</span>
          {'\n  | [] -> []\n  | x :: xs when p x -> x :: filter p xs\n  | _ :: xs -> filter p xs'}
        </div>
      </div>
      <div className="hcp-tests">
        <div className="hcp-test hcp-test-1">
          <span className="hcp-check">✓</span>
          <span className="hcp-test-name">filter even [1;2;3;4] = [2;4]</span>
        </div>
        <div className="hcp-test hcp-test-2">
          <span className="hcp-check">✓</span>
          <span className="hcp-test-name">filter odd [1;2;3] = [1;3]</span>
        </div>
      </div>
    </div>
  );
}

// ── Demo: Refactor ────────────────────────────────────────────────────────────

function RefactorDemo() {
  return (
    <div className="hub-demo hub-demo-refactor" aria-hidden="true">
      {/* hrf-stage: both versions are position:absolute so they crossfade without layout shift */}
      <div className="hrf-stage">
        <div className="hrf-before">
          <div className="hrf-imp">
            <span className="hrf-kw">let</span> s = ref <span className="hrf-num">0</span>{' '}
            <span className="hrf-kw">in</span>
          </div>
          <div className="hrf-imp">
            List.iter (<span className="hrf-kw">fun</span> x {'-> s := !s + x)'} xs;
          </div>
          <div className="hrf-imp">!s</div>
        </div>
        <div className="hrf-after">
          <span className="hrf-after-label">↓ functional</span>
          {'\n'}List.fold_left (+) <span className="hrf-num">0</span> xs
        </div>
      </div>
      <div className="hrf-ok">
        <span className="hrf-ok-icon">✓</span> Same result!
      </div>
    </div>
  );
}

// ── Kind demo selector ────────────────────────────────────────────────────────

function KindDemo({ kind }: { kind: PracticeExercise['kind'] }) {
  switch (kind) {
    case 'predict-output': return <PredictOutputDemo />;
    case 'predict-type':   return <PredictTypeDemo />;
    case 'fix-error':      return <FixErrorDemo />;
    case 'complete':       return <CompleteDemo />;
    case 'refactor':       return <RefactorDemo />;
  }
}

const KIND_CTA: Record<PracticeExercise['kind'], string> = {
  'predict-output': 'Practise predicting',
  'predict-type':   'Practise types',
  'fix-error':      'Start fixing',
  'complete':       'Start completing',
  'refactor':       'Start refactoring',
};

// ── Hub ───────────────────────────────────────────────────────────────────────

export default function ExercisesHub() {
  const { completed: miniCompleted } = useMiniProgress();
  const { completed: practiceCompleted } = usePracticeProgress();

  const miniTotal = miniExercises.length;
  const miniDone  = miniExercises.filter((m) => miniCompleted.has(m.id)).length;
  const miniPct   = miniTotal === 0 ? 0 : Math.round((miniDone / miniTotal) * 100);

  const chevron = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 4l4 4-4 4"/>
    </svg>
  );

  return (
    <div className="article">
      <PageMeta
        title="Exercises | oCamlCase"
        description="Practice OCaml with coding challenges, drag-and-drop ordering, and five kinds of interactive exercises."
      />

      <div className="page-header">
        <div className="page-label">Practice</div>
        <h1 className="page-title">Exercises</h1>
        <p className="page-intro">
          Seven ways to build OCaml fluency. Pick the format that fits what you need right now.
        </p>
      </div>

      {/* ── Challenges ──────────────────────────────────────────────────── */}
      <div className="hub-type-card" style={{ '--card-i': 0 } as React.CSSProperties}>
        <div className="hub-type-head">
          <div className="hub-type-icon hub-type-icon-challenges">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="4,6 8,10 4,14" />
              <line x1="10" y1="14" x2="16" y2="14" />
            </svg>
          </div>
          <div className="hub-type-heading">
            <h2 className="hub-type-title">Challenges</h2>
            <p className="hub-type-desc">
              Multi-concept coding projects. Write real OCaml against hidden test suites
              and see exactly which cases pass or fail.
            </p>
          </div>
          <div className="hub-type-meta">
            <span className="hub-type-count">{fullExercises.length} projects</span>
          </div>
        </div>
        <div className="hub-type-body">
          <ChallengesDemo />
          <div className="hub-type-cta">
            <Link to="/exercises/challenges" className="hub-cta-btn">
              Start challenges {chevron}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Drag & Drop ─────────────────────────────────────────────────── */}
      <div className="hub-type-card" style={{ '--card-i': 1 } as React.CSSProperties}>
        <div className="hub-type-head">
          <div className="hub-type-icon hub-type-icon-drag">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="4" y1="6"  x2="16" y2="6"  />
              <line x1="4" y1="10" x2="16" y2="10" />
              <line x1="4" y1="14" x2="16" y2="14" />
              <polyline points="13,3 16,6 13,9" />
            </svg>
          </div>
          <div className="hub-type-heading">
            <h2 className="hub-type-title">Drag &amp; Drop</h2>
            <p className="hub-type-desc">
              Shuffled OCaml lines, drag them into the correct order.
              {' '}{miniTotal} exercises across 17 concepts, from bindings to trees.
            </p>
          </div>
          <div className="hub-type-meta">
            <div className="hub-type-progress" role="progressbar" aria-valuenow={miniPct} aria-valuemin={0} aria-valuemax={100} aria-label={`${miniDone} of ${miniTotal} done`}>
              <div className="hub-type-progress-track">
                <div className="hub-type-progress-fill" style={{ width: `${miniPct}%` }} />
              </div>
              <span className="hub-type-progress-text">{miniDone}/{miniTotal}</span>
            </div>
          </div>
        </div>
        <div className="hub-type-body">
          <DragDropDemo />
          <div className="hub-type-cta">
            <Link to="/exercises/mini" className="hub-cta-btn">
              Browse mini exercises {chevron}
            </Link>
          </div>
        </div>
      </div>

      {/* ── 5 Practice kind cards ───────────────────────────────────────── */}
      {SECTION_ORDER.map((kind, ki) => {
        const kindExs   = practiceExercises.filter((e) => e.kind === kind);
        const kindDone  = kindExs.filter((e) => practiceCompleted.has(e.id)).length;
        const kindTotal = kindExs.length;
        const kindPct   = kindTotal === 0 ? 0 : Math.round((kindDone / kindTotal) * 100);

        return (
          <div
            key={kind}
            className="hub-type-card"
            style={{ '--card-i': ki + 2 } as React.CSSProperties}
          >
            <div className="hub-type-head">
              <div className="hub-type-icon">
                <KindIcon kind={kind} size={20} />
              </div>
              <div className="hub-type-heading">
                <h2 className="hub-type-title">{KIND_LABEL[kind]}</h2>
                <p className="hub-type-desc">{KIND_DESC[kind]}</p>
              </div>
              <div className="hub-type-meta">
                <div className="hub-type-progress" role="progressbar" aria-valuenow={kindPct} aria-valuemin={0} aria-valuemax={100} aria-label={`${kindDone} of ${kindTotal} done`}>
                  <div className="hub-type-progress-track">
                    <div className="hub-type-progress-fill" style={{ width: `${kindPct}%` }} />
                  </div>
                  <span className="hub-type-progress-text">{kindDone}/{kindTotal}</span>
                </div>
              </div>
            </div>
            <div className="hub-type-body">
              <KindDemo kind={kind} />
              <div className="hub-type-cta">
                <Link to={`/exercises/practice/kind/${kind}`} className="hub-cta-btn">
                  {KIND_CTA[kind]} {chevron}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
