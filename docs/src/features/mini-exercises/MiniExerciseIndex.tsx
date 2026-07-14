import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import ConfettiBurst from './ConfettiBurst';
import { miniExercises } from './data';
import { useMiniProgress } from '../../hooks/useMiniProgress';
import { useCelebrateOnce } from '../../hooks/useCelebrateOnce';
import './MiniExerciseIndex.css';

const CATEGORY_ORDER = [
  'bindings',
  'currying',
  'abstractions',
  'lexical-scope',
  'closures',
  'type-inference',
  'polymorphism',
  'pattern-matching',
  'lists',
  'list-ops',
  'higher-order',
  'variants',
  'options',
  'records',
  'derived-forms',
  'sorting',
  'iteration',
  'recursion',
  'trees',
  'mutability',
];

const CATEGORY_LABELS: Record<string, string> = {
  bindings: 'Bindings',
  currying: 'Currying',
  abstractions: 'Abstractions',
  'lexical-scope': 'Lexical Scope',
  closures: 'Closures',
  'type-inference': 'Type Inference',
  polymorphism: 'Polymorphism',
  'pattern-matching': 'Pattern Matching',
  lists: 'Lists',
  'list-ops': 'List Operations',
  'higher-order': 'Higher-Order Functions',
  variants: 'Variants and Constructors',
  options: 'Options and Result',
  records: 'Records',
  'derived-forms': 'Derived Forms',
  sorting: 'Sorting',
  iteration: 'Iteration',
  recursion: 'Recursion',
  trees: 'Trees',
  mutability: 'Mutability',
};

const DIFFICULTY_ORDER = ['easy', 'medium', 'hard'] as const;
const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

type ViewMode = 'concept' | 'difficulty';

function loadViewMode(): ViewMode {
  try {
    const v = localStorage.getItem('mini-view-mode');
    if (v === 'concept' || v === 'difficulty') return v;
  } catch { /* localStorage unavailable (private mode) */ }
  return 'concept';
}

export default function MiniExerciseIndex() {
  const { completed } = useMiniProgress();
  const [viewMode, setViewMode] = useState<ViewMode>(loadViewMode);
  const total = miniExercises.length;
  const doneCount = miniExercises.filter((m) => completed.has(m.id)).length;
  const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);
  const { celebrating, origin, anchorRef, stop } = useCelebrateOnce(
    'mini-celebrated',
    doneCount,
    total,
  );

  const groups =
    viewMode === 'concept'
      ? CATEGORY_ORDER.map((cat) => ({
          key: cat,
          label: CATEGORY_LABELS[cat] ?? cat,
          exercises: miniExercises.filter((m) => m.category === cat),
        })).filter((g) => g.exercises.length > 0)
      : DIFFICULTY_ORDER.map((diff) => ({
          key: diff,
          label: DIFFICULTY_LABELS[diff],
          exercises: miniExercises.filter((m) => m.difficulty === diff),
        })).filter((g) => g.exercises.length > 0);

  function handleViewMode(mode: ViewMode) {
    setViewMode(mode);
    try { localStorage.setItem('mini-view-mode', mode); } catch { /* localStorage unavailable (private mode) */ }
  }

  return (
    <div className="article">
      <PageMeta
        title="Mini Exercises | oCamlCase"
        description="33 short OCaml drag-and-drop exercises covering the core concepts: bindings, closures, pattern matching, options, records, mutability, trees, and more."
      />
      <div className="page-header">
        <div className="page-label">Mini Exercises</div>
        <h1 className="page-title">Drag the lines into order</h1>
        <p className="page-intro">
          Short, focused exercises: lines of a correct OCaml solution, shuffled. Drag them into
          the right order. Covers the core concepts from bindings to mutability.
        </p>
      </div>

      <div className="mini-progress-bar-wrap" ref={anchorRef}>
        <div className="mini-progress-meta">
          <span className="mini-progress-label">Progress</span>
          <span className="mini-progress-count">
            {doneCount} / {total}
          </span>
        </div>
        <div className="mini-progress-track">
          <div className="mini-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="mini-view-toggle">
        <span className="mini-view-label">Group by:</span>
        <button
          className={`mini-view-btn${viewMode === 'concept' ? ' active' : ''}`}
          onClick={() => handleViewMode('concept')}
        >
          Concept
        </button>
        <button
          className={`mini-view-btn${viewMode === 'difficulty' ? ' active' : ''}`}
          onClick={() => handleViewMode('difficulty')}
        >
          Difficulty
        </button>
      </div>

      {groups.map((group) => {
        const groupDone = group.exercises.filter((m) => completed.has(m.id)).length;
        return (
          <div key={group.key} className="mini-group">
            <div className="mini-group-head">
              <span className="mini-group-label">{group.label}</span>
              <span className="mini-group-count">
                {groupDone}/{group.exercises.length}
              </span>
            </div>
            <div className="mini-grid">
              {group.exercises.map((m) => {
                const done = completed.has(m.id);
                return (
                  <Link
                    key={m.id}
                    to={`/exercises/mini/${m.id}`}
                    className={`mini-card${done ? ' mini-card-done' : ''}`}
                  >
                    <div className="mini-card-head">
                      <span className={`diff diff-${m.difficulty}`}>{m.difficulty}</span>
                      {done && <span className="mini-card-check">✓</span>}
                    </div>
                    <div className="mini-card-title">{m.title}</div>
                    <div className="mini-card-prompt">{m.prompt}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}

      {celebrating && origin && <ConfettiBurst origin={origin} onDone={stop} />}
    </div>
  );
}
