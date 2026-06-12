// Standard tour traversal, linearizations, projections, and balanced-depth check.
//
// Every function returns an array of "step" events - each event is one stepper
// tick in the UI, corresponding to a meaningful action in the algorithm:
//   firstVisit / lastVisit - a node is numbered (pre or post)
//   edgeDown  / edgeUp    - the tour moves along an edge (each edge is visited twice)
//
// This makes the causal chain visible: the output list grows exactly when a
// visit event fires, so learners can see WHY pre/post-order differ.

import type { LTree, Tree } from './tree';

// ---------- standard-tour events (unlabeled trees) ----------

export type TourEvent =
  | { kind: 'firstVisit'; nodeId: number; preNum: number; arity: number }
  | { kind: 'lastVisit'; nodeId: number; postNum: number; arity: number }
  | { kind: 'edgeDown'; parentId: number; childId: number }
  | { kind: 'edgeUp'; childId: number; parentId: number };

/**
 * Compute the standard-tour event sequence for a rose tree.
 *
 * Lecture 7 p.3 definition:
 *   "The standard tour starts and ends at the root. Each edge is traversed
 *    exactly twice - first from above to below, later from below to above.
 *    Successor trees are visited from left to right."
 *
 * Pre-numbering: node numbered on firstVisit.
 * Post-numbering: node numbered on lastVisit.
 */
export function standardTour(t: Tree): TourEvent[] {
  const events: TourEvent[] = [];
  let preCount = 1;
  let postCount = 1;

  function walk(node: Tree): void {
    events.push({ kind: 'firstVisit', nodeId: node.id, preNum: preCount++, arity: node.children.length });
    for (const child of node.children) {
      events.push({ kind: 'edgeDown', parentId: node.id, childId: child.id });
      walk(child);
      events.push({ kind: 'edgeUp', childId: child.id, parentId: node.id });
    }
    events.push({ kind: 'lastVisit', nodeId: node.id, postNum: postCount++, arity: node.children.length });
  }

  walk(t);
  return events;
}

// ---------- labeled-tour events (for projections) ----------

export type LTourEvent =
  | { kind: 'firstVisit'; nodeId: number; preNum: number; label: string }
  | { kind: 'lastVisit'; nodeId: number; postNum: number; label: string }
  | { kind: 'edgeDown'; parentId: number; childId: number }
  | { kind: 'edgeUp'; childId: number; parentId: number };

/** Same algorithm, but events carry labels instead of arities. */
export function labeledTour(lt: LTree): LTourEvent[] {
  const events: LTourEvent[] = [];
  let preCount = 1;
  let postCount = 1;

  function walk(node: LTree): void {
    events.push({ kind: 'firstVisit', nodeId: node.id, preNum: preCount++, label: node.label });
    for (const child of node.children) {
      events.push({ kind: 'edgeDown', parentId: node.id, childId: child.id });
      walk(child);
      events.push({ kind: 'edgeUp', childId: child.id, parentId: node.id });
    }
    events.push({ kind: 'lastVisit', nodeId: node.id, postNum: postCount++, label: node.label });
  }

  walk(lt);
  return events;
}

// ---------- balance-check events ----------

export type BalEvent =
  | { kind: 'leaf'; nodeId: number }
  | { kind: 'ok'; nodeId: number; childDepths: number[]; depth: number }
  | { kind: 'fail'; nodeId: number; childDepths: number[]; mismatch: [number, number] };

/**
 * Animate the lecture's `depthb` function (Lecture 7, p.10):
 *
 *   exception Unbalanced
 *   let check n m = if n = m then n else raise Unbalanced
 *   let rec depthb (T ts) = match ts with
 *     | [] -> 0
 *     | t :: tr -> 1 + List.fold_left check (depthb t) (List.map depthb tr)
 *   let balanced t = try (let _ = depthb t in true) with Unbalanced -> false
 *
 * Events are post-order (children before parent).
 * On the first mismatch, a `fail` event fires and traversal stops - matching
 * the fact that `check` raises and unwinds the stack immediately.
 */
export function balanceSteps(t: Tree): BalEvent[] {
  const events: BalEvent[] = [];
  let failed = false;

  // Returns the depth of `node`, or null if Unbalanced was raised.
  function walk(node: Tree): number | null {
    if (failed) return null;

    if (node.children.length === 0) {
      events.push({ kind: 'leaf', nodeId: node.id });
      return 0;
    }

    const childDepths: number[] = [];
    for (const child of node.children) {
      if (failed) return null;
      const d = walk(child);
      if (d === null) return null;
      childDepths.push(d);
    }

    // fold_left check (childDepths[0]) (childDepths[1..])
    const ref = childDepths[0];
    for (let i = 1; i < childDepths.length; i++) {
      if (childDepths[i] !== ref) {
        events.push({ kind: 'fail', nodeId: node.id, childDepths, mismatch: [ref, childDepths[i]] });
        failed = true;
        return null;
      }
    }

    const d = ref + 1;
    events.push({ kind: 'ok', nodeId: node.id, childDepths, depth: d });
    return d;
  }

  walk(t);
  return events;
}

// ---------- display-state helpers ----------
// Each derives a piece of display state from the event array + step index.
// Components call these in useMemo rather than holding redundant state.

/** Pre-numbers assigned so far: Map<nodeId → preNum>. */
export function preNums(events: TourEvent[], step: number): Map<number, number> {
  const m = new Map<number, number>();
  for (let i = 0; i < step; i++) {
    const e = events[i];
    if (e.kind === 'firstVisit') m.set(e.nodeId, e.preNum);
  }
  return m;
}

/** Post-numbers assigned so far: Map<nodeId → postNum>. */
export function postNums(events: TourEvent[], step: number): Map<number, number> {
  const m = new Map<number, number>();
  for (let i = 0; i < step; i++) {
    const e = events[i];
    if (e.kind === 'lastVisit') m.set(e.nodeId, e.postNum);
  }
  return m;
}

/** Pre-linearization list built so far (arity emitted at each firstVisit). */
export function preList(events: TourEvent[], step: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < step; i++) {
    const e = events[i];
    if (e.kind === 'firstVisit') out.push(e.arity);
  }
  return out;
}

/** Post-linearization list built so far (arity emitted at each lastVisit). */
export function postList(events: TourEvent[], step: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < step; i++) {
    const e = events[i];
    if (e.kind === 'lastVisit') out.push(e.arity);
  }
  return out;
}

/** Pre-projection list (label emitted at each firstVisit). */
export function prepList(events: LTourEvent[], step: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < step; i++) {
    const e = events[i];
    if (e.kind === 'firstVisit') out.push(e.label);
  }
  return out;
}

/** Post-projection list (label emitted at each lastVisit). */
export function popList(events: LTourEvent[], step: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < step; i++) {
    const e = events[i];
    if (e.kind === 'lastVisit') out.push(e.label);
  }
  return out;
}

/** The node ID of the current event, if it is a visit. */
export function activeVisitNodeId(events: TourEvent[], step: number): number | null {
  if (step === 0) return null;
  const e = events[step - 1];
  return e.kind === 'firstVisit' || e.kind === 'lastVisit' ? e.nodeId : null;
}

/** The active edge [parentId, childId], if the current event is an edge traversal. */
export function activeEdgePair(events: TourEvent[], step: number): [number, number] | null {
  if (step === 0) return null;
  const e = events[step - 1];
  if (e.kind === 'edgeDown') return [e.parentId, e.childId];
  if (e.kind === 'edgeUp') return [e.parentId, e.childId];
  return null;
}

/** Direction of active edge traversal. */
export function activeEdgeDirection(events: TourEvent[], step: number): 'down' | 'up' | null {
  if (step === 0) return null;
  const e = events[step - 1];
  if (e.kind === 'edgeDown') return 'down';
  if (e.kind === 'edgeUp') return 'up';
  return null;
}

/** Same helpers for labeled tour. */
export function lActiveVisitNodeId(events: LTourEvent[], step: number): number | null {
  if (step === 0) return null;
  const e = events[step - 1];
  return e.kind === 'firstVisit' || e.kind === 'lastVisit' ? e.nodeId : null;
}

export function lActiveEdgePair(events: LTourEvent[], step: number): [number, number] | null {
  if (step === 0) return null;
  const e = events[step - 1];
  if (e.kind === 'edgeDown') return [e.parentId, e.childId];
  if (e.kind === 'edgeUp') return [e.parentId, e.childId];
  return null;
}

/** Active node for balance stepper. */
export function balActiveNodeId(events: BalEvent[], step: number): number | null {
  if (step === 0) return null;
  return events[step - 1].nodeId;
}

/** Depth badges built up so far for balance mode. */
export function balBadges(events: BalEvent[], step: number): Map<number, { depth?: number; failed?: boolean }> {
  const m = new Map<number, { depth?: number; failed?: boolean }>();
  for (let i = 0; i < step; i++) {
    const e = events[i];
    if (e.kind === 'leaf') m.set(e.nodeId, { depth: 0 });
    else if (e.kind === 'ok') m.set(e.nodeId, { depth: e.depth });
    else if (e.kind === 'fail') m.set(e.nodeId, { failed: true });
  }
  return m;
}

// ---------- caption text ----------

export function tourCaption(events: TourEvent[], step: number): string {
  if (step === 0) return 'Press ▶ Play or Next to start the standard tour.';
  const e = events[step - 1];
  switch (e.kind) {
    case 'firstVisit':
      return `First visit → assign pre-number ${e.preNum} to this node (arity ${e.arity}).${
        e.arity === 0
          ? ' Leaf: the last visit follows immediately; no children to descend into.'
          : ` Now descend into ${e.arity} successor tree${e.arity !== 1 ? 's' : ''} left to right.`
      }`;
    case 'lastVisit':
      return `Last visit → assign post-number ${e.postNum}. ${
        e.arity === 0
          ? 'Leaf: all zero successor trees finished.'
          : `All ${e.arity} successor tree${e.arity !== 1 ? 's' : ''} fully visited; returning to parent.`
      }`;
    case 'edgeDown':
      return 'Move down along this edge (first traversal, descending into the subtree).';
    case 'edgeUp':
      return 'Move back up along this edge (second traversal, subtree fully visited).';
  }
}

export function linCaption(events: TourEvent[], step: number, subMode: 'pre' | 'post'): string {
  if (step === 0)
    return `Press ▶ Play to see the ${subMode === 'pre' ? 'pre' : 'post'}-linearization build up step by step.`;
  const e = events[step - 1];
  switch (e.kind) {
    case 'firstVisit':
      return subMode === 'pre'
        ? `Pre-order first visit → emit arity ${e.arity}. The arity is prepended before descending into children (pre = arity :: concat (map pre ts)).`
        : `First visit (arity ${e.arity}): in post-order this node waits until all its ${e.arity} child tree${e.arity !== 1 ? 's' : ''} finish before contributing.`;
    case 'lastVisit':
      return subMode === 'post'
        ? `Post-order last visit → emit arity ${e.arity}. All children done; now appended (post = concat (map post ts) @ [arity]).`
        : `Last visit (arity ${e.arity}): pre-order already emitted this arity on the way down; nothing new to the list now.`;
    case 'edgeDown':
      return 'Descend to child (first traversal of this edge).';
    case 'edgeUp':
      return 'Return to parent (second traversal, subtree complete).';
  }
}

export function projCaption(events: LTourEvent[], step: number, subMode: 'prep' | 'pop'): string {
  if (step === 0)
    return `Press ▶ Play to watch ${subMode === 'prep' ? 'prep' : 'pop'} collect labels.`;
  const e = events[step - 1];
  switch (e.kind) {
    case 'firstVisit':
      return subMode === 'prep'
        ? `prep: first visit → emit label "${e.label}" before children (prep = [x] @ concat (map prep ts)).`
        : `First visit (label "${e.label}"): pop waits until all children finish.`;
    case 'lastVisit':
      return subMode === 'pop'
        ? `pop: last visit → emit label "${e.label}" after children (pop = concat (map pop ts) @ [x]).`
        : `Last visit (label "${e.label}"): prep already emitted this label on the way down.`;
    case 'edgeDown':
      return 'Descend to child (first edge traversal).';
    case 'edgeUp':
      return 'Return to parent (second edge traversal).';
  }
}

export function balCaption(events: BalEvent[], step: number): string {
  if (step === 0) return 'Press ▶ Play to animate depthb checking the tree.';
  const e = events[step - 1];
  switch (e.kind) {
    case 'leaf':
      return 'T []: leaf node. depthb (T []) = 0 (base case, no children, no fold).';
    case 'ok': {
      const ds = e.childDepths;
      if (ds.length === 1) {
        return `fold_left check ${ds[0]} []: single child, check trivially succeeds. depth = ${ds[0]} + 1 = ${e.depth}.`;
      }
      return `fold_left check ${ds[0]} [${ds.slice(1).join('; ')}]: all ${ds.length} child depths equal ${ds[0]}. depth = ${ds[0]} + 1 = ${e.depth}.`;
    }
    case 'fail':
      return `fold_left check ${e.mismatch[0]} [... ${e.mismatch[1]} ...]: depths ${e.mismatch[0]} ≠ ${e.mismatch[1]}. check raises Unbalanced. balanced t = false.`;
  }
}
