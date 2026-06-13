import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { fullExercises } from './fullExerciseData';

function ChevronRight() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

export default function ChallengesIndex() {
  return (
    <div className="article">
      <PageMeta
        title="Challenges | oCamlCase"
        description="Multi-concept OCaml coding challenges. Write real code against hidden test suites."
      />

      <div className="page-header">
        <div className="page-label">
          <Link to="/exercises" style={{ color: 'inherit', textDecoration: 'none' }}>Exercises</Link>
          {' / '}Challenges
        </div>
        <h1 className="page-title">Challenges</h1>
        <p className="page-intro">
          Multi-concept coding projects. Each challenge requires understanding several
          OCaml ideas working together. No partial credit, just pass or fail.
        </p>
      </div>

      <div className="hub-challenges-list">
        {fullExercises.map((ex, i) => (
          <Link
            key={ex.id}
            to={ex.path}
            className="hub-challenge-card"
            style={{ '--i': i } as React.CSSProperties}
          >
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
            <span className="hub-challenge-arrow">
              <ChevronRight />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
