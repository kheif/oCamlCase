import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { miniExerciseById, miniExercises } from './data';
import type { LineOrderItem, MiniExercise } from './data/types';
import { highlightOcaml } from '../../lib/highlightOcaml';
import { topbarLinks } from '../../content/nav';
import { useMiniProgress } from '../../hooks/useMiniProgress';
import { useTheme } from '../../hooks/useTheme';
import ConfettiBurst from './ConfettiBurst';
import './MiniExercisePage.css';

type SlotResult = 'correct' | 'wrong' | null;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleDistinct(items: LineOrderItem[]): LineOrderItem[] {
  if (items.length < 2) return items.slice();
  const original = items.map((i) => i.id).join('|');
  for (let attempt = 0; attempt < 8; attempt++) {
    const next = shuffle(items);
    if (next.map((i) => i.id).join('|') !== original) return next;
  }
  return shuffle(items);
}

export default function MiniExercisePage() {
  const { id } = useParams<{ id: string }>();
  const exercise = id ? miniExerciseById[id] : undefined;
  const { completed, markComplete } = useMiniProgress();
  if (!exercise) return <Navigate to="/exercises/mini" replace />;
  return (
    <MiniExerciseInner
      exercise={exercise}
      completed={completed}
      markComplete={markComplete}
    />
  );
}

function MiniExerciseInner({
  exercise,
  completed,
  markComplete,
}: {
  exercise: MiniExercise;
  completed: Set<string>;
  markComplete: (id: string) => void;
}) {
  const { theme, toggle } = useTheme();
  const total = miniExercises.length;
  const idx = miniExercises.findIndex((m) => m.id === exercise.id);

  const slotCount = exercise.items.length;
  const correctIds = useMemo(() => exercise.items.map((i) => i.id), [exercise.items]);

  const [slots, setSlots] = useState<(string | null)[]>(() => new Array(slotCount).fill(null));
  const [bank, setBank] = useState<string[]>(() =>
    shuffleDistinct(exercise.items).map((i) => i.id),
  );
  const [results, setResults] = useState<SlotResult[]>(() => new Array(slotCount).fill(null));
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [overSlot, setOverSlot] = useState<number | null>(null);
  const [overBank, setOverBank] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ kind: 'ok' | 'bad'; text: string } | null>(null);
  const [output, setOutput] = useState<{ kind: 'ok' | 'err'; lines: string[] } | null>(null);
  const [celebrating, setCelebrating] = useState(false);
  const [confettiOrigin, setConfettiOrigin] = useState<{ x: number; y: number } | null>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const [transitioning, setTransitioning] = useState(false);
  const prevIdRef = useRef(exercise.id);

  useEffect(() => {
    if (prevIdRef.current !== exercise.id) {
      setTransitioning(true);
      const timer = setTimeout(() => {
        setSlots(new Array(exercise.items.length).fill(null));
        setBank(shuffleDistinct(exercise.items).map((i) => i.id));
        setResults(new Array(exercise.items.length).fill(null));
        setSelectedId(null);
        setStatusMsg(null);
        setOutput(null);
        setCelebrating(false);
        setConfettiOrigin(null);
        prevIdRef.current = exercise.id;
        requestAnimationFrame(() => setTransitioning(false));
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [exercise.id, exercise.items]);

  const itemsById = useMemo(() => {
    const m: Record<string, LineOrderItem> = {};
    for (const it of exercise.items) m[it.id] = it;
    return m;
  }, [exercise.items]);

  const clearFeedback = useCallback(() => {
    setResults((prev) => (prev.some((r) => r !== null) ? new Array(slotCount).fill(null) : prev));
    setStatusMsg(null);
    setOutput(null);
    setCelebrating(false);
    setConfettiOrigin(null);
  }, [slotCount]);

  function reset() {
    setSlots(new Array(slotCount).fill(null));
    setBank(shuffleDistinct(exercise.items).map((i) => i.id));
    setResults(new Array(slotCount).fill(null));
    setSelectedId(null);
    setStatusMsg(null);
    setOutput(null);
    setCelebrating(false);
    setConfettiOrigin(null);
  }

  function fillFromSolution() {
    setSlots(correctIds.slice());
    setBank([]);
    setResults(new Array(slotCount).fill('correct'));
    setSelectedId(null);
    setStatusMsg({ kind: 'ok', text: 'Solution filled in.' });
    setOutput({
      kind: 'ok',
      lines: [`$ ocaml ${exercise.filename}`, exercise.expectedOutput],
    });
    markComplete(exercise.id);
  }

  function runCheck() {
    if (slots.some((s) => s == null)) {
      setStatusMsg({ kind: 'bad', text: 'Fill every slot before running.' });
      const r: SlotResult[] = slots.map((s, i) =>
        s == null ? null : s === correctIds[i] ? 'correct' : 'wrong',
      );
      setResults(r);
      setOutput({
        kind: 'err',
        lines: [
          `$ ocaml ${exercise.filename}`,
          `Error: ${slots.filter((s) => s == null).length} empty slot(s) : drag every line into place first.`,
        ],
      });
      return;
    }
    const r = slots.map((s, i) =>
      s === correctIds[i] ? ('correct' as const) : ('wrong' as const),
    );
    setResults(r);
    const ok = r.every((x) => x === 'correct');
    if (ok) {
      markComplete(exercise.id);
      setStatusMsg({ kind: 'ok', text: 'All lines in the right order.' });
      setOutput({
        kind: 'ok',
        lines: [`$ ocaml ${exercise.filename}`, exercise.expectedOutput],
      });
      setCelebrating(true);
      const rect = actionsRef.current?.getBoundingClientRect();
      setConfettiOrigin(
        rect
          ? { x: rect.left + rect.width / 2, y: rect.top + 20 }
          : { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      );
    } else {
      const firstWrong = r.findIndex((x) => x === 'wrong');
      const lineNo = exercise.prefixCode.split('\n').length + firstWrong + 1;
      setStatusMsg({ kind: 'bad', text: 'Not yet. Fix the red lines.' });
      setOutput({
        kind: 'err',
        lines: [
          `$ ocaml ${exercise.filename}`,
          `File "${exercise.filename}", line ${lineNo}:`,
          `Error: this line is not in the right place.`,
        ],
      });
    }
  }

  function locate(id: string): { kind: 'bank' } | { kind: 'slot'; index: number } | null {
    if (bank.includes(id)) return { kind: 'bank' };
    const idx = slots.indexOf(id);
    if (idx !== -1) return { kind: 'slot', index: idx };
    return null;
  }

  function moveTo(id: string, dest: { kind: 'bank' } | { kind: 'slot'; index: number }) {
    clearFeedback();
    const from = locate(id);
    if (!from) return;

    const nextSlots = slots.slice();
    let nextBank = bank.slice();

    if (from.kind === 'bank') nextBank = nextBank.filter((x) => x !== id);
    else nextSlots[from.index] = null;

    if (dest.kind === 'bank') {
      if (!nextBank.includes(id)) nextBank.push(id);
    } else {
      const evicted = nextSlots[dest.index];
      nextSlots[dest.index] = id;
      if (evicted && evicted !== id) {
        if (from.kind === 'slot') nextSlots[from.index] = evicted;
        else nextBank.push(evicted);
      }
    }

    setSlots(nextSlots);
    setBank(nextBank);
    setSelectedId(null);
  }

  function onDragStart(e: React.DragEvent, id: string) {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  }
  function onDragEnd() {
    setDraggedId(null);
    setOverSlot(null);
    setOverBank(false);
  }
  function onDropSlot(e: React.DragEvent, slotIndex: number) {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedId) return;
    moveTo(draggedId, { kind: 'slot', index: slotIndex });
    onDragEnd();
  }
  function onDropBank(e: React.DragEvent) {
    e.preventDefault();
    if (!draggedId) return;
    moveTo(draggedId, { kind: 'bank' });
    onDragEnd();
  }

  function onClickItem(id: string) {
    clearFeedback();
    setSelectedId((prev) => (prev === id ? null : id));
  }
  function onClickEmptySlot(slotIndex: number) {
    if (!selectedId) return;
    moveTo(selectedId, { kind: 'slot', index: slotIndex });
  }
  function onClickBankPanel() {
    if (!selectedId) return;
    const where = locate(selectedId);
    if (where && where.kind === 'slot') moveTo(selectedId, { kind: 'bank' });
  }

  const nextExercise = miniExercises[(idx + 1) % total];
  const isSolved = completed.has(exercise.id);

  const breadcrumb = ['exercises', exercise.category, exercise.filename];

  const prefixLines = exercise.prefixCode.split('\n');
  const suffixLines = exercise.suffixCode.split('\n');
  let lineNo = 0;
  const editorRows: ReactNode[] = [];

  prefixLines.forEach((line) => {
    lineNo++;
    editorRows.push(
      <div key={`p-${lineNo}`} className="me-row">
        <div className="me-gutter">{lineNo}</div>
        <div className="me-line">{highlightOcaml(line)}</div>
      </div>,
    );
  });

  for (let s = 0; s < slotCount; s++) {
    lineNo++;
    const id = slots[s];
    const item = id ? itemsById[id] : null;
    const result = results[s];
    const filled = !!item;
    const dragOver = overSlot === s;
    editorRows.push(
      <div
        key={`s-${s}`}
        className={[
          'me-row',
          'me-row-slot',
          filled ? 'me-row-filled' : 'me-row-empty',
          result === 'correct' ? 'me-row-correct' : '',
          result === 'wrong' ? 'me-row-wrong' : '',
          celebrating ? 'me-row-celebrate' : '',
          dragOver ? 'me-row-dragover' : '',
          selectedId && !filled ? 'me-row-targetable' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={celebrating ? ({ '--me-i': s } as React.CSSProperties) : undefined}
        onDragOver={(e) => {
          e.preventDefault();
          setOverSlot(s);
        }}
        onDragLeave={() => setOverSlot((cur) => (cur === s ? null : cur))}
        onDrop={(e) => onDropSlot(e, s)}
        onClick={() => {
          if (!filled) onClickEmptySlot(s);
          else if (id) onClickItem(id);
        }}
      >
        <div className="me-gutter">{lineNo}</div>
        {filled && item ? (
          <div
            className="me-line me-slot-filled"
            draggable
            onDragStart={(e) => {
              e.stopPropagation();
              onDragStart(e, item.id);
            }}
            onDragEnd={onDragEnd}
          >
            {highlightOcaml(item.code)}
          </div>
        ) : (
          <div className="me-line me-slot-empty">
            <span className="me-placeholder">___ line {s + 1} ___</span>
            <span className="me-drag-hint">DRAG HERE</span>
          </div>
        )}
      </div>,
    );
  }

  suffixLines.forEach((line) => {
    lineNo++;
    editorRows.push(
      <div key={`f-${lineNo}`} className="me-row">
        <div className="me-gutter">{lineNo}</div>
        <div className="me-line">{highlightOcaml(line)}</div>
      </div>,
    );
  });

  return (
    <div className="me-page">
      <PageMeta title={`${exercise.title} | oCamlCase`} description={exercise.prompt} />

      <header className="me-topbar">
        <Link to="/" className="me-brand">
          <img src="/flaticon.png" alt="" />
          <span>
            o<em>Caml</em>Case
          </span>
        </Link>
        <nav className="me-topnav">
          {topbarLinks.map((link) =>
            link.path.startsWith('/playground') ? (
              <a key={link.label} href={link.path}>
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.path}>
                {link.label}
              </Link>
            ),
          )}
        </nav>
        <div className="me-topright">
          <button
            className="me-theme-toggle"
            onClick={toggle}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <span className={`me-diff me-diff-${exercise.difficulty}`}>{exercise.difficulty}</span>
          <span className="me-progress-label">
            {idx + 1} / {total}
          </span>
          <span className="me-dots">
            {idx > 0 ? (
              <Link
                to={`/exercises/mini/${miniExercises[idx - 1].id}`}
                className="me-nav-chevron"
                title={miniExercises[idx - 1].title}
              >
                ‹
              </Link>
            ) : (
              <span className="me-nav-chevron me-nav-chevron-disabled">‹</span>
            )}
            {miniExercises.map((m, i) => (
              <Link
                key={m.id}
                to={`/exercises/mini/${m.id}`}
                className={[
                  'me-dot',
                  i === idx ? 'me-dot-current' : '',
                  i === idx && celebrating ? 'me-dot-celebrate' : '',
                  completed.has(m.id) && i !== idx ? 'me-dot-done' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                title={m.title}
              />
            ))}
            {idx < total - 1 ? (
              <Link
                to={`/exercises/mini/${miniExercises[idx + 1].id}`}
                className="me-nav-chevron"
                title={miniExercises[idx + 1].title}
              >
                ›
              </Link>
            ) : (
              <span className="me-nav-chevron me-nav-chevron-disabled">›</span>
            )}
          </span>
        </div>
      </header>

      <div className="me-body">
        {/* Editor (left) */}
        <section className="me-editor">
          <div className="me-tabs">
            <div className="me-tab me-tab-active">
              <span className="me-tab-dot" />
              {exercise.filename}
            </div>
          </div>
          <div className="me-breadcrumb">
            {breadcrumb.map((seg, i) => (
              <span key={i}>
                {i > 0 && <span className="me-bcsep">›</span>}
                <span className={i === breadcrumb.length - 1 ? 'me-bcleaf' : ''}>{seg}</span>
              </span>
            ))}
          </div>
          <div className={`me-code${transitioning ? ' me-code-out' : ' me-code-in'}`}>
            {editorRows}
          </div>

          <div className="me-output">
            <div className="me-output-head">
              <span className="me-output-dots">
                <span className="me-output-dot me-od-r" />
                <span className="me-output-dot me-od-y" />
                <span className="me-output-dot me-od-g" />
              </span>
              <span className="me-output-title">Output</span>
              {output && (
                <span className={`me-output-pill me-output-pill-${output.kind}`}>
                  {output.kind === 'ok' ? 'success' : 'error'}
                </span>
              )}
            </div>
            <div className={`me-output-body${output ? ` me-output-${output.kind}` : ''}`}>
              {output ? (
                output.lines.map((l, i) => (
                  <div key={i} className={i === 0 ? 'me-output-cmd' : 'me-output-line'}>
                    {l}
                  </div>
                ))
              ) : (
                <div className="me-output-empty">
                  Fill the slots and press <strong>Run &amp; Check</strong> to see the output.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right panel — stable structure, content transitions */}
        <aside className="me-side">
          <div className="me-side-head">
            <span className="me-side-title">{exercise.title}</span>
          </div>
          <div className="me-side-prompt">
            {exercise.prompt}
          </div>
          <div className="me-side-divider">
            <span>Available lines</span>
            <span className="me-side-count">{bank.length}</span>
          </div>
          <div
            className={`me-bank${overBank ? ' me-bank-dragover' : ''}${transitioning ? ' me-bank-out' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setOverBank(true);
            }}
            onDragLeave={() => setOverBank(false)}
            onDrop={onDropBank}
            onClick={onClickBankPanel}
          >
            {bank.length === 0 ? (
              <div className="me-bank-empty">All lines placed.</div>
            ) : (
              bank.map((id) => {
                const it = itemsById[id];
                if (!it) return null;
                const trimmed = it.code.replace(/^\s+/, '');
                return (
                  <div
                    key={id}
                    className={`me-chip${draggedId === id ? ' me-chip-dragging' : ''}${
                      selectedId === id ? ' me-chip-selected' : ''
                    }`}
                    draggable
                    onDragStart={(e) => onDragStart(e, id)}
                    onDragEnd={onDragEnd}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClickItem(id);
                    }}
                  >
                    <span className="me-chip-grip">⋮⋮</span>
                    <span className="me-chip-code">{highlightOcaml(trimmed)}</span>
                  </div>
                );
              })
            )}
          </div>

          <div className="me-actions" ref={actionsRef}>
            <button className="me-btn me-btn-primary" onClick={runCheck}>
              Run &amp; Check
            </button>
            <div className="me-actions-row">
              <button className="me-btn" onClick={reset}>
                Reset
              </button>
              <button className="me-btn" onClick={fillFromSolution}>
                Solution
              </button>
            </div>
            {statusMsg && (
              <div
                className={`me-status me-status-${statusMsg.kind}${
                  celebrating && statusMsg.kind === 'ok' ? ' me-status-celebrate' : ''
                }`}
              >
                {celebrating && statusMsg.kind === 'ok' && (
                  <svg className="me-check" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                    <path
                      d="M4 12.5 9.5 18 20 6.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {statusMsg.text}
              </div>
            )}
            {isSolved && nextExercise.id !== exercise.id && (
              <Link
                to={`/exercises/mini/${nextExercise.id}`}
                className="me-btn me-btn-next"
              >
                Next: {nextExercise.title} →
              </Link>
            )}
            {exercise.conceptLink && (
              <Link to={exercise.conceptLink.href} className="me-refresher">
                ↗ Refresher: {exercise.conceptLink.label}
              </Link>
            )}
            <Link to="/exercises" className="me-back">
              ← All exercises
            </Link>
          </div>
        </aside>
      </div>

      {celebrating && confettiOrigin && (
        <ConfettiBurst origin={confettiOrigin} onDone={() => setConfettiOrigin(null)} />
      )}
    </div>
  );
}
