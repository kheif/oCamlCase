import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { useStepper } from '../../hooks/useStepper';
import './StackGrowthDemo.css';

// "Watch the stack grow" — factorial 4 (stack grows, then unwinds frame by
// frame) vs countdown 4 (single frame reused on every tail call). React island
// mounted from tail-recursion.html via `data-island="stack-growth"`.
//
// Every visual derives purely from stepIdx so prev/next scrubbing always lands
// on a correct state; entry/pop animations are mount/class-keyed keyframes.
// Final states live in base CSS — under prefers-reduced-motion the keyframes
// are globally disabled and each step renders its end state instantly.

type FactFrame = {
  id: string;
  call: string;
  pending?: string;
  popping?: boolean;
  receiving?: boolean;
};

type Step = {
  fact: FactFrame[];
  cdLabel: string | null;
  depthFact: number;
  depthCd: number;
  result?: string;
  caption: ReactNode;
};

const f4 = { id: 'f4', call: 'factorial 4', pending: '4 * _' };
const f3 = { id: 'f3', call: 'factorial 3', pending: '3 * _' };
const f2 = { id: 'f2', call: 'factorial 2', pending: '2 * _' };
const f1 = { id: 'f1', call: 'factorial 1', pending: '1 * _' };
const base = { id: 'base', call: 'returns 1' };

const STEPS: Step[] = [
  {
    fact: [],
    cdLabel: null,
    depthFact: 0,
    depthCd: 0,
    caption: (
      <>
        Press <strong>▶ Play</strong> to run <code>factorial 4</code> and <code>countdown 4</code>{' '}
        side by side.
      </>
    ),
  },
  {
    fact: [f4],
    cdLabel: 'countdown 4',
    depthFact: 1,
    depthCd: 1,
    caption: (
      <>
        <strong>Step 1.</strong> Both functions are called with <code>4</code>. One frame on each
        side.
      </>
    ),
  },
  {
    fact: [f4, f3],
    cdLabel: 'countdown 3',
    depthFact: 2,
    depthCd: 1,
    caption: (
      <>
        <strong>Step 2.</strong> <code>factorial</code> calls itself with <code>3</code>; the
        previous frame must wait, holding a pending <code>4 *</code>. <code>countdown</code> jumps
        to <code>countdown 3</code> reusing its frame.
      </>
    ),
  },
  {
    fact: [f4, f3, f2],
    cdLabel: 'countdown 2',
    depthFact: 3,
    depthCd: 1,
    caption: (
      <>
        <strong>Step 3.</strong> Three frames pile up on the left, each carrying its pending
        multiplication. The right side still uses one frame.
      </>
    ),
  },
  {
    fact: [f4, f3, f2, f1],
    cdLabel: 'countdown 1',
    depthFact: 4,
    depthCd: 1,
    caption: (
      <>
        <strong>Step 4.</strong> Four frames alive on the left. Memory grows linearly with the
        recursion depth. The right side has not grown.
      </>
    ),
  },
  {
    fact: [f4, f3, f2, f1, base],
    cdLabel: 'returns ()',
    depthFact: 5,
    depthCd: 1,
    caption: (
      <>
        <strong>Step 5.</strong> Base case on the left returns <code>1</code>. Now the pending
        multiplications start resolving, top frame first.
      </>
    ),
  },
  {
    fact: [f4, f3, { ...f2, receiving: true }, { ...f1, pending: '1 × 1 = 1', popping: true }],
    cdLabel: 'returns ()',
    depthFact: 3,
    depthCd: 1,
    caption: (
      <>
        <strong>Step 6.</strong> The top frame resolves: <code>1 × 1 = 1</code> pops off and hands
        its result down.
      </>
    ),
  },
  {
    fact: [f4, { ...f3, receiving: true }, { ...f2, pending: '2 × 1 = 2', popping: true }],
    cdLabel: 'returns ()',
    depthFact: 2,
    depthCd: 1,
    caption: (
      <>
        <strong>Step 7.</strong> <code>2 × 1 = 2</code> pops. The stack drains in reverse order.
      </>
    ),
  },
  {
    fact: [{ ...f4, receiving: true }, { ...f3, pending: '3 × 2 = 6', popping: true }],
    cdLabel: 'returns ()',
    depthFact: 1,
    depthCd: 1,
    caption: (
      <>
        <strong>Step 8.</strong> <code>3 × 2 = 6</code> pops. Only the original call is left
        waiting.
      </>
    ),
  },
  {
    fact: [{ ...f4, pending: '4 × 6 = 24', popping: true }],
    cdLabel: 'returns ()',
    depthFact: 0,
    depthCd: 0,
    result: 'factorial 4 = 24',
    caption: (
      <>
        <strong>Step 9.</strong> <code>4 × 6 = 24</code> returns. With a million-deep input, the
        right side would still use one frame; the left would crash long before getting there.
      </>
    ),
  },
];

const TOTAL = STEPS.length - 1; // step indices 1..9; 0 = empty stage

// Variable rhythm: quick descent, a beat on the base case, room for each pop
// animation to land, and a longer hold before the finale.
function stepDelay(nextIdx: number): number {
  if (nextIdx <= 4) return 800; // pushes
  if (nextIdx === 5) return 1000; // base case beat
  if (nextIdx === 9) return 1250; // breath before the finale
  return 1150; // pops
}

export default function StackGrowthDemo() {
  const stepper = useStepper(TOTAL, stepDelay);
  const step = STEPS[stepper.stepIdx];
  const isPush = stepper.stepIdx >= 1 && stepper.stepIdx <= 5;
  const stageRef = useRef<HTMLDivElement>(null);
  const interactedRef = useRef(false);
  const autoStartedRef = useRef(false);
  const visibleRef = useRef(false);
  const atEndRef = useRef(stepper.atEnd);
  const togglePlayRef = useRef(stepper.togglePlay);

  useEffect(() => {
    togglePlayRef.current = stepper.togglePlay;
    atEndRef.current = stepper.atEnd;
  });

  // Auto-start when the demo scrolls into view, and keep tracking visibility
  // so the loop pauses off-screen and resumes on re-entry. Skipped entirely
  // for reduced-motion users; any manual interaction ends auto mode for good.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        visibleRef.current = visible;
        if (!visible || interactedRef.current) return;
        if (!autoStartedRef.current) {
          autoStartedRef.current = true;
          togglePlayRef.current();
        } else if (atEndRef.current) {
          // Scrolled back to a finished demo: pick the loop back up.
          togglePlayRef.current();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Loop: hold the finale for a beat, then replay from the top — forever,
  // until the user presses any control (or the demo is off-screen).
  useEffect(() => {
    if (!stepper.atEnd || !autoStartedRef.current || interactedRef.current) return;
    const id = setTimeout(() => {
      if (visibleRef.current && !interactedRef.current) togglePlayRef.current();
    }, 1800);
    return () => clearTimeout(id);
  }, [stepper.atEnd]);

  function manual<T extends unknown[]>(fn: (...args: T) => void) {
    return (...args: T) => {
      interactedRef.current = true;
      fn(...args);
    };
  }

  return (
    <div className="demo-box sg-demo" ref={stageRef}>
      <div className="sg-stepper">
        <button className="sg-step-btn" onClick={manual(stepper.replay)} title="Replay from start">
          ⟨⟨ Replay
        </button>
        <button
          className="sg-step-btn"
          onClick={manual(stepper.prev)}
          disabled={stepper.stepIdx === 0}
        >
          ⟨ Prev
        </button>
        <button
          className={`sg-step-btn sg-play-btn ${stepper.playing ? 'is-playing' : ''}`}
          onClick={manual(stepper.togglePlay)}
        >
          {stepper.playing ? '⏸ Pause' : stepper.atEnd ? '▶ Replay' : '▶ Play'}
        </button>
        <button className="sg-step-btn" onClick={manual(stepper.next)} disabled={stepper.atEnd}>
          Next ⟩
        </button>
        <button className="sg-step-btn" onClick={manual(stepper.showAll)} disabled={stepper.atEnd}>
          Show all
        </button>
        <span className="sg-progress">
          Step {stepper.stepIdx} / {TOTAL}
        </span>
      </div>

      <div className="sg-stage">
        <div className="sg-col">
          <div className="sg-col-title">
            factorial 4{' '}
            <span className={`sg-tag sg-tag-grow${step.result ? ' sg-tag-settled' : ''}`}>
              grows
            </span>
          </div>
          <div className="sg-frames">
            {step.fact.length === 0 ? (
              <div className="sg-empty">stack empty</div>
            ) : (
              step.fact.map((f, i) => {
                const isNewest = i === step.fact.length - 1;
                // The executing frame: topmost frame that is not mid-pop
                // (during a pop, focus moves to the frame receiving the value).
                const lastActive = step.fact[step.fact.length - 1].popping
                  ? step.fact.length - 2
                  : step.fact.length - 1;
                return (
                  <div
                    key={f.id}
                    className={[
                      'sg-frame',
                      f.popping ? 'is-popping' : '',
                      f.receiving ? 'is-receiving' : '',
                      i === lastActive ? 'is-top' : '',
                      // Weight: frames below a landing frame take a brief press.
                      // Parity-keyed class so the animation retriggers each push.
                      isPush && !isNewest ? `is-pressed-${stepper.stepIdx % 2}` : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={{ '--sg-i': i } as CSSProperties}
                  >
                    <span className="sg-call">{f.call}</span>
                    {f.pending && (
                      <span className="sg-pending" key={f.pending}>
                        {f.pending}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
          {step.result && <div className="sg-result">{step.result}</div>}
          <div className="sg-depth">
            depth:{' '}
            <span className="sg-depth-val" key={`f-${step.depthFact}`}>
              {step.depthFact}
            </span>
          </div>
        </div>

        <div className="sg-col">
          <div className="sg-col-title">
            countdown 4{' '}
            <span className={`sg-tag sg-tag-flat${step.result ? ' sg-tag-pulse' : ''}`}>flat</span>
          </div>
          <div className="sg-frames">
            {step.cdLabel ? (
              <div className="sg-frame sg-frame-cd" key={step.cdLabel}>
                <span className="sg-call">{step.cdLabel}</span>
                <span className="sg-pending">
                  {step.result ? 'done' : 'tail call: frame reused'}
                </span>
              </div>
            ) : (
              <div className="sg-empty">stack empty</div>
            )}
          </div>
          <div className="sg-depth">
            depth:{' '}
            <span className="sg-depth-val" key={`c-${step.depthCd}`}>
              {step.depthCd}
            </span>
          </div>
        </div>
      </div>

      <div className="sg-track">
        <div
          className="sg-track-fill"
          style={{ width: `${(stepper.stepIdx / TOTAL) * 100}%` }}
        />
      </div>
      <div className="sg-caption" key={stepper.stepIdx}>
        {step.caption}
      </div>
    </div>
  );
}
