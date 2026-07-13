import { Link, Navigate, useParams } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { usePracticeProgress } from '../../hooks/usePracticeProgress';
import { practiceExercises } from './data';
import type { PracticeExercise } from './data/types';
import { KIND_LABEL, KIND_DESC, SECTION_ORDER } from './data/labels';
import KindIcon from './KindIcon';
import './Practice.css';

function ChevronRight() {
  return (
    <svg
      className="pr-idx-chevron"
      width="16" height="16" viewBox="0 0 16 16"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

export default function PracticeKindIndex() {
  const { kind: rawKind } = useParams<{ kind: string }>();
  const kind = rawKind as PracticeExercise['kind'];
  // Hooks must run before any early return (rules-of-hooks)
  const { completed } = usePracticeProgress();

  if (!SECTION_ORDER.includes(kind)) {
    return <Navigate to="/exercises" replace />;
  }

  const exercises = practiceExercises.filter((e) => e.kind === kind);
  const doneCount = exercises.filter((e) => completed.has(e.id)).length;
  const total     = exercises.length;
  const pct       = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  return (
    <div className="article">
      <PageMeta
        title={`${KIND_LABEL[kind]} | oCamlCase`}
        description={KIND_DESC[kind]}
      />
      <div className="page-header">
        <div className="page-label">
          <Link to="/exercises" style={{ color: 'inherit', textDecoration: 'none' }}>Exercises</Link>
          {' / '}{KIND_LABEL[kind]}
        </div>
        <h1 className="page-title">{KIND_LABEL[kind]}</h1>
        <p className="page-intro">{KIND_DESC[kind]}</p>
      </div>

      {/* progress overview */}
      <div className="pr-idx-overview">
        <div className="pr-idx-overview-progress">
          <div className="pr-idx-overview-headline">
            <span className="pr-idx-overview-count">{doneCount} of {total}</span>
            <span className="pr-idx-overview-label">complete</span>
          </div>
          <div
            className="pr-idx-overview-bar"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${doneCount} of ${total} complete`}
          >
            <div className="pr-idx-overview-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {doneCount < total ? (
          (() => {
            const nextUp = exercises.find((e) => !completed.has(e.id));
            if (!nextUp) return null;
            return (
              <Link to={`/exercises/practice/${nextUp.id}`} className="pr-idx-resume">
                <span className="pr-idx-resume-badge">Up next</span>
                <span className="pr-idx-resume-title">{nextUp.title}</span>
                <span className="pr-idx-resume-kind">
                  <KindIcon kind={kind} />
                  {' '}{KIND_LABEL[kind]}
                </span>
                <ChevronRight />
              </Link>
            );
          })()
        ) : (
          <div className="pr-idx-resume pr-idx-resume-done">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <circle cx="7" cy="7" r="7" fill="var(--ok)" />
              <path d="M3.5 7.2L5.8 9.5L10.5 4.5" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>All {total} done!</span>
          </div>
        )}
      </div>

      {/* exercise list */}
      <div className="pr-idx-section" style={{ '--i': 0 } as React.CSSProperties}>
        <div className="pr-idx-section-head">
          <div className="pr-idx-section-head-left">
            <span className="pr-idx-section-icon"><KindIcon kind={kind} /></span>
            <span className="pr-idx-section-kind">{KIND_LABEL[kind]}</span>
          </div>
          <span className="pr-idx-section-count">{doneCount}/{total}</span>
        </div>
        <div className="pr-index-list">
          {exercises.map((ex, i) => {
            const done = completed.has(ex.id);
            return (
              <Link
                key={ex.id}
                to={`/exercises/practice/${ex.id}`}
                className={`pr-index-item${done ? ' is-done' : ''}`}
                style={{ '--i': i } as React.CSSProperties}
              >
                <div className="pr-index-check">
                  {done && (
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                      <path d="M2 5L4.2 7.2L8 3" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className="pr-index-info">
                  <div className="pr-index-item-title">{ex.title}</div>
                  <div className="pr-index-item-meta">
                    <span className={`pr-index-diff pr-index-diff-${ex.difficulty}`}>
                      {ex.difficulty}
                    </span>
                  </div>
                </div>
                <ChevronRight />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
