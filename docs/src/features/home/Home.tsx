import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import ModeToggle from '../../learn/ModeToggle';
import { useLearnMode } from '../../learn/learn-mode-context';
import { useFlip } from '../../hooks/useFlip';
import { contentRoutes } from '../../content/registry';
import { conceptRoutes, guidedPhases, referenceNum } from '../../content/order';
import { miniExercises } from '../mini-exercises/data';

const routeByPath = new Map(contentRoutes.map((r) => [r.path, r]));

function ConceptTocItem({ path, num }: { path: string; num: string }) {
  const route = routeByPath.get(path);
  if (!route?.nav) return null;
  return (
    <Link to={path} className="toc-item" data-flip-key={path}>
      <span className="toc-num">{num}</span>
      {route.nav.label}
      <span className="toc-desc">{route.concept?.tocDesc}</span>
    </Link>
  );
}

export default function Home() {
  const { mode } = useLearnMode();
  const conceptCount = conceptRoutes.length;
  const miniCount = miniExercises.length;
  const tocRef = useRef<HTMLDivElement>(null);
  useFlip(tocRef, mode);

  const home = useMemo(() => routeByPath.get('/'), []);

  return (
    <>
      <PageMeta title={home?.title ?? 'oCamlCase'} description={home?.description} />
      <div className="home-hero">
        <a
          href="https://ocaml.org"
          target="_blank"
          rel="noopener"
          style={{ display: 'inline-block', marginBottom: 24 }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/ff/OCaml_Logo.svg"
            alt="OCaml logo"
            style={{ height: 52, width: 'auto', display: 'block' }}
          />
        </a>
        <h1>
          Learn OCaml
          <br />
          by example.
        </h1>
        <p>
          Build mental models for the type system, recursion patterns, closures, and evaluation.
          Not just syntax. Understand the language from the ground up.
        </p>
      </div>

      <div className="home-cards">
        <Link to="/concepts/bindings" className="home-card">
          <span className="home-card-icon">{'\u{1D53B}'}</span>
          <span className="home-card-title">Concepts</span>
          <span className="home-card-desc">
            {conceptCount} topics from let bindings to mutability, covering types, recursion,
            closures, and pattern matching.
          </span>
        </Link>
        <Link to="/concepts/static-semantics" className="home-card">
          <span className="home-card-icon">{'⧖'}</span>
          <span className="home-card-title">Interactive Labs</span>
          <span className="home-card-desc">
            TreeLab, Static Semantics, a 4-stage Interpreter Pipeline, and a full Playground.
          </span>
        </Link>
        <Link to="/exercises" className="home-card">
          <span className="home-card-icon">{'✎'}</span>
          <span className="home-card-title">Exercises</span>
          <span className="home-card-desc">
            6 coding challenges and {miniCount} drag-and-drop mini exercises covering all{' '}
            {conceptCount} concepts.
          </span>
        </Link>
      </div>

      <div className="home-toc">
        <div className="toc-section">
          <div className="toc-section-head">
            <span className="toc-section-title">Reference</span>
          </div>
          <div className="toc-items">
            <Link to="/cheatsheet" className="toc-item">
              <span className="toc-num">&middot;</span>
              Cheat Sheet
              <span className="toc-desc">
                Syntax quick-reference: bindings, types, functions, modules
              </span>
            </Link>
          </div>
        </div>

        <div className="toc-section" ref={tocRef}>
          <div className="toc-section-head">
            <span className="toc-section-title">Concepts</span>
            <span className="toc-section-count">{conceptCount} topics</span>
            <ModeToggle />
          </div>
          {mode === 'guided' ? (
            guidedPhases.map((phase) => (
              <div className="toc-phase" key={phase.num}>
                <div className="toc-phase-head mode-crossfade">
                  Phase {phase.num} &middot; {phase.title}
                </div>
                <div className="toc-items">
                  {phase.paths.map((path, i) => (
                    <ConceptTocItem key={path} path={path} num={`${i + 1}.`} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="toc-items">
              {conceptRoutes
                .filter((r) => !r.concept?.unnumbered)
                .map((r) => (
                  <ConceptTocItem key={r.path} path={r.path} num={referenceNum(r.path)} />
                ))}
            </div>
          )}
        </div>

        <div className="toc-section">
          <div className="toc-section-head">
            <span className="toc-section-title">Interactive Labs</span>
            <span className="toc-section-count">5+ tools</span>
          </div>
          <div className="toc-items">
            <Link to="/concepts/static-semantics" className="toc-item">
              <span className="toc-num">&middot;</span>
              Static Semantics
              <span className="toc-desc">Live type elaborator with derivation trees</span>
            </Link>
            <Link to="/concepts/tree-lab" className="toc-item">
              <span className="toc-num">&middot;</span>
              Tree Lab
              <span className="toc-desc">Interactive rose tree explorer with traversals</span>
            </Link>
            <a href="/playground" className="toc-item">
              <span className="toc-num">&middot;</span>
              Playground
              <span className="toc-desc">Run OCaml code in the browser</span>
            </a>
            <Link to="/interpreter/lexing" className="toc-item">
              <span className="toc-num">1.</span>
              Interpreter: Lexing
              <span className="toc-desc">Characters to tokens with maximal munch</span>
            </Link>
            <Link to="/interpreter/parsing" className="toc-item">
              <span className="toc-num">2.</span>
              Interpreter: Parsing
              <span className="toc-desc">Tokens to abstract syntax trees</span>
            </Link>
            <Link to="/interpreter/dynamics" className="toc-item">
              <span className="toc-num">3.</span>
              Interpreter: Dynamics
              <span className="toc-desc">Evaluation rules and derivation</span>
            </Link>
            <Link to="/interpreter/recursion" className="toc-item">
              <span className="toc-num">4.</span>
              Interpreter: Recursion
              <span className="toc-desc">Recursive functions and divergence</span>
            </Link>
          </div>
        </div>

        <div className="toc-section">
          <div className="toc-section-head">
            <span className="toc-section-title">Exercises</span>
            <span className="toc-section-count">6 challenges + {miniCount} mini</span>
          </div>
          <div className="toc-items">
            <Link to="/exercises/bank" className="toc-item">
              <span className="toc-num">E1.</span>
              Bank Account
              <span className="toc-diff">medium</span>
              <span className="toc-desc">Variant types, records, fold</span>
            </Link>
            <Link to="/exercises/playlist" className="toc-item">
              <span className="toc-num">E2.</span>
              Playlist
              <span className="toc-diff">easy</span>
              <span className="toc-desc">List operations, tuples, higher-order functions</span>
            </Link>
            <Link to="/exercises/search" className="toc-item">
              <span className="toc-num">E3.</span>
              Search
              <span className="toc-diff">hard</span>
              <span className="toc-desc">
                Definite and indefinite iteration, searching with predicates
              </span>
            </Link>
            <Link to="/exercises/phonebook" className="toc-item">
              <span className="toc-num">E4.</span>
              Phonebook
              <span className="toc-diff">easy</span>
              <span className="toc-desc">Lists, closures, higher-order functions</span>
            </Link>
            <Link to="/exercises/evaluator" className="toc-item">
              <span className="toc-num">E5.</span>
              Expression Evaluator
              <span className="toc-diff">hard</span>
              <span className="toc-desc">Variant types, pattern matching, structural recursion</span>
            </Link>
            <Link to="/exercises/mergesort" className="toc-item">
              <span className="toc-num">E6.</span>
              Merge Sort
              <span className="toc-diff">medium</span>
              <span className="toc-desc">Sorting, recursion, lists, polymorphism</span>
            </Link>
            <Link to="/exercises" className="toc-item">
              <span className="toc-num">&middot;</span>
              All Exercises
              <span className="toc-desc">
                Browse all {miniCount} mini exercises and 6 coding challenges
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
