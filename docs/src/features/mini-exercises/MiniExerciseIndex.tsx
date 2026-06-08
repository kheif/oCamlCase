import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { miniExercises } from './data';
import './MiniExerciseIndex.css';

export default function MiniExerciseIndex() {
  return (
    <div className="article">
      <PageMeta
        title="Mini Exercises | oCamlCase"
        description="Short OCaml mini-exercises: drag the lines of a correct solution into the right order. Practice iter, first, recursion, and more."
      />
      <div className="page-header">
        <div className="page-label">Mini Exercises</div>
        <h1 className="page-title">Drag the lines into order</h1>
        <p className="page-intro">
          Short, focused exercises that present the lines of a correct OCaml solution shuffled and
          unindented. Drag them into the right order. Faster than writing from scratch, and good for
          cementing one idea at a time.
        </p>
      </div>

      <div className="mini-grid">
        {miniExercises.map((m) => (
          <Link key={m.id} to={`/exercises/mini/${m.id}`} className="mini-card">
            <div className="mini-card-head">
              <span className={`diff diff-${m.difficulty}`}>{m.difficulty}</span>
              {m.conceptLink && <span className="mini-card-concept">{m.conceptLink.label}</span>}
            </div>
            <div className="mini-card-title">{m.title}</div>
            <div className="mini-card-prompt">{m.prompt}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
