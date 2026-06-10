import { useMemo, useState, type ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { miniExerciseById, miniExercises } from './data';
import type { LineOrderItem, MiniExercise } from './data/types';
import { highlightOcaml } from '../../lib/highlightOcaml';
import { topbarLinks } from '../../content/nav';
import { useMiniProgress } from '../../hooks/useMiniProgress';
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
      key={exercise.id}
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
  const total = miniExercises.length;
  const idx = miniExercises.findIndex((m) => m.id === exercise.id);

  const slotCount = exercise.items.length;
  const correctIds = useMemo(() => exercise.items.map((i) => i.id), [exercise.items]);

  // slots[i] holds an item id, or null if empty.
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

  const itemsById = useMemo(() => {
    const m: Record<string, LineOrderItem> = {};
    for (const it of exercise.items) m[it.id] = it;
    return m;
  }, [exercise.items]);

  function clearFeedback() {
    if (results.some((r) => r !== null)) setResults(new Array(slotCount).fill(null));
    if (statusMsg) setStatusMsg(null);
    if (output) setOutput(null);
  }

  function reset() {
    setSlots(new Array(slotCount).fill(null));
    setBank(shuffleDistinct(exercise.items).map((i) => i.id));
    setResults(new Array(slotCount).fill(null));
    setSelectedId(null);
    setStatusMsg(null);
    setOutput(null);
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

  // Find where an id currently lives (slot index or 'bank').
  function locate(id: string): { kind: 'bank' } | { kind: 'slot'; index: number } | null {
    if (bank.includes(id)) return { kind: 'bank' };
    const idx = slots.indexOf(id);
    if (idx !== -1) return { kind: 'slot', index: idx };
    return null;
  }

  // Move an item to a destination slot index, or back to the bank.
  function moveTo(id: string, dest: { kind: 'bank' } | { kind: 'slot'; index: number }) {
    clearFeedback();
    const from = locate(id);
    if (!from) return;

    const nextSlots = slots.slice();
    let nextBank = bank.slice();

    // remove from origin
    if (from.kind === 'bank') nextBank = nextBank.filter((x) => x !== id);
    else nextSlots[from.index] = null;

    // place in destination
    if (dest.kind === 'bank') {
      if (!nextBank.includes(id)) nextBank.push(id);
    } else {
      const evicted = nextSlots[dest.index];
      nextSlots[dest.index] = id;
      if (evicted && evicted !== id) {
        // if we came from another slot, swap; if we came from bank, evict to bank
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

  // Click to select then click empty slot / bank to place.
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

  // Render the full file as a single line-numbered editor: prefix + slots + suffix.
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
          dragOver ? 'me-row-dragover' : '',
          selectedId && !filled ? 'me-row-targetable' : '',
        ]
          .filter(Boolean)
          .join(' ')}
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

      {/* Custom dark topbar */}
      <header className="me-topbar">
        <Link to="/" className="me-brand">
          <img src="/flaticon.png" alt="" />
          <span>
            o<em>Caml</em>Case
          </span>
        </Link>
        <nav className="me-topnav">
          {/* Same link set as Topbar's topbarLinks; Playground always gets a
              full page load so its script-tag-driven globals don't collide. */}
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
          <span className={`me-diff me-diff-${exercise.difficulty}`}>{exercise.difficulty}</span>
          <span className="me-progress-label">
            Exercise {idx + 1} of {total}
          </span>
          <span className="me-dots">
            {miniExercises.map((m, i) => (
              <Link
                key={m.id}
                to={`/exercises/mini/${m.id}`}
                className={[
                  'me-dot',
                  i === idx ? 'me-dot-current' : '',
                  completed.has(m.id) && i !== idx ? 'me-dot-done' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                title={m.title}
              />
            ))}
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
          <div className="me-code">{editorRows}</div>

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

        {/* Right panel */}
        <aside className="me-side">
          <div className="me-side-head">
            <span>Available lines</span>
            <span className="me-side-count">{bank.length}</span>
          </div>
          <div
            className={`me-bank${overBank ? ' me-bank-dragover' : ''}`}
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

          <div className="me-actions">
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
              <div className={`me-status me-status-${statusMsg.kind}`}>{statusMsg.text}</div>
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
            <Link to="/exercises/mini" className="me-back">
              ← All mini exercises
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
