import { useMemo } from 'react';
import { highlightOcaml } from '../../lib/highlightOcaml';
import { showEnv, type DerivationNode } from './elab';
import { showExp, showTy } from './ast';

type Props = {
  root: DerivationNode;
  /** How many nodes (in post-order - premises before conclusions) are revealed so far. */
  revealedCount: number;
};

// Renders the derivation in the textbook's natural-deduction layout: a node's
// premises (its children - the sub-derivations `elab` recursed into) sit
// ABOVE a horizontal inference bar, with the rule name beside the bar and the
// conclusion (`T ⊢ e : t`) below it. Axioms (Sconst/Sid - no premises) skip
// the bar and show their rule name as a small badge on the judgement itself.
// The step cursor reveals nodes bottom-up in post-order - leaves (axioms)
// first, root last - exactly the order a learner fills one in by hand, and
// the most-recently-revealed node is highlighted as "active".
export default function DerivationTree({ root, revealedCount }: Props) {
  // Identity-keyed: a fresh `elaborate` call produces a fresh tree of plain
  // objects, so `Map` keyed by object reference is both correct and cheap.
  const order = useMemo(() => {
    const m = new Map<DerivationNode, number>();
    let i = 0;
    const visit = (n: DerivationNode) => {
      n.children.forEach(visit);
      m.set(n, i++);
    };
    visit(root);
    return m;
  }, [root]);

  return (
    <div className="dt-root">
      <Card node={root} order={order} revealedCount={revealedCount} />
    </div>
  );
}

function Card({
  node: n,
  order,
  revealedCount,
}: {
  node: DerivationNode;
  order: Map<DerivationNode, number>;
  revealedCount: number;
}) {
  const idx = order.get(n) ?? 0;
  const revealed = idx < revealedCount;
  const active = idx === revealedCount - 1;
  const hasError = n.error !== undefined;
  const hasChildren = n.children.length > 0;

  const classes = [
    'dt-node',
    revealed ? 'is-revealed' : 'is-pending',
    active ? 'is-active' : '',
    hasError ? 'has-error' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {hasChildren && (
        <>
          <div className="dt-children">
            {n.children.map((c, i) => (
              <Card key={i} node={c} order={order} revealedCount={revealedCount} />
            ))}
          </div>
          <div className="dt-bar-row">
            <span className="dt-bar" />
            <span className="dt-rule">{n.rule}</span>
          </div>
        </>
      )}
      <div className="dt-judgement">
        <span className="dt-env">{showEnv(n.env)}</span>
        <span className="dt-turnstile">⊢</span>
        <span className="dt-exp">{highlightOcaml(showExp(n.exp))}</span>
        <span className="dt-colon">:</span>
        <span className="dt-ty">{n.ty ? showTy(n.ty) : '?'}</span>
        {!hasChildren && <span className="dt-rule dt-rule-axiom">{n.rule}</span>}
      </div>
      {revealed && hasError && <div className="dt-error">⚠ {n.error}</div>}
    </div>
  );
}
