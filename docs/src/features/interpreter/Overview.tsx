import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import './Interpreter.css';

// ---- the five pipeline stages ------------------------------------------------

type Stage = {
  num: string;
  title: string;
  href: string;
  from: string;
  to: string;
  blurb: string;
};

const STAGES: Stage[] = [
  {
    num: '1',
    title: 'Lexing',
    href: '/interpreter/lexing',
    from: 'characters',
    to: 'tokens',
    blurb:
      'Groups raw characters into the indivisible words of the language and throws away whitespace. Maximal munch made visible.',
  },
  {
    num: '2',
    title: 'Parsing',
    href: '/interpreter/parsing',
    from: 'tokens',
    to: 'syntax tree',
    blurb:
      'A recursive-descent parser turns the flat token list into a tree that mirrors the grammar. Watch the tree grow token by token.',
  },
  {
    num: '3',
    title: 'Static Semantics',
    href: '/concepts/static-semantics',
    from: 'syntax tree',
    to: 'type',
    blurb:
      'Elaboration walks the tree and derives a type, or rejects the program. Step through the derivation rule by rule.',
  },
  {
    num: '4',
    title: 'Dynamic Semantics',
    href: '/interpreter/dynamics',
    from: 'syntax tree',
    to: 'value',
    blurb:
      'An environment-based evaluator computes the value, building the big-step derivation V ⊢ e ⇒ v as it goes.',
  },
  {
    num: '5',
    title: 'Recursion & Divergence',
    href: '/interpreter/recursion',
    from: 'rfun',
    to: 'power (and loops)',
    blurb:
      'Recursive abstractions buy real expressive power; the price is that a well-typed program may now run forever.',
  },
];

const RAIL = ['characters', 'tokens', 'syntax tree', 'type', 'value'];

export default function Overview() {
  return (
    <div className="article">
      <PageMeta
        title="Building an Interpreter | oCamlCase"
        description="A ToyCaml interpreter built in five interactive stages: lexing, parsing, static semantics, dynamic semantics, and recursion. Each stage is a live widget you can step through."
      />

      <div className="page-header">
        <div className="page-label">Building an Interpreter · Overview</div>
        <h1 className="page-title">From characters to values</h1>
        <p className="page-intro">
          An interpreter is a pipeline of small, honest functions. Each stage consumes the
          previous stage&rsquo;s output and produces something more structured, until a flat
          string of characters has become a value. This series builds one for{' '}
          <strong>ToyCaml</strong>, a small fragment of OCaml, and every stage is a live widget
          you can step through.
        </p>
      </div>

      <div className="ov-rail" aria-label="Pipeline: characters to tokens to syntax tree to type to value">
        {RAIL.map((label, i) => (
          <span key={label} className="ov-rail-seg">
            <span className="ov-rail-chip">{label}</span>
            {i < RAIL.length - 1 && <span className="ov-rail-arrow" aria-hidden="true">→</span>}
          </span>
        ))}
      </div>

      <p>
        The pipeline discipline is the whole trick: the lexer never worries about grammar, the
        parser never worries about types, and the evaluator only ever sees trees that already
        passed the type checker. Each stage is small enough to hold in your head, and together
        they are a working interpreter.
      </p>

      <div className="ov-stages">
        {STAGES.map((s) => (
          <Link key={s.href} to={s.href} className="ov-stage">
            <span className="ov-stage-num">{s.num}</span>
            <span className="ov-stage-body">
              <span className="ov-stage-title">{s.title}</span>
              <span className="ov-stage-io">
                <code>{s.from}</code> <span aria-hidden="true">→</span> <code>{s.to}</code>
              </span>
              <span className="ov-stage-blurb">{s.blurb}</span>
            </span>
            <span className="ov-stage-arrow" aria-hidden="true">›</span>
          </Link>
        ))}
      </div>

      <h2>Where to start</h2>
      <p>
        Follow the numbers: start with <Link to="/interpreter/lexing">Lexing</Link> and let each
        page hand you to the next. If you already know what a lexer and parser do, jump straight
        to <Link to="/concepts/static-semantics">Static Semantics</Link>, where the interesting
        judgements begin. The <Link to="/concepts/tree-lab">Tree Lab</Link> is a good warm-up if
        trees themselves still feel new.
      </p>
    </div>
  );
}
