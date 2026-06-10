import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { miniExercises } from '../mini-exercises/data';
import { useMiniProgress } from '../../hooks/useMiniProgress';
import { fullExercises } from './fullExerciseData';
import './ExercisesHub.css';

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
  'derived-forms',
  'sorting',
  'iteration',
  'recursion',
  'trees',
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
  variants: 'Variant Types',
  'derived-forms': 'Derived Forms',
  sorting: 'Sorting',
  iteration: 'Iteration',
  recursion: 'Recursion',
  trees: 'Trees',
};

const DIFF_ICON: Record<string, string> = {
  easy: '○',
  medium: '◑',
  hard: '●',
};

export default function ExercisesHub() {
  const { completed } = useMiniProgress();
  const miniTotal = miniExercises.length;
  const miniDone = miniExercises.filter((m) => completed.has(m.id)).length;
  const pct = miniTotal === 0 ? 0 : Math.round((miniDone / miniTotal) * 100);

  const groups = CATEGORY_ORDER.map((cat) => ({
    key: cat,
    label: CATEGORY_LABELS[cat] ?? cat,
    exercises: miniExercises.filter((m) => m.category === cat),
  })).filter((g) => g.exercises.length > 0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'OCaml Exercises',
    description:
      'Practice OCaml with drag-and-drop mini exercises and full-length coding challenges covering all 17 concepts.',
    numberOfItems: fullExercises.length + miniTotal,
    itemListElement: fullExercises.map((ex, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://ocamlcase.dev${ex.path}`,
      name: ex.title,
      description: ex.description,
    })),
  };

  return (
    <div className="article">
      <PageMeta
        title="Exercises | oCamlCase"
        description="Practice OCaml with drag-and-drop mini exercises and full-length coding challenges covering all 17 concepts."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="page-header">
        <div className="page-label">Practice</div>
        <h1 className="page-title">Exercises</h1>
        <p className="page-intro">
          Two ways to practice: quick drag-and-drop mini exercises for each concept, and longer
          coding challenges that combine multiple ideas.
        </p>
      </div>

      {/* ---- Challenges ---- */}
      <section className="hub-section">
        <div className="hub-section-head">
          <span className="hub-section-title">Challenges</span>
          <span className="hub-section-sub">Multi-step coding projects</span>
        </div>
        <div className="hub-challenges">
          {fullExercises.map((ex, i) => (
            <Link key={ex.id} to={ex.path} className="hub-challenge-card">
              <div className="hub-challenge-num">E{i + 1}</div>
              <div className="hub-challenge-body">
                <div className="hub-challenge-top">
                  <span className="hub-challenge-title">{ex.title}</span>
                  <span className={`diff diff-${ex.difficulty}`}>{ex.difficulty}</span>
                </div>
                <p className="hub-challenge-desc">{ex.description}</p>
                <div className="hub-challenge-tags">
                  {ex.concepts.map((c) => (
                    <span key={c} className="hub-tag">{c}</span>
                  ))}
                </div>
              </div>
              <span className="hub-challenge-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---- Mini Exercises ---- */}
      <section className="hub-section">
        <div className="hub-section-head">
          <div>
            <span className="hub-section-title">Mini Exercises</span>
            <span className="hub-section-sub">Drag the lines into the right order</span>
          </div>
          <div className="hub-mini-progress">
            <div className="hub-mini-progress-track">
              <div className="hub-mini-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="hub-mini-progress-text">{miniDone}/{miniTotal}</span>
          </div>
        </div>

        <div className="hub-concepts">
          {groups.map((group) => {
            const groupDone = group.exercises.filter((m) => completed.has(m.id)).length;
            const allDone = groupDone === group.exercises.length;
            return (
              <div key={group.key} className={`hub-concept-row${allDone ? ' hub-concept-done' : ''}`}>
                <div className="hub-concept-label">
                  <span className="hub-concept-name">{group.label}</span>
                  <span className="hub-concept-count">{groupDone}/{group.exercises.length}</span>
                </div>
                <div className="hub-concept-exercises">
                  {group.exercises.map((m) => {
                    const done = completed.has(m.id);
                    return (
                      <Link
                        key={m.id}
                        to={`/exercises/mini/${m.id}`}
                        className={`hub-ex-pill${done ? ' hub-ex-done' : ''}`}
                        title={m.prompt}
                      >
                        <span className={`hub-ex-dot hub-ex-dot-${m.difficulty}`}>
                          {done ? '✓' : DIFF_ICON[m.difficulty]}
                        </span>
                        <span className="hub-ex-name">{m.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="hub-mini-footer">
          <Link to="/exercises/mini" className="hub-mini-all-link">
            Browse all mini exercises →
          </Link>
        </div>
      </section>
    </div>
  );
}
