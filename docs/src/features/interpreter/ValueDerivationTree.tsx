import { useEffect, useMemo, useRef } from 'react';
import { highlightOcaml } from '../../lib/highlightOcaml';
import { showExp } from '../toycaml/ast';
import { showValueShort, showVEnvShort, type EvalNode } from './evalTrace';

// Natural-deduction layout for value judgements `V ⊢ e ⇒ v` - the runtime
// counterpart of toycaml/DerivationTree. Premises sit above an inference bar
// with the rule name (Dconst/Did/Dop/Diftrue/Diffalse/Dabs/Dapp); axioms show
// the rule as a badge on the judgement. Reveal is post-order (premises first,
// conclusion last), matching how the lecture builds an evaluation by hand.

type Props = {
  root: EvalNode;
  /** Number of nodes revealed so far, in post-order. */
  revealedCount: number;
};

export default function ValueDerivationTree({ root, revealedCount }: Props) {
  const order = useMemo(() => {
    const m = new Map<EvalNode, number>();
    let i = 0;
    const visit = (n: EvalNode) => {
      n.children.forEach(visit);
      m.set(n, i++);
    };
    visit(root);
    return m;
  }, [root]);

  // These derivations get very wide (a recursive body is repeated at every
  // node), and the natural-deduction layout keeps the conclusion bottom-centre,
  // so the default top-left scroll position can land on empty space. Keep the
  // active node (the conclusion once fully revealed) centred in the viewport.
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rootEl = rootRef.current;
    const scroller = rootEl?.closest('.vd-canvas') as HTMLElement | null;
    const active = rootEl?.querySelector('.vd-node.is-active > .vd-judgement') as HTMLElement | null;
    if (!rootEl || !scroller || !active) return;
    const sr = scroller.getBoundingClientRect();
    const ar = active.getBoundingClientRect();
    scroller.scrollLeft += ar.left - sr.left - sr.width / 2 + ar.width / 2;
    scroller.scrollTop += ar.top - sr.top - sr.height / 2 + ar.height / 2;
  }, [revealedCount, root]);

  return (
    <div className="vd-root" ref={rootRef}>
      <Card node={root} order={order} revealedCount={revealedCount} />
    </div>
  );
}

function Card({
  node: n,
  order,
  revealedCount,
}: {
  node: EvalNode;
  order: Map<EvalNode, number>;
  revealedCount: number;
}) {
  const idx = order.get(n) ?? 0;
  const revealed = idx < revealedCount;
  const active = idx === revealedCount - 1;
  const hasError = n.error !== undefined;
  const hasChildren = n.children.length > 0;

  const classes = [
    'vd-node',
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
          <div className="vd-children">
            {n.children.map((c, i) => (
              <Card key={i} node={c} order={order} revealedCount={revealedCount} />
            ))}
          </div>
          <div className="vd-bar-row">
            <span className="vd-bar" />
            <span className="vd-rule">{n.rule}</span>
          </div>
        </>
      )}
      <div className="vd-judgement">
        <span className="vd-env">{showVEnvShort(n.env)}</span>
        <span className="vd-turnstile">⊢</span>
        <span className="vd-exp">{highlightOcaml(showExp(n.exp))}</span>
        <span className="vd-arrow">⇒</span>
        <span className="vd-val">{n.value ? showValueShort(n.value) : '?'}</span>
        {!hasChildren && <span className="vd-rule vd-rule-axiom">{n.rule}</span>}
      </div>
      {revealed && hasError && <div className="vd-error">⚠ {n.error}</div>}
    </div>
  );
}
